-- Phase 6: Name Suggestions Engine

CREATE TABLE suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    seed TEXT NOT NULL,
    criteria_json JSONB NOT NULL DEFAULT '{}',
    results_json JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_suggestions_user ON suggestions(user_id);
CREATE INDEX idx_suggestions_created ON suggestions(created_at DESC);
