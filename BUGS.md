# Ceche Platform — Bugs & Issues Log

> Comprehensive bug inventory from the full platform audit.
> Format: `BUG-ID | Severity | Title | File:Line | Status`

**Audit date**: Aug 31, 2026
**Total bugs found**: 77 (6 CRITICAL, 11 HIGH, 25 MEDIUM, 35 LOW)

---

## Table of Contents

1. [Critical Bugs (Runtime failures / Security)](#critical-bugs)
2. [High Priority Bugs](#high-priority-bugs)
3. [Medium Priority Bugs](#medium-priority-bugs)
4. [Low Priority Bugs](#low-priority-bugs)

---

## CRITICAL BUGS

### BUG-C1 | CRITICAL | Column name mismatch breaks premium appraisal
**File**: `internal/api/v1/appraise.go:21`
**Issue**: `getUserTier()` queries `SELECT plan FROM users` but the schema column is `subscription_tier`.
**Impact**: Every paid appraisal returns `tier="free"`. Premium users get free-tier output. **Runtime failure on every premium request.**
**Fix**: Change query to `SELECT subscription_tier FROM users WHERE id = $1`.

### BUG-C2 | CRITICAL | Webhook signature verification bypass
**File**: `internal/api/v1/webhook.go:34-45`
**Issue**: When `PAYSTACK_SECRET_KEY` is empty, HMAC check is skipped with only a log warning.
**Impact**: Attacker can POST forged `charge.success` events to `/api/v1/webhooks/paystack` and trigger arbitrary `revealService.CompleteReveal(...)`. **Unauthenticated RCE-equivalent on payment flow.**
**Fix**: Refuse to start the webhook endpoint without the secret, or gate by `ENV=development`.

### BUG-C3 | CRITICAL | Lock acquisition TOCTOU race
**File**: `internal/service/lock.go:34-71`
**Issue**: `SELECT ... WHERE status='active'` then `INSERT`. Two concurrent requests can both see "no existing lock" and both insert.
**Impact**: Domain-locking guarantee is unenforceable. Two users can simultaneously "lock" the same domain.
**Fix**: Use `INSERT ... ON CONFLICT` against the unique index, or `pg_advisory_xact_lock(hash)`.

### BUG-C4 | CRITICAL | Webhook HMAC compares hex against raw bytes
**File**: `internal/api/v1/webhook.go:41`
**Issue**: `expectedSig` is hex-encoded but inbound `signature` is treated as raw bytes.
**Impact**: HMAC comparison is meaningless for non-ASCII inputs. Combined with C2, signature verification is effectively disabled.
**Fix**: `hex.DecodeString(signature)` first, reject on error, then `hmac.Equal(decoded, expected)`.

### BUG-C5 | CRITICAL | Nil-context panic risk in 13 handler files
**Files**: `lock.go:20,46`, `reveal.go:20,101`, `subscription.go:29,61,84`, `scan.go:22,91,165,214,262,303,330`, `appraise.go:32,138,183`, `auth.go:222,247,275,309,330`, `suggestions.go:19`
**Issue**: `userID := r.Context().Value("user_id").(string)` with no `, ok` check.
**Impact**: One missed middleware or route misconfiguration = full panic, 500 to all clients.
**Fix**: Use comma-ok idiom and return 401 instead.

### BUG-C6 | CRITICAL | Scanner Cancel() panics on second call
**File**: `internal/scanner/scanner.go:261-263`
**Issue**: `close(s.quit)` without `sync.Once`.
**Impact**: Race in cleanup paths. Panics with "close of closed channel".
**Fix**: Wrap in `sync.Once` or use a `done` channel with `select`.

---

## HIGH PRIORITY BUGS

### BUG-H1 | HIGH | Hardcoded insecure config defaults
**File**: `internal/config/config.go:15-35`
**Issue**: Production secrets hardcoded as defaults (`JWTSecret`, `DomainEncryptionKey`, `DatabaseURL`).
**Impact**: Forgotten env var in production = silent security hole.
**Fix**: Remove defaults; require explicit configuration.

### BUG-H2 | HIGH | InsecureSkipVerify: true for SSL inspection
**File**: `internal/service/intelligence.go:247`
**Issue**: TLS verification disabled in the SSL check function.
**Impact**: Defeats the purpose of certificate inspection; vulnerable to MITM.
**Fix**: `tls.Config{InsecureSkipVerify: false}` or use a proper verification flow.

### BUG-H3 | HIGH | Rate limiter shares bucket across all auth users
**File**: `internal/api/middleware/ratelimit.go:76-79`
**Issue**: Uses full `Authorization` header as rate-limit key (all JWTs share one bucket).
**Impact**: Trivially DoS-able by registering many accounts.
**Fix**: Parse JWT subject or use `user_id` from context as key.

### BUG-H4 | HIGH | RateLimitAPIKey configured but never applied
**File**: `internal/api/v1/router.go:27`
**Issue**: Only one limiter is created from `cfg.RateLimitUser`. `cfg.RateLimitAPIKey` is unused.
**Impact**: API key-specific rate limits documented but not enforced.
**Fix**: Detect API key auth and use different limiter.

### BUG-H5 | HIGH | JWT signing-method check missing
**File**: `internal/api/v1/auth.go:69-71`
**Issue**: Keyfunc returns secret without verifying `token.Method` is `*jwt.SigningMethodHMAC`.
**Impact**: Algorithm-confusion attacks (HS256↔RS256) remain possible.
**Fix**: Add `if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok { return nil, fmt.Errorf("unexpected signing method") }`.

### BUG-H6 | HIGH | Refresh tokens share secret, no revocation
**File**: `internal/api/v1/auth.go:40-52`
**Issue**: Refresh and access tokens share secret and structure. No revocation list.
**Impact**: Leaked access token can't be revoked. Refresh token lives 7 days with no rotation/audit.
**Fix**: Separate refresh secret; add `refresh_tokens` table for revocation.

### BUG-H7 | HIGH | math/rand for API key generation
**File**: `internal/api/v1/auth.go:365-369`
**Issue**: `rand.Read` from `math/rand` (not `crypto/rand`). Error discarded.
**Impact**: API keys may be weak/predictable.
**Fix**: Use `crypto/rand` and check error.

### BUG-H8 | HIGH | bcrypt for API key hashing
**File**: `internal/api/v1/auth.go:371-373`
**Issue**: API keys hashed with bcrypt (intentionally slow, designed for passwords).
**Impact**: Every API request hashes a presented key; bcrypt is too slow for hot-path lookup. Also swallows error.
**Fix**: Use SHA-256 or HMAC-SHA-256 with `subtle.ConstantTimeCompare`.

### BUG-H9 | HIGH | Inconsistent tier column name (duplicate of C1)
**File**: `appraise.go:21` vs `auth.go:226`
**Issue**: One reads `plan`, the other reads `subscription_tier`.
**Fix**: Standardize on `subscription_tier`.

### BUG-H10 | HIGH | handleGetReveal lacks user scoping
**File**: `internal/api/v1/reveal.go:80-97`
**Issue**: No `WHERE user_id = $2` clause.
**Impact**: Any authenticated user can fetch any other user's reveal by guessing/enumerating UUIDs. Information leak.
**Fix**: Add `user_id` filter from context.

### BUG-H11 | HIGH | reveals_remaining never decremented
**Files**: All handlers in `internal/api/v1/`
**Issue**: `users.reveals_remaining` is set at signup but never decremented.
**Impact**: Free users have unlimited reveals despite documented 5/month limit.
**Fix**: Decrement on each reveal creation in `handleCreateReveal`.

---

## MEDIUM PRIORITY BUGS

### BUG-M1 | MEDIUM | Intelligence concurrent fan-out is sequential
**File**: `internal/service/intelligence.go:105-143`
**Issue**: `wg []func()` runs sequentially; `errs` slice never appended.
**Fix**: Use `sync.WaitGroup` + `errgroup.Group` or drop the misleading scaffolding.

### BUG-M2 | MEDIUM | context.Background() used inside service methods
**Files**: `intelligence.go:198,243`, `rdap.go:59-78`
**Issue**: Caller's `ctx` discarded; uses `context.Background()`.
**Impact**: Request cancellation doesn't propagate.
**Fix**: `context.WithTimeout(ctx, ...)`.

### BUG-M3 | MEDIUM | RDAP Check() has no context
**File**: `internal/service/rdap.go:59-78`
**Issue**: No way to cancel RDAP requests.
**Fix**: Accept `ctx context.Context` as first arg.

### BUG-M4 | MEDIUM | GetReveal in service has no user scoping
**File**: `internal/service/reveal.go:96-108`
**Issue**: SELECT returns any reveal by id.
**Fix**: Add `user_id` parameter to `GetReveal`.

### BUG-M5 | MEDIUM | Audit log write error swallowed
**File**: `internal/api/v1/appraise.go:121-125`
**Issue**: `db.Exec` error ignored.
**Fix**: Check and log error.

### BUG-M6 | MEDIUM | Idempotency-key scan error swallowed
**File**: `internal/api/v1/appraise.go:65-76`
**Issue**: Scan error ignored; raw bytes written without Content-Type.
**Fix**: Check error, set header, return proper error response.

### BUG-M7 | MEDIUM | Subscription handler hides all DB errors as "free"
**File**: `internal/api/v1/subscription.go:64-76`
**Issue**: `pgx.ErrNoRows` AND real errors both return `{"plan": "free"}`.
**Fix**: Differentiate `ErrNoRows` from real errors.

### BUG-M8 | MEDIUM | CSV export bugs
**File**: `internal/api/v1/scan.go:369,375`
**Issues**: 
- `priceStr := string(rune(*price))` — produces garbage
- No escaping of `error`/`domain` columns (newlines/breaks CSV)
**Fix**: Use `strconv.FormatFloat` and `encoding/csv`.

### BUG-M9 | MEDIUM | Hardcoded business values (should be config)
**Files**: Multiple
**Issue**: `RevealPricing`, `TryYourLuckPricing`, `LockTTL`, scanner concurrency all hardcoded.
**Fix**: Move to `config.go` env vars.

### BUG-M10 | MEDIUM | Pagination hardcoded
**Files**: `appraise.go:140`, `scan.go:167`, `reveal.go:104`, `scan.go:111`
**Issue**: `LIMIT 50`, `LIMIT 20`, etc. No offset/cursor support.
**Fix**: Add `?page=` and `?limit=` query params.

### BUG-M11 | MEDIUM | BrevoAPIKey configured but never used
**File**: `internal/config/config.go:27`
**Issue**: Config field exists; no code references it. Email functionality unimplemented.
**Fix**: Implement email sender or remove from config.

### BUG-M12 | MEDIUM | PaystackPublicKey unused
**File**: `internal/config/config.go:24`
**Issue**: Server-side config has no validation or helper to fetch it for frontend.
**Fix**: Add a `/config` endpoint or remove.

### BUG-M13 | MEDIUM | Subscription activated without payment
**File**: `internal/api/v1/subscription.go:43-48`
**Issue**: INSERTs with `status='active'` without calling Paystack.
**Fix**: Integrate Paystack init; webhook handler activates after payment.

### BUG-M14 | MEDIUM | CORS origin comparison is case-sensitive
**File**: `internal/api/middleware/cors.go:13-22`
**Issue**: `strings.TrimSpace(o) == origin` is case-sensitive.
**Fix**: Use `strings.EqualFold`.

### BUG-M15 | MEDIUM | Recovery middleware corrupts partial responses
**File**: `internal/api/middleware/recovery.go:18`
**Issue**: `http.Error` may write after `WriteHeader` already called.
**Fix**: Use buffered response writer or `http.ErrAbortHandler`.

### BUG-M16 | MEDIUM | GetCache() not nil-safe
**File**: `internal/cache/cache.go:63-65`
**Issue**: Returns possibly-nil pointer.
**Fix**: Document or enforce non-nil.

### BUG-M17 | MEDIUM | Mixed error response formats
**Files**: All handlers
**Issue**: Three coexisting patterns: `{"error":"msg"}`, `{"error":{"code":"X","message":"Y"}}`, bare text.
**Fix**: Unify to one format.

### BUG-M18 | MEDIUM | fmt.Println mixed with zerolog
**File**: `cmd/server/main.go:85`
**Issue**: `"Server stopped gracefully"` uses `fmt.Println`.
**Fix**: Use `log.Info()`.

### BUG-M19 | MEDIUM | reveal.go TLDOption free-form
**File**: `internal/api/v1/reveal.go:40-44`
**Issue**: No whitelist; invalid TLDs silently fall back to `flat` price.
**Fix**: Validate TLD against whitelist.

### BUG-M20 | MEDIUM | handleGetRevealPricing inconsistent signature
**File**: `internal/api/v1/subscription.go:104-121`
**Issue**: `func(w, r)` instead of `func(...) http.HandlerFunc` pattern.
**Fix**: Wrap in `http.HandlerFunc`.

### BUG-M21 | MEDIUM | O(n²) sort
**Files**: `appraiser.go:684-690`, `suggestions.go:97-103`
**Issue**: Insertion sort used.
**Fix**: Use `sort.Slice`.

### BUG-M22 | MEDIUM | defer r.Body.Close() placement
**File**: `internal/api/v1/webhook.go:21-26`
**Issue**: Early return skips Close.
**Fix**: Move defer before the error check.

### BUG-M23 | MEDIUM | handleGetScan swallows second-query error
**File**: `internal/api/v1/scan.go:118`
**Issue**: Second `db.Query` failure returns 200 with empty results.
**Fix**: Check error and return 500.

### BUG-M25 | MEDIUM | Subscription cancel updates all active
**File**: `internal/api/v1/subscription.go:96`
**Issue**: All active subscriptions cancelled at once.
**Fix**: Target the most recent one.

---

## LOW PRIORITY BUGS

### BUG-L1 | LOW | Code duplication: domainRegex
**Files**: `appraise.go:16`, `intelligence.go:14`
**Issue**: Same regex in two files.
**Fix**: Hoist to shared `validation.go`.

### BUG-L2 | LOW | Alliteration/repetition logic order
**File**: `internal/service/appraiser.go:1724-1728`
**Issue**: "repetition" check comes after "alliteration"; "aaab" matches alliteration first.
**Fix**: Reorder checks.

### BUG-L3 | LOW | Dead init() in words.go
**File**: `internal/scanner/words.go:106-108`
**Issue**: `GetWordListByName("builtin")` returns `builtinWords` itself — no-op.
**Fix**: Remove or fix.

### BUG-L4 | LOW | Unused assignments
**Files**: `appraise.go:1443`, `intelligence.go:325-330`, `reveal.go:62`
**Issue**: `_ = sld`, dead for-loop, `_ = lock`.
**Fix**: Remove dead code.

### BUG-L5 | LOW | Unused exported helpers
**Files**: `rdap.go:178`, `encryption.go:97`
**Issue**: `GetRDAPClient`, `GetDomainEncryptor` never called.
**Fix**: Use or unexport.

### BUG-L6 | LOW | Inconsistent naming
**Files**: Multiple
**Issue**: `RDAPClient` vs `IntelligenceService`, `intelDomainRegex` vs `domainRegex`.
**Fix**: Standardize.

### BUG-L7 | LOW | Mixed JSON casing
**Issue**: Mostly snake_case but some Go maps use camelCase.
**Fix**: Standardize on snake_case in API responses.

### BUG-L8 | LOW | Magic strings everywhere
**Issue**: Status values `"active"`, `"pending"`, etc. hardcoded.
**Fix**: Typed constants.

### BUG-L9 | LOW | Test coverage gap
**Files**: Many
**Issue**: Only 1 test file (`appraiser_test.go`).
**Fix**: Add tests for handlers, middleware, services.

### BUG-L10 | LOW | No request body size limit
**Files**: All POST handlers
**Issue**: No `http.MaxBytesReader`.
**Fix**: Add 1MB limit on all body reads.

### BUG-L11 | LOW | No email validation
**File**: `internal/api/v1/auth.go:98`
**Issue**: Only emptiness checked.
**Fix**: Add regex validation.

### BUG-L12 | LOW | handleCreateWordList no size limit
**File**: `internal/api/v1/scan.go:255-298`
**Issue**: Arbitrary words accepted.
**Fix**: Cap word count and length.

### BUG-L13 | LOW | handleCreateScan no job cap
**File**: `internal/api/v1/scan.go:30-86`
**Issue**: Can spin thousands of DNS lookups.
**Fix**: Cap `len(words)*len(tlds)` at e.g. 5000.

### BUG-L14 | LOW | RevealService with nil DB
**File**: `internal/api/v1/subscription.go:105`
**Issue**: Pricing methods work with nil pool — fragile.
**Fix**: Extract pricing to non-DB struct.

### BUG-L15 | LOW | handleGetUser ignores name field scan error
**File**: `internal/api/v1/auth.go:229`
**Issue**: Generic 404 even on DB errors.
**Fix**: Differentiate.

### BUG-L16 | LOW | handleDeleteAPIKey swallows RowsAffected
**File**: `internal/api/v1/auth.go:316-319`
**Issue**: 0 rows affected returns 200.
**Fix**: Check and return 404.

### BUG-L17 | LOW | handleDeleteWordList source check duplicates constraint
**File**: `internal/api/v1/scan.go:307`
**Fix**: Enforce at DB level.

### BUG-L18 | LOW | handleCreateSubscription doesn't store paystack_sub_id
**File**: `internal/api/v1/subscription.go:43-48`
**Fix**: Update on webhook.

### BUG-L19 | LOW | storeProfile degrades silently
**File**: `internal/service/intelligence.go:336-356`
**Issue**: Unencrypted environments lose data silently.
**Fix**: Return error.

### BUG-L20 | LOW | lookupDNS ignores individual lookup errors
**File**: `internal/service/intelligence.go:201-237`
**Fix**: Track per-lookup errors.

### BUG-L21 | LOW | checkSSL DaysLeft no clamp
**File**: `internal/service/intelligence.go:261`
**Fix**: Clamp negative to 0.

### BUG-L22 | LOW | testify listed as indirect
**File**: `go.mod:21`
**Fix**: `go mod tidy`.

### BUG-L23 | LOW | intelDomainRegex allows 1-char SLD
**File**: `internal/api/v1/intelligence.go:14`
**Fix**: Add length anchor.

### BUG-L24 | LOW | sanitize drops non-alphanumeric
**File**: `internal/scanner/scanner.go:321-329`
**Fix**: Better name.

### BUG-L25 | LOW | comboScore linear scan
**File**: `internal/service/appraiser.go:1025-1054`
**Fix**: Precomputed reverse index.

### BUG-L26 | LOW | keywordPopularity data duplicated
**Files**: `appraiser.go:1118`, `suggestions.go:1118`
**Fix**: Shared vocabulary module.

### BUG-L28 | LOW | LockGracePeriod unused
**File**: `internal/service/lock.go:11-14`
**Fix**: Use or remove.

### BUG-L29 | LOW | logging.go multiple WriteHeader
**File**: `internal/api/middleware/logging.go:30-32`
**Fix**: Guard.

### BUG-L31 | LOW | handleChargeSuccess ignores non-success status
**File**: `internal/api/v1/webhook.go:87-90`
**Fix**: Mark reveal as `failed` for failed payments.

### BUG-L32 | LOW | handleSubCreate/Disable don't update DB
**File**: `internal/api/v1/webhook.go:102-132`
**Fix**: Update subscriptions table.

### BUG-L33 | LOW | paystack_ref hardcoded as "pending"
**File**: `internal/api/v1/reveal.go:64-65`
**Fix**: Generate real ref.

### BUG-L34 | LOW | domainRegex allows consecutive dots
**File**: `internal/api/v1/appraise.go:16`
**Fix**: Disallow.

### BUG-L35 | LOW | RevealService with nil DB
**File**: `internal/api/v1/subscription.go:105`
**Fix**: Same as L14.

---

## Frontend Bugs

### BUG-FE1 | HIGH | /tools/appraisal route does not exist (404)
**Status**: INVALID — this is the correct path. See routing clarification below.

### ROUTING CLARIFICATION (CORRECTED)

The appraisal tool has TWO routes depending on the subdomain:

| Subdomain | Route | Purpose |
|-----------|-------|---------|
| `www.ceche.net` (public marketing) | `/tools/appraisal` | Public appraisal tool page |
| `app.ceche.net` (authenticated app) | `/appraise` | Authenticated appraisal with higher rate limits |

**Correctly wired paths:**
- Public Navbar mega menu, header CTA, mobile CTA → `/tools/appraisal` ✅
- Footer "Domain Appraiser" → `/tools/appraisal` ✅
- WwwHomepage CTAs → `/tools/appraisal` ✅
- Search page CTA → `/tools/appraise?domain=...` ✅
- AppHeader (authenticated) → `/appraise` ✅
- Platform dashboard → `/appraise` ✅
- Middleware `APP_ONLY_PATHS` → `/appraise` (redirects www → app subdomain) ✅

### BUG-FE2 | HIGH | PublicHeader.tsx orphaned with 17 broken links
**File**: `app/components/layout/PublicHeader.tsx`
**Status**: FIXED — deleted orphaned file (never imported, 17 broken links)

### BUG-FE3 | HIGH | /platform/* pages don't exist
**Files**: `platform/page.tsx:18,25,28`
**Status**: FIXED — replaced with `/api-keys`, `/appraise`, `/scan`.

### BUG-FE4 | HIGH | /company/* pages don't exist
**File**: `Footer.tsx:18,19`
**Status**: DEFERRED — company pages will be created later.

### BUG-FE4a | HIGH | New nav pages don't exist yet
**Files**: `Navbar.tsx` (Explore section)
**Pages needed**: `/resources/blog` ✅ exists, `/resources/ebooks` ❌ missing, `/resources/case-studies` ❌ missing
**Status**: DEFERRED — pages will be created later. Blog page exists but ebooks and case-studies need creation.

### ROUTING NOTE | Documentation Migration
**Status**: Documentation content (16-Dimension Framework, Domain Sales Trends, Platform Pricing) will be migrated into `/resources/help-center` over time. These links are no longer in the navbar — users access docs via Help Center instead.

### BUG-FE5 | MEDIUM | Duplicate pricing pages with different tiers
**Files**: `/pricing/page.tsx`, `/resources/pricing/page.tsx`
**Fix**: Remove `/resources/pricing`.

### BUG-FE6 | MEDIUM | border-3 invalid Tailwind class
**File**: `marketplace/try-your-luck/page.tsx:138`
**Fix**: `border-2`.

### BUG-FE7 | MEDIUM | Hardcoded production URL
**File**: `appraisal-limit/page.tsx:48`
**Fix**: Use `/signup` route.

### BUG-FE8 | MEDIUM | Language switcher missing from Navbar
**File**: `Navbar.tsx`
**Fix**: Add `<LanguageSwitcher />`.

### BUG-FE9 | MEDIUM | 23 placeholder pages (Coming Soon)
**Files**: All `tools/*`, `solutions/*`, `marketplace/*`, `resources/*` (except existing pages)
**Fix**: Replace with real content or remove.

### BUG-FE10 | MEDIUM | useTranslations imported but unused
**File**: `scan/page.tsx:5,49`
**Fix**: Use or remove import.

### BUG-FE11 | MEDIUM | Inconsistent API URL patterns
**Files**: `scan/page.tsx` (relative), `appraise/page.tsx` (`API_URL` env)
**Fix**: Standardize.

### BUG-FE12 | MEDIUM | localStorage vs useAuth().token inconsistency
**File**: `scan/page.tsx:76,90,121,153,186`
**Fix**: Use auth context.

### BUG-FE13 | MEDIUM | "15-module" vs "16-dimension" naming
**File**: `messages/en.json:17`
**Fix**: "16-dimension".

### BUG-FE14 | LOW | 40 of 42 pages lack translations
**Files**: All pages
**Fix**: Add next-intl translations.

### BUG-FE15 | LOW | unnecessary "use client" on static pages
**Files**: `pricing/page.tsx`, `appraisal-limit/page.tsx`
**Fix**: Remove "use client".

### BUG-FE16 | LOW | /marketplace/pricing titled "Pricing Calculator" but nav says "Seller Fees"
**File**: `marketplace/pricing/page.tsx`
**Fix**: Rename to match.

---

## Documentation Bugs

### BUG-D1 | HIGH | Three different pricing tier schemas in docs
**Files**: `product-spec.md`, `payments.md`, `implementation-plan.md` (Startup/Enterprise), `AGENTS.md`, `README.md` (Starter/Pro/Enterprise)
**Fix**: Reconcile to one canonical version.

### BUG-D2 | HIGH | Pricing numbers differ: $79/$129 vs $29/$49/$199
**Files**: All docs
**Fix**: Pick one and apply globally.

### BUG-D3 | HIGH | README claims Phase 4 "Pending" but it's implemented
**File**: `README.md`
**Fix**: Update phase status.

### BUG-D4 | HIGH | Inconsistent phase numbering across docs
**Files**: `product-spec.md`, `implementation-plan.md`, `README.md`
**Fix**: Single canonical roadmap.

### BUG-D5 | HIGH | Third-party seller contradiction
**Files**: `AGENTS.md` (no), `product-spec.md` (yes), `implementation-plan.md` (yes)
**Fix**: Decide and document.

### BUG-D6 | MEDIUM | Reveal pricing schemes differ
**Files**: `payments.md` (tiered), `reveal.go` (flat), `AGENTS.md` ($5-10)
**Fix**: Match code to canonical doc.

### BUG-D7 | MEDIUM | Listing fees: two schemas
**Files**: `product-spec.md` (Standard/Priority), `implementation-plan.md` (score-based)
**Fix**: Pick one.

### BUG-D8 | MEDIUM | Subdomain port confusion: 4321 vs 3000
**Files**: `product-spec.md:432`, `implementation-plan.md:859`, `README.md:29,210`
**Fix**: Single answer.

### BUG-D9 | MEDIUM | All 3 docs mislabel "12 phases" when there are 13
**Files**: All
**Fix**: Count and label correctly.

### BUG-D10 | MEDIUM | Missing migrations for listings, orders, escrow, etc.
**Files**: `product-spec.md`, `implementation-plan.md`
**Fix**: Add migrations or remove from docs.

### BUG-D11 | LOW | Webhook verification methods differ between docs
**Files**: `product-spec.md` (HMAC only), `payments.md` (IP + HMAC)
**Fix**: Pick one.

### BUG-D12 | LOW | Appraisal table column mismatch
**Files**: `product-spec.md:518`, `migrations/002_appraisals.up.sql:5`
**Fix**: Reconcile NOT NULL and ON DELETE.

### BUG-D13 | LOW | users.reveals_remaining default differs
**Files**: `product-spec.md` (0), `migrations/001_initial.up.sql` (5)
**Fix**: Reconcile.

---

## Fix Status

| Bug | Severity | Status |
|-----|----------|--------|
| C1 | CRITICAL | TODO |
| C2 | CRITICAL | TODO |
| C3 | CRITICAL | TODO |
| C4 | CRITICAL | TODO |
| C5 | CRITICAL | TODO |
| C6 | CRITICAL | TODO |
| H1-H11 | HIGH | TODO |
| M1-M25 | MEDIUM | TODO |
| L1-L35 | LOW | TODO |
| FE1-FE16 | UI | TODO |
| D1-D13 | DOCS | TODO |

See `IMPLEMENTATION_PLAN.md` for the fix roadmap.
