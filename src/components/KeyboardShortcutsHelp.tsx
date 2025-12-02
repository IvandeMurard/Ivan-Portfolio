import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (isOpen) {
      // Focus close button when dialog opens
      closeButtonRef.current?.focus();

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      // Trap focus within dialog
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab" && dialogRef.current) {
          const focusableElements = dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
      };
    }
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[100] p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keyboard-shortcuts-title"
            aria-describedby="keyboard-shortcuts-description"
          >
            <div className="bg-background border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/20">
                    <Keyboard className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 id="keyboard-shortcuts-title" className="text-lg font-semibold text-foreground">
                    {language === "en" ? "Keyboard Shortcuts" : "Raccourcis Clavier"}
                  </h2>
                </div>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-9 w-9 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={language === "en" ? "Close shortcuts help" : "Fermer l'aide des raccourcis"}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-1">
                <p id="keyboard-shortcuts-description" className="sr-only">
                  {language === "en"
                    ? "List of available keyboard shortcuts for navigation"
                    : "Liste des raccourcis clavier disponibles pour la navigation"}
                </p>
                {SHORTCUTS.map((shortcut, index) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between gap-4 py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                    role="listitem"
                    aria-label={`${shortcut.label[language]}: ${language === "en" ? "Press" : "Appuyez sur"} ${shortcut.key}`}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {shortcut.label[language]}
                    </span>
                    <kbd 
                      className="inline-flex items-center justify-center min-w-[36px] h-9 px-3 text-sm font-bold text-foreground bg-muted border-2 border-border rounded-lg shadow-sm"
                      aria-label={`${language === "en" ? "Key" : "Touche"} ${shortcut.key}`}
                    >
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-muted/40 border-t border-border">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {language === "en"
                    ? "Shortcuts work when not typing in a form field. Press Escape or click outside to close."
                    : "Les raccourcis fonctionnent quand vous ne tapez pas dans un champ. Appuyez sur Échap ou cliquez à l'extérieur pour fermer."}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
