package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/api/middleware"
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
		})
	})

	return r
}
