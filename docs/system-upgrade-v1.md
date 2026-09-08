# System Upgrade v1.0 — domains-terminal

## Executive Summary

This document outlines the complete upgrade plan for the `domains-terminal` CLI tool to enable zero-failure NameBio scraping for domain appraisal training data collection. The upgrade integrates 2Captcha CAPTCHA solving, ISP proxy support, anti-detection measures, and wires all CLI commands to real engines.

---

## 1. Current State Assessment

### What Works
- **Core Engines**: Filter, Scoring, Appraisal — all fully implemented and tested
- **Providers**: NameBio (API + scrape), DropCatch (OAuth2), ExpiredDomains (scraper), Signa (trademark)
- **Storage**: SQLite with 6 tables, full CRUD operations
- **CLI**: 10 commands, but 6 return hardcoded stub data

### What's Broken
- **CLI Commands**: `scrape`, `filter`, `score`, `enrich`, `appraise`, `pipeline` return stub data
- **Anti-Detection**: Only static User-Agent, no proxy, no rotation
- **CAPTCHA Handling**: No detection or solving
- **Rate Limiting**: No delays between requests

### Architecture Gap
```
Current:  CLI (stub) → Engines (real) → Storage (real)
Required: CLI (real) → Anti-Detection → Providers (real) → Engines (real) → Storage (real)
```

---

## 2. Upgrade Objectives

### Primary Goals
1. **Zero-failure NameBio scraping** — 99%+ success rate
2. **ISP proxy integration** — Static residential IPs for session stability
3. **CAPTCHA solving** — Automatic reCAPTCHA/hCaptcha handling
4. **CLI wiring** — All commands call real engines
5. **Training data collection** — 10K-100K domain sales for ML model

### Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Scrape success rate | ≥95% | Domains collected / attempted |
| CAPTCHA solve rate | ≥90% | Successful solves / CAPTCHAs encountered |
| Data volume | 10K-100K sales | Total records in sales_cache |
| Pipeline throughput | 1K domains/hour | End-to-end processing time |
| Cost per 10K domains | ≤$50 | Proxy + CAPTCHA costs |

---

## 3. Architecture Design

### 3.1 Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│ CLI Layer (cli.py)                                          │
│ - 10 commands wired to real engines                         │
│ - JSON output by default                                    │
│ - Progress indicators                                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ Anti-Detection Layer (new)                                  │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │ Proxy Pool  │  │ CAPTCHA     │  │ Delay       │          │
│ │ (ISP IPs)   │  │ Solver      │  │ Engine      │          │
│ └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│        │                │                │                  │
│        └────────────────┼────────────────┘                  │
│                         │                                   │
│              ┌─────────────────────┐                        │
│              │ Session Manager     │                        │
│              │ - UA rotation       │                        │
│              │ - Header diversity  │                        │
│              │ - Retry with backoff│                        │
│              └──────────┬──────────┘                        │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ Provider Layer (providers/)                                 │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │ NameBio     │  │ DropCatch   │  │ ExpiredDomains│         │
│ │ (API+Scrape)│  │ (OAuth2)    │  │ (Scraper)   │          │
│ └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│        │                │                │                  │
│        └────────────────┼────────────────┘                  │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ Core Engine Layer (core/)                                   │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │ Filter      │  │ Scoring     │  │ Appraisal   │          │
│ │ (12 rules)  │  │ (6 dims)    │  │ (comps)     │          │
│ └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│        │                │                │                  │
│        └────────────────┼────────────────┘                  │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ Storage Layer (storage.py)                                  │
│ - SQLite database                                           │
│ - 6 tables: domains, metrics, scores, appraisals, sales,   │
│   events                                                    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 New Modules

| Module | File | Purpose |
|--------|------|---------|
| **ProxyPool** | `core/proxy.py` | ISP proxy management, rotation, health checking |
| **CaptchaSolver** | `providers/captcha.py` | 2Captcha API integration, CAPTCHA detection |
| **DelayEngine** | `core/delay.py` | Random delays, jitter, rate limiting |
| **SessionManager** | `core/session.py` | UA rotation, header diversity, retry logic |

---

## 4. Detailed Implementation Plan

### Phase 1: Core Infrastructure (Days 1-2)

#### 4.1 ProxyPool Module (`core/proxy.py`)

**Purpose**: Manage ISP proxy connections with rotation and failover.

**Responsibilities**:
- Load proxy configuration from env vars or config.json
- Rotate through proxy pool (round-robin or random)
- Health check proxies before use
- Failover to next proxy on failure
- Session-sticky support (same IP for duration of scrape)

**Interface**:
```
class ProxyPool:
    __init__(endpoints: list[str], sticky: bool = True)
    get_proxy() -> dict[str, str]  # {"http": "...", "https": "..."}
    mark_failed(proxy: str)
    is_healthy(proxy: str) -> bool
    get_stats() -> dict  # success/failure counts per proxy
```

**Configuration**:
```json
{
  "proxy": {
    "enabled": true,
    "endpoints": ["socks5://user:pass@host:port"],
    "sticky_session": true,
    "health_check_interval": 300,
    "max_failures_per_proxy": 3
  }
}
```

#### 4.2 CaptchaSolver Module (`providers/captcha.py`)

**Purpose**: Integrate with 2Captcha API for CAPTCHA solving.

**Responsibilities**:
- Detect CAPTCHA in HTML responses
- Extract sitekey from page
- Submit to 2Captcha API with proxy
- Poll for solution (or use callback)
- Handle errors and retries
- Track solve success/failure rates

**Interface**:
```
class CaptchaSolver:
    __init__(api_key: str, proxy_pool: ProxyPool)
    detect_captcha(html: str) -> bool
    extract_sitekey(html: str) -> str | None
    solve_recaptcha_v2(sitekey: str, url: str) -> str | None
    solve_hcaptcha(sitekey: str, url: str) -> str | None
    get_stats() -> dict  # solves, failures, avg_time
```

**2Captcha API Integration**:
```
Endpoint: https://api.2captcha.com/createTask
Method: POST
Body: {
    "clientKey": "API_KEY",
    "task": {
        "type": "RecaptchaV2Task",
        "websiteURL": "https://namebio.com/search",
        "websiteKey": "SITEKEY",
        "proxyType": "socks5",
        "proxyAddress": "HOST",
        "proxyPort": "PORT",
        "proxyLogin": "USER",
        "proxyPassword": "PASS"
    }
}
Response: { "taskId": 12345 }

Poll: https://api.2captcha.com/getTaskResult
Body: { "clientKey": "API_KEY", "taskId": 12345 }
Response: { "status": "ready", "solution": { "gRecaptchaResponse": "TOKEN" } }
```

#### 4.3 DelayEngine Module (`core/delay.py`)

**Purpose**: Manage request timing to avoid rate limiting.

**Responsibilities**:
- Random delays between requests (2-5 seconds)
- Jitter to avoid patterns
- Longer delays after CAPTCHA solves
- Backoff on errors (1s, 2s, 4s)

**Interface**:
```
class DelayEngine:
    __init__(min_delay: float = 2.0, max_delay: float = 5.0)
    wait()
    wait_after_captcha()
    backoff(attempt: int)
```

#### 4.4 SessionManager Module (`core/session.py`)

**Purpose**: Manage HTTP sessions with anti-detection features.

**Responsibilities**:
- Rotate User-Agent strings
- Diversify request headers
- Maintain session cookies
- Handle redirects consistently

**Interface**:
```
class SessionManager:
    __init__(proxy_pool: ProxyPool)
    get_session() -> requests.Session
    rotate_ua()
    get_diverse_headers() -> dict
```

---

### Phase 2: NameBio Provider Upgrade (Days 2-3)

#### 4.5 Modifications to `providers/namebio.py`

**Current Issues**:
- No CAPTCHA handling
- No proxy support
- No retry logic
- Static User-Agent
- No session management

**Required Changes**:

1. **Add proxy support**:
   - Accept `proxy_pool` parameter in constructor
   - Pass `proxies=proxy_pool.get_proxy()` to all requests
   - Rotate proxy on failure

2. **Add CAPTCHA detection**:
   - Check HTML response for CAPTCHA markers
   - Markers: `g-recaptcha`, `h-captcha`, `cf-challenge`, `captcha`
   - Return special status when CAPTCHA detected

3. **Add CAPTCHA solving**:
   - Extract sitekey from page
   - Call CaptchaSolver.solve_recaptcha_v2()
   - Resubmit request with CAPTCHA token
   - Max 3 retry attempts

4. **Add retry logic**:
   - Exponential backoff on failures
   - 1s, 2s, 4s delays
   - Rotate proxy on repeated failures

5. **Add session management**:
   - Use requests.Session instead of raw requests
   - Maintain cookies across requests
   - Rotate User-Agent per request

**Updated Flow**:
```
1. Load page with ISP proxy
2. Check for CAPTCHA
   ├─ No CAPTCHA → Parse results
   └─ CAPTCHA detected → Solve via 2Captcha → Resubmit
3. Parse HTML for domain sales
4. Store in database
5. Wait (2-5 seconds)
6. Repeat for next keyword
```

---

### Phase 3: Anti-Detection Layer (Days 3-4)

#### 4.6 User-Agent Rotation

**50+ User-Agent strings** covering:
- Chrome (Windows, Mac, Linux)
- Firefox (Windows, Mac, Linux)
- Safari (Mac, iOS)
- Edge (Windows)

**Rotation strategy**: Random selection per request, with session affinity (same UA for same session).

#### 4.7 Request Header Diversity

**Headers to rotate**:
- `User-Agent` (random from pool)
- `Accept` (3 variants)
- `Accept-Language` (5 variants)
- `Accept-Encoding` (fixed: gzip, deflate, br)
- `Connection` (keep-alive)
- `Upgrade-Insecure-Requests` (1)

#### 4.8 Delay Engine

**Timing strategy**:
- Base delay: 2-5 seconds (random)
- After CAPTCHA solve: 5-10 seconds
- After error: exponential backoff (1s, 2s, 4s, 8s)
- Maximum delay: 30 seconds

---

### Phase 4: CLI Wiring (Days 4-5)

#### 4.9 Wire All Commands to Real Engines

| Command | Current | After Upgrade |
|---------|---------|---------------|
| `dt scrape` | Hardcoded stub | Calls provider.fetch() |
| `dt filter` | Hardcoded stub | Calls FilterEngine.apply() |
| `dt score` | Hardcoded stub | Calls ScoringEngine.score() |
| `dt enrich` | Hardcoded stub | Calls provider enrich methods |
| `dt appraise` | Hardcoded stub | Calls AppraisalEngine.appraise() |
| `dt pipeline` | Hardcoded stub | Chains all engines |
| `dt available` | ✅ Real | No changes |
| `dt trademark` | ✅ Real | No changes |
| `dt top` | ✅ Real | No changes |
| `dt stats` | ✅ Real | No changes |

#### 4.10 Pipeline Command

**Full flow**:
```
1. dt scrape --source namebio
   → Fetch domains from NameBio (with proxy + CAPTCHA)
   → Store in domains table

2. dt filter --rules brandable,short
   → Apply 12 filter rules
   → Store filtered results

3. dt score --rules brandability,length
   → Score across 6 dimensions
   → Store scores

4. dt appraise --limit 100
   → Appraise using comparable sales
   → Store appraisals

5. dt top --limit 10
   → Show top-scoring domains
```

---

### Phase 5: Testing & Validation (Days 5-6)

#### 4.11 Unit Tests

| Test | Purpose |
|------|---------|
| `test_captcha_detection` | Verify CAPTCHA markers are detected |
| `test_proxy_rotation` | Verify proxy cycling works |
| `test_retry_logic` | Verify exponential backoff |
| `test_delay_engine` | Verify timing is within bounds |
| `test_session_diversity` | Verify UA/header rotation |

#### 4.12 Integration Tests

| Test | Purpose |
|------|---------|
| `test_namebio_scrape_small` | Scrape 10 domains end-to-end |
| `test_pipeline_full` | Full scrape → filter → score → appraise |
| `test_captcha_solving` | Test with 2Captcha sandbox |
| `test_proxy_failover` | Test proxy rotation on failure |

#### 4.13 Load Tests

| Test | Purpose |
|------|---------|
| `test_100_domains` | Process 100 domains |
| `test_1000_domains` | Process 1,000 domains |
| `test_success_rate` | Measure success rate over 1,000 requests |
| `test_throughput` | Measure domains per hour |

---

## 5. Configuration Reference

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TWOCAPTCHA_API_KEY` | Yes | 2Captcha API key |
| `ISP_PROXY` | Yes | ISP proxy URL (socks5://user:pass@host:port) |
| `HTTP_PROXY` | No | HTTP proxy fallback |
| `HTTPS_PROXY` | No | HTTPS proxy fallback |

### Config File (~/.domains-terminal/config.json)

```json
{
  "captcha": {
    "provider": "2captcha",
    "api_key": "YOUR_KEY",
    "timeout": 120,
    "max_retries": 3
  },
  "proxy": {
    "enabled": true,
    "endpoints": ["socks5://user:pass@host:port"],
    "sticky_session": true,
    "health_check": true,
    "max_failures": 3
  },
  "scraping": {
    "delay_min": 2,
    "delay_max": 5,
    "max_retries": 3,
    "user_agent_rotation": true,
    "header_diversity": true
  }
}
```

---

## 6. Cost Analysis

### Per Domain Costs

| Component | Cost | Notes |
|-----------|------|-------|
| **ISP Proxy** | ~$0.0005 | 1.25KB per domain × $5/GB |
| **CAPTCHA Solve** | ~$0.003 | 20% trigger rate × $2.99/1k |
| **Total per domain** | ~$0.0035 | |
| **10K domains** | ~$35 | |
| **100K domains** | ~$350 | |

### Cost Comparison

| Approach | 10K Domains | 100K Domains |
|----------|-------------|--------------|
| **Current (no proxy)** | $0 (but fails often) | $0 (but fails often) |
| **With ISP + CAPTCHA** | ~$35 | ~$350 |
| **With Browser API** | ~$10 | ~$100 |

---

## 7. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **CAPTCHA solve failure** | Retry 3x, then skip and log |
| **Proxy failure** | Rotate to next proxy, retry |
| **Rate limiting** | Exponential backoff, respect limits |
| **IP blocking** | Rotate proxies, use different subnets |
| **Data loss** | Save progress after each batch |
| **API changes** | Version pinning, error handling |

---

## 8. Success Criteria

| Criteria | Target | Measurement |
|----------|--------|-------------|
| Scrape success rate | ≥95% | Successful scrapes / total attempts |
| CAPTCHA solve rate | ≥90% | Successful solves / CAPTCHAs encountered |
| Data quality | ≥98% | Valid domain records / total records |
| Pipeline completion | 100% | All commands execute without errors |
| Cost per 10K domains | ≤$50 | Total proxy + CAPTCHA costs |
| Time per 1K domains | ≤1 hour | End-to-end processing time |

---

## 9. Implementation Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1** | Days 1-2 | ProxyPool, CaptchaSolver, DelayEngine, SessionManager |
| **Phase 2** | Days 2-3 | NameBio provider upgrade |
| **Phase 3** | Days 3-4 | Anti-detection layer |
| **Phase 4** | Days 4-5 | CLI wiring to real engines |
| **Phase 5** | Days 5-6 | Testing and validation |
| **Total** | **6 days** | Full system upgrade |

---

## 10. Post-Upgrade Roadmap

### Immediate (Week 1)
- Deploy upgraded domains-terminal
- Run initial calibration scrape (10K domains)
- Validate data quality

### Short-term (Week 2-4)
- Scale to 100K domains
- Train ML model on collected data
- Integrate with Ceche appraisal engine

### Medium-term (Month 2-3)
- Add more data sources (GoDaddy, Atom.com)
- Expand to non-.com TLDs
- Build triple-layer pricing system

---

## Appendix A: 2Captcha API Quick Reference

### Authentication
```
API Key: YOUR_API_KEY
Endpoint: https://api.2captcha.com
```

### Solve reCAPTCHA v2
```
POST /createTask
{
    "clientKey": "YOUR_API_KEY",
    "task": {
        "type": "RecaptchaV2Task",
        "websiteURL": "URL",
        "websiteKey": "SITEKEY",
        "proxyType": "socks5",
        "proxyAddress": "HOST",
        "proxyPort": "PORT",
        "proxyLogin": "USER",
        "proxyPassword": "PASS"
    }
}
→ { "taskId": 12345 }

GET /getTaskResult
{
    "clientKey": "YOUR_API_KEY",
    "taskId": 12345
}
→ { "status": "ready", "solution": { "gRecaptchaResponse": "TOKEN" } }
```

### Error Codes
| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | Use token |
| 1 | No slots | Wait 10s, retry |
| 2 | Timeout | Retry same task |
| 3 | Wrong key | Check sitekey |
| 4 | Too many | Add delay |

---

## Appendix B: ISP Proxy Configuration

### 2Captcha ISP Proxy Format
```
socks5://USER:PASSWORD@HOST:PORT
```

### Example Configuration
```json
{
  "proxy": {
    "endpoints": [
      "socks5://user1:pass1@isp1.2captcha.com:1080",
      "socks5://user2:pass2@isp2.2captcha.com:1080"
    ],
    "sticky_session": true,
    "rotation": "round-robin"
  }
}
```

### Environment Variable
```bash
ISP_PROXY=socks5://user:pass@host:port
```

---

## Appendix C: Anti-Detection Best Practices

### User-Agent Rotation
- Use 50+ different UA strings
- Rotate randomly per request
- Keep same UA for session (sticky)
- Mix Chrome, Firefox, Safari, Edge

### Request Timing
- Minimum 2 seconds between requests
- Random jitter: ±1 second
- After CAPTCHA: 5-10 seconds
- After error: exponential backoff (1s, 2s, 4s)

### Header Diversity
- Rotate Accept, Accept-Language headers
- Keep Connection: keep-alive
- Use realistic browser headers

### Session Management
- Maintain cookies across requests
- Same proxy for session duration
- Don't change UA mid-session

---

## Appendix D: Data Quality Checklist

| Check | Description | Action |
|-------|-------------|--------|
| **Domain format** | Valid domain name | Reject invalid |
| **Price range** | $100 - $10M | Flag outliers |
| **Date format** | YYYY-MM-DD | Normalize |
| **Duplicate detection** | Same domain + date | Deduplicate |
| **Venue validation** | Known venues only | Flag unknown |
| **Completeness** | All fields populated | Flag missing data |

---

## Appendix E: Monitoring & Alerting

### Key Metrics to Monitor
- Success rate per hour
- CAPTCHA solve rate
- Average response time
- Proxy health status
- Error rate by type
- Cost per domain

### Alert Thresholds
| Metric | Warning | Critical |
|--------|---------|----------|
| Success rate | <95% | <80% |
| CAPTCHA solve rate | <90% | <70% |
| Response time | >10s | >30s |
| Error rate | >5% | >15% |
| Proxy failures | >3/hour | >10/hour |

---

*Document version: 1.0*
*Last updated: 2026-09-08*
*Author: Ceche Development Team*
