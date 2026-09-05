package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"time"
)

// M1RDAP looks up domain registration data via RDAP.
type M1RDAP struct{}

func (m *M1RDAP) Name() string { return "m1_rdap" }

type rdapResponse struct {
	Handle             string   `json:"handle"`
	ObjectClassName    string   `json:"objectClassName"`
	Name               string   `json:"ldhName"`
	Events             []struct {
		EventAction string `json:"eventAction"`
		EventDate   string `json:"eventDate"`
	} `json:"events"`
	Status             []string `json:"status"`
	Nameservers        []struct {
		LDHName string `json:"ldhName"`
	} `json:"nameservers"`
	Networks            []interface{} `json:"networks"`
	PublicIDs           []interface{} `json:"publicIds"`
	Links               interface{}   `json:"links"`
	Notices             []interface{} `json:"notices"`
	Remarks             []interface{} `json:"remarks"`
	Entities            []interface{} `json:"entities"`
}

func (m *M1RDAP) Execute(domain string, ctx *ToolContext) ToolResult {
	// Query rdap.org
	url := fmt.Sprintf("https://rdap.org/domain/%s", domain)
	
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		// Try fallback: domain might not be registered
		return m.handleUnregistered(domain)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("Failed to read response: %v", err),
		}
	}

	if resp.StatusCode == 404 {
		return m.handleUnregistered(domain)
	}

	if resp.StatusCode != 200 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("RDAP returned status %d", resp.StatusCode),
		}
	}

	var rdap rdapResponse
	if err := json.Unmarshal(body, &rdap); err != nil {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("Failed to parse RDAP response: %v", err),
		}
	}

	// Extract key dates
	creationDate := ""
	expiryDate := ""
	lastChanged := ""

	for _, event := range rdap.Events {
		switch event.EventAction {
		case "registration":
			if len(event.EventDate) >= 10 {
				creationDate = event.EventDate[:10]
			}
		case "expiration":
			if len(event.EventDate) >= 10 {
				expiryDate = event.EventDate[:10]
			}
		case "last changed":
			if len(event.EventDate) >= 10 {
				lastChanged = event.EventDate[:10]
			}
		}
	}

	// Calculate age
	ageYears := 0.0
	if creationDate != "" {
		t, err := time.Parse("2006-01-02", creationDate)
		if err == nil {
			ageYears = time.Since(t).Hours() / (24 * 365.25)
		}
	}

	// Age-based multiplier
	mult := 1.0
	switch {
	case ageYears >= 20:
		mult = 3.0
	case ageYears >= 10:
		mult = 2.0
	case ageYears >= 5:
		mult = 1.5
	case ageYears >= 1:
		mult = 1.2
	}

	// Get nameservers
	nameservers := make([]string, 0)
	for _, ns := range rdap.Nameservers {
		nameservers = append(nameservers, ns.LDHName)
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: &mult,
		Confidence: 0.9,
		Findings: map[string]interface{}{
			"registered":   true,
			"domain":       domain,
			"creation_date": creationDate,
			"expiry_date":  expiryDate,
			"last_changed": lastChanged,
			"age_years":    math.Round(ageYears*10) / 10,
			"nameservers":  nameservers,
			"status":       rdap.Status,
			"multiplier":   mult,
		},
		Explanation: fmt.Sprintf("Domain %s registered since %s (%.1f years old), expires %s — multiplier: %.1fx",
			domain, creationDate, ageYears, expiryDate, mult),
	}
}

func (m *M1RDAP) handleUnregistered(domain string) ToolResult {
	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(1.0),
		Confidence: 0.9,
		Findings: map[string]interface{}{
			"registered": false,
			"domain":     domain,
			"note":       "Domain not found in RDAP — may be available for registration",
		},
		Explanation: fmt.Sprintf("Domain %s not found in RDAP — may be available for registration", domain),
	}
}
