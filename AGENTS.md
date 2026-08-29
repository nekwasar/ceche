# Ceche — Agent Context

> Domain name discovery, intelligence, and marketplace platform.
> This file governs ALL work on the Ceche project. AI agents read this at the start of every session.

---

## What We Are Building

An enterprise-grade B2B platform that finds premium available domain names, shows full intelligence profiles, and sells the name via pay-to-reveal mechanics. The domain name IS the product. Intelligence proves value. Name is hidden until paid reveal.

---

## Tech Stack (FINAL — Do Not Change)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend** | Go (Fiber or Gin) | 69ms cold start, 60MB memory, goroutines for parallel scanning |
| **Database** | PostgreSQL 16 | Full-text search, JSONB, mature, ACID |
| **Frontend** | Next.js 15 (App Router) | SSR for SEO, React ecosystem, i18n support |
| **i18n** | next-intl | App Router native, Server Components, 2KB bundle |
| **Styling** | Tailwind CSS + shadcn/ui | Consistent design system, accessible components |
| **Payments** | Paystack (→ Stripe later) | Currently primary until Stripe account ready |
| **Email** | Brevo | Transactional emails |
| **Auth** | JWT (15min) + refresh tokens (7d) | Stateless, fast, secure |
| **Scanner** | Go goroutines (parallel TLDs) | .com, .net, .io, .co only |
| **Word Lists** | Bundled (10K-50K English words) | No external API dependency |
| **Cache** | In-memory LRU (bigcache) | Fast, no external dependency |

---

## Domain & Deployment

- **Domain**: ceche.net (DNS live)
- **Server**: Ubuntu 22.04 at 77.67.23.30
- **SSL**: Let's Encrypt (or Cloudflare)
- **Payment Gateway**: Paystack (primary until Stripe ready)
- **Brevo**: Account created and ready

---

## Project Structure

```
ceche/
├── cmd/server/main.go              (Go entry point)
├── internal/
│   ├── config/config.go            (env-based config)
│   ├── database/postgres.go        (connection pool)
│   ├── api/
│   │   ├── v1/router.go            (versioned routes)
│   │   └── middleware/              (cors, ratelimit, auth, logging, recovery)
│   ├── models/                     (structs, not DB)
│   ├── repository/                 (DB queries)
│   ├── service/                    (business logic)
│   ├── scanner/                    (TLD scanning engine)
│   └── worker/                     (background goroutines)
├── migrations/                     (SQL files)
├── app/                            (Next.js frontend)
│   └── [locale]/                   (i18n locale segment)
├── docs/                           (project documentation)
├── docker-compose.yml
├── .env.example
├── product-spec.md
└── AGENTS.md                       (this file)
```

---

## Navigation Structure (3 Categories)

### Primary Navigation
```
Platform ▾    Solutions ▾    Resources ▾    Pricing    [Language]    Login    Get Started
```

### Page Categories

**1. Platform** — Public product pages
- `/platform` — Overview
- `/platform/domain-appraiser`
- `/platform/domain-scanner`
- `/platform/domain-marketplace`
- `/platform/intelligence-profile`
- `/platform/name-suggestions`
- `/platform/api`

**2. Solutions** — Who we serve
- `/solutions` — Overview
- By Use Case: find-available, research-intelligence, buy-premium, monitor-expiration, generate-ideas, validate-investment
- By Industry: startups, agencies, enterprises, domain-investors, brand-strategists, web-developers

**3. Resources** — User guides
- Learn: blog, guides, customer-stories, ebooks, changelog, about, company
- Support: help-center, contact, affiliate, partner, community

**Plus**: pricing, legal (terms/privacy/cookies/data/dpa), company (news/about/careers), auth (login/signup/demo), socials, newsletter

---

## i18n Strategy

- **Library**: next-intl with App Router
- **URL Pattern**: Sub-path routing (`/en/platform`, `/fr/platform`)
- **Supported Locales**: en (default), fr, de, es, pt
- **Language Switcher**: In top nav, persists across all routes
- **SEO**: hreflang tags on all pages, localized sitemaps

---

## Enterprise Standards (MANDATORY)

Every phase must include:

1. **API Versioning** — `/api/v1/...` from day one
2. **Idempotency** — UUID keys on all write operations
3. **Audit Logging** — Immutable append-only table
4. **RBAC** — admin, user, api_key roles
5. **Rate Limiting** — Per endpoint + per user
6. **Structured Logging** — JSON + correlation IDs
7. **Health Checks** — `GET /health` endpoint
8. **SLO** — p99 < 500ms, 99.9% uptime
9. **Encryption** — AES-256 at rest for domain names
10. **Webhook Verification** — HMAC signature check

---

## Pricing Structure

| Plan | Price | Reveals/mo | API Calls |
|------|-------|------------|-----------|
| Free | $0 | 5 | 0 |
| Starter | $29/mo | 50 | 100 |
| Pro | $49/mo | 200 | 500 |
| Enterprise | $199/mo | Unlimited | Unlimited |

Reveal pricing: $5-10 partial, $3-5 Try Your Luck

---

## Security Rules (Hard Blockers)

- **NEVER hardcode credentials.** No emails, passwords, API keys, or tokens in source files.
- **NEVER log decrypted domain names.**
- **NEVER expose encryption keys in code.**
- **All passwords use bcrypt** (cost 12).
- **JWT signed with HS256**, 15min expiry, refresh tokens 7d.
- **All auth tokens stored in httpOnly cookies.**
- **Login always returns 401 "Invalid credentials"** — never reveal whether email exists.
- **SQL queries use parameterized statements**, never string interpolation.
- **Domain names encrypted at rest** with AES-256-GCM.
- **Webhook signatures verified** (HMAC-SHA512) before processing.
- **Rate limiting on all endpoints** (100 req/min per user, 1000 per API key).
- **CORS configured** via `CECHE_CORS_ORIGINS` env var.
- **Security headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options.

---

## Refund Policy

**No refunds.** All sales are final. Digital goods. This is stated clearly on pricing page and in Terms of Service.

---

## What Ceche Is NOT

- Not a registrar (doesn't sell domain registrations)
- Not an appraisal-only tool (appraisal is part of the intelligence layer)
- Not a data competitor (can't beat Sedo/GoDaddy on sales history)
- Not a name seller (Ceche finds names, users register them elsewhere)

---

## Important Context

- **Ceche only** seller at MVP (no third-party sellers)
- **Scanner TLDs**: .com, .net, .io, .co ONLY
- **API access**: Day one
- **Launch model**: Ceche only, no marketplace sellers initially
- **Reveal types**: Partial (first+last char visible), Try Your Luck (no hint), Full
- **Domain name is the product** — intelligence proves value — name hidden until paid
- **Paystack is primary** until Stripe account is ready
- **No refunds strictly** — digital goods policy

---

## CLI Commands

```bash
# Backend
go run cmd/server/main.go           # Development server
go test ./...                        # Run all tests

# Frontend
npm run dev                          # Development server (localhost:3000)
npm run build                        # Production build
npm run lint                         # ESLint

# Database
migrate -path migrations -database $DATABASE_URL up    # Run migrations
migrate -path migrations -database $DATABASE_URL down  # Rollback

# Docker
docker-compose up -d                 # Start all services
docker-compose down                  # Stop all services

# Deploy
git push origin main                 # Triggers CI/CD
```

---

## File Naming Conventions

- Go: `snake_case.go` (e.g., `domain_scanner.go`)
- TypeScript: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- SQL migrations: `001_initial.up.sql`, `001_initial.down.sql`
- Messages: `en.json`, `fr.json`, etc. in `messages/` directory
- Pages: `page.tsx` in App Router convention

---

## Before Starting Work

1. Read this file completely
2. Read `docs/implementation-plan.md` for current phase details
3. Read `docs/tech-stack.md` for technology decisions
4. Read `docs/enterprise-standards.md` for compliance requirements
5. Check `.env.example` for required environment variables
6. Run `docker-compose up -d` to verify dev environment
7. Run tests to ensure nothing is broken

---

## When Completing Work

1. Run linter (golangci-lint for Go, eslint for TypeScript)
2. Run type checker (go vet for Go, tsc for TypeScript)
3. Run tests (go test ./... for Go, jest for TypeScript)
4. Update relevant documentation if architecture changed
5. Commit with descriptive message
6. Do NOT commit secrets, keys, or credentials
