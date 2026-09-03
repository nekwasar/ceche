package service

import (
	"fmt"
	"math"
	"sort"
	"strings"
)

type ModuleResult struct {
	Value      *float64              `json:"value"`
	Confidence float64               `json:"confidence"`
	Data       map[string]interface{} `json:"data"`
	Status     string                `json:"status"`
}

func float64Ptr(v float64) *float64 { return &v }

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
	Modules           map[string]ModuleResult `json:"modules"`
}

var tldScores = map[string]float64{
	"com": 10.0, "net": 9.0, "io": 8.5, "ai": 8.5,
	"co": 8.0, "de": 8.0, "edu": 8.0, "org": 8.0,
	"app": 7.5, "it": 7.5, "xyz": 7.5,
	"us": 7.0, "tv": 7.0, "me": 7.0, "cc": 7.0, "tech": 7.0,
	"world": 6.5,
	"eu": 6.0, "ca": 6.0, "pro": 6.0,
	"asia": 5.0, "news": 5.0, "site": 5.0,
	"ltd": 4.5,
	"cloud": 4.0, "blog": 4.0, "fun": 4.0, "live": 4.0,
	"art": 3.5,
	"network": 3.0, "bio": 3.0,
	"agency": 2.0, "one": 2.0, "biz": 2.0,
	"icu": 1.0,
}

var tldProfiles = map[float64]string{
	10.0: "tier_10", 9.0: "tier_09", 8.5: "tier_085", 8.0: "tier_08",
	7.5: "tier_075", 7.0: "tier_07", 6.5: "tier_065", 6.0: "tier_06",
	5.0: "tier_05", 4.5: "tier_045", 4.0: "tier_04", 3.5: "tier_035",
	3.0: "tier_03", 2.0: "tier_02", 1.0: "tier_01", 0.2: "tier_00",
}

var cpcKeywords = map[string]string{
	"insurance": "elite", "lawyer": "elite", "attorney": "elite", "credit": "elite",
	"mortgage": "elite", "loans": "high", "doctor": "high", "dentist": "high",
	"hosting": "high", "website": "high", "software": "high", "cloud": "high",
	"marketing": "medium_high", "agency": "medium_high", "design": "medium_high",
	"travel": "medium", "hotel": "medium", "car": "medium", "real": "medium",
	"tech": "low", "app": "low", "web": "low", "dev": "low",
	"blog": "informational", "news": "informational", "info": "informational",
}

var bigramFreq = map[string]float64{
	"th": 1.0, "he": 0.94, "in": 0.88, "er": 0.85, "an": 0.82,
	"on": 0.78, "at": 0.76, "en": 0.74, "nd": 0.72, "ti": 0.70,
	"es": 0.68, "or": 0.66, "te": 0.64, "of": 0.62, "ed": 0.60,
	"is": 0.58, "it": 0.56, "al": 0.54, "ar": 0.52, "st": 0.50,
	"to": 0.48, "nt": 0.46, "ng": 0.44, "se": 0.42, "ha": 0.40,
}

var strongEnds = []string{
	"ify", "ly", "ex", "io", "ox", "ix", "ux", "oo", "ee",
	"ia", "elle", "ora", "ina", "ara", "ica", "ota", "ula", "ena",
	"va", "vi", "vo", "vu", "ka", "ke", "ki", "ko", "ku",
	"ba", "be", "bi", "bo", "bu", "da", "de", "di", "do", "du",
	"fa", "fe", "fi", "fo", "mi", "na", "ne", "ni", "no", "nu",
	"pa", "pe", "pi", "po", "pu", "ta", "te", "ti", "to", "tu",
	"za", "ze", "zi", "zo",
}

var vowels = map[byte]bool{
	'a': true, 'e': true, 'i': true, 'o': true, 'u': true,
}

func isVowel(c byte) bool {
	return vowels[c]
}

var commonWords = map[string]bool{
	"go": true, "app": true, "web": true, "data": true, "net": true,
	"cloud": true, "tech": true, "dev": true, "hub": true, "lab": true,
	"box": true, "top": true, "pro": true, "max": true, "one": true,
	"ai": true, "api": true, "bit": true, "pay": true, "buy": true, "my": true,
	"sell": true, "shop": true, "store": true, "market": true, "trade": true,
	"crypto": true, "block": true, "chain": true, "meta": true, "open": true,
	"fast": true, "quick": true, "easy": true, "smart": true, "blue": true,
	"prime": true, "ultra": true, "mega": true, "super": true,
	"pulse": true, "spark": true, "flow": true, "sync": true,
	"core": true, "base": true, "flex": true, "zoom": true, "wave": true,
	"access": true, "account": true, "agent": true, "analytics": true,
	"archive": true, "audio": true, "auto": true, "backend": true,
	"bank": true, "bill": true, "book": true, "build": true,
	"business": true, "calendar": true, "camp": true, "capital": true,
	"card": true, "care": true, "career": true, "cash": true,
	"chat": true, "check": true, "city": true, "class": true,
	"clean": true, "click": true, "client": true, "club": true,
	"code": true, "college": true, "commerce": true, "company": true,
	"connect": true, "consulting": true, "contact": true, "control": true,
	"cook": true, "copy": true, "creative": true, "cube": true,
	"currency": true, "customer": true, "dance": true, "deal": true,
	"design": true, "digital": true, "direct": true, "docs": true,
	"domain": true, "drive": true, "drop": true, "earn": true,
	"education": true, "electric": true, "email": true, "engage": true,
	"engine": true, "enterprise": true, "event": true, "exchange": true,
	"express": true, "farm": true, "finance": true, "fit": true,
	"fitness": true, "food": true, "foot": true, "frame": true,
	"fresh": true, "fund": true, "fusion": true, "game": true,
	"gear": true, "gift": true, "global": true, "golf": true,
	"good": true, "green": true, "group": true, "growth": true,
	"guard": true, "guide": true, "guru": true, "gym": true,
	"health": true, "heart": true, "home": true, "hook": true,
	"host": true, "house": true, "hunt": true, "ice": true,
	"idea": true, "image": true, "inbox": true, "india": true,
	"ink": true, "input": true, "insight": true, "instinct": true,
	"institute": true, "insurance": true, "intern": true, "invest": true,
	"io": true, "island": true, "jet": true, "job": true,
	"join": true, "journal": true, "joy": true, "jump": true,
	"justice": true, "keep": true, "key": true, "kid": true,
	"kitchen": true, "land": true, "law": true,
	"lawyer": true, "lead": true, "learn": true, "legal": true,
	"life": true, "light": true, "link": true, "list": true,
	"live": true, "loan": true, "local": true, "lock": true,
	"logo": true, "love": true, "mail": true, "main": true,
	"manage": true, "map": true, "margin": true, "mark": true,
	"media": true, "meet": true, "menu": true,
	"merge": true, "metal": true, "mind": true, "mix": true,
	"mobile": true, "mode": true, "money": true, "moon": true,
	"mortgage": true, "motor": true, "music": true,
	"network": true, "news": true, "next": true, "node": true,
	"note": true, "office": true, "online": true,
	"option": true, "oracle": true, "order": true, "organ": true,
	"page": true, "paint": true, "pan": true, "park": true,
	"partner": true, "path": true, "peer": true,
	"phone": true, "photo": true, "piano": true, "pic": true,
	"plan": true, "play": true, "pod": true, "point": true,
	"pool": true, "pop": true, "power": true, "press": true,
	"price": true, "print": true, "privacy": true, "private": true,
	"profit": true, "project": true, "promo": true, "property": true,
	"public": true, "publish": true, "quest": true, "quote": true,
	"radio": true, "range": true, "rate": true, "read": true,
	"real": true, "record": true, "recruit": true, "rent": true,
	"report": true, "research": true, "resource": true, "rest": true,
	"retail": true, "review": true, "ride": true, "risk": true,
	"robot": true, "rock": true, "role": true, "room": true,
	"root": true, "route": true, "run": true, "safe": true,
	"sale": true, "salt": true, "sand": true, "save": true,
	"scan": true, "school": true, "score": true, "search": true,
	"secure": true, "select": true, "serve": true, "service": true,
	"session": true, "set": true, "share": true, "ship": true,
	"show": true, "side": true, "site": true,
	"snap": true, "social": true, "solar": true,
	"solution": true, "sonic": true, "source": true, "space": true,
	"sport": true, "spot": true, "stage": true, "start": true,
	"state": true, "stock": true, "stream": true,
	"studio": true, "style": true, "supply": true, "support": true,
	"system": true, "tab": true, "talk": true,
	"target": true, "task": true, "tax": true, "team": true,
	"term": true, "test": true, "text": true,
	"time": true, "tip": true, "today": true, "tool": true,
	"tour": true, "town": true, "track": true,
	"train": true, "trend": true, "trip": true,
	"truck": true, "trust": true, "tube": true, "tune": true,
	"tv": true, "university": true, "up": true, "us": true,
	"value": true, "video": true, "view": true, "village": true,
	"vinyl": true, "visa": true, "vision": true, "voice": true,
	"volume": true, "vote": true, "wage": true, "watch": true,
	"water": true, "week": true,
	"weight": true, "wheel": true, "win": true, "wire": true,
	"wise": true, "work": true, "world": true, "zone": true,
}

func CalculateScore(domain string, tier string) (int, AppraisalMetrics) {
	domain = strings.ToLower(domain)
	sld := domain
	tld := ""
	if idx := strings.LastIndex(domain, "."); idx != -1 {
		tld = domain[idx+1:]
		sld = domain[:idx]
	}

	modules := make(map[string]ModuleResult)

	modules["m1_rdap"] = m1Rdap(domain)
	modules["m2_tld_table"] = m2TldTable(tld)
	modules["m3_length"] = m3Length(sld)
	words := m6Segmenter(sld)
	modules["m6_segmenter"] = words
	modules["m4_word_count"] = m4WordCount(words)
	modules["m5_pronounceability"] = m5Pronounceability(sld)
	modules["m7_keyword_popularity"] = m7KeywordPopularity(words)
	modules["m8_cpc"] = m8Cpc(words, sld)
	modules["m9_search_results"] = m9SearchResults(domain)
	modules["m10_cross_tld"] = m10CrossTld(domain, tld)
	modules["m11_trademark"] = m11Trademark(sld, words)
	modules["m12_authority"] = m12Authority(domain)
	modules["m16_brandability"] = m16Brandability(sld, words)

	m13 := m13Confidence(modules)
	modules["m13_confidence"] = m13

	estimatedValue, rangeLow, rangeHigh, breakdown := m15Pricing(sld, tld, words, modules)
	modules["m15_pricing"] = ModuleResult{
		Value:      float64Ptr(estimatedValue),
		Confidence: m13.Confidence,
		Data: map[string]interface{}{
			"estimated_value": estimatedValue,
			"range":           map[string]float64{"low": rangeLow, "high": rangeHigh},
			"breakdown":       breakdown,
		},
		Status: "SUCCESS",
	}

	score := normalizeScore(estimatedValue, modules)
	tldProfile := resolveTldProfile(tldScores[tld])

	metrics := AppraisalMetrics{
		Domain:            domain,
		SLD:               sld,
		TLD:               tld,
		Score:             score,
		EstimatedValue:    estimatedValue,
		RangeLow:          rangeLow,
		RangeHigh:         rangeHigh,
		Confidence:        m13.Data["label"].(string),
		CompletenessRatio: m13.Confidence,
		WeightProfile:     tldProfile,
		Modules:           modules,
	}

	return score, shapeResponse(metrics, tier)
}

func shapeResponse(metrics AppraisalMetrics, tier string) AppraisalMetrics {
	switch tier {
	case "free":
		return shapeFreeResponse(metrics)
	case "startup", "enterprise":
		return shapePremiumResponse(metrics)
	default:
		return shapeFreeResponse(metrics)
	}
}

func shapeFreeResponse(metrics AppraisalMetrics) AppraisalMetrics {
	flagged := 0
	for _, mod := range metrics.Modules {
		if mod.Value != nil && *mod.Value < 1.0 && mod.Status == "SUCCESS" {
			flagged++
		}
	}

	freeMetrics := AppraisalMetrics{
		Domain:            metrics.Domain,
		SLD:               metrics.SLD,
		TLD:               metrics.TLD,
		Score:             metrics.Score,
		Confidence:        "free_tier",
		CompletenessRatio: metrics.CompletenessRatio,
		WeightProfile:     metrics.WeightProfile,
		Modules: map[string]ModuleResult{
			"teaser": {
				Value: float64Ptr(float64(metrics.Score)),
				Data: map[string]interface{}{
					"score":      metrics.Score,
					"modules":    16,
					"flagged":    flagged,
					"premium":    false,
					"teaser":     generateTeaser(metrics.Score, flagged),
				},
				Status: "FREE_TIER",
			},
			"m2_tld_table": metrics.Modules["m2_tld_table"],
			"m3_length": metrics.Modules["m3_length"],
			"m5_pronounceability": metrics.Modules["m5_pronounceability"],
		},
	}

	return freeMetrics
}

func shapePremiumResponse(metrics AppraisalMetrics) AppraisalMetrics {
	return metrics
}

func generateTeaser(score int, flagged int) string {
	if score >= 80 {
		return fmt.Sprintf("Score: %d/100 — Premium domain with strong brandability. %d risk factors flagged.", score, flagged)
	} else if score >= 60 {
		return fmt.Sprintf("Score: %d/100 — Strong domain with good commercial potential. %d risk factors flagged.", score, flagged)
	} else if score >= 40 {
		return fmt.Sprintf("Score: %d/100 — Moderate domain with some risk factors. %d issues flagged.", score, flagged)
	}
	return fmt.Sprintf("Score: %d/100 — Developing domain with %d risk factors. Upgrade for full analysis.", score, flagged)
}

func m1Rdap(domain string) ModuleResult {
	return ModuleResult{
		Value:      float64Ptr(1.0),
		Confidence: 0.5,
		Data: map[string]interface{}{
			"registered": false,
			"domain":     domain,
			"note":       "RDAP lookup requires external API",
		},
		Status: "SUCCESS",
	}
}

func m2TldTable(tld string) ModuleResult {
	score := tldScores[tld]
	if score == 0 {
		score = 0.2
	}
	return ModuleResult{
		Value:      float64Ptr(score),
		Confidence: 1.0,
		Data: map[string]interface{}{
			"tld":            tld,
			"tld_score":      score,
			"weight_profile": resolveTldProfile(score),
		},
		Status: "SUCCESS",
	}
}

func m3Length(sld string) ModuleResult {
	length := len(sld)
	score := 100.0 * (1.0 - 1.0/(1.0+math.Exp(-0.8*(float64(length)-5))))
	score = math.Max(0, math.Min(100, score))

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

	return ModuleResult{
		Value:      float64Ptr(mult),
		Confidence: 1.0,
		Data: map[string]interface{}{
			"raw_length": length,
			"score":      math.Round(score*100) / 100,
			"multiplier": mult,
			"has_digit":  hasDigit,
		},
		Status: "SUCCESS",
	}
}

func m4WordCount(words ModuleResult) ModuleResult {
	wordCount, ok := words.Data["word_count"].(int)
	if !ok || wordCount < 1 {
		return ModuleResult{
			Value: nil, Confidence: 0.0,
			Data:   map[string]interface{}{"reason": "no word count available"},
			Status: "SKIPPED",
		}
	}

	score := 100.0 * math.Exp(-0.5*(float64(wordCount)-1))
	score = math.Max(0, math.Min(100, score))

	mult := 1.0
	switch {
	case wordCount <= 1:
		mult = 20.0
	case wordCount <= 2:
		mult = 3.0
	case wordCount <= 3:
		mult = 1.5
	}

	return ModuleResult{
		Value:      float64Ptr(mult),
		Confidence: 1.0,
		Data: map[string]interface{}{
			"word_count": wordCount,
			"score":      math.Round(score*100) / 100,
			"multiplier": mult,
		},
		Status: "SUCCESS",
	}
}

func m5Pronounceability(sld string) ModuleResult {
	length := len(sld)
	if length <= 2 {
		return ModuleResult{
			Value: float64Ptr(2.0), Confidence: 1.0,
			Data:   map[string]interface{}{"score": 100.0, "multiplier": 2.0, "length": length},
			Status: "SUCCESS",
		}
	}

	vowelScore := vowelScore(sld)
	clusterScore := clusterScore(sld)
	bigramSc := bigramScore(sld)

	score := vowelScore*0.4 + clusterScore*0.3 + bigramSc*0.3
	score = math.Max(0, math.Min(100, score))

	hasDoubleVowel := false
	for i := 0; i < len(sld)-1; i++ {
		if isVowel(sld[i]) && sld[i] == sld[i+1] {
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

	return ModuleResult{
		Value:      float64Ptr(mult),
		Confidence: 1.0,
		Data: map[string]interface{}{
			"score":         math.Round(score*100) / 100,
			"multiplier":    mult,
			"vowel_score":   math.Round(vowelScore*100) / 100,
			"cluster_score": math.Round(clusterScore*100) / 100,
			"bigram_score":  math.Round(bigramSc*100) / 100,
		},
		Status: "SUCCESS",
	}
}

func m6Segmenter(sld string) ModuleResult {
	candidates := generateCandidates(sld)
	if len(candidates) == 0 {
		return ModuleResult{
			Value: nil, Confidence: 0.0,
			Data:   map[string]interface{}{"winner": nil, "word_count": nil, "status": "no_split", "candidates": []string{}},
			Status: "SKIPPED",
		}
	}

	best := candidates[0]
	altCandidates := make([]string, 0, len(candidates)-1)
	for _, c := range candidates[1:] {
		altCandidates = append(altCandidates, strings.Join(c, " "))
	}

	quality := segmentQuality(best, sld)

	return ModuleResult{
		Value: nil, Confidence: quality,
		Data: map[string]interface{}{
			"winner":     best,
			"word_count": len(best),
			"segmented":  strings.Join(best, " "),
			"quality":    math.Round(quality*100) / 100,
			"candidates": altCandidates,
			"method":     segmentMethod(best, sld),
			"status":     "split_found",
		},
		Status: "SUCCESS",
	}
}

func generateCandidates(sld string) [][]string {
	sld = strings.ToLower(sld)
	var candidates [][]string

	dictCands := dictSegment(sld)
	if len(dictCands) > 0 {
		candidates = append(candidates, dictCands...)
	}

	hybridCands := hybridSegment(sld)
	if len(hybridCands) > 0 {
		for _, c := range hybridCands {
			if !candidateExists(candidates, c) {
				candidates = append(candidates, c)
			}
		}
	}

	vowelCands := vowelSegment(sld)
	if len(vowelCands) > 0 {
		for _, c := range vowelCands {
			if !candidateExists(candidates, c) {
				candidates = append(candidates, c)
			}
		}
	}

	if len(candidates) == 0 {
		candidates = append(candidates, []string{sld})
	}

	scored := scoreCandidates(candidates, sld)
	sortScored(scored)

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
			if isWord(word) {
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
				combined := append(lw, rw...)
				if len(combined) <= 4 {
					results = append(results, combined)
				}
			}
		}

		if isWord(left) && len(right) >= 2 {
			results = append(results, []string{left, right})
		}
		if isWord(right) && len(left) >= 2 {
			results = append(results, []string{left, right})
		}
	}

	return results
}

func vowelSegment(sld string) [][]string {
	var results [][]string
	splitPoints := []int{}

	for i := 1; i < len(sld)-1; i++ {
		if isVowel(sld[i-1]) && !isVowel(sld[i]) {
			if i >= 2 && i <= len(sld)-2 {
				splitPoints = append(splitPoints, i)
			}
		}
	}

	for _, pos := range splitPoints {
		left := sld[:pos]
		right := sld[pos:]
		if len(left) >= 2 && len(right) >= 2 {
			results = append(results, []string{left, right})
		}
	}

	return results
}

type scoredCandidate struct {
	words []string
	score float64
}

func scoreCandidates(candidates [][]string, original string) []scoredCandidate {
	var scored []scoredCandidate
	dictLen := len(dictionary)

	for _, words := range candidates {
		score := 0.0

		for _, w := range words {
			if isWord(w) {
				score += 20.0
			}
			if rank, ok := dictionary[w]; ok {
				score += float64(dictLen-rank) / float64(dictLen) * 30.0
			}
		}

		totalLen := 0
		for _, w := range words {
			totalLen += len(w)
		}
		coverage := float64(totalLen) / float64(len(original))
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

		if len(words) == 2 {
			firstCommon := isCommonWord(words[0])
			secondCommon := isCommonWord(words[1])
			if firstCommon && secondCommon {
				score += 20.0
			} else if firstCommon || secondCommon {
				score += 10.0
			}
		}

		patternScore := checkPattern(words)
		score += patternScore

		scored = append(scored, scoredCandidate{words: words, score: score})
	}

	return scored
}

func sortScored(scored []scoredCandidate) {
	sort.Slice(scored, func(i, j int) bool {
		return scored[i].score > scored[j].score
	})
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
		if isWord(w) {
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
		if isWord(w) {
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

func isWord(word string) bool {
	if len(word) < 2 {
		return false
	}
	_, ok := dictionary[word]
	return ok
}

func isCommonWord(word string) bool {
	return commonWords[word]
}

func checkPattern(words []string) float64 {
	score := 0.0

	if len(words) == 2 {
		if isVerbLike(words[0]) && isNounLike(words[1]) {
			score += 5.0
		}
		if isAdjectiveLike(words[0]) && isNounLike(words[1]) {
			score += 5.0
		}
		if isNounLike(words[0]) && isNounLike(words[1]) {
			score += 3.0
		}
	}

	return score
}

func isVerbLike(word string) bool {
	verbPatterns := []string{"get", "set", "run", "go", "make", "use", "find", "keep", "let", "put", "say", "see", "take", "try", "ask", "buy", "cut", "eat", "fly", "give", "grow", "hold", "kill", "lead", "lose", "move", "open", "pass", "pull", "push", "read", "save", "send", "show", "sort", "spin", "type", "wash", "work"}
	for _, v := range verbPatterns {
		if word == v {
			return true
		}
	}
	return false
}

func isNounLike(word string) bool {
	return commonWords[word] || isWord(word)
}

func isAdjectiveLike(word string) bool {
	adjectives := []string{"big", "old", "new", "hot", "top", "fast", "free", "full", "good", "half", "high", "huge", "last", "long", "next", "only", "open", "real", "safe", "sure", "true", "best", "blue", "dark", "dead", "easy", "fast", "fine", "flat", "fresh", "front", "grand", "green", "keen", "kind", "lean", "loud", "main", "near", "next", "nice", "odd", "pale", "pure", "rare", "rich", "rise", "rock", "rose", "round", "slow", "soft", "solid", "still", "sweet", "tall", "thick", "tight", "tiny", "tough", "vast", "warm", "wide", "wild", "wise", "young"}
	for _, a := range adjectives {
		if word == a {
			return true
		}
	}
	return false
}

var dictionary map[string]int

func init() {
	dictionary = make(map[string]int)
	rank := 0

	for word := range commonWords {
		dictionary[word] = rank
		rank++
	}

	extraWords := []string{
		"about", "after", "again", "agent", "agree", "ahead", "alarm", "album",
		"alert", "alien", "align", "alive", "alley", "allow", "alone", "along",
		"alter", "angel", "anger", "angle", "angry", "anime", "ankle", "annex",
		"antic", "apart", "apple", "apply", "arena", "arise", "armor", "army",
		"array", "aside", "asset", "atlas", "audio", "audit", "avoid", "awake",
		"award", "aware", "badge", "bagel", "baker", "basic", "basin", "basis",
		"batch", "beach", "beast", "begin", "being", "below", "bench", "berry",
		"blade", "blame", "blank", "blast", "blaze", "blend", "bless", "blind",
		"block", "blood", "bloom", "board", "boast", "bonus", "boost", "bound",
		"brain", "brand", "brave", "bread", "break", "breed", "brick", "bride",
		"brief", "broad", "brook", "brush", "buddy", "build", "bunch", "burst",
		"cabin", "cable", "camel", "candy", "cargo", "carry", "catch", "cause",
		"chain", "chair", "chalk", "champ", "chaos", "charm", "chart", "chase",
		"cheap", "check", "cheer", "chess", "chest", "chief", "child", "china",
		"chord", "claim", "clash", "class", "clean", "clear", "clerk", "click",
		"cliff", "climb", "cling", "clock", "clone", "close", "cloth", "cloud",
		"coach", "coast", "color", "comet", "comic", "coral", "could", "count",
		"court", "cover", "crack", "craft", "crane", "crash", "crazy", "cream",
		"cross", "crowd", "crown", "crush", "curve", "cycle", "daily", "dance",
		"death", "debut", "delay", "delta", "dense", "depth", "derby", "desk",
		"diary", "diner", "dirty", "dodge", "doing", "doubt", "dough", "draft",
		"drain", "drake", "drama", "drank", "drawn", "dream", "dress", "drift",
		"drink", "drive", "drone", "drops", "drown", "dying", "eager", "eagle",
		"early", "earth", "eight", "elder", "elect", "elite", "email", "ember",
		"empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "essay",
		"event", "every", "exact", "exams", "exile", "exist", "extra", "fable",
		"faith", "false", "fancy", "fatal", "fault", "feast", "fence", "ferry",
		"fetch", "fever", "fiber", "field", "fifth", "fight", "final", "first",
		"flame", "flash", "fleet", "flesh", "float", "flood", "floor", "flour",
		"fluid", "flush", "flute", "focal", "focus", "force", "forge", "forth",
		"forum", "found", "frame", "frank", "fraud", "fresh", "front", "frost",
		"froze", "fruit", "fully", "funny", "gains", "gamma", "gauge", "genre",
		"ghost", "giant", "given", "glad", "gland", "glass", "gleam", "glide",
		"globe", "gloom", "glory", "gloss", "glyph", "gnome", "going", "grace",
		"grade", "grain", "grand", "grant", "graph", "grasp", "grass", "grave",
		"great", "green", "greet", "grief", "grill", "grind", "groan", "gross",
		"group", "grove", "grown", "guard", "guess", "guest", "guide", "guild",
		"guilt", "guise", "habit", "happy", "harsh", "haste", "haunt", "haven",
		"heart", "heavy", "hence", "herbs", "honor", "horse", "hotel", "house",
		"huge", "human", "humor", "hurry", "hyper", "ideal", "image", "imply",
		"index", "indie", "inner", "input", "irony", "issue", "ivory", "jewel",
		"joint", "joker", "jolly", "judge", "juice", "juicy", "jumbo", "karma",
		"kayak", "kebab", "knack", "kneel", "knife", "knock", "known", "label",
		"large", "laser", "later", "laugh", "layer", "learn", "lease", "leave",
		"legal", "lemon", "level", "light", "limit", "linen", "liver", "lobby",
		"local", "lodge", "logic", "login", "loose", "lover", "lower", "loyal",
		"lucky", "lunch", "lyric", "magic", "major", "maker", "manor", "march",
		"marry", "match", "mayor", "media", "mercy", "merit", "metal", "might",
		"minor", "minus", "mirth", "model", "moist", "money", "month", "moral",
		"motor", "mount", "mouse", "mouth", "movie", "music", "naive", "nerve",
		"never", "noble", "noise", "north", "noted", "novel", "nurse", "ocean",
		"offer", "often", "olive", "onset", "opera", "orbit", "order", "organ",
		"other", "outer", "oxide", "ozone", "paint", "panel", "panic", "paper",
		"party", "pasta", "patch", "pause", "peace", "peach", "pearl", "penny",
		"phase", "phone", "photo", "piano", "piece", "pilot", "pinch", "pitch",
		"pixel", "pizza", "place", "plain", "plane", "plant", "plate", "plaza",
		"plead", "pluck", "plumb", "plume", "plump", "plush", "poem", "poet",
		"point", "poker", "polar", "porch", "poser", "pouch", "pound", "power",
		"press", "price", "pride", "prime", "print", "prior", "prize", "probe",
		"prone", "proof", "prose", "proud", "prove", "proxy", "psalm", "pulse",
		"punch", "pupil", "purse", "quest", "queue", "quick", "quiet", "quota",
		"quote", "radar", "radio", "raise", "rally", "ranch", "range", "rapid",
		"ratio", "reach", "react", "ready", "realm", "rebel", "refer", "reign",
		"relax", "reply", "rider", "ridge", "rifle", "right", "rigid", "risky",
		"rival", "river", "roast", "robot", "rocky", "rouge", "rough", "round",
		"route", "royal", "rugby", "ruler", "rural", "saint", "salad", "salon",
		"sandy", "sauce", "scale", "scare", "scene", "scent", "scope", "score",
		"scout", "scrap", "sense", "serve", "seven", "shade", "shaft", "shake",
		"shall", "shame", "shape", "share", "shark", "sharp", "sheep", "sheer",
		"sheet", "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot",
		"shore", "short", "shout", "sight", "sigma", "since", "sixth", "sixty",
		"skill", "skull", "slash", "slate", "sleep", "slice", "slide", "slope",
		"small", "smart", "smell", "smile", "smoke", "snake", "solar", "solid",
		"solve", "sorry", "sound", "south", "space", "spare", "spark", "speak",
		"spear", "speed", "spend", "spice", "spike", "spine", "split", "spoke",
		"sport", "spray", "squad", "stack", "staff", "stage", "stain", "stake",
		"stale", "stall", "stamp", "stand", "stark", "start", "state", "stays",
		"steam", "steel", "steep", "steer", "stern", "stick", "stiff", "still",
		"stock", "stole", "stone", "stood", "store", "storm", "story", "stove",
		"strap", "straw", "strip", "stuck", "stuff", "style", "sugar", "suite",
		"sunny", "super", "surge", "swamp", "swarm", "swear", "sweep", "sweet",
		"swift", "swing", "sword", "swore", "sworn", "swung", "table", "taste",
		"teach", "teeth", "tempo", "tense", "terms", "theme", "thick", "thing",
		"think", "third", "thorn", "those", "three", "threw", "throw", "thumb",
		"tidal", "tiger", "tight", "timer", "tired", "title", "token", "tooth",
		"total", "touch", "tough", "towel", "tower", "toxic", "trace", "track",
		"trade", "trail", "train", "trait", "trash", "treat", "trend", "trial",
		"tribe", "trick", "tried", "troop", "truck", "truly", "trump", "trunk",
		"trust", "truth", "tumor", "twice", "twist", "ultra", "uncle", "under",
		"union", "unite", "unity", "until", "upper", "upset", "urban", "usage",
		"usual", "valid", "value", "vapor", "vault", "verse", "video", "vigor",
		"vinyl", "viral", "virus", "visit", "vista", "vital", "vivid", "vocal",
		"vodka", "voice", "voter", "waist", "waste", "watch", "water", "weary",
		"weave", "whale", "wheat", "wheel", "where", "which", "while", "white",
		"whole", "whose", "widow", "width", "witch", "woman", "world", "worry",
		"worse", "worst", "worth", "would", "wound", "wrath", "write", "wrote",
		"yacht", "young", "yours", "youth", "zero", "zone",
	}

	for _, word := range extraWords {
		if _, exists := dictionary[word]; !exists {
			dictionary[word] = rank
			rank++
		}
	}
}

func m7KeywordPopularity(words ModuleResult) ModuleResult {
	wordList, ok := words.Data["winner"].([]string)
	if !ok || len(wordList) == 0 {
		return ModuleResult{
			Value: nil, Confidence: 0.0,
			Data:   map[string]interface{}{"reason": "no words available"},
			Status: "SKIPPED",
		}
	}

	totalScore := 0.0
	wordScores := make(map[string]float64)

	for _, w := range wordList {
		score := scoreKeyword(w)
		wordScores[w] = score
		totalScore += score
	}

	avgScore := totalScore / float64(len(wordList))

	comboBonus := comboScore(wordList)
	totalScore = avgScore + comboBonus

	industryScore := industryMatch(wordList)
	totalScore += industryScore

	totalScore = math.Min(100, totalScore)

	mult := 1.0
	switch {
	case totalScore >= 90:
		mult = 8.0
	case totalScore >= 75:
		mult = 5.5
	case totalScore >= 60:
		mult = 3.5
	case totalScore >= 45:
		mult = 2.5
	case totalScore >= 30:
		mult = 1.8
	case totalScore >= 15:
		mult = 1.3
	}

	return ModuleResult{
		Value:      float64Ptr(mult),
		Confidence: 0.7,
		Data: map[string]interface{}{
			"score":        math.Round(totalScore*100) / 100,
			"multiplier":   mult,
			"word_scores":  wordScores,
			"combo_bonus":  math.Round(comboBonus*100) / 100,
			"industry":     math.Round(industryScore*100) / 100,
			"keywords":     wordList,
			"top_category": identifyIndustry(wordList),
		},
		Status: "SUCCESS",
	}
}

func scoreKeyword(word string) float64 {
	if score, ok := keywordPopularity[word]; ok {
		return score
	}

	if score, ok := keywordSuffixes[word]; ok {
		return score
	}

	if score, ok := keywordPrefixes[word]; ok {
		return score
	}

	letterScore := 0.0
	for _, c := range word {
		letterScore += letterValue[byte(c)]
	}
	if len(word) > 0 {
		letterScore /= float64(len(word))
	}

	commonBonus := 0.0
	if commonWords[word] {
		commonBonus = 15.0
	}

	return letterScore + commonBonus
}

func comboScore(words []string) float64 {
	if len(words) < 2 {
		return 0.0
	}

	score := 0.0

	for _, pair := range wordPairs {
		if containsAll(words, pair.words) {
			score += pair.bonus
		}
	}

	for _, combo := range highValueCombos {
		if matchesCombo(words, combo.pattern) {
			score += combo.score
		}
	}

	if len(words) == 2 {
		if isVerbLike(words[0]) && isNounLike(words[1]) {
			score += 8.0
		}
		if isAdjectiveLike(words[0]) && isNounLike(words[1]) {
			score += 6.0
		}
	}

	return math.Min(30.0, score)
}

func industryMatch(words []string) float64 {
	for _, keywords := range industryKeywords {
		matchCount := 0
		for _, w := range words {
			if keywords[w] {
				matchCount++
			}
		}
		if matchCount >= 2 {
			return 15.0
		}
		if matchCount == 1 && len(words) == 1 {
			return 8.0
		}
	}
	return 0.0
}

func identifyIndustry(words []string) string {
	bestIndustry := "general"
	bestScore := 0.0

	for industry, keywords := range industryKeywords {
		score := 0.0
		for _, w := range words {
			if keywords[w] {
				score += 10.0
			}
		}
		if score > bestScore {
			bestScore = score
			bestIndustry = industry
		}
	}
	return bestIndustry
}

func containsAll(words []string, targets []string) bool {
	wordSet := make(map[string]bool)
	for _, w := range words {
		wordSet[w] = true
	}
	for _, t := range targets {
		if !wordSet[t] {
			return false
		}
	}
	return true
}

func matchesCombo(words []string, pattern []string) bool {
	if len(pattern) != len(words) {
		return false
	}
	for i, p := range pattern {
		if p != "*" && p != words[i] {
			return false
		}
	}
	return true
}

var keywordPopularity = map[string]float64{
	"insurance": 95, "lawyer": 93, "attorney": 92, "credit": 91,
	"mortgage": 90, "loans": 88, "doctor": 87, "dentist": 86,
	"hosting": 85, "website": 84, "software": 83, "cloud": 82,
	"marketing": 80, "agency": 78, "design": 76, "travel": 74,
	"hotel": 72, "car": 70, "real": 68, "estate": 67,
	"finance": 85, "investing": 83, "trading": 82, "crypto": 80,
	"bitcoin": 79, "ethereum": 78, "blockchain": 77, "defi": 76,
	"health": 84, "fitness": 82, "wellness": 80, "nutrition": 78,
	"medical": 83, "pharmacy": 81, "therapy": 79, "mental": 77,
	"education": 81, "course": 79, "tutorial": 77, "learn": 75,
	"university": 78, "college": 76, "school": 74, "training": 73,
	"shopping": 77, "store": 75, "shop": 74, "buy": 73,
	"deal": 72, "sale": 71, "discount": 70, "coupon": 69,
	"technology": 82, "startup": 80, "venture": 78, "digital": 76,
	"data": 79, "analytics": 77, "automation": 75, "ai": 83,
	"machine": 74, "learning": 73, "robot": 72,
	"security": 80, "privacy": 78, "protection": 76, "backup": 74,
	"vpn": 77, "firewall": 75, "antivirus": 73, "safe": 71,
	"music": 70, "video": 72, "stream": 74, "podcast": 73,
	"entertainment": 71, "gaming": 76, "game": 75, "play": 73,
	"food": 72, "restaurant": 74, "recipe": 71, "cooking": 70,
	"delivery": 73, "pizza": 69, "coffee": 68, "tea": 67,
	"email": 75, "inbox": 73, "mail": 72, "message": 71,
	"chat": 74, "social": 76, "network": 75, "community": 74,
	"blog": 65, "news": 67, "info": 63, "article": 62,
	"book": 68, "read": 66, "write": 65, "content": 67,
	"photo": 69, "image": 68, "camera": 67, "picture": 66,
	"art": 70, "creative": 72, "logo": 71,
	"brand": 73, "style": 72, "fashion": 74, "beauty": 73,
	"skin": 70, "hair": 69, "makeup": 68, "nail": 67,
	"home": 71, "house": 70, "garden": 69, "furniture": 68,
	"kitchen": 67, "bath": 66, "bedroom": 65, "office": 72,
	"work": 73, "job": 75, "career": 74, "hire": 73,
	"salary": 72, "remote": 74, "freelance": 73, "contract": 71,
	"legal": 76, "law": 78, "tax": 77, "audit": 75,
	"accounting": 74, "bookkeeping": 72, "invoice": 71, "payment": 76,
	"shopify": 78, "woocommerce": 76, "ecommerce": 80, "storefront": 77,
	"amazon": 79, "ebay": 75, "etsy": 73,
	"domain": 82, "host": 80, "server": 79, "dns": 78,
	"ssl": 77, "https": 76, "wordpress": 79,
	"soccer": 68, "football": 70, "basketball": 69, "tennis": 67,
	"golf": 66, "hockey": 65, "baseball": 64, "cricket": 63,
	"nft": 77, "web3": 76,
	"metaverse": 75, "vr": 74, "ar": 73, "xr": 72,
	"tesla": 71, "apple": 73, "google": 75, "microsoft": 74,
	"facebook": 72, "twitter": 71, "instagram": 70,
	"youtube": 73, "tiktok": 72, "netflix": 71, "spotify": 70,
	"assets": 70, "lib": 60, "bot": 72, "db": 65,
	"gen": 63, "archive": 62, "rank": 64, "task": 66,
	"prompt": 68, "usd": 60, "dollar": 62, "man": 55,
	"share": 67, "ash": 50, "think": 65, "en": 52,
	"box": 60, "pad": 58, "note": 62, "clip": 57,
	"cart": 68, "mint": 64, "forge": 63, "craft": 65,
	"stack": 67, "node": 66, "pipe": 61, "gate": 60,
	"loop": 59, "byte": 62, "pixel": 64, "voxel": 58,
	"core": 66, "root": 62, "unit": 60, "sync": 63,
	"flow": 65, "mesh": 61, "grid": 62, "arc": 59,
	"hub": 68, "works": 64,
	"studio": 66, "hq": 65, "dev": 72,
	"io": 70, "co": 65,
	"ify": 55, "ly": 50, "fy": 52,
	"get": 62, "try": 60, "use": 61, "set": 58,
	"run": 59, "go": 64, "do": 57, "be": 55,
	"now": 63, "new": 65, "old": 52, "hot": 61,
	"top": 67, "max": 66, "pro": 68, "plus": 65,
	"one": 60, "all": 58, "any": 56, "our": 57,
	"the": 50, "for": 52, "and": 51, "but": 48,
	"you": 55, "its": 53, "his": 52, "her": 52,
	"my": 58, "your": 56, "this": 54, "that": 53,
	"phone": 72, "color": 65, "paint": 63, "canvas": 63,
	"black": 68, "white": 67, "red": 66, "blue": 69,
	"yellow": 64, "orange": 65, "purple": 63, "pink": 62,
	"brown": 60, "gray": 61, "grey": 61, "silver": 64,
	"gold": 67, "cyan": 60, "magenta": 59, "lime": 61,
	"teal": 62, "salmon": 60,
}

var keywordSuffixes = map[string]float64{
	"hub": 55, "lab": 58, "pro": 60, "io": 62, "ai": 65,
	"ly": 45, "fy": 48, "app": 57, "dev": 56, "tech": 59,
	"now": 50, "go": 52, "box": 53, "base": 54, "spot": 51,
	"point": 49, "place": 48, "zone": 47, "land": 46, "world": 50,
	"link": 48, "net": 52, "org": 45, "com": 55, "co": 53,
}

var keywordPrefixes = map[string]float64{
	"my": 50, "go": 52, "get": 53, "try": 51, "buy": 55,
	"best": 58, "top": 57, "free": 56, "easy": 54, "fast": 55,
	"smart": 56, "quick": 54, "super": 55, "mega": 53, "ultra": 54,
	"next": 55, "new": 52, "pro": 60, "max": 58, "one": 50,
}

var letterValue = map[byte]float64{
	'a': 3, 'b': 4, 'c': 3, 'd': 4, 'e': 2, 'f': 5,
	'g': 4, 'h': 5, 'i': 3, 'j': 7, 'k': 6, 'l': 4,
	'm': 4, 'n': 3, 'o': 3, 'p': 4, 'q': 8, 'r': 3,
	's': 3, 't': 3, 'u': 4, 'v': 5, 'w': 5, 'x': 7,
	'y': 5, 'z': 7,
}

type wordPair struct {
	words  []string
	bonus  float64
}

var wordPairs = []wordPair{
	{[]string{"cloud", "tech"}, 12.0},
	{[]string{"data", "tech"}, 11.0},
	{[]string{"web", "tech"}, 10.0},
	{[]string{"smart", "tech"}, 10.0},
	{[]string{"digital", "marketing"}, 12.0},
	{[]string{"social", "media"}, 11.0},
	{[]string{"content", "marketing"}, 10.0},
	{[]string{"email", "marketing"}, 10.0},
	{[]string{"search", "engine"}, 9.0},
	{[]string{"cloud", "computing"}, 11.0},
	{[]string{"machine", "learning"}, 12.0},
	{[]string{"artificial", "intelligence"}, 13.0},
	{[]string{"real", "estate"}, 12.0},
	{[]string{"digital", "currency"}, 11.0},
	{[]string{"home", "security"}, 10.0},
	{[]string{"web", "hosting"}, 11.0},
	{[]string{"domain", "name"}, 10.0},
	{[]string{"online", "store"}, 11.0},
	{[]string{"mobile", "app"}, 12.0},
	{[]string{"game", "center"}, 9.0},
	{[]string{"music", "stream"}, 10.0},
	{[]string{"video", "stream"}, 10.0},
	{[]string{"live", "stream"}, 9.0},
	{[]string{"food", "delivery"}, 11.0},
	{[]string{"ride", "share"}, 10.0},
	{[]string{"co", "working"}, 9.0},
	{[]string{"green", "energy"}, 10.0},
	{[]string{"solar", "power"}, 9.0},
	{[]string{"electric", "car"}, 10.0},
	{[]string{"fitness", "app"}, 9.0},
	{[]string{"health", "care"}, 11.0},
	{[]string{"mental", "health"}, 10.0},
	{[]string{"skin", "care"}, 9.0},
	{[]string{"hair", "care"}, 8.0},
	{[]string{"pet", "care"}, 8.0},
	{[]string{"baby", "care"}, 7.0},
	{[]string{"self", "care"}, 8.0},
	{[]string{"time", "management"}, 9.0},
	{[]string{"project", "management"}, 10.0},
	{[]string{"risk", "management"}, 9.0},
	{[]string{"wealth", "management"}, 10.0},
	{[]string{"event", "planning"}, 8.0},
	{[]string{"wedding", "planning"}, 8.0},
	{[]string{"interior", "design"}, 9.0},
	{[]string{"graphic", "design"}, 10.0},
	{[]string{"web", "design"}, 11.0},
	{[]string{"logo", "design"}, 9.0},
	{[]string{"product", "design"}, 10.0},
	{[]string{"user", "experience"}, 9.0},
	{[]string{"customer", "support"}, 10.0},
	{[]string{"technical", "support"}, 9.0},
	{[]string{"help", "desk"}, 8.0},
	{[]string{"ticket", "system"}, 7.0},
	{[]string{"stock", "market"}, 11.0},
	{[]string{"crypto", "exchange"}, 12.0},
	{[]string{"trading", "platform"}, 11.0},
	{[]string{"investment", "fund"}, 10.0},
	{[]string{"venture", "capital"}, 11.0},
	{[]string{"angel", "investor"}, 9.0},
	{[]string{"seed", "funding"}, 8.0},
	{[]string{"series", "funding"}, 8.0},
	{[]string{"business", "plan"}, 9.0},
	{[]string{"market", "research"}, 10.0},
	{[]string{"competitive", "analysis"}, 8.0},
	{[]string{"supply", "chain"}, 9.0},
	{[]string{"logistics", "company"}, 8.0},
	{[]string{"ware", "house"}, 7.0},
	{[]string{"last", "mile"}, 7.0},
	{[]string{"cold", "storage"}, 6.0},
	{[]string{"quality", "control"}, 8.0},
}

type comboPattern struct {
	pattern []string
	score   float64
}

var highValueCombos = []comboPattern{
	{[]string{"*", "insurance"}, 15.0},
	{[]string{"*", "loans"}, 13.0},
	{[]string{"*", "lawyer"}, 14.0},
	{[]string{"*", "doctor"}, 12.0},
	{[]string{"*", "hosting"}, 11.0},
	{[]string{"*", "software"}, 10.0},
	{[]string{"*", "marketing"}, 11.0},
	{[]string{"*", "design"}, 9.0},
	{[]string{"*", "agency"}, 10.0},
	{[]string{"*", "consulting"}, 10.0},
	{[]string{"*", "solutions"}, 8.0},
	{[]string{"*", "services"}, 8.0},
	{[]string{"cloud", "*"}, 10.0},
	{[]string{"digital", "*"}, 11.0},
	{[]string{"smart", "*"}, 9.0},
	{[]string{"green", "*"}, 8.0},
	{[]string{"eco", "*"}, 8.0},
	{[]string{"bio", "*"}, 7.0},
	{[]string{"cyber", "*"}, 10.0},
	{[]string{"auto", "*"}, 9.0},
	{[]string{"meta", "*"}, 8.0},
	{[]string{"neo", "*"}, 7.0},
	{[]string{"hyper", "*"}, 7.0},
	{[]string{"ultra", "*"}, 7.0},
	{[]string{"micro", "*"}, 6.0},
	{[]string{"nano", "*"}, 6.0},
	{[]string{"poly", "*"}, 5.0},
	{[]string{"multi", "*"}, 6.0},
	{[]string{"omni", "*"}, 6.0},
	{[]string{"pan", "*"}, 5.0},
}

var industryKeywords = map[string]map[string]bool{
	"tech": {
		"cloud": true, "data": true, "ai": true, "software": true,
		"dev": true, "api": true, "code": true, "tech": true,
		"digital": true, "automation": true, "analytics": true,
		"startup": true, "venture": true, "saas": true, "paas": true,
		"server": true, "database": true, "security": true, "cyber": true,
	},
	"finance": {
		"bank": true, "invest": true, "trading": true, "stock": true,
		"crypto": true, "bitcoin": true, "defi": true, "nft": true,
		"wallet": true, "payment": true, "pay": true, "invoice": true,
		"tax": true, "audit": true, "accounting": true, "credit": true,
	},
	"health": {
		"health": true, "medical": true, "doctor": true, "clinic": true,
		"pharmacy": true, "therapy": true, "wellness": true, "fitness": true,
		"nutrition": true, "diet": true, "mental": true, "dental": true,
		"care": true, "hospital": true, "surgery": true, "diagnostic": true,
	},
	"education": {
		"learn": true, "course": true, "tutorial": true, "school": true,
		"university": true, "college": true, "training": true, "class": true,
		"teach": true, "study": true, "exam": true, "cert": true,
		"degree": true, "program": true, "academy": true, "institute": true,
	},
	"ecommerce": {
		"shop": true, "store": true, "buy": true, "sell": true,
		"deal": true, "sale": true, "discount": true, "coupon": true,
		"cart": true, "checkout": true, "order": true, "delivery": true,
		"ship": true, "return": true, "refund": true, "marketplace": true,
	},
	"realestate": {
		"real": true, "estate": true, "property": true, "home": true,
		"house": true, "apartment": true, "rent": true, "lease": true,
		"mortgage": true, "agent": true, "broker": true, "listing": true,
		"land": true, "building": true, "commercial": true, "residential": true,
	},
	"food": {
		"food": true, "restaurant": true, "cafe": true, "pizza": true,
		"coffee": true, "tea": true, "recipe": true, "cooking": true,
		"chef": true, "catering": true, "delivery": true, "takeout": true,
		"menu": true, "organic": true, "vegan": true, "gluten": true,
	},
	"travel": {
		"travel": true, "hotel": true, "flight": true, "booking": true,
		"vacation": true, "resort": true, "tour": true, "cruise": true,
		"airbnb": true, "hostel": true, "camping": true, "adventure": true,
		"destination": true, "itinerary": true, "luggage": true, "passport": true,
	},
	"entertainment": {
		"game": true, "play": true, "fun": true, "movie": true,
		"music": true, "video": true, "stream": true, "podcast": true,
		"show": true, "event": true, "ticket": true, "concert": true,
		"theater": true, "cinema": true, "comedy": true, "dance": true,
	},
}

func m8Cpc(words ModuleResult, sld string) ModuleResult {
	wordList, _ := words.Data["winner"].([]string)

	bestTier := ""
	bestMult := 1.0
	for _, w := range wordList {
		tier := cpcKeywords[w]
		if tier != "" && tierRank(tier) < tierRank(bestTier) {
			bestTier = tier
			bestMult = cpcTierMult(tier)
		}
	}

	if bestTier == "" {
		for word, tier := range cpcKeywords {
			if len(word) >= 3 && strings.Contains(sld, word) && tierRank(tier) < tierRank(bestTier) {
				bestTier = tier
				bestMult = cpcTierMult(tier)
			}
		}
	}

	return ModuleResult{
		Value:      float64Ptr(bestMult),
		Confidence: 0.7,
		Data: map[string]interface{}{
			"tier":       bestTier,
			"multiplier": bestMult,
		},
		Status: "SUCCESS",
	}
}

func m9SearchResults(domain string) ModuleResult {
	return ModuleResult{
		Value:      float64Ptr(1.0),
		Confidence: 0.3,
		Data: map[string]interface{}{
			"result_count": nil,
			"note":         "Search API required",
		},
		Status: "SUCCESS",
	}
}

func m10CrossTld(domain string, tld string) ModuleResult {
	isCom := tld == "com"
	penalty := 1.0
	if !isCom {
		penalty = 0.7
	}

	return ModuleResult{
		Value:      float64Ptr(penalty),
		Confidence: 0.5,
		Data: map[string]interface{}{
			"is_com":     isCom,
			"multiplier": penalty,
			"note":       "Cross-TLD check requires RDAP",
		},
		Status: "SUCCESS",
	}
}

func m11Trademark(sld string, words ModuleResult) ModuleResult {
	return ModuleResult{
		Value:      float64Ptr(1.0),
		Confidence: 0.5,
		Data: map[string]interface{}{
			"severity":   "none",
			"marks":      []string{},
			"multiplier": 1.0,
			"note":       "Trademark check requires USPTO/EUIPO API",
		},
		Status: "SUCCESS",
	}
}

func m12Authority(domain string) ModuleResult {
	return ModuleResult{
		Value:      float64Ptr(1.0),
		Confidence: 0.3,
		Data: map[string]interface{}{
			"authority":  nil,
			"ahrefs_dr":  nil,
			"opr_score":  nil,
			"snapshots":  0,
			"parked":     false,
			"multiplier": 1.0,
			"note":       "Authority check requires Ahrefs/OPR API",
		},
		Status: "SUCCESS",
	}
}

func m13Confidence(modules map[string]ModuleResult) ModuleResult {
	moduleNames := []string{
		"m1_rdap", "m2_tld_table", "m3_length", "m4_word_count",
		"m5_pronounceability", "m6_segmenter", "m7_keyword_popularity",
		"m8_cpc", "m9_search_results", "m10_cross_tld",
		"m11_trademark", "m12_authority",
	}

	total := 0
	withData := 0
	for _, name := range moduleNames {
		if mod, ok := modules[name]; ok {
			total++
			if mod.Status == "SUCCESS" {
				withData++
			}
		}
	}

	if total == 0 {
		return ModuleResult{
			Value: nil, Confidence: 0.0,
			Data:   map[string]interface{}{"completeness_ratio": 0.0, "label": "none"},
			Status: "SUCCESS",
		}
	}

	ratio := float64(withData) / float64(total)
	label := "very_low"
	switch {
	case ratio >= 0.9:
		label = "high"
	case ratio >= 0.7:
		label = "medium"
	case ratio >= 0.5:
		label = "low"
	}

	return ModuleResult{
		Value:      float64Ptr(ratio),
		Confidence: ratio,
		Data: map[string]interface{}{
			"completeness_ratio": math.Round(ratio*100) / 100,
			"label":              label,
			"modules_with_data":  withData,
			"applicable_modules": total,
		},
		Status: "SUCCESS",
	}
}

func m15Pricing(sld string, tld string, words ModuleResult, modules map[string]ModuleResult) (float64, float64, float64, map[string]interface{}) {
	tldScore := tldScores[tld]
	if tldScore == 0 {
		tldScore = 0.2
	}

	scarcityBase := float64(len(sld))
	if scarcityBase <= 3 {
		scarcityBase = 13000000
	} else if scarcityBase <= 4 {
		scarcityBase = 1000000
	} else if scarcityBase <= 5 {
		scarcityBase = 100000
	} else if scarcityBase <= 7 {
		scarcityBase = 10000
	} else {
		scarcityBase = 1000
	}

	tldMult := tldScore / 10.0
	base := scarcityBase * tldMult

	value := base
	breakdown := map[string]interface{}{
		"scarcity_base": base,
		"tld_mult":      tldMult,
	}

	m3, ok := modules["m3_length"]
	if ok && m3.Value != nil {
		mult := *m3.Value
		if mult > 1.0 {
			value *= mult
			breakdown["m3_length"] = map[string]interface{}{"multiplier": mult, "effect": "boost"}
		}
	}

	m5, ok := modules["m5_pronounceability"]
	if ok && m5.Value != nil {
		mult := *m5.Value
		if mult > 1.0 {
			value *= mult
			breakdown["m5_pronounceability"] = map[string]interface{}{"multiplier": mult, "effect": "boost"}
		}
	}

	low := value * 0.5
	high := value * 1.5

	return value, low, high, breakdown
}

func normalizeScore(value float64, modules map[string]ModuleResult) int {
	if value <= 0 {
		return 5
	}

	logVal := math.Log10(value + 1)
	score := int(math.Round(logVal * 15))

	m3, ok := modules["m3_length"]
	if ok && m3.Value != nil && *m3.Value >= 8.0 {
		score += 10
	}

	m5, ok := modules["m5_pronounceability"]
	if ok && m5.Value != nil && *m5.Value >= 1.5 {
		score += 5
	}

	m16, ok := modules["m16_brandability"]
	if ok && m16.Value != nil && *m16.Value >= 5.0 {
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

func m16Brandability(sld string, words ModuleResult) ModuleResult {
	score := 0.0
	data := map[string]interface{}{
		"is_dictionary":  false,
		"syllable_count": 0,
		"pattern_type":   "unknown",
		"ending_quality": "none",
	}

	wordList, _ := words.Data["winner"].([]string)
	if len(wordList) > 0 {
		for _, w := range wordList {
			if commonWords[w] {
				data["is_dictionary"] = true
				score += 30
				break
			}
		}
	}

	syllables := countSyllables(sld)
	data["syllable_count"] = syllables
	switch {
	case syllables <= 2:
		score += 25
	case syllables <= 3:
		score += 15
	case syllables <= 4:
		score += 5
	}

	pattern := detectPattern(sld)
	data["pattern_type"] = pattern
	switch pattern {
	case "rhyme":
		score += 15
	case "alliteration":
		score += 10
	case "repetition":
		score += 8
	case "blend":
		score += 12
	}

	ending := ""
	if len(sld) >= 3 {
		ending = sld[len(sld)-3:]
	} else {
		ending = sld
	}
	data["ending_quality"] = ending
	if isStrongEnding(ending) {
		score += 15
	}

	if len(sld) > 10 {
		score -= float64(len(sld)-10) * 2
	}

	normalized := math.Max(0, math.Min(10, score/10))

	return ModuleResult{
		Value:      float64Ptr(normalized),
		Confidence: 0.8,
		Data:       data,
		Status:     "SUCCESS",
	}
}

func countSyllables(s string) int {
	count := 0
	prevVowel := false
	for i := 0; i < len(s); i++ {
		isV := isVowel(s[i])
		if isV && !prevVowel {
			count++
		}
		prevVowel = isV
	}
	if count == 0 {
		count = 1
	}
	return count
}

func detectPattern(s string) string {
	if len(s) >= 4 {
		ending := s[len(s)-2:]
		for i := 0; i < len(s)-2; i++ {
			if i+2 <= len(s) && s[i:i+2] == ending {
				return "rhyme"
			}
		}
	}
	if len(s) >= 4 && s[0] == s[1] {
		return "repetition"
	}
	if len(s) >= 4 && s[0] == s[2] {
		return "alliteration"
	}
	seeds := []string{"cloud", "tech", "web", "data", "app", "hub", "lab", "box", "top", "pro"}
	for _, w := range seeds {
		if strings.Contains(s, w) && len(s) > len(w) {
			return "blend"
		}
	}
	return "none"
}

func isStrongEnding(ending string) bool {
	for _, s := range strongEnds {
		if ending == s {
			return true
		}
	}
	return false
}

func vowelScore(s string) float64 {
	vowelCount := 0
	for i := 0; i < len(s); i++ {
		if isVowel(s[i]) {
			vowelCount++
		}
	}
	ratio := float64(vowelCount) / float64(len(s))
	if ratio > 0.80 {
		return 10.0
	}
	dev := math.Abs(ratio - 0.40)
	score := 100.0 * (1.0 - dev/0.40)
	return math.Max(0, math.Min(100, score))
}

func clusterScore(s string) float64 {
	maxRun := 0
	run := 0
	for i := 0; i < len(s); i++ {
		if !isVowel(s[i]) && s[i] != '-' {
			run++
			if run > maxRun {
				maxRun = run
			}
		} else {
			run = 0
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
		return math.Max(0, 10.0-float64(maxRun-4)*3.0)
	}
}

func bigramScore(s string) float64 {
	if len(s) < 2 {
		return 5.0
	}
	total := 0.0
	count := 0
	for i := 0; i < len(s)-1; i++ {
		bigram := s[i : i+2]
		freq, ok := bigramFreq[bigram]
		if !ok {
			freq = 0.05
		}
		total += freq
		count++
	}
	avg := total / float64(count)
	return avg * 100.0
}

func resolveTldProfile(score float64) string {
	profiles := []struct {
		threshold float64
		profile   string
	}{
		{10.0, "tier_10"}, {9.0, "tier_09"}, {8.5, "tier_085"}, {8.0, "tier_08"},
		{7.5, "tier_075"}, {7.0, "tier_07"}, {6.5, "tier_065"}, {6.0, "tier_06"},
		{5.0, "tier_05"}, {4.5, "tier_045"}, {4.0, "tier_04"}, {3.5, "tier_035"},
		{3.0, "tier_03"}, {2.0, "tier_02"}, {1.0, "tier_01"}, {0.2, "tier_00"},
	}
	for _, p := range profiles {
		if score >= p.threshold-0.001 {
			return p.profile
		}
	}
	return "tier_00"
}

func tierRank(tier string) int {
	order := []string{"elite", "high", "medium_high", "medium", "low", "informational", ""}
	for i, t := range order {
		if t == tier {
			return i
		}
	}
	return len(order)
}

func cpcTierMult(tier string) float64 {
	mults := map[string]float64{
		"elite": 5.0, "high": 3.0, "medium_high": 2.5,
		"medium": 2.0, "low": 1.5, "informational": 1.0,
	}
	if m, ok := mults[tier]; ok {
		return m
	}
	return 1.0
}
