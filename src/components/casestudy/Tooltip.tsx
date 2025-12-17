// components/Tooltip.tsx
import React, { useState } from 'react';
import { TooltipProps } from '@/types/casestudy';

export const Tooltip: React.FC<TooltipProps> = ({ term, definition, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        className="underline decoration-dotted decoration-blue-500 hover:decoration-solid cursor-help transition-all"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        type="button"
      >
        {children}
      </button>
      {isVisible && (
        <span className="absolute z-50 w-72 p-3 mt-2 text-sm bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg animate-fadeIn left-0 top-full">
          <strong className="block mb-1">{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
};
