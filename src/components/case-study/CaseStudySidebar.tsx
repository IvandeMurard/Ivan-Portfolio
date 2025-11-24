/**
 * CaseStudySidebar Component
 * Sidebar sticky avec informations projet, repliable sur mobile
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarExpand, sidebarContent } from '@/config/case-study/case-study-animations';

interface CaseStudySidebarProps {
  role: string;
  duration: string;
  team?: string;
  client: string;
  industry: string;
  context?: string;
  isCollapsible?: boolean;
}

export const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({
  role,
  duration,
  team,
  client,
  industry,
  context,
  isCollapsible = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarItems = [
    { label: 'Role', value: role },
    { label: 'Duration', value: duration },
    ...(team ? [{ label: 'Team', value: team }] : []),
    { label: 'Client', value: client },
    { label: 'Industry', value: industry },
    ...(context ? [{ label: 'Context', value: context }] : []),
  ];

  return (
    <aside className="relative">
      {/* Desktop: Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              📋 Project Info
            </h3>
          </div>

          <div className="space-y-4">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: Collapsible Button + Drawer */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <span className="text-sm font-semibold text-gray-900">
            📋 Project Info
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3">
                {sidebarItems.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

