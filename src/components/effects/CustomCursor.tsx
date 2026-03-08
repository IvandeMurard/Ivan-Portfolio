import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "view" | "link" | "expand";

/**
 * CustomCursor - Global contextual cursor with spring physics.
 * Desktop only, respects prefers-reduced-motion.
 * 
 * Usage: Add data-cursor="view" | "link" | "expand" on hoverable elements.
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);
  }, [cursorX, cursorY]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
      setCursorState(cursorAttr || "default");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, isTouchDevice, handleMouseMove, handleMouseLeave]);

  if (prefersReducedMotion || isTouchDevice) return null;

  const getSize = () => {
    switch (cursorState) {
      case "view": return 80;
      case "link": return 50;
      case "expand": return 60;
      default: return 12;
    }
  };

  const getLabel = () => {
    switch (cursorState) {
      case "view": return "View";
      case "link": return "↗";
      case "expand": return "＋";
      default: return null;
    }
  };

  const size = getSize();
  const label = getLabel();

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          backgroundColor: cursorState === "default" ? "white" : "white",
        }}
      >
        {label && (
          <motion.span
            className="text-black font-medium select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ fontSize: cursorState === "view" ? 13 : 16 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default CustomCursor;
