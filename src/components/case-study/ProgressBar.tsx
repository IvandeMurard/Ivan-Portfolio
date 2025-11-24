/**
 * ProgressBar Component
 * Barre de progression fixée en haut de page qui suit le scroll
 */

import { motion, useScroll } from 'framer-motion';

export const ProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-[56px] left-0 right-0 h-1 bg-gray-900 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
};

