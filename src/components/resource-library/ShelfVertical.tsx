import { motion } from "framer-motion";
import { Resource } from "./ResourceCard";
import { ResourceCardVertical } from "./ResourceCardVertical";

interface ShelfVerticalProps {
  categoryName: string;
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
  delay?: number;
}

export function ShelfVertical({ categoryName, resources, onResourceClick, delay = 0 }: ShelfVerticalProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="text-[#0A0A0A] mb-6 text-sm font-medium tracking-tight">
        {categoryName}
      </h2>

      {/* Shelf divider with subtle shadow for depth */}
      <div className="relative w-full h-px bg-[#DADADA] mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />

      {/* Vertical grid for books - stacked shelves */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResourceCardVertical
              resource={resource}
              onClick={() => onResourceClick(resource)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
