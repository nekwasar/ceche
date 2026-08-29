# Ceche — Site Architecture

> Complete sitemap, navigation structure, and page hierarchy.

---

## Navigation (Primary)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Logo    Platform ▾    Solutions ▾    Resources ▾    Pricing    [Lang]  │
│                                               Login    Get Started ▾  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Pattern**: Fat navigation (wide dropdowns) — best for medium-to-large B2B sites

**Order** (by engagement):
1. Platform (product)
2. Solutions (who we serve)
3. Resources (learn + support)
4. Pricing
5. Language switcher
6. Login
7. Get Started (CTA)

---

## Full Sitemap

```
/ (Homepage)
│
├── PLATFORM
│   ├── /platform                                  Overview — "What Ceche Does"
│   ├── /platform/domain-appraiser                 Domain Appraiser feature
│   ├── /platform/domain-scanner                   Domain Scanner feature
│   ├── /platform/domain-marketplace               Domain Marketplace feature
│   ├── /platform/intelligence-profile             Intelligence Profiles feature
│   ├── /platform/name-suggestions                 Name Suggestions feature
│   └── /platform/api                              API Access for developers
│
├── SOLUTIONS
│   ├── /solutions                                 Solutions Overview
│   │
│   ├── By Use Case
│   │   ├── /solutions/use-cases/find-available-domain-names
│   │   ├── /solutions/use-cases/research-domain-intelligence
│   │   ├── /solutions/use-cases/buy-premium-domains
│   │   ├── /solutions/use-cases/monitor-domain-expiration
│   │   ├── /solutions/use-cases/generate-brand-name-ideas
│   │   └── /solutions/use-cases/validate-domain-investment
│   │
│   └── By Industry
│       ├── /solutions/industries/startups
│       ├── /solutions/industries/agencies
│       ├── /solutions/industries/enterprises
│       ├── /solutions/industries/domain-investors
│       ├── /solutions/industries/brand-strategists
│       └── /solutions/industries/web-developers
│
├── RESOURCES
│   ├── /resources                                 Resources Overview
│   │
│   ├── Learn
│   │   ├── /resources/blog                        Blog
│   │   ├── /resources/blog/[slug]                 Blog Posts
│   │   ├── /resources/guides                      Guides
│   │   ├── /resources/guides/[slug]               Guide Posts
│   │   ├── /resources/customer-stories            Customer Stories
│   │   ├── /resources/customer-stories/[slug]     Story Detail
│   │   ├── /resources/ebooks                      Ebooks
│   │   ├── /resources/ebooks/[slug]               Ebook Detail
│   │   ├── /resources/changelog                   Changelog
│   │   ├── /resources/about                       About
│   │   └── /resources/company                     Company
│   │
│   └── Support
│       ├── /resources/help-center                 Help Center
│       ├── /resources/help-center/[slug]          Help Articles
│       ├── /resources/contact                     Contact
│       ├── /resources/affiliate                   Affiliate Program
│       ├── /resources/partner                     Partner Program
│       └── /resources/community                   Community
│
├── PRICING
│   └── /pricing                                   Pricing with tier comparison
│
├── LEGAL
│   ├── /legal/terms                               Terms of Use/Service/Purchase
│   ├── /legal/privacy                             Privacy Policy
│   ├── /legal/cookies                             Cookie Policy
│   ├── /legal/data                                Data Policy
│   └── /legal/dpa                                 Data Processing Agreement
│
├── COMPANY
│   ├── /company/news                              News
│   ├── /company/about                             About
│   └── /company/careers                           Careers
│
├── AUTH
│   ├── /login                                     Login
│   ├── /signup                                    Signup
│   └── /demo                                      Demo Request
│
├── SOCIALS (footer)
│   ├── https://x.com/nekwasar
│   ├── https://linkedin.com/company/nekwasar
│   └── https://github.com/nekwasar
│
├── NEWSLETTER (footer signup)
│
└── LOCALE PAMES (localized versions of ALL above)
    ├── /en/...                                    English (default)
    ├── /fr/...                                    French
    ├── /de/...                                    German
    ├── /es/...                                    Spanish
    └── /pt/...                                    Portuguese
```

---

## Page Count

| Category | Pages | Localized (x5) |
|----------|-------|----------------|
| Platform | 7 | 35 |
| Solutions | 13 | 65 |
| Resources | 12 | 60 |
| Pricing | 1 | 5 |
| Legal | 5 | 25 |
| Company | 3 | 15 |
| Auth | 3 | 15 |
| Homepage | 1 | 5 |
| **Total** | **45** | **225** |

---

## URL Patterns

### Localized URLs
```
/en/platform
/fr/platform
/de/platform
/es/platform
/pt/platform
```

### Dynamic Routes
```
/resources/blog/[slug]
/resources/guides/[slug]
/resources/customer-stories/[slug]
/resources/ebooks/[slug]
/resources/help-center/[slug]
```

### API Routes (not localized)
```
/api/v1/auth/register
/api/v1/auth/login
/api/v1/appraise
/api/v1/scans
/api/v1/reveals
/api/v1/intelligence/:domain
/api/v1/suggestions
/api/v1/listings
/api/v1/webhooks/paystack
/health
```

---

## Navigation Dropdown Structure

### Platform Dropdown
```
┌─────────────────────────────────────────────────────┐
│  Platform                                           │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Domain Appraiser │  │ Domain Scanner   │        │
│  │ Score any domain │  │ Find available   │        │
│  └──────────────────┘  └──────────────────┘        │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Marketplace      │  │ Intelligence     │        │
│  │ Buy premium      │  │ Deep analysis    │        │
│  └──────────────────┘  └──────────────────┘        │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Name Suggestions │  │ API Access       │        │
│  │ Generate ideas   │  │ Build with us    │        │
│  └──────────────────┘  └──────────────────┘        │
└─────────────────────────────────────────────────────┘
```

### Solutions Dropdown
```
┌─────────────────────────────────────────────────────┐
│  Solutions                                          │
│                                                     │
│  By Use Case              By Industry               │
│  ─────────────            ──────────                │
│  Find Available Domains   Startups                  │
│  Research Intelligence    Agencies                  │
│  Buy Premium Domains      Enterprises               │
│  Monitor Expiration       Domain Investors          │
│  Generate Brand Ideas     Brand Strategists         │
│  Validate Investment      Web Developers            │
└─────────────────────────────────────────────────────┘
```

### Resources Dropdown
```
┌─────────────────────────────────────────────────────┐
│  Resources                                          │
│                                                     │
│  Learn                     Support                   │
│  ─────                     ───────                   │
│  Blog                      Help Center               │
│  Guides                    Contact                   │
│  Customer Stories          Affiliate                 │
│  Ebooks                    Partner                   │
│  Changelog                 Community                 │
│  About                                               │
│  Company                                             │
└─────────────────────────────────────────────────────┘
```

---

## Footer Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Ceche                Product           Resources        Company        │
│  Know what's          Platform          Blog             About          │
│  available.           Appraiser         Guides           News           │
│  Know what it's       Scanner           Help Center      Careers        │
│  worth.               Marketplace       Contact          Contact        │
│  Own it first.        Intelligence      Affiliate                       │
│                       Suggestions       Partner                          │
│                                         Community                       │
│                                                                         │
│  Legal                Socials           Newsletter                      │
│  Terms                X/Twitter         [Email] [Subscribe]             │
│  Privacy              LinkedIn                                           │
│  Cookies              GitHub                                              │
│  Data Policy                                                              │
│  DPA                                                                      │
│                                                                         │
│  © 2026 Ceche. All rights reserved.                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## i18n Locale Routing

- **Strategy**: Sub-path routing (`/en/platform`, `/fr/platform`)
- **Default Locale**: `en` (always prefixed for consistency)
- **Locale Detection**: Cookie → Accept-Language header → default
- **Language Switcher**: In top nav, dropdown with locale labels
- **SEO**: hreflang tags on every page, localized sitemaps

### Supported Locales
| Code | Label | Flag |
|------|-------|------|
| `en` | English | — |
| `fr` | Français | — |
| `de` | Deutsch | — |
| `es` | Español | — |
| `pt` | Português | — |
