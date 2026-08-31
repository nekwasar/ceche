package v1

import (
	"context"
	"crypto/hmac"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"

	"github.com/nekwasar/ceche/internal/service"
)

func handlePaystackWebhook(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		body, err := io.ReadAll(r.Body)
		if err != nil {
			writeError(w, http.StatusBadRequest, "failed to read body")
			return
		}

		signature := r.Header.Get("X-Paystack-Signature")
		if signature == "" {
			writeError(w, http.StatusUnauthorized, "missing signature")
			return
		}

		secretKey := os.Getenv("PAYSTACK_SECRET_KEY")
		if secretKey == "" {
			log.Error().Msg("PAYSTACK_SECRET_KEY not set; rejecting webhook")
			writeError(w, http.StatusServiceUnavailable, "webhook not configured")
			return
		}

		mac := hmac.New(sha512.New, []byte(secretKey))
		mac.Write(body)
		expectedSig := mac.Sum(nil)

		sigBytes, err := hex.DecodeString(signature)
		if err != nil {
			writeError(w, http.StatusUnauthorized, "invalid signature encoding")
			return
		}

		if !hmac.Equal(sigBytes, expectedSig) {
			writeError(w, http.StatusUnauthorized, "invalid signature")
			return
		}

		var event struct {
			Event string          `json:"event"`
			Data  json.RawMessage `json:"data"`
		}
		if err := json.Unmarshal(body, &event); err != nil {
			writeError(w, http.StatusBadRequest, "invalid JSON")
			return
		}

		switch event.Event {
		case "charge.success":
			handleChargeSuccess(r.Context(), db, event.Data)
		case "subscription.create":
			handleSubCreate(r.Context(), db, event.Data)
		case "subscription.disable":
			handleSubDisable(r.Context(), db, event.Data)
		default:
			log.Info().Str("event", event.Event).Msg("unhandled webhook event")
		}

		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	}
}

func handleChargeSuccess(ctx context.Context, db *pgxpool.Pool, data json.RawMessage) {
	var charge struct {
		Reference string `json:"reference"`
		Amount    int64  `json:"amount"`
		Status    string `json:"status"`
		Metadata  struct {
			RevealID string `json:"reveal_id"`
			UserID   string `json:"user_id"`
		} `json:"metadata"`
	}

	if err := json.Unmarshal(data, &charge); err != nil {
		log.Error().Err(err).Msg("failed to parse charge.success data")
		return
	}

	if charge.Status != "success" {
		log.Info().Str("reference", charge.Reference).Msg("charge not successful")
		return
	}

	if charge.Metadata.RevealID != "" {
		revealService := service.NewRevealService(db)
		if err := revealService.CompleteReveal(ctx, charge.Metadata.RevealID, "revealed-domain"); err != nil {
			log.Error().Err(err).Str("reveal_id", charge.Metadata.RevealID).Msg("failed to complete reveal")
		} else {
			log.Info().Str("reveal_id", charge.Metadata.RevealID).Msg("reveal completed via webhook")
		}
	}
}

func handleSubCreate(ctx context.Context, db *pgxpool.Pool, data json.RawMessage) {
	var sub struct {
		SubscriptionCode string `json:"subscription_code"`
		Customer         struct {
			Email string `json:"email"`
		} `json:"customer"`
		Plan struct {
			Code string `json:"code"`
		} `json:"plan"`
	}

	if err := json.Unmarshal(data, &sub); err != nil {
		log.Error().Err(err).Msg("failed to parse subscription.create data")
		return
	}

	// Update subscription with Paystack subscription code
	_, err := db.Exec(ctx,
		`UPDATE subscriptions SET paystack_sub_id = $1, status = 'active'
		 WHERE user_id = (SELECT id FROM users WHERE email = $2) AND status = 'active'`,
		sub.SubscriptionCode, sub.Customer.Email,
	)
	if err != nil {
		log.Error().Err(err).Str("email", sub.Customer.Email).Msg("failed to update subscription")
	} else {
		log.Info().Str("email", sub.Customer.Email).Str("subscription", sub.SubscriptionCode).Msg("subscription updated via webhook")
	}
}

func handleSubDisable(ctx context.Context, db *pgxpool.Pool, data json.RawMessage) {
	var sub struct {
		SubscriptionCode string `json:"subscription_code"`
	}

	if err := json.Unmarshal(data, &sub); err != nil {
		log.Error().Err(err).Msg("failed to parse subscription.disable data")
		return
	}

	log.Info().Str("subscription", sub.SubscriptionCode).Msg("subscription disabled")
}
