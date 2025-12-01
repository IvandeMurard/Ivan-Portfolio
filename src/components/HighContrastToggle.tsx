import { Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHighContrast } from "@/contexts/HighContrastContext";

export function HighContrastToggle() {
  const { highContrast, toggleHighContrast } = useHighContrast();
  const { language } = useLanguage();

  const labels = {
    en: {
      enable: "Enable high contrast mode",
      disable: "Disable high contrast mode",
    },
    fr: {
      enable: "Activer le mode haut contraste",
      disable: "Désactiver le mode haut contraste",
    },
  };

  const label = highContrast ? labels[language].disable : labels[language].enable;

  return (
    <Button
      size="icon"
      onClick={toggleHighContrast}
      className="h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={label}
      aria-pressed={highContrast}
      title={label}
    >
      <Contrast className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
