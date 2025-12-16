import { useState, useEffect, useRef } from "react";

interface UseLazySectionOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Hook pour charger une section seulement quand elle devient visible (progressive enhancement)
 */
export function useLazySection(options: UseLazySectionOptions = {}) {
  const { rootMargin = "200px", threshold = 0.1 } = options;
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldLoad, rootMargin, threshold]);

  return { ref, shouldLoad };
}

