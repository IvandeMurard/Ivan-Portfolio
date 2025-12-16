import { motion } from "framer-motion";
import { Resource } from "@/data/resource-library/resources";
import { ResourceGridHybrid } from "./ResourceGridHybrid";

interface ResourceShelvesProps {
  shelves: Array<{
    category: string;
    resources: Resource[];
  }>;
  onResourceClick: (resource: Resource) => void;
  focusedCardIndex?: number;
  onCardRef?: (resourceId: string, node: HTMLDivElement | null) => void;
}

export function ResourceShelves({ shelves, onResourceClick, focusedCardIndex, onCardRef }: ResourceShelvesProps) {
  return (
    <div className="space-y-16">
      {shelves.map((shelf, shelfIndex) => {
        if (shelf.resources.length === 0) return null;

        // Calculate index offset for this shelf
        const indexOffset = shelves
          .slice(0, shelfIndex)
          .reduce((acc, prevShelf) => acc + prevShelf.resources.length, 0);

        return (
          <motion.section
            key={shelf.category}
            className="relative group/shelf"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: shelfIndex * 0.1 }}
            whileHover={{ scale: 1.002 }}
          >
            {/* Shelf divider - subtle embossed effect with hover micro-animation */}
            <motion.div
              className="relative mb-8"
              whileHover={{ scaleY: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Light tonal background stripe */}
              <div className="absolute inset-0 bg-white/30 rounded-sm" style={{ height: "2px" }} />
              {/* Subtle embossed divider */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </motion.div>

            {/* Category label */}
            <h2 className="text-[#0A0A0A] mb-6 text-2xl md:text-3xl font-semibold tracking-tight">
              {shelf.category}
            </h2>

            {/* Cards on shelf - hybrid grid */}
            <ResourceGridHybrid
              resources={shelf.resources}
              onResourceClick={onResourceClick}
              focusedCardIndex={focusedCardIndex}
              allResourcesIndexOffset={indexOffset}
              onCardRef={onCardRef}
              delay={shelfIndex * 0.05}
            />
          </motion.section>
        );
      })}
    </div>
  );
}

