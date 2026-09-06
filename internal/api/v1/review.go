package v1

import (
	"encoding/json"
	"net/http"

	"github.com/nekwasar/ceche/internal/appraisal"
)

// HandleReview generates a review prompt for the AI agent
func HandleReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Domain string `json:"domain"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if req.Domain == "" {
			http.Error(w, "Domain is required", http.StatusBadRequest)
			return
		}

		// Run all tools to get results
		orch := appraisal.NewOrchestrator()
		metrics := orch.Run(req.Domain)

		// Generate review prompt
		prompt := appraisal.GenerateReviewPrompt(req.Domain, metrics.Tools)

		// Create review interface
		review := appraisal.ReviewInterfaceFromTools(req.Domain, metrics.Tools)

	 response := map[string]interface{}{
			"domain":  req.Domain,
			"prompt":  prompt,
			"review":  review,
			"results": metrics.Tools,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// HandleApplyReview applies the AI agent's review and returns adjusted price
func HandleApplyReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Domain     string                          `json:"domain"`
			Reviews    map[string]appraisal.ToolReview  `json:"reviews"`
			Adjustments map[string]float64              `json:"adjustments"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if req.Domain == "" {
			http.Error(w, "Domain is required", http.StatusBadRequest)
			return
		}

		// Run all tools to get results
		orch := appraisal.NewOrchestrator()
		metrics := orch.Run(req.Domain)

		// Apply weight adjustments
		adjustedWeights := appraisal.ApplyWeightAdjustments(
			appraisal.DefaultWeights,
			req.Adjustments,
		)

		// Calculate adjusted score
		adjustedScore := appraisal.CalculateWeightedScore(metrics.Tools, adjustedWeights)

		// Calculate adjusted price
		tldMult := 1.0
		if tldResult, ok := metrics.Tools["m2_tld_table"]; ok {
			if tldResult.Findings != nil {
				if score, ok := tldResult.Findings["tld_score"].(float64); ok {
					tldMult = score / 10.0
				}
			}
		}

		adjustedPrice := appraisal.PriceCurve(adjustedScore, tldMult)

		response := map[string]interface{}{
			"domain":           req.Domain,
			"original_score":   metrics.Score,
			"adjusted_score":   adjustedScore,
			"adjusted_price":   adjustedPrice,
			"adjusted_weights": adjustedWeights,
			"reviews":          req.Reviews,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
