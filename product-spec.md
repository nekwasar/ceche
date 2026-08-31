# Ceche — Product Specification

> Domain name discovery, intelligence, and marketplace platform.
> Find premium available domains. See why they're valuable. Buy the name.

---

## Table of Contents

1. [Vision](#vision)
2. [How It Works](#how-it-works)
3. [Product Pages](#product-pages)
4. [Tools](#tools)
5. [Reveal Mechanics](#reveal-mechanics)
6. [Marketplace](#marketplace)
7. [Revenue Model](#revenue-model)
8. [Admin Panel](#admin-panel)
9. [Technical Architecture](#technical-architecture)
10. [Database Schema](#database-schema)
11. [API Endpoints](#api-endpoints)
12. [Deployment](#deployment)
13. [Milestones](#milestones)

---

## Vision

### What Ceche Is

Ceche is a domain name discovery and marketplace platform. It helps you find premium available domain names, shows you why they're valuable with real intelligence, and gives you the tools to buy or sell them.

### What Ceche Is NOT

- Not a registrar (doesn't sell domain registrations)
- Not an appraisal-only tool (appraisal is one feature among many)
- Not a data competitor (can't beat Sedo/GoDaddy on sales history)
- Not a name seller directly (Ceche finds names, users register them elsewhere)

### Core Strength

Technical efficiency. Ceche uses algorithms to FIND premium domains, ANALYZE them with a 16-dimension engine, and PRESENT them in a way that proves value before you commit.

### Tagline

**"Know what's available. Know what it's worth. Own it first."**

---

## How It Works

### The Discovery Flow

```
1. User searches "cloudops.com" on the homepage
2. Ceche checks availability instantly
3. If AVAILABLE: shows "Premium" label, what you can build with it, CTA "Appraise this name"
4. If TAKEN: shows WHOIS details (registrant, expiry, registrar)
5. User clicks "Appraise this name" → full 16-dimension analysis
6. If premium user → also sees DA, spam score, backlink profile
```

### The Marketplace Flow

```
1. Premium domain listed on Ceche marketplace (name HIDDEN, no hint at all)
2. Buyer sees full stats: score, value, CPC, brandability, TLD, category
3. Buyer pays reveal fee → gets the actual domain name
4. Buyer registers the domain at their preferred registrar
```

### The Guarantee

**All names listed on Ceche are premium.** Every single domain meets the premium threshold. No filler. No junk.

---

## Product Pages

### Public Pages (www.ceche.net)

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Hero with name search bar. Stats, feature sections, FAQ. |
| **Name Search** | `/` (hero search) | Search any domain → availability + premium/mid/low label |
| **Appraise** | `/tools/appraisal` | 16-dimension domain appraisal (rate-limited) |
| **Standard Marketplace** | `/marketplace` | Browse premium domains (name hidden, no hint). Pay to reveal. |
| **Try Your Luck** | `/marketplace/try-your-luck` | Pick a TLD, spin, pick a box, reveal |
| **Seller Listings** | `/marketplace/sell` | List your premium domain for sale |
| **Pricing** | `/pricing` | Subscription tiers + reveal pricing |
| **Solutions** | `/solutions/*` | By role (investors, founders, agencies) and by need |
| **Resources** | `/resources/*` | Explore (blog, ebooks, case studies), Support (help center, API docs, contact, changelog) |
| **Legal** | `/legal/*` | Terms, privacy, cookies |

> **Documentation Migration**: The 16-Dimension Framework, Domain Sales Trends, and Platform Pricing docs are being migrated into the Help Center (`/resources/help-center`). They are no longer separate nav items. Users access documentation through the Help Center.

### Auth Pages (app.ceche.net)

| Page | URL | Description |
|------|-----|-------------|
| **Sign Up** | `/signup` | Create account |
| **Login** | `/login` | Email/password login |
| **Appraise** | `/appraise` | 16-dimension appraisal (higher rate limits) |
| **Scanner** | `/scan` | Premium domain scanner (DA, spam, backlinks) |
| **Extended Insights** | `/extended-insights` | Deep DNS, USPTO/WIPO, trademark history |
| **Bulk Audit** | `/bulk-audit` | Bulk domain analysis |
| **Marketplace** | `/marketplace` | Browse/manage marketplace |
| **API Keys** | `/api-keys` | Manage API access |

---

## Tools

### 1. Name Search Tool (FREE — SEO traffic driver)

**URL**: Homepage search bar on www.ceche.net

**What it does**: Search any domain name → instant availability check + intelligence

**Flow**:
```
User types "cloudops.com" → clicks Search
  ↓
  IF UNAVAILABLE:
    → Show WHOIS details (registrant, expiry date, registrar, nameservers)
  IF AVAILABLE:
    → Show availability badge
    → Show premium / mid / low value label (no numeric scores)
    → Show "What you can build with this" suggestions
    → CTA: "Appraise this name →" (links to /tools/appraisal?domain=cloudops.com)
```

**Free version shows**:
- Domain availability (available / taken)
- WHOIS details (if taken)
- Premium / mid / low value label
- Suggested uses for the domain
- Link to appraise

**This is the primary SEO traffic driver.** Every domain search is a potential entry point.

### 2. Domain Appraisal (Rate-limited)

**URL**: `/tools/appraisal` (www) or `/appraise` (app)

**What it does**: 16-dimension deep analysis of any domain

**Rate Limits**:

| User Type | Appraisals/Day |
|-----------|----------------|
| Free (not signed up) | 3 |
| Free (signed up) | 12 |
| Premium Startup | 30 |
| Premium Enterprise | Unlimited |

**After limit reached**: Custom error page
- Message: "This request didn't go through. Sign up to increase your rate limit and appraise more domains."
- CTA: "Sign Up" → app.ceche.net/signup
- CTA: "Go Back Home" → /

**The 16 dimensions**:
1. RDAP (domain availability, registration data)
2. TLD Authority (extension quality score)
3. Length (character count penalty/bonus)
4. Word Count (single-word premium bonus)
5. Pronounceability (vowel ratio, phonetic patterns)
6. Segmenter (compound word detection)
7. Keyword (commercial intent scoring)
8. CPC (cost-per-click estimation)
9. Search Volume (monthly search trends)
10. Cross-TLD (availability across extensions)
11. Trademark (USPTO/WIPO conflict check)
12. Authority (backlink profile, domain age)
13. Confidence (overall score confidence)
15. Pricing (estimated value range)
16. Brandability (memorability, type-ability)

### 3. Domain Scanner (PREMIUM ONLY)

**URL**: app.ceche.net/scan

**What it does**: Premium version of the name search tool. Batch-scan domains with deep SEO metrics.

**Requires**: Premium subscription (Startup or Enterprise)

**Features**:
- DA (Domain Authority) scoring
- Spam score detection
- Backlink profile analysis
- Indexation status across search engines (Google, Bing, Yandex)
- WHOIS history
- TLD pricing lookup

**Not available to free users.** Free users see the name search tool on www.ceche.net.

### 4. Extended Insights (PREMIUM ONLY)

**URL**: app.ceche.net/extended-insights

**What it does**: Deep-dive intelligence for serious buyers

**Features**:
- Full DNS record history
- USPTO/WIPO trademark database search
- WHOIS history (previous owners, registration changes)
- Historical spam/blacklist records
- Backlink toxicity analysis

### 5. Bulk Domain Audit (PREMIUM ONLY)

**URL**: app.ceche.net/bulk-audit

**What it does**: Analyze up to 1000 domains at once

**Features**:
- CSV upload
- Batch appraisal scores
- Availability check across all domains
- Export results

---

## Reveal Mechanics

### Standard Marketplace

**What the user sees**: Premium domain listings with full stats but NO name hint at all.

**Display per listing**:
```
Estimated Value: $15,200
Health Score: 85/100
CPC: $8.50
Domain Authority: 45
Brandability: 78/100
TLD: .com
Category: Tech / Cloud Infrastructure
Keyword Intent: High commercial intent
```

**No name, no partial hint, no asterisks.** Just the intelligence.

**Pricing**: Pay to reveal the full name. Price varies by domain value.

### Try Your Luck (with TLD selection)

**What happens**:
```
1. User selects a TLD (.com, .net, .io, or .co)
2. User pays the TLD-specific price
3. Three closed boxes appear (spinning animation)
4. Animation stops → user picks one box
5. Domain name revealed → prompt to buy immediately
6. Domain is LOCKED — no other user can purchase it through any means on the platform
```

**Pricing by TLD**:

| TLD | Price |
|-----|-------|
| .com | $79 |
| .net | $39 |
| .io | $29 |
| .co | $9 |

**Each box contains a unique domain.** The other two boxes are discarded — those domains are not available to any other user on the platform through any means.

### Try Your Luck (no TLD selection — flat rate)

**What happens**: Same as above, but user doesn't pick a TLD. Flat $19.

```
1. User pays $19
2. Three closed boxes appear (random TLDs)
3. Animation stops → user picks one box
4. Domain name revealed → prompt to buy immediately
5. Domain LOCKED
```

**Pricing**: Flat $19 regardless of TLD.

---

## Marketplace

### Seller Listings

Anyone can list their premium domain names on Ceche.

**Listing Flow**:
```
1. Seller signs up / logs in (app.ceche.net)
2. Goes to /marketplace/sell
3. Enters domain name
4. Ceche appraises it (16 dimensions)
5. Seller sets price (or uses Ceche's suggested price)
6. Seller pays listing fee
7. Domain listed on /marketplace (name HIDDEN — no hint at all)
8. Buyer pays reveal fee → gets name + seller contact
9. Buyer and seller complete transaction off-platform
10. Ceche takes commission
```

### Listing Fees

| Listing Type | Fee | Notes |
|-------------|-----|-------|
| **Standard** | $5 | Standard placement in browse/search |
| **Priority** | $10 | Top placement, highlighted, "Priority" badge |

### Commission on Sale

| Sale Price | Commission Rate | Minimum Commission |
|-----------|----------------|-------------------|
| $0 - $500 | 15% | $10 |
| $501 - $5,000 | 12% | $50 |
| $5,001 - $50,000 | 10% | $500 |
| $50,001+ | 8% | $4,000 |

### Marketplace Listing Display

Each listing shows (name HIDDEN — no hint at all):
- Estimated value (Ceche appraisal)
- Seller's asking price
- Health score
- TLD
- Category (keyword, brandable, short, etc.)
- CPC tier
- Brandability rating
- Listing age
- "Reveal Name" button

---

## Revenue Model

### Revenue Streams

| Stream | Description | Estimated % of Revenue |
|--------|-------------|----------------------|
| **Reveal Fees** | Standard marketplace + Try Your Luck | 40% |
| **Subscriptions** | Premium Startup + Enterprise plans | 30% |
| **Marketplace Commission** | 8-15% on seller domain sales | 20% |
| **Listing Fees** | $5-$15 per seller listing | 10% |

### Subscription Tiers

| Tier | Price | Appraisals/Day | Tools | Target |
|------|-------|----------------|-------|--------|
| **Free (unsigned)** | $0 | 3 | Name search only | Traffic |
| **Free (signed up)** | $0 | 12 | Name search + basic appraisal | Casual users |
| **Premium Startup** | $79/mo | 30 | Scanner, Extended Insights, Bulk Audit | Small teams |
| **Premium Enterprise** | $129/mo | Unlimited | All tools, API access, priority support | Professionals |

### Revenue Projections (Conservative)

| Month | Users | Reveals | Subscribers | Revenue |
|-------|-------|---------|-------------|---------|
| 1 | 1,000 | 200 | 10 | $3,500 |
| 3 | 5,000 | 1,000 | 50 | $15,000 |
| 6 | 15,000 | 3,000 | 150 | $45,000 |
| 12 | 50,000 | 10,000 | 500 | $150,000 |

---

## Admin Panel

### Dashboard (`/admin`)

**Stats cards**:
- Total searches (all-time)
- Total reveals (today / all-time)
- Total revenue (today / all-time)
- Active subscribers
- Marketplace listings
- Premium domains in pipeline

### Discoveries (`/admin/discoveries`)

- Domain (full view for admins)
- Premium score
- Estimated value
- TLD
- Status: discovered / approved / listed / revealed / expired
- Actions: approve, reject, list, feature, delete

### Marketplace (`/admin/marketplace`)

- Domain
- Seller
- Asking price
- Ceche estimated value
- Listing type (standard/priority)
- Status: pending / active / sold / expired
- Commission earned

### Premium Scanner (`/admin/scanner`)

- Scanner running/stopped
- Last run: timestamp, domains checked, premium found
- TLDs to scan
- Minimum premium score threshold

### Users (`/admin/users`)

- User list with email, role, subscription tier
- Actions: edit role, suspend, delete

### Revenue (`/admin/revenue`)

- Revenue by stream (reveals, subscriptions, commissions, listings)
- Revenue by period (today, week, month, year)
- Transaction log

---

## Technical Architecture

### Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) | SSR for SEO, React ecosystem, fast builds |
| **Styling** | Tailwind CSS v4 | Design system, utility classes |
| **Backend** | Go (net/http + chi router) | Compiled binary, goroutines, fast cold starts |
| **Database** | PostgreSQL 16 | Full-text search, JSONB, mature |
| **Cache** | In-memory (bigcache) | Fast, no external dependency |
| **Payments** | Paystack (primary) | Handles subscriptions + one-time |
| **Auth** | JWT (Go) + Next.js middleware | Stateless, fast, secure |
| **Encryption** | AES-256-GCM | Domain names encrypted at rest |

### Subdomain Architecture

| Subdomain | Purpose | Stack |
|-----------|---------|-------|
| `www.ceche.net` | Public marketing, name search, marketplace browse | Next.js (port 4321) |
| `app.ceche.net` | Authenticated app: appraisal, scanner, insights | Next.js (port 4321, different layout) |
| `ceche.net` | 301 redirect → `www.ceche.net` | Nginx |

### Go Backend Structure

```
ceche-api/
├── cmd/server/main.go
├── internal/
│   ├── config/config.go
│   ├── api/
│   │   ├── v1/router.go
│   │   ├── v1/auth.go
│   │   ├── v1/appraise.go
│   │   ├── v1/scan.go
│   │   ├── v1/lock.go
│   │   ├── v1/reveal.go
│   │   ├── v1/webhook.go
│   │   └── v1/subscription.go
│   ├── middleware/
│   │   ├── auth.go
│   │   ├── cors.go
│   │   ├── logging.go
│   │   └── ratelimit.go
│   ├── service/
│   │   ├── appraiser.go          # 16-dimension engine
│   │   ├── encryption.go         # AES-256-GCM
│   │   ├── rdap.go               # Domain availability
│   │   ├── lock.go               # Domain reservation
│   │   ├── reveal.go             # Reveal logic
│   │   └── subscription.go       # Subscription management
│   ├── scanner/
│   │   ├── scanner.go            # Goroutine pool scanner
│   │   └── words.go              # Word lists
│   ├── cache/
│   │   └── cache.go              # bigcache wrapper
│   ├── worker/
│   │   └── lock_expiry.go        # Background lock cleanup
│   └── database/
│       └── postgres.go           # Connection pool
├── migrations/
│   ├── 001_initial.up.sql
│   ├── 002_appraisals.up.sql
│   ├── 003_scans.up.sql
│   └── 004_locks_reveals.up.sql
└── go.mod
```

---

## Database Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    subscription_tier TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'inactive',
    paystack_customer_id TEXT,
    paystack_subscription_id TEXT,
    reveals_remaining INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- API keys
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    permissions JSONB DEFAULT '["appraise","scan","reveal"]',
    rate_limit INTEGER DEFAULT 1000,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ
);

-- Appraisals
CREATE TABLE appraisals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    domain TEXT NOT NULL,
    tld TEXT NOT NULL,
    score INTEGER,
    metrics JSONB,
    idempotency_key TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scans
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    word_list_name TEXT,
    tlds TEXT[],
    status TEXT DEFAULT 'pending',
    total_domains INTEGER,
    scanned_domains INTEGER,
    available_domains INTEGER,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

CREATE TABLE scan_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
    domain TEXT NOT NULL,
    tld TEXT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT false,
    price DECIMAL(10,2),
    registrar TEXT,
    expiry_date TIMESTAMPTZ,
    checked_at TIMESTAMPTZ DEFAULT NOW(),
    error TEXT
);

-- Word lists
CREATE TABLE word_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name TEXT NOT NULL,
    words TEXT[] NOT NULL,
    word_count INTEGER NOT NULL,
    source TEXT DEFAULT 'custom',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Domain locks (reservation during checkout)
CREATE TABLE domain_locks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    domain_hash TEXT NOT NULL,
    listing_id UUID,
    locked_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'active'
);

CREATE UNIQUE INDEX idx_domain_locks_active ON domain_locks (domain_hash) WHERE status = 'active';

-- Reveals
CREATE TABLE reveals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    domain_hash TEXT NOT NULL,
    reveal_type TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    paystack_ref TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    plan TEXT NOT NULL,
    paystack_sub_id TEXT,
    status TEXT DEFAULT 'active',
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace listings
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(id),
    domain_encrypted TEXT NOT NULL,
    domain_hash TEXT NOT NULL,
    tld TEXT NOT NULL,
    asking_price NUMERIC(15,2) NOT NULL,
    estimated_value NUMERIC(15,2),
    modules JSONB,
    listing_type TEXT DEFAULT 'standard',
    listing_fee NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    sold_price NUMERIC(15,2),
    commission NUMERIC(10,2),
    priority BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,
    resource TEXT,
    resource_id TEXT,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings
CREATE TABLE settings (
    key_name TEXT PRIMARY KEY,
    value TEXT,
    description TEXT
);
```

---

## API Endpoints

### Public API (www.ceche.net)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Server health check |
| `POST` | `/api/v1/search` | Name search — check domain availability |
| `POST` | `/api/v1/appraise` | Domain appraisal (rate-limited) |
| `GET` | `/api/v1/marketplace` | Browse standard marketplace (names hidden) |
| `GET` | `/api/v1/marketplace/:id` | Listing details (name hidden) |
| `POST` | `/api/v1/marketplace/list` | Submit domain for listing |

### Auth API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/auth/register` | Create account |
| `POST` | `/api/v1/auth/login` | Login (returns JWT + refresh token) |
| `POST` | `/api/v1/auth/refresh` | Refresh JWT |

### User API (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/users/me` | Get profile |
| `PUT` | `/api/v1/users/me` | Update profile |
| `POST` | `/api/v1/api-keys` | Create API key |
| `GET` | `/api/v1/api-keys` | List API keys |
| `DELETE` | `/api/v1/api-keys/:id` | Delete API key |

### Appraisal API (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/appraise` | Appraise a domain |
| `GET` | `/api/v1/appraisals` | List user's appraisals |
| `GET` | `/api/v1/appraisals/:id` | Get single appraisal |

### Scanner API (premium only)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/scans` | Create a new scan |
| `GET` | `/api/v1/scans` | List user's scans |
| `GET` | `/api/v1/scans/:id` | Get scan details + results |
| `GET` | `/api/v1/scans/:id/export` | Export scan results as CSV |
| `GET` | `/api/v1/word-lists` | List word lists |
| `POST` | `/api/v1/word-lists` | Create custom word list |
| `DELETE` | `/api/v1/word-lists/:id` | Delete word list |

### Lock & Reveal API (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/locks` | Acquire 5-min domain lock |
| `DELETE` | `/api/v1/locks/:id` | Release a lock |
| `POST` | `/api/v1/reveals` | Initialize reveal payment |
| `GET` | `/api/v1/reveals/:id` | Get reveal result |

### Subscription API (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/subscriptions` | Create subscription |
| `GET` | `/api/v1/subscriptions` | Get subscription status |
| `DELETE` | `/api/v1/subscriptions` | Cancel subscription |

### Webhook API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/webhooks/paystack` | Paystack payment webhook (HMAC verified) |

### Admin API (admin role required)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/admin/api/stats` | Dashboard statistics |
| `GET` | `/admin/api/discoveries` | List all discoveries |
| `PUT` | `/admin/api/discoveries/:id` | Update discovery status |
| `GET` | `/admin/api/marketplace` | List all marketplace listings |
| `PUT` | `/admin/api/marketplace/:id` | Update listing status |
| `GET` | `/admin/api/users` | List users |
| `PUT` | `/admin/api/users/:id` | Update user |
| `GET` | `/admin/api/revenue` | Revenue report |

---

## Deployment

### Server

- **IP**: 77.67.23.30 (Ubuntu 22.04)
- **Domain**: ceche.net (DNS live)
- **Backend**: Go on port 8080
- **Frontend**: Next.js on port 4321
- **Database**: PostgreSQL 16 on port 5432

### Nginx Config

```nginx
# ceche.net → 301 redirect to www.ceche.net
server {
    listen 80;
    server_name ceche.net;
    return 301 https://www.ceche.net$request_uri;
}

# www.ceche.net — public marketing + name search
server {
    listen 443 ssl;
    server_name www.ceche.net;

    location / {
        proxy_pass http://localhost:4321;
    }

    location /api/ {
        proxy_pass http://localhost:8080;
    }
}

# app.ceche.net — authenticated app
server {
    listen 443 ssl;
    server_name app.ceche.net;

    location / {
        proxy_pass http://localhost:4321;
    }

    location /api/ {
        proxy_pass http://localhost:8080;
    }
}
```

---

## Milestones

### Phase 0: Foundation ✅
- Go project setup (chi router, PostgreSQL, config)
- PostgreSQL schema
- Auth system (JWT, signup/login/logout)
- Basic API server with health check
- Next.js project setup

### Phase 1: Auth & Users ✅
- JWT authentication
- User profiles
- API key management
- Rate limiting

### Phase 2: 16-Dimension Scoring ✅
- Core appraisal engine (16 modules)
- AES-256-GCM encryption
- bigcache caching
- Free/premium gating
- Frontend appraisal page

### Phase 3: Domain Scanner Engine ✅
- Goroutine pool scanner (50 workers)
- DNS lookup
- Batch processing
- Word lists (4 built-in)
- Scan API + frontend

### Phase 4: Lock-and-Reserve System (NEXT)
- RDAP client for real-time availability
- Domain lock (5-min TTL checkout reservation)
- Lock expiry goroutine (30s cleanup)
- Registration handoff (Dynadot, Namecheap, Porkbun)
- Reveal payment flow

### Phase 5: Payment Integration
- Paystack integration (subscriptions + one-time)
- Subscription management (Startup $79, Enterprise $129)
- Reveal credits
- Webhook handling (HMAC-SHA512)

### Phase 6: Name Search Tool
- Homepage search bar → availability results
- WHOIS details (if taken)
- Premium/mid/low label (if available)
- "What you can build" suggestions
- CTA to appraisal

### Phase 7: Standard Marketplace
- Blind listing browse (no name hint)
- Reveal flow (pay to see name)
- Seller listing CRUD
- Listing fees ($5-$15)
- Commission tracking (8-15%)

### Phase 8: Try Your Luck
- TLD selection UI
- Spin animation (3 boxes)
- Domain lock on reveal
- TLD-specific pricing (.com $79, .net $39, .io $29, .co $9)
- Flat-rate option ($19)

### Phase 9: Email & Notifications
- Brevo integration
- Reveal confirmation emails
- Subscription receipts
- Weekly digest

### Phase 10: SEO & Sitemap
- Dynamic sitemap
- Structured data (JSON-LD)
- Meta tags
- Open Graph

### Phase 11: i18n (9 locales)
- en, fr, de, es, pt, ko, zh, ja, it
- next-intl integration
- localePrefix: "as-needed"

### Phase 12: Polish & Launch
- Performance testing
- Security audit
- Docker setup
- Nginx config
- Launch
