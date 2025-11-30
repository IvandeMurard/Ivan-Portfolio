import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * TextReveal - Effet d'éclaircissement progressif de gauche à droite
 * Inspiré de marijanapav.com
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  style,
  delay = 0,
  duration = 1.2,
  as: Component = "span",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si reduced motion, considérer l'animation comme terminée
          if (prefersReducedMotion) {
            setIsComplete(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      controls.start({
        clipPath: "inset(0 0% 0 0)",
      }).then(() => {
        setIsComplete(true);
      });
    }
  }, [isVisible, controls, prefersReducedMotion]);

  return (
    <div ref={ref} className="relative">
      <Component
        className={className}
        style={{
          ...style,
          display: "block",
          position: "relative",
        }}
      >
        {/* Texte de base - faible opacité, caché après animation */}
        <span
          style={{
            opacity: isComplete ? 0 : 0.2,
            display: "block",
            transition: "opacity 0.3s ease-out",
          }}
          aria-hidden="true"
        >
          {children}
        </span>

        {/* Texte révélé avec clip-path animé */}
        <motion.span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "block",
            clipPath: "inset(0 100% 0 0)",
          }}
          animate={controls}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          transition={{
            delay,
            duration,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.span>
      </Component>
    </div>
  );
};

/**
 * TextRevealLines - Pour plusieurs lignes avec stagger
 */
interface TextRevealLinesProps {
  lines: Array<{
    text: string;
    className?: string;
    style?: React.CSSProperties;
    as?: "h1" | "h2" | "h3" | "p" | "span";
  }>;
  delay?: number;
  lineStagger?: number;
  duration?: number;
  className?: string;
}

export const TextRevealLines: React.FC<TextRevealLinesProps> = ({
  lines,
  delay = 0,
  lineStagger = 0.2,
  duration = 1.2,
  className = "",
}) => {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <TextReveal
          key={index}
          className={line.className}
          style={line.style}
          delay={delay + index * lineStagger}
          duration={duration}
          as={line.as}
        >
          {line.text}
        </TextReveal>
      ))}
    </div>
  );
};

export default TextReveal;

