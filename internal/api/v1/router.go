package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/api/middleware"
	"github.com/nekwasar/ceche/internal/appraisal"
	"github.com/nekwasar/ceche/internal/config"
)

func NewRouter(cfg *config.Config, db *pgxpool.Pool) http.Handler {
	r := chi.NewRouter()

	// Global middleware
	r.Use(chimw.RequestID)
	r.Use(chimw.RealIP)
	r.Use(middleware.Logging)
	r.Use(middleware.Recovery)
	r.Use(middleware.CORS(cfg.CORSOrigins))

	// Rate limiter
	limiter := middleware.NewRateLimiter(cfg.RateLimitUser, time.Minute)
	r.Use(limiter.Middleware)

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "ok",
			"version": "1.0.0",
		})
	})

	// API v1 routes
	r.Route("/api/v1", func(r chi.Router) {
		// Auth routes (public)
		r.Post("/auth/register", handleRegister(db, cfg))
		r.Post("/auth/login", handleLogin(db, cfg))
		r.Post("/auth/refresh", handleRefresh(db, cfg))

		// Public pricing info
		r.Get("/pricing/reveal", handleGetRevealPricing())

		// Public appraisal (free tier: 3 per IP per day)
		r.Post("/appraise/public", handleAppraisePublic(db))

		// Intelligence (public summary, full requires auth)
		r.Get("/intelligence/{domain}/summary", handleGetIntelligenceSummary(db))

		// Tool endpoints (public - for AI agent integration)
		r.Post("/tools/run", handleRunTool())
		r.Post("/tools/appraise", handleToolAppraise())
		r.Get("/tools/list", handleListTools())
		r.Get("/tools/schema", handleGetToolSchema())

		// Webhook (no auth — verified by HMAC signature)
		r.Post("/webhooks/paystack", handlePaystackWebhook(db))

		// Protected routes
		r.Group(func(r chi.Router) {
			r.Use(AuthMiddleware(db, cfg))
			r.Get("/users/me", handleGetUser(db))
			r.Put("/users/me", handleUpdateUser(db))
			r.Post("/api-keys", handleCreateAPIKey(db))
			r.Delete("/api-keys/{id}", handleDeleteAPIKey(db))
			r.Get("/api-keys", handleListAPIKeys(db))

			// Appraisals
			r.Post("/appraise", handleAppraise(db))
			r.Get("/appraisals", handleGetAppraisals(db))
			r.Get("/appraisals/{id}", handleGetAppraisal(db))

			// Scans
			r.Post("/scans", handleCreateScan(db))
			r.Get("/scans", handleGetUserScans(db))
			r.Get("/scans/{id}", handleGetScan(db))
			r.Get("/scans/{id}/export", handleExportScanResults(db))

			// Word Lists
			r.Get("/word-lists", handleGetWordLists(db))
			r.Post("/word-lists", handleCreateWordList(db))
			r.Delete("/word-lists/{id}", handleDeleteWordList(db))

			// Locks (Phase 4)
			r.Post("/locks", handleAcquireLock(db))
			r.Delete("/locks/{id}", handleReleaseLock(db))

			// Reveals (Phase 4)
			r.Post("/reveals", handleCreateReveal(db))
			r.Get("/reveals", handleGetUserReveals(db))
			r.Get("/reveals/{id}", handleGetReveal(db))

			// Subscriptions (Phase 4)
			r.Post("/subscriptions", handleCreateSubscription(db))
			r.Get("/subscriptions", handleGetSubscription(db))
			r.Delete("/subscriptions", handleCancelSubscription(db))

			// Intelligence (Phase 5)
			r.Get("/intelligence/{domain}", handleGetIntelligence(db))

			// Suggestions (Phase 6)
			r.Post("/suggestions", handleGenerateSuggestions(db))
		})
	})

	return r
}
