import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export interface ZoomLevel {
  /** Level identifier (0 = most zoomed out, higher = more zoomed in) */
  level: number;
  /** Content to display at this zoom level */
  content: React.ReactNode;
  /** Optional label for this level */
  label?: string;
  /** Zoom scale threshold (0-1) where this level becomes active */
  threshold: number;
}

interface ContextualZoomProps {
  /** Array of zoom levels, ordered from most zoomed out to most zoomed in */
  levels: ZoomLevel[];
  /** Initial zoom level (0-1) */
  initialZoom?: number;
  /** Minimum zoom level (0-1) */
  minZoom?: number;
  /** Maximum zoom level (0-1) */
  maxZoom?: number;
  /** Whether to show zoom controls */
  showControls?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Height of the zoom container */
  height?: string;
}

/**
 * ContextualZoom - A zoom component where content changes based on zoom level
 * 
 * Inspired by: "Zooming that changes context, not just size"
 * - Zoom out in a calendar → you see months instead of days
 * - Zoom in on a map → streets appear, then shops, then reviews
 * 
 * It's like shifting layers of meaning, not pixels.
 */
export function ContextualZoom({
  levels,
  initialZoom = 0.5,
  minZoom = 0,
  maxZoom = 1,
  showControls = true,
  className = "",
  height = "600px",
}: ContextualZoomProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Sort levels by threshold to ensure proper ordering
  const sortedLevels = [...levels].sort((a, b) => a.threshold - b.threshold);

  // Find the active level based on current zoom
  const activeLevel = sortedLevels.find(
    (level, index) => {
      const nextLevel = sortedLevels[index + 1];
      if (!nextLevel) return true; // Last level
      return zoom >= level.threshold && zoom < nextLevel.threshold;
    }
  ) || sortedLevels[0];

  // Smooth zoom value for animations
  const zoomSpring = useSpring(zoom, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });

  // Handle wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setZoom((prev) => Math.max(minZoom, Math.min(maxZoom, prev + delta)));
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [minZoom, maxZoom]);

  // Handle pinch zoom (touch)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDistance = 0;
    let initialZoom = zoom;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsDragging(true);
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialZoom = zoom;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isDragging) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const scale = currentDistance / initialDistance;
        const newZoom = Math.max(
          minZoom,
          Math.min(maxZoom, initialZoom + (scale - 1) * 0.5)
        );
        setZoom(newZoom);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [zoom, minZoom, maxZoom, isDragging]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(maxZoom, prev + 0.1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(minZoom, prev - 0.1));
  };

  const handleReset = () => {
    setZoom(initialZoom);
  };

  // Calculate scale for visual zoom effect
  const scale = useTransform(zoomSpring, [minZoom, maxZoom], [0.8, 1.2]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Zoom container */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-2xl border border-border bg-muted/30 cursor-zoom-in"
        style={{ touchAction: "none" }}
      >
        {/* Content with smooth transitions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{
            scale,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Fade between levels */}
          {sortedLevels.map((level, index) => {
            const isActive = level.level === activeLevel.level;
            const opacity = isActive ? 1 : 0;
            const zIndex = isActive ? 10 : 0;

            return (
              <motion.div
                key={level.level}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity, zIndex }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1], // design-tokens easing
                }}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {level.content}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Zoom level indicator */}
        {showControls && (
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 shadow-sm">
            <div className="text-xs font-medium text-muted-foreground">
              {activeLevel.label || `Level ${activeLevel.level + 1}`}
            </div>
            <div className="text-xs text-foreground/60 mt-0.5">
              {Math.round(zoom * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Zoom controls */}
      {showControls && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <motion.button
            onClick={handleZoomIn}
            disabled={zoom >= maxZoom}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-foreground" />
          </motion.button>

          <motion.button
            onClick={handleZoomOut}
            disabled={zoom <= minZoom}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-foreground" />
          </motion.button>

          <motion.button
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Reset zoom"
          >
            <Maximize2 className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      )}

      {/* Instructions hint */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 shadow-sm">
        <p className="text-xs text-muted-foreground">
          Scroll to zoom • Pinch on mobile
        </p>
      </div>
    </div>
  );
}

export default ContextualZoom;

