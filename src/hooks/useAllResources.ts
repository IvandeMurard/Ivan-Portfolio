import { useMemo, useState, useEffect, useCallback } from "react";
import {
  communities,
  inspirations,
  resources,
  tools,
  type BaseItem,
} from "@/data/inspirationsToolsMerged";

/**
 * Unified Resource interface matching VisualCard props
 */
export interface UnifiedResource {
  id: string;
  type: 'community' | 'inspiration' | 'resource' | 'tool';
  name: string;
  description: string | null;
  image_url: string | null;
  logo_url: string | null;
  personal_comment: string | null;
  tags: string[] | null;
  url: string | null;
  display_order: number;
}

/**
 * Map BaseItem to UnifiedResource format
 */
function mapBaseItemToUnifiedResource(
  item: BaseItem,
  type: UnifiedResource['type'],
  index: number
): UnifiedResource {
  // Use logo as image_url (primary image) for tools, logo_url for others
  const logoUrl = item.logo || null;
  
  return {
    id: item.id,
    type,
    name: item.title,
    description: item.excerpt || item.subtitle || null,
    // For tools, use logo_url as the primary image; for others, use as image_url too
    image_url: logoUrl,
    logo_url: type === 'tool' ? logoUrl : null, // logo_url is mainly for tools
    personal_comment: item.comment || null,
    tags: item.tags || null,
    url: item.link || null,
    display_order: index,
  };
}

export interface UseAllResourcesResult {
  data: UnifiedResource[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch and combine all resources (communities, inspirations, resources, tools)
 * 
 * Returns a unified array with type discrimination for use with VisualCard component.
 * Currently uses static data from inspirationsToolsMerged.ts, but can be extended
 * to query a Supabase "all_resources" view in the future.
 * 
 * Includes loading and error states for future API integration.
 */
export function useAllResources(): UseAllResourcesResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const allResources = useMemo<UnifiedResource[]>(() => {
    try {
      const unified: UnifiedResource[] = [];

      // Map communities
      communities.forEach((item, index) => {
        unified.push(mapBaseItemToUnifiedResource(item, 'community', index));
      });

      // Map inspirations
      inspirations.forEach((item, index) => {
        unified.push(mapBaseItemToUnifiedResource(item, 'inspiration', index));
      });

      // Map resources
      resources.forEach((item, index) => {
        unified.push(mapBaseItemToUnifiedResource(item, 'resource', index));
      });

      // Map tools
      tools.forEach((item, index) => {
        unified.push(mapBaseItemToUnifiedResource(item, 'tool', index));
      });

      return unified;
    } catch (err) {
      throw err;
    }
  }, []);

  // Simulate loading for initial mount (can be removed when using real API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Short delay to show skeleton

    return () => clearTimeout(timer);
  }, []);

  // Refetch function (for error retry)
  const refetch = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setRetryCount((prev) => prev + 1);
    
    // Simulate refetch
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Simulate error (set to true to test error state)
  // In production, this would come from the API
  const shouldSimulateError = false;

  useEffect(() => {
    if (shouldSimulateError && retryCount === 0) {
      setError(new Error('Failed to load resources'));
      setIsLoading(false);
    }
  }, [retryCount]);

  return {
    data: allResources,
    isLoading,
    error,
    refetch,
  };
}

