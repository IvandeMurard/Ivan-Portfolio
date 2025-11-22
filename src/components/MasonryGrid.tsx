import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MasonryGrid Component
 * 
 * Pinterest-style masonry layout using CSS columns for optimal performance.
 * 
 * Responsive columns:
 * - xs (< 640px): 1 column
 * - sm (640px+): 2 columns
 * - md (768px+): 3 columns
 * - lg (1024px+): 4 columns
 * 
 * Automatically applies break-inside-avoid and mb-6 to direct children
 * to prevent item splitting and maintain 24px vertical spacing.
 */
export function MasonryGrid({ children, className }: MasonryGridProps) {
  return (
    <div
      className={cn(
        // Responsive column system using CSS columns
        "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
        
        // Gap between columns (24px from design tokens --space-lg)
        "gap-6",
        
        // Full width container
        "w-full",
        
        // Automatically apply break-inside-avoid and mb-6 to all direct children
        // This prevents items from splitting across columns and maintains vertical spacing
        "[&>*]:break-inside-avoid [&>*]:mb-6",
        
        className
      )}
    >
      {children}
    </div>
  );
}

