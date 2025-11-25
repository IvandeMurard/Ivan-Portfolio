/**
 * ScrollProgressBar - Visual indicator of page scroll progress
 * Fixed at top of viewport, shows how far user has scrolled
 */

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  /** Color of the progress bar */
  color?: string;
  /** Height of the progress bar in pixels */
  height?: number;
  /** Z-index for stacking */
  zIndex?: number;
}

export const ScrollProgressBar = ({
  color = 'hsl(var(--accent))',
  height = 3,
  zIndex = 100,
}: ScrollProgressBarProps) => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        scaleX,
        height,
        zIndex,
        background: color,
      }}
      aria-hidden="true"
    />
  );
};
