package appraisal

import (
	"fmt"
	"io"
	"net/http"
	"time"
)

// M14Social checks social media handle availability for the domain name.
// A domain with available social handles is more valuable as a brand.
type M14Social struct{}

func (m *M14Social) Name() string { return "m14_social" }

// socialPlatform holds info about a social media platform check
type socialPlatform struct {
	Name      string
	CheckURL  string
	Available bool
	HTTPCode  int
}

// socialAnalysis holds aggregated social media analysis
type socialAnalysis struct {
	PlatformsChecked int
	AvailableCount   int
	TakenCount       int
	ErrorCount       int
	Platforms        []socialPlatform
}

func (m *M14Social) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD

	analysis := analyzeSocialAvailability(sld)

	mult, confidence := calculateSocialMultiplier(analysis)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: confidence,
		Findings: map[string]interface{}{
			"domain":           domain,
			"sld":              sld,
			"platforms_checked": analysis.PlatformsChecked,
			"available_count":   analysis.AvailableCount,
			"taken_count":       analysis.TakenCount,
			"error_count":       analysis.ErrorCount,
			"platforms":         analysis.Platforms,
			"multiplier":        mult,
		},
		Explanation: fmt.Sprintf("Social: %d/%d platforms available for @%s — multiplier: %.1fx",
			analysis.AvailableCount, analysis.PlatformsChecked, sld, mult),
	}
}

// analyzeSocialAvailability checks social media handle availability
func analyzeSocialAvailability(sld string) socialAnalysis {
	analysis := socialAnalysis{
		Platforms: []socialPlatform{},
	}

	// Check each platform
	platforms := getSocialPlatforms(sld)
	client := &http.Client{Timeout: 5 * time.Second}

	for _, platform := range platforms {
		result := checkSocialPlatform(client, platform)
		analysis.Platforms = append(analysis.Platforms, result)
		analysis.PlatformsChecked++

		switch {
		case result.Available:
			analysis.AvailableCount++
		case result.HTTPCode == 0:
			analysis.ErrorCount++
		default:
			analysis.TakenCount++
		}
	}

	return analysis
}

// getSocialPlatforms returns the platforms to check
func getSocialPlatforms(sld string) []socialPlatform {
	return []socialPlatform{
		{
			Name:     "Twitter/X",
			CheckURL: fmt.Sprintf("https://twitter.com/%s", sld),
		},
		{
			Name:     "Instagram",
			CheckURL: fmt.Sprintf("https://www.instagram.com/%s/", sld),
		},
		{
			Name:     "GitHub",
			CheckURL: fmt.Sprintf("https://github.com/%s", sld),
		},
		{
			Name:     "LinkedIn",
			CheckURL: fmt.Sprintf("https://www.linkedin.com/in/%s", sld),
		},
		{
			Name:     "TikTok",
			CheckURL: fmt.Sprintf("https://www.tiktok.com/@%s", sld),
		},
	}
}

// checkSocialPlatform checks if a social media handle is available
func checkSocialPlatform(client *http.Client, platform socialPlatform) socialPlatform {
	req, err := http.NewRequest("GET", platform.CheckURL, nil)
	if err != nil {
		return platform
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36")

	resp, err := client.Do(req)
	if err != nil {
		// Network error — assume unavailable
		platform.HTTPCode = 0
		return platform
	}
	defer resp.Body.Close()

	platform.HTTPCode = resp.StatusCode

	// Status codes indicate availability:
	// 200 = profile exists (taken)
	// 404 = not found (available)
	// 301/302 = redirect (could be taken or available)
	// 403/429 = blocked (assume taken)
	switch {
	case resp.StatusCode == 404:
		platform.Available = true
	case resp.StatusCode == 200:
		platform.Available = false
	case resp.StatusCode == 301 || resp.StatusCode == 302:
		// Check if redirect goes to a profile or to signup
		platform.Available = false
	default:
		// 403, 429, etc — assume taken
		platform.Available = false
	}

	// For GitHub, also check the response body for "not found"
	if platform.Name == "GitHub" && resp.StatusCode == 200 {
		body, err := io.ReadAll(resp.Body)
		if err == nil {
			bodyStr := string(body)
			if contains(bodyStr, "404") || contains(bodyStr, "Not Found") {
				platform.Available = true
			}
		}
	}

	return platform
}

// contains checks if a string contains a substring
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && containsHelper(s, substr))
}

func containsHelper(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

// calculateSocialMultiplier computes the multiplier from social analysis
func calculateSocialMultiplier(analysis socialAnalysis) (float64, float64) {
	if analysis.PlatformsChecked == 0 {
		return 1.0, 0.3
	}

	mult := 1.0
	confidence := 0.5

	// Factor 1: Availability ratio
	availRatio := float64(analysis.AvailableCount) / float64(analysis.PlatformsChecked)

	switch {
	case availRatio >= 0.8:
		// Most handles available — strong brand potential
		mult = 2.0
		confidence += 0.15
	case availRatio >= 0.6:
		mult = 1.5
		confidence += 0.1
	case availRatio >= 0.4:
		mult = 1.2
		confidence += 0.05
	case availRatio >= 0.2:
		mult = 1.0
	case availRatio == 0:
		// All taken — existing brand presence (could be good or bad)
		mult = 0.8
	}

	// Factor 2: Specific platform bonuses
	for _, p := range analysis.Platforms {
		if p.Available {
			switch p.Name {
			case "Twitter/X":
				mult *= 1.1 // Twitter handle is valuable
			case "GitHub":
				mult *= 1.05
			}
		}
	}

	// Factor 3: Error rate affects confidence
	errorRate := float64(analysis.ErrorCount) / float64(analysis.PlatformsChecked)
	if errorRate > 0.5 {
		confidence -= 0.1
	}

	if confidence > 0.95 {
		confidence = 0.95
	}
	if confidence < 0.1 {
		confidence = 0.1
	}

	return mult, confidence
}
