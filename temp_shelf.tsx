import { motion } from 'motion/react';
import { ResourceCard, Resource } from './ResourceCard';

interface ShelfProps {
  categoryName: string;
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
  delay?: number;
  expandedResourceId: string | null;
}

export function Shelf({ categoryName, resources, onResourceClick, delay = 0, expandedResourceId }: ShelfProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="text-[#0A0A0A] mb-6">
        {categoryName}
      </h2>
      
      {/* Shelf divider with subtle shadow for depth */}
      <div className="relative w-full h-px bg-[#DADADA] mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />
      
      {/* Cards aligned to appear resting on the shelf */}
      <div className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide" style={{ alignItems: 'flex-start' }}>
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => onResourceClick(resource)}
            isExpanded={expandedResourceId === resource.id}
          />
        ))}
      </div>
    </motion.div>
  );
}
