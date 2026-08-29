# Ceche — Scaling Insights & Data Pipeline Strategy

> Cost-efficient data acquisition, caching, and async processing for domain intelligence at scale.

---

## Problem Statement

Domain intelligence requires data from multiple external sources. Some are free (RDAP), some are expensive (Ahrefs). Running un-cached requests to expensive APIs will destroy operating margins. The solution: tiered caching, cheap data sources, and async processing.

---

## Data Source Matrix

| Data Type | High-Cost Source | Low-Cost / Self-Hosted Alternative | Cost | Refresh Rate |
|-----------|-----------------|-----------------------------------|------|--------------|
| **SEO & Backlink** | Ahrefs API ($199/mo) | DataForSEO API ($0.05/query) or OpenLinkProfiler (free) | Low | 7-30 days |
| **WHOIS & Expiration** | Commercial WHOIS APIs ($0.10/query) | Direct RDAP queries to TLD registries (free) | Free | Real-time |
| **Trademark Verification** | Proprietary Legal APIs | USPTO TESS + WIPO direct scrape | Free | 24 hours |
| **Search Volume & CPC** | Google Ads API ($$$) | Bulk keyword databases updated quarterly | Low | Quarterly |
| **Domain Age / Registration** | WHOIS APIs | RDAP (free, structured JSON) | Free | Real-time |
| **DNS Records** | DNS APIs | Direct DNS queries (net.LookupDNS) | Free | Real-time |
| **Social Media Presence** | Social APIs | Username availability checks (manual) | Free | On-demand |
| **Traffic Estimates** | SimilarWeb API ($$$) | SEO metrics as proxy (DA, backlinks) | Low | 7 days |

---

## Caching Strategy

### Three-Tier Cache Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Request Flow                          │
│                                                          │
│  User Request → L1 (In-Memory) → L2 (Redis) → Compute   │
│                                                          │
│  L1: bigcache, 1h TTL, per-instance, fastest            │
│  L2: Redis, 24h TTL, shared across instances            │
│  Compute: Full module execution (expensive)              │
└─────────────────────────────────────────────────────────┘
```

### Cache Configuration

| Tier | Storage | TTL | Scope | Eviction |
|------|---------|-----|-------|----------|
| L1 | bigcache (in-memory) | 1 hour | Per-instance | LRU, 10K entries max |
| L2 | Redis | 24 hours | Shared | TTL-based |
| Database | PostgreSQL | Permanent | Persistent | Manual cleanup |

### Cache Key Design

```
Key format: {type}:{domain}:{version}
Examples:
  appraisal:google.com:v1
  intelligence:google.com:v1
  rdap:google.com:v1
  seo:google.com:v1

Version suffix allows cache invalidation on algorithm changes.
```

### Cache Hit Logic

```
func GetAppraisal(domain string, tier string) (*Appraisal, error) {
    // L1 check (fastest, ~1ms)
    if cached, err := l1.Get(cacheKey(domain)); err == nil {
        return shapeResponse(cached, tier), nil
    }
    
    // L2 check (~5ms)
    if cached, err := l2.Get(ctx, cacheKey(domain)); err == nil {
        l1.Set(cacheKey(domain), cached) // populate L1
        return shapeResponse(cached, tier), nil
    }
    
    // Compute (expensive, 100ms-2s)
    result := computeFull(domain)
    
    // Store in both tiers
    l1.Set(cacheKey(domain), result)
    l2.Set(ctx, cacheKey(domain), result, 24*time.Hour)
    
    return shapeResponse(result, tier), nil
}
```

### Cache Invalidation

| Trigger | Action |
|---------|--------|
| Algorithm version change | Bump version suffix in cache key |
| Manual refresh | `DELETE /api/v1/cache/{domain}` (admin only) |
| TTL expiry | Automatic per-tier TTL |
| Domain data change | Event-driven invalidation (future) |

---

## Async Processing Strategy

### Problem

Some modules are expensive (SEO lookup, trademark check, authority scoring). Running them synchronously blocks the response.

### Solution: Two-Phase Response

```
Phase 1 (Instant, <100ms):
  - M2 TLD Table (static lookup)
  - M3 Length (pure computation)
  - M5 Pronounceability (pure computation)
  - M6 Segmenter (dictionary lookup)
  → Return score + basic modules immediately

Phase 2 (Async, 1-5s via SSE):
  - M1 RDAP (external API)
  - M7 Keyword Popularity (API call)
  - M8 CPC (API call)
  - M9 Search Results (API call)
  - M10 Cross-TLD (RDAP check)
  - M11 Trademark (USPTO scrape)
  - M12 Authority (DataForSEO API)
  → Stream results as they complete
```

### Implementation Pattern

```go
// Handler returns immediately with Phase 1 data
func handleAppraise(w http.ResponseWriter, r *http.Request) {
    domain := r.Context().Value("domain").(string)
    
    // Phase 1: Instant computation
    basic := computeBasicModules(domain)
    score := computeBasicScore(basic)
    
    // Return immediately
    json.NewEncoder(w).Encode(map[string]interface{}{
        "score":    score,
        "modules":  basic,
        "status":   "partial",
        "stream":   "/api/v1/appraisals/" + id + "/stream",
    })
    
    // Phase 2: Queue async computation
    worker.Enqueue(AsyncJob{
        Type:      "full_appraisal",
        Domain:    domain,
        UserID:    userID,
        Callback:  "/api/v1/webhooks/appraisal-complete",
    })
}

// SSE endpoint streams Phase 2 results
func handleStream(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/event-stream")
    
    for update := range appraisalUpdates(r.Context()) {
        fmt.Fprintf(w, "data: %s\n\n", marshal(update))
        w.(http.Flusher).Flush()
    }
}
```

### Worker Queue

```
┌─────────────────────────────────────────────────┐
│              Worker Queue Architecture            │
│                                                   │
│  API Handler → PostgreSQL Queue → Worker Pool     │
│                                                   │
│  Queue table: jobs (id, type, payload, status,    │
│                     created_at, started_at,       │
│                     completed_at, error)          │
│                                                   │
│  Worker pool: 10 goroutines (configurable)        │
│  Job types: appraisal, seo_lookup, trademark,     │
│             rdap_check, authority_lookup           │
│  Retry: 3 attempts with exponential backoff       │
│  Dead letter: failed jobs stored for debugging    │
└─────────────────────────────────────────────────┘
```

---

## Rate Limiting Strategy

### Per-Source Limits

| Source | Free Tier | Paid Tier | Strategy |
|--------|-----------|-----------|----------|
| RDAP | Unlimited | Unlimited | No limit (free, fast) |
| DataForSEO | 100 queries/day | 10,000 queries/day | Cache aggressively |
| USPTO TESS | 100 queries/day | 100 queries/day | Cache 7 days |
| WHOIS | Unlimited | Unlimited | Use RDAP instead |

### Cost Projections

| Monthly Appraisals | RDAP Cost | DataForSEO Cost | Total | Per-Appraisal |
|--------------------|-----------|-----------------|-------|---------------|
| 1,000 | $0 | $50 | $50 | $0.05 |
| 10,000 | $0 | $500 | $500 | $0.05 |
| 100,000 | $0 | $2,500 | $2,500 | $0.025 |
| 1,000,000 | $0 | $15,000 | $15,000 | $0.015 |

*With 70% cache hit rate, actual costs are 30% of above.*

### Cache Hit Rate Targets

| Data Type | Target Hit Rate | How |
|-----------|----------------|-----|
| TLD Table | 100% | Static data, never expires |
| Length/Pronounceability | 100% | Pure computation, always cached |
| RDAP | 80% | Cache 24h, domain registration changes slowly |
| SEO/Backlink | 70% | Cache 7-30 days, metrics change slowly |
| Trademark | 90% | Cache 7 days, trademark filings are rare |

---

## Data Freshness Policy

| Data Type | Max Staleness | Refresh Trigger |
|-----------|--------------|-----------------|
| TLD scores | Permanent | Manual update only |
| Domain length/pronounceability | Permanent | Never (inherent property) |
| RDAP (registration) | 24 hours | Re-check on appraisal |
| SEO metrics | 7 days | Re-check on appraisal |
| Trademark | 7 days | Re-check on appraisal |
| CPC/Keyword data | 90 days | Quarterly bulk update |
| Pricing estimates | 24 hours | Re-compute on appraisal |

---

## Scaling Milestones

| Monthly Appraisals | Infrastructure | Cache Strategy |
|--------------------|---------------|----------------|
| 0-10K | Single server, PostgreSQL | L1 only (bigcache) |
| 10K-100K | Single server, PostgreSQL + Redis | L1 + L2 |
| 100K-1M | 2-3 servers, PostgreSQL + Redis | L1 + L2 + CDN |
| 1M+ | Kubernetes, PostgreSQL cluster + Redis cluster | L1 + L2 + CDN + edge |

---

## Monitoring & Alerting

### Key Metrics

| Metric | Alert Threshold | Action |
|--------|----------------|--------|
| Cache hit rate (L1) | < 80% | Increase L1 size or TTL |
| Cache hit rate (L2) | < 70% | Increase L2 TTL |
| API cost per appraisal | > $0.10 | Review cache strategy |
| Worker queue depth | > 1000 | Scale worker pool |
| Worker job failure rate | > 5% | Investigate API issues |
| RDAP response time | > 2s | Check TLD registry status |
| DataForSEO response time | > 5s | Check API status |

### Cost Dashboard

```
Track daily:
- Total appraisals
- Cache hit rates (L1, L2)
- External API calls
- External API costs
- Cost per appraisal
- Revenue per appraisal (from reveal fees)
- Margin (revenue - cost)
```

---

## Implementation Priority

| Phase | What | Why |
|-------|------|-----|
| Phase 2 fix | L1 cache (bigcache) | Immediate performance gain |
| Phase 3 | RDAP client | Free data, unlocks marketplace |
| Phase 4 | Worker queue | Async processing for expensive modules |
| Phase 5 | DataForSEO adapter | Real SEO data |
| Phase 7 | L2 cache (Redis) | Shared state for multi-instance |
| Phase 10 | Cost monitoring | Track margins |
