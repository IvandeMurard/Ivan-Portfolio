/**
 * ScrollReveal - Animated wrapper that reveals content on scroll
 * Uses Framer Motion's whileInView for performant scroll animations
 */

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

type RevealVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation variant */
  variant?: RevealVariant;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of animation (seconds) */
  duration?: number;
  /** How much of element must be visible to trigger (0-1) */
  threshold?: number;
  /** Additional className */
  className?: string;
  /** Whether to animate only once */
  once?: boolean;
}

const variants: Record<RevealVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
  once = true,
}: ScrollRevealProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer - Wrapper for staggered children animations
 */
interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before first child */
  initialDelay?: number;
  /** Additional className */
  className?: string;
  /** Whether to animate only once */
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
  once = true,
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: initialDelay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem - Child component for staggered animations
 */
interface StaggerItemProps {
  children: ReactNode;
  /** Animation variant */
  variant?: RevealVariant;
  /** Additional className */
  className?: string;
}

export const StaggerItem = ({
  children,
  variant = 'fade-up',
  className = '',
}: StaggerItemProps) => {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

