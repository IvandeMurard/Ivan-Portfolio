import { useEffect, useState } from "react";

const STORAGE_KEYS = {
  lastVisit: "portfolio_last_visit",
  visitCount: "portfolio_visit_count",
  lastScroll: "portfolio_last_scroll",
};

interface WelcomeBackState {
  isReturningVisitor: boolean;
  visitCount: number;
  lastScrollPosition: number;
  dismissWelcome: () => void;
  restoreScroll: () => void;
}

/**
 * Detects returning visitors and offers scroll position restoration.
 */
export function useWelcomeBack(): WelcomeBackState {
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  const [visitCount, setVisitCount] = useState(1);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const count = parseInt(localStorage.getItem(STORAGE_KEYS.visitCount) || "0", 10);
    const scroll = parseInt(localStorage.getItem(STORAGE_KEYS.lastScroll) || "0", 10);

    if (lastVisit) {
      setIsReturningVisitor(true);
      setVisitCount(count + 1);
      setLastScrollPosition(scroll);
    }

    // Update visit data
    localStorage.setItem(STORAGE_KEYS.lastVisit, new Date().toISOString());
    localStorage.setItem(STORAGE_KEYS.visitCount, String(count + 1));

    // Save scroll position periodically
    let timeout: ReturnType<typeof setTimeout>;
    const saveScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.setItem(STORAGE_KEYS.lastScroll, String(window.scrollY));
      }, 500);
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", saveScroll);
      clearTimeout(timeout);
    };
  }, []);

  const dismissWelcome = () => setIsReturningVisitor(false);

  const restoreScroll = () => {
    if (lastScrollPosition > 200) {
      window.scrollTo({ top: lastScrollPosition, behavior: "smooth" });
    }
    setIsReturningVisitor(false);
  };

  return { isReturningVisitor, visitCount, lastScrollPosition, dismissWelcome, restoreScroll };
}
