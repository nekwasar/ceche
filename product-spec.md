# Ceche — Product Specification

> Domain name discovery, intelligence, and marketplace platform.
> Find premium available domains before anyone else. See why they're valuable. Buy the name.

---

## Table of Contents

1. [Vision](#vision)
2. [How It Works](#how-it-works)
3. [Product Pages](#product-pages)
4. [Reveal Mechanics](#reveal-mechanics)
5. [Marketplace](#marketplace)
6. [Free Tools](#free-tools)
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

Ceche is a domain name discovery and marketplace platform. It finds premium available (unregistered) domain names, shows you their full intelligence profile — appraisal value, health score, keyword data, CPC, authority, brandability — and sells you the name.

### What Ceche Is NOT

- Not a registrar (doesn't sell domain registrations)
- Not an appraisal-only tool (appraisal is part of the intelligence layer)
- Not a data competitor (can't beat Sedo/GoDaddy on sales history)
- Not a name seller (Ceche finds names, users register them elsewhere)

### Core Strength

Technical efficiency. Ceche uses algorithms to FIND premium domains, ANALYZE them with 15 AI-powered modules, and PRESENT them in a way that proves value before revealing the name.

### Tagline

**"Know what's available. Know what it's worth. Own it first."**

---

## How It Works

### The Discovery Flow

```
1. Ceche engine finds "cloudops.com" (available, premium score: 92)
2. Domain name is HIDDEN — user sees: "c*****m.com"
3. User sees full stats:
   - Estimated value: $15,200
   - Health score: 85/100
   - CPC: $8.50
   - Domain authority: 45
   - Brandability: 78/100
   - TLD score: 10/10 (.com)
   - Keyword: "cloud ops" (high commercial intent)
4. User pays $10 to reveal → gets "cloudops.com"
5. User goes to GoDaddy/Namecheap to register it
```

### The Guarantee

**All names listed on Ceche are premium.** Every single domain discovered by the engine meets the premium threshold. No filler. No junk.

---

## Product Pages

### Public Pages

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Hero: "Find Premium Domains Before Anyone Else." Search bar, featured discoveries, stats. |
| **Discover** | `/discover` | Browse Ceche's found premium domains. Filters: TLD, value range, score, category. Names hidden. |
| **Marketplace** | `/marketplace` | Browse seller-listed premium domains. Filter by TLD, price, category. Names hidden. |
| **Health Check** | `/health` | Free tool. Enter any domain → instant DNS, SSL, speed, authority report. |
| **Appraise** | `/appraise` | Free basic / paid full domain appraisal. 15-module analysis. |
| **Pricing** | `/pricing` | Subscription tiers + reveal pricing. |
| **Blog** | `/blog` | Content marketing: "How to find premium domains", domain investing guides. |
| **FAQ** | `/faq` | Common questions about Ceche, reveals, marketplace. |
| **Enterprise** | `/enterprise` | API access, bulk analysis, white-label options. |
| **Terms** | `/terms` | Terms of service. |
| **Privacy** | `/privacy` | Privacy policy. |
| **Contact** | `/contact` | Contact form + info. |

### Auth Pages

| Page | URL | Description |
|------|-----|-------------|
| **Sign Up** | `/auth/signup` | Create account. Required for reveals + marketplace. |
| **Login** | `/auth/login` | Email/password login. |
| **Dashboard** | `/dashboard` | User dashboard: reveal history, saved domains, subscription status. |

### Admin Pages

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/admin` | Stats: total discoveries, reveals, revenue, active users. |
| **Discoveries** | `/admin/discoveries` | Manage found premium domains. Approve/reject/list. |
| **Marketplace** | `/admin/marketplace` | Manage seller listings. Approve/reject/feature. |
| **Premium Scanner** | `/admin/scanner` | Scanner status, run history, configuration. |
| **Users** | `/admin/users` | User management. |
| **Revenue** | `/admin/revenue` | Revenue tracking: reveals, commissions, subscriptions. |
| **Blog** | `/admin/blog` | Blog post management. |
| **Settings** | `/admin/settings` | System settings. |

---

## Reveal Mechanics

### Partial Reveal (Standard)

**What the user sees**: Domain name with middle characters hidden.

**Format**: `{first_char}*****{last_char}.{tld}`

**Examples**:
| Actual Domain | Partial Reveal |
|--------------|----------------|
| `cloudops.com` | `c*****m.com` |
| `dataflow.io` | `d*****o.io` |
| `quickship.net` | `q*****p.net` |
| `zenstudio.app` | `z*****o.app` |
| `apicraft.dev` | `a*****t.dev` |

**Rules**:
- First character is always visible
- Last character before TLD is always visible
- TLD is always visible
- Middle characters replaced with `*`
- Minimum 3 characters (e.g., `a*e.com` for a 3-char domain)

**Pricing**: $10 per reveal (configurable per subscription tier)

### Try Your Luck Reveal (Budget)

**What the user sees**: NO domain name. Only brief stats.

**Display**:
```
????.tld
- Premium Score: 87/100
- Estimated Value: $5,000 - $12,000
- TLD: .com
- Length: 8 characters
- Type: Keyword domain
```

**No name hint at all.** Just enough info to know it's premium.

**Pricing**: $3 per reveal (configurable)

### Reveal Flow

```
1. User browses /discover
2. Clicks "Reveal" on a listing
3. Chooses: Partial Reveal ($10) or Try Your Luck ($3)
4. Payment via Stripe
5. On success:
   - Partial: shows "c*****m.com" → user can then pay full price to see complete name
   - Try Your Luck: shows ????.tld → user can upgrade to partial or full reveal
6. Full reveal (additional $5): shows complete domain name
7. User receives email with the revealed domain name
```

### Reveal Pricing Tiers

| Tier | Partial Reveal | Try Your Luck | Full Reveal | Notes |
|------|---------------|---------------|-------------|-------|
| **Free** | N/A | N/A | N/A | Can browse, can't reveal |
| **Starter** | $10 | $3 | $5 | Pay-per-reveal |
| **Pro** | $7 | $2 | $3 | Monthly subscription ($49/mo, 20 reveals included) |
| **Enterprise** | $5 | $1 | $2 | Custom plan, unlimited reveals |

---

## Marketplace

### How It Works

Anyone can list their premium domain names on Ceche. Ceche provides the intelligence layer (appraisal, health check, stats) and the marketplace (buyer discovery, trust, payments).

### Listing Flow

```
1. Seller signs up / logs in
2. Goes to /marketplace/sell
3. Enters domain name
4. Ceche automatically appraises it (15 modules)
5. Seller sets price (or uses Ceche's suggested price)
6. Seller pays listing fee
7. Domain listed on /marketplace (name HIDDEN until buyer reveals)
8. Buyer pays to reveal → gets name + seller contact
9. Buyer and seller complete transaction off-platform OR through Ceche
10. Ceche takes commission
```

### Listing Fees

| Listing Type | Fee | Duration | Visibility |
|-------------|-----|----------|-----------|
| **Standard** | $5 | 90 days | Standard listing in browse/search |
| **Featured** | $15 | 90 days | Top of category, highlighted badge |
| **Premium** | $25 | 180 days | Homepage rotation, email blast, featured |

### Commission Structure

| Sale Price | Commission Rate | Minimum |
|-----------|----------------|---------|
| $0 - $500 | 15% | $10 |
| $501 - $5,000 | 12% | $50 |
| $5,001 - $50,000 | 10% | $500 |
| $50,001+ | 8% | $4,000 |

### Marketplace Listing Display

Each listing shows (name HIDDEN):
- Partial reveal: `c*****m.com`
- Estimated value (Ceche appraisal)
- Seller's asking price
- Health score
- TLD score
- Category (keyword, brandable, short, etc.)
- Listing age
- "Reveal Name" button

---

## Free Tools

### Domain Health Check

**URL**: `/health`

**What it does**: Enter any domain → instant health report.

**Checks performed** (all in parallel, <5s):
| Check | What It Tests | Display |
|-------|--------------|---------|
| **DNS** | A, AAAA, MX, NS, TXT records | Record list, resolver status |
| **SSL** | TLS certificate validity, issuer, expiry | Valid/Invalid, issuer, days until expiry |
| **Speed** | Time to first byte (TTFB) | ms rating (fast/medium/slow) |
| **Page Size** | Content-Length header | KB/MB |
| **Parked** | Content analysis for parked pages | Parked/Active/Unknown |
| **Authority** | Ahrefs DR + Open PageRank | Score 0-100 |
| **Backlinks** | Total backlink count | Number |
| **Value** | Quick appraisal estimate | Dollar range |

**SEO benefits**:
- Unique URL per check: `/health/example.com`
- Structured data (JSON-LD) for rich snippets
- No login required
- Generates shareable reports

### Basic Appraisal

**URL**: `/appraise`

**What it does**: Enter any domain → free basic appraisal (3 modules: TLD, length, pronounceability).

**Upgrade path**: "Get full 15-module analysis → Sign up for Pro"

### Blog

**URL**: `/blog`

**Content strategy**:
- "How to Find Premium Domains" — beginner guide
- "Domain Investing 101" — getting started
- "Why Ceche's Appraisal Differs from GoDaddy" — differentiation
- "Bulk Domain Valuation: How to Price 100 Domains" — power user guide
- "What Makes a Domain Premium?" — educational

---

## Revenue Model

### Revenue Streams

| Stream | Description | Estimated % of Revenue |
|--------|-------------|----------------------|
| **Reveal Fees** | Users pay to reveal domain names | 40% |
| **Subscriptions** | Monthly Pro/Enterprise plans | 30% |
| **Marketplace Commission** | % of domain sales through marketplace | 20% |
| **Listing Fees** | Sellers pay to list domains | 10% |

### Subscription Tiers

| Tier | Price | Includes | Target |
|------|-------|----------|--------|
| **Free** | $0 | Browse, health check, basic appraisal | Everyone (traffic driver) |
| **Starter** | $29/mo | 5 reveals/mo, partial reveal, basic alerts | Hobbyists |
| **Pro** | $49/mo | 20 reveals/mo, all reveal types, alerts, bulk analysis | Active investors |
| **Enterprise** | $199/mo | Unlimited reveals, API access, white-label, priority support | Professionals |

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
- Total discoveries (all-time)
- Total reveals (today / all-time)
- Total revenue (today / all-time)
- Active subscribers
- Premium domains in pipeline
- Marketplace listings

**Recent activity feed**:
- New discoveries
- Recent reveals
- New marketplace listings
- Revenue transactions

### Discoveries (`/admin/discoveries`)

**List view**:
- Domain (hidden or full, depending on admin view)
- Premium score
- Estimated value
- TLD
- Status: discovered / approved / listed / revealed / expired
- Actions: approve, reject, list, feature, delete

**Filters**: status, TLD, value range, score range, date range

**Bulk actions**: approve selected, list selected, export CSV

### Premium Scanner (`/admin/scanner`)

**Status panel**:
- Scanner running/stopped
- Last run: timestamp, domains checked, premium found, errors
- Next scheduled run

**Configuration**:
- Scan interval (default: 6 hours)
- TLDs to scan
- Minimum premium score threshold
- API keys status (RDAP, Ahrefs, OPR)

**Run history**:
- Timestamp
- Duration
- Domains scanned
- Premium found
- Errors
- Action: run now

### Marketplace (`/admin/marketplace`)

**List view**:
- Domain
- Seller
- Asking price
- Ceche estimated value
- Listing type (standard/featured/premium)
- Status: pending / active / sold / expired
- Commission earned

**Actions**: approve, reject, feature, remove

### Revenue (`/admin/revenue`)

**Summary**:
- Revenue by stream (reveals, subscriptions, commissions, listings)
- Revenue by period (today, week, month, year)
- Average reveal value
- Average commission per sale

**Transaction log**:
- Date, type, amount, user, domain, status

### Users (`/admin/users`)

- User list with email, role, subscription tier, reveal count
- Actions: edit role, suspend, delete

---

## Technical Architecture

### Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) | SSR for SEO, React ecosystem, fast builds, great DX |
| **Styling** | Tailwind CSS + shadcn/ui | Consistent design system, accessible components |
| **Backend** | Go (net/http + chi router) | Compiled binary, goroutines for parallelism, fast cold starts |
| **Database** | PostgreSQL | Full-text search, JSONB for flexible data, mature |
| **Cache** | In-memory LRU (bigcache) | Fast, no external dependency |
| **Payments** | Stripe | Industry standard, handles subscriptions + one-time |
| **Auth** | JWT (Go) + Next.js middleware | Stateless, fast, secure |
| **Analytics** | Plausible (self-hosted) | Privacy-focused, cookie-free |

### Go Backend Structure

```
ceche-api/
├── cmd/ceche/main.go
├── internal/
│   ├── config/config.go
│   ├── engine/              # 15-module appraisal engine
│   │   ├── engine.go
│   │   ├── models.go
│   │   ├── m01_rdap.go
│   │   ├── m02_tld.go
│   │   ├── m03_length.go
│   │   ├── m04_wordcount.go
│   │   ├── m05_pronounce.go
│   │   ├── m06_segmenter.go
│   │   ├── m07_keyword.go
│   │   ├── m08_cpc.go
│   │   ├── m09_search.go
│   │   ├── m10_crosstld.go
│   │   ├── m11_trademark.go
│   │   ├── m12_authority.go
│   │   ├── m13_confidence.go
│   │   ├── m15_pricing.go
│   │   └── m16_brandability.go
│   ├── discovery/           # Premium domain finder
│   │   ├── scanner.go
│   │   ├── scorer.go
│   │   └── models.go
│   ├── health/              # Domain health checker
│   │   ├── checker.go
│   │   ├── dns.go
│   │   ├── ssl.go
│   │   └── models.go
│   ├── marketplace/         # Seller listings + transactions
│   │   ├── listings.go
│   │   ├── transactions.go
│   │   └── models.go
│   ├── reveal/              # Pay-to-reveal logic
│   │   ├── reveal.go
│   │   ├── stripe.go
│   │   └── models.go
│   ├── api/                 # HTTP handlers
│   │   ├── router.go
│   │   ├── auth.go
│   │   ├── discovery.go
│   │   ├── health.go
│   │   ├── marketplace.go
│   │   ├── reveal.go
│   │   ├── appraisal.go
│   │   ├── admin.go
│   │   └── cms.go
│   ├── store/               # PostgreSQL queries
│   │   ├── db.go
│   │   ├── discoveries.go
│   │   ├── listings.go
│   │   ├── reveals.go
│   │   ├── users.go
│   │   └── cms.go
│   ├── adapters/            # External API clients
│   │   ├── rdap.go
│   │   ├── wayback.go
│   │   ├── ahrefs.go
│   │   ├── opr.go
│   │   ├── google_cse.go
│   │   ├── brave.go
│   │   └── ai.go
│   └── cache/cache.go
├── data/
│   ├── tld_scores.json
│   ├── cpc_keywords.json
│   └── wordlist.txt
├── migrations/
│   ├── 001_initial.up.sql
│   └── 001_initial.down.sql
├── go.mod
├── go.sum
├── Dockerfile
└── README.md
```

### Next.js Frontend Structure

```
ceche-web/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── layout.tsx          # Root layout (nav, footer, theme)
│   │   ├── page.tsx            # Home
│   │   ├── discover/
│   │   │   └── page.tsx        # Browse premium domains
│   │   ├── marketplace/
│   │   │   ├── page.tsx        # Browse seller listings
│   │   │   └── sell/
│   │   │       └── page.tsx    # List a domain for sale
│   │   ├── health/
│   │   │   ├── page.tsx        # Health check tool
│   │   │   └── [domain]/
│   │   │       └── page.tsx    # Domain health report
│   │   ├── appraise/
│   │   │   ├── page.tsx        # Appraisal tool
│   │   │   └── [domain]/
│   │   │       └── page.tsx    # Domain appraisal report
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx        # User dashboard
│   │   ├── pricing/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── faq/page.tsx
│   │   ├── enterprise/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── DomainCard.tsx      # Domain listing card (name hidden)
│   │   ├── RevealModal.tsx     # Partial + Try Your Luck reveal
│   │   ├── HealthCheck.tsx     # Health check results
│   │   ├── AppraisalResult.tsx # Full appraisal display
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── api.ts              # API client (Go backend)
│   │   ├── auth.ts             # Auth helpers
│   │   └── stripe.ts           # Stripe integration
│   └── styles/
│       └── globals.css
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── Dockerfile
```

### Engine Execution (Go)

**Target**: Full 15-module appraisal in < 20 seconds.

**Strategy**: Run ALL I/O modules in parallel via goroutines.

```
┌─ Group 1 (goroutines) ─────────────────────┐
│  M1 (RDAP)     │  M2 (TLD)  │  M6 (Segment) │
└────────────────┴────────────┴───────────────┘
                    ↓ (M6 output needed)
┌─ Group 2 (sequential, <1ms each) ──────────┐
│  M3 (Length) → M4 (WordCount) → M5 (Pron)  │
└─────────────────────────────────────────────┘
                    ↓
┌─ Group 3 (ALL goroutines) ─────────────────┐
│  M7 (Keyword) │ M8 (CPC) │ M9 (Search)     │
│  M10 (TLD)    │ M11 (TM) │ M12 (Authority) │
└─────────────────────────────────────────────┘
                    ↓
┌─ Group 4 (goroutine, brandable only) ──────┐
│  M16 (Brandability)                         │
└─────────────────────────────────────────────┘
                    ↓
┌─ Group 5 (sequential, <1ms each) ──────────┐
│  M13 (Confidence) → M15 (Pricing)           │
└─────────────────────────────────────────────┘
```

**Estimated time**:
- Group 1: ~3s (RDAP is bottleneck, cached after first call)
- Group 2: <1ms (pure math)
- Group 3: ~5s (Ahrefs/OPR are bottlenecks)
- Group 4: ~1ms (pure computation, optional AI)
- Group 5: <1ms (pure math)
- **Total: ~8-12s** (well under 20s target)

---

## Database Schema

```sql
-- Premium domain discoveries (Ceche finds these)
CREATE TABLE discoveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL UNIQUE,
    tld TEXT NOT NULL,
    sld TEXT NOT NULL,
    premium_score NUMERIC(3,0) NOT NULL,       -- 0-100
    estimated_value NUMERIC(15,2),
    range_low NUMERIC(15,2),
    range_high NUMERIC(15,2),
    modules JSONB NOT NULL,                     -- full appraisal breakdown
    category TEXT,                              -- keyword/brandable/short/mixed
    word_count INTEGER,
    length INTEGER,
    tld_score NUMERIC(3,1),
    cpc_tier TEXT,                              -- elite/high/medium/low
    authority_score NUMERIC(3,2),
    is_available BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'discovered',           -- discovered/approved/listed/revealed/expired
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_discoveries_status ON discoveries(status);
CREATE INDEX idx_discoveries_score ON discoveries(premium_score DESC);
CREATE INDEX idx_discoveries_value ON discoveries(estimated_value DESC NULLS LAST);
CREATE INDEX idx_discoveries_tld ON discoveries(tld);
CREATE INDEX idx_discoveries_category ON discoveries(category);

-- Marketplace listings (sellers list their domains)
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(id),
    domain TEXT NOT NULL,
    tld TEXT NOT NULL,
    asking_price NUMERIC(15,2) NOT NULL,
    estimated_value NUMERIC(15,2),              -- Ceche appraisal
    modules JSONB,                              -- appraisal breakdown
    listing_type TEXT DEFAULT 'standard',       -- standard/featured/premium
    listing_fee NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',              -- pending/active/sold/expired/removed
    sold_price NUMERIC(15,2),
    commission NUMERIC(10,2),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_seller ON listings(seller_id);
CREATE INDEX idx_listings_price ON listings(asking_price);

-- Reveal transactions
CREATE TABLE reveals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    discovery_id UUID REFERENCES discoveries(id),
    listing_id UUID REFERENCES listings(id),
    reveal_type TEXT NOT NULL,                  -- partial/luck/full
    amount NUMERIC(10,2) NOT NULL,
    stripe_payment_id TEXT,
    revealed_domain TEXT,                       -- actual name (encrypted until reveal)
    status TEXT DEFAULT 'pending',              -- pending/completed/refunded
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reveals_user ON reveals(user_id);
CREATE INDEX idx_reveals_created ON reveals(created_at DESC);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',                   -- user/admin
    subscription_tier TEXT DEFAULT 'free',      -- free/starter/pro/enterprise
    subscription_status TEXT DEFAULT 'inactive',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    reveals_remaining INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- API keys
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    tier TEXT DEFAULT 'free',
    rate_limit INTEGER DEFAULT 60,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ items
CREATE TABLE faq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true
);

-- Pricing tiers
CREATE TABLE pricing_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price_label TEXT,
    price_subtext TEXT,
    features JSONB DEFAULT '[]',
    cta_label TEXT,
    cta_url TEXT,
    highlighted BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- Settings
CREATE TABLE settings (
    key_name TEXT PRIMARY KEY,
    value TEXT,
    description TEXT
);

-- Scanner run history
CREATE TABLE scanner_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    domains_scanned INTEGER DEFAULT 0,
    premium_found INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0
);
```

---

## API Endpoints

### Public API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/discover` | List premium discoveries (paginated, filtered) |
| `GET` | `/api/discover/:id` | Get discovery details (without name) |
| `POST` | `/api/reveal` | Reveal a domain name (payment required) |
| `GET` | `/api/marketplace` | List marketplace listings (paginated, filtered) |
| `GET` | `/api/marketplace/:id` | Get listing details (without name) |
| `POST` | `/api/marketplace/list` | Submit a domain for listing |
| `GET` | `/api/health/check?domain=X` | Domain health check |
| `POST` | `/api/appraise` | Domain appraisal |
| `GET` | `/api/blog` | List blog posts |
| `GET` | `/api/blog/:slug` | Get blog post |
| `GET` | `/api/faq` | List FAQ items |
| `GET` | `/api/pricing` | List pricing tiers |
| `GET` | `/api/features` | List enterprise features |
| `GET` | `/api/comparisons` | List competitor comparisons |
| `GET` | `/health` | Server health check |

### Auth API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/signup` | Create account |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/verify` | Verify token |
| `POST` | `/api/auth/forgot` | Password reset request |
| `POST` | `/api/auth/reset` | Password reset confirm |

### User API (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/user/dashboard` | User dashboard data |
| `GET` | `/api/user/reveals` | User's reveal history |
| `GET` | `/api/user/saved` | User's saved domains |
| `PUT` | `/api/user/profile` | Update profile |

### Admin API (admin role required)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/admin/api/stats` | Dashboard statistics |
| `GET` | `/admin/api/discoveries` | List all discoveries |
| `PUT` | `/admin/api/discoveries/:id` | Update discovery status |
| `DELETE` | `/admin/api/discoveries/:id` | Delete discovery |
| `POST` | `/admin/api/discoveries/bulk` | Bulk actions on discoveries |
| `GET` | `/admin/api/marketplace` | List all marketplace listings |
| `PUT` | `/admin/api/marketplace/:id` | Update listing status |
| `DELETE` | `/admin/api/marketplace/:id` | Remove listing |
| `GET` | `/admin/api/scanner` | Scanner status |
| `POST` | `/admin/api/scanner/run` | Trigger scanner run |
| `PUT` | `/admin/api/scanner/config` | Update scanner config |
| `GET` | `/admin/api/users` | List users |
| `PUT` | `/admin/api/users/:id` | Update user |
| `DELETE` | `/admin/api/users/:id` | Delete user |
| `GET` | `/admin/api/revenue` | Revenue report |
| `GET` | `/admin/api/revenue/transactions` | Transaction log |
| `GET` | `/admin/api/blog` | List blog posts |
| `POST` | `/admin/api/blog` | Create blog post |
| `PUT` | `/admin/api/blog/:id` | Update blog post |
| `DELETE` | `/admin/api/blog/:id` | Delete blog post |
| `GET/PUT` | `/admin/api/settings/:key` | Settings CRUD |
| `GET` | `/admin/api/faq` | List FAQ items |
| `POST/PUT/DELETE` | `/admin/api/faq/:id` | FAQ CRUD |

---

## Deployment

### Docker Compose

```yaml
version: "3.8"
services:
  ceche-api:
    build: ./ceche-api
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://ceche:secret@postgres:5432/ceche
      STRIPE_KEY: ${STRIPE_KEY}
      JWT_SECRET: ${JWT_SECRET}
    depends_on: [postgres]

  ceche-web:
    build: ./ceche-web
    ports: ["3000:3000"]
    environment:
      API_URL: http://ceche-api:8080
    depends_on: [ceche-api]

  postgres:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      POSTGRES_DB: ceche
      POSTGRES_USER: ceche
      POSTGRES_PASSWORD: secret

volumes:
  pgdata:
```

### Nginx

```nginx
server {
    listen 80;
    server_name ceche.net;

    # Frontend
    location / {
        proxy_pass http://ceche-web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # API
    location /api/ {
        proxy_pass http://ceche-api:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Admin API
    location /admin/api/ {
        proxy_pass http://ceche-api:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Milestones

### Phase 1: Foundation (Week 1-2)
- [ ] Go project setup (chi router, PostgreSQL, config)
- [ ] PostgreSQL schema (all tables)
- [ ] Auth system (JWT, signup/login/logout)
- [ ] Basic API server with health check
- [ ] Next.js project setup (App Router, Tailwind, shadcn/ui)

### Phase 2: Appraisal Engine (Week 2-4)
- [ ] Core modules: M1-M6, M15 (pricing)
- [ ] External adapters: RDAP, Wayback, Ahrefs, OPR, Google CSE, Brave
- [ ] Parallel execution (errgroup)
- [ ] In-memory cache (bigcache)
- [ ] API endpoint: POST /api/appraise

### Phase 3: Premium Discovery (Week 4-5)
- [ ] Domain scanner (find available premium domains)
- [ ] Premium scorer (score domains 0-100)
- [ ] Background goroutine (scheduled scans)
- [ ] Admin: scanner config + run history

### Phase 4: Reveal System (Week 5-6)
- [ ] Stripe integration (payments)
- [ ] Partial reveal mechanic
- [ ] Try Your Luck mechanic
- [ ] Full reveal flow
- [ ] Email notifications

### Phase 5: Marketplace (Week 6-7)
- [ ] Seller listings CRUD
- [ ] Listing fees (Stripe)
- [ ] Commission tracking
- [ ] Featured/premium placement

### Phase 6: Health Check (Week 7-8)
- [ ] DNS resolution (Go net package)
- [ ] SSL certificate check (crypto/tls)
- [ ] Page speed (HTTP HEAD request)
- [ ] Parked detection
- [ ] Authority lookup (Ahrefs, OPR)
- [ ] Public health check page

### Phase 7: Frontend (Week 8-10)
- [ ] Next.js pages (all routes)
- [ ] DomainCard component (name hidden)
- [ ] RevealModal component
- [ ] Health check UI
- [ ] Appraisal UI
- [ ] Dashboard UI
- [ ] Admin panel

### Phase 8: Polish + Launch (Week 10-12)
- [ ] Docker setup
- [ ] Nginx config
- [ ] Performance testing (< 20s appraisal)
- [ ] Security audit
- [ ] SEO optimization
- [ ] Content (blog posts, FAQ)
- [ ] Launch
