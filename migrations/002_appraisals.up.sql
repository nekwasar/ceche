-- Create appraisals table
CREATE TABLE IF NOT EXISTS appraisals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    domain TEXT NOT NULL,
    tld TEXT NOT NULL,
    score INTEGER NOT NULL,
    metrics JSONB NOT NULL,
    idempotency_key TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_appraisals_user_id ON appraisals(user_id);
CREATE INDEX idx_appraisals_domain ON appraisals(domain);
CREATE INDEX idx_appraisals_idempotency ON appraisals(idempotency_key);
CREATE INDEX idx_appraisals_created ON appraisals(created_at DESC);
