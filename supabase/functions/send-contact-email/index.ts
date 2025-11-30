import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  language?: 'en' | 'fr';
}

// Bilingual email templates
const getEmailTemplates = (lang: 'en' | 'fr' = 'en') => {
  if (lang === 'fr') {
    return {
      notification: {
        subject: (name: string) => `Nouveau message de contact de ${name}`,
        html: (name: string, email: string, message: string) => `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        text: (name: string, email: string, message: string) => `
Nouveau message de contact

Nom: ${name}
Email: ${email}

Message:
${message}
        `.trim(),
      },
      confirmation: {
        subject: 'Merci pour votre message - Ivan de Murard',
        html: (name: string) => `
          <h2>Merci pour votre message, ${name} !</h2>
          <p>J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.</p>
          <p>À bientôt,<br>Ivan</p>
        `,
        text: (name: string) => `
Merci pour votre message, ${name} !

J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.

À bientôt,
Ivan
        `.trim(),
      },
    };
  }
  
  // English (default)
  return {
    notification: {
      subject: (name: string) => `New contact form submission from ${name}`,
      html: (name: string, email: string, message: string) => `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: (name: string, email: string, message: string) => `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    },
    confirmation: {
      subject: 'Thank you for your message - Ivan de Murard',
      html: (name: string) => `
        <h2>Thank you for your message, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Ivan</p>
      `,
      text: (name: string) => `
Thank you for your message, ${name}!

I've received your message and will get back to you as soon as possible.

Best regards,
Ivan
      `.trim(),
    },
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, language = 'en' }: ContactFormData = await req.json();

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email address' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const recipientEmail = Deno.env.get('CONTACT_EMAIL') || Deno.env.get('RESEND_FROM_EMAIL');
    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'Portfolio Contact <onboarding@resend.dev>';

    if (!resendApiKey || !recipientEmail) {
      console.error('Missing Resend configuration: RESEND_API_KEY or CONTACT_EMAIL');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    // Get email templates based on language
    const templates = getEmailTemplates(language as 'en' | 'fr');
    const lang = (language as 'en' | 'fr') || 'en';

    // Send notification email to owner
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: templates.notification.subject(name),
        html: templates.notification.html(name, email, message),
        text: templates.notification.text(name, email, message),
      }),
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('Resend API error (notification):', notificationResponse.status, errorText);
      throw new Error(`Failed to send notification email: ${notificationResponse.status}`);
    }

    const notificationData = await notificationResponse.json();
    console.log('Notification email sent successfully:', notificationData.id);

    // Send confirmation email to user
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: templates.confirmation.subject,
        html: templates.confirmation.html(name),
        text: templates.confirmation.text(name),
      }),
    });

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text();
      console.error('Resend API error (confirmation):', confirmationResponse.status, errorText);
      // Don't fail the request if confirmation fails, just log it
      console.warn('Confirmation email failed, but notification was sent');
    } else {
      const confirmationData = await confirmationResponse.json();
      console.log('Confirmation email sent successfully:', confirmationData.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Email sent successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    // Don't expose stack traces in response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send message'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

