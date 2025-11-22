import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export interface FilterState {
  types: ('community' | 'inspiration' | 'resource' | 'tool')[];
  tags: string[];
}

interface SearchWithFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterState) => void;
  availableTags?: string[];
  resultCount?: number;
  placeholder?: string;
}

const TYPE_OPTIONS = [
  { id: 'all', label: 'All', value: null as const },
  { id: 'community', label: 'Communities', value: 'community' as const },
  { id: 'inspiration', label: 'Inspirations', value: 'inspiration' as const },
  { id: 'resource', label: 'Resources', value: 'resource' as const },
  { id: 'tool', label: 'Tools', value: 'tool' as const },
] as const;

/**
 * SearchWithFilters Component
 * 
 * mymind-style search bar with popup filters.
 * Filters appear below the search bar on focus/type.
 * 
 * Features:
 * - Debounced search (300ms)
 * - Multi-select filters (types + tags)
 * - URL query params persistence (?type=resources&tags=AI,SaaS)
 * - Result count display
 * - Animated filter row slide-in
 */
export function SearchWithFilters({
  onSearch,
  onFilterChange,
  availableTags = [],
  resultCount,
  placeholder = "Search my resources, communities, tools...",
}: SearchWithFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize search query from URL or empty
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('q') || ''
  );
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize filters from URL params
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const typesParam = searchParams.get('type');
    const tagsParam = searchParams.get('tags');
    
    return {
      types: typesParam 
        ? typesParam.split(',').filter((t): t is FilterState['types'][number] => 
            ['community', 'inspiration', 'resource', 'tool'].includes(t)
          )
        : [],
      tags: tagsParam ? tagsParam.split(',') : [],
    };
  });

  // Debounce search query (300ms)
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Update URL params when filters or search change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    if (filterState.types.length > 0) {
      params.set('type', filterState.types.join(','));
    } else {
      params.delete('type');
    }

    if (filterState.tags.length > 0) {
      params.set('tags', filterState.tags.join(','));
    } else {
      params.delete('tags');
    }

    setSearchParams(params, { replace: true });
  }, [debouncedQuery, filterState, searchParams, setSearchParams]);

  // Call onSearch callback with debounced query
  useEffect(() => {
    onSearch?.(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  // Call onFilterChange callback when filters change
  useEffect(() => {
    onFilterChange?.(filterState);
  }, [filterState, onFilterChange]);

  // Show filters on focus, when typing, or when filters are active
  useEffect(() => {
    const hasActiveFilters = filterState.types.length > 0 || filterState.tags.length > 0;
    setShowFilters(isFocused || searchQuery.length > 0 || hasActiveFilters);
  }, [isFocused, searchQuery, filterState.types.length, filterState.tags.length]);

  const handleTypeToggle = useCallback((type: typeof TYPE_OPTIONS[number]['value']) => {
    setFilterState((prev) => {
      if (type === null) {
        // "All" clears other type filters
        return { ...prev, types: [] };
      }
      
      const newTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      
      return { ...prev, types: newTypes };
    });
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setFilterState((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      
      return { ...prev, tags: newTags };
    });
  }, []);

  const isTypeActive = (type: typeof TYPE_OPTIONS[number]['value']) => {
    if (type === null) {
      return filterState.types.length === 0;
    }
    return filterState.types.includes(type);
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            // Don't hide if clicking on filters
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (relatedTarget?.closest('[data-filter-container]')) {
              return;
            }
            // Delay to allow filter clicks before hiding
            setTimeout(() => setIsFocused(false), 200);
          }}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 pl-12 pr-4 rounded-xl border border-border",
            "bg-background text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
            "transition-all duration-200"
          )}
        />
      </div>

      {/* Filters Row (animated slide-in) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={(el) => { filterContainerRef.current = el; }}
            data-filter-container
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTypeToggle(option.value)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      "border",
                      isTypeActive(option.value)
                        ? "bg-secondary border-secondary text-foreground"
                        : "bg-background border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                    )}
                    aria-pressed={isTypeActive(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Tag Filters (dynamic) */}
              {availableTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                        "border",
                        filterState.tags.includes(tag)
                          ? "bg-secondary border-secondary text-foreground"
                          : "bg-background border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                      )}
                      aria-pressed={filterState.tags.includes(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Result Count */}
              {resultCount !== undefined && (
                <div className="text-sm text-muted-foreground">
                  {resultCount === 0 ? (
                    <span>No results</span>
                  ) : (
                    <span>{resultCount} {resultCount === 1 ? 'result' : 'results'}</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
