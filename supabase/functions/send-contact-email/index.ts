
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, service, message }: ContactEmailRequest = await req.json();

    console.log("Processing contact form submission:", { firstName, lastName, email, phone, service });

    // Send email to your business email
    const emailResponse = await resend.emails.send({
      from: "Agora Insurance <onboarding@resend.dev>",
      to: ["info@agorainsurance.com"], // Replace with your business email
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #15AFF7; border-bottom: 2px solid #15AFF7; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Service Interest:</strong> ${service}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #15AFF7; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This email was sent from the Agora Insurance website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Agora Insurance <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Agora Insurance!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #15AFF7 0%, #0D94D1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank you, ${firstName}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We've received your message about ${service}</p>
          </div>
          
          <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">What happens next?</h2>
            <ul style="color: #666; line-height: 1.8;">
              <li>One of our insurance specialists will review your inquiry</li>
              <li>We'll contact you within 24 hours to discuss your needs</li>
              <li>We'll provide you with personalized insurance options</li>
              <li>No obligation - just expert advice tailored to you</li>
            </ul>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #15AFF7;">Your Message Summary</h3>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 5px 0;"><strong>Contact:</strong> ${email} | ${phone}</p>
              <div style="margin-top: 15px;">
                <strong>Your Message:</strong>
                <p style="margin: 10px 0; padding: 15px; background-color: #fff; border-left: 3px solid #15AFF7; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; margin-bottom: 20px;">Questions? Call us directly:</p>
              <a href="tel:+1-800-AGORA-INS" style="background-color: #15AFF7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">📞 1-800-AGORA-INS</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
            <p>© 2024 Agora Insurance. All rights reserved.</p>
            <p>This email was sent because you submitted a contact form on our website.</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { emailResponse, confirmationResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Emails sent successfully",
      emailResponse, 
      confirmationResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to send email. Please check your Resend API key and domain verification."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
