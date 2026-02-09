import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SpotlightCursorProps {
  /** Size of the spotlight in pixels */
  size?: number;
  /** Color of the spotlight (HSL values) */
  color?: string;
  /** Intensity of the glow (0-1) */
  intensity?: number;
  /** Container ref to constrain spotlight */
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * SpotlightCursor - Creates a luminous halo that follows the cursor
 * Desktop only, respects prefers-reduced-motion
 */
export function SpotlightCursor({
  size = 400,
  color = "210 100% 72%",
  intensity = 0.15,
  containerRef,
}: SpotlightCursorProps) {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    const container = containerRef?.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        targetRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        targetRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth animation loop (60fps throttled)
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime >= 16) { // ~60fps
        setPosition((prev) => ({
          x: prev.x + (targetRef.current.x - prev.x) * 0.15,
          y: prev.y + (targetRef.current.y - prev.y) * 0.15,
        }));
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const element = container || document;
    element.addEventListener("mousemove", handleMouseMove as EventListener);
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    } else {
      setIsVisible(true);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      element.removeEventListener("mousemove", handleMouseMove as EventListener);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [prefersReducedMotion, isTouchDevice, containerRef]);

  if (prefersReducedMotion || isTouchDevice || !isVisible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          left: position.x - size / 2,
          top: position.y - size / 2,
          background: `radial-gradient(circle, hsl(${color} / ${intensity}) 0%, hsl(${color} / ${intensity * 0.5}) 30%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: isVisible ? 1 : 0,
          transform: "translateZ(0)",
          willChange: "left, top",
        }}
      />
    </div>
  );
}

export default SpotlightCursor;
