import { motion } from "framer-motion";
import { Resource } from "@/data/resource-library/resources";

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
  isFocused?: boolean;
  cardRef?: (node: HTMLDivElement | null) => void;
}

export function ResourceCard({ resource, onClick, isFocused = false, cardRef }: ResourceCardProps) {
  const formatLabels: Record<string, string> = {
    book: "Book",
    article: "Article",
    podcast: "Podcast",
    talk: "Talk",
    video: "Video",
    community: "Community",
    tool: "Tool",
    website: "Website",
    newsletter: "Newsletter", // For backward compatibility
  };

  return (
    <motion.div
      ref={cardRef}
      className="cursor-pointer flex-shrink-0 group"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      tabIndex={isFocused ? 0 : -1}
    >
      <div
        className={`relative bg-white rounded-lg overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ${
          isFocused ? "ring-2 ring-[#0A0A0A] ring-offset-2" : ""
        }`}
        style={{ elevation: 1 }}
      >
        {/* Image - Image-first design */}
        <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
          {/* Format badge - subtle, top right */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 text-[10px] font-medium bg-white/95 backdrop-blur-sm rounded text-[#2A2A2A] uppercase tracking-wide">
              {formatLabels[resource.format] || resource.format}
            </span>
          </div>
        </div>

        {/* Card content - minimal */}
        <div className="p-3 space-y-1">
          <h3 className="text-[#111] font-medium text-sm leading-tight line-clamp-2">
            {resource.title || "Untitled"}
          </h3>
          {resource.description && (
            <p className="text-[#666] text-xs leading-relaxed line-clamp-2">
              {resource.description}
            </p>
          )}
          {/* Category - subtle */}
          <div className="pt-1">
            <span className="text-[10px] text-[#999] uppercase tracking-wide">
              {resource.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
