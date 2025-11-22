import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, X } from "lucide-react";

export interface VisualCardProps {
  id: string;
  type: 'community' | 'inspiration' | 'resource' | 'tool';
  name: string;
  description?: string | null;
  image_url?: string | null;
  logo_url?: string | null; // for tools only
  personal_comment?: string | null;
  tags?: string[] | null;
  url?: string | null;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  index?: number;
  cardRef?: React.RefObject<HTMLDivElement>;
}

/**
 * VisualCard Component
 * 
 * Image-first card with hover comment and horizontal expansion on click.
 * 
 * States:
 * 1. Closed (default): Image only with rounded corners and subtle shadow
 * 2. Hover: Shows overlay with gradient fade from bottom displaying comment or description
 * 3. Expanded (on click): Horizontal layout with image (40%) + content (60%)
 * 
 * Image Fallback Strategy:
 * 1. image_url (if exists)
 * 2. logo_url (if exists, tools only)
 * 3. Placeholder: ui-avatars.com with name
 * 
 * Comment Fallback Strategy:
 * 1. personal_comment (if exists) → show in italic
 * 2. description (if personal_comment null) → show normal
 * 3. null (if both null) → don't show overlay on hover
 */
export function VisualCard({
  id,
  type,
  name,
  description,
  image_url,
  logo_url,
  personal_comment,
  tags,
  url,
  isExpanded,
  onToggle,
  onNavigate,
  cardRef: externalRef,
}: VisualCardProps) {
  // Internal ref if no external ref provided
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = externalRef || internalRef;

  // Image fallback strategy
  const imageUrl = image_url || logo_url || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=065f46&color=fff`;

  // Comment fallback strategy
  const hasComment = personal_comment || description;

  // Handle image error with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=065f46&color=fff`;
  };

  // Ref for expanded content container (for focus trap)
  const expandedContentRef = useRef<HTMLDivElement>(null);

  // Get all focusable elements within expanded card
  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
      (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }
    );
  };

  // Focus trap handler for Tab navigation within expanded card
  const handleTabKey = (e: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
    if (!isExpanded || !expandedContentRef.current) return;

    const focusableElements = getFocusableElements(expandedContentRef.current);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    // Check if active element is within the expanded card
    const isWithinCard = expandedContentRef.current.contains(activeElement) || 
                         activeElement === cardRef.current;

    if (!isWithinCard) return;

    if (e.shiftKey) {
      // Shift+Tab: move backwards
      if (activeElement === firstElement || activeElement === cardRef.current) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: move forwards
      if (activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      } else if (activeElement === cardRef.current) {
        // If card container is focused, move to first focusable element
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Tab: focus trap is handled by document-level listener when expanded
    // Allow Tab to work normally when collapsed

    // Prevent default behavior for handled keys
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Escape' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Enter or Space: toggle expansion
    if (e.key === 'Enter' || e.key === ' ') {
      onToggle(id);
    }

    // Escape: close expanded card
    if (e.key === 'Escape' && isExpanded) {
      onToggle(id);
    }

    // Arrow keys: navigate between cards (only when not expanded, or allow when expanded)
    if (onNavigate && (e.key.startsWith('Arrow'))) {
      const direction = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
      onNavigate(direction);
    }
  };

  // Focus management: focus card when expanded and smooth scroll
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.focus();
      // Smooth scroll into view if partially offscreen
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [isExpanded, cardRef]);

  // Focus trap: prevent Tab from escaping expanded card
  useEffect(() => {
    if (!isExpanded || !expandedContentRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements(expandedContentRef.current!);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Check if active element is within the expanded card
      const isWithinCard = expandedContentRef.current!.contains(activeElement) || 
                           activeElement === cardRef.current;

      if (!isWithinCard) return;

      if (e.shiftKey) {
        // Shift+Tab: move backwards
        if (activeElement === firstElement || activeElement === cardRef.current) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move forwards
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (activeElement === cardRef.current) {
          // If card container is focused, move to first focusable element
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add listener to document to catch Tab events (capture phase)
    document.addEventListener('keydown', handleFocusTrap, true);

    return () => {
      document.removeEventListener('keydown', handleFocusTrap, true);
    };
  }, [isExpanded, cardRef]);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${name} card. ${isExpanded ? 'Expanded' : 'Collapsed'}. Press Enter or Space to ${isExpanded ? 'close' : 'expand'}.`}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full overflow-hidden",
        // Focus styles
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        // Smooth height transition for expansion
        "transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        // Closed state: rounded corners (16px = rounded-xl), subtle shadow
        !isExpanded && "rounded-xl bg-card border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        // Expanded state: full layout with padding
        isExpanded && "rounded-xl bg-card border border-border shadow-md"
      )}
    >
      {!isExpanded ? (
        // Closed State: Image-first card
        <button
          onClick={() => onToggle(id)}
          className="relative w-full group cursor-pointer"
          aria-expanded={false}
          aria-label={`Expand ${name}`}
        >
          {/* Image with aspect ratio constraint */}
          <div className="relative w-full overflow-hidden rounded-xl bg-muted/30">
            {type === 'tool' && logo_url ? (
              // Logo container for tools (more compact, centered)
              <div className="flex items-center justify-center p-8 aspect-square max-h-[200px]">
                <img
                  src={imageUrl}
                  alt={name}
                  className="max-w-full max-h-full object-contain"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ) : (
              // Regular image (with max height constraint)
              <div className="relative w-full aspect-[4/3] max-h-[280px]">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            )}

            {/* Hover Overlay (conditional) */}
            {hasComment && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                {/* Gradient fade from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                
                {/* Comment/Description text */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p
                    className={cn(
                      "text-xs md:text-sm text-white line-clamp-3 leading-relaxed",
                      personal_comment && "italic"
                    )}
                  >
                    {personal_comment || description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </button>
      ) : (
        // Expanded State: Horizontal layout
        <div 
          ref={expandedContentRef}
          className="relative flex flex-col md:flex-row gap-6 p-5 md:p-6"
        >
          {/* Close button (top-right) */}
          <button
            onClick={() => onToggle(id)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Image (40% on desktop, full width on mobile) */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            {type === 'tool' && logo_url ? (
              // Logo container for tools (compact, centered with padding)
              <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg aspect-square max-h-[240px]">
                <img
                  src={imageUrl}
                  alt={name}
                  className="max-w-full max-h-full object-contain"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ) : (
              <button
                onClick={() => onToggle(id)}
                className="w-full cursor-pointer rounded-lg overflow-hidden"
                aria-label="Close"
              >
                <div className="relative w-full aspect-[4/3] max-h-[300px]">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              </button>
            )}
          </div>

          {/* Right: Content (60% on desktop, full width on mobile) */}
          <div className="flex-1 space-y-3">
            {/* Title and Subtitle */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              {description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              )}
            </div>

            {/* Personal Comment (if exists) */}
            {personal_comment && (
              <blockquote className="border-l-2 border-accent/60 pl-4 py-2 italic text-sm text-muted-foreground leading-relaxed">
                {personal_comment}
              </blockquote>
            )}

            {/* Tags - Limited display (max 3 shown) */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted/40 rounded-md border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-[10px] text-muted-foreground/70">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* CTA: Visit Resource */}
            {url && (
              <div className="pt-2 border-t border-border/40">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 hover:underline transition-colors"
                >
                  Visit resource
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

