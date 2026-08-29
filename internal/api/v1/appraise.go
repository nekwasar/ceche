package v1

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"regexp"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

var domainRegex = regexp.MustCompile(`^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$`)

func handleAppraise(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

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
				db.QueryRow(r.Context(),
					`SELECT score, metrics FROM appraisals WHERE id = $1`,
					existingID,
				).Scan(&score, &metrics)

				w.Header().Set("Content-Type", "application/json")
				w.Write(metrics)
				return
			}
		}

		score, metrics := service.CalculateScore(req.Domain)

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

		domainHash := sha256.Sum256([]byte(req.Domain))
		db.Exec(r.Context(),
			`INSERT INTO audit_logs (user_id, action, resource, resource_id, ip_address, user_agent)
			 VALUES ($1, 'appraise', 'appraisal', $2, $3, $4)`,
			userID, appraisalID, r.RemoteAddr, r.UserAgent(),
		)

		w.Header().Set("Content-Type", "application/json")
		w.Write(metricsJSON)
	}
}

func handleGetAppraisals(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

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
		userID := r.Context().Value("user_id").(string)
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

		domainHash := sha256.Sum256([]byte(domain))
		_ = domainHash

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

func hashDomain(domain string) string {
	h := sha256.Sum256([]byte(domain))
	return hex.EncodeToString(h[:])
}
