package v1

import (
	"encoding/json"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/service"
)

func handleGenerateSuggestions(db *pgxpool.Pool) http.HandlerFunc {
	type request struct {
		Seed     string                     `json:"seed"`
		Criteria service.SuggestionCriteria `json:"criteria"`
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

		if req.Seed == "" {
			writeError(w, http.StatusBadRequest, "seed word is required")
			return
		}

		sugService := service.NewSuggestionService(db)
		result, err := sugService.Generate(r.Context(), userID, req.Seed, req.Criteria)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}

		writeJSON(w, http.StatusOK, result)
	}
}
