package appraisal

import (
	"fmt"
	"math"
	"strings"
)

// M6Segmenter splits the SLD into words and determines commercial intent.
// Unlike the Python CLI (brandable vs keyword), this version grades keywords
// by commercial intent: high, mid, low, or brandable.
type M6Segmenter struct{}

func (m *M6Segmenter) Name() string { return "m6_segmenter" }

// GradedIntent levels
const (
	IntentHigh   = "high_intent"
	IntentMid    = "mid_intent"
	IntentLow    = "low_intent"
	IntentBrand  = "brandable"
)

// executeSegmenter performs word segmentation and grades commercial intent.
func (m *M6Segmenter) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := strings.ToLower(ctx.SLD)

	// Try to segment the SLD into words
	candidates := generateCandidates(sld)

	if len(candidates) == 0 {
		// No split found — brandable
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "success",
			Multiplier: nil,
			Confidence: 0.6,
			Findings: map[string]interface{}{
				"winner":      nil,
				"word_count":  0,
				"segmented":   "",
				"status":      IntentBrand,
				"intent":      IntentBrand,
				"intent_score": 0.0,
				"candidates":  []string{},
			},
			Explanation: fmt.Sprintf("'%s' could not be segmented into dictionary words — classified as brandable", sld),
		}
	}

	best := candidates[0]
	quality := segmentQuality(best, sld)

	// Grade commercial intent based on word categories
	intent, intentScore := gradeIntent(best)

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: nil,
		Confidence: quality,
		Findings: map[string]interface{}{
			"winner":      best,
			"word_count":  len(best),
			"segmented":   strings.Join(best, " "),
			"quality":     math.Round(quality*100) / 100,
			"status":      IntentBrand,
			"intent":      intent,
			"intent_score": math.Round(intentScore*100) / 100,
			"method":      segmentMethod(best, sld),
		},
		Explanation: fmt.Sprintf("'%s' segmented into [%s] — intent: %s (score: %.0f)",
			sld, strings.Join(best, "+"), intent, intentScore),
	}
}

// gradeIntent determines the commercial intent of segmented words.
func gradeIntent(words []string) (string, float64) {
	highCount := 0
	midCount := 0
	lowCount := 0
	total := len(words)

	for _, w := range words {
		tier := lookupCPC(w)
		switch tier {
		case "elite", "high":
			highCount++
		case "medium_high", "medium":
			midCount++
		case "low", "informational":
			lowCount++
		}
	}

	if total == 0 {
		return IntentBrand, 0.0
	}

	ratio := float64(highCount) / float64(total)
	midRatio := float64(midCount) / float64(total)

	if ratio >= 0.5 {
		return IntentHigh, ratio * 100
	} else if ratio >= 0.25 || midRatio >= 0.5 {
		return IntentMid, (ratio + midRatio) * 100 / 2
	} else if highCount > 0 || midCount > 0 {
		return IntentLow, float64(highCount+midCount) / float64(total) * 50
	}

	return IntentBrand, 0.0
}

// lookupCPC checks a word against the graded wordlist.
func lookupCPC(word string) string {
	// Check high intent words
	for _, w := range highIntentWords {
		if w == word {
			return "high"
		}
	}
	// Check mid intent words
	for _, w := range midIntentWords {
		if w == word {
			return "medium"
		}
	}
	// Check low intent words
	for _, w := range lowIntentWords {
		if w == word {
			return "low"
		}
	}
	return ""
}

// generateCandidates produces word segmentation candidates.
func generateCandidates(sld string) [][]string {
	var candidates [][]string

	dictCands := dictSegment(sld)
	if len(dictCands) > 0 {
		candidates = append(candidates, dictCands...)
	}

	hybridCands := hybridSegment(sld)
	for _, c := range hybridCands {
		if !candidateExists(candidates, c) {
			candidates = append(candidates, c)
		}
	}

	vowelCands := vowelSegment(sld)
	for _, c := range vowelCands {
		if !candidateExists(candidates, c) {
			candidates = append(candidates, c)
		}
	}

	if len(candidates) == 0 {
		candidates = append(candidates, []string{sld})
	}

	// Score and sort candidates
	type scoredCandidate struct {
		words []string
		score float64
	}
	var scored []scoredCandidate

	for _, words := range candidates {
		score := 0.0
		for _, w := range words {
			if isKnownWord(w) {
				score += 20.0
			}
			if isCommonWord(w) {
				score += 15.0
			}
		}
		totalLen := 0
		for _, w := range words {
			totalLen += len(w)
		}
		coverage := float64(totalLen) / float64(len(sld))
		score += coverage * 25.0

		if len(words) == 1 {
			if len(words[0]) <= 6 {
				score += 15.0
			} else if len(words[0]) <= 10 {
				score += 8.0
			}
		} else if len(words) == 2 {
			score += 10.0
		} else if len(words) == 3 {
			score += 5.0
		}
		scored = append(scored, scoredCandidate{words: words, score: score})
	}

	// Sort by score descending
	for i := 0; i < len(scored)-1; i++ {
		for j := i + 1; j < len(scored); j++ {
			if scored[j].score > scored[i].score {
				scored[i], scored[j] = scored[j], scored[i]
			}
		}
	}

	result := make([][]string, len(scored))
	for i, sc := range scored {
		result[i] = sc.words
	}
	return result
}

func dictSegment(sld string) [][]string {
	var results [][]string
	minWordLen := 2
	maxDepth := 4

	var helper func(remaining string, current []string, depth int)
	helper = func(remaining string, current []string, depth int) {
		if depth >= maxDepth {
			return
		}
		if remaining == "" {
			if len(current) > 0 {
				cpy := make([]string, len(current))
				copy(cpy, current)
				results = append(results, cpy)
			}
			return
		}
		for end := minWordLen; end <= len(remaining) && end <= 12; end++ {
			word := remaining[:end]
			if isKnownWord(word) {
				rest := remaining[end:]
				helper(rest, append(current, word), depth+1)
			}
		}
	}
	helper(sld, nil, 0)
	return results
}

func hybridSegment(sld string) [][]string {
	var results [][]string
	for i := 3; i < len(sld)-2; i++ {
		left := sld[:i]
		right := sld[i:]
		leftCands := dictSegment(left)
		rightCands := dictSegment(right)
		for _, lw := range leftCands {
			for _, rw := range rightCands {
				combined := make([]string, 0, len(lw)+len(rw))
				combined = append(combined, lw...)
				combined = append(combined, rw...)
				if len(combined) <= 4 {
					results = append(results, combined)
				}
			}
		}
		if isKnownWord(left) && len(right) >= 2 {
			results = append(results, []string{left, right})
		}
		if isKnownWord(right) && len(left) >= 2 {
			results = append(results, []string{left, right})
		}
	}
	return results
}

func vowelSegment(sld string) [][]string {
	var results [][]string
	for i := 1; i < len(sld)-1; i++ {
		if isVowel(sld[i-1]) && !isVowel(sld[i]) {
			if i >= 2 && i <= len(sld)-2 {
				left := sld[:i]
				right := sld[i:]
				if len(left) >= 2 && len(right) >= 2 {
					results = append(results, []string{left, right})
				}
			}
		}
	}
	return results
}

func candidateExists(candidates [][]string, candidate []string) bool {
	for _, c := range candidates {
		if len(c) != len(candidate) {
			continue
		}
		match := true
		for i := range c {
			if c[i] != candidate[i] {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}

func segmentQuality(words []string, original string) float64 {
	if len(words) == 0 {
		return 0.0
	}
	quality := 0.5
	dictHits := 0
	for _, w := range words {
		if isKnownWord(w) {
			dictHits++
		}
	}
	dictRatio := float64(dictHits) / float64(len(words))
	quality += dictRatio * 0.2
	totalLen := 0
	for _, w := range words {
		totalLen += len(w)
	}
	coverage := float64(totalLen) / float64(len(original))
	quality += coverage * 0.15
	if len(words) <= 2 {
		quality += 0.1
	}
	return math.Min(1.0, quality)
}

func segmentMethod(words []string, original string) string {
	if len(words) == 1 && words[0] == original {
		return "unsegmented"
	}
	dictHits := 0
	for _, w := range words {
		if isKnownWord(w) {
			dictHits++
		}
	}
	if dictHits == len(words) {
		return "dictionary"
	}
	if dictHits > 0 {
		return "hybrid"
	}
	return "structural"
}
