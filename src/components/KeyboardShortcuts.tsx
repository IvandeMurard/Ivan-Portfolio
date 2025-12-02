import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface KeyboardShortcutsProps {
  onHelpToggle: () => void;
}

export function KeyboardShortcuts({ onHelpToggle }: KeyboardShortcutsProps) {
  const location = useLocation();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Only work on home page
      if (location.pathname !== "/") return;

      const key = e.key.toLowerCase();

      // Help panel toggle with '?' or '/'
      if (key === "?" || key === "/") {
        e.preventDefault();
        onHelpToggle();
        return;
      }

      // Navigation shortcuts
      const shortcuts: Record<string, string> = {
        h: "hero",
        w: "work",
        a: "about",
        c: "contact",
      };

      const targetId = shortcuts[key];
      if (targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.setAttribute("tabindex", "-1");
          element.focus({ preventScroll: true });
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [location.pathname, onHelpToggle]);

  return null;
}
