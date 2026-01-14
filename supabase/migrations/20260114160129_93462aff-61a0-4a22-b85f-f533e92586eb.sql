-- Drop and recreate the view with security_invoker to ensure proper RLS enforcement
DROP VIEW IF EXISTS public.tool_suggestions_public;

CREATE VIEW public.tool_suggestions_public
WITH (security_invoker = on) AS
SELECT 
    id,
    created_at,
    product_name,
    product_link,
    status
FROM public.tool_suggestions;

-- Add comment to document the security decision
COMMENT ON VIEW public.tool_suggestions_public IS 'Public view of tool suggestions that intentionally excludes ip_address for privacy';