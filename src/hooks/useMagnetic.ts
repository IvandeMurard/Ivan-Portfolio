import { useState, useRef, useCallback, useEffect } from "react";

interface MagneticState {
  x: number;
  y: number;
}

interface UseMagneticOptions {
  /** Strength of the magnetic pull (higher = stronger) */
  strength?: number;
  /** Maximum distance in pixels to activate effect */
  maxDistance?: number;
  /** Spring animation duration in ms */
  springDuration?: number;
  /** Respect reduced motion preference */
  respectReducedMotion?: boolean;
}

interface UseMagneticReturn {
  ref: React.RefObject<HTMLButtonElement>;
  style: React.CSSProperties;
  isHovered: boolean;
}

/**
 * useMagnetic - Hook for magnetic button effect
 * Button moves slightly towards cursor on approach
 */
export function useMagnetic(options: UseMagneticOptions = {}): UseMagneticReturn {
  const {
    strength = 0.3,
    maxDistance = 100,
    springDuration = 300,
    respectReducedMotion = true,
  } = options;

  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.("change", handler);
    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion && respectReducedMotion) return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < maxDistance) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setOffset({
            x: distanceX * strength,
            y: distanceY * strength,
          });
        });
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [strength, maxDistance, prefersReducedMotion, respectReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Listen on document to catch cursor approaching
    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const shouldAnimate = !prefersReducedMotion || !respectReducedMotion;

  const style: React.CSSProperties = shouldAnimate
    ? {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered
          ? `transform 150ms cubic-bezier(0.33, 1, 0.68, 1)`
          : `transform ${springDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`, // spring back
        willChange: isHovered ? "transform" : "auto",
      }
    : {};

  return {
    ref,
    style,
    isHovered,
  };
}

export default useMagnetic;
