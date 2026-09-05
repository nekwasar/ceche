package appraisal

import (
	"fmt"
	"strings"
	"time"
)

// Orchestrator runs the 6-phase appraisal pipeline.
type Orchestrator struct {
	tools   map[string]Tool
	results map[string]ToolResult
}

// NewOrchestrator creates a new orchestrator with all tools registered.
func NewOrchestrator() *Orchestrator {
	o := &Orchestrator{
		tools:   make(map[string]Tool),
		results: make(map[string]ToolResult),
	}

	// Register all tools
	o.Register(&M1RDAP{})
	o.Register(&M2TLD{})
	o.Register(&M3Length{})
	o.Register(&M4WordCount{})
	o.Register(&M5Pronounceability{})
	o.Register(&M6Segmenter{})
	o.Register(&M7Keyword{})
	o.Register(&M8CPC{})
	o.Register(&M8SpamCheck{})
	o.Register(&M9Search{})
	o.Register(&M10CrossTLD{})
	o.Register(&M11DNSHistory{})
	o.Register(&M12Authority{})
	o.Register(&M13Confidence{})
	o.Register(&M15Pricing{})
	o.Register(&M16Brandability{})

	return o
}

// Register adds a tool to the orchestrator.
func (o *Orchestrator) Register(tool Tool) {
	o.tools[tool.Name()] = tool
}

// GetTool returns a tool by name.
func (o *Orchestrator) GetTool(name string) Tool {
	return o.tools[name]
}

// ListTools returns all registered tool names.
func (o *Orchestrator) ListTools() []string {
	names := make([]string, 0, len(o.tools))
	for name := range o.tools {
		names = append(names, name)
	}
	return names
}

// Run executes the full 6-phase appraisal pipeline.
func (o *Orchestrator) Run(domain string) AppraisalMetrics {
	o.results = make(map[string]ToolResult)

	domain = strings.ToLower(domain)
	sld := domain
	tld := ""
	if idx := strings.LastIndex(domain, "."); idx != -1 {
		tld = domain[idx+1:]
		sld = domain[:idx]
	}

	ctx := &ToolContext{
		Domain:  domain,
		SLD:     sld,
		TLD:     tld,
		Results: o.results,
	}

	// Phase 1: Parallel data collection
	o.runPhase1(domain, ctx)

	// Phase 2: Sequential processing (M3, M4, M5)
	o.runPhase2(domain, ctx)

	// Phase 3: Conditional (if split found: M7, M8, M9, M11)
	o.runPhase3(domain, ctx)

	// Phase 4: Parallel (M9, M10, M12)
	o.runPhase4(domain, ctx)

	// Phase 5: Conditional (if brandable: M8 re-run, M16)
	o.runPhase5(domain, ctx)

	// Phase 6: Final (M13, M15)
	o.runPhase6(domain, ctx)

	// Build response
	return o.buildResponse(domain, sld, tld, ctx)
}

// RunSingleTool executes a single tool by name.
func (o *Orchestrator) RunSingleTool(toolName, domain string, ctx *ToolContext) ToolResult {
	tool := o.tools[toolName]
	if tool == nil {
		return ToolResult{
			Tool:       toolName,
			Domain:     domain,
			Status:     "error",
			Explanation: fmt.Sprintf("Tool '%s' not found", toolName),
		}
	}
	return tool.Execute(domain, ctx)
}

// Phase 1: Parallel data collection (M1, M2, M6)
func (o *Orchestrator) runPhase1(domain string, ctx *ToolContext) {
	m1 := o.tools["m1_rdap"]
	m2 := o.tools["m2_tld_table"]
	m6 := o.tools["m6_segmenter"]

	o.results["m1_rdap"] = m1.Execute(domain, ctx)
	o.results["m2_tld_table"] = m2.Execute(domain, ctx)

	m6Result := m6.Execute(domain, ctx)
	o.results["m6_segmenter"] = m6Result

	// Extract segmentation results into context
	if m6Result.Findings != nil {
		if winner, ok := m6Result.Findings["winner"].([]string); ok {
			ctx.Words = winner
		}
		if wc, ok := m6Result.Findings["word_count"].(int); ok {
			ctx.WordCount = wc
		}
		if status, ok := m6Result.Findings["intent"].(string); ok {
			ctx.SplitStatus = status
		} else if status, ok := m6Result.Findings["status"].(string); ok {
			ctx.SplitStatus = status
		}
	}
}

// Phase 2: Sequential processing (M3, M4, M5)
func (o *Orchestrator) runPhase2(domain string, ctx *ToolContext) {
	m3 := o.tools["m3_length"]
	m4 := o.tools["m4_word_count"]
	m5 := o.tools["m5_pronounceability"]

	o.results["m3_length"] = m3.Execute(domain, ctx)
	o.results["m4_word_count"] = m4.Execute(domain, ctx)
	o.results["m5_pronounceability"] = m5.Execute(domain, ctx)
}

// Phase 3: Conditional — if brandable keywords found
func (o *Orchestrator) runPhase3(domain string, ctx *ToolContext) {
	if ctx.SplitStatus == IntentBrand || ctx.SplitStatus == "" {
		return // Skip — will be handled in Phase 5
	}

	m7 := o.tools["m7_keyword"]
	m8 := o.tools["m8_cpc"]
	m9 := o.tools["m9_search"]

	o.results["m7_keyword"] = m7.Execute(domain, ctx)
	o.results["m8_cpc"] = m8.Execute(domain, ctx)
	o.results["m9_search"] = m9.Execute(domain, ctx)
}

// Phase 4: Parallel (M8_spam, M9, M10, M11_dns, M12)
func (o *Orchestrator) runPhase4(domain string, ctx *ToolContext) {
	m8spam := o.tools["m8_spam"]
	m9 := o.tools["m9_search"]
	m10 := o.tools["m10_cross_tld"]
	m11dns := o.tools["m11_dns_history"]
	m12 := o.tools["m12_authority"]

	// Run spam check (real API integration)
	o.results["m8_spam"] = m8spam.Execute(domain, ctx)

	// Run DNS history check (real API integration)
	o.results["m11_dns_history"] = m11dns.Execute(domain, ctx)

	if _, ok := o.results["m9_search"]; !ok {
		o.results["m9_search"] = m9.Execute(domain, ctx)
	}
	o.results["m10_cross_tld"] = m10.Execute(domain, ctx)
	o.results["m12_authority"] = m12.Execute(domain, ctx)
}

// Phase 5: Conditional — brandable domains get M16
func (o *Orchestrator) runPhase5(domain string, ctx *ToolContext) {
	if ctx.SplitStatus != IntentBrand && ctx.SplitStatus != "" {
		return // Not brandable — skip
	}

	m8 := o.tools["m8_cpc"]
	m16 := o.tools["m16_brandability"]

	o.results["m8_cpc"] = m8.Execute(domain, ctx)
	o.results["m16_brandability"] = m16.Execute(domain, ctx)
}

// Phase 6: Final (M13, M15)
func (o *Orchestrator) runPhase6(domain string, ctx *ToolContext) {
	m13 := o.tools["m13_confidence"]
	m15 := o.tools["m15_pricing"]

	o.results["m13_confidence"] = m13.Execute(domain, ctx)
	o.results["m15_pricing"] = m15.Execute(domain, ctx)
}

// buildResponse constructs the final AppraisalMetrics.
func (o *Orchestrator) buildResponse(domain, sld, tld string, ctx *ToolContext) AppraisalMetrics {
	m15 := o.results["m15_pricing"]
	m13 := o.results["m13_confidence"]

	score := 0
	if m15.Multiplier != nil {
		score = normalizeScore(*m15.Multiplier, o.results)
	}

	estimatedValue := 0.0
	rangeLow := 0.0
	rangeHigh := 0.0
	if m15.Findings != nil {
		if v, ok := m15.Findings["estimated_value"].(float64); ok {
			estimatedValue = v
		}
		if v, ok := m15.Findings["range_low"].(float64); ok {
			rangeLow = v
		}
		if v, ok := m15.Findings["range_high"].(float64); ok {
			rangeHigh = v
		}
	}

	confidence := "none"
	completeness := 0.0
	if m13.Findings != nil {
		if l, ok := m13.Findings["label"].(string); ok {
			confidence = l
		}
		if c, ok := m13.Findings["completeness_ratio"].(float64); ok {
			completeness = c
		}
	}

	weightProfile := ""
	if m2, ok := o.results["m2_tld_table"]; ok {
		if p, ok := m2.Findings["weight_profile"].(string); ok {
			weightProfile = p
		}
	}

	return AppraisalMetrics{
		Domain:            domain,
		SLD:               sld,
		TLD:               tld,
		Score:             score,
		EstimatedValue:    estimatedValue,
		RangeLow:          rangeLow,
		RangeHigh:         rangeHigh,
		Confidence:        confidence,
		CompletenessRatio: completeness,
		WeightProfile:     weightProfile,
		Tools:             o.results,
		Version:           "1.0.0",
		GeneratedAt:       time.Now().UTC(),
	}
}

func normalizeScore(value float64, results map[string]ToolResult) int {
	if value <= 0 {
		return 5
	}

	logVal := 0.0
	if value > 0 {
		logVal = logBase10(value + 1)
	}
	score := int(round(logVal * 15))

	if m3, ok := results["m3_length"]; ok && m3.Multiplier != nil && *m3.Multiplier >= 8.0 {
		score += 10
	}
	if m5, ok := results["m5_pronounceability"]; ok && m5.Multiplier != nil && *m5.Multiplier >= 1.5 {
		score += 5
	}
	if m16, ok := results["m16_brandability"]; ok && m16.Multiplier != nil && *m16.Multiplier >= 5.0 {
		score += 8
	}

	if score > 100 {
		score = 100
	}
	if score < 1 {
		score = 1
	}
	return score
}

func logBase10(x float64) float64 {
	if x <= 0 {
		return 0
	}
	// Simple log10 implementation
	result := 0.0
	for x >= 10 {
		x /= 10
		result++
	}
	for x < 1 {
		x *= 10
		result--
	}
	return result
}

func round(x float64) float64 {
	return float64(int(x + 0.5))
}
