package appraisal

import (
	"fmt"
	"net"
	"os"
	"strings"
	"time"
)

// M8SpamCheck queries Spamhaus DBL/ZRD and URIBL/SURBL for domain reputation.
type M8SpamCheck struct{}

func (m *M8SpamCheck) Name() string { return "m8_spam" }

// Spamhaus return codes for DBL
var dblReturnCodes = map[int]string{
	2002: "low-reputation",
	2004: "phishing-related",
	2005: "malware-related",
	2006: "botnet-c2",
	2102: "abused-legit",
	2103: "abused-redirector",
	2104: "abused-phishing",
	2105: "abused-malware",
	2106: "abused-c2",
}

// Spamhaus return codes for ZRD (domain first seen)
var zrdReturnCodes = map[int]string{
	3002: "first-seen-0-2h",
	3003: "first-seen-2-3h",
	3004: "first-seen-3-4h",
	3005: "first-seen-4-5h",
	3006: "first-seen-5-6h",
	3007: "first-seen-6-7h",
	3008: "first-seen-7-8h",
	3009: "first-seen-8-9h",
	3010: "first-seen-9-10h",
	3011: "first-seen-10-11h",
	3012: "first-seen-11-12h",
	3013: "first-seen-12-13h",
	3014: "first-seen-13-14h",
	3015: "first-seen-14-15h",
	3016: "first-seen-15-16h",
	3017: "first-seen-16-17h",
	3018: "first-seen-17-18h",
	3019: "first-seen-18-19h",
	3020: "first-seen-19-20h",
	3021: "first-seen-20-21h",
	3022: "first-seen-21-22h",
	3023: "first-seen-22-23h",
	3024: "first-seen-23-24h",
}

// SURBL multi-list bitmask meanings
var surblBitmask = map[int]string{
	2:   "SC",
	4:   "DM",
	8:   "PH",
	16:  "MW",
	32:  "CT",
	64:  "ABUSE",
	128: "CR",
}

func (m *M8SpamCheck) Execute(domain string, ctx *ToolContext) ToolResult {
	dqsKey := os.Getenv("SPAMHAUS_DQS_KEY")
	uriblHost := os.Getenv("URIBL_HOST")
	surblHost := os.Getenv("SURBL_HOST")

	if dqsKey == "" {
		dqsKey = "d7qgw5d3rpmlsfbxeon76ufosu"
	}
	if uriblHost == "" {
		uriblHost = "multi.uribl.com"
	}
	if surblHost == "" {
		surblHost = "multi.surbl.org"
	}

	findings := map[string]interface{}{
		"domain":   domain,
		"listed":   false,
		"severity": "clean",
		"sources":  []string{},
		"details":  map[string]interface{}{},
	}

	// Query Spamhaus DBL
	dblResult := querySpamhausDBL(domain, dqsKey)
	if dblResult.Listed {
		findings["listed"] = true
		findings["severity"] = "blacklisted"
		findings["details"].(map[string]interface{})["spamhaus_dbl"] = dblResult
	}

	// Query Spamhaus ZRD (domain registration timing)
	zrdResult := querySpamhausZRD(domain, dqsKey)
	if zrdResult.Listed {
		findings["details"].(map[string]interface{})["spamhaus_zrd"] = zrdResult
		if !findings["listed"].(bool) {
			findings["severity"] = "suspicious"
		}
	}

	// Query URIBL
	uriblResult := queryDNSBL(domain, uriblHost)
	if uriblResult.Listed {
		findings["listed"] = true
		findings["severity"] = "blacklisted"
		findings["details"].(map[string]interface{})["uribl"] = uriblResult
	}

	// Query SURBL
	surblResult := queryDNSBL(domain, surblHost)
	if surblResult.Listed {
		findings["listed"] = true
		findings["severity"] = "blacklisted"
		surblDetails := surblResult
		surblDetails["lists"] = decodeSURBLBitmask(surblResult["code"].(int))
		findings["details"].(map[string]interface{})["surbl"] = surblDetails
	}

	// Calculate multiplier based on severity
	mult := 1.0
	severity := findings["severity"].(string)
	switch severity {
	case "blacklisted":
		mult = 0.1
	case "suspicious":
		mult = 0.5
	case "clean":
		mult = 1.0
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: &mult,
		Confidence: 0.9,
		Findings:   findings,
		Explanation: fmt.Sprintf("Spam check: %s (severity: %s, multiplier: %.1fx)",
			domain, severity, mult),
	}
}

type dnsblResult struct {
	Listed bool
	Code   int
	Source string
}

func querySpamhausDBL(domain, dqsKey string) dnsblResult {
	// Query format: {domain}.{key}.dbl.dq.spamhaus.net
	queryDomain := fmt.Sprintf("%s.%s.dbl.dq.spamhaus.net", domain, dqsKey)

	ips, err := net.LookupHost(queryDomain)
	if err != nil {
		// NXDOMAIN = not listed
		return dnsblResult{Listed: false, Code: 0, Source: "spamhaus_dbl"}
	}

	if len(ips) == 0 {
		return dnsblResult{Listed: false, Code: 0, Source: "spamhaus_dbl"}
	}

	// Parse the response code from the last octet
	code := parseResponseCode(ips[0])
	return dnsblResult{Listed: true, Code: code, Source: "spamhaus_dbl"}
}

func querySpamhausZRD(domain, dqsKey string) dnsblResult {
	// Query format: {domain}.{key}.zrd.dq.spamhaus.net
	queryDomain := fmt.Sprintf("%s.%s.zrd.dq.spamhaus.net", domain, dqsKey)

	ips, err := net.LookupHost(queryDomain)
	if err != nil {
		return dnsblResult{Listed: false, Code: 0, Source: "spamhaus_zrd"}
	}

	if len(ips) == 0 {
		return dnsblResult{Listed: false, Code: 0, Source: "spamhaus_zrd"}
	}

	code := parseResponseCode(ips[0])
	return dnsblResult{Listed: true, Code: code, Source: "spamhaus_zrd"}
}

func queryDNSBL(domain, host string) dnsblResult {
	// Query format: {domain}.{host}
	queryDomain := fmt.Sprintf("%s.%s", domain, host)

	ips, err := net.LookupHost(queryDomain)
	if err != nil {
		return dnsblResult{Listed: false, Code: 0, Source: host}
	}

	if len(ips) == 0 {
		return dnsblResult{Listed: false, Code: 0, Source: host}
	}

	code := parseResponseCode(ips[0])
	return dnsblResult{Listed: true, Code: code, Source: host}
}

func parseResponseCode(ip string) int {
	parts := strings.Split(ip, ".")
	if len(parts) < 4 {
		return 0
	}
	code := 0
	for i := len(parts) - 1; i >= 0; i-- {
		val := 0
		for _, c := range parts[i] {
			if c >= '0' && c <= '9' {
				val = val*10 + int(c-'0')
			}
		}
		code = code*256 + val
		if i == 0 {
			break
		}
	}
	return code
}

func decodeSURBLBitmask(code int) []string {
	var lists []string
	bit := 1
	for bit <= 128 {
		if code&bit != 0 {
			if name, ok := surblBitmask[bit]; ok {
				lists = append(lists, name)
			}
		}
		bit <<= 1
	}
	return lists
}

func init() {
	// Ensure DNS resolver is available
	dialer := &net.Resolver{
		Timeout: 5 * time.Second,
	}
	_ = dialer
}
