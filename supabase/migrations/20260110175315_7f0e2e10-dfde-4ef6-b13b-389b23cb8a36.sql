-- Fix the IP exposure issue by updating the SELECT policy on tool_suggestions
-- to exclude the ip_address column from public view

-- Drop the current policy and create a more restrictive one
DROP POLICY IF EXISTS "Anyone can read tool suggestions" ON public.tool_suggestions;

-- Create a policy that allows reading only non-sensitive columns
-- Since RLS doesn't support column-level restrictions, we'll need to handle this differently
-- The ip_address column should only be accessible via service role (edge functions)
-- For public access, we create a view without the IP column

-- First, remove the ip_address column from public access by using a view
CREATE OR REPLACE VIEW public.tool_suggestions_public AS
SELECT id, created_at, product_name, product_link, status
FROM public.tool_suggestions;

-- Grant access to the view
GRANT SELECT ON public.tool_suggestions_public TO anon, authenticated;

-- The original table policy now only allows service role access for SELECT
-- Since service role bypasses RLS, we don't need a SELECT policy on the table
-- But for authenticated users who need to insert, we keep that policy

-- Re-add a restrictive select policy (service role will bypass this anyway)
CREATE POLICY "No public read on tool_suggestions table" 
ON public.tool_suggestions 
FOR SELECT 
USING (false);