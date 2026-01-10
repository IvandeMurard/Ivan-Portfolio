import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const createContactSchema = (language: 'en' | 'fr') => z.object({
  firstName: z.string()
    .trim()
    .min(1, language === 'en' ? "First name is required" : "Le prénom est requis")
    .max(50, language === 'en' ? "First name must be less than 50 characters" : "Le prénom doit faire moins de 50 caractères"),
  lastName: z.string()
    .trim()
    .min(1, language === 'en' ? "Last name is required" : "Le nom est requis")
    .max(50, language === 'en' ? "Last name must be less than 50 characters" : "Le nom doit faire moins de 50 caractères"),
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
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const messages = {
    en: {
      formTitle: "Contact Form",
      formDescription: "Fill out this form to send me a message. All fields are required.",
      firstNameLabel: "First name",
      lastNameLabel: "Last name",
      emailLabel: "Email address",
      messageLabel: "Your message",
      firstNamePlaceholder: "John",
      lastNamePlaceholder: "Doe",
      emailPlaceholder: "john@example.com",
      messagePlaceholder: "How can I help you?",
      success: "Message sent! I'll get back to you soon.",
      error: "Failed to send message. Please try again.",
      sending: "Sending...",
      send: "Send message",
      requiredField: "Required field",
    },
    fr: {
      formTitle: "Formulaire de contact",
      formDescription: "Remplissez ce formulaire pour m'envoyer un message. Tous les champs sont requis.",
      firstNameLabel: "Prénom",
      lastNameLabel: "Nom",
      emailLabel: "Adresse email",
      messageLabel: "Votre message",
      firstNamePlaceholder: "Jean",
      lastNamePlaceholder: "Dupont",
      emailPlaceholder: "jean@exemple.fr",
      messagePlaceholder: "Comment puis-je vous aider ?",
      success: "Message envoyé ! Je vous répondrai bientôt.",
      error: "Échec de l'envoi. Veuillez réessayer.",
      sending: "Envoi...",
      send: "Envoyer le message",
      requiredField: "Champ obligatoire",
    },
  };

  const t = messages[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');

    try {
      // Validate with Zod using language-specific schema
      const contactSchema = createContactSchema(language);
      const validatedData = contactSchema.parse(formData);

      // Call Supabase edge function with combined name
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: `${validatedData.firstName} ${validatedData.lastName}`,
          email: validatedData.email,
          message: validatedData.message,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message);
      }

      setSubmitStatus('success');
      toast({
        title: language === "en" ? "Message sent!" : "Message envoyé !",
        description: t.success,
      });

      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      
      // Return focus to first field after success
      setTimeout(() => {
        document.getElementById(firstNameId)?.focus();
      }, 100);
    } catch (error: any) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      
      if (error instanceof z.ZodError) {
        // Map Zod errors to field-specific errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        // Focus first error field
        const firstErrorField = error.errors[0]?.path[0];
        if (firstErrorField === 'firstName') {
          setTimeout(() => {
            document.getElementById(firstNameId)?.focus();
          }, 100);
        } else if (firstErrorField === 'lastName') {
          setTimeout(() => {
            document.getElementById(lastNameId)?.focus();
          }, 100);
        }
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
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-card/10 backdrop-blur-sm p-6 rounded-lg border border-contact-foreground/20"
      aria-labelledby="contact-form-title"
      aria-describedby="contact-form-description"
      noValidate
    >
      {/* Form header with sr-only for screen readers */}
      <div className="sr-only">
        <h3 id="contact-form-title">{t.formTitle}</h3>
        <p id="contact-form-description">{t.formDescription}</p>
      </div>

      {/* Live region for status announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {submitStatus === 'success' && t.success}
        {submitStatus === 'error' && t.error}
        {isSubmitting && t.sending}
      </div>

      {/* First name & Last name fields - on a single row */}
      <div className="grid grid-cols-2 gap-4">
        {/* First name field */}
        <div className="space-y-2">
          <Label 
            htmlFor={firstNameId}
            className="text-contact-foreground font-medium"
          >
            {t.firstNameLabel} <span className="text-destructive" aria-label={t.requiredField}>*</span>
          </Label>
          <Input
            id={firstNameId}
            type="text"
            name="firstName"
            placeholder={t.firstNamePlaceholder}
            value={formData.firstName}
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
              if (errors.firstName) {
                setErrors({ ...errors, firstName: '' });
              }
            }}
            className={`bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground ${
              errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? `${firstNameId}-error` : undefined}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p 
              id={`${firstNameId}-error`} 
              className="text-sm text-destructive flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last name field */}
        <div className="space-y-2">
          <Label 
            htmlFor={lastNameId}
            className="text-contact-foreground font-medium"
          >
            {t.lastNameLabel} <span className="text-destructive" aria-label={t.requiredField}>*</span>
          </Label>
          <Input
            id={lastNameId}
            type="text"
            name="lastName"
            placeholder={t.lastNamePlaceholder}
            value={formData.lastName}
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
              if (errors.lastName) {
                setErrors({ ...errors, lastName: '' });
              }
            }}
            className={`bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground ${
              errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? `${lastNameId}-error` : undefined}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p 
              id={`${lastNameId}-error`} 
              className="text-sm text-destructive flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label 
          htmlFor={emailId}
          className="text-contact-foreground font-medium"
        >
          {t.emailLabel} <span className="text-destructive" aria-label={t.requiredField}>*</span>
        </Label>
        <Input
          id={emailId}
          type="email"
          name="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) {
              setErrors({ ...errors, email: '' });
            }
          }}
          className={`bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground ${
            errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
          }`}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p 
            id={`${emailId}-error`} 
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <Label 
          htmlFor={messageId}
          className="text-contact-foreground font-medium"
        >
          {t.messageLabel} <span className="text-destructive" aria-label={t.requiredField}>*</span>
        </Label>
        <Textarea
          id={messageId}
          name="message"
          placeholder={t.messagePlaceholder}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) {
              setErrors({ ...errors, message: '' });
            }
          }}
          className={`bg-card/80 border-contact-foreground/30 text-foreground placeholder:text-muted-foreground min-h-[120px] ${
            errors.message ? 'border-destructive focus-visible:ring-destructive' : ''
          }`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
        />
        {errors.message && (
          <p 
            id={`${messageId}-error`} 
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={isSubmitting}
      >
        {isSubmitting && (
          <span className="mr-2 animate-spin" aria-hidden="true">⏳</span>
        )}
        {isSubmitting ? t.sending : t.send}
      </Button>
    </form>
  );
};

export default ContactForm;
