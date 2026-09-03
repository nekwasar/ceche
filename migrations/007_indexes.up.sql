-- Phase 4: Missing Indexes

-- domain_locks: expires_at for lock expiry worker (full scan on every tick)
CREATE INDEX idx_domain_locks_expires ON domain_locks(expires_at) WHERE status = 'active';

-- domain_locks: listing_id for marketplace lookups
CREATE INDEX idx_domain_locks_listing ON domain_locks(listing_id);

-- subscriptions: paystack_sub_id for webhook lookups
CREATE INDEX idx_subscriptions_paystack_id ON subscriptions(paystack_sub_id);

-- subscriptions: current_period_end for renewal jobs
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_end);

-- reveals: status for filtering pending/completed
CREATE INDEX idx_reveals_status ON reveals(status);

-- scans: composite index for user_id + created_at (common query pattern)
CREATE INDEX idx_scans_user_created ON scans(user_id, created_at DESC);

-- scan_results: composite index for scan_id + available + domain (export query)
CREATE INDEX idx_scan_results_scan_available ON scan_results(scan_id, available DESC, domain ASC);

-- appraisals: score for analytics/leaderboards
CREATE INDEX idx_appraisals_score ON appraisals(score);

-- suggestions: seed for duplicate-suppression and analytics
CREATE INDEX idx_suggestions_seed ON suggestions(seed);

-- audit_logs: resource_id for admin lookups
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_id);
