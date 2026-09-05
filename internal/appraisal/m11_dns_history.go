package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// M11DNSHistory queries WhoisXML API for domain registration history.
type M11DNSHistory struct{}

func (m *M11DNSHistory) Name() string { return "m11_dns_history" }

type whoisHistoryRecord struct {
	DomainName         string `json:"domainName"`
	DomainType         string `json:"domainType"`
	CreatedDateISO8601 string `json:"createdDateISO8601"`
	UpdatedDateISO8601 string `json:"updatedDateISO8601"`
	ExpiresDateISO8601 string `json:"expiresDateISO8601"`
	RegistrarName      string `json:"registrarName"`
	NameServers        []string `json:"nameServers"`
	Status             []string `json:"status"`
	RegistrantContact  *struct {
		Name         string `json:"name"`
		Organization string `json:"organization"`
		Street       string `json:"street"`
		City         string `json:"city"`
		State        string `json:"state"`
		Country      string `json:"country"`
	} `json:"registrantContact"`
}

type whoisHistoryResponse struct {
	RecordsCount int                   `json:"recordsCount"`
	Records      []whoisHistoryRecord  `json:"records"`
}

func (m *M11DNSHistory) Execute(domain string, ctx *ToolContext) ToolResult {
	apiKey := os.Getenv("WHOISXML_API_KEY")
	if apiKey == "" {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: "WHOISXML_API_KEY not configured",
		}
	}

	// Call WhoisXML API
	url := fmt.Sprintf("https://whois-history.whoisxmlapi.com/api/v1?apiKey=%s&domainName=%s&mode=purchase", apiKey, domain)
	
	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("API request failed: %v", err),
		}
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

	if resp.StatusCode != 200 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("API returned status %d: %s", resp.StatusCode, string(body[:min(len(body), 200)])),
		}
	}

	var history whoisHistoryResponse
	if err := json.Unmarshal(body, &history); err != nil {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("Failed to parse response: %v", err),
		}
	}

	// Analyze the history
	analysis := analyzeHistory(history)

	// Calculate multiplier based on analysis
	mult := calculateDNSHistoryMultiplier(analysis)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: &mult,
		Confidence: 0.9,
		Findings: map[string]interface{}{
			"total_records":   history.RecordsCount,
			"first_seen":      analysis.FirstSeen,
			"last_seen":       analysis.LastSeen,
			"drops":           analysis.Drops,
			"registrar_changes": analysis.RegistrarChanges,
			"years_active":    analysis.YearsActive,
			"current_registrar": analysis.CurrentRegistrar,
			"registrant_org":   analysis.RegistrantOrg,
			"registrant_country": analysis.RegistrantCountry,
			"status":          analysis.CurrentStatus,
			"multiplier":      mult,
			"findings":        analysis.Findings,
		},
		Explanation: fmt.Sprintf("DNS History: %d records, %d drops, %d registrar changes, active since %s (%.1f years)",
			history.RecordsCount, analysis.Drops, analysis.RegistrarChanges, analysis.FirstSeen, analysis.YearsActive),
	}
}

type dnsHistoryAnalysis struct {
	FirstSeen        string
	LastSeen         string
	Drops            int
	RegistrarChanges int
	YearsActive      float64
	CurrentRegistrar string
	RegistrantOrg    string
	RegistrantCountry string
	CurrentStatus    string
	Findings         []string
}

func analyzeHistory(resp whoisHistoryResponse) dnsHistoryAnalysis {
	analysis := dnsHistoryAnalysis{
		Findings: []string{},
	}

	if len(resp.Records) == 0 {
		analysis.Findings = append(analysis.Findings, "No history records found")
		return analysis
	}

	// Find first and last seen
	firstSeen := ""
	lastSeen := ""
	prevRegistrar := ""
	drops := 0
	registrarChanges := 0

	for _, r := range resp.Records {
		created := r.CreatedDateISO8601
		if created != "" && len(created) >= 10 && (firstSeen == "" || created[:10] < firstSeen) {
			firstSeen = created[:10]
		}
		if created != "" && len(created) >= 10 && (lastSeen == "" || created[:10] > lastSeen) {
			lastSeen = created[:10]
		}

		// Count drops
		if r.DomainType == "dropped" {
			drops++
		}

		// Count registrar changes
		if prevRegistrar != "" && r.RegistrarName != "" && prevRegistrar != r.RegistrarName {
			registrarChanges++
		}
		if r.RegistrarName != "" {
			prevRegistrar = r.RegistrarName
		}
	}

	// Get current record
	lastRecord := resp.Records[0]
	analysis.FirstSeen = firstSeen
	analysis.LastSeen = lastSeen
	analysis.Drops = drops
	analysis.RegistrarChanges = registrarChanges
	analysis.CurrentRegistrar = lastRecord.RegistrarName

	if lastRecord.RegistrantContact != nil {
		analysis.RegistrantOrg = lastRecord.RegistrantContact.Organization
		analysis.RegistrantCountry = lastRecord.RegistrantContact.Country
	}
	if len(lastRecord.Status) > 0 {
		analysis.CurrentStatus = lastRecord.Status[0]
	}

	// Calculate years active
	if firstSeen != "" {
		t, err := time.Parse("2006-01-02", firstSeen)
		if err == nil {
			analysis.YearsActive = time.Since(t).Hours() / (24 * 365.25)
		}
	}

	// Generate findings
	if drops > 0 {
		analysis.Findings = append(analysis.Findings, fmt.Sprintf("Domain has been dropped %d time(s)", drops))
	}
	if registrarChanges > 2 {
		analysis.Findings = append(analysis.Findings, fmt.Sprintf("High registrar turnover: %d changes", registrarChanges))
	}
	if analysis.YearsActive > 10 {
		analysis.Findings = append(analysis.Findings, fmt.Sprintf("Domain active for %.0f+ years", analysis.YearsActive))
	}
	if analysis.RegistrantOrg != "" {
		analysis.Findings = append(analysis.Findings, fmt.Sprintf("Registrant organization: %s", analysis.RegistrantOrg))
	}

	return analysis
}

func calculateDNSHistoryMultiplier(analysis dnsHistoryAnalysis) float64 {
	mult := 1.0

	// Bonus for long history
	if analysis.YearsActive >= 10 {
		mult *= 2.0
	} else if analysis.YearsActive >= 5 {
		mult *= 1.5
	} else if analysis.YearsActive >= 2 {
		mult *= 1.2
	}

	// Penalty for drops
	if analysis.Drops >= 3 {
		mult *= 0.5
	} else if analysis.Drops >= 2 {
		mult *= 0.7
	} else if analysis.Drops >= 1 {
		mult *= 0.9
	}

	// Penalty for high registrar turnover
	if analysis.RegistrarChanges >= 5 {
		mult *= 0.6
	} else if analysis.RegistrarChanges >= 3 {
		mult *= 0.8
	}

	// Bonus for established registrars
	established := map[string]bool{
		"GoDaddy.com, LLC": true,
		"GoDaddy.com, Inc.": true,
		"DREAMHOST": true,
		"Namecheap, Inc.": true,
	}
	if established[analysis.CurrentRegistrar] {
		mult *= 1.1
	}

	if mult < 0.1 {
		mult = 0.1
	}
	if mult > 10.0 {
		mult = 10.0
	}

	return mult
}
