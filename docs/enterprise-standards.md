# Ceche — Enterprise Standards

> Universal B2B/enterprise platform standards that govern all development.

---

## The 7 Pillars

### 1. Security & Compliance

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| Password hashing | bcrypt (cost 12) | Critical |
| JWT authentication | HS256, 15min expiry | Critical |
| Refresh tokens | 7d expiry, stored hashed | Critical |
| Domain encryption | AES-256-GCM at rest | Critical |
| Webhook verification | HMAC-SHA512 signature | Critical |
| CORS configuration | Env-based origin whitelist | Critical |
| Security headers | CSP, HSTS, X-Frame-Options | Critical |
| Rate limiting | Per user (100/min), per API key (1000/min) | Critical |
| Input validation | Regex + sanitization | Critical |
| SQL injection prevention | Parameterized queries only | Critical |
| GDPR compliance | Privacy policy, DPA, data subject rights | High |
| PCI-DSS | Paystack handles (SAQ-A) | High |
| Audit logging | Immutable append-only table | High |
| MFA support | Future enhancement | Medium |

### 2. Architecture

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| API versioning | `/api/v1/...` from day one | Critical |
| Idempotency | UUID keys on all write operations | Critical |
| Multi-tenant readiness | User-scoped data isolation | Critical |
| Event-driven async | Background goroutines for scans | High |
| Health checks | `GET /health` endpoint | Critical |
| Circuit breakers | For external API calls | High |
| Graceful degradation | Fallback when services unavailable | High |

### 3. Observability

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| Structured logging | JSON format with correlation IDs | Critical |
| Request tracing | `X-Request-ID` header | Critical |
| Metrics collection | Prometheus format at `/metrics` | High |
| SLO definitions | p99 < 500ms, error rate < 1%, uptime > 99.9% | High |
| Alerting | Error rate, latency, disk, connections | High |
| Runbooks | Documented response procedures | Medium |

### 4. Delivery

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| CI/CD pipeline | GitHub Actions on push to main | Critical |
| Linting | golangci-lint (Go), eslint (TypeScript) | Critical |
| Type checking | go vet (Go), tsc (TypeScript) | Critical |
| Testing | go test (Go), jest (TypeScript) | Critical |
| Security scanning | Dependency audit | High |
| Rollback capability | Docker image versioning | High |
| Infrastructure as Code | Docker Compose | High |

### 5. Data

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| Backup strategy | Daily pg_dump, 30-day retention | Critical |
| Restore testing | Monthly restore verification | High |
| Data retention | Configurable per data type | High |
| Encryption at rest | AES-256-GCM for sensitive data | Critical |
| Encryption key management | Env vars, quarterly rotation | High |
| Audit trails | Immutable append-only log | Critical |
| Data classification | Public, internal, confidential, restricted | Medium |

### 6. API

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| Versioning | `/api/v1/`, `/api/v2/` (future) | Critical |
| Rate limiting | Per user + per API key | Critical |
| Idempotency keys | On all POST/PUT/DELETE | Critical |
| Webhook signing | HMAC-SHA512 verification | Critical |
| OpenAPI documentation | Swagger UI at `/api/docs` | High |
| Deprecation policy | 6-month notice for breaking changes | Medium |
| Error format | Consistent JSON error responses | Critical |

### 7. Business

| Requirement | Implementation | Priority |
|------------|---------------|----------|
| SLA | 99.9% uptime guarantee | High |
| Privacy Policy | GDPR-compliant, published | Critical |
| Terms of Service | Including no-refund policy | Critical |
| Cookie Policy | GDPR-compliant consent | Critical |
| Data Processing Agreement | Available for enterprise customers | High |
| Support response times | Defined per plan tier | Medium |

---

## Compliance Roadmap

| Framework | Timeline | Priority | Ceche Requirement |
|-----------|----------|----------|-------------------|
| **GDPR** | Months 1-3 | Critical | Privacy policy, DPA, data subject rights |
| **SOC 2 Type I** | Months 3-6 | High | Control design documentation |
| **SOC 2 Type II** | Months 6-18 | High | 6-12 month observation period |
| **PCI-DSS** | Month 1+ | Critical | Stripe/Paystack handles (SAQ-A) |
| **ISO 27001** | Months 12-24 | Medium | Information security management |

---

## Enterprise Checklist (Before Any Code)

Before writing a single line of code, these must be defined:

1. **Security Policy** — What data is classified as what level?
2. **Incident Response Plan** — What happens when breached?
3. **Data Retention Policy** — How long do we keep data?
4. **Privacy Policy** — What do we collect and why?
5. **Terms of Service** — What are the legal rules?
6. **Data Processing Agreement** — How do we handle customer data?
7. **SLA** — What uptime do we guarantee?
8. **API Deprecation Policy** — How long do we support old versions?
9. **Vendor Risk Assessment** — Who are our sub-processers?
10. **Business Continuity Plan** — What happens when things break?

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
- **Rate limiting on all endpoints**.
- **CORS configured** via `CECHE_CORS_ORIGINS` env var.
- **Security headers** on all responses.

---

## Audit Logging Schema

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,           -- 'login', 'register', 'appraise', 'reveal', etc.
    resource TEXT NOT NULL,         -- 'user', 'appraisal', 'reveal', etc.
    resource_id TEXT,               -- ID of the affected resource
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,                 -- additional context
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Immutable: no UPDATE or DELETE allowed
-- Index for querying
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
```

---

## Structured Logging Format

```json
{
  "level": "info",
  "ts": "2026-08-29T10:30:00Z",
  "caller": "api/v1/appraise.go:42",
  "request_id": "req-abc-123",
  "user_id": "usr-xyz-789",
  "method": "POST",
  "path": "/api/v1/appraise",
  "status": 200,
  "latency_ms": 45,
  "domain": "encrypted-hash",
  "score": 87
}
```

---

## Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid domain format",
    "details": {
      "field": "domain",
      "value": "not-a-domain",
      "constraint": "must be a valid domain name"
    },
    "request_id": "req-abc-123"
  }
}
```

---

## Health Check Response

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-08-29T10:30:00Z",
  "checks": {
    "database": "ok",
    "cache": "ok",
    "disk": "ok"
  }
}
```

---

## SLO Definitions

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Availability** | 99.9% | Uptime per month (excluding planned maintenance) |
| **Latency (p50)** | < 100ms | API response time |
| **Latency (p99)** | < 500ms | API response time |
| **Error Rate** | < 1% | 5xx responses / total responses |
| **Recovery Time** | < 2 hours | Time to restore service after outage |
| **Recovery Point** | < 24 hours | Maximum data loss in outage |
