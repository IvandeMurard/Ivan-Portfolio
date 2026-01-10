-- The contact_rate_limit table doesn't need client-side access - only edge function with service role
-- But we should add a policy for the service role to work properly
-- Since edge functions use service role key, they bypass RLS anyway

-- No additional policies needed for contact_rate_limit since edge functions use service role

-- However, we need to update the tool_suggestions INSERT policy to work with the new function signature
-- The old policy references the old function with uuid parameter, now it takes text (IP)
-- For a public portfolio without auth, we'll simplify this

DROP POLICY IF EXISTS "Authenticated users can submit tool suggestions with rate limit" ON public.tool_suggestions;

-- Create a simpler public insert policy (rate limiting will be handled at application level)
CREATE POLICY "Anyone can submit tool suggestions" 
ON public.tool_suggestions 
FOR INSERT 
WITH CHECK (true);