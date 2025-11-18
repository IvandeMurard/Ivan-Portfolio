import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface WorkModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  canNavigatePrev?: boolean;
  canNavigateNext?: boolean;
  logo?: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  cta: { label: string; href: string };
  showComingSoon?: boolean;
}

export function WorkModal({
  open,
  onClose,
  onNavigate,
  canNavigatePrev = false,
  canNavigateNext = false,
  logo,
  title,
  subtitle,
  bullets,
  cta,
  showComingSoon = false,
}: WorkModalProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && canNavigatePrev && onNavigate) {
        onNavigate('prev');
      } else if (e.key === "ArrowRight" && canNavigateNext && onNavigate) {
        onNavigate('next');
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, onNavigate, canNavigatePrev, canNavigateNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-hidden={!open}
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl bg-[hsl(var(--card))] p-6 shadow-2xl"
            initial={{ y: 24, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-foreground hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="space-y-4 text-center pt-2">
              {logo && (
                <img src={logo} alt="Logo du projet" className="mx-auto h-12 w-auto" />
              )}
              <h3 className="text-xl font-semibold leading-tight text-foreground">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="mt-3 space-y-2 text-left text-sm text-muted-foreground">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/60 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-4">
                {showComingSoon ? (
                  <Link
                    to={cta.href || "/404"}
                    className="inline-flex items-center justify-center rounded-full border-2 border-foreground/30 bg-background hover:bg-accent hover:border-primary/50 px-5 py-2 text-sm font-medium text-foreground transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Coming soon!
                  </Link>
                ) : (
                  <Link
                    to={cta.href}
                    className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-5 py-2 text-sm font-medium text-primary-foreground transition-colors"
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation buttons - Discrete */}
            {onNavigate && (canNavigatePrev || canNavigateNext) && (
              <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-border">
                <button
                  onClick={() => onNavigate('prev')}
                  disabled={!canNavigatePrev}
                  aria-label="Projet précédent"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-muted-foreground">Naviguer</span>
                <button
                  onClick={() => onNavigate('next')}
                  disabled={!canNavigateNext}
                  aria-label="Projet suivant"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
