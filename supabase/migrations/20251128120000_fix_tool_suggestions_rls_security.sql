-- Fix security issue: Remove public read access to tool_suggestions table
-- This prevents potential data harvesting by spammers

-- Drop the permissive SELECT policy that allows anyone to read all suggestions
DROP POLICY IF EXISTS "Anyone can read tool suggestions" ON public.tool_suggestions;

-- Note: No public SELECT policy is needed for this table
-- Suggestions can be reviewed via Supabase Dashboard or service role
-- If you need authenticated users to see their own submissions, uncomment below:

-- CREATE POLICY "Users can view their own suggestions"
-- ON public.tool_suggestions
-- FOR SELECT
-- TO authenticated
-- USING (auth.uid() = user_id);
-- Note: This would require adding a user_id column to the table

