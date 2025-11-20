import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

const suggestionSchema = z.object({
  product_name: z.string().trim().min(1, "Name is required").max(100),
  product_link: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ToolSuggestionModal({ open, onOpenChange }: Props) {
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  const t = {
    title: language === 'fr' ? 'Suggérer un outil' : 'Suggest a tool',
    nameLabel: language === 'fr' ? 'Nom du produit *' : 'Name of product *',
    namePlaceholder: language === 'fr' ? 'ex. Linear, Notion...' : 'e.g. Linear, Notion...',
    linkLabel: language === 'fr' ? 'Lien optionnel' : 'Optional link',
    linkPlaceholder: 'https://...',
    cancel: language === 'fr' ? 'Annuler' : 'Cancel',
    send: language === 'fr' ? 'Envoyer' : 'Send',
    sending: language === 'fr' ? 'Envoi...' : 'Sending...',
    successToast: language === 'fr' 
      ? 'Merci ! Toujours ouvert aux nouveaux outils 💫'
      : 'Thanks! Always open to new tools 💫',
    errorRequired: language === 'fr' ? 'Le nom est requis' : 'Name is required',
    errorUrl: language === 'fr' ? 'Doit être une URL valide' : 'Must be a valid URL',
    errorGeneric: language === 'fr' ? 'Échec de l\'envoi. Veuillez réessayer.' : 'Failed to submit suggestion. Please try again.',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error(
          language === 'fr' 
            ? 'Vous devez être connecté pour suggérer un outil' 
            : 'You must be logged in to suggest a tool'
        );
        return;
      }

      // Validate input
      const validated = suggestionSchema.parse({
        product_name: productName,
        product_link: productLink || undefined,
      });

      // Save to database
      const { error } = await supabase
        .from("tool_suggestions")
        .insert({
          product_name: validated.product_name,
          product_link: validated.product_link || null,
        });

      if (error) {
        // Handle rate limit error
        if (error.message?.includes('rate_limit') || error.message?.includes('check_tool_suggestion_rate_limit')) {
          toast.error(
            language === 'fr'
              ? 'Limite atteinte. Maximum 5 suggestions par heure.'
              : 'Rate limit reached. Maximum 5 suggestions per hour.'
          );
          return;
        }
        throw error;
      }

      toast.success(t.successToast);
      
      // Reset & close
      setProductName("");
      setProductLink("");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMsg = error.errors[0].message;
        // Translate error messages
        if (errorMsg.includes('required')) {
          toast.error(t.errorRequired);
        } else if (errorMsg.includes('URL')) {
          toast.error(t.errorUrl);
        } else {
          toast.error(errorMsg);
        }
      } else {
        toast.error(t.errorGeneric);
        console.error("Suggestion error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="
        sm:max-w-md 
        border-white/15 dark:border-white/10
        bg-white/85 dark:bg-slate-900/85
        backdrop-blur-xl
        saturate-180
        shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
      ">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              {t.nameLabel}
            </label>
            <Input
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="bg-background/60"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              {t.linkLabel}
            </label>
            <Input
              type="url"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder={t.linkPlaceholder}
              className="bg-background/60"
            />
          </div>
          
          <div className="flex gap-2 justify-end pt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t.cancel}
            </Button>
            <Button 
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.sending : t.send}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
