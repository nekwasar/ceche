package v1

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

func handleCreateReveal(db *pgxpool.Pool) http.HandlerFunc {
	type request struct {
		DomainHash string `json:"domain_hash"`
		RevealType string `json:"reveal_type"`
		TLDOption  string `json:"tld_option,omitempty"`
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

		if req.DomainHash == "" || req.RevealType == "" {
			writeError(w, http.StatusBadRequest, "domain_hash and reveal_type are required")
			return
		}

		revealService := service.NewRevealService(db)
		var amount float64

		switch req.RevealType {
		case "partial", "full":
			amount = revealService.GetRevealPrice(req.RevealType)
		case "luck":
			validTLDs := map[string]bool{"com": true, "net": true, "io": true, "co": true}
			if req.TLDOption != "" {
				if !validTLDs[req.TLDOption] {
					writeError(w, http.StatusBadRequest, "invalid TLD: must be com, net, io, or co")
					return
				}
				amount = revealService.GetTryYourLuckPrice(req.TLDOption)
			} else {
				amount = revealService.GetTryYourLuckPrice("flat")
			}
		default:
			writeError(w, http.StatusBadRequest, "invalid reveal_type: must be partial, luck, or full")
			return
		}

		if amount == 0 {
			writeError(w, http.StatusBadRequest, "could not determine price")
			return
		}

		lockService := service.NewLockService(db)
		_, err := lockService.AcquireLock(r.Context(), userID, req.DomainHash, nil)
		if err != nil {
			writeError(w, http.StatusConflict, err.Error())
			return
		}

		ref := "pending"
		reveal, err := revealService.CreateReveal(r.Context(), userID, req.DomainHash, req.RevealType, amount, ref)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}

		writeJSON(w, http.StatusCreated, map[string]interface{}{
			"reveal":       reveal,
			"amount":       amount,
			"currency":     "USD",
			"paystack_ref": ref,
		})
	}
}

func handleGetReveal(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		revealID := chi.URLParam(r, "id")
		if revealID == "" {
			revealID = r.URL.Query().Get("id")
		}
		if revealID == "" {
			writeError(w, http.StatusBadRequest, "reveal id is required")
			return
		}

		revealService := service.NewRevealService(db)
		reveal, err := revealService.GetRevealForUser(r.Context(), revealID, userID)
		if err != nil {
			writeError(w, http.StatusNotFound, err.Error())
			return
		}

		writeJSON(w, http.StatusOK, reveal)
	}
}

func handleGetUserReveals(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID, ok := getUserID(w, r)
		if !ok {
			return
		}

		revealService := service.NewRevealService(db)
		reveals, err := revealService.GetUserReveals(r.Context(), userID, 50)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}

		writeJSON(w, http.StatusOK, reveals)
	}
}
