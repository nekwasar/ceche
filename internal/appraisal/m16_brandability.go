package appraisal

import (
	"fmt"
	"math"
)

// M16Brandability rates the quality of a brandable domain.
type M16Brandability struct{}

func (m *M16Brandability) Name() string { return "m16_brandability" }

var strongEndings = []string{
	"ify", "ly", "ex", "io", "ox", "ix", "ux", "oo", "ee",
	"ia", "elle", "ora", "ina", "ara", "ica", "ota", "ula", "ena",
	"va", "vi", "vo", "vu", "ka", "ke", "ki", "ko", "ku",
	"ba", "be", "bi", "bo", "bu", "da", "de", "di", "do", "du",
	"fa", "fe", "fi", "fo", "mi", "na", "ne", "ni", "no", "nu",
	"pa", "pe", "pi", "po", "pu", "ta", "te", "ti", "to", "tu",
	"za", "ze", "zi", "zo",
}

func (m *M16Brandability) Execute(domain string, ctx *ToolContext) ToolResult {
	sld := ctx.SLD
	score := 0.0
	data := map[string]interface{}{
		"is_dictionary":  false,
		"syllable_count": 0,
		"pattern_type":   "unknown",
		"ending_quality": "none",
	}

	// Syllable flow (40% weight)
	syllableScore := syllableFlowScore(sld)

	// Pattern score (30% weight)
	patternScore := brandPatternScore(sld)

	// Length score (30% weight)
	lengthScore := brandLengthScore(len(sld))

	score = syllableScore*0.4 + patternScore*0.3 + lengthScore*0.3
	score = clamp(score, 0, 100)

	// Adjustments
	hasVowels := false
	hasDoubleVowel := false
	maxConsonantRun := 0
	currentRun := 0
	sldBytes := []byte(sld)

	for i := 0; i < len(sldBytes); i++ {
		if isVowel(sldBytes[i]) {
			hasVowels = true
			currentRun = 0
		} else {
			currentRun++
			if currentRun > maxConsonantRun {
				maxConsonantRun = currentRun
			}
		}
		if i > 0 && isVowel(sldBytes[i]) && isVowel(sldBytes[i-1]) {
			hasDoubleVowel = true
		}
	}

	if !hasVowels {
		score = math.Min(score, 15)
	}
	for _, c := range sldBytes {
		if c >= '0' && c <= '9' {
			score = math.Min(score, 30)
			break
		}
	}
	if hasDoubleVowel {
		score = math.Min(score, 40)
	}
	if !hasDoubleVowel && maxConsonantRun <= 3 && len(sld) <= 8 && hasVowels {
		score *= 1.5
	}
	score = clamp(score, 0, 100)

	// Check for dictionary word
	if isKnownWord(sld) {
		data["is_dictionary"] = true
	}

	data["syllable_count"] = countSyllables(sld)
	data["pattern_score"] = math.Round(patternScore*100) / 100
	data["length_score"] = math.Round(lengthScore*100) / 100
	data["syllable_score"] = math.Round(syllableScore*100) / 100
	data["double_vowel"] = hasDoubleVowel

	// Multiplier
	mult := 1.0
	switch {
	case score >= 80:
		mult = 8.0
	case score >= 60:
		mult = 5.0
	case score >= 40:
		mult = 3.0
	case score >= 20:
		mult = 2.0
	}

	return ToolResult{
		Tool:       m.Name(),
		Domain:     domain,
		Status:     "success",
		Multiplier: float64Ptr(mult),
		Confidence: math.Min(1.0, score/100.0),
		Findings:   data,
		Explanation: fmt.Sprintf("Brandability score: %.0f/100 (syllable: %.0f, pattern: %.0f, length: %.0f) — multiplier: %.1fx",
			score, syllableScore, patternScore, lengthScore, mult),
	}
}

func syllableFlowScore(sld string) float64 {
	transitions := 0
	sldBytes := []byte(sld)
	for i := 1; i < len(sldBytes); i++ {
		if !isVowel(sldBytes[i-1]) && isVowel(sldBytes[i]) {
			transitions++
		}
	}

	switch transitions {
	case 2:
		return 100.0
	case 3:
		return 90.0
	case 1:
		return 40.0
	case 4:
		return 60.0
	case 5:
		return 30.0
	default:
		if transitions > 5 {
			return math.Max(5, 10-float64(transitions-5)*2)
		}
		return 20.0
	}
}

func brandPatternScore(sld string) float64 {
	score := 35.0
	sldBytes := []byte(sld)

	// Strong ending bonus
	for _, ending := range strongEndings {
		if len(sld) >= len(ending) && sld[len(sld)-len(ending):] == ending {
			score += 20.0
			break
		}
	}

	// CVC pattern bonus
	cvcCount := 0
	for i := 0; i < len(sldBytes)-2; i++ {
		if !isVowel(sldBytes[i]) && isVowel(sldBytes[i+1]) && !isVowel(sldBytes[i+2]) {
			cvcCount++
		}
	}
	score += math.Min(30, float64(cvcCount)*10)

	// Double letter bonus
	doubleCount := 0
	for i := 0; i < len(sldBytes)-1; i++ {
		if sldBytes[i] == sldBytes[i+1] {
			doubleCount++
		}
	}
	score += math.Min(15, float64(doubleCount)*5)

	return clamp(score, 0, 100)
}

func brandLengthScore(length int) float64 {
	switch {
	case length <= 1:
		return 20.0
	case length <= 2:
		return 40.0
	case length <= 3:
		return 60.0
	case length <= 7:
		return 100.0
	default:
		return math.Max(10, 100-float64(length-7)*12)
	}
}

func countSyllables(sld string) int {
	count := 0
	sldBytes := []byte(sld)
	inVowel := false
	for _, c := range sldBytes {
		if isVowel(c) {
			if !inVowel {
				count++
			}
			inVowel = true
		} else {
			inVowel = false
		}
	}
	if count == 0 {
		count = 1
	}
	return count
}
