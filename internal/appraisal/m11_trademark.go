package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

// M11Trademark checks for trademark conflicts using Signa.so API.
type M11Trademark struct{}

func (m *M11Trademark) Name() string { return "m11_trademark" }

// signaResponse holds the Signa.so API response
type signaResponse struct {
	Object  string `json:"object"`
	Data    []struct {
		ID             string `json:"id"`
		MarkText       string `json:"mark_text"`
		RelevanceScore *int   `json:"relevance_score"`
		Status         struct {
			Primary string `json:"primary"`
			Stage   string `json:"stage"`
		} `json:"status"`
		OfficeCode     string `json:"office_code"`
		FilingDate     string `json:"filing_date"`
		Classifications []struct {
			NiceClass         int    `json:"nice_class"`
			GoodsServicesText string `json:"goods_services_text"`
		} `json:"classifications"`
		Owners []struct {
			ID          string `json:"id"`
			Name        string `json:"name"`
			CountryCode string `json:"country_code"`
		} `json:"owners"`
	} `json:"data"`
	HasMore   bool `json:"has_more"`
	Pagination struct {
		TotalCount int    `json:"total_count"`
		Cursor     string `json:"cursor"`
	} `json:"pagination"`
}

func (m *M11Trademark) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD
	apiKey := os.Getenv("SIGNA_SO_API_KEY")

	if apiKey == "" {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "skipped",
			Multiplier: nil,
			Confidence: 0.0,
			Findings: map[string]interface{}{
				"domain": domain,
				"reason": "SIGNA_SO_API_KEY not configured",
			},
			Explanation: "Trademark check skipped — SIGNA_SO_API_KEY not configured",
		}
	}

	// Search for exact match
	exactResults := searchTrademarks(sld, "exact", apiKey)

	// Search for phonetic match (sound-alikes)
	phoneticResults := searchTrademarks(sld, "phonetic", apiKey)

	// Search for fuzzy match (typos)
	fuzzyResults := searchTrademarks(sld, "fuzzy", apiKey)

	// Combine and deduplicate results
	allResults := combineTrademarkResults(exactResults, phoneticResults, fuzzyResults)

	// Analyze trademark conflict risk
	conflictRisk := analyzeTrademarkRisk(sld, allResults)

	// Calculate multiplier
	mult, confidence := calculateTrademarkMultiplier(allResults)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: confidence,
		Findings: map[string]interface{}{
			"domain":              domain,
			"sld":                 sld,
			"total_matches":       allResults.TotalMatches,
			"exact_matches":       allResults.ExactMatches,
			"phonetic_matches":    allResults.PhoneticMatches,
			"fuzzy_matches":       allResults.FuzzyMatches,
			"active_trademarks":   allResults.ActiveTrademarks,
			"pending_trademarks":  allResults.PendingTrademarks,
			"conflict_risk":       conflictRisk,
			"top_matches":         allResults.TopMatches,
			"offices_found":       allResults.OfficesFound,
			"nice_classes":        allResults.NiceClasses,
			"multiplier":          mult,
		},
		Explanation: fmt.Sprintf("Trademark: %d matches (%d exact, %d phonetic, %d fuzzy), risk=%s — multiplier: %.1fx",
			allResults.TotalMatches, allResults.ExactMatches, allResults.PhoneticMatches,
			allResults.FuzzyMatches, conflictRisk, mult),
	}
}

// searchTrademarks queries Signa.so API for trademarks
func searchTrademarks(query, strategy, apiKey string) *signaResponse {
	url := fmt.Sprintf("https://api.signa.so/v1/trademarks?q=%s&strategies=%s&limit=20", query, strategy)

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := client.Do(req)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil
	}

	var result signaResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil
	}

	return &result
}

// trademarkAnalysis holds aggregated trademark analysis
type trademarkAnalysis struct {
	TotalMatches      int
	ExactMatches      int
	PhoneticMatches   int
	FuzzyMatches      int
	ActiveTrademarks  int
	PendingTrademarks int
	ConflictRisk      string
	TopMatches        []map[string]interface{}
	OfficesFound      []string
	NiceClasses       []int
}

// combineTrademarkResults deduplicates and combines results from different strategies
func combineTrademarkResults(exact, phonetic, fuzzy *signaResponse) *trademarkAnalysis {
	analysis := &trademarkAnalysis{
		TopMatches:   []map[string]interface{}{},
		OfficesFound: []string{},
		NiceClasses:  []int{},
	}

	seenIDs := make(map[string]bool)
	officeSet := make(map[string]bool)
	classSet := make(map[int]bool)

	// Process exact matches
	if exact != nil {
		analysis.ExactMatches = len(exact.Data)
		for _, mark := range exact.Data {
			if !seenIDs[mark.ID] {
				seenIDs[mark.ID] = true
				processMark(mark, analysis, officeSet, classSet)
			}
		}
	}

	// Process phonetic matches
	if phonetic != nil {
		analysis.PhoneticMatches = len(phonetic.Data)
		for _, mark := range phonetic.Data {
			if !seenIDs[mark.ID] {
				seenIDs[mark.ID] = true
				processMark(mark, analysis, officeSet, classSet)
			}
		}
	}

	// Process fuzzy matches
	if fuzzy != nil {
		analysis.FuzzyMatches = len(fuzzy.Data)
		for _, mark := range fuzzy.Data {
			if !seenIDs[mark.ID] {
				seenIDs[mark.ID] = true
				processMark(mark, analysis, officeSet, classSet)
			}
		}
	}

	analysis.TotalMatches = len(seenIDs)

	// Convert sets to slices
	for office := range officeSet {
		analysis.OfficesFound = append(analysis.OfficesFound, office)
	}
	for class := range classSet {
		analysis.NiceClasses = append(analysis.NiceClasses, class)
	}

	return analysis
}

// processMark adds a trademark mark to the analysis
func processMark(mark struct {
	ID             string `json:"id"`
	MarkText       string `json:"mark_text"`
	RelevanceScore *int   `json:"relevance_score"`
	Status         struct {
		Primary string `json:"primary"`
		Stage   string `json:"stage"`
	} `json:"status"`
	OfficeCode     string `json:"office_code"`
	FilingDate     string `json:"filing_date"`
	Classifications []struct {
		NiceClass         int    `json:"nice_class"`
		GoodsServicesText string `json:"goods_services_text"`
	} `json:"classifications"`
	Owners []struct {
		ID          string `json:"id"`
		Name        string `json:"name"`
		CountryCode string `json:"country_code"`
	} `json:"owners"`
}, analysis *trademarkAnalysis, officeSet map[string]bool, classSet map[int]bool) {

	// Count by status
	switch mark.Status.Primary {
	case "active":
		analysis.ActiveTrademarks++
	case "pending":
		analysis.PendingTrademarks++
	}

	// Track offices
	if mark.OfficeCode != "" {
		officeSet[mark.OfficeCode] = true
	}

	// Track Nice classes
	for _, class := range mark.Classifications {
		classSet[class.NiceClass] = true
	}

	// Add to top matches (up to 5)
	if len(analysis.TopMatches) < 5 {
		ownerNames := make([]string, 0)
		for _, owner := range mark.Owners {
			ownerNames = append(ownerNames, owner.Name)
		}

		match := map[string]interface{}{
			"mark_text":    mark.MarkText,
			"status":       mark.Status.Primary,
			"stage":        mark.Status.Stage,
			"office":       mark.OfficeCode,
			"filing_date":  mark.FilingDate,
			"owners":       ownerNames,
			"nice_classes": len(mark.Classifications),
		}
		if mark.RelevanceScore != nil {
			match["relevance_score"] = *mark.RelevanceScore
		}
		analysis.TopMatches = append(analysis.TopMatches, match)
	}
}

// analyzeTrademarkRisk determines the conflict risk level
func analyzeTrademarkRisk(sld string, analysis *trademarkAnalysis) string {
	sldLower := strings.ToLower(sld)

	// Check for exact text matches
	for _, match := range analysis.TopMatches {
		if markText, ok := match["mark_text"].(string); ok {
			if strings.ToLower(markText) == sldLower {
				analysis.ConflictRisk = "critical"
				return analysis.ConflictRisk
			}
		}
	}

	// Risk assessment based on counts
	switch {
	case analysis.ExactMatches > 0 && analysis.ActiveTrademarks > 0:
		analysis.ConflictRisk = "high"
	case analysis.ActiveTrademarks >= 3:
		analysis.ConflictRisk = "high"
	case analysis.PendingTrademarks > 0:
		analysis.ConflictRisk = "medium"
	case analysis.PhoneticMatches > 0:
		analysis.ConflictRisk = "medium"
	case analysis.FuzzyMatches > 0:
		analysis.ConflictRisk = "low"
	case analysis.TotalMatches == 0:
		analysis.ConflictRisk = "none"
	default:
		analysis.ConflictRisk = "low"
	}

	return analysis.ConflictRisk
}

// calculateTrademarkMultiplier computes the multiplier from trademark analysis
func calculateTrademarkMultiplier(analysis *trademarkAnalysis) (float64, float64) {
	mult := 1.0
	confidence := 0.7

	switch analysis.ConflictRisk {
	case "critical":
		// Exact match found — high conflict risk, significant value reduction
		mult = 0.1
		confidence += 0.1
	case "high":
		// Active trademarks with similar names
		mult = 0.3
		confidence += 0.05
	case "medium":
		// Pending or phonetic matches
		mult = 0.7
	case "low":
		// Only fuzzy matches
		mult = 0.9
	case "none":
		// No matches found — clean
		mult = 1.2
		confidence += 0.1
	}

	// Bonus for multi-office registrations (stronger brand)
	if len(analysis.OfficesFound) >= 3 {
		mult *= 0.8
	}

	// Bonus for multiple Nice classes (broader protection)
	if len(analysis.NiceClasses) >= 5 {
		mult *= 0.9
	}

	if confidence > 0.95 {
		confidence = 0.95
	}
	if confidence < 0.1 {
		confidence = 0.1
	}

	return mult, confidence
}
