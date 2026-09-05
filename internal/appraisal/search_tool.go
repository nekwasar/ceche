package appraisal

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// SearchTool provides domain search capabilities for AI agents.
// This replaces M7/M9 Search API with a tool-based approach.
type SearchTool struct{}

func (m *SearchTool) Name() string { return "search_domain" }

type searchResult struct {
	Domain      string   `json:"domain"`
	Available   bool     `json:"available"`
 Registrar   string   `json:"registrar,omitempty"`
	ExpiryDate  string   `json:"expiry_date,omitempty"`
	Nameservers []string `json:"nameservers,omitempty"`
	Status      []string `json:"status,omitempty"`
}

func (m *SearchTool) Execute(domain string, ctx *ToolContext) ToolResult {
	// Query rdap.org for domain availability
	url := fmt.Sprintf("https://rdap.org/domain/%s", domain)
	
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	
	available := true
	registrar := ""
	expiryDate := ""
	nameservers := make([]string, 0)
	status := make([]string, 0)

	if err == nil {
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err == nil && resp.StatusCode == 200 {
			var rdap rdapResponse
			if json.Unmarshal(body, &rdap) == nil {
				available = false
				registrar = rdap.Name
				status = rdap.Status
				for _, ns := range rdap.Nameservers {
					nameservers = append(nameservers, ns.LDHName)
				}
				for _, event := range rdap.Events {
					if event.EventAction == "expiration" && len(event.EventDate) >= 10 {
						expiryDate = event.EventDate[:10]
					}
				}
			}
		}
	}

	return ToolResult{
		Tool:   m.Name(),
		Domain: domain,
		Status: "success",
		Findings: map[string]interface{}{
			"domain":      domain,
			"available":   available,
			"registrar":   registrar,
			"expiry_date": expiryDate,
			"nameservers": nameservers,
			"status":      status,
		},
		Explanation: fmt.Sprintf("Domain %s: %s", domain, map[bool]string{true: "available", false: "registered"}[available]),
	}
}
