# Ceche — Bug Report & Fix Plan

> Comprehensive list of all issues found in codebase, enterprise-grade fixes, and implementation order.

---

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| CRITICAL — Compilation Errors | 3 | Pending |
| HIGH — Runtime Failures | 2 | Pending |
| MEDIUM — Security & Architecture | 3 | Pending |
| LOW — Quality & Completeness | 5 | Pending |

---

## CRITICAL — Compilation Errors (Code Won't Build)

### Bug 1.1: `ModuleResult.Value` Type Mismatch

**File:** `internal/service/appraiser.go:8`

**Current:**
```go
type ModuleResult struct {
    Value    float64                `json:"value"`
    Confidence float64              `json:"confidence"`
    Data     map[string]interface{} `json:"data"`
    Status   string                 `json:"status"`
}
```

**Problem:** `Value` is `float64` (non-pointer), but code:
- Assigns `nil` to it (lines 222, 309, 315, 352)
- Dereferences it with `*` (lines 571, 580, 603, 608, 613)

Both are compile errors in Go.

**Fix:**
```go
type ModuleResult struct {
    Value      *float64              `json:"value"`
    Confidence float64               `json:"confidence"`
    Data       map[string]interface{} `json:"data"`
    Status     string                `json:"status"`
}

func float64Ptr(v float64) *float64 { return &v }
```

**Affected locations:**

| Line | Current | Fixed |
|------|---------|-------|
| 149 | `Value: 1.0` | `Value: float64Ptr(1.0)` |
| 166 | `Value: score` | `Value: float64Ptr(score)` |
| 179 | `Value: mult` | `Value: float64Ptr(mult)` |
| 206 | `Value: mult` | `Value: float64Ptr(mult)` |
| 222 | `Value: nil` | `Value: nil` (correct after fix) |
| 242 | `Value: mult` | `Value: float64Ptr(mult)` |
| 257 | `Value: 2.0` | `Value: float64Ptr(2.0)` |
| 292 | `Value: mult` | `Value: float64Ptr(mult)` |
| 309 | `Value: nil` | `Value: nil` (correct after fix) |
| 315 | `Value: nil` | `Value: nil` (correct after fix) |
| 352 | `Value: nil` | `Value: nil` (correct after fix) |

**Consumer sites (dereference):**

| Line | Current | Fixed |
|------|---------|-------|
| 571-577 | `mult := *m3.Value` | `*m3.Value` (works after type change) |
| 580-587 | `mult := *m5.Value` | `*m5.Value` (works after type change) |
| 603-606 | `*m3.Value >= 8.0` | `*m3.Value >= 8.0` (works after type change) |
| 608-611 | `*m5.Value >= 1.5` | `*m5.Value >= 1.5` (works after type change) |
| 613-616 | `*m16.Value >= 5.0` | `*m16.Value >= 5.0` (works after type change) |

---

### Bug 1.2: `m16Brandability` Function Undefined

**File:** `internal/service/appraiser.go:112`

**Current:**
```go
modules["m16_brandability"] = m16Brandability(sld, words)
```

**Problem:** Function called but never defined anywhere in codebase.

**Fix:** Implement `m16Brandability` function:

```go
func m16Brandability(sld string, words ModuleResult) ModuleResult {
    score := 0.0
    data := map[string]interface{}{
        "is_dictionary":  false,
        "syllable_count": 0,
        "pattern_type":   "unknown",
        "ending_quality": "none",
    }

    // 1. Dictionary word detection
    wordList, _ := words.Data["winner"].([]string)
    if len(wordList) > 0 {
        for _, w := range wordList {
            if isCommonWord(w) {
                data["is_dictionary"] = true
                score += 30
                break
            }
        }
    }

    // 2. Syllable count
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

    // 3. Pattern detection
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

    // 4. Strong ending check
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

    // 5. Length penalty
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
```

**Helper functions needed:**
```go
func isCommonWord(word string) bool {
    common := map[string]bool{
        "go": true, "app": true, "web": true, "data": true, "net": true,
        "cloud": true, "tech": true, "dev": true, "hub": true, "lab": true,
        "box": true, "top": true, "pro": true, "max": true, "one": true,
        // ... expand to 200+ words
    }
    return common[word]
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
    // Check for rhyme (ending repetition)
    if len(s) >= 4 {
        ending := s[len(s)-2:]
        for i := 0; i < len(s)-2; i++ {
            if i+2 <= len(s) && s[i:i+2] == ending {
                return "rhyme"
            }
        }
    }
    // Check for alliteration (starting repetition)
    if len(s) >= 4 && s[0] == s[2] {
        return "alliteration"
    }
    // Check for repetition
    if len(s) >= 4 && s[0] == s[1] {
        return "repetition"
    }
    // Check for blend (two words merged)
    wordList := []string{"cloud", "tech", "web", "data", "app", "hub", "lab", "box", "top", "pro"}
    for _, w := range wordList {
        if strings.Contains(s, w) && len(s) > len(w) {
            return "blend"
        }
    }
    return "none"
}

func isStrongEnding(ending string) bool {
    strongEnds := []string{
        "ify", "ly", "ex", "io", "ox", "ix", "ux", "oo", "ee",
        "ia", "elle", "ora", "ina", "ara", "ica", "ota", "ula", "ena",
        "va", "vi", "vo", "vu", "ka", "ke", "ki", "ko", "ku",
        "ba", "be", "bi", "bo", "bu", "da", "de", "di", "do", "du",
    }
    for _, s := range strongEnds {
        if ending == s {
            return true
        }
    }
    return false
}
```

---

### Bug 1.3: `nil` Assigned to `float64` Field

**File:** `internal/service/appraiser.go:222, 309, 315, 352`

**Current:**
```go
return ModuleResult{
    Value: nil, Confidence: 0.0,
    ...
}
```

**Problem:** `nil` cannot be assigned to `float64`.

**Fix:** After Bug 1.1 fix (`Value` becomes `*float64`), `nil` is valid. No additional change needed.

---

## HIGH — Runtime Failures

### Bug 2.1: Missing `tld` Column in INSERT

**File:** `internal/api/v1/appraise.go:79-81`

**Current:**
```go
INSERT INTO appraisals (user_id, domain, score, metrics, idempotency_key)
VALUES ($1, $2, $3, $4, $5)
```

**Problem:** Migration `002_appraisals.up.sql` requires `tld TEXT NOT NULL`. INSERT omits it. Runtime error on every save.

**Fix:**
```go
// Extract TLD before INSERT
tld := ""
if idx := strings.LastIndex(req.Domain, "."); idx != -1 {
    tld = req.Domain[idx+1:]
}

// Include tld in INSERT
err := db.QueryRow(r.Context(),
    `INSERT INTO appraisals (user_id, domain, tld, score, metrics, idempotency_key)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    userID, req.Domain, tld, score, metricsJSON, idempotencyKey,
).Scan(&appraisalID)
```

---

### Bug 2.2: Domain Names Stored in Plaintext

**File:** `internal/api/v1/appraise.go:81`

**Current:**
```go
userID, req.Domain, score, metricsJSON, idempotencyKey
```

**Problem:** Domain stored as plaintext. Security violation. GDPR risk.

**Fix (Phase 2):** Add AES-256-GCM encryption layer:
- `domain_encrypted` = AES-256-GCM(domain)
- `domain_hash` = SHA-256(domain) for lookups
- Never store plaintext
- See `docs/enterprise-standards.md` for encryption implementation

---

## MEDIUM — Security & Architecture

### Bug 3.1: No Free/Premium Gating

**File:** `internal/service/appraiser.go:88`

**Current:** `CalculateScore(domain string)` — no tier parameter.

**Fix (Phase 2):**
```go
func CalculateScore(domain string, tier string) (int, AppraisalMetrics) {
    modules := computeAllModules(domain)
    score := normalizeScore(modules)
    return shapeResponse(domain, score, modules, tier)
}

func shapeResponse(domain string, score int, modules map[string]ModuleResult, tier string) (int, AppraisalMetrics) {
    switch tier {
    case "free":
        return shapeFreeResponse(domain, score, modules)
    default:
        return shapePremiumResponse(domain, score, modules)
    }
}
```

---

### Bug 3.2: Rate Limiter Memory Leak

**File:** `internal/api/middleware/ratelimit.go`

**Current:** `requests` map never pruned. Unbounded memory growth.

**Fix:** Add cleanup goroutine:
```go
func (rl *RateLimiter) cleanup() {
    ticker := time.NewTicker(60 * time.Second)
    for range ticker.C {
        rl.mu.Lock()
        now := time.Now()
        cutoff := now.Add(-rl.maxAge)
        for key, timestamps := range rl.requests {
            valid := make([]time.Time, 0)
            for _, t := range timestamps {
                if t.After(cutoff) {
                    valid = append(valid, t)
                }
            }
            if len(valid) == 0 {
                delete(rl.requests, key)
            } else {
                rl.requests[key] = valid
            }
        }
        rl.mu.Unlock()
    }
}
```

---

### Bug 3.3: API Key Auth Middleware Missing

**File:** `internal/api/v1/router.go`

**Current:** API keys can be created/revoked but no middleware authenticates requests via API key.

**Fix (Phase 2):** Add `internal/api/middleware/apikey.go`:
```go
func APIKeyAuth(db *pgxpool.Pool) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            auth := r.Header.Get("Authorization")
            if strings.HasPrefix(auth, "Bearer ceche_") {
                key := strings.TrimPrefix(auth, "Bearer ")
                keyHash := sha256.Sum256([]byte(key))
                var userID string
                err := db.QueryRow(r.Context(),
                    `SELECT user_id FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL`,
                    hex.EncodeToString(keyHash[:]),
                ).Scan(&userID)
                if err != nil {
                    http.Error(w, `{"error":"invalid API key"}`, 401)
                    return
                }
                ctx := context.WithValue(r.Context(), "user_id", userID)
                next.ServeHTTP(w, r.WithContext(ctx))
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

---

## LOW — Quality & Completeness

### Bug 4.1: No Caching Layer

**Status:** Not implemented. Every appraisal recomputes.

**Fix (Phase 2):** Add `internal/cache/cache.go` with bigcache.

---

### Bug 4.2: M6 Segmenter Has ~50 Words

**File:** `internal/service/appraiser.go:327-338`

**Status:** Dictionary has only 50 common words.

**Fix:** Expand to 200+ words and add vowel-boundary segmentation fallback.

---

### Bug 4.3: No Tests

**Status:** Zero test files in entire backend.

**Fix (Phase 2):** Add `*_test.go` files with table-driven tests.

---

### Bug 4.4: Stub Modules Return Fake Data

**Files:** `appraiser.go:147-158` (m1Rdap), `appraiser.go` (m9SearchResults, m11Trademark, m12Authority)

**Status:** Stubs return hardcoded values.

**Fix:** Return `Status: "STUB"` with clear metadata. Consumer handles STUB status.

---

### Bug 4.5: Frontend May Reference Wrong Module Names

**File:** `app/app/[locale]/appraise/page.tsx`

**Status:** Frontend checks `modules.m16_brandability` but backend may not return it.

**Fix:** After Bug 1.2 fix, backend returns m16. Frontend types should match backend.

---

## Execution Order

| Step | Bug | Fix | Files Changed | Effort |
|------|-----|-----|---------------|--------|
| 1 | 1.1 | Value type to *float64 | `appraiser.go` | 30 min |
| 2 | 1.3 | Add float64Ptr helper | `appraiser.go` | 5 min |
| 3 | 1.2 | Implement m16Brandability | `appraiser.go` | 1 hour |
| 4 | 2.1 | Add tld to INSERT | `appraise.go` | 15 min |
| 5 | 3.2 | Rate limiter cleanup | `ratelimit.go` | 30 min |
| 6 | 4.2 | Expand segmenter | `appraiser.go` | 30 min |

**Total estimated effort:** ~3 hours (Phase 2 fixes only)

**Deferred to Phase 2:**
- Bug 2.2: Domain encryption
- Bug 3.1: Free/premium gating
- Bug 3.3: API key auth middleware
- Bug 4.1: Caching layer
- Bug 4.3: Tests
- Bug 4.4: Stub module improvements
