import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio_entrance_played";

const WELCOME_WORDS = [
  "Bienvenue",
  "Welcome",
  "Bienvenido",
  "Willkommen",
  "ようこそ",
];

export function CinematicEntrance() {
  const [show, setShow] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.location.pathname !== "/") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setShow(true);

    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= WELCOME_WORDS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 250);

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{ backgroundColor: "hsl(var(--contact))" }}
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Cycling welcome text */}
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              className="relative z-10 text-3xl md:text-5xl font-serif italic font-bold tracking-tight"
              style={{ color: "hsl(var(--contact-foreground))" }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {WELCOME_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CinematicEntrance;
