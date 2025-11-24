-- Update all_resources view to use logo_url for tools
DROP VIEW IF EXISTS public.all_resources;

CREATE VIEW public.all_resources 
WITH (security_invoker=true) AS
SELECT 
  id, 
  'tool' as type, 
  name, 
  description, 
  COALESCE(logo_url, image_url) as image_url,  -- Use logo_url first for tools
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
  image_url,  -- resources only have image_url
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
  image_url,  -- inspirations only have image_url
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
  COALESCE(image_url, logo_url) as image_url,  -- Use image_url first for communities
  personal_comment, 
  tags, 
  url, 
  display_order,
  created_at
FROM public.communities
ORDER BY display_order ASC, created_at DESC;