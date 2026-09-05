package appraisal

import (
	"fmt"
	"math"
)

// M15Pricing converts module multipliers into a dollar estimate.
// Core pricing logic adapted from the ceche CLI for .com domains.
// Non-.com TLDs use a simplified default profile.
type M15Pricing struct{}

func (m *M15Pricing) Name() string { return "m15_pricing" }

// TLD multipliers for scarcity base
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
	sld := ctx.SLD
	tld := ctx.TLD
	splitStatus := ctx.SplitStatus

	// Stage 1: Scarcity Base
	base := m.calculateScarcityBase(sld, splitStatus)
	tldMult := tldMultipliers[tld]
	if tldMult == 0 {
		tldMult = 0.005
	}
	value := base * tldMult

	// Brandable adjustments
	if splitStatus == IntentBrand || splitStatus == "" {
		// Check CPC tier for brandable domains
		if ctx.Results != nil {
			if m6, ok := ctx.Results["m6_segmenter"]; ok {
				if intent, ok := m6.Findings["intent"].(string); ok {
					if intent == IntentHigh {
						value *= 10.0
					}
				}
			}
		}
		// Pronounceability penalty
		if m5, ok := ctx.Results["m5_pronounce"]; ok {
			if m5.Multiplier != nil && *m5.Multiplier <= 1.0 {
				value *= 0.5
			}
		}
		// Digit penalty
		for _, c := range sld {
			if c >= '0' && c <= '9' {
				value *= 0.3
				break
			}
		}
	}

	// Stage 2: Direct multiplier application (no weighted power compression)
	breakdown := map[string]interface{}{
		"scarcity_base": base,
		"tld_mult":      tldMult,
		"base_value":    value,
	}

	// Apply key multipliers directly with diminishing returns
	keyMultipliers := []struct {
		name string
		weight float64
	}{
		{"m3_length", 0.25},
		{"m4_word_count", 0.20},
		{"m5_pronounce", 0.10},
		{"m7_keyword", 0.10},
		{"m8_cpc", 0.10},
		{"m9_search", 0.10},
		{"m10_cross", 0.05},
		{"m12_authority", 0.05},
		{"m16_brandability", 0.15},
	}

	for _, km := range keyMultipliers {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[km.name]; ok && mod.Multiplier != nil {
				mult := *mod.Multiplier
				// Apply with diminishing returns: mult^(weight)
				// This preserves direction but compresses extremes
				contribution := math.Pow(mult, km.weight)
				value *= contribution
				breakdown[km.name] = map[string]interface{}{
					"multiplier":   mult,
					"weight":       km.weight,
					"contribution": math.Round(contribution*1000) / 1000,
				}
			}
		}
	}

	// Apply DNS history multiplier (if available)
	if ctx.Results != nil {
		if m11dns, ok := ctx.Results["m11_dns_history"]; ok && m11dns.Multiplier != nil {
			dnsMult := *m11dns.Multiplier
			value *= dnsMult
			breakdown["m11_dns_history"] = map[string]interface{}{
				"multiplier": dnsMult,
				"effect":     "adjustment",
			}
		}
	}

	// Stage 3: Range calculation
	completeness := 0.9
	if ctx.Results != nil {
		if m13, ok := ctx.Results["m13_confidence"]; ok {
			if m13.Multiplier != nil {
				completeness = *m13.Multiplier
			}
		}
	}

	factor := (1.0 - completeness) * 0.5
	rangeLow := value * (1.0 - factor)
	rangeHigh := value * (1.0 + factor)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(value),
		Confidence: completeness,
		Findings: map[string]interface{}{
			"estimated_value": math.Round(value),
			"range_low":       math.Round(rangeLow),
			"range_high":      math.Round(rangeHigh),
			"scarcity_base":   base,
			"tld_mult":        tldMult,
			"breakdown":       breakdown,
		},
		Explanation: fmt.Sprintf("Estimated value: $%s (range: $%s - $%s, confidence: %.0f%%)",
			formatMoney(value), formatMoney(rangeLow), formatMoney(rangeHigh), completeness*100),
	}
}

func (m *M15Pricing) calculateScarcityBase(sld string, splitStatus string) float64 {
	length := len(sld)
	isWord := isKnownWord(sld)

	// Dictionary word domains — shorter words are MORE valuable
	if isWord {
		var base float64 = 5000000 // Default dictionary word

		// High-value commercial keywords get massive bonus
		commercialWords := map[string]bool{
			"business": true, "market": true, "shop": true, "store": true,
			"pay": true, "buy": true, "sell": true, "trade": true,
			"finance": true, "bank": true, "invest": true, "money": true,
			"health": true, "medical": true, "legal": true, "insurance": true,
			"real": true, "estate": true, "home": true, "car": true,
			"auto": true, "tech": true, "digital": true, "cloud": true,
			"software": true, "app": true, "web": true, "data": true,
			"ai": true, "crypto": true, "bitcoin": true,
		}
		if commercialWords[sld] {
			// Premium commercial keywords — highest value
			premiumCommercial := map[string]bool{
				"business": true, "market": true, "finance": true, "insurance": true,
				"software": true, "digital": true, "crypto": true, "health": true,
				"medical": true, "legal": true, "real": true, "estate": true,
			}
			if premiumCommercial[sld] {
				base = 40000000  // Premium commercial keyword
			} else {
				switch {
				case length <= 3:
					base = 10000000  // Short commercial keyword (car, ai, etc.)
				case length <= 5:
					base = 8000000   // Short-medium
				default:
					base = 6000000   // Medium commercial keyword
				}
			}
		} else {
			switch {
			case length <= 2:
				base = 15000000
			case length <= 3:
				base = 12000000
			case length <= 5:
				base = 8000000
			case length <= 8:
				base = 5000000
			default:
				base = 2000000
			}
		}
		return base
	}

	// Non-dictionary domains — value based on length and brandability
	switch {
	case length <= 1:
		return 50000000  // Single char — ultimate (even if not dictionary)
	case length <= 2:
		return 30000000  // Two chars — ultra premium
	case length <= 3:
		return 13000000  // Three chars — very premium
	case length <= 4:
		return 500000    // Four chars
	case length <= 5:
		return 100000    // Five chars
	case length <= 7:
		return 10000     // Seven chars
	case length <= 9:
		return 2000      // Nine chars
	default:
		return 500       // Long
	}
}

func formatMoney(v float64) string {
	if v >= 1000000 {
		return fmt.Sprintf("%.1fM", v/1000000)
	} else if v >= 1000 {
		return fmt.Sprintf("%.0fK", v/1000)
	}
	return fmt.Sprintf("%.0f", v)
}
