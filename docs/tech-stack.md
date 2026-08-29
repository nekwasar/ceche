# Ceche — Tech Stack

> Technology decisions, rationale, and configuration.

---

## Summary

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Backend** | Go | 1.22+ | 69ms cold start, 60MB memory, goroutines for parallel scanning |
| **Database** | PostgreSQL | 16 | Full-text search, JSONB, mature, ACID |
| **Frontend** | Next.js | 15 (App Router) | SSR for SEO, React ecosystem, i18n support |
| **i18n** | next-intl | 3.x | App Router native, Server Components, 2KB bundle |
| **Styling** | Tailwind CSS | 4.x | Utility-first, consistent design system |
| **Components** | shadcn/ui | latest | Accessible, customizable, copy-paste components |
| **Payments** | Paystack | API v2 | Currently primary until Stripe account ready |
| **Email** | Brevo | API v3 | Transactional emails, good deliverability |
| **Auth** | JWT | HS256 | Stateless, fast, secure |
| **Password Hashing** | bcrypt | cost 12 | Industry standard, slow by design |
| **Encryption** | AES-256-GCM | — | Domain names encrypted at rest |
| **Cache** | bigcache | latest | In-memory LRU, no external dependency |
| **Migrations** | golang-migrate | latest | Simple, SQL-based migrations |
| **HTTP Router** | chi or Fiber | latest | Lightweight, fast, idiomatic Go |
| **Containerization** | Docker | latest | Consistent dev/prod environments |
| **Orchestration** | Docker Compose | latest | Simple multi-service setup |
| **Reverse Proxy** | Nginx | latest | SSL termination, rate limiting, static files |
| **CI/CD** | GitHub Actions | — | Integrated with GitHub, simple YAML config |
| **Monitoring** | Prometheus | — | Metrics collection, alerting |
| **Logging** | zerolog or zap | latest | Structured JSON logging |

---

## Go Backend

### Project Structure
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
go.mod
go.sum
Dockerfile
```

### Key Dependencies
```go
require (
    github.com/go-chi/chi/v5          // HTTP router
    github.com/jackc/pgx/v5           // PostgreSQL driver
    github.com/golang-migrate/migrate/v4  // Database migrations
    github.com/rs/zerolog              // Structured logging
    github.com/golang-jwt/jwt/v5       // JWT authentication
    golang.org/x/crypto               // bcrypt password hashing
    github.com/allegro/bigcache        // In-memory cache
    github.com/paystack/paystack-go    // Paystack SDK
)
```

### Configuration (env vars)
```bash
# Server
PORT=8080
ENV=development|production

# Database
DATABASE_URL=postgres://user:pass@localhost:5432/ceche

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRY=15m
REFRESH_EXPIRY=7d

# Payments
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# Email
BREVO_API_KEY=...
BREVO_SENDER_EMAIL=noreply@ceche.net
BREVO_SENDER_NAME=Ceche

# CORS
CORS_ORIGINS=http://localhost:3000,https://ceche.net

# Encryption
DOMAIN_ENCRYPTION_KEY=your-256-bit-key

# Scanner
SCANNER_CONCURRENCY=50
SCANNER_TLDS=com,net,io,co

# Rate Limiting
RATE_LIMIT_USER=100
RATE_LIMIT_API_KEY=1000
```

---

## PostgreSQL Database

### Connection Pooling
```go
config, _ := pgxpool.ParseConfig(databaseURL)
config.MaxConns = 20
config.MinConns = 5
config.MaxConnLifetime = time.Hour
config.MaxConnIdleTime = 30 * time.Minute
```

### Schema Conventions
- All tables use UUID primary keys
- `created_at` and `updated_at` timestamps on all tables
- JSONB for flexible data (appraisal results, intelligence profiles)
- Encrypted fields for sensitive data (domain names)
- Indexes on foreign keys and frequently queried columns

---

## Next.js Frontend

### Project Structure
```
app/
  [locale]/
    layout.tsx
    page.tsx
    platform/
    solutions/
    resources/
    pricing/
    login/
    signup/
components/
  ui/                    (shadcn/ui)
  layout/
    Header.tsx
    Footer.tsx
    LanguageSwitcher.tsx
messages/
  en.json
  fr.json
  de.json
  es.json
  pt.json
i18n/
  config.ts
  request.ts
lib/
  api.ts                 (API client)
  auth.ts                (Auth helpers)
  paystack.ts            (Payment integration)
styles/
  globals.css
next.config.ts
tailwind.config.ts
tsconfig.json
package.json
Dockerfile
```

### Key Dependencies
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next-intl": "^3.0.0",
  "tailwindcss": "^4.0.0",
  "@radix-ui/react-dialog": "^1.0.0",
  "@radix-ui/react-dropdown-menu": "^2.0.0",
  "@radix-ui/react-select": "^2.0.0",
  "lucide-react": "^0.300.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### i18n Configuration
```typescript
// i18n/config.ts
export const locales = ['en', 'fr', 'de', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
};
```

---

## Payment Integration (Paystack)

### Go SDK
```go
import paystack "github.com/samaasi/paystack-sdk-go/v2"

client := paystack.NewClient(os.Getenv("PAYSTACK_SECRET_KEY"))

// Initialize transaction
resp, err := client.Transactions.Initialize(ctx, &transactions.InitializeRequest{
    Email:    "customer@email.com",
    Amount:   "500000", // in kobo
    Currency: paystackapi.CurrencyNGN,
})
```

### Webhook Verification
```go
import "github.com/samaasi/paystack-sdk-go/v2/webhook"

// Verify IP
if !webhook.IsFromPaystackIP(r) {
    http.Error(w, "Unauthorized IP", http.StatusUnauthorized)
    return
}

// Verify signature
var event webhook.Event
if err := webhook.Parse(r, "PAYSTACK_SECRET_KEY", &event); err != nil {
    http.Error(w, "Invalid signature", http.StatusUnauthorized)
    return
}
```

---

## Security Configuration

### Headers (Nginx)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

### CORS
```go
func CORSMiddleware(origins []string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            origin := r.Header.Get("Origin")
            for _, o := range origins {
                if origin == o {
                    w.Header().Set("Access-Control-Allow-Origin", origin)
                    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Idempotency-Key")
                    w.Header().Set("Access-Control-Allow-Credentials", "true")
                    w.Header().Set("Access-Control-Max-Age", "86400")
                    break
                }
            }
            if r.Method == "OPTIONS" {
                w.WriteHeader(http.StatusNoContent)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
```

---

## Docker Compose

```yaml
version: "3.8"
services:
  ceche-api:
    build: .
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://ceche:secret@postgres:5432/ceche
      PAYSTACK_SECRET_KEY: ${PAYSTACK_SECRET_KEY}
      JWT_SECRET: ${JWT_SECRET}
    depends_on: [postgres]
    restart: unless-stopped

  ceche-web:
    build: ./app
    ports: ["3000:3000"]
    environment:
      NEXT_PUBLIC_API_URL: http://ceche-api:8080
    depends_on: [ceche-api]
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      POSTGRES_DB: ceche
      POSTGRES_USER: ceche
      POSTGRES_PASSWORD: secret
    restart: unless-stopped

volumes:
  pgdata:
```
