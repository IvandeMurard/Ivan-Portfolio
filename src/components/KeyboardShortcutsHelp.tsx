import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Right Drawer Panel */}
          <motion.div
            ref={dialogRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-1/2 -translate-y-1/2 w-full max-w-[240px] z-[100] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keyboard-shortcuts-title"
            aria-describedby="keyboard-shortcuts-description"
          >
            <div className="bg-background border-l border-t border-b border-border rounded-l-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <h2 id="keyboard-shortcuts-title" className="text-base font-semibold text-foreground">
                  {language === "en" ? "Shortcuts" : "Raccourcis"}
                </h2>
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={language === "en" ? "Close shortcuts help" : "Fermer l'aide des raccourcis"}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-3 py-2">
                <p id="keyboard-shortcuts-description" className="sr-only">
                  {language === "en"
                    ? "List of available keyboard shortcuts for navigation"
                    : "Liste des raccourcis clavier disponibles pour la navigation"}
                </p>
                <div className="space-y-0.5">
                  {SHORTCUTS.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between gap-2 py-2 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                      role="listitem"
                      aria-label={`${shortcut.label[language]}: ${language === "en" ? "Press" : "Appuyez sur"} ${shortcut.key}`}
                    >
                      <span className="text-sm text-foreground">
                        {shortcut.label[language]}
                      </span>
                      <kbd 
                        className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 text-xs font-bold text-foreground bg-muted border border-border rounded shadow-sm"
                        aria-label={`${language === "en" ? "Key" : "Touche"} ${shortcut.key}`}
                      >
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
