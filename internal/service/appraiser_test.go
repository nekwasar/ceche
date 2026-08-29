package service

import (
	"testing"
)

func TestCalculateScore(t *testing.T) {
	tests := []struct {
		name    string
		domain  string
		tier    string
		wantMin int
		wantMax int
	}{
		{"premium .com", "google.com", "pro", 70, 100},
		{"short domain", "go.com", "pro", 80, 100},
		{"long domain", "verylongdomainname.com", "pro", 5, 40},
		{"free tier", "google.com", "free", 0, 100},
		{"single word", "cloud.com", "pro", 60, 100},
		{"two words", "cloudtech.com", "pro", 40, 90},
		{"with digit", "go2.com", "pro", 30, 80},
		{".net tld", "cloud.net", "pro", 50, 90},
		{".io tld", "cloud.io", "pro", 50, 90},
		{".xyz tld", "cloud.xyz", "pro", 30, 70},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			score, metrics := CalculateScore(tt.domain, tt.tier)
			if score < tt.wantMin || score > tt.wantMax {
				t.Errorf("score = %d, want [%d, %d], domain = %s", score, tt.wantMin, tt.wantMax, tt.domain)
			}
			if metrics.Domain != tt.domain {
				t.Errorf("domain = %s, want %s", metrics.Domain, tt.domain)
			}
			if metrics.SLD == "" {
				t.Error("SLD should not be empty")
			}
			if metrics.TLD == "" {
				t.Error("TLD should not be empty")
			}
		})
	}
}

func TestFreeTierGating(t *testing.T) {
	score, metrics := CalculateScore("google.com", "free")

	if score < 0 || score > 100 {
		t.Errorf("score = %d, want [0, 100]", score)
	}

	if metrics.Confidence != "free_tier" {
		t.Errorf("confidence = %s, want free_tier", metrics.Confidence)
	}

	teaser, ok := metrics.Modules["teaser"]
	if !ok {
		t.Fatal("free tier should have teaser module")
	}
	if teaser.Status != "FREE_TIER" {
		t.Errorf("teaser status = %s, want FREE_TIER", teaser.Status)
	}

	if _, ok := metrics.Modules["m1_rdap"]; ok {
		t.Error("free tier should not have m1_rdap module")
	}
}

func TestPremiumTierFullAccess(t *testing.T) {
	_, metrics := CalculateScore("google.com", "pro")

	if metrics.Confidence == "free_tier" {
		t.Error("pro tier should not have free_tier confidence")
	}

	requiredModules := []string{
		"m1_rdap", "m2_tld_table", "m3_length", "m4_word_count",
		"m5_pronounceability", "m6_segmenter", "m7_keyword_popularity",
		"m8_cpc", "m9_search_results", "m10_cross_tld",
		"m11_trademark", "m12_authority", "m16_brandability",
	}

	for _, mod := range requiredModules {
		if _, ok := metrics.Modules[mod]; !ok {
			t.Errorf("pro tier should have %s module", mod)
		}
	}
}

func TestFloat64Ptr(t *testing.T) {
	v := float64Ptr(42.0)
	if v == nil {
		t.Fatal("expected non-nil pointer")
	}
	if *v != 42.0 {
		t.Errorf("value = %f, want 42.0", *v)
	}
}

func TestM16Brandability(t *testing.T) {
	tests := []struct {
		name   string
		sld    string
		wantOk bool
	}{
		{"single word", "cloud", true},
		{"two words", "cloudtech", true},
		{"nonsense", "xyzqwk", true},
		{"short", "go", true},
		{"long", "verylongdomainname", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			words := m6Segmenter(tt.sld)
			result := m16Brandability(tt.sld, words)
			if result.Value == nil && tt.wantOk {
				t.Error("expected non-nil value")
			}
			if result.Status != "SUCCESS" {
				t.Errorf("status = %s, want SUCCESS", result.Status)
			}
			if result.Confidence != 0.8 {
				t.Errorf("confidence = %f, want 0.8", result.Confidence)
			}
		})
	}
}

func TestM6Segmenter(t *testing.T) {
	tests := []struct {
		name      string
		sld       string
		wantWords int
	}{
		{"single word", "cloud", 1},
		{"compound", "cloudtech", 2},
		{"unknown", "xyzqwk", 1},
		{"contains word", "mycloud", 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := m6Segmenter(tt.sld)
			wordCount, ok := result.Data["word_count"].(int)
			if ok && wordCount != tt.wantWords {
				t.Errorf("word_count = %d, want %d", wordCount, tt.wantWords)
			}
		})
	}
}

func TestM3Length(t *testing.T) {
	tests := []struct {
		name   string
		sld    string
		wantOk bool
	}{
		{"2 chars", "go", true},
		{"3 chars", "app", true},
		{"5 chars", "cloud", true},
		{"10 chars", "cloudtechs", true},
		{"15 chars", "verylongdomain", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := m3Length(tt.sld)
			if result.Value == nil && tt.wantOk {
				t.Error("expected non-nil value")
			}
			if result.Status != "SUCCESS" {
				t.Errorf("status = %s, want SUCCESS", result.Status)
			}
		})
	}
}

func TestM5Pronounceability(t *testing.T) {
	tests := []struct {
		name   string
		sld    string
		wantOk bool
	}{
		{"2 chars", "go", true},
		{"3 chars", "app", true},
		{"5 chars", "cloud", true},
		{"10 chars", "cloudtechs", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := m5Pronounceability(tt.sld)
			if result.Value == nil && tt.wantOk {
				t.Error("expected non-nil value")
			}
			if result.Status != "SUCCESS" {
				t.Errorf("status = %s, want SUCCESS", result.Status)
			}
		})
	}
}

func TestM2TldTable(t *testing.T) {
	tests := []struct {
		name    string
		tld     string
		wantMin float64
		wantMax float64
	}{
		{".com", "com", 9.0, 10.0},
		{".net", "net", 8.0, 10.0},
		{".io", "io", 8.0, 9.0},
		{".xyz", "xyz", 7.0, 8.0},
		{".unknown", "xyz123", 0.0, 1.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := m2TldTable(tt.tld)
			if result.Value == nil {
				t.Fatal("expected non-nil value")
			}
			score := *result.Value
			if score < tt.wantMin || score > tt.wantMax {
				t.Errorf("score = %f, want [%f, %f]", score, tt.wantMin, tt.wantMax)
			}
		})
	}
}

func TestNormalizeScore(t *testing.T) {
	tests := []struct {
		name    string
		value   float64
		wantMin int
		wantMax int
	}{
		{"zero", 0, 5, 5},
		{"low", 100, 25, 45},
		{"medium", 10000, 55, 75},
		{"high", 1000000, 85, 100},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			modules := make(map[string]ModuleResult)
			score := normalizeScore(tt.value, modules)
			if score < tt.wantMin || score > tt.wantMax {
				t.Errorf("score = %d, want [%d, %d]", score, tt.wantMin, tt.wantMax)
			}
		})
	}
}
