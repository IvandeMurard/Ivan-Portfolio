import { motion } from "framer-motion";
import { ResourceCard, Resource } from "./ResourceCard";

interface ShelfHorizontalProps {
  categoryName: string;
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
  delay?: number;
  expandedResourceId: string | null;
  focusedCardIndex?: number;
  allResourcesIndexOffset?: number;
  onCardRef?: (resourceId: string, node: HTMLDivElement | null) => void;
}

export function ShelfHorizontal({ categoryName, resources, onResourceClick, delay = 0, expandedResourceId, focusedCardIndex, allResourcesIndexOffset = 0, onCardRef }: ShelfHorizontalProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="text-[#0A0A0A] mb-6 text-2xl md:text-3xl font-semibold tracking-tight">
        {categoryName}
      </h2>

      {/* Shelf divider with subtle shadow for depth */}
      <div className="relative w-full h-px bg-[#DADADA] mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />

      {/* Horizontal scrolling shelf - Netflix/Apple Books style */}
      <div className="flex gap-10 overflow-x-auto pb-4 scrollbar-hide" style={{ alignItems: "flex-start" }}>
        {resources.map((resource, index) => {
          const globalIndex = allResourcesIndexOffset + index;
          const isFocused = focusedCardIndex === globalIndex;
          return (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={() => onResourceClick(resource)}
              isFocused={isFocused}
              cardRef={onCardRef ? (node) => onCardRef(resource.id, node) : undefined}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

