-- Create newsletter_subscribers table
-- This table stores email addresses of users who subscribe to the newsletter

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- Add index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON public.newsletter_subscribers(subscribed_at DESC);

-- Add comment to table
COMMENT ON TABLE public.newsletter_subscribers IS 'Stores email addresses of newsletter subscribers';

-- Add comments to columns
COMMENT ON COLUMN public.newsletter_subscribers.id IS 'Unique identifier for the subscription';
COMMENT ON COLUMN public.newsletter_subscribers.email IS 'Subscriber email address (unique)';
COMMENT ON COLUMN public.newsletter_subscribers.subscribed_at IS 'Timestamp when the user subscribed';
COMMENT ON COLUMN public.newsletter_subscribers.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN public.newsletter_subscribers.updated_at IS 'Record last update timestamp';

-- Enable Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting new subscriptions (public access)
CREATE POLICY "Allow public to subscribe" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading subscriptions (admin only - requires authentication)
CREATE POLICY "Allow authenticated users to read subscriptions" ON public.newsletter_subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_newsletter_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before updates
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_newsletter_subscribers_updated_at();

