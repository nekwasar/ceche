-- Phase 9: Marketplace Listings

CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    domain_encrypted TEXT NOT NULL,
    domain_hash TEXT NOT NULL,
    tld TEXT NOT NULL,
    asking_price NUMERIC(15,2) NOT NULL,
    estimated_value NUMERIC(15,2),
    modules JSONB,
    listing_type TEXT DEFAULT 'standard',
    listing_fee NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    sold_price NUMERIC(15,2),
    commission NUMERIC(10,2),
    priority BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_seller ON listings(seller_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_tld ON listings(tld);
CREATE INDEX idx_listings_price ON listings(asking_price);
CREATE INDEX idx_listings_hash ON listings(domain_hash);
CREATE INDEX idx_listings_created ON listings(created_at DESC);
