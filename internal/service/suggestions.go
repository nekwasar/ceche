package service

import (
	"context"
	"fmt"
	"math"
	"math/rand"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type SuggestionCriteria struct {
	TLDs       []string `json:"tlds,omitempty"`
	MaxLength  int      `json:"max_length,omitempty"`
	Style      string   `json:"style,omitempty"`
	Count      int      `json:"count,omitempty"`
}

type Suggestion struct {
	Domain    string  `json:"domain"`
	TLD       string  `json:"tld"`
	Score     float64 `json:"score"`
	Reasoning string  `json:"reasoning"`
	Category  string  `json:"category"`
}

type SuggestionResult struct {
	Seed        string       `json:"seed"`
	Criteria    SuggestionCriteria `json:"criteria"`
	Suggestions []Suggestion `json:"suggestions"`
	Count       int          `json:"count"`
}

type SuggestionService struct {
	db *pgxpool.Pool
}

func NewSuggestionService(db *pgxpool.Pool) *SuggestionService {
	return &SuggestionService{db: db}
}

func (s *SuggestionService) Generate(ctx context.Context, userID string, seed string, criteria SuggestionCriteria) (*SuggestionResult, error) {
	seed = strings.ToLower(strings.TrimSpace(seed))
	if seed == "" {
		return nil, fmt.Errorf("seed word is required")
	}

	if criteria.Count <= 0 {
		criteria.Count = 20
	}
	if criteria.Count > 50 {
		criteria.Count = 50
	}

	if len(criteria.TLDs) == 0 {
		criteria.TLDs = []string{"com", "net", "io", "co"}
	}

	if criteria.MaxLength <= 0 {
		criteria.MaxLength = 15
	}

	var suggestions []Suggestion

	suggestions = append(suggestions, s.generatePrefixVariations(seed, criteria)...)
	suggestions = append(suggestions, s.generateSuffixVariations(seed, criteria)...)
	suggestions = append(suggestions, s.generateSynonymVariations(seed, criteria)...)
	suggestions = append(suggestions, s.generateCompoundVariations(seed, criteria)...)
	suggestions = append(suggestions, s.generatePhoneticVariations(seed, criteria)...)
	suggestions = append(suggestions, s.generateTLDAlternatives(seed, criteria)...)

	seen := make(map[string]bool)
	unique := make([]Suggestion, 0, len(suggestions))
	for _, sug := range suggestions {
		if !seen[sug.Domain] && len(sug.Domain) <= criteria.MaxLength && len(sug.Domain) >= 3 {
			seen[sug.Domain] = true
			unique = append(unique, sug)
		}
	}

	suggestions = unique

	rand.Shuffle(len(suggestions), func(i, j int) {
		suggestions[i], suggestions[j] = suggestions[j], suggestions[i]
	})

	if len(suggestions) > criteria.Count {
		suggestions = suggestions[:criteria.Count]
	}

	for i := range suggestions {
		suggestions[i].Score = calculateSuggestionScore(suggestions[i])
	}

	byScore := suggestions
	for i := 1; i < len(byScore); i++ {
		for j := i; j > 0 && byScore[j].Score > byScore[j-1].Score; j-- {
			byScore[j], byScore[j-1] = byScore[j-1], byScore[j]
		}
	}
	suggestions = byScore

	result := &SuggestionResult{
		Seed:        seed,
		Criteria:    criteria,
		Suggestions: suggestions,
		Count:       len(suggestions),
	}

	s.storeResult(ctx, userID, seed, criteria, result)

	return result, nil
}

func (s *SuggestionService) generatePrefixVariations(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion
	prefixes := []string{
		"get", "try", "use", "go", "my", "the", "pro", "top", "best", "fast",
		"easy", "smart", "quick", "super", "mega", "ultra", "next", "new", "one",
		"all", "any", "our", "your", "this", "that", "its", "hub", "lab", "box",
		"app", "dev", "web", "net", "data", "cloud", "meta", "neo", "eco", "bio",
		"cyber", "auto", "micro", "poly", "omni", "pan", "max", "plus", "edge",
		"core", "node", "flow", "sync", "loop", "byte", "pixel", "arc",
	}

	for _, prefix := range prefixes {
		for _, tld := range criteria.TLDs {
			domain := prefix + seed
			results = append(results, Suggestion{
				Domain:    domain + "." + tld,
				TLD:       tld,
				Score:     0,
				Reasoning: fmt.Sprintf("Prefix '%s' + '%s'", prefix, seed),
				Category:  "prefix",
			})
		}
	}

	return results
}

func (s *SuggestionService) generateSuffixVariations(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion
	suffixes := []string{
		"hub", "lab", "pro", "io", "ly", "fy", "app", "dev", "tech", "now",
		"go", "box", "base", "spot", "point", "place", "zone", "land", "world",
		"link", "net", "co", "hq", "works", "studio", "forge", "craft", "stack",
		"node", "pipe", "gate", "loop", "byte", "pixel", "core", "root", "unit",
		"ai", "db", "gen", "lib", "bot", "pad", "note", "clip", "cart", "mint",
		"task", "share", "sync", "flow", "mesh", "grid", "arc",
	}

	for _, suffix := range suffixes {
		for _, tld := range criteria.TLDs {
			domain := seed + suffix
			results = append(results, Suggestion{
				Domain:    domain + "." + tld,
				TLD:       tld,
				Score:     0,
				Reasoning: fmt.Sprintf("'%s' + suffix '%s'", seed, suffix),
				Category:  "suffix",
			})
		}
	}

	return results
}

func (s *SuggestionService) generateSynonymVariations(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion

	synonyms := synonymMap[seed]
	if len(synonyms) == 0 {
		for word, syns := range synonymMap {
			for _, syn := range syns {
				if syn == seed {
					synonyms = append(synonyms, word)
					break
				}
			}
		}
	}

	if len(synonyms) == 0 {
		return results
	}

	for _, syn := range synonyms {
		for _, tld := range criteria.TLDs {
			results = append(results, Suggestion{
				Domain:    syn + "." + tld,
				TLD:       tld,
				Score:     0,
				Reasoning: fmt.Sprintf("Synonym of '%s': '%s'", seed, syn),
				Category:  "synonym",
			})
		}
	}

	return results
}

func (s *SuggestionService) generateCompoundVariations(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion

	compounds := compoundWords[seed]
	if len(compounds) == 0 {
		for word, comps := range compoundWords {
			for _, c := range comps {
				if c == seed {
					compounds = append(compounds, word)
					break
				}
			}
		}
	}

	for _, compound := range compounds {
		for _, tld := range criteria.TLDs {
			results = append(results, Suggestion{
				Domain:    seed + compound + "." + tld,
				TLD:       tld,
				Score:     0,
				Reasoning: fmt.Sprintf("Compound: '%s' + '%s'", seed, compound),
				Category:  "compound",
			})
			results = append(results, Suggestion{
				Domain:    compound + seed + "." + tld,
				TLD:       tld,
				Score:     0,
				Reasoning: fmt.Sprintf("Compound: '%s' + '%s'", compound, seed),
				Category:  "compound",
			})
		}
	}

	return results
}

func (s *SuggestionService) generatePhoneticVariations(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion

	replacements := map[string][]string{
		"f":  {"ph", "ff"},
		"ph": {"f"},
		"c":  {"k", "s", "z"},
		"k":  {"c", "q"},
		"s":  {"z", "ss"},
		"z":  {"s", "x"},
		"i":  {"y", "ee"},
		"ee": {"i", "ea"},
		"oo": {"u", "ew"},
		"ou": {"ow", "au"},
		"ai": {"ay", "ei"},
		"ey": {"i", "ee"},
		"tion": {"shun", "sion"},
		"ness": {"niss", "nez"},
	}

	for orig, alts := range replacements {
		if strings.Contains(seed, orig) {
			for _, alt := range alts {
				varied := strings.Replace(seed, orig, alt, 1)
				for _, tld := range criteria.TLDs {
					results = append(results, Suggestion{
						Domain:    varied + "." + tld,
						TLD:       tld,
						Score:     0,
						Reasoning: fmt.Sprintf("Phonetic: '%s' → '%s'", orig, alt),
						Category:  "phonetic",
					})
				}
			}
		}
	}

	return results
}

func (s *SuggestionService) generateTLDAlternatives(seed string, criteria SuggestionCriteria) []Suggestion {
	var results []Suggestion

	allTLDs := []string{"com", "net", "org", "io", "co", "dev", "ai", "app", "tech", "xyz"}
	altTLDs := make(map[string]bool)
	for _, t := range allTLDs {
		altTLDs[t] = true
	}
	for _, t := range criteria.TLDs {
		altTLDs[t] = false
	}

	for tld := range altTLDs {
		results = append(results, Suggestion{
			Domain:    seed + "." + tld,
			TLD:       tld,
			Score:     0,
			Reasoning: fmt.Sprintf("TLD alternative: .%s", tld),
			Category:  "tld",
		})
	}

	return results
}

func calculateSuggestionScore(sug Suggestion) float64 {
	score := 50.0

	length := len(sug.Domain) - len(sug.TLD) - 1
	if length <= 5 {
		score += 15.0
	} else if length <= 8 {
		score += 10.0
	} else if length <= 12 {
		score += 5.0
	}

	switch sug.TLD {
	case "com":
		score += 10.0
	case "net", "org":
		score += 7.0
	case "io", "co":
		score += 8.0
	case "dev", "ai", "app":
		score += 9.0
	case "tech":
		score += 6.0
	default:
		score += 3.0
	}

	switch sug.Category {
	case "prefix":
		score += 5.0
	case "suffix":
		score += 4.0
	case "synonym":
		score += 8.0
	case "compound":
		score += 6.0
	case "phonetic":
		score += 3.0
	case "tld":
		score += 2.0
	}

	sld := strings.TrimSuffix(sug.Domain, "."+sug.TLD)
	if _, ok := keywordPopularity[sld]; ok {
		score += 10.0
	}
	if commonWords[sld] {
		score += 8.0
	}

	vowelCount := 0
	for _, c := range sld {
		if c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' {
			vowelCount++
		}
	}
	if len(sld) > 0 {
		vowelRatio := float64(vowelCount) / float64(len(sld))
		if vowelRatio >= 0.3 && vowelRatio <= 0.6 {
			score += 5.0
		}
	}

	if !strings.ContainsAny(sld, "qxjz") {
		score += 3.0
	}

	return math.Min(100, score)
}

func (s *SuggestionService) storeResult(ctx context.Context, userID, seed string, criteria SuggestionCriteria, result *SuggestionResult) {
	if userID == "" {
		return
	}

	_, err := s.db.Exec(ctx,
		`INSERT INTO suggestions (user_id, seed, criteria_json, results_json)
		 VALUES ($1, $2, $3, $4)`,
		userID, seed, criteria, result,
	)
	if err != nil {
		log.Warn().Err(err).Msg("failed to store suggestion result")
	}
}

var synonymMap = map[string][]string{
	"fast":    {"quick", "rapid", "speed", "swift", "blitz"},
	"quick":   {"fast", "rapid", "speedy", "swift", "snap"},
	"smart":   {"clever", "bright", "sharp", "wise", "intel"},
	"cloud":   {"sky", "aero", "nimbus", "cumulus", "stratus"},
	"tech":    {"digital", "cyber", "net", "web", "info"},
	"code":    {"dev", "script", "hack", "编程", "byte"},
	"data":    {"info", "meta", "analytics", "stats", "metrics"},
	"home":    {"house", "abode", "dwelling", "residence", "nest"},
	"store":   {"shop", "market", "boutique", "mart", "outlet"},
	"news":    {"press", "media", "journal", "post", "times"},
	"game":    {"play", "arcade", "quest", "venture", "realm"},
	"music":   {"sound", "audio", "tune", "melody", "beat"},
	"photo":   {"image", "pic", "snap", "shot", "capture"},
	"food":    {"eat", "dish", "meal", "bite", "feast"},
	"travel":  {"trip", "voyage", "journey", "tour", "wander"},
	"health":  {"well", "vital", "fit", "zen", "care"},
	"finance": {"fund", "capital", "wealth", "asset", "equity"},
	"learn":   {"study", "edu", "scholar", "academy", "brain"},
	"design":  {"create", "craft", "art", "style", "form"},
	"market":  {"trade", "exchange", "bazaar", "fair", "deal"},
	"social":  {"connect", "link", "bond", "meet", "gather"},
	"secure":  {"safe", "guard", "shield", "defend", "armor"},
	"power":   {"energy", "force", "might", "strength", "vigor"},
	"bright":  {"lumin", "radiant", "glow", "shine", "spark"},
	"green":   {"eco", "bio", "terra", "nature", "leaf"},
	"blue":    {"azure", "ocean", "sky", "marine", "aqua"},
	"red":     {"crimson", "ruby", "scarlet", "vermilion", "ember"},
	"black":   {"obsidian", "onyx", "midnight", "shadow", "void"},
	"white":   {"snow", "pearl", "ivory", "crystal", "frost"},
	"gold":    {"amber", "aurum", "gilt", "golden", "nugget"},
	"silver":  {"chrome", "platinum", "sterling", "argent", "steel"},
	"fire":    {"flame", "blaze", "inferno", "ember", "spark"},
	"water":   {"aqua", "wave", "stream", "flow", "ripple"},
	"earth":   {"terra", "ground", "soil", "land", "terra"},
	"wind":    {"breeze", "gale", "zephyr", "air", "draft"},
	"star":    {"astro", "nova", "celestial", "lunar", "solar"},
	"moon":    {"lunar", "luna", "crescent", "gibbous", "astro"},
	"sun":     {"solar", "helio", "ray", "dawn", "bright"},
	"tree":    {"oak", "pine", "elm", "cedar", "birch"},
	"mountain": {"peak", "summit", "alpine", "ridge", "crest"},
	"river":   {"stream", "creek", "brook", "flow", "current"},
	"ocean":   {"sea", "marine", "wave", "deep", "aqua"},
	"forest":  {"wood", "grove", "thicket", "canopy", "timber"},
	"desert":  {"arid", "dune", "sand", "mesa", "oasis"},
	"city":    {"metro", "urban", "metro", "civic", "town"},
	"village": {"hamlet", "settlement", "community", "locale", "burgh"},
	"bridge":  {"span", "arch", "crossing", "link", "bay"},
	"castle":  {"fort", "keep", "tower", "citadel", "stronghold"},
	"temple":  {"shrine", "sanctum", "chapel", "basilica", "haven"},
	"garden":  {"grove", "meadow", "park", "oasis", "haven"},
	"library": {"archive", "vault", "depot", "repository", "stash"},
	"museum":  {"gallery", "institute", "academy", "hall", "annex"},
	"theater": {"playhouse", "arena", "auditorium", "hall", "stage"},
}

var compoundWords = map[string][]string{
	"cloud":  {"stack", "base", "sync", "hub", "net", "ware", "forge"},
	"data":   {"base", "set", "flow", "link", "mine", "pool", "lab"},
	"web":    {"site", "page", "flow", "link", "net", "stack", "hook"},
	"tech":   {"stack", "lab", "hub", "flow", "base", "net", "ware"},
	"code":   {"base", "lab", "hub", "flow", "net", "stack", "ware"},
	"app":    {"hub", "lab", "flow", "base", "stack", "ware", "forge"},
	"cyber":  {"sec", "lab", "hub", "flow", "net", "stack", "ware"},
	"digital": {"flow", "hub", "lab", "net", "stack", "base", "forge"},
	"smart":  {"hub", "lab", "flow", "net", "stack", "base", "ware"},
	"green":  {"tech", "lab", "hub", "flow", "net", "stack", "ware"},
	"blue":   {"sky", "ocean", "wave", "flow", "net", "stack", "lab"},
	"red":    {"fox", "line", "dot", "hub", "lab", "flow", "net"},
	"black":  {"box", "line", "dot", "hub", "lab", "flow", "net"},
	"white":  {"fox", "line", "dot", "hub", "lab", "flow", "net"},
	"gold":   {"line", "dot", "hub", "lab", "flow", "net", "stack"},
	"silver": {"line", "dot", "hub", "lab", "flow", "net", "stack"},
	"fire":   {"fly", "wall", "hub", "lab", "flow", "net", "stack"},
	"water":  {"flow", "drop", "wave", "hub", "lab", "net", "stack"},
	"earth":  {"quake", "hub", "lab", "flow", "net", "stack", "ware"},
	"wind":   {"flow", "hub", "lab", "net", "stack", "base", "forge"},
	"star":   {"link", "hub", "lab", "flow", "net", "stack", "forge"},
	"moon":   {"light", "hub", "lab", "flow", "net", "stack", "forge"},
	"sun":    {"light", "hub", "lab", "flow", "net", "stack", "forge"},
	"tree":   {"house", "hub", "lab", "flow", "net", "stack", "forge"},
	"mountain": {"peak", "hub", "lab", "flow", "net", "stack", "forge"},
	"river":  {"flow", "hub", "lab", "net", "stack", "base", "forge"},
	"ocean":  {"deep", "hub", "lab", "flow", "net", "stack", "forge"},
	"forest": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"city":   {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"market": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"learn":  {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"social": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"health": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"food":   {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"music":  {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"game":   {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"photo":  {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"design": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"secure": {"hub", "lab", "flow", "net", "stack", "base", "forge"},
	"power":  {"hub", "lab", "flow", "net", "stack", "base", "forge"},
}
