package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"os"
	"time"
)

// M12Authority measures domain authority signals using WhoisXML APIs.
type M12Authority struct{}

func (m *M12Authority) Name() string { return "m12_authority" }

type domainReputationResponse struct {
	Domain           string  `json:"domain"`
	ReputationScore  float64 `json:"reputationScore"`
	ReputationLabel  string  `json:"reputationLabel"`
	RiskScore        float64 `json:"riskScore"`
	RiskLabel        string  `json:"riskLabel"`
	IsActive         bool    `json:"isActive"`
	IsParked         bool    `json:"isParked"`
	IsMalicious      bool    `json:"isMalicious"`
	Categories       []string `json:"categories"`
}

func (m *M12Authority) Execute(domain string, ctx *ToolContext) ToolResult {
	apiKey := os.Getenv("WHOISXML_API_KEY")
	if apiKey == "" {
		return m.executeFallback(domain, ctx)
	}

	// Query WhoisXML Domain Reputation API
	reputation := queryDomainReputation(domain, apiKey)

	// Query DNS history for additional signals
	dnsHistory := queryDNSHistoryForAuthority(domain, apiKey)

	// Calculate authority score
	authority := calculateAuthority(reputation, dnsHistory)

	// Determine parked status
	isParked := false
	if reputation != nil {
		isParked = reputation.IsParked
	}

	// Calculate multiplier
	mult := 1.0
	if isParked {
		mult = 0.5
	} else if authority >= 0.90 {
		mult = 48.0
	} else if authority >= 0.80 {
		mult = 15.0
	} else if authority >= 0.70 {
		mult = 8.0
	} else if authority >= 0.60 {
		mult = 5.0
	} else if authority >= 0.45 {
		mult = 3.0
	} else if authority >= 0.20 {
		mult = 1.2
	}

	// Cap at 3.0 if canonical brand (from M11)
	if ctx.Results != nil {
		if m11, ok := ctx.Results["m11_dns_history"]; ok {
			if findings, ok := m11.Findings["registrant_org"].(string); ok && findings != "" {
				if mult > 3.0 {
					mult = 3.0
				}
			}
		}
	}

	findings := map[string]interface{}{
		"authority":     authority,
		"is_parked":     isParked,
		"multiplier":    mult,
		"sources":       []string{},
	}

	if reputation != nil {
		findings["reputation_score"] = reputation.ReputationScore
		findings["reputation_label"] = reputation.ReputationLabel
		findings["risk_score"] = reputation.RiskScore
		findings["is_malicious"] = reputation.IsMalicious
		findings["categories"] = reputation.Categories
		if src, ok := findings["sources"].([]string); ok {
			findings["sources"] = append(src, "domain_reputation")
		}
	}

	if dnsHistory != nil {
		findings["dns_changes"] = dnsHistory.Changes
		findings["dns_years"] = dnsHistory.Years
		if src, ok := findings["sources"].([]string); ok {
			findings["sources"] = append(src, "dns_history")
		}
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: &mult,
		Confidence: 0.8,
		Findings:   findings,
		Explanation: fmt.Sprintf("Authority: %.2f (parked: %v, multiplier: %.1fx)", authority, isParked, mult),
	}
}

func (m *M12Authority) executeFallback(domain string, ctx *ToolContext) ToolResult {
	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(1.0),
		Confidence: 0.3,
		Findings: map[string]interface{}{
			"authority":   0.0,
			"is_parked":   false,
			"multiplier":  1.0,
			"sources":     []string{},
			"note":        "Authority check fallback — API key not configured",
		},
		Explanation: "Authority fallback — WHOISXML_API_KEY not configured",
	}
}

func queryDomainReputation(domain, apiKey string) *domainReputationResponse {
	url := fmt.Sprintf("https://domain-reputation.whoisxmlapi.com/api/v2?apiKey=%s&domainName=%s", apiKey, domain)
	
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil
	}

	if resp.StatusCode != 200 {
		return nil
	}

	var result domainReputationResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil
	}

	return &result
}

func queryDNSHistoryForAuthority(domain, apiKey string) *dnsHistoryData {
	url := fmt.Sprintf("https://dns-history.whoisxmlapi.com/api/v1?apiKey=%s&domainName=%s&mode=purchase", apiKey, domain)
	
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil
	}

	if resp.StatusCode != 200 {
		return nil
	}

	var result struct {
		RecordsCount int `json:"recordsCount"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil
	}

	return &dnsHistoryData{
		Records: result.RecordsCount,
		Years:   estimateYears(result.RecordsCount),
	}
}

type dnsHistoryData struct {
	Records int
	Changes int
	Years   float64
}

func estimateYears(records int) float64 {
	// Rough estimate: more records = longer history
	if records > 50 {
		return 10.0
	} else if records > 30 {
		return 5.0
	} else if records > 10 {
		return 2.0
	}
	return 1.0
}

func calculateAuthority(reputation *domainReputationResponse, dnsHistory *dnsHistoryData) float64 {
	authority := 0.0
	sourcesActive := 0

	// Reputation signal
	if reputation != nil {
		sourcesActive++
		// Normalize reputation score to 0-1
		repScore := reputation.ReputationScore / 100.0
		authority += repScore * 0.6
	}

	// DNS history signal
	if dnsHistory != nil && dnsHistory.Records > 0 {
		sourcesActive++
		// More records = more established
		historyScore := float64(dnsHistory.Records) / 100.0
		if historyScore > 1.0 {
			historyScore = 1.0
		}
		authority += historyScore * 0.4
	}

	// Normalize based on active sources
	if sourcesActive > 0 {
		authority = authority / float64(sourcesActive)
	}

	return math.Min(1.0, authority)
}
