import { motion } from "framer-motion";
import { Resource } from "./ResourceCard";

interface ResourceCardVerticalProps {
  resource: Resource;
  onClick: () => void;
}

export function ResourceCardVertical({ resource, onClick }: ResourceCardVerticalProps) {
  return (
    <motion.div
      className="cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Visual-first: Cover takes 90% of space */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Format badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 text-[10px] font-medium bg-white/95 backdrop-blur-sm rounded text-[#2A2A2A] uppercase tracking-wide">
              {resource.format}
            </span>
          </div>
        </div>

        {/* Title - minimal, at bottom */}
        <div className="p-3">
          <h3 className="font-semibold tracking-tight text-sm text-neutral-900" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {resource.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

