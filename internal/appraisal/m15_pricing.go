package appraisal

import (
	"fmt"
	"math"
)

// M15Pricing converts module multipliers into a dollar estimate.
// This is the core money logic with 7 weight profiles based on TLD tier.
type M15Pricing struct{}

func (m *M15Pricing) Name() string { return "m15_pricing" }

// Weight profiles for different TLD tiers
var weightProfiles = map[string]map[string]float64{
	"tier_10": { // .com
		"m1_rdap": 0.14, "m3_length": 0.10, "m5_pronounce": 0.05,
		"m7_keyword": 0.09, "m8_cpc": 0.09, "m9_search": 0.03,
		"m10_cross": 0.0, "m11_trademark": 0.05, "m12_authority": 0.05,
		"m16_brandability": 0.10,
	},
	"tier_085": { // .io, .ai
		"m1_rdap": 0.09, "m3_length": 0.08, "m5_pronounce": 0.10,
		"m7_keyword": 0.24, "m8_cpc": 0.19, "m9_search": 0.03,
		"m10_cross": 0.05, "m11_trademark": 0.03, "m12_authority": 0.02,
		"m16_brandability": 0.15,
	},
	"tier_08": { // .co, .de, .org
		"m1_rdap": 0.09, "m3_length": 0.08, "m5_pronounce": 0.10,
		"m7_keyword": 0.24, "m8_cpc": 0.19, "m9_search": 0.03,
		"m10_cross": 0.05, "m11_trademark": 0.03, "m12_authority": 0.02,
		"m16_brandability": 0.15,
	},
	"tier_06": { // .eu, .ca, .tv
		"m1_rdap": 0.04, "m3_length": 0.06, "m5_pronounce": 0.15,
		"m7_keyword": 0.29, "m8_cpc": 0.24, "m9_search": 0.03,
		"m10_cross": 0.10, "m11_trademark": 0.0, "m12_authority": 0.0,
		"m16_brandability": 0.15,
	},
	"tier_04": { // .cloud, .blog
		"m1_rdap": 0.05, "m3_length": 0.06, "m5_pronounce": 0.10,
		"m7_keyword": 0.24, "m8_cpc": 0.29, "m9_search": 0.02,
		"m10_cross": 0.15, "m11_trademark": 0.02, "m12_authority": 0.0,
		"m16_brandability": 0.12,
	},
	"tier_01": { // .icu, .biz
		"m1_rdap": 0.03, "m3_length": 0.04, "m5_pronounce": 0.10,
		"m7_keyword": 0.24, "m8_cpc": 0.34, "m9_search": 0.02,
		"m10_cross": 0.20, "m11_trademark": 0.0, "m12_authority": 0.0,
		"m16_brandability": 0.07,
	},
	"tier_00": { // default
		"m3_length": 0.05, "m5_pronounce": 0.05,
		"m7_keyword": 0.29, "m8_cpc": 0.39, "m9_search": 0.02,
		"m10_cross": 0.20, "m11_trademark": 0.0, "m12_authority": 0.0,
		"m16_brandability": 0.10,
	},
}

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
						value *= 10.0 // CPC boost for high-intent brandable
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

	// Stage 2: Weighted multiplier application
	breakdown := map[string]interface{}{
		"scarcity_base": base,
		"tld_mult":      tldMult,
		"base_value":    value,
	}

	profile := ""
	if ctx.Results != nil {
		if m2, ok := ctx.Results["m2_tld_table"]; ok {
			if p, ok := m2.Findings["weight_profile"].(string); ok {
				profile = p
			}
		}
	}

	weights := weightProfiles[profile]
	if weights == nil {
		weights = weightProfiles["tier_00"]
	}

	// Normalize weights for active modules
	totalWeight := 0.0
	for modName, weight := range weights {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[modName]; ok && mod.Multiplier != nil {
				totalWeight += weight
			}
		}
	}

	if totalWeight > 0 {
		for modName, weight := range weights {
			if ctx.Results != nil {
				if mod, ok := ctx.Results[modName]; ok && mod.Multiplier != nil {
					normalizedWeight := weight / totalWeight
					mult := *mod.Multiplier

					var contribution float64
					if modName == "m12_authority" && mult >= 1.0 {
						contribution = 1.0 + normalizedWeight*(mult-1.0)
					} else if mult >= 1.0 {
						contribution = math.Pow(mult, normalizedWeight)
					} else {
						contribution = mult
					}

					value *= contribution
					breakdown[modName] = map[string]interface{}{
						"multiplier":  mult,
						"weight":      weight,
						"contribution": math.Round(contribution*1000) / 1000,
					}
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
			"weight_profile":  profile,
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

	if splitStatus == IntentBrand || splitStatus == "" {
		// Brandable domain scarcity
		switch {
		case length <= 4:
			return 10000
		case length <= 7:
			return 1000
		default:
			return 500
		}
	}

	// Keyword domain scarcity (length-based)
	var lengthBase float64
	switch {
	case length <= 3:
		lengthBase = 13000000
	case length <= 4:
		lengthBase = 1000000
	case length <= 5:
		lengthBase = 100000
	case length <= 7:
		lengthBase = 10000
	default:
		lengthBase = 1000
	}

	return lengthBase
}

func formatMoney(v float64) string {
	if v >= 1000000 {
		return fmt.Sprintf("$%.1fM", v/1000000)
	} else if v >= 1000 {
		return fmt.Sprintf("$%.0fK", v/1000)
	}
	return fmt.Sprintf("$%.0f", v)
}
