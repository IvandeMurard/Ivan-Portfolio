/**
 * CaseStudyTLDR Component
 * Encadré TL;DR avec points clés et disclaimer optionnel
 */

import { motion } from 'framer-motion';
import { fadeInUp } from '@/config/case-study/case-study-animations';

type AccentColor = 'blue' | 'orange' | 'green';

interface TLDRItem {
  label: string;
  content: string;
}

interface DisclaimerConfig {
  type: 'academic' | 'confidential' | 'custom';
  message?: string;
}

interface CaseStudyTLDRProps {
  items: TLDRItem[];
  disclaimer?: DisclaimerConfig;
  accentColor?: AccentColor;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    badge: 'bg-orange-100 text-orange-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    badge: 'bg-green-100 text-green-700',
  },
};

const disclaimerMessages = {
  academic: '📚 Academic Case Study',
  confidential: '🔒 Confidential Information Modified',
  custom: '',
};

export const CaseStudyTLDR: React.FC<CaseStudyTLDRProps> = ({
  items,
  disclaimer,
  accentColor = 'blue',
}) => {
  const colors = colorClasses[accentColor];

  return (
    <motion.aside
      className={`p-6 rounded-xl border-2 ${colors.bg} ${colors.border} mb-12`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Disclaimer Badge (si présent) */}
      {disclaimer && (
        <div className="flex items-start gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
            {disclaimerMessages[disclaimer.type] || disclaimer.message}
          </span>
        </div>
      )}

      {/* Header */}
      <h2 className={`text-lg font-bold mb-4 ${colors.text}`}>
        TL;DR
      </h2>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="text-sm"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={`font-semibold ${colors.text}`}>{item.label}:</span>{' '}
            <span className="text-gray-700">{item.content}</span>
          </motion.li>
        ))}
      </ul>

      {/* Custom Disclaimer Message (si type custom) */}
      {disclaimer?.type === 'custom' && disclaimer.message && (
        <p className="text-xs text-gray-600 mt-4 italic border-t border-gray-300 pt-3">
          {disclaimer.message}
        </p>
      )}

      {/* Academic Note (si type academic) */}
      {disclaimer?.type === 'academic' && (
        <p className="text-xs text-gray-600 mt-4 italic border-t border-gray-300 pt-3">
          {disclaimer.message || 
            'This project was completed as part of a training program with no contractual relationship.'}
        </p>
      )}
    </motion.aside>
  );
};

