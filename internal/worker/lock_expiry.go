package worker

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type LockExpiryWorker struct {
	db       *pgxpool.Pool
	interval time.Duration
	stopCh   chan struct{}
}

func NewLockExpiryWorker(db *pgxpool.Pool, interval time.Duration) *LockExpiryWorker {
	return &LockExpiryWorker{
		db:       db,
		interval: interval,
		stopCh:   make(chan struct{}),
	}
}

func (w *LockExpiryWorker) Start(ctx context.Context) {
	go func() {
		ticker := time.NewTicker(w.interval)
		defer ticker.Stop()

		log.Info().Dur("interval", w.interval).Msg("lock expiry worker started")

		for {
			select {
			case <-ticker.C:
				w.expireLocks(ctx)
			case <-w.stopCh:
				log.Info().Msg("lock expiry worker stopped")
				return
			case <-ctx.Done():
				log.Info().Msg("lock expiry worker stopped (context cancelled)")
				return
			}
		}
	}()
}

func (w *LockExpiryWorker) Stop() {
	close(w.stopCh)
}

func (w *LockExpiryWorker) expireLocks(ctx context.Context) {
	result, err := w.db.Exec(ctx,
		`UPDATE domain_locks SET status = 'expired'
		 WHERE status = 'active' AND expires_at < NOW()`,
	)
	if err != nil {
		log.Error().Err(err).Msg("failed to expire stale locks")
		return
	}

	count := result.RowsAffected()
	if count > 0 {
		log.Info().Int64("expired", count).Msg("expired stale domain locks")
	}
}
