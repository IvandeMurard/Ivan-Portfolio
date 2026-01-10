-- Fix the security definer view by using SECURITY INVOKER
DROP VIEW IF EXISTS public.tool_suggestions_public;

-- Recreate with SECURITY INVOKER (which is actually the default, but let's be explicit)
CREATE VIEW public.tool_suggestions_public 
WITH (security_invoker = true) AS
SELECT id, created_at, product_name, product_link, status
FROM public.tool_suggestions;

-- Grant access to the view
GRANT SELECT ON public.tool_suggestions_public TO anon, authenticated;