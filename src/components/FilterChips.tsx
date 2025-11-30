import React from 'react';

interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  activeChip: string;
  onChipChange: (chipId: string) => void;
  className?: string;
  disableSticky?: boolean;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ 
  chips, 
  activeChip, 
  onChipChange, 
  className = "",
  disableSticky = false
}) => {
  return (
    <div className={`${disableSticky ? 'relative' : 'sticky top-[56px] z-40'} ${disableSticky ? '' : 'backdrop-blur-lg'} py-4 transition-all duration-300 ease-in-out lg:pr-24 xl:pr-32 ${className}`}>
      <div role="tablist" aria-label="Filter options" className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible scrollbar-hide snap-x snap-mandatory">
        {chips.map((chip) => (
          <button
            key={chip.id}
            role="tab"
            aria-selected={activeChip === chip.id}
            aria-controls={`panel-${chip.id}`}
            tabIndex={activeChip === chip.id ? 0 : -1}
            className="chip-filter snap-start"
            onClick={() => onChipChange(chip.id)}
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {chip.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};