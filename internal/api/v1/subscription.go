package v1

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

type Subscription struct {
	ID               string     `json:"id"`
	UserID           string     `json:"user_id"`
	Plan             string     `json:"plan"`
	PaystackSubID    *string    `json:"paystack_sub_id,omitempty"`
	Status           string     `json:"status"`
	CurrentPeriodEnd *time.Time `json:"current_period_end,omitempty"`
	CreatedAt        time.Time  `json:"created_at"`
}

func handleCreateSubscription(db *pgxpool.Pool) http.HandlerFunc {
	type request struct {
		Plan string `json:"plan"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		limitBody(r)
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		var req request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "invalid request body")
			return
		}

		if req.Plan != "startup" && req.Plan != "enterprise" {
			writeError(w, http.StatusBadRequest, "plan must be 'startup' or 'enterprise'")
			return
		}

		var sub Subscription
		err := db.QueryRow(r.Context(),
			`INSERT INTO subscriptions (user_id, plan, status, current_period_end)
			 VALUES ($1, $2, 'active', NOW() + INTERVAL '30 days')
			 RETURNING id, user_id, plan, status, current_period_end, created_at`,
			userID, req.Plan,
		).Scan(&sub.ID, &sub.UserID, &sub.Plan, &sub.Status, &sub.CurrentPeriodEnd, &sub.CreatedAt)

		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to create subscription")
			return
		}

		writeJSON(w, http.StatusCreated, sub)
	}
}

func handleGetSubscription(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		var sub Subscription
		err := db.QueryRow(r.Context(),
			`SELECT id, user_id, plan, paystack_sub_id, status, current_period_end, created_at
			 FROM subscriptions WHERE user_id = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
			userID,
		).Scan(&sub.ID, &sub.UserID, &sub.Plan, &sub.PaystackSubID, &sub.Status, &sub.CurrentPeriodEnd, &sub.CreatedAt)

		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				writeJSON(w, http.StatusOK, map[string]interface{}{
					"plan":   "free",
					"status": "inactive",
				})
				return
			}
			writeError(w, http.StatusInternalServerError, "failed to fetch subscription")
			return
		}

		writeJSON(w, http.StatusOK, sub)
	}
}

func handleCancelSubscription(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		result, err := db.Exec(r.Context(),
			`UPDATE subscriptions SET status = 'cancelled' WHERE user_id = $1 AND status = 'active'
			 AND id = (SELECT id FROM subscriptions WHERE user_id = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 1)`,
			userID,
		)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to cancel subscription")
			return
		}

		if result.RowsAffected() == 0 {
			writeError(w, http.StatusNotFound, "no active subscription found")
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{"status": "cancelled"})
	}
}

func handleGetRevealPricing() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		revealService := service.NewRevealService(nil)

		writeJSON(w, http.StatusOK, map[string]interface{}{
			"reveal": map[string]float64{
				"partial": revealService.GetRevealPrice("partial"),
				"luck":    revealService.GetRevealPrice("luck"),
				"full":    revealService.GetRevealPrice("full"),
			},
			"try_your_luck": map[string]float64{
				"com":  revealService.GetTryYourLuckPrice("com"),
				"net":  revealService.GetTryYourLuckPrice("net"),
				"io":   revealService.GetTryYourLuckPrice("io"),
				"co":   revealService.GetTryYourLuckPrice("co"),
				"flat": revealService.GetTryYourLuckPrice("flat"),
			},
		})
	}
}
