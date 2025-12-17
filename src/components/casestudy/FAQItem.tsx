// components/FAQItem.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItemProps } from '@/types/casestudy';

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        type="button"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700 leading-relaxed animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};
