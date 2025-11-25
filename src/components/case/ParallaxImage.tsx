import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxStrength?: number;
  overlay?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  parallaxStrength = 150,
  overlay = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxStrength]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ opacity }}
          className="w-full h-full object-cover"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/80" />
      )}
    </div>
  );
}
