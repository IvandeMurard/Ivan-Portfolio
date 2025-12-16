import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselRowProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselRow: React.FC<CarouselRowProps> = ({ children, className = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 344; // Card width (320px) + gap (24px)
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Removed global keyboard trap - navigation handled by individual cards

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      updateScrollState();
      scrollEl.addEventListener('scroll', updateScrollState);
      window.addEventListener('resize', updateScrollState);
      
      return () => {
        scrollEl.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, []);

  return (
    <div className={`relative group ${className}`} role="region" aria-label="Project carousel" aria-roledescription="carousel">
      {/* Left Fade Gradient */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
      )}

      {/* Right Fade Gradient */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />
      )}

      {/* Left Arrow - Always visible */}
      <button
        onClick={() => scroll('left')}
        aria-disabled={!canScrollLeft}
        disabled={!canScrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center transition-all duration-200 hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Scroll carousel left"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
      </button>

      {/* Right Arrow - Always visible, offset on lg+ to avoid ProgressIndicator */}
      <button
        onClick={() => scroll('right')}
        aria-disabled={!canScrollRight}
        disabled={!canScrollRight}
        className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center transition-all duration-200 hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Scroll carousel right"
      >
        <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
      </button>

      {/* Compteur de slides accessible */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Project carousel with ${React.Children.count(children)} items`}
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x pb-4"
        style={{ scrollPaddingLeft: '1.5rem' }}
      >
        {React.Children.map(children, (child, index) => {
          const total = React.Children.count(children);
          return (
            <div 
              key={index} 
              role="group"
              aria-roledescription="slide"
              aria-label={`Project ${index + 1} of ${total}`}
              className="snap-start flex-shrink-0 animate-fade-in"
              style={{ 
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'backwards'
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};