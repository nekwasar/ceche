package v1

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

func getUserID(w http.ResponseWriter, r *http.Request) (string, bool) {
	userID, ok := r.Context().Value("user_id").(string)
	if !ok || userID == "" {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return "", false
	}
	return userID, true
}

func handleAcquireLock(db *pgxpool.Pool) http.HandlerFunc {
	type request struct {
		DomainHash string  `json:"domain_hash"`
		ListingID  *string `json:"listing_id,omitempty"`
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

		if req.DomainHash == "" {
			writeError(w, http.StatusBadRequest, "domain_hash is required")
			return
		}

		lockService := service.NewLockService(db)
		lock, err := lockService.AcquireLock(r.Context(), userID, req.DomainHash, req.ListingID)
		if err != nil {
			writeError(w, http.StatusConflict, err.Error())
			return
		}

		writeJSON(w, http.StatusCreated, lock)
	}
}

func handleReleaseLock(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}
		lockID := chi.URLParam(r, "id")

		lockService := service.NewLockService(db)
		if err := lockService.ReleaseLock(r.Context(), lockID, userID); err != nil {
			writeError(w, http.StatusNotFound, err.Error())
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{"status": "released"})
	}
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
