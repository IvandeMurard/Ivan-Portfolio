import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { SearchWithFilters, type FilterState } from "@/components/SearchWithFilters";
import { MasonryGrid } from "@/components/MasonryGrid";
import { VisualCard } from "@/components/VisualCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useAllResources } from "@/hooks/useAllResources";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { ArrowDown, SearchX, FolderOpen, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatDrivesMeSectionProps {
  disableSticky?: boolean;
}

/**
 * WhatDrivesMeSection Component
 * 
 * Refactored section using new components:
 * - SearchWithFilters for search and filtering
 * - MasonryGrid for Pinterest-style layout
 * - VisualCard for image-first cards with hover and expansion
 */
export function WhatDrivesMeSection({ disableSticky = false }: WhatDrivesMeSectionProps) {
  const { language } = useLanguage();
  const { data: allResources, isLoading, error, refetch } = useAllResources();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState<FilterState>({
    types: [],
    tags: [],
  });

  // Expanded card state (only 1 card expanded at a time)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Refs for keyboard navigation between cards
  const cardRefs = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());

  // Get or create ref for a card
  const getCardRef = useCallback((id: string) => {
    if (!cardRefs.current.has(id)) {
      // Create a ref object (React will populate current when component mounts)
      const ref: React.RefObject<HTMLDivElement> = { current: null };
      cardRefs.current.set(id, ref);
    }
    return cardRefs.current.get(id)!;
  }, []);

  // Normalize and group similar tags
  const normalizeTag = (tag: string): string => {
    const normalized = tag.toLowerCase().trim();
    // Group similar tags
    if (normalized === 'ai' || normalized === 'ia') return 'AI';
    if (normalized === 'hackathons' || normalized === 'hackathon') return 'Hackathons';
    if (normalized === 'communities' || normalized === 'community') return 'Community';
    if (normalized.includes('product management') || normalized === 'pm') return 'Product Management';
    if (normalized.includes('user experience') || normalized === 'ux') return 'UX';
    if (normalized.includes('product design') || normalized.includes('design')) return 'Design';
    // Return capitalized first letter
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  };

  // Get all unique tags from resources (normalized and grouped)
  const availableTags = useMemo(() => {
    if (isLoading || error) return [];
    const tagSet = new Set<string>();
    allResources.forEach((resource) => {
      if (resource.tags) {
        resource.tags.forEach((tag) => {
          const normalized = normalizeTag(tag);
          tagSet.add(normalized);
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [allResources, isLoading, error]);

  // Filter and search logic
  const filteredResources = useMemo(() => {
    if (isLoading || error) return [];
    
    return allResources.filter((resource) => {
      // Type filter
      if (filterState.types.length > 0) {
        if (!filterState.types.includes(resource.type)) {
          return false;
        }
      }

      // Tag filter (with normalized tags)
      if (filterState.tags.length > 0) {
        const resourceTags = (resource.tags || []).map(tag => normalizeTag(tag));
        const hasMatchingTag = filterState.tags.some((tag) =>
          resourceTags.includes(normalizeTag(tag))
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Search filter (searches in name, description, and tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = resource.name.toLowerCase().includes(query);
        const matchesDescription =
          resource.description?.toLowerCase().includes(query) || false;
        const matchesTags =
          resource.tags?.some((tag) =>
            normalizeTag(tag).toLowerCase().includes(query)
          ) || false;

        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [allResources, filterState, searchQuery, isLoading, error]);

  // Toggle expanded card
  const handleToggleCard = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    // Update focused index when toggling
    const index = filteredResources.findIndex((r) => r.id === id);
    if (index !== -1) {
      setFocusedIndex(index);
    }
  }, [filteredResources]);

  // Close expanded card if it's no longer in filtered results
  useEffect(() => {
    if (expandedId && !filteredResources.some((r) => r.id === expandedId)) {
      setExpandedId(null);
      setFocusedIndex(null);
    }
  }, [expandedId, filteredResources]);

  // Navigation handler for arrow keys
  const handleNavigate = useCallback((id: string, direction: 'up' | 'down' | 'left' | 'right') => {
    const currentIndex = filteredResources.findIndex((r) => r.id === id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    const totalCards = filteredResources.length;

    // Simple navigation: up/down moves to previous/next card
    // In a masonry grid, we use linear navigation (DOM order)
    if (direction === 'up' || direction === 'left') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1; // Wrap to end
    } else if (direction === 'down' || direction === 'right') {
      nextIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0; // Wrap to start
    }

    // Focus the next card
    const nextResource = filteredResources[nextIndex];
    if (nextResource) {
      const nextRef = getCardRef(nextResource.id);
      if (nextRef.current) {
        nextRef.current.focus();
        setFocusedIndex(nextIndex);
        // Scroll into view
        nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [filteredResources, getCardRef]);

  const sectionTitle = language === 'fr' 
    ? "Ce qui me motive"
    : "What Drives Me";

  // Loading state: Show skeleton cards
  if (isLoading) {
    return (
      <section id="resources" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={sectionTitle}
            alignment="left"
            className="mb-8"
          />

          {/* Search with Filters (disabled during loading) */}
          <div className="mb-8 opacity-50 pointer-events-none">
            <SearchWithFilters
              onSearch={() => {}}
              onFilterChange={() => {}}
              availableTags={[]}
              resultCount={0}
              placeholder={
                language === 'fr'
                  ? "Rechercher mes ressources, communautés, outils..."
                  : "Search my resources, communities, tools..."
              }
            />
          </div>

          {/* Loading Skeleton Grid */}
          <MasonryGrid>
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </MasonryGrid>
        </div>
      </section>
    );
  }

  // Error state: Show error message with retry button
  if (error) {
    return (
      <section id="resources" className="py-24 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={sectionTitle}
            alignment="left"
            className="mb-8"
          />

          {/* Error State */}
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 p-4 rounded-full bg-destructive/10">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {language === 'fr' 
                ? "Échec du chargement des ressources"
                : "Failed to load resources"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {language === 'fr'
                ? "Une erreur s'est produite lors du chargement des ressources. Veuillez réessayer."
                : "An error occurred while loading resources. Please try again."}
            </p>
            <Button
              onClick={refetch}
              variant="default"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {language === 'fr' ? "Réessayer" : "Retry"}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Check if no results after filtering (empty state)
  const isEmpty = filteredResources.length === 0 && (searchQuery.trim() || filterState.types.length > 0 || filterState.tags.length > 0);

  return (
    <section id="resources" className="py-24 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={sectionTitle}
          alignment="left"
          className="mb-8"
        />

        {/* Search with Filters */}
        <div className="mb-8">
          <SearchWithFilters
            onSearch={setSearchQuery}
            onFilterChange={setFilterState}
            availableTags={availableTags}
            resultCount={filteredResources.length}
            placeholder={
              language === 'fr'
                ? "Rechercher mes ressources, communautés, outils..."
                : "Search my resources, communities, tools..."
            }
          />
        </div>

        {/* Content: Cards or Empty State */}
        {isEmpty ? (
          // Empty State: No results found
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 p-4 rounded-full bg-muted">
              <SearchX className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {language === 'fr' 
                ? "Aucune ressource trouvée"
                : "No resources found"}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {language === 'fr'
                ? "Essayez des filtres ou des termes de recherche différents."
                : "Try different filters or search terms."}
            </p>
          </div>
        ) : filteredResources.length > 0 ? (
          // Masonry Grid with Visual Cards
          <MasonryGrid>
            {filteredResources.map((resource, index) => (
              <VisualCard
                key={resource.id}
                id={resource.id}
                type={resource.type}
                name={resource.name}
                description={resource.description}
                image_url={resource.image_url}
                logo_url={resource.logo_url}
                personal_comment={resource.personal_comment}
                tags={resource.tags?.map(tag => normalizeTag(tag)) || null}
                url={resource.url}
                isExpanded={expandedId === resource.id}
                onToggle={handleToggleCard}
                onNavigate={(direction) => handleNavigate(resource.id, direction)}
                index={index}
                cardRef={getCardRef(resource.id)}
              />
            ))}
          </MasonryGrid>
        ) : (
          // Fallback empty state (shouldn't normally happen)
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 p-4 rounded-full bg-muted">
              <FolderOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {language === 'fr' 
                ? "Aucune ressource disponible"
                : "No resources available"}
            </h3>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="group hover:bg-contact hover:text-contact-foreground hover:border-contact transition-all duration-300"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {language === 'fr' ? "ME CONTACTER" : "GET IN TOUCH"}
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WhatDrivesMeSection;

