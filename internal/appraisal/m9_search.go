package appraisal

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"time"
)

// M9Search measures web presence via search results.
// Uses DuckDuckGo HTML search (no API key required) to assess:
// - Web presence (result count)
// - Competitor identification (other domains in results)
// - Common law trademark signals (exact phrase matches)
// - Business activity signals (commercial language in snippets)
type M9Search struct{}

func (m *M9Search) Name() string { return "m9_search" }

// ddgSearchResult holds parsed data from a single search result
type ddgSearchResult struct {
	Title   string
	URL     string
	Snippet string
}

// searchAnalysis holds aggregated analysis of search results
type searchAnalysis struct {
	ResultCount       int
	ExactMatchFound   bool
	CompetitorDomains []string
	BusinessSignals   []string
	PhraseMatches     int
	TotalSnippets     int
	CommercialWords   int
}

func (m *M9Search) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD

	analysis := &searchAnalysis{}

	// Search 1: Exact domain name
	domainResults := searchDuckDuckGo(domain)
	analysis.ResultCount += len(domainResults)
	analysis.ExactMatchFound = checkExactMatch(domain, domainResults)
	analysis.TotalSnippets += countSnippets(domainResults)

	// Search 2: SLD as a phrase (for common law trademark)
	phraseResults := searchDuckDuckGo(`"` + sld + `"`)
	analysis.PhraseMatches = len(phraseResults)
	analysis.TotalSnippets += countSnippets(phraseResults)

	// Search 3: SLD + commercial intent words
	commercialQuery := sld + " buy OR shop OR service OR company OR price"
	commercialResults := searchDuckDuckGo(commercialQuery)
	analysis.CommercialWords = countCommercialSignals(commercialResults)
	analysis.TotalSnippets += countSnippets(commercialResults)

	// Search 4: Competitor detection
	competitorQuery := sld + " alternatives OR competitors OR vs"
	competitorResults := searchDuckDuckGo(competitorQuery)
	analysis.CompetitorDomains = extractCompetitorDomains(domain, competitorResults)
	analysis.TotalSnippets += countSnippets(competitorResults)

	mult, confidence := calculateSearchMultiplier(analysis)

	findings := map[string]interface{}{
		"domain":             domain,
		"result_count":       analysis.ResultCount,
		"exact_match_found":  analysis.ExactMatchFound,
		"phrase_matches":     analysis.PhraseMatches,
		"commercial_signals": analysis.CommercialWords,
		"competitor_count":   len(analysis.CompetitorDomains),
		"competitor_domains": analysis.CompetitorDomains,
		"total_snippets":     analysis.TotalSnippets,
		"multiplier":         mult,
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: confidence,
		Findings:   findings,
		Explanation: fmt.Sprintf("Search presence: %d results, exact match=%v, %d phrase matches, %d commercial signals, %d competitors — multiplier: %.1fx",
			analysis.ResultCount, analysis.ExactMatchFound, analysis.PhraseMatches,
			analysis.CommercialWords, len(analysis.CompetitorDomains), mult),
	}
}

// searchDuckDuckGo performs a search via DuckDuckGo HTML lite
func searchDuckDuckGo(query string) []ddgSearchResult {
	searchURL := fmt.Sprintf("https://html.duckduckgo.com/html/?q=%s", url.QueryEscape(query))

	client := &http.Client{
		Timeout: 10 * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	req, err := http.NewRequest("GET", searchURL, nil)
	if err != nil {
		return nil
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil
	}

	return parseDuckDuckGoHTML(string(body))
}

// parseDuckDuckGoHTML extracts search results from DuckDuckGo HTML
func parseDuckDuckGoHTML(html string) []ddgSearchResult {
	var results []ddgSearchResult

	// DuckDuckGo HTML lite result pattern:
	// <a rel="nofollow" class="result__a" href="//duckduckgo.com/l/?uddg=ENCODED_URL&rut=...">Title</a>
	// <a class="result__snippet" ...>Snippet</a>

	// Split by result blocks - each result starts with "web-result"
	blocks := strings.Split(html, "web-result")

	for _, block := range blocks {
		// Extract URL from uddg parameter
		urlRegex := regexp.MustCompile(`uddg=([^&"]+)`)
		urlMatch := urlRegex.FindStringSubmatch(block)
		if urlMatch == nil {
			continue
		}
		rawURL, _ := url.QueryUnescape(urlMatch[1])
		if rawURL == "" {
			continue
		}

		// Extract title from result__a
		titleRegex := regexp.MustCompile(`class="result__a"[^>]*>([^<]+)</a>`)
		titleMatch := titleRegex.FindStringSubmatch(block)
		title := ""
		if titleMatch != nil {
			title = strings.TrimSpace(titleMatch[1])
		}

		// Extract snippet from result__snippet
		snippetRegex := regexp.MustCompile(`class="result__snippet"[^>]*>([^<]+)`)
		snippetMatch := snippetRegex.FindStringSubmatch(block)
		snippet := ""
		if snippetMatch != nil {
			snippet = strings.TrimSpace(snippetMatch[1])
		}

		results = append(results, ddgSearchResult{
			Title:   title,
			URL:     rawURL,
			Snippet: snippet,
		})
	}

	return results
}

// checkExactMatch checks if the exact domain appears in search results
func checkExactMatch(domain string, results []ddgSearchResult) bool {
	domainLower := strings.ToLower(domain)
	for _, r := range results {
		if strings.Contains(strings.ToLower(r.URL), domainLower) {
			return true
		}
		if strings.Contains(strings.ToLower(r.Title), domainLower) {
			return true
		}
	}
	return false
}

// countSnippets counts how many results have non-empty snippets
func countSnippets(results []ddgSearchResult) int {
	count := 0
	for _, r := range results {
		if r.Snippet != "" {
			count++
		}
	}
	return count
}

// extractCompetitorDomains extracts other domain names from search results
func extractCompetitorDomains(targetDomain string, results []ddgSearchResult) []string {
	domainMap := make(map[string]bool)
	targetLower := strings.ToLower(targetDomain)

	tlds := []string{".com", ".net", ".org", ".io", ".co", ".ai", ".app", ".dev", ".xyz"}

	for _, r := range results {
		if u, err := url.Parse(r.URL); err == nil {
			host := strings.ToLower(u.Hostname())
			if host != "" && !strings.Contains(host, "duckduckgo") && host != targetLower {
				for _, tld := range tlds {
					if strings.HasSuffix(host, tld) {
						domainMap[host] = true
						break
					}
				}
			}
		}
	}

	competitors := make([]string, 0, len(domainMap))
	for d := range domainMap {
		competitors = append(competitors, d)
	}
	return competitors
}

// countCommercialSignals counts commercial language in search snippets
func countCommercialSignals(results []ddgSearchResult) int {
	commercialWords := []string{
		"buy", "shop", "price", "cost", "cheap", "deal", "discount",
		"order", "purchase", "subscribe", "plan", "pricing", "premium",
		"service", "company", "business", "agency", "consulting",
		"hire", "booking", "appointment", "contact", "support",
	}

	count := 0
	for _, r := range results {
		text := strings.ToLower(r.Title + " " + r.Snippet)
		for _, word := range commercialWords {
			if strings.Contains(text, word) {
				count++
			}
		}
	}
	return count
}

// calculateSearchMultiplier computes the multiplier from search analysis
func calculateSearchMultiplier(analysis *searchAnalysis) (float64, float64) {
	mult := 1.0
	confidence := 0.5

	// Factor 1: Result count (web presence)
	switch {
	case analysis.ResultCount >= 10:
		mult *= 3.0
		confidence += 0.1
	case analysis.ResultCount >= 5:
		mult *= 2.0
		confidence += 0.05
	case analysis.ResultCount >= 2:
		mult *= 1.5
	case analysis.ResultCount == 0:
		mult *= 0.5
		confidence -= 0.1
	}

	// Factor 2: Exact match found (actively used domain)
	if analysis.ExactMatchFound {
		mult *= 2.0
		confidence += 0.1
	}

	// Factor 3: Phrase matches (common law trademark signal)
	switch {
	case analysis.PhraseMatches >= 8:
		mult *= 2.5
		confidence += 0.1
	case analysis.PhraseMatches >= 4:
		mult *= 1.5
		confidence += 0.05
	case analysis.PhraseMatches >= 2:
		mult *= 1.2
	}

	// Factor 4: Commercial signals (business use)
	switch {
	case analysis.CommercialWords >= 10:
		mult *= 2.0
		confidence += 0.1
	case analysis.CommercialWords >= 5:
		mult *= 1.5
		confidence += 0.05
	case analysis.CommercialWords >= 2:
		mult *= 1.2
	}

	// Factor 5: Competitor count (market demand)
	competitorCount := len(analysis.CompetitorDomains)
	switch {
	case competitorCount >= 5:
		mult *= 1.8
		confidence += 0.05
	case competitorCount >= 3:
		mult *= 1.3
	case competitorCount >= 1:
		mult *= 1.1
	}

	if confidence > 0.95 {
		confidence = 0.95
	}
	if confidence < 0.1 {
		confidence = 0.1
	}

	return mult, confidence
}
