-- Create communities table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT,
  logo_url TEXT,
  image_url TEXT,
  personal_comment TEXT,
  tags TEXT[],
  display_order INTEGER DEFAULT 0
);

-- Enable RLS for communities table
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Create public read policy for communities
CREATE POLICY "Public read access for communities"
ON public.communities
FOR SELECT
USING (true);

-- Add new fields to tools table
ALTER TABLE public.tools
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS personal_comment TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Rename feedback to description_long in tools table
ALTER TABLE public.tools
RENAME COLUMN feedback TO description_long;

-- Add new fields to resources table
ALTER TABLE public.resources
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS personal_comment TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add new fields to inspirations table
ALTER TABLE public.inspirations
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS personal_comment TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create unified view for all resources
CREATE OR REPLACE VIEW public.all_resources AS
SELECT 
  id, 
  'tool' as type, 
  name, 
  description, 
  image_url, 
  personal_comment, 
  tags, 
  url, 
  display_order,
  created_at
FROM public.tools
UNION ALL
SELECT 
  id, 
  'resource' as type, 
  name, 
  description, 
  image_url, 
  personal_comment, 
  tags, 
  url, 
  display_order,
  created_at
FROM public.resources
UNION ALL
SELECT 
  id, 
  'inspiration' as type, 
  name, 
  description, 
  image_url, 
  personal_comment, 
  tags, 
  url, 
  display_order,
  created_at
FROM public.inspirations
UNION ALL
SELECT 
  id, 
  'community' as type, 
  name, 
  description, 
  image_url, 
  personal_comment, 
  tags, 
  url, 
  display_order,
  created_at
FROM public.communities
ORDER BY display_order ASC, created_at DESC;