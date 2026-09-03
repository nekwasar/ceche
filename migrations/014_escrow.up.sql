-- Phase 9: Escrow

CREATE TABLE escrow (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    amount NUMERIC(15,2) NOT NULL,
    status TEXT DEFAULT 'held',
    released_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_escrow_order ON escrow(order_id);
CREATE INDEX idx_escrow_status ON escrow(status);
