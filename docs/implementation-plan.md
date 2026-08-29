# Ceche — Implementation Plan

> Enterprise-grade B2B domain discovery platform. 12 phases, ~90 days to production.

---

## Timeline Summary

| Phase | Days | Milestone |
|-------|------|-----------|
| 0 | 1-2 | Foundation |
| 1 | 3-5 | Auth & Users |
| 2 | 6-10 | Appraiser |
| 3 | 11-18 | Scanner |
| 4 | 19-26 | Reveal & Payments |
| 5 | 27-32 | Intelligence |
| 6 | 33-38 | Name Suggestions |
| 7 | 39-48 | Marketplace |
| 8 | 49-52 | API Access |
| 9 | 53-65 | Public Pages |
| 10 | 66-70 | Observability |
| 11 | 71-80 | Deployment |
| 12 | 81-90 | Polish & Launch |

---

## Dependencies Graph

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7
                                                            ↓
                                                          Phase 8
                                                            ↓
Phase 0 → Phase 9 (can start in parallel with Phase 2+)
                                                            ↓
Phase 10 (after Phase 4)
                                                            ↓
Phase 11 (after Phase 9)
                                                            ↓
Phase 12 (after Phase 11)
```

---

## Phase 0: Project Scaffolding & Foundation
**Duration:** Day 1-2
**Goal:** Clean repo, working dev environment, all tooling configured

### Backend (Go)
- Initialize Go module: `github.com/nekwasar/ceche`
- Project structure:
  ```
  cmd/server/main.go
  internal/
    config/config.go
    database/postgres.go
    api/v1/router.go
    api/middleware/{cors,ratelimit,auth,logging,recovery}.go
    models/
    repository/
    service/
    scanner/
    worker/
  migrations/
  ```
- Config via env vars: `DATABASE_URL`, `PAYSTACK_SECRET_KEY`, `BREVO_API_KEY`, `JWT_SECRET`, `CORS_ORIGINS`, `PORT`
- Health endpoint: `GET /health` → `{"status":"ok","version":"1.0.0"}`
- Graceful shutdown on SIGTERM/SIGINT

### Database
- PostgreSQL 16 with connection pooling
- Migrations using `golang-migrate/migrate`
- Initial schema: `users`, `api_keys` tables only

### Frontend (Next.js 15)
- `npx create-next-app@latest` with App Router, TypeScript, Tailwind
- Install `next-intl`
- Project structure:
  ```
  app/[locale]/
    layout.tsx
    page.tsx
    platform/
    solutions/
    resources/
    pricing/
    login/
    signup/
  components/ui/ (shadcn/ui)
  components/layout/ (Header, Footer, LanguageSwitcher)
  messages/{en,fr,de,es,pt}.json
  i18n/config.ts
  i18n/request.ts
  ```
- Middleware for locale detection
- Language switcher in header
- Placeholder pages for all routes

### DevOps
- `docker-compose.yml` with postgres, backend, frontend
- `.env.example` with all required vars

### Verification Checklist
- [ ] `docker-compose up` starts all 3 services
- [ ] `GET /health` returns 200
- [ ] Frontend loads at `localhost:3000`
- [ ] Locale prefix works: `/en/`, `/fr/`
- [ ] Language switcher changes locale
- [ ] All placeholder pages render

### Things to Avoid
- Don't add business logic yet
- Don't create premature abstractions
- Don't skip TypeScript strict mode
- Don't use `any` type anywhere

---

## Phase 1: Authentication & User Management
**Duration:** Day 3-5
**Goal:** Users can register, login, manage API keys

### Backend
- Tables: `users` (id, email, password_hash, name, plan, created_at, updated_at)
- Tables: `api_keys` (id, user_id, key_hash, name, permissions, rate_limit, created_at, last_used_at)
- `POST /api/v1/auth/register` → bcrypt password, create user
- `POST /api/v1/auth/login` → JWT (15min) + refresh token (7d)
- `POST /api/v1/auth/refresh` → new JWT
- `GET /api/v1/users/me` → current user profile
- `PUT /api/v1/users/me` → update profile
- `POST /api/v1/api-keys` → create API key (permission: `appraise`, `scan`, `reveal`)
- `DELETE /api/v1/api-keys/:id` → revoke
- Rate limiting: 100 req/min per user, 1000 req/min per API key
- Audit log table: `audit_logs` (user_id, action, resource, ip, user_agent, created_at)

### Frontend
- `/login` page with email/password form
- `/signup` page with registration form
- Auth context with JWT storage (httpOnly cookie)
- Protected dashboard layout
- API key management UI

### Verification Checklist
- [ ] Register → receive JWT
- [ ] Login → receive JWT
- [ ] JWT expires → refresh works
- [ ] Invalid credentials → 401
- [ ] Rate limit → 429
- [ ] Audit log records all auth events
- [ ] API key creation/revocation works

### Things to Avoid
- Never store passwords in plaintext
- Never expose JWT in URLs
- Don't skip CSRF protection on auth endpoints
- Don't allow brute force (rate limit + lockout after 5 failures)

### Enterprise Checks
- [ ] Passwords bcrypt-hashed (cost 12)
- [ ] JWT signed with HS256
- [ ] Refresh tokens stored hashed in DB
- [ ] Audit trail captures IP + user agent
- [ ] API keys scoped to specific permissions

---

## Phase 2: Domain Appraiser Engine
**Duration:** Day 6-10
**Goal:** Domain name → intelligence score

### Backend
- Tables: `appraisals` (id, user_id, domain, tld, score, metrics_json, created_at)
- `POST /api/v1/appraise` → accept `{domain, tld}`, return `{score, metrics}`
- Scoring algorithm (v1):
  - Length score (shorter = better)
  - TLD premium (.com > .net > .io > .co)
  - Readability score
  - Brandability indicators
  - Dictionary word bonus
  - Phonetic ease score
- Metrics: length, readability, brandability, tld_premium
- Idempotency: `Idempotency-Key` header prevents duplicate appraisals
- Cache: Redis or in-memory for repeat lookups (24h TTL)
- Audit: log every appraisal request

### Frontend
- Dashboard: search bar for domain appraisal
- Results page: score visualization, metrics breakdown
- History: list of past appraisals
- Loading states with skeletons

### Verification Checklist
- [ ] `POST /api/v1/appraise` with `google.com` → returns score
- [ ] Same domain with idempotency key → same result, no duplicate DB row
- [ ] Invalid domain → 400 with clear error
- [ ] Rate limit respected
- [ ] Audit log captures request
- [ ] Score breakdown visible on frontend

### Things to Avoid
- Don't hardcode scoring weights (make them configurable)
- Don't skip input validation (domain format regex)
- Don't allow appraisal without auth
- Don't store raw domain names unencrypted (encrypt at rest)

---

## Phase 3: Domain Scanner Engine
**Duration:** Day 11-18
**Goal:** Find available domains matching criteria

### Backend
- Tables: `scans` (id, user_id, word_list_name, tlds, status, created_at, completed_at)
- Tables: `scan_results` (id, scan_id, domain, tld, available, price, checked_at)
- Tables: `word_lists` (id, user_id, name, words_json, source, created_at)
- Scanner engine (Go):
  - Goroutine pool (configurable concurrency, default 50)
  - TLDs: `.com`, `.net`, `.io`, `.co` only
  - WHOIS lookup with timeout (5s per domain)
  - DNS record check as fallback
  - Progress tracking via SSE or polling
  - Rate limiting per TLD registry
- `POST /api/v1/scans` → start scan with `{word_list, tlds}`
- `GET /api/v1/scans/:id` → scan status + results
- `GET /api/v1/scans/:id/stream` → SSE progress updates
- Word list management:
  - Built-in list: 10K common English words
  - `POST /api/v1/word-lists` → upload custom
  - `GET /api/v1/word-lists` → list all

### Frontend
- Scan creation form: select word list, choose TLDs
- Real-time progress bar via SSE
- Results table: domain, tld, available, price
- Filter/sort available domains
- Export results (CSV)

### Verification Checklist
- [ ] Scan starts and progresses
- [ ] Available domains correctly identified
- [ ] Concurrent scans don't block each other
- [ ] Rate limits per TLD respected
- [ ] Scan can be cancelled
- [ ] Word list upload works
- [ ] Results export to CSV

### Things to Avoid
- Don't scan ALL TLDs (only .com/.net/.io/.co)
- Don't skip WHOIS rate limits (registry bans)
- Don't run unlimited goroutines (exhaust server)
- Don't store scan results unencrypted

---

## Phase 4: Reveal & Payment System
**Duration:** Day 19-26
**Goal:** Users pay to reveal hidden domain names

### Backend
- Tables: `reveals` (id, user_id, domain_hash, reveal_type, amount, paystack_ref, status, created_at)
- Tables: `subscriptions` (id, user_id, plan, paystack_sub_id, status, current_period_end)
- Domain name encryption: AES-256-GCM
  - `domain_hash` = SHA-256(domain) for lookup
  - `domain_encrypted` = AES-256-GCM(domain) for storage
  - Decryption key from env var `DOMAIN_ENCRYPTION_KEY`
- Reveal types:
  - **Partial**: show first char + last char + TLD (e.g., `c*****m.com`)
  - **Try Your Luck**: show `????.tld` only
  - **Full**: show complete domain
- Pricing:
  - Partial: $5-10 (dynamic based on score)
  - Try Your Luck: $3-5
  - Full: additional $2-5
- Paystack integration:
  - `POST /api/v1/reveals` → initialize transaction
  - `POST /api/v1/webhooks/paystack` → verify payment
  - Webhook verification: HMAC-SHA512 signature check
  - Idempotency keys on all payment operations
- Subscription plans:
  - `POST /api/v1/subscriptions` → create
  - `GET /api/v1/subscriptions` → status
  - `DELETE /api/v1/subscriptions` → cancel
- Reveal credits system:
  - Free: 5 reveals/month
  - Starter: 50/month
  - Pro: 200/month
  - Enterprise: unlimited

### Frontend
- Reveal button with price display
- Payment flow (Paystack checkout)
- Reveal result page: full domain name
- Subscription management
- Billing history

### Verification Checklist
- [ ] Domain names encrypted at rest
- [ ] Partial reveal shows `c*****m.com`
- [ ] Try Your Luck shows `????.com`
- [ ] Full reveal shows complete name
- [ ] Payment webhook verifies signature
- [ ] Idempotency prevents double charges
- [ ] Credits decrement correctly
- [ ] Subscription creation/cancellation works

### Things to Avoid
- Never log decrypted domain names
- Never expose encryption keys in code
- Don't skip webhook signature verification
- Don't allow reveal without payment
- Don't process webhooks synchronously (queue them)

---

## Phase 5: Intelligence Profiles
**Duration:** Day 27-32
**Goal:** Deep intelligence on any domain

### Backend
- Tables: `intelligence_profiles` (id, domain_hash, domain_encrypted, data_json, created_at, updated_at)
- Intelligence data:
  - Domain age/expiration
  - DNS records (A, MX, NS, TXT)
  - WHOIS registrant info (privacy-safe)
  - Historical ownership changes
  - SSL certificate status
  - Traffic estimates (if available)
  - Social media presence
  - Brand mentions
- `GET /api/v1/intelligence/:domain` → full profile
- `GET /api/v1/intelligence/:domain/summary` → brief stats
- Rate limiting: 10 requests/min per domain
- Caching: 24h TTL for non-sensitive data

### Frontend
- Intelligence profile page with tabs
- Summary card: age, expiry, DNS status
- Details: full WHOIS, DNS records
- History timeline
- Comparison: vs similar domains

### Verification Checklist
- [ ] Intelligence data populated correctly
- [ ] Domain name encrypted in storage
- [ ] Cache hit on repeat requests
- [ ] Rate limit enforced
- [ ] Privacy-safe WHOIS display

### Things to Avoid
- Don't expose raw WHOIS with personal data
- Don't skip data freshness checks
- Don't cache sensitive data beyond 24h

---

## Phase 6: Name Suggestions Engine
**Duration:** Day 33-38
**Goal:** AI-powered domain name generation

### Backend
- Tables: `suggestions` (id, user_id, seed, criteria_json, results_json, created_at)
- Generation algorithm:
  - Seed word variations (prefixes, suffixes)
  - Synonym replacement
  - TLD alternatives
  - Brand name mashups
  - Phonetic variations
- `POST /api/v1/suggestions` → generate `{seed, criteria}` → list of suggestions
- Each suggestion includes: domain, tld, score, reasoning
- Rate limit: 20 suggestions/day free, unlimited paid

### Frontend
- Input: seed word or phrase
- Filters: TLD preference, length, style
- Results grid with scores
- One-click appraisal from suggestion
- One-click scan from suggestion

### Verification Checklist
- [ ] Suggestions are relevant to seed
- [ ] Each suggestion has score + reasoning
- [ ] TLD filter works
- [ ] Integration with appraiser works
- [ ] Rate limits enforced

---

## Phase 7: Marketplace
**Duration:** Day 39-48
**Goal:** Buy domains directly through Ceche

### Backend
- Tables: `listings` (id, domain_hash, domain_encrypted, price, seller_id, status, created_at)
- Tables: `orders` (id, listing_id, buyer_id, amount, paystack_ref, status, created_at)
- Tables: `escrow` (id, order_id, amount, status, released_at)
- Listing flow:
  - Ceche lists premium domains from scanner
  - Price based on appraisal score
  - Buy now or make offer
- Order flow:
  - Buyer pays → escrow holds funds
  - Domain transfer initiated
  - Buyer confirms receipt
  - Funds released to Ceche
- `POST /api/v1/listings` → create listing (admin only)
- `GET /api/v1/listings` → browse marketplace
- `POST /api/v1/orders` → purchase
- `POST /api/v1/webhooks/paystack` → handle escrow

### Frontend
- Marketplace browse page with filters
- Domain detail page with appraisal + intelligence
- Checkout flow
- Order history
- Transfer status tracking

### Verification Checklist
- [ ] Escrow holds funds correctly
- [ ] Domain transfer verified
- [ ] Funds released only after confirmation
- [ ] All payments logged
- [ ] Refund policy enforced (no refunds)

---

## Phase 8: API Access
**Duration:** Day 49-52
**Goal:** Public API for developers

### Backend
- `GET /api/v1` → API documentation (OpenAPI/Swagger)
- Rate limits per tier:
  - Free: 10 req/day
  - Starter: 100 req/day
  - Pro: 500 req/day
  - Enterprise: unlimited
- API key authentication via `Authorization: Bearer <key>`
- Versioning: `/api/v1/`, `/api/v2/` (future)
- Deprecation headers on old versions

### Frontend
- `/platform/api` page with docs
- Interactive API explorer (Swagger UI)
- Code examples (Python, JavaScript, Go)

---

## Phase 9: Public Pages
**Duration:** Day 53-65
**Goal:** Complete marketing site

### Pages to Build (in order)

**Platform Pages (7)**
1. `/platform` — Overview
2. `/platform/domain-appraiser`
3. `/platform/domain-scanner`
4. `/platform/domain-marketplace`
5. `/platform/intelligence-profile`
6. `/platform/name-suggestions`
7. `/platform/api`

**Solutions Pages (9)**
1. `/solutions` — Overview
2. `/solutions/use-cases/find-available-domain-names`
3. `/solutions/use-cases/research-domain-intelligence`
4. `/solutions/use-cases/buy-premium-domains`
5. `/solutions/use-cases/monitor-domain-expiration`
6. `/solutions/use-cases/generate-brand-name-ideas`
7. `/solutions/industries/startups`
8. `/solutions/industries/agencies`
9. `/solutions/industries/domain-investors`

**Resources Pages (12)**
1. `/resources` — Overview
2. `/resources/blog` + `/resources/blog/[slug]`
3. `/resources/guides` + `/resources/guides/[slug]`
4. `/resources/customer-stories`
5. `/resources/ebooks`
6. `/resources/changelog`
7. `/resources/about`
8. `/resources/help-center`
9. `/resources/contact`
10. `/resources/affiliate`
11. `/resources/partner`
12. `/resources/community`

**Legal Pages (5)**
1. `/legal/terms`
2. `/legal/privacy`
3. `/legal/cookies`
4. `/legal/data`
5. `/legal/dpa`

**Company Pages (3)**
1. `/company/news`
2. `/company/about`
3. `/company/careers`

**Other Pages**
1. `/pricing` — with tier comparison
2. `/login` — auth
3. `/signup` — registration
4. `/demo` — demo request

### Verification Checklist
- [ ] All 40+ pages render correctly
- [ ] All pages localized (en/fr/de/es/pt)
- [ ] Language switcher works on every page
- [ ] SEO metadata on all pages
- [ ] hreflang tags correct
- [ ] Mobile responsive
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Page speed < 3s on 3G

### Things to Avoid
- Don't duplicate content across locales
- Don't forget hreflang tags
- Don't skip meta descriptions
- Don't use placeholder images in production
- Don't leave TODO comments

---

## Phase 10: Observability & Monitoring
**Duration:** Day 66-70
**Goal:** Full visibility into system health

### Backend
- Structured logging: JSON format with correlation IDs
- Request tracing: every request gets `X-Request-ID`
- Metrics endpoint: `GET /metrics` (Prometheus format)
- SLO definitions:
  - p99 latency < 500ms
  - Error rate < 1%
  - Uptime > 99.9%
- Alert rules:
  - Error rate > 1% for 5 min
  - p99 > 2s for 5 min
  - Database connection pool > 80%
  - Disk usage > 85%

### Frontend
- Error boundary with reporting
- Web Vitals tracking
- User session recording (opt-in)

### Verification Checklist
- [ ] All requests logged with correlation ID
- [ ] Metrics endpoint returns data
- [ ] Alerts fire on threshold breach
- [ ] Logs queryable by request ID
- [ ] Dashboard shows real-time metrics

---

## Phase 11: Deployment & Production
**Duration:** Day 71-80
**Goal:** Live on ceche.net

### Infrastructure
- Docker images: backend, frontend
- Docker Compose on production server
- Nginx reverse proxy with SSL (Let's Encrypt)
- PostgreSQL backup: daily automated, 30-day retention
- Environment variables in `.env` (not in code)

### CI/CD (GitHub Actions)
- On push to main:
  - Lint (golangci-lint, eslint)
  - Test (go test, jest)
  - Build Docker images
  - Deploy to production
- On PR:
  - Lint + test only

### Security
- SSL/TLS on all endpoints
- HSTS headers
- CSP headers
- Rate limiting at Nginx level
- Fail2ban for brute force
- Regular dependency updates

### Backup & Recovery
- Database: daily pg_dump, 30-day retention
- Test restore monthly
- RPO: 24 hours
- RTO: 2 hours

### Verification Checklist
- [ ] Site live at ceche.net
- [ ] SSL valid (Let's Encrypt)
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Payments processing
- [ ] Backups running
- [ ] Monitoring active
- [ ] Logs flowing

---

## Phase 12: Polish & Launch
**Duration:** Day 81-90
**Goal:** Production-ready, user-tested

### Tasks
- Performance optimization (Core Web Vitals)
- SEO audit (all pages)
- Accessibility audit (WCAG 2.1 AA)
- Security audit (OWASP Top 10)
- Load testing (1000 concurrent users)
- User acceptance testing
- Documentation update
- Support ticket system setup

### Verification Checklist
- [ ] Lighthouse score > 90
- [ ] No accessibility violations
- [ ] No security vulnerabilities
- [ ] Load test passed
- [ ] User testing completed
- [ ] Documentation complete
- [ ] Support system ready
