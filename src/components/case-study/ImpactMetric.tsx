/**
 * ImpactMetric Component
 * Affiche une métrique avant/après avec trend indicator
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { metricCounter } from '@/config/case-study/case-study-animations';

type TrendType = 'up' | 'down' | 'neutral';
type SizeType = 'sm' | 'md' | 'lg';

interface ImpactMetricProps {
  before: string;
  after: string;
  label: string;
  trend: TrendType;
  size?: SizeType;
  animated?: boolean;
}

const sizeClasses = {
  sm: {
    before: 'text-2xl',
    after: 'text-4xl',
    arrow: 'text-2xl',
  },
  md: {
    before: 'text-3xl',
    after: 'text-5xl',
    arrow: 'text-3xl',
  },
  lg: {
    before: 'text-4xl md:text-5xl',
    after: 'text-6xl md:text-7xl',
    arrow: 'text-4xl',
  },
};

const trendConfig = {
  up: {
    color: 'text-green-600',
    bg: 'bg-green-50',
    icon: '↗',
  },
  down: {
    color: 'text-red-600',
    bg: 'bg-red-50',
    icon: '↘',
  },
  neutral: {
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    icon: '→',
  },
};

export const ImpactMetric: React.FC<ImpactMetricProps> = ({
  before,
  after,
  label,
  trend,
  size = 'lg',
  animated = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const sizes = sizeClasses[size];
  const trendStyle = trendConfig[trend];

  useEffect(() => {
    if (isInView && animated) {
      setTimeout(() => setShouldAnimate(true), 200);
    }
  }, [isInView, animated]);

  return (
    <motion.div
      ref={ref}
      className="bg-gray-50 rounded-2xl p-8 text-center"
      variants={metricCounter}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Before Value */}
      <div className="mb-4">
        <motion.span
          className={`font-bold text-gray-400 ${sizes.before}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {before}
        </motion.span>
      </div>

      {/* Arrow */}
      <div className={`mb-4 ${trendStyle.color} ${sizes.arrow}`}>
        {trendStyle.icon}
      </div>

      {/* After Value */}
      <div className="mb-6">
        <motion.span
          className={`font-extrabold ${trendStyle.color} ${sizes.after}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {after}
        </motion.span>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </p>
    </motion.div>
  );
};

/**
 * ImpactMetricsGrid Component
 * Wrapper pour afficher plusieurs métriques en grille
 */
interface ImpactMetricsGridProps {
  children: React.ReactNode;
  title?: string;
  columns?: 2 | 3 | 4;
}

export const ImpactMetricsGrid: React.FC<ImpactMetricsGridProps> = ({
  children,
  title = 'Impact & Results',
  columns = 3,
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
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
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

