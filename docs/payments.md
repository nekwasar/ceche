# Ceche — Payment Integration

> Paystack (primary) with Stripe migration path.

---

## Current State

- **Primary Gateway**: Paystack (until Stripe account ready)
- **Migration Path**: Paystack → Stripe (interface-based, swap implementation)
- **Currency**: NGN (Paystack primary), USD (future with Stripe)

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
        Amount:   fmt.Sprintf("%d", amount), // in kobo
        Currency: paystackapi.CurrencyNGN,
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

## Reveal Payment Flow

### 1. User Initiates Reveal
```
POST /api/v1/reveals
{
  "domain_id": "uuid",
  "reveal_type": "partial" | "luck" | "full"
}
```

### 2. Backend Creates Payment
```go
func CreateReveal(ctx context.Context, userID string, domainID string, revealType string) (*Reveal, error) {
    // 1. Check user has credits
    // 2. Get domain (encrypted)
    // 3. Calculate price based on reveal type and score
    // 4. Initialize Paystack transaction
    // 5. Return authorization URL
}
```

### 3. User Completes Payment
- Redirect to Paystack checkout
- User pays with card, bank transfer, USSD, etc.

### 4. Webhook Confirms Payment
```
POST /api/v1/webhooks/paystack
{
  "event": "charge.success",
  "data": {
    "reference": "txn_xxx",
    "amount": 500000,
    "status": "success",
    "metadata": {
      "reveal_id": "uuid",
      "user_id": "uuid"
    }
  }
}
```

### 5. Backend Fulfills Reveal
```go
func HandleChargeSuccess(data map[string]interface{}) {
    revealID := data["metadata"]["reveal_id"]
    // 1. Verify payment with Paystack
    // 2. Decrypt domain name
    // 3. Store revealed domain for user
    // 4. Decrement user credits
    // 5. Send email with revealed domain
    // 6. Log audit event
}
```

---

## Subscription Payment Flow

### 1. User Selects Plan
```
POST /api/v1/subscriptions
{
  "plan": "starter" | "pro" | "enterprise"
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
    "customer": {
      "email": "user@email.com"
    },
    "plan": {
      "code": "PLN_xxx"
    }
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
    // 5. Grant reveal credits
    // 6. Send welcome email
    // 7. Log audit event
}
```

---

## Pricing Configuration

### Reveal Pricing
```go
var RevealPricing = map[string]map[string]int64{
    "partial": {
        "free": 0,        // Can't reveal on free
        "starter": 1000,  // $10 (1000 kobo = $10)
        "pro": 700,       // $7
        "enterprise": 500, // $5
    },
    "luck": {
        "free": 0,
        "starter": 300,   // $3
        "pro": 200,       // $2
        "enterprise": 100, // $1
    },
    "full": {
        "free": 0,
        "starter": 500,   // $5
        "pro": 300,       // $3
        "enterprise": 200, // $2
    },
}
```

### Subscription Plans
```go
var SubscriptionPlans = map[string]Plan{
    "free": {
        Name:           "Free",
        Price:          0,
        RevealsPerMonth: 5,
        APICallsPerDay: 0,
    },
    "starter": {
        Name:           "Starter",
        Price:          2900, // $29 in kobo
        RevealsPerMonth: 50,
        APICallsPerDay: 100,
    },
    "pro": {
        Name:           "Pro",
        Price:          4900, // $49 in kobo
        RevealsPerMonth: 200,
        APICallsPerDay: 500,
    },
    "enterprise": {
        Name:           "Enterprise",
        Price:          19900, // $199 in kobo
        RevealsPerMonth: -1,   // Unlimited
        APICallsPerDay: -1,    // Unlimited
    },
}
```

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

---

## No Refund Policy

**All sales are final.** No refunds for:
- Reveal purchases
- Subscription payments
- Marketplace purchases

This is stated clearly on:
- Pricing page
- Terms of Service
- Checkout flow (before payment)
- Receipt emails

Exception: Duplicate charges due to system error (handled case-by-case).
