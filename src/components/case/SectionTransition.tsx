import { motion } from "framer-motion";
import { ReactNode } from "react";
import { duration, easing } from "@/config/case-study/case-study-animations";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function SectionTransition({
  children,
  id,
  className = "",
  delay = 0,
}: SectionTransitionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.15 }}
      transition={{
        duration: duration.slow,
        delay,
        ease: easing.product,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
