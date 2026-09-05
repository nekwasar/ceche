package appraisal

import (
	"fmt"
	"math"
)

// M4WordCount scores the domain based on word count from M6.
type M4WordCount struct{}

func (m *M4WordCount) Name() string { return "m4_word_count" }

func (m *M4WordCount) Execute(domain string, ctx *ToolContext) ToolResult {
	wordCount := ctx.WordCount
	if wordCount < 1 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "skipped",
			Multiplier: nil,
			Confidence: 0.0,
			Findings:   map[string]interface{}{"reason": "no word count available"},
			Explanation: "Skipped: no word count available from segmentation",
		}
	}

	// Exponential decay scoring
	score := 100.0 * math.Exp(-0.5*(float64(wordCount)-1))
	score = clamp(score, 0, 100)

	// Multiplier
	mult := 1.0
	switch {
	case wordCount <= 1:
		mult = 8.0  // Single word — premium
	case wordCount <= 2:
		mult = 3.0  // Two words — good
	case wordCount <= 3:
		mult = 1.5  // Three words — average
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: 1.0,
		Findings: map[string]interface{}{
			"word_count": wordCount,
			"score":      math.Round(score*100) / 100,
			"multiplier": mult,
		},
		Explanation: fmt.Sprintf("Domain contains %d word(s) (score: %.0f, multiplier: %.1fx)", wordCount, score, mult),
	}
}
