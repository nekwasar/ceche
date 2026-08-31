# Ceche — Payment Integration

> Paystack (primary) with Stripe migration path.

---

## Current State

- **Primary Gateway**: Paystack (until Stripe account ready)
- **Currency**: USD (primary)
- **No Refunds**: All sales final (digital goods)

---

## Paystack Integration

### Go SDK
```go
import paystack "github.com/samaasi/paystack-sdk-go/v2"

client := paystack.NewClient(os.Getenv("PAYSTACK_SECRET_KEY"))
```

### Initialize Transaction
```go
func InitializePayment(ctx context.Context, email string, amount int64, metadata map[string]interface{}) (*transactions.InitializeResponse, error) {
    req := &transactions.InitializeRequest{
        Email:    email,
        Amount:   fmt.Sprintf("%d", amount), // in cents (USD)
        Currency: "USD",
        Metadata: metadata,
    }
    return client.Transactions.Initialize(ctx, req)
}
```

### Verify Transaction
```go
func VerifyPayment(ctx context.Context, reference string) (*transactions.VerifyResponse, error) {
    return client.Transactions.Verify(ctx, reference)
}
```

### Webhook Verification
```go
func HandleWebhook(w http.ResponseWriter, r *http.Request) {
    // 1. Verify IP
    if !webhook.IsFromPaystackIP(r) {
        http.Error(w, "Unauthorized IP", http.StatusUnauthorized)
        return
    }

    // 2. Parse and verify signature
    var event webhook.Event
    if err := webhook.Parse(r, os.Getenv("PAYSTACK_SECRET_KEY"), &event); err != nil {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    // 3. Process event
    switch event.Event {
    case "charge.success":
        handleChargeSuccess(event.Data)
    case "subscription.create":
        handleSubscriptionCreate(event.Data)
    case "subscription.disable":
        handleSubscriptionDisable(event.Data)
    }

    w.WriteHeader(http.StatusOK)
}
```

---

## Subscription Pricing

### Tiers

| Tier | Price | Appraisals/Day | Features |
|------|-------|----------------|----------|
| **Free (unsigned)** | $0 | 3 | Name search only |
| **Free (signed up)** | $0 | 12 | Name search + basic appraisal |
| **Premium Startup** | $79/mo | 30 | Scanner, Extended Insights, Bulk Audit |
| **Premium Enterprise** | $129/mo | Unlimited | All tools, API access, priority support |

### Go Config
```go
var SubscriptionPlans = map[string]Plan{
    "free": {
        Name:            "Free",
        Price:           0,
        AppraisalsPerDay: 3,
        Features:        []string{"name_search"},
    },
    "free_signed_up": {
        Name:            "Free (Signed Up)",
        Price:           0,
        AppraisalsPerDay: 12,
        Features:        []string{"name_search", "basic_appraisal"},
    },
    "startup": {
        Name:            "Premium Startup",
        Price:           7900, // $79 in cents
        AppraisalsPerDay: 30,
        Features:        []string{"name_search", "appraisal", "scanner", "extended_insights", "bulk_audit"},
    },
    "enterprise": {
        Name:            "Premium Enterprise",
        Price:           12900, // $129 in cents
        AppraisalsPerDay: -1,   // Unlimited
        Features:        []string{"name_search", "appraisal", "scanner", "extended_insights", "bulk_audit", "api_access", "priority_support"},
    },
}
```

---

## Reveal Pricing

### Standard Marketplace

Pay to reveal a blind listing (name hidden, no hint).

| Domain Value Range | Reveal Price |
|-------------------|--------------|
| Under $1,000 | $5 |
| $1,000 - $10,000 | $10 |
| $10,000 - $50,000 | $25 |
| $50,000+ | $50 |

### Try Your Luck (with TLD selection)

| TLD | Price |
|-----|-------|
| .com | $79 |
| .net | $39 |
| .io | $29 |
| .co | $9 |

### Try Your Luck (no TLD — flat rate)

| TLD | Price |
|-----|-------|
| Any | $19 |

### Go Config
```go
var TryYourLuckPricing = map[string]int64{
    "com":  7900, // $79
    "net":  3900, // $39
    "io":   2900, // $29
    "co":   900,  // $9
    "flat": 1900, // $19 (no TLD selection)
}
```

---

## Seller Marketplace Fees

### Listing Fees

| Type | Fee |
|------|-----|
| Standard | $5 |
| Priority | $10 |

### Commission on Sale

| Sale Price | Commission Rate | Minimum |
|-----------|----------------|---------|
| $0 - $500 | 15% | $10 |
| $501 - $5,000 | 12% | $50 |
| $5,001 - $50,000 | 10% | $500 |
| $50,001+ | 8% | $4,000 |

---

## Subscription Payment Flow

### 1. User Selects Plan
```
POST /api/v1/subscriptions
{
  "plan": "startup" | "enterprise"
}
```

### 2. Backend Creates Subscription
```go
func CreateSubscription(ctx context.Context, userID string, plan string) (*Subscription, error) {
    // 1. Get Paystack plan code
    // 2. Initialize transaction with plan code
    // 3. Return authorization URL
}
```

### 3. User Completes Payment
- Redirect to Paystack checkout
- User pays with card

### 4. Webhook Confirms Subscription
```
POST /api/v1/webhooks/paystack
{
  "event": "subscription.create",
  "data": {
    "subscription_code": "sub_xxx",
    "customer": { "email": "user@email.com" },
    "plan": { "code": "PLN_xxx" }
  }
}
```

### 5. Backend Activates Subscription
```go
func HandleSubscriptionCreate(data map[string]interface{}) {
    // 1. Find user by email
    // 2. Update user plan
    // 3. Set subscription status to active
    // 4. Set current_period_end
    // 5. Send welcome email
    // 6. Log audit event
}
```

---

## Reveal Payment Flow

### Standard Marketplace Reveal

```
1. User browses /marketplace
2. Clicks "Reveal Name" on a listing
3. Pays reveal price (varies by domain value)
4. Payment verified via webhook
5. Domain name decrypted and shown
6. User prompted to register at preferred registrar
```

### Try Your Luck Reveal

```
1. User goes to /marketplace/try-your-luck
2. Selects TLD (or flat-rate option)
3. Pays TLD-specific price
4. Three closed boxes appear (spinning animation)
5. User picks one box
6. Domain name revealed
7. Domain LOCKED — no other user can purchase it
8. User prompted to buy immediately
```

---

## No Refund Policy

**All sales are final.** No refunds for:
- Reveal purchases
- Subscription payments
- Marketplace purchases
- Try Your Luck spins

Exception: Duplicate charges due to system error (handled case-by-case).

---

## Stripe Migration Path

When Stripe account is ready:

1. Create payment interface:
```go
type PaymentProvider interface {
    InitializeTransaction(ctx context.Context, req PaymentRequest) (*PaymentResponse, error)
    VerifyTransaction(ctx context.Context, reference string) (*PaymentVerification, error)
    HandleWebhook(ctx context.Context, payload []byte, signature string) (*WebhookEvent, error)
    CreateSubscription(ctx context.Context, req SubscriptionRequest) (*SubscriptionResponse, error)
    CancelSubscription(ctx context.Context, subscriptionID string) error
}
```

2. Implement Paystack provider
3. Implement Stripe provider
4. Swap via config: `PAYMENT_PROVIDER=paystack|stripe`
5. No changes to business logic
