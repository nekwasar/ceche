-- Phase 5: Intelligence Profiles

CREATE TABLE intelligence_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_hash TEXT NOT NULL UNIQUE,
    domain_encrypted TEXT NOT NULL,
    data_json JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_intelligence_profiles_hash ON intelligence_profiles(domain_hash);
CREATE INDEX idx_intelligence_profiles_updated ON intelligence_profiles(updated_at DESC);
