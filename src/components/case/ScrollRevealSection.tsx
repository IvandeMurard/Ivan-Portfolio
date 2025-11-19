import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  variant?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "fade-in";
  delay?: number;
  className?: string;
}

const variants = {
  "fade-in-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollRevealSection({
  children,
  variant = "fade-in-up",
  delay = 0,
  className = "",
}: ScrollRevealSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
