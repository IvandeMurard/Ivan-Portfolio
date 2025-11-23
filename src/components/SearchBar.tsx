import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface FilterState {
  types: ('all' | 'community' | 'inspiration' | 'resource' | 'tool')[];
  tags: string[];
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  availableTags: string[];
  resultCount: number;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  onFilterChange,
  availableTags,
  resultCount,
  placeholder = "Search resources, tools, inspiration...",
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    types: ['all'],
    tags: [],
  });
  const prefersReducedMotion = useReducedMotion();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Handle click outside to close filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        // Only close if input is not focused
        if (document.activeElement !== searchInputRef.current) {
          setShowFilters(false);
        }
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFilters]);

  // Handle type filter
  const toggleType = (type: string) => {
    setFilters((prev) => {
      const newTypes = [...prev.types];
      const typeValue = type.toLowerCase() as FilterState['types'][number];

      if (type === 'all') {
        // "All" clears others and toggles itself
        if (newTypes.includes('all')) {
          return { ...prev, types: [] };
        } else {
          return { ...prev, types: ['all'] };
        }
      } else {
        // Remove 'all' if selecting a specific type
        const filteredTypes = newTypes.filter((t) => t !== 'all');
        
        if (filteredTypes.includes(typeValue)) {
          // Deselect
          const updated = filteredTypes.filter((t) => t !== typeValue);
          return { ...prev, types: updated.length > 0 ? updated : ['all'] };
        } else {
          // Select
          return { ...prev, types: [...filteredTypes, typeValue] };
        }
      }
    });
  };

  // Handle tag filter
  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const newTags = [...prev.tags];
      if (newTags.includes(tag)) {
        return { ...prev, tags: newTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, tags: [...newTags, tag] };
      }
    });
  };

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const typeOptions = [
    { id: 'all', label: 'All' },
    { id: 'community', label: 'Communities' },
    { id: 'inspiration', label: 'Inspirations' },
    { id: 'resource', label: 'Resources' },
    { id: 'tool', label: 'Tools' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4" ref={containerRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowFilters(true)}
          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-accent outline-none transition-colors duration-280"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>

      {/* Filters (Slide-in on focus) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-4 p-6 bg-secondary/50 rounded-xl border border-border"
          >
            {/* Type Filters */}
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Type</p>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((type) => {
                  const isActive = filters.types.includes(
                    type.id as FilterState['types'][number]
                  );
                  return (
                    <button
                      key={type.id}
                      onClick={() => toggleType(type.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "bg-background border border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag Filters */}
            {availableTags.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 text-foreground">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isActive = filters.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "bg-background border border-border text-foreground hover:bg-muted"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Result Count */}
            <p className="text-sm text-muted-foreground pt-2 border-t border-border">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

