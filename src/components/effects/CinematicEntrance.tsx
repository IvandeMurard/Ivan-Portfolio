import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio_entrance_played";

/**
 * CinematicEntrance - Full-screen overlay that slides away on first visit.
 * Uses sessionStorage so it only plays once per session.
 */
export function CinematicEntrance() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only play on homepage, first visit this session
    if (window.location.pathname !== "/") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{ backgroundColor: "hsl(var(--contact))" }}
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{ backgroundColor: "hsl(var(--contact))" }}
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          {/* Center text */}
          <motion.span
            className="relative z-10 text-3xl md:text-5xl font-[900] tracking-tight"
            style={{
              color: "hsl(var(--contact-foreground))",
              fontFamily: "Inter",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Ivan de Murard
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CinematicEntrance;
