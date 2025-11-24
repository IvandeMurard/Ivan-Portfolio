/**
 * TimelinePhase Component
 * Phase individuelle de la timeline Process & Key Decisions
 */

import { motion } from 'framer-motion';
import { timelinePhase } from '@/config/case-study/case-study-animations';
import { ReactNode } from 'react';

interface TimelinePhaseProps {
  icon: ReactNode;
  phase: string;
  description?: string;
  bullets: string[];
  metric?: {
    label: string;
    value: string;
  };
  visual?: string;
  index: number;
}

export const TimelinePhase: React.FC<TimelinePhaseProps> = ({
  icon,
  phase,
  description,
  bullets,
  metric,
  visual,
  index,
}) => {
  return (
    <motion.div
      className="relative pl-12 pb-12 last:pb-0"
      custom={index}
      variants={timelinePhase}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 last:hidden" />

      {/* Icon Dot */}
      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl border-4 border-white dark:border-gray-800 shadow-sm">
        {icon}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-sm transition-shadow">
        {/* Phase Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{phase}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        )}

        {/* Bullets */}
        <ul className="space-y-2 mb-4">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-gray-700 dark:text-gray-300 mr-2 mt-0.5">▸</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {/* Key Metric */}
        {metric && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
              {metric.label}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{metric.value}</p>
          </div>
        )}

        {/* Visual Asset */}
        {visual && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={visual}
              alt={`${phase} visual`}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * TimelineContainer Component
 * Wrapper pour timeline complète
 */
interface TimelineContainerProps {
  children: ReactNode;
  title?: string;
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  children,
  title,
}) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

