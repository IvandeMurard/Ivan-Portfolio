import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export interface UseAllResourcesResult {
  data: UnifiedResource[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch all resources from Supabase all_resources view
 * 
 * Returns a unified array with type discrimination for use with VisualCard component.
 */
export function useAllResources(): UseAllResourcesResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['all-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('all_resources')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch resources: ${error.message}`);
      }

      // Map Supabase data to UnifiedResource
      return (data || []).map((item): UnifiedResource => ({
        id: item.id!,
        type: item.type as UnifiedResource['type'],
        name: item.name!,
        description: item.description,
        image_url: item.image_url,
        logo_url: null, // all_resources view doesn't have logo_url, but tools have it in image_url
        personal_comment: item.personal_comment,
        tags: item.tags,
        url: item.url,
        display_order: item.display_order ?? 0,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

