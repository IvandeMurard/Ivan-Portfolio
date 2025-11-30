import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

const ContactForm = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Bilingual translations
  const t = {
    placeholders: {
      name: language === 'fr' ? 'Votre nom' : 'Your name',
      email: language === 'fr' ? 'Votre email' : 'Your email',
      message: language === 'fr' ? 'Votre message' : 'Your message',
    },
    button: {
      send: language === 'fr' ? 'Envoyer le message' : 'Send message',
      sending: language === 'fr' ? 'Envoi...' : 'Sending...',
    },
    errors: {
      nameRequired: language === 'fr' ? 'Le nom est requis' : 'Name is required',
      nameTooLong: language === 'fr' ? 'Le nom est trop long (max 100 caractères)' : 'Name is too long (max 100 characters)',
      emailInvalid: language === 'fr' ? 'Adresse email invalide' : 'Invalid email address',
      messageRequired: language === 'fr' ? 'Le message est requis' : 'Message is required',
      messageTooShort: language === 'fr' ? 'Le message doit contenir au moins 10 caractères' : 'Message must be at least 10 characters',
      messageTooLong: language === 'fr' ? 'Le message est trop long (max 2000 caractères)' : 'Message is too long (max 2000 characters)',
      missingFields: language === 'fr' ? 'Veuillez remplir tous les champs' : 'Please fill in all fields',
      generic: language === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : 'Failed to send message. Please try again.',
    },
    success: {
      title: language === 'fr' ? 'Message envoyé !' : 'Message sent!',
      description: language === 'fr' ? 'Je vous répondrai dans les plus brefs délais.' : "I'll get back to you soon.",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate with Zod
      const validated = contactSchema.parse({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      // Get Supabase URL for edge function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Supabase URL not configured");
      }

      // Get session for authenticated request
      const { data: { session } } = await supabase.auth.getSession();
      
      // Call the edge function with language
      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session && {
            Authorization: `Bearer ${session.access_token}`,
          }),
        },
        body: JSON.stringify({
          name: validated.name,
          email: validated.email,
          message: validated.message,
          language: language,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || t.errors.generic);
      }

      toast({
        title: t.success.title,
        description: t.success.description,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          if (field === 'name') {
            fieldErrors.name = err.message === 'Name is required' ? t.errors.nameRequired :
                              err.message === 'Name is too long' ? t.errors.nameTooLong : err.message;
          } else if (field === 'email') {
            fieldErrors.email = err.message === 'Invalid email address' ? t.errors.emailInvalid : err.message;
          } else if (field === 'message') {
            fieldErrors.message = err.message === 'Message must be at least 10 characters' ? t.errors.messageTooShort :
                                 err.message === 'Message is too long' ? t.errors.messageTooLong :
                                 err.message === 'String must contain at least 10 character(s)' ? t.errors.messageTooShort : err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: language === 'fr' ? 'Erreur de validation' : 'Validation error',
          description: Object.values(fieldErrors)[0] || t.errors.generic,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === 'fr' ? 'Erreur' : 'Error',
          description: error instanceof Error ? error.message : t.errors.generic,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder={t.placeholders.name}
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          className={`bg-input-background border-border ${errors.name ? 'border-destructive' : ''}`}
          required
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          placeholder={t.placeholders.email}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          className={`bg-input-background border-border ${errors.email ? 'border-destructive' : ''}`}
          required
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder={t.placeholders.message}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          className={`bg-input-background border-border min-h-[120px] ${errors.message ? 'border-destructive' : ''}`}
          required
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-contact text-contact-foreground hover:bg-contact/90"
      >
        {isSubmitting ? t.button.sending : t.button.send}
      </Button>
    </form>
  );
};

export default ContactForm;
