/**
 * Case Study Animation System
 * Configurations Framer Motion pour animations fluides et performantes
 * Basé sur les design tokens (motion.easing.product)
 */

import { Variants, Transition } from 'framer-motion';

/**
 * Easing Functions
 * cubic-bezier(0.22, 1, 0.36, 1) = Easing "product" fluide
 */
export const easing = {
  product: [0.22, 1, 0.36, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  sharp: [0.4, 0, 0.6, 1] as const,
  emphasized: [0.4, 0, 0.2, 1] as const,
} as const;

/**
 * Durations
 * Base: 280ms (design token)
 */
export const duration = {
  fast: 0.2,    // 200ms - hover effects
  base: 0.28,   // 280ms - scroll animations
  slow: 0.4,    // 400ms - hero entrances
  slower: 0.6,  // 600ms - complex transitions
} as const;

/**
 * Stagger
 * Délais entre éléments d'une liste
 */
export const stagger = {
  children: 0.06,  // 60ms entre enfants (design token)
  list: 0.08,      // 80ms pour listes
  grid: 0.1,       // 100ms pour grids
} as const;

/**
 * SCROLL-TRIGGERED ANIMATIONS
 * Éléments apparaissent au scroll
 */

// Fade In + Slide Up
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
};

// Fade In (sans mouvement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
};

// Slide In from Left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: duration.slow,
      ease: easing.product,
    },
  },
};

// Slide In from Right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: duration.slow,
      ease: easing.product,
    },
  },
};

// Scale In (pour images, cartes)
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: duration.slow,
      ease: easing.product,
    },
  },
};

/**
 * STAGGERED ANIMATIONS
 * Pour listes d'éléments (timeline, learnings, metrics)
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.children,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
};

/**
 * HOVER ANIMATIONS
 * Pour cartes interactives, boutons
 */
export const cardHover = {
  y: -4,
  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.15)',
  transition: { 
    duration: duration.fast,
    ease: easing.smooth,
  },
};

export const buttonHover = {
  scale: 1.02,
  transition: { 
    duration: duration.fast,
    ease: easing.smooth,
  },
};

export const imageHover = {
  scale: 1.05,
  transition: { 
    duration: duration.slow,
    ease: easing.product,
  },
};

/**
 * HERO ANIMATIONS
 * Entrances pour hero section
 */
export const heroTitle: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.slow,
      ease: easing.product,
      delay: 0.2,
    },
  },
};

export const heroSubtitle: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
      delay: 0.4,
    },
  },
};

export const heroTag: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: duration.base,
      ease: easing.product,
      delay: 0.1,
    },
  },
};

/**
 * SIDEBAR ANIMATIONS
 * Collapse/Expand sidebar
 */
export const sidebarExpand: Variants = {
  collapsed: { 
    width: 0,
    opacity: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
  expanded: { 
    width: 'auto',
    opacity: 1,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
};

export const sidebarContent: Variants = {
  collapsed: { 
    opacity: 0,
    x: -20,
  },
  expanded: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
      delay: 0.1,
    },
  },
};

/**
 * TIMELINE ANIMATIONS
 * Pour phases de process
 */
export const timelinePhase: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
  },
  visible: (index: number) => ({
    opacity: 1, 
    x: 0,
    transition: { 
      duration: duration.base,
      ease: easing.product,
      delay: index * stagger.children,
    },
  }),
};

export const timelineLine = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { 
      duration: duration.slower,
      ease: easing.product,
    },
  },
};

/**
 * METRIC ANIMATIONS
 * Pour impact metrics avec counter effect
 */
export const metricCounter = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: duration.base,
      ease: easing.product,
    },
  },
};

/**
 * PAGE TRANSITION
 * Entre case studies
 */
export const pageTransition: Transition = {
  type: 'tween',
  duration: duration.slow,
  ease: easing.product,
};

export const pageVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  enter: { 
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: pageTransition,
  },
};

/**
 * UTILITY: InView Animation Hook Configuration
 * Pour scroll-triggered avec Intersection Observer
 */
export const inViewConfig = {
  once: true,           // Animate only once
  amount: 0.2,          // Trigger when 20% visible
  margin: '0px 0px -100px 0px', // Trigger 100px before element enters
};

/**
 * UTILITY: Parallax Configuration
 * Pour hero images avec parallax
 */
export const parallaxConfig = {
  scrollRange: [0, 500],     // Scroll pixels range
  outputRange: [0, 150],     // Transform pixels range
  clamp: true,               // Prevent overscroll
};

/**
 * PRESET: Complete Hero Animation
 * Combine tag + title + subtitle
 */
export const heroAnimationPreset = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: duration.slow,
        ease: easing.product,
      },
    },
  },
};

/**
 * PRESET: Complete Section Animation
 * Pour sections avec titre + contenu
 */
export const sectionAnimationPreset = {
  container: staggerContainer,
  title: fadeInUp,
  content: staggerItem,
};

/**
 * Export type definitions
 */
export type AnimationEasing = typeof easing;
export type AnimationDuration = typeof duration;
export type AnimationStagger = typeof stagger;

