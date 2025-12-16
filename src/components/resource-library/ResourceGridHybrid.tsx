import { motion } from "framer-motion";
import { Resource } from "@/data/resource-library/resources";
import { ResourceCard } from "./ResourceCard";

interface ResourceGridHybridProps {
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
  focusedCardIndex?: number;
  allResourcesIndexOffset?: number;
  onCardRef?: (resourceId: string, node: HTMLDivElement | null) => void;
  delay?: number;
}

export function ResourceGridHybrid({
  resources,
  onResourceClick,
  focusedCardIndex,
  allResourcesIndexOffset = 0,
  onCardRef,
  delay = 0,
}: ResourceGridHybridProps) {
  // Hybrid layout: mix of grid and vertical flow
  // Max 2 rows per shelf, then wrap to next shelf
  // We'll use a simpler approach: just show all resources in the grid
  // The grid itself handles responsive columns via Tailwind classes
  const maxRows = 2;
  const itemsPerRow = 6; // Used for calculating shelf grouping, actual display handled by CSS grid

  // Group resources into shelves (max 2 rows per shelf)
  const shelves: Resource[][] = [];
  for (let i = 0; i < resources.length; i += itemsPerRow * maxRows) {
    shelves.push(resources.slice(i, i + itemsPerRow * maxRows));
  }

  return (
    <div className="space-y-8">
      {shelves.map((shelfResources, shelfIndex) => (
        <motion.div
          key={shelfIndex}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + shelfIndex * 0.1 }}
        >
          {shelfResources.map((resource, index) => {
            const globalIndex = allResourcesIndexOffset + shelfIndex * itemsPerRow * maxRows + index;
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
        </motion.div>
      ))}
    </div>
  );
}

