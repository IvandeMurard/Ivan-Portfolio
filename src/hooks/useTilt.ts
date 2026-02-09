import { useState, useRef, useCallback, useEffect } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareX: number;
  glareY: number;
}

interface UseTiltOptions {
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Scale on hover */
  scale?: number;
  /** Transition speed in ms */
  speed?: number;
  /** Enable glare effect */
  glare?: boolean;
  /** Perspective distance */
  perspective?: number;
  /** Respect reduced motion */
  respectReducedMotion?: boolean;
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement>;
  style: React.CSSProperties;
  glareStyle: React.CSSProperties;
  isHovered: boolean;
}

/**
 * useTilt - Hook for 3D tilt effect on hover
 * Follows cursor position within element bounds
 */
export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const {
    maxTilt = 15,
    scale = 1.02,
    speed = 400,
    glare = true,
    perspective = 1000,
    respectReducedMotion = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
  });
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

  const updateTilt = useCallback(
    (clientX: number, clientY: number) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate rotation based on cursor distance from center
      const percentX = (clientX - centerX) / (rect.width / 2);
      const percentY = (clientY - centerY) / (rect.height / 2);

      const rotateY = percentX * maxTilt;
      const rotateX = -percentY * maxTilt;

      // Glare position
      const glareX = ((clientX - rect.left) / rect.width) * 100;
      const glareY = ((clientY - rect.top) / rect.height) * 100;

      setState({
        rotateX,
        rotateY,
        scale,
        glareX,
        glareY,
      });
    },
    [maxTilt, scale]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion && respectReducedMotion) return;
      
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateTilt(e.clientX, e.clientY);
      });
    },
    [updateTilt, prefersReducedMotion, respectReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setState({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
    });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const shouldAnimate = !prefersReducedMotion || !respectReducedMotion;

  const style: React.CSSProperties = {
    perspective: `${perspective}px`,
    transformStyle: "preserve-3d",
    willChange: isHovered ? "transform" : "auto",
  };

  const innerStyle: React.CSSProperties = shouldAnimate
    ? {
        transform: `
          perspective(${perspective}px)
          rotateX(${state.rotateX}deg)
          rotateY(${state.rotateY}deg)
          scale3d(${state.scale}, ${state.scale}, ${state.scale})
        `,
        transition: isHovered
          ? `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
          : `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }
    : {};

  const glareStyle: React.CSSProperties =
    glare && shouldAnimate
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: `radial-gradient(
            circle at ${state.glareX}% ${state.glareY}%,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            transparent 60%
          )`,
          opacity: isHovered ? 1 : 0,
          transition: `opacity ${speed}ms ease-out`,
          mixBlendMode: "overlay",
        }
      : { display: "none" };

  return {
    ref,
    style: innerStyle,
    glareStyle,
    isHovered,
  };
}

export default useTilt;
