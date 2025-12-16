import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  onClearAll: () => void;
}

export function Filters({ searchQuery, onSearchChange, selectedTags, onTagToggle, availableTags, onClearAll }: FiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const visibleTags = showAllTags ? availableTags : availableTags.slice(0, 8);
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0;
  const showTagFilters = isSearchFocused || hasActiveFilters;

  return (
    <div className="border-b border-[#ECECEC] pb-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#666] hover:text-black transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear all ({selectedTags.length + (searchQuery ? 1 : 0)})
          </button>
        )}
        {showTagFilters && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#666] hover:text-black transition-colors"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4" />
                Show filters
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide filters
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="mx-auto">
          <div className="relative w-[400px] h-12">
            <input
              type="text"
              placeholder="Search anything."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                // Delay to allow clicking on tags
                setTimeout(() => {
                  if (!hasActiveFilters) {
                    setIsSearchFocused(false);
                  }
                }, 200);
              }}
              className="w-full h-full bg-white border border-[#E5E5E5] rounded-xl pl-12 pr-4 focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {showTagFilters && !isCollapsed && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {visibleTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      isSelected
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-[#F8F8F8] text-[#888] hover:bg-[#ECECEC] hover:text-[#333]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            
            {availableTags.length > 8 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-sm text-[#666] hover:text-black transition-colors"
              >
                {showAllTags ? 'Show less' : `Show ${availableTags.length - 8} more tags`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
