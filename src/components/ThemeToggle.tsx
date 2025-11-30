import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  const labels = {
    en: {
      light: "Switch to dark mode",
      dark: "Switch to light mode",
    },
    fr: {
      light: "Passer en mode sombre",
      dark: "Passer en mode clair",
    },
  };

  const label = theme === "light" ? labels[language].light : labels[language].dark;

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 bg-primary hover:bg-primary/90 text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={label}
      title={label}
    >
      <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
