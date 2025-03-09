-- Create tables for the promo code rewards application

-- Prizes table
CREATE TABLE IF NOT EXISTS public.prizes (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    value NUMERIC NOT NULL,
    redeemed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    redeemed_at TIMESTAMP WITH TIME ZONE,
    image_url TEXT
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    prize_id UUID NOT NULL REFERENCES public.prizes(id),
    is_redeemed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE
);

-- Activities table
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY,
    code TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    prize_name TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON public.activities(timestamp);
CREATE INDEX IF NOT EXISTS idx_prizes_category ON public.prizes(category);

-- Row Level Security (RLS) policies
-- Note: In a real application, you would set up RLS based on user authentication
-- For this example, we're keeping it simple

-- Enable RLS on all tables
ALTER TABLE public.prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations for now
-- In a real app, you would restrict these based on user_id
CREATE POLICY "Allow all operations on prizes" ON public.prizes FOR ALL USING (true);
CREATE POLICY "Allow all operations on promo_codes" ON public.promo_codes FOR ALL USING (true);
CREATE POLICY "Allow all operations on activities" ON public.activities FOR ALL USING (true);

-- Sample data for testing
INSERT INTO public.prizes (id, name, description, category, value, image_url)
VALUES 
    ('prize-1', '10% Discount Coupon', 'Get 10% off your next purchase. Valid for all products on our store. Cannot be combined with other offers.', 'discount', 10, 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop'),
    ('prize-2', 'Free Shipping Voucher', 'Free shipping on your next order. No minimum purchase required. Valid for standard shipping only.', 'discount', 5, 'https://images.unsplash.com/photo-1627634777217-c864268db30c?q=80&w=2070&auto=format&fit=crop'),
    ('prize-3', 'VIP Member Status', 'Exclusive access to VIP deals for 30 days. Includes early access to sales, exclusive discounts, and priority customer service.', 'special', 50, 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format',  'special', 50, 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop'),
    ('prize-4', '50 Bonus Points', '50 points added to your loyalty account. Use these points to redeem exclusive rewards and discounts on future purchases.', 'reward', 50, 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Insert promo codes
INSERT INTO public.promo_codes (id, code, prize_id)
VALUES 
    ('code-1', 'WELCOME10', 'prize-1'),
    ('code-2', 'FREESHIP', 'prize-2'),
    ('code-3', 'VIP2024', 'prize-3'),
    ('code-4', 'BONUS50', 'prize-4')
ON CONFLICT (id) DO NOTHING;

-- Mark one code as redeemed for demo purposes
UPDATE public.promo_codes SET is_redeemed = TRUE, redeemed_at = NOW() WHERE code = 'FREESHIP';
UPDATE public.prizes SET redeemed = TRUE, redeemed_at = NOW() WHERE id = 'prize-2';

-- Insert some sample activities
INSERT INTO public.activities (id, code, success, timestamp, prize_name)
VALUES 
    ('activity-1', 'WELCOME10', TRUE, NOW() - INTERVAL '2 days', '10% Discount Coupon'),
    ('activity-2', 'FREESHIP', TRUE, NOW() - INTERVAL '7 days', 'Free Shipping Voucher'),
    ('activity-3', 'INVALID', FALSE, NOW() - INTERVAL '1 day', NULL)
ON CONFLICT (id) DO NOTHING;

