import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalculatorData {
  firstName: string;
  lastName: string;
  gender: string;
  healthRating: number;
  nicotineUse: string;
  height: string;
  weight: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  age: number;
  priority: string;
  coverageAmount: number;
  state: string;
  email: string;
  phone: string;
  submittedAt: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: CalculatorData = await req.json();
    
    console.log("📊 Calculator submission received:", {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      priority: data.priority,
      coverage: data.coverageAmount,
    });

    // Get webhook URL from environment
    const webhookUrl = Deno.env.get("CONTACT_WEBHOOK_URL");
    
    if (!webhookUrl) {
      console.error("❌ CONTACT_WEBHOOK_URL not configured");
      throw new Error("Webhook URL not configured");
    }

    // Prepare webhook payload
    const webhookPayload = {
      // Calculator-specific fields
      firstName: data.firstName,
      lastName: data.lastName,
      first_name: data.firstName,
      last_name: data.lastName,
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      
      // Insurance details
      gender: data.gender,
      age: data.age,
      health_rating: data.healthRating,
      nicotine_use: data.nicotineUse,
      height: data.height,
      weight: data.weight || "Not provided",
      
      // Birth information
      birth_month: data.birthMonth,
      birth_day: data.birthDay,
      birth_year: data.birthYear,
      
      // Coverage details
      priority: data.priority,
      coverage_amount: data.coverageAmount,
      state: data.state,
      
      // Metadata
      source: data.source,
      lead_source: "Insurance Calculator Widget",
      form_type: "calculator",
      submitted_at: data.submittedAt,
      timestamp: data.submittedAt,
      
      // Additional fields for LeadConnector
      "Service - (SL)": data.priority,
      Questions: `Coverage: $${data.coverageAmount.toLocaleString()} | Health: ${data.healthRating}/5 | Nicotine: ${data.nicotineUse} | Height: ${data.height} | Weight: ${data.weight || 'N/A'}`,
    };

    console.log("📤 Sending to webhook:", webhookUrl.substring(0, 50) + "...");

    // Send to webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("❌ Webhook error:", {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        body: errorText,
      });
      throw new Error(`Webhook failed: ${webhookResponse.status} ${webhookResponse.statusText}`);
    }

    console.log("✅ Calculator submission sent to webhook successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Calculator submission received successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("❌ Error in submit-calculator function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
