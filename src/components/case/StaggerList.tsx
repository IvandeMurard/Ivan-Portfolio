import { motion } from "framer-motion";
import { ReactNode } from "react";
import { stagger, duration, easing } from "@/config/case-study/case-study-animations";

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerList({
  children,
  className = "",
  staggerDelay = stagger.children,
  initialDelay = 0.1,
}: StaggerListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
}

const itemVariants = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: easing.product },
    },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.base, ease: easing.product },
    },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.slow, ease: easing.product },
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.base, ease: easing.product },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.base, ease: easing.product },
    },
  },
};

export function StaggerItem({ children, className = "", variant = "fade-up" }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants[variant]} className={className}>
      {children}
    </motion.div>
  );
}
