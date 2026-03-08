import { useEffect } from "react";
import { useWelcomeBack } from "@/hooks/useWelcomeBack";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

/**
 * Shows a welcome-back toast for returning visitors on the homepage.
 */
export function WelcomeBackToast() {
  const { isReturningVisitor, lastScrollPosition, restoreScroll, dismissWelcome } = useWelcomeBack();
  const { isFrench } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!isReturningVisitor || location.pathname !== "/") return;
    if (lastScrollPosition < 300) {
      dismissWelcome();
      return;
    }

    const timer = setTimeout(() => {
      toast(isFrench ? "Content de vous revoir ! 👋" : "Welcome back! 👋", {
        description: isFrench
          ? "Reprendre là où vous étiez ?"
          : "Continue where you left off?",
        action: {
          label: isFrench ? "Reprendre" : "Continue",
          onClick: restoreScroll,
        },
        duration: 6000,
        onDismiss: dismissWelcome,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isReturningVisitor, location.pathname]);

  return null;
}
