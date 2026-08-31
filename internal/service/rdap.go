package service

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

type RDAPClient struct {
	client  *http.Client
	cache   map[string]*RDAPResult
	cacheTTL time.Duration
}

type RDAPResult struct {
	Domain      string    `json:"domain"`
	Available   bool      `json:"available"`
	Status      []string  `json:"status"`
	Registrar   string    `json:"registrar"`
	Expiry      string    `json:"expiry"`
	Nameservers []string  `json:"nameservers"`
	FetchedAt   time.Time `json:"fetched_at"`
}

type rdapResponse struct {
	Status  []string      `json:"status"`
	Events  []rdapEvent   `json:"events"`
	Entities []rdapEntity `json:"entities"`
	Nameservers []rdapNameserver `json:"nameservers"`
}

type rdapEvent struct {
	EventAction string `json:"eventAction"`
	EventDate   string `json:"eventDate"`
}

type rdapEntity struct {
	Roles  []string         `json:"roles"`
	Vcard  [][]interface{}  `json:"vcard"`
}

type rdapNameserver struct {
	LDHName string `json:"ldhName"`
}

func NewRDAPClient() *RDAPClient {
	return &RDAPClient{
		client: &http.Client{
			Timeout: 5 * time.Second,
		},
		cache:    make(map[string]*RDAPResult),
		cacheTTL: 1 * time.Hour,
	}
}

func (c *RDAPClient) Check(ctx context.Context, domain string) (*RDAPResult, error) {
	if cached, ok := c.cache[domain]; ok {
		if time.Since(cached.FetchedAt) < c.cacheTTL {
			return cached, nil
		}
		delete(c.cache, domain)
	}

	tld := extractTLD(domain)
	if tld == "" {
		return nil, fmt.Errorf("invalid domain: no TLD found")
	}

	baseURL := rdapBaseURL(tld)
	url := fmt.Sprintf("%s/domain/%s", baseURL, domain)

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create RDAP request: %w", err)
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("RDAP request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		result := &RDAPResult{
			Domain:    domain,
			Available: true,
			FetchedAt: time.Now(),
		}
		c.cache[domain] = result
		return result, nil
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("RDAP returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read RDAP response: %w", err)
	}

	var rdapResp rdapResponse
	if err := json.Unmarshal(body, &rdapResp); err != nil {
		return nil, fmt.Errorf("failed to parse RDAP response: %w", err)
	}

	result := &RDAPResult{
		Domain:    domain,
		Available: false,
		Status:    rdapResp.Status,
		FetchedAt: time.Now(),
	}

	for _, event := range rdapResp.Events {
		if event.EventAction == "expiration" {
			result.Expiry = event.EventDate
		}
	}

	for _, entity := range rdapResp.Entities {
		for _, role := range entity.Roles {
			if role == "registrar" {
				result.Registrar = extractEntityName(entity.Vcard)
			}
		}
	}

	for _, ns := range rdapResp.Nameservers {
		result.Nameservers = append(result.Nameservers, ns.LDHName)
	}

	c.cache[domain] = result
	return result, nil
}

func extractTLD(domain string) string {
	parts := strings.Split(domain, ".")
	if len(parts) < 2 {
		return ""
	}
	return parts[len(parts)-1]
}

func rdapBaseURL(tld string) string {
	switch tld {
	case "com":
		return "https://rdap.verisign.com/com/v1"
	case "net":
		return "https://rdap.verisign.com/net/v1"
	case "org":
		return "https://rdap.org"
	case "io":
		return "https://rdap.nic.io"
	case "co":
		return "https://rdap.nic.co"
	default:
		return "https://rdap.org"
	}
}

func extractEntityName(vcard [][]interface{}) string {
	for _, field := range vcard {
		if len(field) >= 3 {
			if label, ok := field[0].(string); ok && label == "fn" {
				if name, ok := field[3].(string); ok {
					return name
				}
			}
		}
	}
	return ""
}

var globalRDAPClient *RDAPClient

func InitRDAP() {
	globalRDAPClient = NewRDAPClient()
}

func getRDAPClient() *RDAPClient {
	return globalRDAPClient
}
