-- Phase 4: ON DELETE CASCADE

-- audit_logs: preserve audit trail when user is deleted
ALTER TABLE audit_logs DROP CONSTRAINT IF EXISTS audit_logs_user_id_fkey;
ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- domain_locks: cascade on user delete
ALTER TABLE domain_locks DROP CONSTRAINT IF EXISTS domain_locks_user_id_fkey;
ALTER TABLE domain_locks ADD CONSTRAINT domain_locks_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- reveals: cascade on user delete
ALTER TABLE reveals DROP CONSTRAINT IF EXISTS reveals_user_id_fkey;
ALTER TABLE reveals ADD CONSTRAINT reveals_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- subscriptions: cascade on user delete
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- suggestions: cascade on user delete
ALTER TABLE suggestions DROP CONSTRAINT IF EXISTS suggestions_user_id_fkey;
ALTER TABLE suggestions ADD CONSTRAINT suggestions_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
