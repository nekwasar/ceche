package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// M10CrossTLD checks if the SLD is registered in other popular TLDs.
// Real RDAP lookups across .com, .net, .co, .io to assess cross-TLD value.
type M10CrossTLD struct{}

func (m *M10CrossTLD) Name() string { return "m10_cross" }

// targetTLDs defines the TLDs to check for cross-registration
var targetTLDs = []string{"com", "net", "co", "io"}

// crossTLDResult holds the result of a single TLD check
type crossTLDResult struct {
	TLD        string
	Registered bool
	Age        float64
	Status     []string
}

func (m *M10CrossTLD) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD
	currentTLD := ctx.TLD

	// Check each target TLD via RDAP
	results := make([]crossTLDResult, 0, len(targetTLDs))
	registeredCount := 0

	for _, tld := range targetTLDs {
		checkDomain := sld + "." + tld
		result := checkTLDRegistration(checkDomain, tld)
		results = append(results, result)
		if result.Registered {
			registeredCount++
		}
	}

	// Calculate multiplier based on cross-TLD registration pattern
	mult, confidence := calculateCrossTLDMultiplier(results, registeredCount, currentTLD)

	// Build findings
	tldStatus := make(map[string]interface{})
	for _, r := range results {
		tldStatus[r.TLD] = map[string]interface{}{
			"registered": r.Registered,
			"age_years":  r.Age,
			"status":     r.Status,
		}
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: confidence,
		Findings: map[string]interface{}{
			"sld":              sld,
			"current_tld":      currentTLD,
			"registered_count": registeredCount,
			"total_checked":    len(targetTLDs),
			"tld_status":       tldStatus,
			"multiplier":       mult,
		},
		Explanation: fmt.Sprintf("Cross-TLD: %s registered in %d/%d checked TLDs — multiplier: %.1fx",
			sld, registeredCount, len(targetTLDs), mult),
	}
}

// checkTLDRegistration queries RDAP for a specific domain+TLD
func checkTLDRegistration(domain, tld string) crossTLDResult {
	result := crossTLDResult{
		TLD:        tld,
		Registered: false,
		Age:        0,
		Status:     []string{},
	}

	url := fmt.Sprintf("https://rdap.org/domain/%s", domain)
	client := &http.Client{
		Timeout: 8 * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return nil // follow redirects
		},
	}

	resp, err := client.Get(url)
	if err != nil {
		return result
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		return result
	}
	if resp.StatusCode != 200 {
		return result
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return result
	}

	var rdap struct {
		Status []string `json:"status"`
		Events []struct {
			EventAction string `json:"eventAction"`
			EventDate   string `json:"eventDate"`
		} `json:"events"`
	}

	if err := json.Unmarshal(body, &rdap); err != nil {
		return result
	}

	result.Registered = true
	result.Status = rdap.Status

	// Calculate age from registration date
	for _, event := range rdap.Events {
		if event.EventAction == "registration" && len(event.EventDate) >= 10 {
			if t, err := time.Parse("2006-01-02", event.EventDate[:10]); err == nil {
				result.Age = time.Since(t).Hours() / (24 * 365.25)
			}
		}
	}

	return result
}

// calculateCrossTLDMultiplier computes the multiplier from cross-TLD analysis
func calculateCrossTLDMultiplier(results []crossTLDResult, registeredCount int, currentTLD string) (float64, float64) {
	mult := 1.0
	confidence := 0.6

	// Factor 1: How many TLDs is the SLD registered in?
	switch registeredCount {
	case 4:
		// Registered in ALL checked TLDs — very strong brand signal
		mult = 5.0
		confidence += 0.2
	case 3:
		mult = 3.5
		confidence += 0.15
	case 2:
		mult = 2.0
		confidence += 0.1
	case 1:
		// Only registered in current TLD — normal
		mult = 1.0
	case 0:
		// Not registered anywhere (shouldn't happen if current domain exists)
		mult = 0.5
		confidence -= 0.1
	}

	// Factor 2: Is the current TLD .com?
	if currentTLD == "com" {
		mult *= 1.2
		confidence += 0.05
	}

	// Factor 3: Are there older registrations in other TLDs?
	maxAge := 0.0
	for _, r := range results {
		if r.Registered && r.Age > maxAge {
			maxAge = r.Age
		}
	}
	if maxAge >= 10 {
		mult *= 1.3
		confidence += 0.05
	} else if maxAge >= 5 {
		mult *= 1.1
	}

	// Factor 4: Are there active status codes across TLDs?
	activeCount := 0
	for _, r := range results {
		if r.Registered {
			for _, s := range r.Status {
				if s == "clientTransferProhibited" || s == "ok" {
					activeCount++
					break
				}
			}
		}
	}
	if activeCount >= 3 {
		mult *= 1.2
		confidence += 0.05
	}

	// Cap confidence
	if confidence > 0.95 {
		confidence = 0.95
	}
	if confidence < 0.1 {
		confidence = 0.1
	}

	return mult, confidence
}
