import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { Hero } from "./Hero";
import { Filters, FiltersRef } from "./Filters";
import { ResourceShelves } from "./ResourceShelves";
import { ResourcePanel } from "./ResourcePanel";
import { resources } from "@/data/resource-library/resources";
import { Resource } from "@/data/resource-library/resources";

export const ResourceLibraryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(-1);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const filtersRef = useRef<FiltersRef>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Get all unique categories from resources
  const categories = useMemo(() => {
    return Array.from(new Set(resources.map((r) => r.category))).sort();
  }, []);

  // Get all unique formats for filtering
  const allFormats = useMemo(() => {
    return Array.from(new Set(resources.map((r) => r.format))).sort();
  }, []);

  // Handle deep linking via URL hash
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the #
    if (hash) {
      const resource = resources.find((r) => r.id === hash);
      if (resource) {
        setSelectedResourceId(resource.id);
      }
    }
  }, [location.hash]);

  // Update URL hash when resource is selected
  useEffect(() => {
    if (selectedResourceId) {
      const newHash = `#${selectedResourceId}`;
      if (location.hash !== newHash) {
        navigate(`/resource-library${newHash}`, { replace: true });
      }
    } else {
      // Remove hash when panel is closed
      if (location.hash) {
        navigate("/resource-library", { replace: true });
      }
    }
  }, [selectedResourceId, navigate, location.hash]);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.commentary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.insight.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFormats = selectedFormats.length === 0 || selectedFormats.includes(resource.format);

      return matchesSearch && matchesFormats;
    });
  }, [searchQuery, selectedFormats]);

  const handleFormatToggle = (format: string) => {
    setSelectedFormats((prev) => (prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]));
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedFormats([]);
  };

  const handleResourceClick = useCallback((resource: Resource) => {
    setSelectedResourceId(resource.id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedResourceId(null);
  }, []);

  const selectedResource = useMemo(() => {
    return selectedResourceId ? resources.find((r) => r.id === selectedResourceId) || null : null;
  }, [selectedResourceId]);

  // Group filtered resources by category
  const resourcesByCategory = useMemo(() => {
    return categories.map((category) => ({
      category,
      resources: filteredResources.filter((r) => r.category === category),
    })).filter((group) => group.resources.length > 0);
  }, [categories, filteredResources]);

  // Keyboard navigation and shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K: Show filters temporarily
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        filtersRef.current?.showFilters();
        return;
      }

      // Don't handle other shortcuts when typing in input
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Escape: Close panel
      if (e.key === "Escape") {
        e.preventDefault();
        if (selectedResourceId) {
          handleClosePanel();
        }
        return;
      }

      // Arrow keys: Navigate between cards (only when panel is closed)
      if (!selectedResourceId) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setFocusedCardIndex((prev) => (prev < filteredResources.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setFocusedCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = Math.min(focusedCardIndex + 6, filteredResources.length - 1);
          setFocusedCardIndex(nextIndex);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex = Math.max(focusedCardIndex - 6, 0);
          setFocusedCardIndex(prevIndex);
        } else if (e.key === "Enter" && focusedCardIndex >= 0 && focusedCardIndex < filteredResources.length) {
          e.preventDefault();
          handleResourceClick(filteredResources[focusedCardIndex]);
        } else if (e.key === "Home") {
          e.preventDefault();
          setFocusedCardIndex(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setFocusedCardIndex(filteredResources.length - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedCardIndex, filteredResources, selectedResourceId, handleResourceClick, handleClosePanel]);

  // Scroll to focused card
  useEffect(() => {
    if (focusedCardIndex >= 0 && focusedCardIndex < filteredResources.length && !selectedResourceId) {
      const resource = filteredResources[focusedCardIndex];
      const cardElement = cardRefs.current.get(resource.id);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [focusedCardIndex, filteredResources, selectedResourceId]);

  return (
    <div className="min-h-screen bg-[#F0EFEB]">
      <Navigation />
      
      {/* Main content - shifts left when panel is open (desktop only) */}
      <motion.div
        className={`max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-20 pt-8 pb-20 transition-all duration-300 ${
          selectedResourceId ? "lg:mr-[600px]" : ""
        }`}
      >
        <Hero />

        <Filters
          ref={filtersRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={[]}
          onTagToggle={() => {}}
          availableTags={[]}
          selectedFormats={selectedFormats}
          onFormatToggle={handleFormatToggle}
          availableFormats={allFormats}
          onClearAll={handleClearAll}
        />

        {/* Results count */}
        <div className="py-6 text-center">
          <p className="text-sm text-[#2A2A2A]">
            {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
            {(searchQuery || selectedFormats.length > 0) && " found"}
          </p>
        </div>

        {/* Resource Shelves */}
        {resourcesByCategory.length > 0 ? (
          <ResourceShelves
            shelves={resourcesByCategory}
            onResourceClick={handleResourceClick}
            focusedCardIndex={focusedCardIndex}
            onCardRef={(resourceId, node) => {
              if (node) {
                cardRefs.current.set(resourceId, node);
              } else {
                cardRefs.current.delete(resourceId);
              }
            }}
          />
        ) : (
          <div className="text-center py-20 text-[#2A2A2A]">
            No resources match your search.
          </div>
        )}
      </motion.div>

      {/* Slide-in Panel */}
      <ResourcePanel
        resource={selectedResource}
        onClose={handleClosePanel}
        allResources={resources}
        onResourceClick={handleResourceClick}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Footer
        siteName="Ivan de Murard"
        tagline="Product Manager building user-centered experiences"
        sections={[
          { id: "hero", label: "Welcome" },
          { id: "work", label: "Work" },
                   { id: "hackathons", label: "Hackathons" },
          { id: "experience", label: "Experience" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ]}
      />
    </div>
  );
};
