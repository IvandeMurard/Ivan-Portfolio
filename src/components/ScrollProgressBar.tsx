/**
 * ScrollProgressBar - Visual indicator of page scroll progress
 * Fixed at top of viewport, shows how far user has scrolled
 */

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  /** Color of the progress bar */
  color?: string;
  /** Track (background) color */
  trackColor?: string;
  /** Height of the progress bar in pixels */
  height?: number;
  /** Distance from the top in pixels (ex: below navbar) */
  top?: number;
  /** Z-index for stacking */
  zIndex?: number;
}

export const ScrollProgressBar = ({
  color = 'hsl(var(--accent))',
  trackColor = 'hsl(var(--border))',
  height = 3,
  top = 56,
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
    <div
      className="fixed left-0 right-0 pointer-events-none"
      style={{ top, height, zIndex }}
      aria-hidden="true"
    >
      {/* Track */}
      <div
        className="absolute inset-0"
        style={{ background: trackColor, opacity: 0.35 }}
      />

      {/* Progress */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          scaleX,
          background: color,
        }}
      />
    </div>
  );
};
