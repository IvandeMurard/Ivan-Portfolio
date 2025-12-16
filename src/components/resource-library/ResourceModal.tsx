import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Resource } from "./ResourceCard";
import { ResourceCard } from "./ResourceCard";
import { useEffect } from "react";

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  allResources: Resource[];
  onResourceClick: (resource: Resource) => void;
}

export function ResourceModal({ resource, onClose, allResources, onResourceClick }: ResourceModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (resource) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when panel is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [resource, onClose]);

  if (!resource) return null;

  const relatedResources = allResources
    .filter(
      (r) =>
        r.id !== resource.id &&
        r.category === resource.category
    )
    .slice(0, 4);

  return (
    <AnimatePresence>
      {resource && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in Panel */}
          <motion.div
            className="relative w-full max-w-[900px] h-full bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.12)] overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close panel"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Two-column layout: Image left, Content right */}
            <div className="flex h-full">
              {/* Left column - Image */}
              <motion.div
                className="w-[45%] flex-shrink-0 bg-[#F5F5F5] relative"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, delay: 0.1 }}
              >
                <div className="sticky top-0 h-screen flex items-center justify-center p-12">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>

              {/* Right column - Content */}
              <motion.div
                className="flex-1 p-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="max-w-[500px]">
                  {/* Category and Format badges */}
                  <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <div className="inline-block px-3 py-1 bg-[#E8E8E8] rounded-full text-sm text-[#2A2A2A]">
                      {resource.category}
                    </div>
                    <div className="inline-block px-2.5 py-1 bg-[#E0E0E0] rounded-full text-[11px] font-medium text-[#2A2A2A] uppercase tracking-wide">
                      {resource.format}
                    </div>
                  </div>

                  <h1 className="text-[#090909] mb-6 text-3xl font-semibold tracking-tight">
                    {resource.title}
                  </h1>

                  <p className="text-[#2A2A2A] mb-10 leading-[160%] text-[15px]">
                    {resource.description}
                  </p>

                  {resource.commentary && (
                    <div className="mb-10">
                      <h3 className="text-black mb-3 font-semibold tracking-tight">Why it matters to me</h3>
                      <p className="text-[#2A2A2A] text-[15px] leading-relaxed">{resource.commentary}</p>
                    </div>
                  )}

                  {relatedResources.length > 0 && (
                    <div className="pt-10 border-t border-gray-200">
                      <h3 className="text-black mb-6 font-semibold tracking-tight">Related resources</h3>
                      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                        {relatedResources.map((related) => (
                          <div key={related.id} onClick={() => onResourceClick(related)}>
                            <ResourceCard resource={related} onClick={() => onResourceClick(related)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

