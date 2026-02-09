import React from "react";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Scale factor on hover */
  scale?: number;
  /** Enable glare effect */
  glare?: boolean;
  /** Custom perspective distance */
  perspective?: number;
  /** Animation speed in ms */
  speed?: number;
  /** Whether card is clickable */
  onClick?: () => void;
  /** Tab index for accessibility */
  tabIndex?: number;
  /** ARIA label */
  ariaLabel?: string;
}

/**
 * Card3D - Wrapper component that adds 3D tilt effect on hover
 * Uses useTilt hook for smooth cursor-following rotation
 */
export function Card3D({
  children,
  className,
  maxTilt = 12,
  scale = 1.02,
  glare = true,
  perspective = 1000,
  speed = 400,
  onClick,
  tabIndex,
  ariaLabel,
}: Card3DProps) {
  const { ref, style, glareStyle, isHovered } = useTilt({
    maxTilt,
    scale,
    glare,
    perspective,
    speed,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative transform-gpu",
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onClick={onClick}
      tabIndex={tabIndex}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
      
      {/* Glare overlay */}
      {glare && <div style={glareStyle} aria-hidden="true" />}
      
      {/* Dynamic shadow */}
      <div
        className="absolute inset-0 -z-10 rounded-[inherit] transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0, 0, 0, 0.25), 
               0 10px 20px -10px rgba(0, 0, 0, 0.15)`
            : `0 10px 25px -10px rgba(0, 0, 0, 0.15), 
               0 4px 10px -5px rgba(0, 0, 0, 0.1)`,
          transform: "translateZ(-50px)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default Card3D;
