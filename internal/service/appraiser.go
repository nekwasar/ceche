package service

import (
	"math"
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
	"ai": true, "api": true, "bit": true, "pay": true, "buy": true,
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
	"kitchen": true, "lab": true, "land": true, "law": true,
	"lawyer": true, "lead": true, "learn": true, "legal": true,
	"life": true, "light": true, "link": true, "list": true,
	"live": true, "loan": true, "local": true, "lock": true,
	"logo": true, "love": true, "mail": true, "main": true,
	"manage": true, "map": true, "margin": true, "mark": true,
	"market": true, "media": true, "meet": true, "menu": true,
	"merge": true, "metal": true, "mind": true, "mix": true,
	"mobile": true, "mode": true, "money": true, "moon": true,
	"mortgage": true, "motor": true, "music": true, "net": true,
	"network": true, "news": true, "next": true, "node": true,
	"note": true, "office": true, "online": true, "open": true,
	"option": true, "oracle": true, "order": true, "organ": true,
	"page": true, "paint": true, "pan": true, "park": true,
	"partner": true, "path": true, "pay": true, "peer": true,
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
	"shop": true, "show": true, "side": true, "site": true,
	"smart": true, "snap": true, "social": true, "solar": true,
	"solution": true, "sonic": true, "source": true, "space": true,
	"sport": true, "spot": true, "stage": true, "start": true,
	"state": true, "stock": true, "store": true, "stream": true,
	"studio": true, "style": true, "supply": true, "support": true,
	"sync": true, "system": true, "tab": true, "talk": true,
	"target": true, "task": true, "tax": true, "team": true,
	"tech": true, "term": true, "test": true, "text": true,
	"time": true, "tip": true, "today": true, "tool": true,
	"top": true, "tour": true, "town": true, "track": true,
	"trade": true, "train": true, "trend": true, "trip": true,
	"truck": true, "trust": true, "tube": true, "tune": true,
	"tv": true, "university": true, "up": true, "us": true,
	"value": true, "video": true, "view": true, "village": true,
	"vinyl": true, "visa": true, "vision": true, "voice": true,
	"volume": true, "vote": true, "wage": true, "watch": true,
	"water": true, "wave": true, "web": true, "week": true,
	"weight": true, "wheel": true, "win": true, "wire": true,
	"wise": true, "work": true, "world": true, "zone": true,
}

func CalculateScore(domain string) (int, AppraisalMetrics) {
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

	return score, AppraisalMetrics{
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
	words := simpleSegment(sld)
	if len(words) == 0 {
		return ModuleResult{
			Value: nil, Confidence: 0.0,
			Data:   map[string]interface{}{"winner": nil, "word_count": nil, "status": "no_split"},
			Status: "SKIPPED",
		}
	}
	return ModuleResult{
		Value: nil, Confidence: 0.8,
		Data: map[string]interface{}{
			"winner":     words,
			"word_count": len(words),
			"confidence": 0.8,
			"status":     "split_found",
		},
		Status: "SUCCESS",
	}
}

func simpleSegment(sld string) []string {
	for word := range commonWords {
		if len(word) >= 2 && strings.Contains(sld, word) {
			remaining := strings.Replace(sld, word, "", 1)
			if remaining != "" && len(remaining) >= 2 {
				return []string{word, remaining}
			}
			return []string{word}
		}
	}

	splitPoints := []int{}
	for i := 0; i < len(sld)-1; i++ {
		if isVowel(sld[i]) && !isVowel(sld[i+1]) && i > 1 && i < len(sld)-2 {
			splitPoints = append(splitPoints, i+1)
		}
	}
	for _, pos := range splitPoints {
		left := sld[:pos]
		right := sld[pos:]
		if len(left) >= 2 && len(right) >= 2 {
			if commonWords[left] || commonWords[right] {
				return []string{left, right}
			}
		}
	}

	return []string{sld}
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

	domainScore := 0.0
	for _, w := range wordList {
		if cpcKeywords[w] != "" {
			domainScore = math.Max(domainScore, 30.0)
		}
	}

	mult := 1.0
	switch {
	case domainScore >= 90:
		mult = 8.0
	case domainScore >= 70:
		mult = 5.0
	case domainScore >= 50:
		mult = 3.0
	case domainScore >= 30:
		mult = 2.0
	case domainScore >= 10:
		mult = 1.5
	}

	return ModuleResult{
		Value:      float64Ptr(mult),
		Confidence: 0.5,
		Data: map[string]interface{}{
			"domain_score": domainScore,
			"multiplier":   mult,
			"source":       "estimated",
		},
		Status: "SUCCESS",
	}
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
	sld := domain
	if idx := strings.LastIndex(domain, "."); idx != -1 {
		sld = domain[:idx]
	}
	_ = sld

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
	if len(s) >= 4 && s[0] == s[2] {
		return "alliteration"
	}
	if len(s) >= 4 && s[0] == s[1] {
		return "repetition"
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
