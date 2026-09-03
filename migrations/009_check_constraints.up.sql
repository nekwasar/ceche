-- Phase 4: CHECK Constraints

-- users: role validation
ALTER TABLE users ADD CONSTRAINT chk_users_role
    CHECK (role IN ('user', 'admin'));

-- users: subscription_tier validation
ALTER TABLE users ADD CONSTRAINT chk_users_subscription_tier
    CHECK (subscription_tier IN ('free', 'startup', 'enterprise'));

-- users: subscription_status validation
ALTER TABLE users ADD CONSTRAINT chk_users_subscription_status
    CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due'));

-- users: reveals_remaining non-negative
ALTER TABLE users ADD CONSTRAINT chk_users_reveals_non_negative
    CHECK (reveals_remaining >= 0);

-- scans: status validation
ALTER TABLE scans ADD CONSTRAINT chk_scans_status
    CHECK (status IN ('pending', 'running', 'completed', 'failed'));

-- domain_locks: status validation
ALTER TABLE domain_locks ADD CONSTRAINT chk_domain_locks_status
    CHECK (status IN ('active', 'released', 'completed', 'expired'));

-- reveals: status validation
ALTER TABLE reveals ADD CONSTRAINT chk_reveals_status
    CHECK (status IN ('pending', 'completed', 'failed', 'refunded'));

-- reveals: reveal_type validation
ALTER TABLE reveals ADD CONSTRAINT chk_reveals_type
    CHECK (reveal_type IN ('partial', 'luck', 'full'));

-- reveals: amount positive
ALTER TABLE reveals ADD CONSTRAINT chk_reveals_amount_positive
    CHECK (amount >= 0);

-- subscriptions: status validation
ALTER TABLE subscriptions ADD CONSTRAINT chk_subscriptions_status
    CHECK (status IN ('active', 'cancelled', 'expired'));

-- subscriptions: plan validation
ALTER TABLE subscriptions ADD CONSTRAINT chk_subscriptions_plan
    CHECK (plan IN ('startup', 'enterprise'));

-- appraisals: score between 0 and 100
ALTER TABLE appraisals ADD CONSTRAINT chk_appraisals_score_range
    CHECK (score >= 0 AND score <= 100);
