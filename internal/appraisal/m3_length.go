package appraisal

import (
	"fmt"
	"math"
)

// M3Length scores the domain based on SLD length.
type M3Length struct{}

func (m *M3Length) Name() string { return "m3_length" }

func (m *M3Length) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD
	length := len(sld)

	// Sigmoid scoring
	score := 100.0 * (1.0 - 1.0/(1.0+math.Exp(-0.8*(float64(length)-5))))
	score = clamp(score, 0, 100)

	// Multiplier from score
	mult := 1.0
	switch {
	case score >= 95:
		mult = 15.0
	case score >= 75:
		mult = 8.0
	case score >= 50:
		mult = 2.0
	case score >= 25:
		mult = 1.2
	}

	// Digit penalty
	hasDigit := false
	for _, c := range sld {
		if c >= '0' && c <= '9' {
			hasDigit = true
			break
		}
	}
	if hasDigit {
		mult = math.Max(1.0, mult*0.3)
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: 1.0,
		Findings: map[string]interface{}{
			"raw_length": length,
			"score":      math.Round(score*100) / 100,
			"multiplier": mult,
			"has_digit":  hasDigit,
		},
		Explanation: fmt.Sprintf("SLD '%s' is %d chars long (score: %.0f, multiplier: %.1fx)%s",
			sld, length, score, mult, map[bool]string{true: " — digit penalty applied", false: ""}[hasDigit]),
	}
}
