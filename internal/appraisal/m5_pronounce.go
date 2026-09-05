package appraisal

import (
	"fmt"
	"math"
)

// M5Pronounceability scores how pronounceable the SLD is.
type M5Pronounceability struct{}

func (m *M5Pronounceability) Name() string { return "m5_pronounce" }

var vowelsMap = map[byte]bool{
	'a': true, 'e': true, 'i': true, 'o': true, 'u': true,
}

func isVowel(c byte) bool {
	return vowelsMap[c]
}

var bigramFrequency = map[string]float64{
	"th": 1.0, "he": 0.94, "in": 0.88, "er": 0.85, "an": 0.82,
	"on": 0.78, "at": 0.76, "en": 0.74, "nd": 0.72, "ti": 0.70,
	"es": 0.68, "or": 0.66, "te": 0.64, "of": 0.62, "ed": 0.60,
	"is": 0.58, "it": 0.56, "al": 0.54, "ar": 0.52, "st": 0.50,
	"to": 0.48, "nt": 0.46, "ng": 0.44, "se": 0.42, "ha": 0.40,
}

func (m *M5Pronounceability) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD
	length := len(sld)

	if length <= 2 {
		return ToolResult{
			Tool:       m.Name(),
			Domain:     domain,
			Status:     "success",
			Multiplier: float64Ptr(2.0),
			Confidence: 1.0,
			Findings: map[string]interface{}{
				"score": 100.0, "multiplier": 2.0, "length": length,
			},
			Explanation: "Short domain (2 chars) — automatically highly pronounceable",
		}
	}

	vScore := vowelScore(sld)
	cScore := clusterScore(sld)
	bScore := bigramScoreCalc(sld)

	score := vScore*0.4 + cScore*0.3 + bScore*0.3
	score = clamp(score, 0, 100)

	// Double vowel penalty
	hasDoubleVowel := false
	sldBytes := []byte(sld)
	for i := 0; i < len(sldBytes)-1; i++ {
		if isVowel(sldBytes[i]) && sldBytes[i] == sldBytes[i+1] {
			hasDoubleVowel = true
			break
		}
	}
	if hasDoubleVowel {
		score *= 0.4
	}

	mult := 1.0
	switch {
	case score >= 90:
		mult = 2.0
	case score >= 70:
		mult = 1.5
	case score >= 40:
		mult = 1.2
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: 1.0,
		Findings: map[string]interface{}{
			"score":         math.Round(score*100) / 100,
			"multiplier":    mult,
			"vowel_score":   math.Round(vScore*100) / 100,
			"cluster_score": math.Round(cScore*100) / 100,
			"bigram_score":  math.Round(bScore*100) / 100,
			"double_vowel":  hasDoubleVowel,
		},
		Explanation: fmt.Sprintf("Pronounceability score: %.0f/100 (vowel: %.0f, cluster: %.0f, bigram: %.0f)%s",
			score, vScore, cScore, bScore, map[bool]string{true: " — double vowel penalty", false: ""}[hasDoubleVowel]),
	}
}

func vowelScore(sld string) float64 {
	vowelCount := 0
	for _, c := range []byte(sld) {
		if isVowel(c) {
			vowelCount++
		}
	}
	ratio := float64(vowelCount) / float64(len(sld))
	if ratio > 0.80 {
		return 10.0
	}
	return 100.0 * (1.0 - math.Abs(ratio-0.40)/0.40)
}

func clusterScore(sld string) float64 {
	maxRun := 0
	currentRun := 0
	for _, c := range []byte(sld) {
		if !isVowel(c) {
			currentRun++
			if currentRun > maxRun {
				maxRun = currentRun
			}
		} else {
			currentRun = 0
		}
	}

	switch {
	case maxRun <= 2:
		return 100.0
	case maxRun == 3:
		return 70.0
	case maxRun == 4:
		return 30.0
	default:
		return math.Max(0, 10-float64(maxRun-4)*3)
	}
}

func bigramScoreCalc(sld string) float64 {
	sldBytes := []byte(sld)
	if len(sldBytes) < 2 {
		return 50.0
	}
	total := 0.0
	count := 0
	for i := 0; i < len(sldBytes)-1; i++ {
		bigram := string(sldBytes[i : i+2])
		if freq, ok := bigramFrequency[bigram]; ok {
			total += freq
		} else {
			total += 0.05
		}
		count++
	}
	if count == 0 {
		return 50.0
	}
	return (total / float64(count)) * 100.0
}
