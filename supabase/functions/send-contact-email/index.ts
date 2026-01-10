import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Rate limit configuration
const RATE_LIMIT_MAX = 3; // Max submissions per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers (Deno Deploy / edge runtime)
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    console.log("Contact form submission from IP:", clientIP);

    // Initialize Supabase client with service role for rate limit checks
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    
    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from('contact_rate_limit')
      .select('id')
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      // Continue anyway - don't block legitimate users due to DB issues
    } else if (recentSubmissions && recentSubmissions.length >= RATE_LIMIT_MAX) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      console.error("Input too long");
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Record this submission for rate limiting
    const { error: insertError } = await supabase
      .from('contact_rate_limit')
      .insert({ ip_address: clientIP });

    if (insertError) {
      console.error("Failed to record rate limit:", insertError);
      // Continue anyway - don't block legitimate users
    }

    // Clean up old rate limit entries (older than 1 hour)
    await supabase
      .from('contact_rate_limit')
      .delete()
      .lt('created_at', oneHourAgo);

    const contactEmail = Deno.env.get("CONTACT_EMAIL");
    
    console.log("Sending notification email to:", contactEmail);
    console.log("From:", escapeHtml(name), escapeHtml(email));

    // Escape user inputs for HTML emails
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Send notification email to site owner
    const notificationResponse = await resend.emails.send({
      from: "Portfolio Contact <contact@ivandemurard.com>",
      to: [contactEmail!],
      subject: `New contact form message from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
      `,
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to the sender
    const confirmationResponse = await resend.emails.send({
      from: "Ivan de Murard <contact@ivandemurard.com>",
      to: [email],
      subject: "Thank you for contacting me | Merci pour votre message",
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${safeName},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Ivan de Murard</p>
        <hr>
        <h2>Merci pour votre message !</h2>
        <p>Bonjour ${safeName},</p>
        <p>J'ai bien reçu votre message et vous répondrai dans les plus brefs délais.</p>
        <p>Cordialement,<br>Ivan de Murard</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        notificationId: notificationResponse.data?.id,
        confirmationId: confirmationResponse.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
