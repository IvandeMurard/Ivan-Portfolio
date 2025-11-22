import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SkeletonCardProps {
  height?: number;
  className?: string;
}

/**
 * SkeletonCard Component
 * 
 * Loading skeleton for VisualCard with shimmer pulse animation.
 * Random heights (120px, 180px, 240px) to simulate masonry layout.
 * Uses design tokens: bg-muted with pulse animation.
 */
export function SkeletonCard({ height, className }: SkeletonCardProps) {
  // Generate random height if not provided (useMemo to keep same height during render)
  const cardHeight = useMemo(() => {
    if (height) return height;
    // Random height from predefined values
    const heights = [120, 180, 240];
    return heights[Math.floor(Math.random() * heights.length)];
  }, [height]);

  return (
    <div
      className={cn(
        "w-full rounded-xl bg-card border border-border overflow-hidden",
        "animate-pulse",
        className
      )}
      style={{ height: `${cardHeight}px` }}
      aria-label="Loading resource..."
    >
      {/* Shimmer skeleton content using design token bg-muted */}
      <div className="h-full w-full bg-muted" />
    </div>
  );
}

