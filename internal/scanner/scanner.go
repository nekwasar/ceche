package scanner

import (
	"context"
	"fmt"
	"net"
	"sync"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type ScanJob struct {
	Domain string
	TLD    string
}

type ScanResult struct {
	Domain    string
	TLD       string
	Available bool
	Price     float64
	Registrar string
	Expiry    *time.Time
	Error     string
}

type ScanProgress struct {
	ScanID          string
	Total           int
	Scanned         int
	Available       int
	CurrentDomain   string
	Status          string
}

type Scanner struct {
	db          *pgxpool.Pool
	concurrency int
	workers     int
	jobs        chan ScanJob
	results     chan ScanResult
	progress    chan ScanProgress
	quit        chan struct{}
	wg          sync.WaitGroup
	cancelOnce  sync.Once
}

func New(db *pgxpool.Pool, concurrency int) *Scanner {
	if concurrency <= 0 {
		concurrency = 50
	}
	return &Scanner{
		db:          db,
		concurrency: concurrency,
		jobs:        make(chan ScanJob, concurrency*2),
		results:     make(chan ScanResult, concurrency*2),
		progress:    make(chan ScanProgress, 100),
		quit:        make(chan struct{}),
	}
}

func (s *Scanner) Start(ctx context.Context, scanID string, domains []string, tlds []string) {
	total := len(domains) * len(tlds)

	go func() {
		defer close(s.results)
		defer close(s.progress)

		var wg sync.WaitGroup
		for i := 0; i < s.concurrency; i++ {
			wg.Add(1)
			go func() {
				defer wg.Done()
				s.worker(ctx)
			}()
		}

		go func() {
			for _, domain := range domains {
				for _, tld := range tlds {
					select {
					case s.jobs <- ScanJob{Domain: domain, TLD: tld}:
					case <-ctx.Done():
						return
					case <-s.quit:
						return
					}
				}
			}
			close(s.jobs)
		}()

		wg.Wait()
	}()

	go s.processResults(ctx, scanID, total)
}

func (s *Scanner) worker(ctx context.Context) {
	for job := range s.jobs {
		select {
		case <-ctx.Done():
			return
		case <-s.quit:
			return
		default:
		}

		result := s.checkDomain(ctx, job.Domain, job.TLD)
		s.results <- result
	}
}

func (s *Scanner) checkDomain(ctx context.Context, domain, tld string) ScanResult {
	fullDomain := domain + "." + tld
	result := ScanResult{
		Domain: domain,
		TLD:    tld,
	}

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	_, err := net.LookupHost(fullDomain)
	if err != nil {
		if dnsErr, ok := err.(*net.DNSError); ok {
			if dnsErr.IsNotFound {
				result.Available = true
				result.Price = estimatePrice(domain, tld)
			} else {
				result.Error = dnsErr.Error()
			}
		} else {
			result.Error = err.Error()
		}
	} else {
		result.Available = false
	}

	return result
}

func (s *Scanner) processResults(ctx context.Context, scanID string, total int) {
	scanned := 0
	available := 0

	batch := make([]ScanResult, 0, 100)
	batchTicker := time.NewTicker(100 * time.Millisecond)
	defer batchTicker.Stop()

	for {
		select {
		case result, ok := <-s.results:
			if !ok {
				s.flushBatch(ctx, scanID, batch)
				s.updateScanComplete(ctx, scanID, scanned, available)
				return
			}

			scanned++
			if result.Available {
				available++
			}

			batch = append(batch, result)

			select {
			case s.progress <- ScanProgress{
				ScanID:        scanID,
				Total:         total,
				Scanned:       scanned,
				Available:     available,
				CurrentDomain: result.Domain + "." + result.TLD,
				Status:        "running",
			}:
			default:
			}

			if len(batch) >= 100 {
				s.flushBatch(ctx, scanID, batch)
				batch = batch[:0]
			}

		case <-batchTicker.C:
			if len(batch) > 0 {
				s.flushBatch(ctx, scanID, batch)
				batch = batch[:0]
			}

		case <-ctx.Done():
			s.flushBatch(ctx, scanID, batch)
			s.updateScanFailed(ctx, scanID, ctx.Err().Error())
			return

		case <-s.quit:
			s.flushBatch(ctx, scanID, batch)
			s.updateScanFailed(ctx, scanID, "cancelled")
			return
		}
	}
}

func (s *Scanner) flushBatch(ctx context.Context, scanID string, batch []ScanResult) {
	if len(batch) == 0 {
		return
	}

	tx, err := s.db.Begin(ctx)
	if err != nil {
		log.Error().Err(err).Msg("failed to begin transaction for scan results")
		return
	}
	defer tx.Rollback(ctx)

	for _, result := range batch {
		var price *float64
		if result.Available {
			price = &result.Price
		}

		_, err := tx.Exec(ctx,
			`INSERT INTO scan_results (scan_id, domain, tld, available, price, registrar, error)
			 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			scanID, result.Domain, result.TLD, result.Available, price, result.Registrar, result.Error,
		)
		if err != nil {
			log.Error().Err(err).Str("domain", result.Domain).Msg("failed to insert scan result")
		}
	}

	if err := tx.Commit(ctx); err != nil {
		log.Error().Err(err).Msg("failed to commit scan results batch")
	}
}

func (s *Scanner) updateScanComplete(ctx context.Context, scanID string, scanned, available int) {
	_, err := s.db.Exec(ctx,
		`UPDATE scans 
		 SET status = 'completed', scanned_domains = $1, available_domains = $2, completed_at = NOW()
		 WHERE id = $3`,
		scanned, available, scanID,
	)
	if err != nil {
		log.Error().Err(err).Msg("failed to update scan completion")
	}
}

func (s *Scanner) updateScanFailed(ctx context.Context, scanID string, errMsg string) {
	_, err := s.db.Exec(ctx,
		`UPDATE scans 
		 SET status = 'failed', error_message = $1, completed_at = NOW()
		 WHERE id = $2`,
		errMsg, scanID,
	)
	if err != nil {
		log.Error().Err(err).Msg("failed to update scan failure")
	}
}

func (s *Scanner) Cancel() {
	s.cancelOnce.Do(func() {
		close(s.quit)
	})
}

func (s *Scanner) Progress() <-chan ScanProgress {
	return s.progress
}

func estimatePrice(domain, tld string) float64 {
	basePrice := 9.99

	switch tld {
	case "com":
		if len(domain) <= 4 {
			basePrice = 49.99
		} else if len(domain) <= 6 {
			basePrice = 29.99
		}
	case "net":
		if len(domain) <= 4 {
			basePrice = 39.99
		} else if len(domain) <= 6 {
			basePrice = 24.99
		}
	case "io":
		if len(domain) <= 4 {
			basePrice = 59.99
		} else if len(domain) <= 6 {
			basePrice = 34.99
		}
	case "co":
		if len(domain) <= 4 {
			basePrice = 44.99
		} else if len(domain) <= 6 {
			basePrice = 27.99
		}
	}

	return basePrice
}

func GenerateCombinations(words []string, tlds []string) []string {
	var domains []string
	seen := make(map[string]bool)

	for _, word := range words {
		cleaned := sanitize(word)
		if cleaned == "" || len(cleaned) < 2 || len(cleaned) > 12 {
			continue
		}

		if !seen[cleaned] {
			domains = append(domains, cleaned)
			seen[cleaned] = true
		}
	}

	return domains
}

func sanitize(word string) string {
	result := make([]byte, 0, len(word))
	for _, c := range word {
		if (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') {
			result = append(result, byte(c))
		}
	}
	return string(result)
}

func (s *Scanner) GetScanStats(ctx context.Context, scanID string) (map[string]interface{}, error) {
	var total, scanned, available int
	var status string

	err := s.db.QueryRow(ctx,
		`SELECT total_domains, scanned_domains, available_domains, status
		 FROM scans WHERE id = $1`,
		scanID,
	).Scan(&total, &scanned, &available, &status)
	if err != nil {
		return nil, fmt.Errorf("failed to get scan stats: %w", err)
	}

	return map[string]interface{}{
		"total":     total,
		"scanned":   scanned,
		"available": available,
		"status":    status,
		"progress":  float64(scanned) / float64(total) * 100,
	}, nil
}
