package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	LockTTL = 5 * time.Minute
)

type Lock struct {
	ID         string    `json:"id"`
	UserID     string    `json:"user_id"`
	DomainHash string    `json:"domain_hash"`
	ListingID  *string   `json:"listing_id,omitempty"`
	LockedAt   time.Time `json:"locked_at"`
	ExpiresAt  time.Time `json:"expires_at"`
	Status     string    `json:"status"`
}

type LockService struct {
	db *pgxpool.Pool
}

func NewLockService(db *pgxpool.Pool) *LockService {
	return &LockService{db: db}
}

func (s *LockService) AcquireLock(ctx context.Context, userID, domainHash string, listingID *string) (*Lock, error) {
	now := time.Now()
	expiresAt := now.Add(LockTTL)

	var lock Lock
	err := s.db.QueryRow(ctx,
		`INSERT INTO domain_locks (user_id, domain_hash, listing_id, locked_at, expires_at, status)
		 VALUES ($1, $2, $3, $4, $5, 'active')
		 ON CONFLICT (domain_hash) WHERE status = 'active'
		 DO NOTHING
		 RETURNING id, user_id, domain_hash, listing_id, locked_at, expires_at, status`,
		userID, domainHash, listingID, now, expiresAt,
	).Scan(&lock.ID, &lock.UserID, &lock.DomainHash, &lock.ListingID, &lock.LockedAt, &lock.ExpiresAt, &lock.Status)

	if errors.Is(err, pgx.ErrNoRows) {
		return nil, fmt.Errorf("domain is already locked by another user")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to acquire lock: %w", err)
	}

	return &lock, nil
}

func (s *LockService) ReleaseLock(ctx context.Context, lockID, userID string) error {
	result, err := s.db.Exec(ctx,
		`UPDATE domain_locks SET status = 'released' WHERE id = $1 AND user_id = $2 AND status = 'active'`,
		lockID, userID,
	)
	if err != nil {
		return fmt.Errorf("failed to release lock: %w", err)
	}
	if result.RowsAffected() == 0 {
		return fmt.Errorf("lock not found or already expired")
	}
	return nil
}

func (s *LockService) CompleteLock(ctx context.Context, lockID string) error {
	result, err := s.db.Exec(ctx,
		`UPDATE domain_locks SET status = 'completed' WHERE id = $1 AND status = 'active'`,
		lockID,
	)
	if err != nil {
		return fmt.Errorf("failed to complete lock: %w", err)
	}
	if result.RowsAffected() == 0 {
		return fmt.Errorf("lock not found or already expired")
	}
	return nil
}

func (s *LockService) GetLock(ctx context.Context, lockID string) (*Lock, error) {
	var lock Lock
	err := s.db.QueryRow(ctx,
		`SELECT id, user_id, domain_hash, listing_id, locked_at, expires_at, status
		 FROM domain_locks WHERE id = $1`,
		lockID,
	).Scan(&lock.ID, &lock.UserID, &lock.DomainHash, &lock.ListingID, &lock.LockedAt, &lock.ExpiresAt, &lock.Status)

	if err != nil {
		return nil, fmt.Errorf("lock not found: %w", err)
	}
	return &lock, nil
}

func (s *LockService) ExpireStaleLocks(ctx context.Context) (int64, error) {
	result, err := s.db.Exec(ctx,
		`UPDATE domain_locks SET status = 'expired'
		 WHERE status = 'active' AND expires_at < NOW()`,
	)
	if err != nil {
		return 0, fmt.Errorf("failed to expire stale locks: %w", err)
	}
	return result.RowsAffected(), nil
}
