import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { easing, duration } from "@/config/case-study/case-study-animations";

interface ScrollRevealSectionProps {
  children: ReactNode;
  variant?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "fade-in" | "scale-in" | "slide-up";
  delay?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
  amount?: number;
}

const variants = {
  "fade-in-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
};

export function ScrollRevealSection({
  children,
  variant = "fade-in-up",
  delay = 0,
  className = "",
  stagger = false,
  staggerDelay = 0.06,
  amount = 0.2,
}: ScrollRevealSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-80px",
    amount 
  });

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: duration.base,
        delay,
        ease: easing.product,
      }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  variant = "fade-in-up",
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}
