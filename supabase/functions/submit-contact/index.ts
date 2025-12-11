import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(clientId: string, maxRequests = 3, windowMs = 300000): boolean {
  const now = Date.now();
  const userRequests = rateLimitStore.get(clientId) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return true;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(clientId, recentRequests);
  
  return false;
}

function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length to prevent DoS
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client identifier for rate limiting
    const clientId = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    if (isRateLimited(clientId)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait before submitting again.' }), 
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await req.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'service', 'message'];
    for (const field of requiredFields) {
      if (!data[field] || typeof data[field] !== 'string' || !data[field].trim()) {
        return new Response(
          JSON.stringify({ error: `${field} is required` }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(data.firstName),
      lastName: sanitizeInput(data.lastName),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      service: sanitizeInput(data.service),
      message: sanitizeInput(data.message),
      smsConsent: typeof data.smsConsent === 'boolean' ? data.smsConsent : false,
      recruitingConsent: typeof data.recruitingConsent === 'boolean' ? data.recruitingConsent : false
    };

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate phone format
    if (!validatePhone(sanitizedData.phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone format' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get webhook URL from environment variable
    const webhookUrl = Deno.env.get('CONTACT_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('CONTACT_WEBHOOK_URL environment variable not set');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }), 
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare webhook data with additional fields for CRM
    const webhookData = {
      ...sanitizedData,
      full_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
      lead_source: 'Website Contact Form',
      timestamp: new Date().toISOString(),
      source: 'contact_form',
      'Questions': sanitizedData.message,
      'Service - (SL)': sanitizedData.service,
      'first_name': sanitizedData.firstName,
      'last_name': sanitizedData.lastName,
      sms_consent: sanitizedData.smsConsent,
      recruiting_consent: sanitizedData.recruitingConsent
    };

    // Forward to external webhook with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Webhook failed with status: ${response.status}`);
      throw new Error(`Webhook error: ${response.status}`);
    }

    console.log('Contact form submitted successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Contact form submitted successfully' }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in submit-contact function:', error);
    
    // Don't expose internal error details
    const errorResponse = error.name === 'AbortError' 
      ? { error: 'Request timeout' }
      : { error: 'Service temporarily unavailable' };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});