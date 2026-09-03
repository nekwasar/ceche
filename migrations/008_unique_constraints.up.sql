-- Phase 4: UNIQUE Constraints

-- appraisals: idempotency_key should be unique per user (when set)
CREATE UNIQUE INDEX idx_appraisals_idempotency_unique
    ON appraisals(user_id, idempotency_key)
    WHERE idempotency_key IS NOT NULL;

-- word_lists: user cannot have duplicate-named lists
CREATE UNIQUE INDEX idx_word_lists_user_name
    ON word_lists(user_id, name);

-- users: paystack IDs should be unique
CREATE UNIQUE INDEX idx_users_paystack_customer
    ON users(paystack_customer_id)
    WHERE paystack_customer_id IS NOT NULL;

CREATE UNIQUE INDEX idx_users_paystack_subscription
    ON users(paystack_subscription_id)
    WHERE paystack_subscription_id IS NOT NULL;

-- subscriptions: paystack subscription ID should be unique
CREATE UNIQUE INDEX idx_subscriptions_paystack_unique
    ON subscriptions(paystack_sub_id)
    WHERE paystack_sub_id IS NOT NULL;

-- reveals: paystack transaction reference should be unique
CREATE UNIQUE INDEX idx_reveals_paystack_ref_unique
    ON reveals(paystack_ref)
    WHERE paystack_ref IS NOT NULL AND paystack_ref != 'pending';
