package appraisal

import (
	"fmt"
	"math"
)

// M13Confidence computes overall appraisal confidence.
type M13Confidence struct{}

func (m *M13Confidence) Name() string { return "m13_confidence" }

func (m *M13Confidence) Execute(domain string, ctx *ToolContext) ToolResult {
	moduleNames := []string{
		"m1_rdap", "m2_tld_table", "m3_length", "m4_word_count",
		"m5_pronounce", "m6_segmenter",
		"m7_keyword", "m8_cpc", "m9_search",
		"m10_cross", "m11_trademark", "m11_dns_history",
		"m12_authority", "m13_confidence", "m14_social",
		"m15_pricing", "m16_brandability", "m8_spam", "search_domain",
	}

	total := 0
	withData := 0
	for _, name := range moduleNames {
		if ctx.Results != nil {
			if mod, ok := ctx.Results[name]; ok {
				total++
				if mod.Status == "success" {
					withData++
				}
			}
		}
	}

	if total == 0 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "success",
			Multiplier: float64Ptr(0.0),
			Confidence: 0.0,
			Findings: map[string]interface{}{
				"completeness_ratio": 0.0,
				"label":              "none",
				"modules_with_data":  0,
				"applicable_modules": 0,
			},
			Explanation: "No module data available — confidence: none",
		}
	}

	ratio := float64(withData) / float64(total)
	ratio = math.Round(ratio*100) / 100

	label := "very_low"
	switch {
	case ratio >= 0.9:
		label = "high"
	case ratio >= 0.7:
		label = "medium"
	case ratio >= 0.5:
		label = "low"
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(ratio),
		Confidence: ratio,
		Findings: map[string]interface{}{
			"completeness_ratio": ratio,
			"label":              label,
			"modules_with_data":  withData,
			"applicable_modules": total,
		},
		Explanation: fmt.Sprintf("Confidence: %s (%.0f%% — %d/%d modules have data)", label, ratio*100, withData, total),
	}
}
