import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Shortcut {
  key: string;
  label: { en: string; fr: string };
}

const SHORTCUTS: Shortcut[] = [
  { key: "H", label: { en: "Go to Home", fr: "Aller à l'Accueil" } },
  { key: "W", label: { en: "Go to Work", fr: "Aller aux Travaux" } },
  { key: "A", label: { en: "Go to About", fr: "Aller à À propos" } },
  { key: "C", label: { en: "Go to Contact", fr: "Aller au Contact" } },
  { key: "?", label: { en: "Toggle this help", fr: "Afficher/Masquer cette aide" } },
];

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[100] p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keyboard-shortcuts-title"
          >
            <div className="bg-background/98 backdrop-blur-xl border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Keyboard className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 id="keyboard-shortcuts-title" className="text-lg font-semibold text-foreground">
                    {language === "en" ? "Keyboard Shortcuts" : "Raccourcis Clavier"}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-lg"
                  aria-label={language === "en" ? "Close shortcuts help" : "Fermer l'aide des raccourcis"}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-3">
                {SHORTCUTS.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.label[language]}
                    </span>
                    <kbd className="inline-flex items-center justify-center min-w-[32px] h-8 px-3 text-sm font-semibold text-foreground bg-muted border border-border rounded-lg shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-muted/30 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  {language === "en"
                    ? "Shortcuts work when not typing in a form field"
                    : "Les raccourcis fonctionnent quand vous ne tapez pas dans un champ"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
