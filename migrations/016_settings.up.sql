-- Phase 9: Settings

CREATE TABLE settings (
    key_name TEXT PRIMARY KEY,
    value TEXT,
    description TEXT
);

INSERT INTO settings (key_name, value, description) VALUES
    ('platform_name', 'Ceche', 'Platform display name'),
    ('platform_tagline', 'Know what''s available. Know what''s worth. Own it first.', 'Platform tagline'),
    ('default_currency', 'USD', 'Default currency for pricing'),
    ('listing_fee_standard', '5', 'Standard listing fee in USD'),
    ('listing_fee_priority', '10', 'Priority listing fee in USD'),
    ('commission_standard', '0.15', 'Standard commission rate (15%)'),
    ('commission_high', '0.12', 'Commission for sales $501-$5,000 (12%)'),
    ('commission_premium', '0.10', 'Commission for sales $5,001-$50,000 (10%)'),
    ('commission_enterprise', '0.08', 'Commission for sales $50,001+ (8%)'),
    ('lock_ttl_seconds', '300', 'Domain lock TTL in seconds (5 minutes)'),
    ('scanner_concurrency', '50', 'Scanner goroutine pool size');
