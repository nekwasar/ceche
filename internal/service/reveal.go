package service

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type RevealType string

type Reveal struct {
	ID             string    `json:"id"`
	UserID         string    `json:"user_id"`
	DomainHash     string    `json:"domain_hash"`
	RevealType     string    `json:"reveal_type"`
	Amount         float64   `json:"amount"`
	PaystackRef    *string   `json:"paystack_ref,omitempty"`
	RevealedDomain *string   `json:"revealed_domain,omitempty"`
	Status         string    `json:"status"`
	CreatedAt      time.Time `json:"created_at"`
}

type RevealService struct {
	db *pgxpool.Pool
}

func NewRevealService(db *pgxpool.Pool) *RevealService {
	return &RevealService{db: db}
}

var RevealPricing = map[string]float64{
	"partial": 10.00,
	"luck":    5.00,
	"full":    5.00,
}

var TryYourLuckPricing = map[string]float64{
	"com":  79.00,
	"net":  39.00,
	"io":   29.00,
	"co":   9.00,
	"flat": 19.00,
}

func (s *RevealService) GetRevealPrice(revealType string) float64 {
	if price, ok := RevealPricing[revealType]; ok {
		return price
	}
	return 0
}

func (s *RevealService) GetTryYourLuckPrice(tld string) float64 {
	if price, ok := TryYourLuckPricing[tld]; ok {
		return price
	}
	return TryYourLuckPricing["flat"]
}

func (s *RevealService) CreateReveal(ctx context.Context, userID, domainHash, revealType string, amount float64, paystackRef string) (*Reveal, error) {
	var reveal Reveal
	err := s.db.QueryRow(ctx,
		`INSERT INTO reveals (user_id, domain_hash, reveal_type, amount, paystack_ref, status)
		 VALUES ($1, $2, $3, $4, $5, 'pending')
		 RETURNING id, user_id, domain_hash, reveal_type, amount, paystack_ref, status, created_at`,
		userID, domainHash, revealType, amount, paystackRef,
	).Scan(&reveal.ID, &reveal.UserID, &reveal.DomainHash, &reveal.RevealType, &reveal.Amount, &reveal.PaystackRef, &reveal.Status, &reveal.CreatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create reveal: %w", err)
	}
	return &reveal, nil
}

func (s *RevealService) CompleteReveal(ctx context.Context, revealID, domainName string) error {
	result, err := s.db.Exec(ctx,
		`UPDATE reveals SET status = 'completed', revealed_domain = $1 WHERE id = $2 AND status = 'pending'`,
		domainName, revealID,
	)
	if err != nil {
		return fmt.Errorf("failed to complete reveal: %w", err)
	}
	if result.RowsAffected() == 0 {
		return fmt.Errorf("reveal not found or already processed")
	}
	return nil
}

func (s *RevealService) GetReveal(ctx context.Context, revealID string) (*Reveal, error) {
	var reveal Reveal
	err := s.db.QueryRow(ctx,
		`SELECT id, user_id, domain_hash, reveal_type, amount, paystack_ref, revealed_domain, status, created_at
		 FROM reveals WHERE id = $1`,
		revealID,
	).Scan(&reveal.ID, &reveal.UserID, &reveal.DomainHash, &reveal.RevealType, &reveal.Amount, &reveal.PaystackRef, &reveal.RevealedDomain, &reveal.Status, &reveal.CreatedAt)

	if err != nil {
		return nil, fmt.Errorf("reveal not found: %w", err)
	}
	return &reveal, nil
}

func (s *RevealService) GetRevealForUser(ctx context.Context, revealID, userID string) (*Reveal, error) {
	var reveal Reveal
	err := s.db.QueryRow(ctx,
		`SELECT id, user_id, domain_hash, reveal_type, amount, paystack_ref, revealed_domain, status, created_at
		 FROM reveals WHERE id = $1 AND user_id = $2`,
		revealID, userID,
	).Scan(&reveal.ID, &reveal.UserID, &reveal.DomainHash, &reveal.RevealType, &reveal.Amount, &reveal.PaystackRef, &reveal.RevealedDomain, &reveal.Status, &reveal.CreatedAt)

	if err != nil {
		return nil, fmt.Errorf("reveal not found: %w", err)
	}
	return &reveal, nil
}

func (s *RevealService) GetUserReveals(ctx context.Context, userID string, limit int) ([]Reveal, error) {
	rows, err := s.db.Query(ctx,
		`SELECT id, user_id, domain_hash, reveal_type, amount, paystack_ref, revealed_domain, status, created_at
		 FROM reveals WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
		userID, limit,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to query reveals: %w", err)
	}
	defer rows.Close()

	var reveals []Reveal
	for rows.Next() {
		var r Reveal
		if err := rows.Scan(&r.ID, &r.UserID, &r.DomainHash, &r.RevealType, &r.Amount, &r.PaystackRef, &r.RevealedDomain, &r.Status, &r.CreatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan reveal: %w", err)
		}
		reveals = append(reveals, r)
	}
	return reveals, nil
}
