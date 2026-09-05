package appraisal

import (
	"fmt"
	"math"
)

// M15Pricing is the two-tier pricing engine.
// Tier 1: Algorithm-only dimensions → base price
// Tier 2: API-dependent adjustments → bounded multiplier
type M15Pricing struct{}

func (m *M15Pricing) Name() string { return "m15_pricing" }

// Tier 1 weights — must sum to 1.0
var tier1Weights = map[string]float64{
	"m2_tld_table":    0.15, // TLD market value
	"m3_length":       0.25, // SLD length
	"m4_word_count":   0.15, // Word count from segmentation
	"m5_pronounce":    0.10, // Pronounceability
	"m6_segmenter":    0.15, // Segmentation quality
	"m16_brandability": 0.20, // Brand pattern quality
}

// Tier 2 bounded multipliers — each module has min/max
type tier2Bounds struct {
	min float64
	max float64
}

var tier2BoundsMap = map[string]tier2Bounds{
	"m1_rdap":          {0.7, 1.3},  // Domain age
	"m8_spam":          {0.5, 1.0},  // Reputation
	"m9_search":        {0.8, 1.5},  // Web presence
	"m10_cross":        {0.9, 1.2},  // Brand protection
	"m11_trademark":    {0.5, 1.0},  // Legal risk
	"m11_dns_history":  {0.7, 1.3},  // Ownership stability
	"m12_authority":    {0.8, 1.5},  // Domain authority
	"m14_social":       {0.9, 1.1},  // Social availability
}

// TLD multipliers — affects the base price
var tldMultipliers = map[string]float64{
	"com": 1.0, "net": 0.8, "io": 0.4, "ai": 0.4,
	"co": 0.3, "de": 0.3, "org": 0.3, "edu": 0.3,
	"app": 0.25, "it": 0.25, "xyz": 0.25,
	"us": 0.2, "tv": 0.2, "me": 0.2, "tech": 0.2,
	"eu": 0.15, "ca": 0.15,
	"asia": 0.05, "news": 0.05, "site": 0.05,
	"cloud": 0.05, "blog": 0.05,
	"network": 0.02,
	"agency": 0.02, "biz": 0.02,
	"icu": 0.01,
}

func (m *M15Pricing) Execute(domain string, ctx *ToolContext) ToolResult {
	tld := ctx.TLD

	// TIER 1: Calculate base price from algorithm dimensions
	intrinsicScore := m.calculateTier1Score(ctx)
	tldMult := tldMultipliers[tld]
	if tldMult == 0 {
		tldMult = 0.1
	}
	basePrice := priceCurve(intrinsicScore, tldMult)

	// TIER 2: Apply bounded API adjustments
	apiMultiplier := m.calculateTier2Multiplier(ctx)
	adjustedPrice := basePrice * apiMultiplier

	// Calculate range based on confidence
	completeness := 0.9
	if ctx.Results != nil {
		if m13, ok := ctx.Results["m13_confidence"]; ok {
			if m13.Multiplier != nil {
				completeness = *m13.Multiplier
			}
		}
	}

	factor := (1.0 - completeness) * 0.5
	rangeLow := adjustedPrice * (1.0 - factor)
	rangeHigh := adjustedPrice * (1.0 + factor)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(adjustedPrice),
		Confidence: completeness,
		Findings: map[string]interface{}{
			"estimated_value":  math.Round(adjustedPrice),
			"range_low":        math.Round(rangeLow),
			"range_high":       math.Round(rangeHigh),
			"intrinsic_score":  math.Round(intrinsicScore*100) / 100,
			"tld_mult":         tldMult,
			"base_price":       math.Round(basePrice),
			"api_multiplier":   math.Round(apiMultiplier*1000) / 1000,
			"tier1_breakdown":  m.getTier1Breakdown(ctx),
			"tier2_breakdown":  m.getTier2Breakdown(ctx),
		},
		Explanation: fmt.Sprintf("Estimated value: $%s (score: %.0f/100, base: $%s, API adj: %.2fx, confidence: %.0f%%)",
			formatMoney(adjustedPrice), intrinsicScore, formatMoney(basePrice), apiMultiplier, completeness*100),
	}
}

// calculateTier1Score computes the intrinsic quality score (0-100)
// Uses a clear hierarchy: dictionary words > length > brandability
func (m *M15Pricing) calculateTier1Score(ctx *ToolContext) float64 {
	sld := ctx.SLD
	length := len(sld)

	// Check if dictionary word
	isDict := isKnownWord(sld)

	// Check if segmented words are dictionary words
	hasDictSegment := false
	if ctx.Words != nil {
		for _, w := range ctx.Words {
			if isKnownWord(w) {
				hasDictSegment = true
				break
			}
		}
	}

	// Check if commercial keyword
	commercialWords := map[string]bool{
		"business": true, "market": true, "shop": true, "store": true,
		"pay": true, "buy": true, "sell": true, "trade": true,
		"finance": true, "bank": true, "invest": true, "money": true,
		"health": true, "medical": true, "legal": true, "insurance": true,
		"real": true, "estate": true, "home": true,
		"auto": true, "tech": true, "digital": true, "cloud": true,
		"software": true, "app": true, "web": true, "data": true,
		"crypto": true, "bitcoin": true,
	}
	isCommercial := commercialWords[sld]

	// Score hierarchy
	var score float64

	if isCommercial {
		score = 95.0
	} else if isDict {
		// Dictionary words score based on length
		switch {
		case length <= 2:
			score = 92.0
		case length == 3:
			score = 88.0 // 3-char dictionary word — higher
		case length <= 5:
			score = 82.0
		case length <= 8:
			score = 78.0
		default:
			score = 72.0
		}
	} else if length <= 1 {
		score = 100.0 // Single char — ultimate
	} else if length == 2 {
		score = 95.0  // Two chars — ultra premium
	} else if length == 3 {
		score = 70.0
	} else if length == 4 {
		score = 60.0
	} else if length <= 6 {
		score = 45.0
	} else if length <= 8 {
		if hasDictSegment {
			score = 50.0
		} else {
			score = 35.0
		}
	} else if length <= 10 {
		score = 25.0
	} else {
		score = 15.0
	}

	return clamp(score, 0, 100)
}

// extractScore gets the quality score from a module's findings
func extractScore(mod ToolResult, moduleName string) float64 {
	if mod.Findings == nil {
		return 50.0
	}

	switch moduleName {
	case "m2_tld_table":
		// M2 returns tld_score (0-10), normalize to 0-100
		if score, ok := mod.Findings["tld_score"].(float64); ok {
			return score * 10.0
		}
	case "m3_length":
		// M3 returns score (0-100) based on sigmoid
		if score, ok := mod.Findings["score"].(float64); ok {
			return score
		}
	case "m4_word_count":
		// M4 returns score (0-100) — already has dictionary bonus
		if score, ok := mod.Findings["score"].(float64); ok {
			return score
		}
	case "m5_pronounce":
		// M5 returns score (0-100)
		if score, ok := mod.Findings["score"].(float64); ok {
			return score
		}
	case "m6_segmenter":
		// M6 returns quality (0-1)
		if quality, ok := mod.Findings["quality"].(float64); ok {
			return quality * 100.0
		}
	case "m16_brandability":
		// M16 returns multiplier — map to score
		if mod.Multiplier != nil {
			m := *mod.Multiplier
			switch {
			case m >= 5.0:
				return 95.0
			case m >= 3.0:
				return 80.0
			case m >= 2.0:
				return 65.0
			case m >= 1.5:
				return 50.0
			default:
				return 30.0
			}
		}
	}

	return 50.0
}

// calculateTier2Multiplier computes the bounded API adjustment
func (m *M15Pricing) calculateTier2Multiplier(ctx *ToolContext) float64 {
	multiplier := 1.0

	for moduleName, bounds := range tier2BoundsMap {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[moduleName]; ok && mod.Multiplier != nil {
				mult := *mod.Multiplier
				// Clamp to bounds
				mult = math.Max(bounds.min, math.Min(bounds.max, mult))
				multiplier *= mult
			}
		}
	}

	// Cap total adjustment at ±50%
	multiplier = math.Max(0.5, math.Min(1.5, multiplier))

	return multiplier
}

func (m *M15Pricing) getTier1Breakdown(ctx *ToolContext) map[string]interface{} {
	breakdown := map[string]interface{}{}
	for moduleName, weight := range tier1Weights {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[moduleName]; ok {
				score := extractScore(mod, moduleName)
				breakdown[moduleName] = map[string]interface{}{
					"score":  math.Round(score*100) / 100,
					"weight": weight,
					"contrib": math.Round(score*weight*100) / 100,
				}
			}
		}
	}
	return breakdown
}

func (m *M15Pricing) getTier2Breakdown(ctx *ToolContext) map[string]interface{} {
	breakdown := map[string]interface{}{}
	for moduleName, bounds := range tier2BoundsMap {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[moduleName]; ok && mod.Multiplier != nil {
				mult := *mod.Multiplier
				clamped := math.Max(bounds.min, math.Min(bounds.max, mult))
				breakdown[moduleName] = map[string]interface{}{
					"raw":     math.Round(mult*1000) / 1000,
					"clamped": math.Round(clamped*1000) / 1000,
					"bounds":  fmt.Sprintf("%.1f-%.1f", bounds.min, bounds.max),
				}
			}
		}
	}
	return breakdown
}

// priceCurve maps an intrinsic score (0-100) to a dollar value
// Calibrated to match expected domain values
func priceCurve(score float64, tldMult float64) float64 {
	score = clamp(score, 0, 100)

	// Piecewise linear curve calibrated to expected values
	// Points: (score, price)
	// (0, $100), (20, $300), (28, $1.2K), (35, $4K), (40, $7K),
	// (50, $15K), (60, $50K), (70, $200K), (80, $2M), (85, $10M),
	// (90, $30M), (95, $80M), (100, $150M)
	var price float64
	switch {
	case score <= 20:
		price = 100 + (score/20.0)*200
	case score <= 28:
		price = 300 + ((score-20)/8.0)*900
	case score <= 35:
		price = 1200 + ((score-28)/7.0)*2800
	case score <= 40:
		price = 4000 + ((score-35)/5.0)*3000
	case score <= 50:
		price = 7000 + ((score-40)/10.0)*8000
	case score <= 60:
		price = 15000 + ((score-50)/10.0)*35000
	case score <= 70:
		price = 50000 + ((score-60)/10.0)*150000
	case score <= 80:
		price = 200000 + ((score-70)/10.0)*1800000
	case score <= 85:
		price = 2000000 + ((score-80)/5.0)*8000000
	case score <= 90:
		price = 10000000 + ((score-85)/5.0)*20000000
	case score <= 95:
		price = 30000000 + ((score-90)/5.0)*50000000
	default:
		price = 80000000 + ((score-95)/5.0)*70000000
	}

	price *= tldMult
	return price
}

func formatMoney(v float64) string {
	if v >= 1000000 {
		return fmt.Sprintf("%.1fM", v/1000000)
	} else if v >= 1000 {
		return fmt.Sprintf("%.0fK", v/1000)
	}
	return fmt.Sprintf("%.0f", v)
}
