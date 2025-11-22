import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Tool {
  id: string;
  name: string;
  description: string;
  tool_type: string;
  category: string;
  url: string | null;
  logo_url: string | null;
  referral_link: string | null;
  description_long: string | null;
  image_url: string | null;
  personal_comment: string | null;
  tags: string[] | null;
  display_order: number;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string | null;
  image_url: string | null;
  personal_comment: string | null;
  tags: string[] | null;
  display_order: number;
}

export interface Inspiration {
  id: string;
  name: string;
  description: string;
  url: string | null;
  image_url: string | null;
  personal_comment: string | null;
  tags: string[] | null;
  display_order: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  url: string | null;
  logo_url: string | null;
  image_url: string | null;
  personal_comment: string | null;
  tags: string[] | null;
  display_order: number;
}

export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Tool[];
    },
  });
};

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Resource[];
    },
  });
};

export const useInspirations = () => {
  return useQuery({
    queryKey: ['inspirations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inspirations')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Inspiration[];
    },
  });
};

export const useCommunities = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Community[];
    },
  });
};
