package appraisal

import (
	"fmt"
)

// M10CrossTLD checks if the SLD is registered in other popular TLDs.
type M10CrossTLD struct{}

func (m *M10CrossTLD) Name() string { return "m10_cross" }

func (m *M10CrossTLD) Execute(domain string, ctx *ToolContext) ToolResult {
	tld := ctx.TLD
	isCom := tld == "com"
	penalty := 1.0

	// In Phase 2, this will do actual RDAP lookups on 8 candidate TLDs
	// For now, apply a simple heuristic
	if !isCom {
		penalty = 0.7
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(penalty),
		Confidence: 0.5,
		Findings: map[string]interface{}{
			"is_com":     isCom,
			"multiplier": penalty,
			"note":       "Cross-TLD check placeholder — RDAP cross-check pending (Phase 2)",
		},
		Explanation: fmt.Sprintf("Cross-TLD: %s (penalty: %.1f)", map[bool]string{true: "is .com", false: "not .com"}[isCom], penalty),
	}
}
