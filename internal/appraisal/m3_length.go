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

	// Sigmoid scoring — shorter = exponentially more valuable
	score := 100.0 * (1.0 - 1.0/(1.0+math.Exp(-0.8*(float64(length)-5))))
	score = clamp(score, 0, 100)

	// Single and double character domains are always premium
	if length <= 2 {
		score = 100.0
	} else if length == 3 {
		score = math.Max(score, 90.0)
	} else if length == 4 {
		score = math.Max(score, 80.0)
	}

	// Dictionary word bonus — real words get high scores regardless of length
	isDict := isKnownWord(sld)
	if isDict {
		// Commercial keywords get highest scores
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
			score = 100.0 // Premium commercial keyword
		} else {
			score = 95.0 // Regular dictionary word
		}
	} else {
		// Non-dictionary — length-based scoring
		switch {
		case length <= 2:
			score = 100.0 // Single/double char — premium
		case length == 3:
			score = 90.0
		case length == 4:
			score = 80.0
		case length <= 6:
			score = 60.0
		case length <= 8:
			score = 40.0
		case length <= 10:
			score = 25.0
		default:
			score = 15.0
		}
	}

	// Multiplier from length — premium for ultra-short domains
	mult := 1.0
	switch {
	case length <= 1:
		mult = 15.0 // Single char — ultra premium
	case length == 2:
		mult = 10.0 // Two chars — extremely premium
	case length == 3:
		mult = 4.0  // Three chars — very premium
	case length == 4:
		mult = 4.0  // Four chars — premium
	case length <= 6:
		mult = 2.5  // Short — good
	case length <= 8:
		mult = 1.8  // Medium
	case length <= 10:
		mult = 1.2  // Average
	default:
		mult = 1.0  // Long
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
