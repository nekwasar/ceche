package appraisal

import (
	"encoding/json"
	"time"
)

// ToolResult is the universal return type from every appraisal tool.
type ToolResult struct {
	Tool       string                 `json:"tool"`
	Domain     string                 `json:"domain"`
	Status     string                 `json:"status"` // "success", "error", "skipped"
	Multiplier *float64               `json:"multiplier"`
	Confidence float64                `json:"confidence"`
	Findings   map[string]interface{} `json:"findings"`
	Explanation string                `json:"explanation"`
}

// AppraisalMetrics holds all module results and the final valuation.
type AppraisalMetrics struct {
	Domain            string                 `json:"domain"`
	SLD               string                 `json:"sld"`
	TLD               string                 `json:"tld"`
	Score             int                    `json:"score"`
	EstimatedValue    float64                `json:"estimated_value"`
	RangeLow          float64                `json:"range_low"`
	RangeHigh         float64                `json:"range_high"`
	Confidence        string                 `json:"confidence"`
	CompletenessRatio float64                `json:"completeness_ratio"`
	WeightProfile     string                 `json:"weight_profile"`
	Tools             map[string]ToolResult  `json:"tools"`
	Version           string                 `json:"version"`
	GeneratedAt       time.Time              `json:"generated_at"`
}

// Tool is the interface that all appraisal modules must implement.
type Tool interface {
	Name() string
	Execute(domain string, ctx *ToolContext) ToolResult
}

// ToolContext carries data between tools in the pipeline.
type ToolContext struct {
	Domain    string
	SLD       string
	TLD       string
	Words     []string
	WordCount int
	SplitStatus string // "split_found", "brandable"
	Results   map[string]ToolResult
}

// SerializeMetrics converts AppraisalMetrics to JSON bytes.
func SerializeMetrics(m AppraisalMetrics) ([]byte, error) {
	return json.Marshal(m)
}
