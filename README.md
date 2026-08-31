# Ceche

> Enterprise-grade domain name discovery, intelligence, and marketplace platform.

[![GitHub stars](https://img.shields.io/github/stars/nekwasar/ceche?style=social)](https://github.com/nekwasar/ceche)
[![Release](https://img.shields.io/github/v/release/nekwasar/ceche?style=flat-square&color=9E2A2B&display_name=release)](https://github.com/nekwasar/ceche/releases)
[![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)](https://go.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Ceche finds premium available domains, scores them with a 16-dimension intelligence engine, and sells the name via pay-to-reveal mechanics. Built for domain investors, startup founders, and SEO agencies who need data-driven domain decisions.

The platform runs on five commitments:

- **Intelligence-first.** Every domain is scored across 16 dimensions — TLD authority, brandability, pronounceability, length, memorability, phonetics, semantic density, and more. Free users see the score; premium users see the full breakdown.
- **Pay-to-reveal.** Partial reveal (`c*****m.com`), try-your-luck (`????.tld`), or full reveal. The business model is built into the product.
- **Enterprise security.** Domain names encrypted at rest with AES-256-GCM. JWT auth with refresh tokens. Rate limiting per IP. HMAC-SHA512 webhook verification.
- **Multi-locale.** 9 languages (en, fr, de, es, pt, ko, zh, ja, it) with next-intl. English = no prefix; other locales get `/fr/`, `/de/`, etc.
- **API-first.** Every feature is accessible via REST API with versioning (`/api/v1/...`). Built for integrations from day one.

## Quick start

```bash
git clone https://github.com/nekwasar/ceche.git
cd ceche
docker compose up -d db          # PostgreSQL 16 on :5432
cp .env.example .env             # set DATABASE_URL, JWT_SECRET, DOMAIN_ENCRYPTION_KEY
go run ./cmd/server/migrate     # apply migrations
cd app && npm install && npm run dev  # frontend on http://localhost:4321
```

Then open http://localhost:4321/en. Create an account. You get 12 free appraisals. Appraise a domain with the API:

```bash
curl -X POST http://localhost:8080/api/v1/appraise \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"domain": "techstart", "tld": "com"}'
```

See [Installation](#installation) for the full database, migrations, and environment setup.

## Table of contents

- [What is Ceche](#what-is-ceche)
- [Features](#features)
- [The numbers](#the-numbers)
- [Architecture](#architecture)
- [Repository layout](#repository-layout)
- [Installation](#installation)
- [Usage](#usage)
- [API reference](#api-reference)
- [Status and roadmap](#status-and-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Docs](#docs)

## What is Ceche

Ceche is a domain intelligence platform that answers one question: *is this domain worth buying?* It combines 16 scoring dimensions, real-time availability checking, and a pay-to-reveal marketplace into a single product.

The scoring engine evaluates every domain across TLD authority, brandability, pronounceability, length, memorability, semantic density, and 10 other dimensions. Free users see the composite score and three basic modules. Premium users unlock the full intelligence report with estimated value, registration history, and commercial potential.

The platform also includes a domain scanner — a goroutine-pooled engine that checks thousands of domain combinations against DNS records, filtering for available names across `.com`, `.net`, `.io`, and `.co`. Results export to CSV. The marketplace lets users list domains for resale after purchase, with DNS verification and admin moderation.

Ceche is built as a monorepo: a Go API backend with PostgreSQL 16, and a Next.js 15 frontend with next-intl for internationalization. The design system uses Ubuntu font, a dark reddish-orange primary (`#9E2A2B`), cream background (`#FAF7F2`), and amber accent (`#F4A261`).

## Features

- **16-dimension scoring engine.** TLD authority, brandability, pronounceability, length, memorability, semantic density, phonetics, pattern detection, commercial potential, and 7 more dimensions. Goroutine-safe, cached for 1 hour.
- **Domain scanner.** Goroutine pool (configurable, default 50 workers) with DNS lookup, batch result insertion, and real-time progress via SSE or polling. Supports 4 built-in word lists and custom uploads.
- **Domain encryption.** AES-256-GCM encryption at rest for all domain names. Key derived from `DOMAIN_ENCRYPTION_KEY` env var.
- **Free/premium gating.** Score + 3 modules free; full intelligence report premium. Teaser content for locked modules.
- **In-memory caching.** bigcache L1 cache with 1-hour TTL for appraisal results. Reduces repeat queries to zero cost.
- **JWT authentication.** HS256 access tokens (15min) + refresh tokens (7d). bcrypt cost 12. Rate limiting per IP.
- **Marketplace.** Post-purchase seller listing with DNS verification, listing fee calculator, admin moderation queue.
- **Lock-and-reserve.** 5-minute checkout lock with RDAP availability check. Registration handoff to Dynadot, Namecheap, Porkbun.
- **Multi-locale.** 9 languages with next-intl. 405 total pages (45 pages × 9 locales).
- **Paystack payments.** Webhook HMAC-SHA512 verification. No-refund policy for digital goods.
- **API-first.** REST API with versioning (`/api/v1/...`). Every feature accessible programmatically.
- **Enterprise design.** PitchBook-style UI with Ubuntu font, mega menu navbar, enterprise footer, tool page templates.

## The numbers

| Number | Value |
| --- | --- |
| Scoring dimensions | 16 |
| Supported TLDs | 4 (.com, .net, .io, .co) |
| Locales | 9 (en, fr, de, es, pt, ko, zh, ja, it) |
| Pages | 45 × 9 locales = 405 total |
| Goroutine pool size | 50 (configurable) |
| DNS lookup timeout | 5 seconds per domain |
| Cache TTL | 1 hour (bigcache) |
| JWT access token | 15 minutes |
| JWT refresh token | 7 days |
| bcrypt cost | 12 |
| Free reveals at signup | 5 |
| Paid tiers | Premium Startup $79, Premium Enterprise $129 |
| Reveal types | Partial, Try Your Luck, Full |
| Word lists | 4 built-in (common, tech, business, creative) |
| Cold start | 69ms |
| Memory usage | 60MB |

## Architecture

```mermaid
flowchart TD
    subgraph Frontend["Frontend · Next.js 15"]
        WWW["www.ceche.net · marketing"]
        APP["app.ceche.net · authenticated"]
        I18N["next-intl · 9 locales"]
    end

    subgraph Backend["Backend · Go 1.22+"]
        API["chi router · /api/v1/*"]
        AUTH["JWT auth · HS256"]
        APPRAISE["16-dimension scorer"]
        SCANNER["goroutine pool · 50 workers"]
        ENCRYPT["AES-256-GCM encryption"]
        CACHE["bigcache · 1h TTL"]
    end

    subgraph Data["Data · PostgreSQL 16"]
        DB["users · scans · appraisals · word_lists"]
        MIGRATE["golang-migrate"]
    end

    subgraph External["External"]
        DNS["DNS lookup"]
        RDAP["RDAP domain check"]
        PAY["Paystack webhooks"]
        BREVO["Brevo email"]
    end

    WWW --> API
    APP --> API
    I18N --> WWW
    I18N --> APP
    API --> AUTH
    API --> APPRAISE
    API --> SCANNER
    APPRAISE --> ENCRYPT
    APPRAISE --> CACHE
    SCANNER --> DNS
    API --> RDAP
    API --> PAY
    API --> BREVO
    APPRAISE --> DB
    SCANNER --> DB
    AUTH --> DB
    DB --> MIGRATE
```

Two surfaces, one API: `www.ceche.net` for marketing (301 redirect from `ceche.net`), `app.ceche.net` for authenticated users. The Go backend handles all business logic; Next.js handles rendering and i18n.

## Repository layout

| Path | Content |
| --- | --- |
| `cmd/server/` | Go entry point, migration runner |
| `internal/config/` | Environment configuration |
| `internal/database/` | PostgreSQL connection pool |
| `internal/api/v1/` | HTTP handlers, router, auth middleware |
| `internal/api/middleware/` | CORS, logging, recovery, rate limiting |
| `internal/service/` | Appraisal engine, domain encryption |
| `internal/cache/` | bigcache L1 cache layer |
| `internal/scanner/` | Goroutine pool scanner, word lists |
| `migrations/` | PostgreSQL migrations (golang-migrate) |
| `app/` | Next.js 15 frontend (App Router) |
| `app/app/[locale]/` | Localized pages (45 pages × 9 locales) |
| `app/components/` | React components (Navbar, Footer, Hero, ToolPageTemplate) |
| `app/styles/` | Tailwind config, globals.css |
| `docs/` | Implementation plan, tech stack, payments, i18n, enterprise standards |

## Installation

Prerequisites: Go 1.22+, Node.js 20+, Docker (for PostgreSQL).

```bash
git clone https://github.com/nekwasar/ceche.git
cd ceche
docker compose up -d db          # PostgreSQL 16 on :5432
```

Set up environment variables:

```bash
cp .env.example .env
# Required:
#   DATABASE_URL=postgresql://ceche:ceche@localhost:5432/ceche
#   JWT_SECRET=<random-64-char-hex>
#   DOMAIN_ENCRYPTION_KEY=<random-32-char-hex>
# Optional:
#   PAYSTACK_SECRET_KEY=sk_test_...
#   BREVO_API_KEY=...
#   CEche_CORS_ORIGINS=http://localhost:4321
```

Apply migrations:

```bash
go run ./cmd/server/migrate
```

Install and start the frontend:

```bash
cd app
npm install
npm run dev                    # http://localhost:4321
```

Start the API server:

```bash
go run ./cmd/server/main.go    # http://localhost:8080
```

Run tests:

```bash
go test ./internal/service/... -v
```

## Usage

### Appraise a domain

```bash
curl -X POST http://localhost:8080/api/v1/appraise \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"domain": "techstart", "tld": "com"}'
```

Free response (score + 3 modules):

```json
{
  "domain": "techstart.com",
  "score": 82,
  "modules": [
    {"name": "tld", "label": "TLD Authority", "value": 0.9},
    {"name": "length", "label": "Length Score", "value": 0.85},
    {"name": "pronounceability", "label": "Pronounceability", "value": 0.78}
  ],
  "estimated_value": null,
  "tier": "free"
}
```

Premium response (full 16-dimension breakdown):

```json
{
  "domain": "techstart.com",
  "score": 82,
  "estimated_value": {"min": 2500, "max": 7500},
  "modules": [
    {"name": "tld", "label": "TLD Authority", "value": 0.9},
    {"name": "length", "label": "Length Score", "value": 0.85},
    {"name": "pronounceability", "label": "Pronounceability", "value": 0.78},
    {"name": "brandability", "label": "Brandability", "value": 0.88},
    {"name": "memorability", "label": "Memorability", "value": 0.82},
    {"name": "semantic_density", "label": "Semantic Density", "value": 0.75},
    {"name": "phonetics", "label": "Phonetics", "value": 0.80},
    {"name": "pattern", "label": "Pattern Detection", "value": 0.70},
    {"name": "commercial", "label": "Commercial Potential", "value": 0.85}
  ],
  "tier": "premium"
}
```

### Start a scan

```bash
curl -X POST http://localhost:8080/api/v1/scans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"word_list_name": "tech", "tlds": ["com", "net"]}'
```

### Get scan results

```bash
curl http://localhost:8080/api/v1/scans/<scan_id> \
  -H "Authorization: Bearer <token>"
```

### Export scan results to CSV

```bash
curl http://localhost:8080/api/v1/scans/<scan_id>/export \
  -H "Authorization: Bearer <token>" \
  -o results.csv
```

### List word lists

```bash
curl http://localhost:8080/api/v1/word-lists \
  -H "Authorization: Bearer <token>"
```

## API reference

| Endpoint | Method | Auth | Notes |
| --- | --- | --- | --- |
| `/api/v1/auth/register` | POST | No | Create account. Returns token + refresh token. |
| `/api/v1/auth/login` | POST | No | Login. Returns token + refresh token. |
| `/api/v1/auth/refresh` | POST | No | Refresh access token. |
| `/api/v1/users/me` | GET | Yes | Get current user profile. |
| `/api/v1/users/me` | PUT | Yes | Update user profile. |
| `/api/v1/appraise` | POST | Yes | Appraise domain. Free: score + 3 modules. Premium: full breakdown. |
| `/api/v1/appraisals` | GET | Yes | List user's appraisals. |
| `/api/v1/appraisals/:id` | GET | Yes | Get appraisal by ID. |
| `/api/v1/scans` | POST | Yes | Start scan. Body: `{word_list_name, tlds, words}`. |
| `/api/v1/scans` | GET | Yes | List user's scans. |
| `/api/v1/scans/:id` | GET | Yes | Get scan with results. |
| `/api/v1/scans/:id/export` | GET | Yes | Export scan results as CSV. |
| `/api/v1/word-lists` | GET | Yes | List built-in + custom word lists. |
| `/api/v1/word-lists` | POST | Yes | Create custom word list. Body: `{name, words}`. |
| `/api/v1/word-lists/:id` | DELETE | Yes | Delete custom word list. |
| `/api/v1/api-keys` | POST | Yes | Create API key. |
| `/api/v1/api-keys` | GET | Yes | List API keys. |
| `/api/v1/api-keys/:id` | DELETE | Yes | Revoke API key. |
| `/health` | GET | No | Health check. Returns `{status: "ok"}`. |

Every request validates input at the boundary. Rate limits apply per IP (configurable via `RATE_LIMIT_USER`).

## Status and roadmap

**Shipped:** Phase 0 (Foundation), Phase 1 (Auth & Users), Phase 2 (16-Dimension Scoring + Free/Premium Gating), Phase 3 (Domain Scanner Engine), Phase 4 (Lock-and-Reserve System), Phase 5 (Intelligence Profiles), Phase 6 (Name Suggestions Engine).

**In progress:** Phase 7 (Marketplace & Seller Transition).

**Remaining phases:**

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Foundation | Complete |
| 1 | Auth & Users | Complete |
| 2 | 16-Dimension Scoring | Complete |
| 3 | Domain Scanner Engine | Complete |
| 4 | Lock-and-Reserve | Pending |
| 5 | Payment Integration | Pending |
| 6 | Email & Notifications | Pending |
| 7 | Marketplace & Seller Transition | Pending |
| 8 | Admin Dashboard | Pending |
| 9 | SEO & Sitemap | Pending |
| 10 | i18n (9 locales) | Pending |
| 11 | Deployment | Pending |
| 12 | Polish & Launch | Pending |

See [`docs/implementation-plan.md`](docs/implementation-plan.md) for the full 13-phase plan with detailed tasks.

## Contributing

Worth reading before any change, in this order:

1. [`AGENTS.md`](AGENTS.md) — Agent context and session protocol.
2. [`docs/implementation-plan.md`](docs/implementation-plan.md) — The 13-phase plan.
3. [`docs/tech-stack.md`](docs/tech-stack.md) — Technology decisions.
4. [`docs/enterprise-standards.md`](docs/enterprise-standards.md) — Security, observability, delivery standards.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). Every phase is committed separately with a descriptive message.

## License

All rights reserved. Copyright 2026 nekwasar.

No license is granted to use, copy, modify, or redistribute this code. Written permission from the author is required first.

## Docs

- [`docs/implementation-plan.md`](docs/implementation-plan.md) — 13-phase implementation plan
- [`docs/tech-stack.md`](docs/tech-stack.md) — Technology decisions and rationale
- [`docs/site-architecture.md`](docs/site-architecture.md) — Full sitemap and page structure
- [`docs/enterprise-standards.md`](docs/enterprise-standards.md) — Security, observability, delivery
- [`docs/payments.md`](docs/payments.md) — Paystack integration and webhook handling
- [`docs/i18n.md`](docs/i18n.md) — Internationalization strategy (9 locales)
- [`docs/scaling-insights.md`](docs/scaling-insights.md) — Data pipeline strategy and cost projections
- [`docs/bug1.md`](docs/bug1.md) — Bug report with enterprise-grade fixes
