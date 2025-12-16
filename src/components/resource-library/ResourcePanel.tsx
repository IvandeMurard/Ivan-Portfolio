import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Resource } from "@/data/resource-library/resources";
import { useEffect, useRef, useState } from "react";
import { ResourceCard } from "./ResourceCard";

interface ResourcePanelProps {
  resource: Resource | null;
  onClose: () => void;
  allResources: Resource[];
  onResourceClick: (resource: Resource) => void;
}

export function ResourcePanel({ resource, onClose, allResources, onResourceClick }: ResourcePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle scroll for parallax effect manually
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !resource) return;

    const handleScroll = () => {
      const scrollTop = panel.scrollTop;
      const scrollHeight = panel.scrollHeight - panel.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    panel.addEventListener("scroll", handleScroll);
    return () => panel.removeEventListener("scroll", handleScroll);
  }, [resource]);
  
  // Calculate parallax offset (0 to 50px)
  const parallaxY = scrollProgress * 50;


  // Handle Escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (resource) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [resource, onClose]);

  if (!resource) return null;

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

  const relatedResources = allResources.filter((r) => resource.relatedIds.includes(r.id));

  return (
    <AnimatePresence>
      {resource && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in Panel - full screen on mobile, 600px on desktop */}
          <motion.div
            ref={panelRef}
            className="fixed right-0 top-0 h-full w-full lg:w-[600px] bg-[#F0EFEB] z-50 shadow-[-4px_0_24px_rgba(0,0,0,0.08)] overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-white/50 rounded-full transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-[#2A2A2A]" />
            </button>

            <div className="p-6 lg:p-12 space-y-8">
              {/* 1. Cover visual with parallax */}
              <div
                className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-sm"
                style={{ transform: `translateY(${parallaxY}px)` }}
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2. Title */}
              <h1 className="text-[#0A0A0A] text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                {resource.title}
              </h1>

              {/* 3. Category (type) */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/60 rounded-full text-sm text-[#2A2A2A] font-medium">
                  {resource.category}
                </span>
                <span className="px-2.5 py-1 bg-white/40 rounded-full text-[11px] font-medium text-[#2A2A2A] uppercase tracking-wide">
                  {formatLabels[resource.format] || resource.format}
                </span>
              </div>

              {/* 4. Tags (format) - if we want to show additional tags */}
              {resource.description && (
                <p className="text-[#2A2A2A] text-base leading-relaxed">
                  {resource.description}
                </p>
              )}

              {/* 5. My note: "Why this resource matters" */}
              <div className="space-y-2">
                <h3 className="text-[#0A0A0A] font-semibold text-lg">Why this resource matters</h3>
                <p className="text-[#2A2A2A] text-[15px] leading-relaxed">{resource.commentary}</p>
              </div>

              {/* 6. "What I learned from it" */}
              <div className="space-y-2">
                <h3 className="text-[#0A0A0A] font-semibold text-lg">What I learned from it</h3>
                <p className="text-[#2A2A2A] text-[15px] leading-relaxed">{resource.insight}</p>
              </div>

              {/* 7. "When I use it" (optional) */}
              {resource.whenUseful && (
                <div className="space-y-2">
                  <h3 className="text-[#0A0A0A] font-semibold text-lg">When I use it</h3>
                  <p className="text-[#2A2A2A] text-[15px] leading-relaxed">{resource.whenUseful}</p>
                </div>
              )}

              {/* External link */}
              {resource.url && resource.url !== "#" && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg text-[#0A0A0A] font-medium transition-colors"
                >
                  <span>Visit resource</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* 8. Related resources (horizontal scroll) */}
              {relatedResources.length > 0 && (
                <div className="pt-8 border-t border-white/40">
                  <h3 className="text-[#0A0A0A] font-semibold text-lg mb-6">Related resources</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {relatedResources.map((related) => (
                      <div key={related.id} className="flex-shrink-0 w-[140px]">
                        <ResourceCard
                          resource={related}
                          onClick={() => {
                            onResourceClick(related);
                            // Scroll to top of panel
                            panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

