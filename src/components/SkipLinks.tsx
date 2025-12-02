import { useLanguage } from "@/contexts/LanguageContext";

interface SkipLink {
  id: string;
  label: { en: string; fr: string };
}

const SKIP_LINKS: SkipLink[] = [
  { id: "main-content", label: { en: "Main content", fr: "Contenu principal" } },
  { id: "work", label: { en: "Work section", fr: "Section Travaux" } },
  { id: "about", label: { en: "About section", fr: "Section À propos" } },
  { id: "contact", label: { en: "Contact section", fr: "Section Contact" } },
];

export function SkipLinks() {
  const { language } = useLanguage();

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  };

  return (
    <nav
      aria-label={language === "en" ? "Skip navigation links" : "Liens d'évitement"}
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-2 focus-within:left-2 focus-within:z-[100]"
    >
      <div className="flex flex-col gap-2 bg-background border-2 border-primary rounded-xl p-4 shadow-2xl">
        <p className="text-sm font-semibold text-foreground mb-2">
          {language === "en" ? "Skip to:" : "Aller à :"}
        </p>
        {SKIP_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleSkipClick(e, link.id)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            {link.label[language]}
          </a>
        ))}
      </div>
    </nav>
  );
}
