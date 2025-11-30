import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { z } from "zod";

const createContactSchema = (language: 'en' | 'fr') => z.object({
  name: z.string()
    .trim()
    .min(1, language === 'en' ? "Name is required" : "Le nom est requis")
    .max(100, language === 'en' ? "Name must be less than 100 characters" : "Le nom doit faire moins de 100 caractères"),
  email: z.string()
    .trim()
    .min(1, language === 'en' ? "Email is required" : "L'email est requis")
    .email(language === 'en' ? "Invalid email address" : "Adresse email invalide")
    .max(255, language === 'en' ? "Email must be less than 255 characters" : "L'email doit faire moins de 255 caractères"),
  message: z.string()
    .trim()
    .min(1, language === 'en' ? "Message is required" : "Le message est requis")
    .max(2000, language === 'en' ? "Message must be less than 2000 characters" : "Le message doit faire moins de 2000 caractères"),
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

  const messages = {
    en: {
      missingFields: "Please fill in all fields.",
      invalidEmail: "Please enter a valid email address.",
      success: "Message sent! I'll get back to you soon.",
      error: "Failed to send message. Please try again.",
      sending: "Sending...",
      send: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
    },
    fr: {
      missingFields: "Veuillez remplir tous les champs.",
      invalidEmail: "Veuillez entrer une adresse email valide.",
      success: "Message envoyé ! Je vous répondrai bientôt.",
      error: "Échec de l'envoi. Veuillez réessayer.",
      sending: "Envoi...",
      send: "Envoyer le message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Votre message",
    },
  };

  const t = messages[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate with Zod using language-specific schema
      const contactSchema = createContactSchema(language);
      const validatedData = contactSchema.parse(formData);

      // Call Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: validatedData,
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message);
      }

      toast({
        title: language === "en" ? "Message sent!" : "Message envoyé !",
        description: t.success,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Form submission error:", error);
      
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: language === "en" ? "Validation error" : "Erreur de validation",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === "en" ? "Error" : "Erreur",
          description: t.error,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card/10 backdrop-blur-sm p-6 rounded-lg border border-contact-foreground/20">
      <div>
        <Input
          type="text"
          placeholder={t.namePlaceholder}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>
      <div>
        <Textarea
          placeholder={t.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground min-h-[120px]"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? t.sending : t.send}
      </Button>
    </form>
  );
};

export default ContactForm;
