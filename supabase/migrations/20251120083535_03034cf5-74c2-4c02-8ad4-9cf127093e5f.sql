-- Drop existing permissive policy
DROP POLICY IF EXISTS "Anyone can submit tool suggestions" ON public.tool_suggestions;

-- Create function to check rate limit (max 5 submissions per hour per user)
CREATE OR REPLACE FUNCTION public.check_tool_suggestion_rate_limit(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) < 5
  FROM public.tool_suggestions
  WHERE created_at > NOW() - INTERVAL '1 hour';
$$;

-- Create new authenticated-only policy with rate limiting
CREATE POLICY "Authenticated users can submit tool suggestions with rate limit"
ON public.tool_suggestions
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND public.check_tool_suggestion_rate_limit(auth.uid())
);