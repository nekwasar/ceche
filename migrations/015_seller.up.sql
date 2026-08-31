-- Phase 9: Seller Submission & Domain Verification

CREATE TABLE seller_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    domain_encrypted TEXT NOT NULL,
    domain_hash TEXT NOT NULL,
    price NUMERIC(15,2) NOT NULL,
    verification_status TEXT DEFAULT 'pending',
    listing_fee_paid NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_seller_listings_user ON seller_listings(user_id);
CREATE INDEX idx_seller_listings_status ON seller_listings(verification_status);
CREATE INDEX idx_seller_listings_hash ON seller_listings(domain_hash);

CREATE TABLE domain_verification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_listing_id UUID NOT NULL REFERENCES seller_listings(id) ON DELETE CASCADE,
    domain TEXT NOT NULL,
    challenge_type TEXT NOT NULL,
    challenge_token TEXT NOT NULL,
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_domain_verification_listing ON domain_verification(seller_listing_id);
CREATE INDEX idx_domain_verification_status ON domain_verification(status);
