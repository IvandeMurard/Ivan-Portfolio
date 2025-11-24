/**
 * KeyLearning Component
 * Carte colorée pour afficher un apprentissage clé
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover, fadeInUp } from '@/config/case-study/case-study-animations';

type LearningColor = 'blue' | 'green' | 'orange' | 'purple';

interface KeyLearningProps {
  title: string;
  description: string;
  icon?: ReactNode;
  color: LearningColor;
}

const colorClasses = {
  blue: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    border: 'border-gray-200 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-900 dark:text-gray-100',
  },
  green: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    border: 'border-gray-200 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-900 dark:text-gray-100',
  },
  orange: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    border: 'border-gray-200 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-900 dark:text-gray-100',
  },
  purple: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    border: 'border-gray-200 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-900 dark:text-gray-100',
  },
};

export const KeyLearning: React.FC<KeyLearningProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      className={`p-6 rounded-xl border ${colors.bg} ${colors.border} ${colors.hoverBg} transition-all cursor-default`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={cardHover}
    >
      {/* Icon (optional) */}
      {icon && (
        <div className={`text-3xl mb-4 ${colors.icon}`} aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className={`text-lg font-bold mb-3 ${colors.title}`}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

/**
 * KeyLearningsGrid Component
 * Wrapper pour afficher plusieurs learnings en grille
 */
interface KeyLearningsGridProps {
  children: React.ReactNode;
  title?: string;
  columns?: 2 | 3 | 4;
}

export const KeyLearningsGrid: React.FC<KeyLearningsGridProps> = ({
  children,
  title = 'Key Learnings',
  columns = 2,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16">
      {title && (
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
      )}
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
        {children}
      </div>
    </section>
  );
};

/**
 * QuoteCard Component (variante pour stakeholder quotes)
 */
interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  color?: LearningColor;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  role,
  avatar,
  color = 'blue',
}) => {
  const colors = colorClasses[color];

  return (
    <motion.blockquote
      className={`p-6 rounded-xl border ${colors.bg} ${colors.border} relative`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Quote Mark */}
      <span className={`text-5xl ${colors.icon} opacity-30 absolute top-4 left-4`}>
        "
      </span>

      {/* Quote Text */}
      <p className="text-base text-gray-700 leading-relaxed mb-4 relative z-10 pl-6">
        {quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className={`font-semibold text-sm ${colors.title}`}>{author}</p>
          {role && (
            <p className="text-xs text-gray-500">{role}</p>
          )}
        </div>
      </div>
    </motion.blockquote>
  );
};

