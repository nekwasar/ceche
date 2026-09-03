package v1

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

func handleGetIntelligence(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		domain := chi.URLParam(r, "domain")
		domain = strings.ToLower(strings.TrimSpace(domain))

		if domain == "" || !domainRegex.MatchString(domain) {
			writeError(w, http.StatusBadRequest, "invalid domain format")
			return
		}

		intelService := service.NewIntelligenceService(db)
		profile, err := intelService.GetProfile(r.Context(), domain)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to generate intelligence profile")
			return
		}

		writeJSON(w, http.StatusOK, profile)
	}
}

func handleGetIntelligenceSummary(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		domain := chi.URLParam(r, "domain")
		domain = strings.ToLower(strings.TrimSpace(domain))

		if domain == "" || !domainRegex.MatchString(domain) {
			writeError(w, http.StatusBadRequest, "invalid domain format")
			return
		}

		intelService := service.NewIntelligenceService(db)
		summary, err := intelService.GetSummary(r.Context(), domain)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to generate intelligence summary")
			return
		}

		writeJSON(w, http.StatusOK, summary)
	}
}
