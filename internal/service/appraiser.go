package v1

import (
	"math"
	"strings"
)

type ScoreMetrics struct {
	Length       int     `json:"length"`
	LengthScore  float64 `json:"length_score"`
	TLD          string  `json:"tld"`
	TLDScore     float64 `json:"tld_score"`
	BrandScore   float64 `json:"brand_score"`
	ReadScore    float64 `json:"read_score"`
	Dictionary   bool    `json:"dictionary"`
	DictionaryB  float64 `json:"dictionary_bonus"`
	Phonetic     float64 `json:"phonetic_score"`
	Total        int     `json:"total"`
}

var tldScores = map[string]float64{
	".com": 100,
	".net": 70,
	".io":  60,
	".co":  55,
}

var commonWords = map[string]bool{
	"go": true, "app": true, "web": true, "data": true, "net": true,
	"cloud": true, "tech": true, "dev": true, "hub": true, "lab": true,
	"box": true, "top": true, "pro": true, "max": true, "one": true,
	"ai": true, "api": true, "bit": true, "pay": true, "buy": true,
	"sell": true, "shop": true, "store": true, "market": true, "trade": true,
	"crypto": true, "block": true, "chain": true, "meta": true, "open": true,
	"fast": true, "quick": true, "easy": true, "smart": true, "blue": true,
	"red": true, "green": true, "black": true, "white": true, "gold": true,
	"silver": true, "prime": true, "ultra": true, "mega": true, "super": true,
	" nexus": true, "pulse": true, "spark": true, "flow": true, "sync": true,
	"core": true, "base": true, "flex": true, "zoom": true, "wave": true,
}

func scoreLength(name string) float64 {
	length := len(name)
	switch {
	case length <= 3:
		return 100
	case length <= 5:
		return 90
	case length <= 7:
		return 80
	case length <= 9:
		return 65
	case length <= 12:
		return 50
	default:
		return 30
	}
}

func scoreTLD(tld string) float64 {
	if score, ok := tldScores[tld]; ok {
		return score
	}
	return 40
}

func scoreBrand(name string) float64 {
	score := 50.0
	length := len(name)

	if length <= 5 {
		score += 20
	} else if length <= 8 {
		score += 10
	}

	if strings.ContainsAny(name, "aeiou") {
		score += 10
	}

	consonants := 0
	for _, c := range name {
		if !strings.ContainsRune("aeiou", c) {
			consonants++
		}
	}
	if consonants > 0 && consonants <= 3 {
		score += 10
	}

	return math.Min(score, 100)
}

func scoreReadability(name string) float64 {
	score := 60.0

	if len(name) <= 7 {
		score += 15
	} else if len(name) <= 10 {
		score += 5
	}

	vowelCount := 0
	for _, c := range name {
		if strings.ContainsRune("aeiou", c) {
			vowelCount++
		}
	}
	if vowelCount > 0 {
		score += 10
	}

	hasDouble := false
	runes := []rune(name)
	for i := 1; i < len(runes); i++ {
		if runes[i] == runes[i-1] {
			hasDouble = true
			break
		}
	}
	if !hasDouble {
		score += 10
	}

	return math.Min(score, 100)
}

func isDictionaryWord(name string) bool {
	return commonWords[strings.ToLower(name)]
}

func scorePhonetic(name string) float64 {
	score := 50.0

	if len(name) <= 6 {
		score += 20
	} else if len(name) <= 9 {
		score += 10
	}

	vowelRatio := 0.0
	for _, c := range name {
		if strings.ContainsRune("aeiou", c) {
			vowelRatio++
		}
	}
	vowelRatio /= float64(len(name))
	if vowelRatio >= 0.3 && vowelRatio <= 0.5 {
		score += 15
	}

	return math.Min(score, 100)
}

func CalculateScore(domain string) (int, ScoreMetrics) {
	name := strings.ToLower(domain)
	tld := ""
	if idx := strings.LastIndex(name, "."); idx != -1 {
		tld = name[idx:]
		name = name[:idx]
	}

	lengthScore := scoreLength(name)
	tldScore := scoreTLD(tld)
	brandScore := scoreBrand(name)
	readScore := scoreReadability(name)
	dictWord := isDictionaryWord(name)
	dictBonus := 0.0
	if dictWord {
		dictBonus = 15
	}
	phoneticScore := scorePhonetic(name)

	weighted := (lengthScore * 0.25) + (tldScore * 0.20) + (brandScore * 0.20) + (readScore * 0.15) + (dictBonus * 0.10) + (phoneticScore * 0.10)
	total := int(math.Round(weighted))
	if total > 100 {
		total = 100
	}
	if total < 0 {
		total = 0
	}

	metrics := ScoreMetrics{
		Length:      len(name),
		LengthScore: lengthScore,
		TLD:         tld,
		TLDScore:    tldScore,
		BrandScore:  brandScore,
		ReadScore:   readScore,
		Dictionary:  dictWord,
		DictionaryB: dictBonus,
		Phonetic:    phoneticScore,
		Total:       total,
	}

	return total, metrics
}
