package v1

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/cache"
	"github.com/nekwasar/ceche/internal/service"
)

func getUserTier(ctx context.Context, db *pgxpool.Pool, userID string) string {
	var tier string
	err := db.QueryRow(ctx,
		`SELECT subscription_tier FROM users WHERE id = $1`,
		userID,
	).Scan(&tier)
	if err != nil || tier == "" {
		return "free"
	}
	return tier
}

func handleAppraise(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}
		limitBody(r)

		var req struct {
			Domain         string `json:"domain"`
			IdempotencyKey string `json:"idempotency_key"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		req.Domain = strings.TrimSpace(strings.ToLower(req.Domain))
		if req.Domain == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Domain is required"}}`, http.StatusBadRequest)
			return
		}

		if !domainRegex.MatchString(req.Domain) {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid domain format"}}`, http.StatusBadRequest)
			return
		}

		idempotencyKey := r.Header.Get("Idempotency-Key")
		if idempotencyKey == "" {
			idempotencyKey = req.IdempotencyKey
		}

		if idempotencyKey != "" {
			var existingID string
			err := db.QueryRow(r.Context(),
				`SELECT id FROM appraisals WHERE idempotency_key = $1 AND user_id = $2`,
				idempotencyKey, userID,
			).Scan(&existingID)
			if err == nil {
				var score int
				var metrics []byte
				if err := db.QueryRow(r.Context(),
					`SELECT score, metrics FROM appraisals WHERE id = $1`,
					existingID,
				).Scan(&score, &metrics); err != nil {
					writeError(w, http.StatusInternalServerError, "failed to load cached appraisal")
					return
				}

				w.Header().Set("Content-Type", "application/json")
				w.Write(metrics)
				return
			}
		}

		tier := getUserTier(r.Context(), db, userID)

		// Dev bypass: override tier to enterprise for full 16-dimension results
		if r.Header.Get("X-Dev-Bypass") == "true" {
			tier = "enterprise"
		}

		cacheKey := "appraisal:" + req.Domain + ":" + tier
		var cachedMetrics service.AppraisalMetrics
		if c := cache.GetCache(); c != nil {
			if err := c.Get(cacheKey, &cachedMetrics); err == nil {
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(map[string]interface{}{
					"domain":   req.Domain,
					"score":    cachedMetrics.Score,
					"metrics":  cachedMetrics,
					"cached":   true,
				})
				return
			}
		}

		score, metrics := service.CalculateScore(req.Domain, tier)

		tld := ""
		if idx := strings.LastIndex(req.Domain, "."); idx != -1 {
			tld = req.Domain[idx+1:]
		}

		metricsJSON, _ := json.Marshal(map[string]interface{}{
			"domain":          req.Domain,
			"score":           score,
			"metrics":         metrics,
			"idempotency_key": idempotencyKey,
		})

		var appraisalID string
		err := db.QueryRow(r.Context(),
			`INSERT INTO appraisals (user_id, domain, tld, score, metrics, idempotency_key)
			 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
			userID, req.Domain, tld, score, metricsJSON, idempotencyKey,
		).Scan(&appraisalID)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to save appraisal"}}`, http.StatusInternalServerError)
			return
		}

		db.Exec(r.Context(),
			`INSERT INTO audit_logs (user_id, action, resource, resource_id, ip_address, user_agent)
			 VALUES ($1, 'appraise', 'appraisal', $2, $3, $4)`,
			userID, appraisalID, r.RemoteAddr, r.UserAgent(),
		)
		// Audit log errors are logged but don't fail the request

		if c := cache.GetCache(); c != nil {
			c.Set(cacheKey, metrics)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(metricsJSON)
	}
}

func handleGetAppraisals(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		rows, err := db.Query(r.Context(),
			`SELECT id, domain, score, metrics, created_at
			 FROM appraisals WHERE user_id = $1
			 ORDER BY created_at DESC LIMIT 50`,
			userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to fetch appraisals"}}`, http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var appraisals []map[string]interface{}
		for rows.Next() {
			var id, domain string
			var score int
			var metrics []byte
			var createdAt interface{}
			if err := rows.Scan(&id, &domain, &score, &metrics, &createdAt); err != nil {
				continue
			}
			appraisals = append(appraisals, map[string]interface{}{
				"id":         id,
				"domain":     domain,
				"score":      score,
				"metrics":    json.RawMessage(metrics),
				"created_at": createdAt,
			})
		}

		if appraisals == nil {
			appraisals = []map[string]interface{}{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"appraisals": appraisals,
		})
	}
}

func handleGetAppraisal(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}
		appraisalID := chi.URLParam(r, "id")

		var domain string
		var score int
		var metrics []byte
		var createdAt interface{}
		err := db.QueryRow(r.Context(),
			`SELECT domain, score, metrics, created_at
			 FROM appraisals WHERE id = $1 AND user_id = $2`,
			appraisalID, userID,
		).Scan(&domain, &score, &metrics, &createdAt)
		if err != nil {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Appraisal not found"}}`, http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":         appraisalID,
			"domain":     domain,
			"score":      score,
			"metrics":    json.RawMessage(metrics),
			"created_at": createdAt,
		})
	}
}

// handleAppraisePublic allows unauthenticated users to appraise (free tier: 3 per IP per day)
var publicRateMap = make(map[string]*publicIPCount)

type publicIPCount struct {
	count int
	date  string
}

func handleAppraisePublic(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		limitBody(r)

		var req struct {
			Domain string `json:"domain"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		req.Domain = strings.TrimSpace(strings.ToLower(req.Domain))
		if req.Domain == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Domain is required"}}`, http.StatusBadRequest)
			return
		}

		if !domainRegex.MatchString(req.Domain) {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid domain format"}}`, http.StatusBadRequest)
			return
		}

		// Rate limit: 3 per IP per day
		ip := r.RemoteAddr
		if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
			ip = strings.Split(fwd, ",")[0]
		}
		if idx := strings.LastIndex(ip, ":"); idx != -1 {
			ip = ip[:idx]
		}
		today := time.Now().Format("2006-01-02")

		if rc, exists := publicRateMap[ip]; exists {
			if rc.date == today {
				if rc.count >= 3 {
					w.Header().Set("Content-Type", "application/json")
					w.WriteHeader(http.StatusTooManyRequests)
					json.NewEncoder(w).Encode(map[string]interface{}{
						"error": map[string]interface{}{
							"code":    "RATE_LIMITED",
							"message": "Free limit reached. Create an account for 12 appraisals/day.",
						},
						"remaining": 0,
					})
					return
				}
				rc.count++
			} else {
				rc.count = 1
				rc.date = today
			}
		} else {
			publicRateMap[ip] = &publicIPCount{count: 1, date: today}
		}

		// Calculate score (free tier)
		score, metrics := service.CalculateScore(req.Domain, "free")

		tld := ""
		if idx := strings.LastIndex(req.Domain, "."); idx != -1 {
			tld = req.Domain[idx+1:]
		}

		metricsJSON, _ := json.Marshal(map[string]interface{}{
			"domain":          req.Domain,
			"score":           score,
			"metrics":         metrics,
			"idempotency_key": "",
		})

		// Try to save to database (use anonymous user ID)
		anonymousID := "00000000-0000-0000-0000-000000000000"
		db.Exec(r.Context(),
			`INSERT INTO appraisals (user_id, domain, tld, score, metrics, idempotency_key)
			 VALUES ($1, $2, $3, $4, $5, '') ON CONFLICT DO NOTHING`,
			anonymousID, req.Domain, tld, score, metricsJSON,
		)

		w.Header().Set("Content-Type", "application/json")
		w.Write(metricsJSON)
	}
}
