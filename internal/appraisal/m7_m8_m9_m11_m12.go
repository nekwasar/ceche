package appraisal

import (
	"fmt"
)

// M11Trademark checks for trademark conflicts.
type M11Trademark struct{}

func (m *M11Trademark) Name() string { return "m11_trademark" }

func (m *M11Trademark) Execute(domain string, ctx *ToolContext) ToolResult {
	// Trademark API integration will be added in Phase 2
	// For now, return placeholder
	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(1.0),
		Confidence: 0.5,
		Findings: map[string]interface{}{
			"severity": "none",
			"marks":    []string{},
			"note":     "Trademark API integration pending (Phase 2)",
		},
		Explanation: "Trademark check placeholder — API integration pending for real-time USPTO/WIPO screening",
	}
}

// M7Keyword grades keyword popularity using the curated wordlist.
type M7Keyword struct{}

func (m *M7Keyword) Name() string { return "m7_keyword" }

func (m *M7Keyword) Execute(domain string, ctx *ToolContext) ToolResult {
	words := ctx.Words
	if len(words) == 0 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "skipped",
			Multiplier: nil,
			Confidence: 0.0,
			Findings:   map[string]interface{}{"reason": "no words available"},
			Explanation: "Skipped: no words available from segmentation",
		}
	}

	// Grade commercial intent using curated wordlist
	intent, intentScore := gradeIntent(words)

	mult := 1.0
	switch intent {
	case IntentHigh:
		mult = 8.0
	case IntentMid:
		mult = 3.0
	case IntentLow:
		mult = 1.5
	case IntentBrand:
		mult = 1.0
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: 0.7,
		Findings: map[string]interface{}{
			"intent":      intent,
			"intent_score": intentScore,
			"multiplier":  mult,
			"keywords":    words,
		},
		Explanation: fmt.Sprintf("Keyword intent: %s (score: %.0f) — multiplier: %.1fx", intent, intentScore, mult),
	}
}

// M8CPC evaluates commercial intent from CPC tier.
type M8CPC struct{}

func (m *M8CPC) Name() string { return "m8_cpc" }

func (m *M8CPC) Execute(domain string, ctx *ToolContext) ToolResult {
	words := ctx.Words
	if len(words) == 0 {
		words = []string{ctx.SLD}
	}

	bestTier := ""
	bestMult := 1.0

	for _, w := range words {
		tier := lookupCPC(w)
		if tier != "" && tierRank(tier) < tierRank(bestTier) {
			bestTier = tier
			bestMult = cpcTierMult(tier)
		}
	}

	// Substring fallback
	if bestTier == "" {
		sld := ctx.SLD
		for _, w := range highIntentWords {
			if len(w) >= 3 && len(sld) >= len(w) {
				for i := 0; i <= len(sld)-len(w); i++ {
					if sld[i:i+len(w)] == w {
						bestTier = "high"
						bestMult = 3.0
						break
					}
				}
			}
		}
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(bestMult),
		Confidence: 0.7,
		Findings: map[string]interface{}{
			"tier":       bestTier,
			"multiplier": bestMult,
		},
		Explanation: fmt.Sprintf("CPC tier: %s — multiplier: %.1fx", bestTier, bestMult),
	}
}

func tierRank(tier string) int {
	switch tier {
	case "elite":
		return 0
	case "high":
		return 1
	case "medium_high":
		return 2
	case "medium":
		return 3
	case "low":
		return 4
	case "informational":
		return 5
	default:
		return 6
	}
}

func cpcTierMult(tier string) float64 {
	switch tier {
	case "elite":
		return 5.0
	case "high":
		return 3.0
	case "medium_high":
		return 2.5
	case "medium":
		return 2.0
	case "low":
		return 1.5
	case "informational":
		return 1.0
	default:
		return 1.0
	}
}
