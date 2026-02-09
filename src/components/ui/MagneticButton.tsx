import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Glow color in HSL format (e.g., "164 88% 20%") */
  glowColor?: string;
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** Magnetic pull strength */
  magneticStrength?: number;
  /** Variant style */
  variant?: "primary" | "secondary" | "ghost";
  /** Size */
  size?: "sm" | "md" | "lg";
}

/**
 * MagneticButton - Button with magnetic pull effect and glow
 * Attracts slightly towards cursor and pulses with luminous halo
 */
export function MagneticButton({
  children,
  className,
  glowColor = "164 88% 20%", // Contact emerald
  glowIntensity = 0.6,
  magneticStrength = 0.3,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: MagneticButtonProps) {
  const { ref, style: magneticStyle, isHovered } = useMagnetic({
    strength: disabled ? 0 : magneticStrength,
    maxDistance: 120,
  });
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || disabled) {
      props.onClick?.(e);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    props.onClick?.(e);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-contact text-contact-foreground hover:bg-contact/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "bg-transparent text-foreground hover:bg-muted",
  };

  // Extract motion-incompatible props
  const { onAnimationStart, onAnimationEnd, onDrag, onDragEnd, onDragStart, ...safeProps } = props;

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full font-semibold transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={magneticStyle}
      onClick={handleClick}
      disabled={disabled}
      whileTap={prefersReducedMotion || disabled ? {} : { scale: 0.98 }}
      {...safeProps}
    >
      {/* Glow effect */}
      {!disabled && !prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            boxShadow: `0 0 20px 4px hsl(${glowColor} / ${glowIntensity * 0.3}), 
                        0 0 40px 8px hsl(${glowColor} / ${glowIntensity * 0.15})`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.3,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      )}

      {/* Breathe animation (idle pulse) */}
      {!disabled && !prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            boxShadow: `0 0 25px 5px hsl(${glowColor} / ${glowIntensity * 0.2})`,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Ripple effects */}
      {!prefersReducedMotion &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
              animation: "ripple 600ms ease-out",
            }}
            aria-hidden="true"
          />
        ))}
    </motion.button>
  );
}

export default MagneticButton;
