-- Create scans table
CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    word_list_name TEXT NOT NULL,
    tlds TEXT[] NOT NULL DEFAULT ARRAY['com', 'net', 'io', 'co'],
    status TEXT NOT NULL DEFAULT 'pending',
    total_domains INTEGER NOT NULL DEFAULT 0,
    scanned_domains INTEGER NOT NULL DEFAULT 0,
    available_domains INTEGER NOT NULL DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- Create scan_results table
CREATE TABLE IF NOT EXISTS scan_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
    domain TEXT NOT NULL,
    tld TEXT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT false,
    price DECIMAL(10,2),
    registrar TEXT,
    expiry_date TIMESTAMPTZ,
    checked_at TIMESTAMPTZ DEFAULT NOW(),
    error TEXT
);

-- Create word_lists table
CREATE TABLE IF NOT EXISTS word_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    words TEXT[] NOT NULL,
    word_count INTEGER NOT NULL,
    source TEXT NOT NULL DEFAULT 'custom',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for scans
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_status ON scans(status);
CREATE INDEX idx_scans_created ON scans(created_at DESC);

-- Indexes for scan_results
CREATE INDEX idx_scan_results_scan_id ON scan_results(scan_id);
CREATE INDEX idx_scan_results_available ON scan_results(available);
CREATE INDEX idx_scan_results_domain ON scan_results(domain);

-- Indexes for word_lists
CREATE INDEX idx_word_lists_user_id ON word_lists(user_id);
CREATE INDEX idx_word_lists_source ON word_lists(source);
