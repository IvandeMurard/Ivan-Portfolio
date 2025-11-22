-- Drop and recreate view with security_invoker to fix security warning
DROP VIEW IF EXISTS public.all_resources;

CREATE VIEW public.all_resources 
WITH (security_invoker=true) AS
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