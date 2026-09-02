import Link from "next/link";

export default function BuyPremiumPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F2",
        color: "#111111",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Luxury Minimal Centered Hero */}
      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#9E2A2B",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          💎
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          Acquire Premium
          <br />
          Domains with Confidence
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#666",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Escrow-protected transactions, transparent pricing, and a 72-hour
          inspection period. Buy premium domains the way they should be —
          safely and fairly.
        </p>
      </section>

      {/* 3-Step Vertical Flow */}
      <section
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {[
          {
            step: "1",
            title: "Discover & Evaluate",
            desc: "Browse curated premium domains with full 16-dimension intelligence reports. See ownership history, backlink profiles, and fair market valuation before you make an offer.",
          },
          {
            step: "2",
            title: "Negotiate & Transact",
            desc: "Make offers, counter-offers, and close deals securely through our escrow system. Funds are held until domain transfer is confirmed and verified.",
          },
          {
            step: "3",
            title: "Inspect & Confirm",
            desc: "72-hour inspection period after transfer. Verify the domain meets all expectations before the seller receives payment. Full refund if unsatisfied.",
          },
        ].map((s, i) => (
          <div
            key={s.step}
            style={{
              display: "flex",
              gap: 24,
              marginBottom: i < 2 ? 0 : 0,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "#9E2A2B",
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {s.step}
              </div>
              {i < 2 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: "#E8E5DF",
                    marginTop: 8,
                  }}
                />
              )}
            </div>
            <div style={{ paddingBottom: 40 }}>
              <h3
                style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Trust Signals */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              icon: "🔒",
              title: "Escrow Protection",
              desc: "Funds held securely in escrow until domain transfer is confirmed and verified by both parties.",
            },
            {
              icon: "⏰",
              title: "72-Hour Inspection",
              desc: "Full inspection period after transfer. Test the domain, verify records, and ensure it meets your needs.",
            },
            {
              icon: "💳",
              title: "Multiple Payment Options",
              desc: "Credit card, wire transfer, and cryptocurrency accepted. No hidden fees or conversion surprises.",
            },
          ].map((t) => (
            <div
              key={t.title}
              style={{
                backgroundColor: "#FFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{t.icon}</div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {t.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.6,
                }}
              >
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reveal Pricing Table */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Transparent Pricing
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          No hidden fees. You see the price — you pay the price.
        </p>
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            border: "1px solid #E8E5DF",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 15,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#111", color: "#FFF" }}>
                <th style={{ padding: "14px 24px", textAlign: "left" }}>
                  Fee Type
                </th>
                <th style={{ padding: "14px 24px", textAlign: "left" }}>
                  Amount
                </th>
                <th style={{ padding: "14px 24px", textAlign: "left" }}>
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "Reveal Fee (Standard)",
                  amount: "$5",
                  notes: "One-time per domain reveal",
                },
                {
                  type: "Reveal Fee (Priority)",
                  amount: "$10",
                  notes: "Expedited reveal with full report",
                },
                {
                  type: "Buyer Commission",
                  amount: "0%",
                  notes: "Buyers pay zero commission on Ceche",
                },
                {
                  type: "Escrow Fee",
                  amount: "Included",
                  notes: "No extra charge for escrow protection",
                },
              ].map((r, i) => (
                <tr
                  key={r.type}
                  style={{
                    borderTop: "1px solid #E8E5DF",
                    backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFF",
                  }}
                >
                  <td style={{ padding: "14px 24px", fontWeight: 600 }}>
                    {r.type}
                  </td>
                  <td
                    style={{
                      padding: "14px 24px",
                      fontWeight: 700,
                      color: "#9E2A2B",
                    }}
                  >
                    {r.amount}
                  </td>
                  <td style={{ padding: "14px 24px", color: "#666" }}>
                    {r.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#111",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#FFF",
            marginBottom: 16,
          }}
        >
          Buy Premium Domains Today
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            maxWidth: 500,
            margin: "0 auto 32px",
          }}
        >
          Secure, transparent transactions with escrow protection on every
          purchase.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/marketplace"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#9E2A2B",
              color: "#FFF",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Browse Marketplace
          </Link>
          <Link
            href="/pricing"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "transparent",
              color: "#F4A261",
              border: "2px solid #F4A261",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            View Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
