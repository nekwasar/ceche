package appraisal

import "fmt"

// ReviewInterface defines the structured review questions for the AI agent.
// Each tool has specific questions the agent must answer before pricing.
type ReviewInterface struct {
	// Tool reviews
	ToolReviews map[string]ToolReview `json:"tool_reviews"`

	// Weight adjustments
	WeightAdjustments map[string]float64 `json:"weight_adjustments"`

	// Final price decision
	FinalPrice    float64 `json:"final_price"`
	PriceRange    [2]float64 `json:"price_range"`
	Confidence    string `json:"confidence"`
	Explanation   string `json:"explanation"`
}

// ToolReview represents the AI agent's review of a single tool's output
type ToolReview struct {
	ToolName        string                 `json:"tool_name"`
	Correct         bool                   `json:"correct"`
	WeightAdjustment float64               `json:"weight_adjustment"`
	Justification   string                 `json:"justification"`
	ContextAdded    string                 `json:"context_added"`
	Confidence      string                 `json:"confidence"` // high, medium, low
}

// ReviewQuestions defines what the AI agent must answer for each tool
var ReviewQuestions = map[string][]ReviewQuestion{
	"m3_length": {
		{Question: "Is this length appropriate for the domain type?", Type: "boolean"},
		{Question: "Should length matter more or less for this domain?", Type: "weight_adjustment"},
		{Question: "Any context the algorithm missed about length?", Type: "text"},
	},
	"m4_word_count": {
		{Question: "Is the word count correct?", Type: "boolean"},
		{Question: "Should word count matter more or less for this domain?", Type: "weight_adjustment"},
		{Question: "Are the segmented words meaningful?", Type: "boolean"},
	},
	"m5_pronounce": {
		{Question: "Can this be pronounced on first reading?", Type: "boolean"},
		{Question: "Does it follow natural phonotactic rules?", Type: "boolean"},
		{Question: "Should pronounceability matter more or less?", Type: "weight_adjustment"},
	},
	"m6_segmenter": {
		{Question: "Is the segmentation correct?", Type: "boolean"},
		{Question: "Are the segmented words meaningful?", Type: "boolean"},
		{Question: "Should segmentation quality matter more or less?", Type: "weight_adjustment"},
	},
	"m16_brandability": {
		{Question: "Is this name memorable?", Type: "boolean"},
		{Question: "Does it evoke positive associations?", Type: "boolean"},
		{Question: "Would you remember this after hearing it once?", Type: "boolean"},
		{Question: "Should brandability matter more or less?", Type: "weight_adjustment"},
	},
	"m1_rdap": {
		{Question: "Is the domain age data accurate?", Type: "boolean"},
		{Question: "Should domain age matter more or less?", Type: "weight_adjustment"},
	},
	"m8_spam": {
		{Question: "Is the spam status accurate?", Type: "boolean"},
		{Question: "Should spam status matter more or less?", Type: "weight_adjustment"},
	},
	"m9_search": {
		{Question: "Is the web presence data accurate?", Type: "boolean"},
		{Question: "Should web presence matter more or less?", Type: "weight_adjustment"},
		{Question: "Any context about how the domain is used?", Type: "text"},
	},
	"m10_cross": {
		{Question: "Is the cross-TLD data accurate?", Type: "boolean"},
		{Question: "Should cross-TLD registration matter more or less?", Type: "weight_adjustment"},
	},
	"m11_trademark": {
		{Question: "Is the trademark risk assessment accurate?", Type: "boolean"},
		{Question: "Should trademark risk matter more or less?", Type: "weight_adjustment"},
		{Question: "Any known trademark conflicts?", Type: "text"},
	},
	"m12_authority": {
		{Question: "Is the authority data accurate?", Type: "boolean"},
		{Question: "Should authority matter more or less?", Type: "weight_adjustment"},
	},
	"m14_social": {
		{Question: "Is the social availability data accurate?", Type: "boolean"},
		{Question: "Should social availability matter more or less?", Type: "weight_adjustment"},
	},
}

// ReviewQuestion defines a single question for the AI agent
type ReviewQuestion struct {
	Question string `json:"question"`
	Type     string `json:"type"` // boolean, weight_adjustment, text
}

// DefaultWeights defines the default weights for each dimension
var DefaultWeights = map[string]float64{
	"m3_length":       0.25,
	"m4_word_count":   0.15,
	"m5_pronounce":    0.10,
	"m6_segmenter":    0.15,
	"m16_brandability": 0.20,
	"m2_tld_table":    0.15,
}

// WeightBounds defines the min/max for each weight
var WeightBounds = map[string][2]float64{
	"m3_length":       {0.15, 0.35},
	"m4_word_count":   {0.10, 0.25},
	"m5_pronounce":    {0.05, 0.20},
	"m6_segmenter":    {0.10, 0.25},
	"m16_brandability": {0.10, 0.30},
	"m2_tld_table":    {0.10, 0.25},
}

// EscalationThresholds define when adjustments need justification
var EscalationThresholds = map[string]float64{
	"m3_length":       0.10,
	"m4_word_count":   0.05,
	"m5_pronounce":    0.05,
	"m6_segmenter":    0.05,
	"m16_brandability": 0.10,
	"m2_tld_table":    0.10,
}

// ReviewInterfaceFromTools creates a review interface from tool results
func ReviewInterfaceFromTools(domain string, results map[string]ToolResult) ReviewInterface {
	reviews := make(map[string]ToolReview)

	// Initialize reviews for each dimension
	for toolName := range DefaultWeights {
		if toolResult, ok := results[toolName]; ok {
			reviews[toolName] = ToolReview{
				ToolName:         toolName,
				Correct:          true,
				WeightAdjustment: 0,
				Justification:    "Algorithm result accepted",
				ContextAdded:     "",
				Confidence:       "high",
			}
			_ = toolResult // Available for context if needed
		}
	}

	return ReviewInterface{
		ToolReviews:      reviews,
		WeightAdjustments: make(map[string]float64),
		FinalPrice:       0,
		PriceRange:       [2]float64{0, 0},
		Confidence:       "pending",
		Explanation:      "",
	}
}

// ApplyWeightAdjustments applies the AI agent's weight adjustments
func ApplyWeightAdjustments(defaults map[string]float64, adjustments map[string]float64) map[string]float64 {
	adjusted := make(map[string]float64)

	// Start with defaults
	for k, v := range defaults {
		adjusted[k] = v
	}

	// Apply adjustments
	for toolName, adjustment := range adjustments {
		if bounds, ok := WeightBounds[toolName]; ok {
			newWeight := adjusted[toolName] + adjustment
			// Clamp to bounds
			if newWeight < bounds[0] {
				newWeight = bounds[0]
			}
			if newWeight > bounds[1] {
				newWeight = bounds[1]
			}
			adjusted[toolName] = newWeight
		}
	}

	// Normalize to sum to 1.0
	total := 0.0
	for _, v := range adjusted {
		total += v
	}
	if total > 0 {
		for k := range adjusted {
			adjusted[k] /= total
		}
	}

	return adjusted
}

// CalculateWeightedScore calculates the score using adjusted weights
func CalculateWeightedScore(results map[string]ToolResult, weights map[string]float64) float64 {
	totalScore := 0.0
	totalWeight := 0.0

	for toolName, weight := range weights {
		if toolResult, ok := results[toolName]; ok {
			score := extractScore(toolResult, toolName)
			totalScore += score * weight
			totalWeight += weight
		}
	}

	if totalWeight > 0 {
		return totalScore / totalWeight
	}
	return 50.0
}

// GenerateReviewPrompt generates the prompt for the AI agent
func GenerateReviewPrompt(domain string, results map[string]ToolResult) string {
	prompt := fmt.Sprintf("## Domain Appraisal Review: %s\n\n", domain)
	prompt += "Please review each dimension and provide your assessment:\n\n"

	for toolName, questions := range ReviewQuestions {
		if toolResult, ok := results[toolName]; ok {
			prompt += fmt.Sprintf("### %s\n", toolName)
			prompt += fmt.Sprintf("Algorithm result: score=%.1f, multiplier=%.1fx\n",
				extractScore(toolResult, toolName),
				getMultiplier(toolResult))

			for _, q := range questions {
				prompt += fmt.Sprintf("- [%s] %s\n", q.Type, q.Question)
			}
			prompt += "\n"
		}
	}

	prompt += "### Weight Adjustments\n"
	prompt += "For each dimension, specify weight adjustment (e.g., +0.05 or -0.05):\n"
	for toolName := range DefaultWeights {
		prompt += fmt.Sprintf("- %s: [adjustment]\n", toolName)
	}

	prompt += "\n### Final Price\n"
	prompt += "Based on your review, provide:\n"
	prompt += "- Final price estimate\n"
	prompt += "- Confidence level (high/medium/low)\n"
	prompt += "- Explanation of your reasoning\n"

	return prompt
}

// Helper functions
func getMultiplier(result ToolResult) float64 {
	if result.Multiplier != nil {
		return *result.Multiplier
	}
	return 1.0
}
