-- Phase 4: Lock-and-Reserve System

-- Domain locks (5-min TTL checkout reservation)
CREATE TABLE domain_locks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    domain_hash TEXT NOT NULL,
    listing_id UUID,
    locked_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'active'
);

CREATE INDEX idx_domain_locks_hash ON domain_locks(domain_hash);
CREATE INDEX idx_domain_locks_user ON domain_locks(user_id);
CREATE INDEX idx_domain_locks_status ON domain_locks(status);
CREATE UNIQUE INDEX idx_domain_locks_active ON domain_locks(domain_hash) WHERE status = 'active';

-- Reveal transactions
CREATE TABLE reveals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    domain_hash TEXT NOT NULL,
    reveal_type TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    paystack_ref TEXT,
    revealed_domain TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reveals_user ON reveals(user_id);
CREATE INDEX idx_reveals_created ON reveals(created_at DESC);
CREATE INDEX idx_reveals_hash ON reveals(domain_hash);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    plan TEXT NOT NULL,
    paystack_sub_id TEXT,
    status TEXT DEFAULT 'active',
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
