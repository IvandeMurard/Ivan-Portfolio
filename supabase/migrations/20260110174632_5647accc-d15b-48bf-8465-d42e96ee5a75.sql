-- Fix the check_tool_suggestion_rate_limit function to actually use the user_id parameter
-- First, add ip_address column to tool_suggestions for tracking (since users might not be authenticated)
ALTER TABLE public.tool_suggestions ADD COLUMN IF NOT EXISTS ip_address text;

-- Since this is a public portfolio and tool suggestions don't require auth,
-- we'll use IP-based rate limiting instead of user_id
-- Drop and recreate the function with proper IP-based rate limiting
CREATE OR REPLACE FUNCTION public.check_tool_suggestion_rate_limit(client_ip text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = 'public'
AS $$
  SELECT COUNT(*) < 5
  FROM public.tool_suggestions
  WHERE created_at > NOW() - INTERVAL '1 hour'
  AND ip_address = client_ip;
$$;

-- Create a rate limit table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_rate_limit (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for efficient IP lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limit_ip_created 
ON public.contact_rate_limit(ip_address, created_at);

-- Enable RLS on the rate limit table
ALTER TABLE public.contact_rate_limit ENABLE ROW LEVEL SECURITY;

-- No direct access needed from client - only edge function accesses this via service role
-- Create a cleanup function to remove old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  DELETE FROM public.contact_rate_limit
  WHERE created_at < NOW() - INTERVAL '1 hour';
$$;