package appraisal

import (
	"fmt"
	"math"
)

// M2TLD scores the TLD based on a lookup table.
type M2TLD struct{}

func (m *M2TLD) Name() string { return "m2_tld_table" }

var tldScores = map[string]float64{
	"com": 10.0, "net": 9.0, "io": 8.5, "ai": 8.5,
	"co": 8.0, "de": 8.0, "edu": 8.0, "org": 8.0,
	"app": 7.5, "it": 7.5, "xyz": 7.5,
	"us": 7.0, "tv": 7.0, "me": 7.0, "cc": 7.0, "tech": 7.0,
	"world": 6.5,
	"eu": 6.0, "ca": 6.0, "pro": 6.0,
	"asia": 5.0, "news": 5.0, "site": 5.0,
	"ltd": 4.5,
	"cloud": 4.0, "blog": 4.0, "fun": 4.0, "live": 4.0,
	"art": 3.5,
	"network": 3.0, "bio": 3.0,
	"agency": 2.0, "one": 2.0, "biz": 2.0,
	"icu": 1.0,
}

var tldProfileLabels = map[string]string{
	"tier_10":   "Premium",
	"tier_09":   "High",
	"tier_085":  "High",
	"tier_08":   "High",
	"tier_075":  "Upper-Mid",
	"tier_07":   "Mid",
	"tier_065":  "Lower-Mid",
	"tier_06":   "Lower-Mid",
	"tier_05":   "Low",
	"tier_045":  "Budget",
	"tier_04":   "Budget",
	"tier_035":  "Deep Budget",
	"tier_03":   "Deep Budget",
	"tier_02":   "Minimal",
	"tier_01":   "Minimal",
	"tier_00":   "Default",
}

func (m *M2TLD) Execute(domain string, ctx *ToolContext) ToolResult {
	tld := ctx.TLD
	score := tldScores[tld]
	if score == 0 {
		score = 0.2
	}
	profile := resolveTldProfile(score)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(score),
		Confidence: 1.0,
		Findings: map[string]interface{}{
			"tld":            tld,
			"tld_score":      score,
			"weight_profile": profile,
			"label":          tldProfileLabels[profile],
		},
		Explanation: fmt.Sprintf("TLD .%s scored %.1f/10 (%s tier)", tld, score, tldProfileLabels[profile]),
	}
}

func resolveTldProfile(score float64) string {
	if score >= 10.0 {
		return "tier_10"
	} else if score >= 9.0 {
		return "tier_09"
	} else if score >= 8.5 {
		return "tier_085"
	} else if score >= 8.0 {
		return "tier_08"
	} else if score >= 7.5 {
		return "tier_075"
	} else if score >= 7.0 {
		return "tier_07"
	} else if score >= 6.5 {
		return "tier_065"
	} else if score >= 6.0 {
		return "tier_06"
	} else if score >= 5.0 {
		return "tier_05"
	} else if score >= 4.5 {
		return "tier_045"
	} else if score >= 4.0 {
		return "tier_04"
	} else if score >= 3.5 {
		return "tier_035"
	} else if score >= 3.0 {
		return "tier_03"
	} else if score >= 2.0 {
		return "tier_02"
	} else if score >= 1.0 {
		return "tier_01"
	}
	return "tier_00"
}

func (m *M2TLD) GetTldScore(tld string) float64 {
	score := tldScores[tld]
	if score == 0 {
		return 0.2
	}
	return score
}

func (m *M2TLD) GetProfile(score float64) string {
	return resolveTldProfile(score)
}

func clamp(val, min, max float64) float64 {
	return math.Max(min, math.Min(max, val))
}
