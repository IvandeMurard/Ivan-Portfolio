import { useEffect, useRef } from "react";

/**
 * Section-based accent color theming.
 * As user scrolls through sections, the --accent CSS variable smoothly shifts.
 */

interface SectionTheme {
  id: string;
  accent: string; // HSL values e.g. "224 64% 33%"
}

const SECTION_THEMES: SectionTheme[] = [
  { id: "hero", accent: "164 88% 20%" },        // emerald green (contact color)
  { id: "work", accent: "224 64% 33%" },         // deep blue (primary)
  { id: "hackathons", accent: "32 95% 44%" },    // warm amber
  { id: "experience", accent: "224 64% 33%" },   // deep blue
  { id: "about", accent: "262 52% 47%" },        // purple
  { id: "side-projects", accent: "200 70% 40%" },// teal
  { id: "contact", accent: "164 88% 20%" },      // emerald green
];

export function useDynamicTheme() {
  const currentAccent = useRef<string>("");

  useEffect(() => {
    // Only on homepage
    if (window.location.pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    SECTION_THEMES.forEach(({ id, accent }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && currentAccent.current !== accent) {
            currentAccent.current = accent;
            document.documentElement.style.setProperty("--accent-dynamic", accent);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);
}
