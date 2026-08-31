# Ceche Platform — Bug Fix Implementation Plan

> Phased roadmap for fixing all 77 bugs found in the platform audit.
> Organized by severity: Critical → High → Medium → Low → Documentation.
> Tasks requiring external dependencies (API keys, content writeups, page creation) are deferred to the end.

---

## Phase 0: Critical Security & Runtime Bugs (Day 1-2)

**Goal**: Eliminate all runtime failures and security holes. After this phase, the platform is stable and secure enough for basic use.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 0.1 | **C1** | `internal/api/v1/appraise.go:21` | Fix column: `SELECT plan` → `SELECT subscription_tier` |
| 0.2 | **C2** | `internal/api/v1/webhook.go:34-45` | Remove signature bypass; refuse if `PAYSTACK_SECRET_KEY` empty |
| 0.3 | **C3** | `internal/service/lock.go:34-71` | Add `INSERT ... ON CONFLICT` against unique index |
| 0.4 | **C4** | `internal/api/v1/webhook.go:41` | `hex.DecodeString(signature)` before HMAC compare |
| 0.5 | **C5** | 13 handler files | Replace `.(string)` with comma-ok idiom + return 401 |
| 0.6 | **C6** | `internal/scanner/scanner.go:261-263` | Wrap `close()` in `sync.Once` |

### Verification
- `go build ./...` passes
- `go test ./...` passes
- Manual test: premium user gets premium appraisal (not free)
- Manual test: forged webhook request is rejected

---

## Phase 1: High-Priority Frontend & Route Bugs (Day 2-3)

**Goal**: Fix orphaned/dead links and clarify routing architecture. After this phase, no link in the platform leads to a missing page (except /company/* which will be created later).

### Routing Architecture (Clarified)

The appraisal tool has **two routes** depending on subdomain:

| Subdomain | Route | Purpose |
|-----------|-------|---------|
| `www.ceche.net` (public) | `/tools/appraisal` | Public appraisal tool |
| `app.ceche.net` (authenticated) | `/appraise` | Authenticated appraisal with higher rate limits |

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 1.1 | **FE1** | `Navbar.tsx`, `Footer.tsx`, `WwwHomepage.tsx`, `search/page.tsx` | **CORRECTED** — `/tools/appraisal` IS the correct public path. No changes needed. |
| 1.2 | **FE2** | `PublicHeader.tsx` | Delete orphaned file (never imported, 17 broken links) |
| 1.3 | **FE3** | `platform/page.tsx:18,25,28` | `/platform/api-keys` → `/api-keys`, `/platform/appraise` → `/appraise`, `/platform/scan` → `/scan` |
| 1.4 | **FE4** | `Footer.tsx:18,19` | **DEFERRED** — company pages will be created later |
| 1.5 | **FE5** | `/resources/pricing/page.tsx` | Removed duplicate (orphan) |
| 1.6 | **FE7** | `appraisal-limit/page.tsx:48` | `https://app.ceche.net/signup` → `/signup` |
| 1.7 | **FE8** | `Navbar.tsx` | Replace LanguageSwitcher with globe icon dropdown |
| 1.8 | | `Navbar.tsx` | Even spacing between right nav buttons (`gap-5`) |

### Verification
- Click every link in the navigation → no 404s
- Language switcher works on www subdomain

---

## Phase 2: High-Priority Backend Bugs (Day 3-5)

**Goal**: Fix SSL, API key generation/hashing, user scoping, and reveal credits.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 2.1 | **H2** | `internal/service/intelligence.go:247` | Remove `InsecureSkipVerify: true` |
| 2.2 | **H7** | `internal/api/v1/auth.go:365-369` | Replace `math/rand` with `crypto/rand` |
| 2.3 | **H8** | `internal/api/v1/auth.go:371-373` | Replace bcrypt with SHA-256 + `subtle.ConstantTimeCompare` |
| 2.4 | **H10** | `internal/api/v1/reveal.go:80-97` + `internal/service/reveal.go:96-108` | Add `user_id` scoping in `GetReveal` |
| 2.5 | **H11** | `internal/api/v1/reveal.go` | Decrement `reveals_remaining` on each reveal creation; check balance |
| 2.6 | **H4** | `internal/api/v1/router.go:27` | Apply `RateLimitAPIKey` when API key auth detected |
| 2.7 | **H5** | `internal/api/v1/auth.go:69-71` | Verify `token.Method` is `*jwt.SigningMethodHMAC` |

### Verification
- SSL check returns proper validation errors for bad certs
- API keys use secure random generation
- API keys use fast constant-time lookup
- User A cannot fetch User B's reveals
- Free user is blocked after 5 reveals (or 12 if signed up)
- API-key requests use separate rate limit

---

## Phase 3: Pricing & Subscription Tier Reconciliation (Day 5-6)

**Goal**: One canonical pricing model across code, docs, and UI. Fix the `startup` vs `starter` vs `pro` mismatch.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 3.1 | **D1, D2** | All docs + `messages/en.json` | Pick canonical tier names: **Free / Premium Startup ($79) / Premium Enterprise ($129)** |
| 3.2 | **H9** | `internal/service/appraiser.go` | Replace tier checks to use `startup` / `enterprise` (matches `subscription.go`) |
| 3.3 | **appraise.go** | `internal/api/v1/appraise.go` | Update tier gating to use `startup`/`enterprise` |
| 3.4 | **messages/en.json** | `app/messages/en.json:34-58` | Update to match canonical tiers |
| 3.5 | `/pricing/page.tsx` | Already correct ($79/$129) | Verify it matches canonical |
| 3.6 | `internal/api/v1/subscription.go:37` | Already accepts `startup`/`enterprise` | Verify it matches canonical |

### Verification
- Subscribe to "Premium Startup" → appraisal handler returns premium content
- All docs reference the same tier names and amounts
- Pricing page on /pricing matches the code

---

## Phase 4: Database Schema Hardening (Day 6-7)

**Goal**: Add missing indexes, constraints, and cascade rules. Prevent orphan rows and silent data corruption.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 4.1 | **Missing indexes** | New migration `007_indexes.up.sql` | Add indexes on `domain_locks.expires_at`, `subscriptions.paystack_sub_id`, `subscriptions.current_period_end`, `reveals.status`, composite `(scans.user_id, created_at DESC)` |
| 4.2 | **UNIQUE constraints** | New migration `008_unique_constraints.up.sql` | Add UNIQUE on `appraisals(user_id, idempotency_key) WHERE idempotency_key IS NOT NULL`, `word_lists(user_id, name)`, `users.paystack_customer_id`, `users.paystack_subscription_id`, `subscriptions.paystack_sub_id`, `reveals.paystack_ref` |
| 4.3 | **CHECK constraints** | New migration `009_check_constraints.up.sql` | Add CHECK constraints on `users.role`, `users.subscription_tier`, `users.subscription_status`, `scans.status`, `domain_locks.status`, `reveals.status`, `subscriptions.status`, `reveals.reveal_type`, `appraisals.score` |
| 4.4 | **ON DELETE CASCADE** | New migration `010_cascade.up.sql` | Add `ON DELETE CASCADE` to FK references in `domain_locks`, `reveals`, `subscriptions`, `suggestions`; `ON DELETE SET NULL` for `audit_logs.user_id` |
| 4.5 | **Naming fix** | New migration `011_naming.up.sql` | Rename `subscriptions.plan` → `subscriptions.plan_name` (keep backward compat) OR just use `subscription_tier` consistently |

### Verification
- All migrations apply cleanly to fresh DB
- All migrations apply cleanly to existing DB (idempotent or backfilled)
- Foreign keys enforce cascade properly

---

## Phase 5: Backend Code Quality (Day 7-9)

**Goal**: Fix remaining HIGH/MEDIUM backend bugs that don't require external dependencies.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 5.1 | **H1** | `internal/config/config.go` | Remove insecure defaults; require explicit env vars |
| 5.2 | **M2, M3** | `intelligence.go`, `rdap.go` | Add `ctx context.Context` as first parameter; propagate cancellation |
| 5.3 | **M1** | `internal/service/intelligence.go:105-143` | Implement real goroutines + `errgroup.Group` |
| 5.4 | **M5, M6** | `internal/api/v1/appraise.go` | Log audit errors; check idempotency scan errors |
| 5.5 | **M7** | `internal/api/v1/subscription.go:64-76` | Differentiate `ErrNoRows` from real errors |
| 5.6 | **M8** | `internal/api/v1/scan.go:369,375` | Use `strconv.FormatFloat` and `encoding/csv` |
| 5.7 | **M13** | `internal/api/v1/subscription.go:43-48` | Integrate Paystack init; activate via webhook |
| 5.8 | **M14** | `internal/api/middleware/cors.go` | Use `strings.EqualFold` |
| 5.9 | **M15** | `internal/api/middleware/recovery.go` | Use buffered response writer |
| 5.10 | **M17** | All handlers | Unify error response format `{"error": "msg"}` |
| 5.11 | **M18** | `cmd/server/main.go:85` | Replace `fmt.Println` with `log.Info()` |
| 5.12 | **M19** | `internal/api/v1/reveal.go:40-44` | Validate TLD against whitelist |
| 5.13 | **M20** | `internal/api/v1/subscription.go:104-121` | Wrap in `http.HandlerFunc` |
| 5.14 | **M21** | `appraiser.go:684-690`, `suggestions.go:97-103` | Use `sort.Slice` |
| 5.15 | **M22** | `internal/api/v1/webhook.go:21-26` | Move defer before error check |
| 5.16 | **M23** | `internal/api/v1/scan.go:118` | Check second-query error |
| 5.17 | **M25** | `internal/api/v1/subscription.go:96` | Target most recent subscription |

### Verification
- `go build ./...` clean
- `go test ./...` passes
- All error responses follow the same format

---

## Phase 6: Frontend Polish (Day 9-11)

**Goal**: Fix remaining frontend bugs that don't require content writeups.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 6.1 | **FE6** | `try-your-luck/page.tsx:138` | `border-3` → `border-2` |
| 6.2 | **FE10** | `scan/page.tsx:5,49` | Use `useTranslations` properly or remove import |
| 6.3 | **FE11** | `scan/page.tsx` | Standardize on `API_URL` env pattern |
| 6.4 | **FE12** | `scan/page.tsx:76,90,121,153,186` | Use `useAuth().token` instead of `localStorage.getItem('token')` |
| 6.5 | **FE13** | `messages/en.json:17` | "15-module" → "16-dimension" |
| 6.6 | **FE15** | `pricing/page.tsx`, `appraisal-limit/page.tsx` | Remove unnecessary `"use client"` |
| 6.7 | **FE16** | `marketplace/pricing/page.tsx` | Rename to match nav "Seller Fees" |

### Verification
- All frontend pages load without warnings
- All API calls use consistent URL pattern
- Translations are consistent

---

## Phase 7: Backend Code Cleanup (Day 11-13)

**Goal**: Fix all remaining MEDIUM and LOW backend bugs.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 7.1 | **L1** | New `internal/api/v1/validation.go` | Extract `domainRegex` to shared file |
| 7.2 | **L2** | `appraiser.go:1724-1728` | Reorder: check `repetition` before `alliteration` |
| 7.3 | **L3** | `scanner/words.go:106-108` | Remove dead `init()` |
| 7.4 | **L4** | Multiple files | Remove `_ = sld`, dead for-loops, `_ = lock` |
| 7.5 | **L5** | `rdap.go`, `encryption.go` | Use or unexport `GetRDAPClient`, `GetDomainEncryptor` |
| 7.6 | **L8** | Multiple | Extract status strings to typed constants |
| 7.7 | **L9** | Multiple test files | Add tests for handlers, middleware, services |
| 7.8 | **L10** | All POST handlers | Add `http.MaxBytesReader` with 1MB limit |
| 7.9 | **L11** | `auth.go:98` | Add email regex validation |
| 7.10 | **L12** | `scan.go:255-298` | Cap word count and length |
| 7.11 | **L13** | `scan.go:30-86` | Cap `len(words)*len(tlds)` at 5000 |
| 7.12 | **L14** | `subscription.go:105` | Extract pricing to non-DB struct |
| 7.13 | **L15** | `auth.go:229` | Differentiate 404 from 500 |
| 7.14 | **L16** | `auth.go:316-319` | Check RowsAffected |
| 7.15 | **L18** | `subscription.go` | Store `paystack_sub_id` on webhook |
| 7.16 | **L19** | `intelligence.go:336-356` | Return error if encryption fails |
| 7.17 | **L20** | `intelligence.go:201-237` | Track per-lookup errors |
| 7.18 | **L21** | `intelligence.go:261` | Clamp `DaysLeft` to >= 0 |
| 7.19 | **L22** | `go.mod` | `go mod tidy` |
| 7.20 | **L23** | `intelligence.go:14` | Add length anchor to regex |
| 7.21 | **L26** | `appraiser.go`, `suggestions.go` | Extract shared vocabulary module |
| 7.22 | **L28** | `lock.go:11-14` | Use or remove `LockGracePeriod` |
| 7.23 | **L31** | `webhook.go:87-90` | Mark reveal as `failed` for failed payments |
| 7.24 | **L32** | `webhook.go:102-132` | Update DB on subscription webhooks |
| 7.25 | **L33** | `reveal.go:64-65` | Generate real `paystack_ref` |
| 7.26 | **L34** | `appraise.go:16` | Disallow consecutive dots |

### Verification
- All tests pass
- `go vet ./...` clean
- No dead code remains

---

## Phase 8: Documentation Reconciliation (Day 13-15)

**Goal**: Single canonical version of all docs. Pick one pricing model, one phase roadmap, one set of API endpoint definitions.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 8.1 | **D1** | `product-spec.md`, `payments.md`, `implementation-plan.md` | Reconcile pricing tier names |
| 8.2 | **D2** | All docs | Apply $79/$129 canonical numbers |
| 8.3 | **D3** | `README.md` | Update phase status (Phase 4 is done) |
| 8.4 | **D4** | All docs | Single canonical phase roadmap (use `implementation-plan.md` as base) |
| 8.5 | **D5** | All docs | Decide third-party sellers: NOT at MVP (per AGENTS.md); remove from spec/plan |
| 8.6 | **D6** | `reveal.go` + `payments.md` | Match code to docs OR docs to code |
| 8.7 | **D7** | `implementation-plan.md:574-579` | Pick listing fee model: Standard $5 / Priority $10 |
| 8.8 | **D8** | All docs | Subdomain ports: nginx 4321 (Next.js dev) / 8080 (Go backend) |
| 8.9 | **D9** | All docs | "13 phases" (not 12) |
| 8.10 | **D11** | `product-spec.md` + `payments.md` | HMAC only (no IP whitelist) |
| 8.11 | **D12** | `product-spec.md:518` | Add `ON DELETE CASCADE` to `appraisals.user_id` |
| 8.12 | **D13** | `product-spec.md` | `users.reveals_remaining DEFAULT 5` |

### Verification
- All docs reference the same pricing tiers, numbers, and phase numbers
- No contradictions between docs

---

## Phase 9: New Database Migrations (Phase 7 features) (Day 15-17)

**Goal**: Create the missing tables for Phase 7 (Marketplace) per the spec.

### Tasks

| # | Bug | File | Action |
|---|-----|------|--------|
| 9.1 | **Missing tables** | New `migrations/012_marketplace.up.sql` | Create `listings` table per `product-spec.md` |
| 9.2 | New | `migrations/013_orders.up.sql` | Create `orders` table |
| 9.3 | New | `migrations/014_escrow.up.sql` | Create `escrow` table |
| 9.4 | New | `migrations/015_seller.up.sql` | Create `seller_listings` + `domain_verification` tables |
| 9.5 | New | `migrations/016_settings.up.sql` | Create `settings` table |

### Verification
- All migrations apply cleanly
- Schema matches `product-spec.md` definitions

---

## Phase 10: External Services & API Integrations (Day 17-19)

> **REQUIRES**: API keys for external services (Paystack, Brevo, RDAP, DataForSEO, Ahrefs, OPR)

### Tasks

| # | Item | Action |
|---|------|--------|
| 10.1 | Paystack SDK integration | Real Paystack transaction initialization + verification |
| 10.2 | Brevo email integration | Reveal confirmation emails, subscription receipts |
| 10.3 | Real RDAP client | Use external RDAP with bootstrap cache |
| 10.4 | DataForSEO integration | Real keyword + CPC data |
| 10.5 | Ahrefs integration | Domain Authority, backlink data |
| 10.6 | OpenPageRank integration | Page authority scoring |
| 10.7 | Google CSE / Brave search | Search volume data |

### Verification
- All external API calls work with real keys
- Webhook flow processes real Paystack events

---

## Phase 11: Frontend Redesign & Content (Day 19-30)

> **REQUIRES**: Content writeup, page copy, and design for each page.
> All 6 design rules from AGENTS.md are enforced in this phase.

### Routing Decisions (Phase 1)

| Decision | Detail |
|----------|--------|
| **Appraisal route split** | `/tools/appraisal` = public (www subdomain), `/appraise` = authenticated (app subdomain) |
| **Documentation migration** | Docs (16-Dimension Framework, Sales Trends, Pricing) move into Help Center over time. Removed from navbar — users access via Help Center |
| **Explore nav category** | Replaced "Documentation" in Resources mega menu with Explore (Blog, Ebooks, Case Studies) |
| **API Docs** | Added under Support in Resources mega menu, links to `/tools/api` |

### 11A. Page Redesigns (28+ pages, Rule 1-6 Compliant)

> All pages below must comply with the 6 design rules in AGENTS.md.
> No ToolPageTemplate, no card UI, no empty pages, 5+ unique UI elements, 2+ outbound links.

| Category | Pages to Redesign | Current State |
|----------|-------------------|---------------|
| **tools/** | `seo-scanner`, `extended-insights`, `bulk-analyzer`, `api`, `trademark-monitor`, `domain-database` | All identical ToolPageTemplate |
| **solutions/** | `domain-investors`, `startup-founders`, `seo-agencies`, `find-available`, `research-intelligence`, `buy-premium` | All identical ToolPageTemplate |
| **resources/** | `blog`, `help-center`, `contact`, `changelog`, `16-dimension-framework`, `market-trends` | All identical ToolPageTemplate |
| **marketplace/** | `curated`, `sell`, `pricing`, `how-unmasking-works` | All identical ToolPageTemplate |
| **Index pages** | `resources/page.tsx`, `solutions/page.tsx` | Empty shells (10 lines) |
| **Legal** | `legal/cookies`, `legal/privacy`, `legal/terms` | Near-empty (17-19 lines) |
| **Other** | `platform/page.tsx`, `marketplace/pricing/page.tsx` | Minimal (30-36 lines) |

### 11B. Content Creation

- Each redesigned page gets real copy, not placeholders
- Industry-standard layouts (no ToolPageTemplate reuse)
- No "Coming Soon" — every page ships with real content
- Content must match the product's tone: simple, casual, developer-focused

### 11C. New Pages to Create

| # | Page | Route | Source |
|---|------|-------|--------|
| 11.1 | About | `/about` | `product-spec.md:69` |
| 11.2 | Enterprise | `/enterprise` | `product-spec.md:88` |
| 11.3 | Blog | `/resources/blog` | ✅ exists, needs redesign |
| 11.4 | Ebooks | `/resources/ebooks` | NEW — gated ebooks on domain investing |
| 11.5 | Case Studies | `/resources/case-studies` | NEW — real stories from investors |
| 11.6 | Help Center | `/resources/help-center` | Will absorb documentation |
| 11.7 | Contact | `/resources/contact` | Needs redesign |
| 11.8 | Admin Dashboard | `/admin` | `product-spec.md:101-112` |
| 11.9 | Seller Portal | `/marketplace/sell` | Needs redesign |
| 11.10 | Listing Detail | `/marketplace/[id]` | `product-spec.md:657-660` |
| 11.11 | Company pages | `/company/about`, `/company/careers` | Footer links |
| 11.12 | Platform subpages | `/platform/*` | From `site-architecture.md:36-42` |
| 11.13 | Solution subpages | `/solutions/use-cases/*`, `/solutions/industries/*` | From `site-architecture.md:46-60` |

### 11D. Design Rules Enforcement

| Rule | Check |
|------|-------|
| Rule 1 | No 2 pages use same template |
| Rule 2 | No 2 sections look the same |
| Rule 3 | Card UI banned (max 1 per page) |
| Rule 4 | No empty pages |
| Rule 5 | 5+ unique UI elements per page |
| Rule 6 | 2+ outbound links per page |

### Verification
- All links from nav, footer, and CTAs resolve to real pages
- All pages have meaningful content (not "Coming Soon")
- All pages pass Rule 1-6 compliance check

---

## Phase 12: Remaining API Endpoints (Day 25-28)

### Tasks

| # | Endpoint | Spec Ref |
|---|----------|----------|
| 12.1 | `POST /api/v1/search` | `product-spec.md:656` |
| 12.2 | `GET /api/v1/scans/:id/stream` (SSE) | `implementation-plan.md:306` |
| 12.3 | `GET /api/v1/health/check` (RDAP) | `implementation-plan.md:387` |
| 12.4 | `GET /api/v1/marketplace` | `product-spec.md:658` |
| 12.5 | `GET /api/v1/marketplace/:id` | `product-spec.md:659` |
| 12.6 | `POST /api/v1/marketplace/list` | `product-spec.md:660` |
| 12.7 | `POST /api/v1/listings` (admin) | `implementation-plan.md:550` |
| 12.8 | `POST /api/v1/orders` | `implementation-plan.md:553` |
| 12.9 | `POST /api/v1/seller/submit` | `implementation-plan.md:583` |
| 12.10 | `POST /api/v1/seller/verify` | `implementation-plan.md:584` |
| 12.11 | `GET /api/v1/seller/listings` | `implementation-plan.md:585` |
| 12.12 | Admin endpoints | `product-spec.md:725-734` |
| 12.13 | `/api/docs`, `/metrics` | `implementation-plan.md:655` |

### Verification
- All API endpoints from docs are implemented
- All endpoints have tests

---

## Phase 13: Final Polish (Day 28-30)

### Tasks

| # | Item | Action |
|---|------|--------|
| 13.1 | i18n translations | Add `next-intl` translations to all 42 pages |
| 13.2 | Performance | Run load tests, optimize queries |
| 13.3 | Security audit | Penetration test, dependency audit |
| 13.4 | Deploy | Production nginx + Docker |
| 13.5 | Launch | Public announcement |

---

## Summary

| Phase | Duration | Focus | Bug Count Fixed |
|-------|----------|-------|-----------------|
| 0 | Day 1-2 | Critical security & runtime | 6 (C1-C6) |
| 1 | Day 2-3 | High-priority frontend routes | 9 (FE1-FE8, FE9 partial) |
| 2 | Day 3-5 | High-priority backend | 7 (H2, H4, H5, H7, H8, H10, H11) |
| 3 | Day 5-6 | Pricing tier reconciliation | 6 (D1, D2, H9, M-subscription) |
| 4 | Day 6-7 | Database schema hardening | 4 migrations |
| 5 | Day 7-9 | Backend code quality | 17 (M-series) |
| 6 | Day 9-11 | Frontend polish | 7 (FE6, FE10-FE16) |
| 7 | Day 11-13 | Backend cleanup | 26 (L-series) |
| 8 | Day 13-15 | Doc reconciliation | 12 (D-series) |
| 9 | Day 15-17 | New migrations | 5 tables |
| 10 | Day 17-19 | External services | 7 integrations |
| 11 | Day 19-30 | Frontend redesign + content | 28+ pages (Rule 1-6) |
| 12 | Day 30-33 | New API endpoints | 13 endpoints |
| 13 | Day 33-35 | Final polish | i18n + perf + deploy |

**Total estimated**: ~35 days

**Order of execution**:
1. **Phase 0-2**: Fix all critical/high-priority bugs first (runtime failures + security)
2. **Phase 3-7**: Clean up backend and frontend (medium/low bugs)
3. **Phase 8**: Reconcile all documentation
4. **Phase 9**: Database migrations for marketplace
5. **Phase 10**: External services (requires API keys + rigorous testing)
6. **Phase 11**: Frontend redesign + content (28+ pages, Rule 1-6 enforced, requires content writeups)
7. **Phase 12**: New API endpoints
8. **Phase 13**: Production polish

**Critical path**: Phase 0 (C1-C6) must be done before any production deployment.
