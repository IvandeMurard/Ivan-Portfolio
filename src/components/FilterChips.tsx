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
    <div className={`${disableSticky ? 'relative' : 'sticky top-[56px] z-40'} ${disableSticky ? '' : 'backdrop-blur-lg'} py-4 transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible scrollbar-hide snap-x snap-mandatory px-1 md:px-0 -mx-1 md:mx-0">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className="chip-filter snap-start"
            aria-pressed={activeChip === chip.id}
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