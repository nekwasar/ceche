"use client";

import { useState } from "react";

const tldOptions = [
  { tld: ".com", price: 79 },
  { tld: ".net", price: 39 },
  { tld: ".io", price: 29 },
  { tld: ".co", price: 9 },
  { tld: "Any", price: 19, sub: "flat rate" },
];

export default function TryYourLuckPage() {
  const [selectedTld, setSelectedTld] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [boxes, setBoxes] = useState<string[]>(["?", "?", "?"]);
  const [showModal, setShowModal] = useState(false);

  const selectedOption = tldOptions.find((o) => o.tld === selectedTld);

  const handleSpin = () => {
    if (!selectedTld) return;
    setSpinning(true);
    setRevealed(false);
    setBoxes(["?", "?", "?"]);

    setTimeout(() => {
      setSpinning(false);
      setRevealed(true);
      setBoxes(["cloudops.com", "dataflow.io", "zenstudio.net"]);
    }, 3000);
  };

  const handlePickBox = (index: number) => {
    setShowModal(true);
  };

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
              display: "block",
              marginBottom: 12,
            }}
          >
            Marketplace
          </span>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: "#111111", marginBottom: 16 }}>
            Try Your Luck
          </h1>
          <p style={{ fontSize: 18, color: "#666666", maxWidth: 480, margin: "0 auto" }}>
            Pick a TLD, spin 3 boxes, reveal a premium domain. It's locked exclusively for you.
          </p>
        </div>

        {!revealed && (
          <section style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 24 }}>
              Step 1: Pick Your TLD
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, maxWidth: 600, margin: "0 auto" }}>
              {tldOptions.map((option) => (
                <button
                  key={option.tld}
                  onClick={() => setSelectedTld(option.tld)}
                  style={{
                    padding: "28px 16px",
                    borderRadius: 16,
                    border: `2px solid ${selectedTld === option.tld ? "#9E2A2B" : "rgba(0,0,0,0.08)"}`,
                    backgroundColor: selectedTld === option.tld ? "#EFECE6" : "#EFECE6",
                    cursor: "pointer",
                    textAlign: "center",
                    boxShadow: selectedTld === option.tld ? "0 4px 12px rgba(158,42,43,0.15)" : "none",
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 4 }}>
                    ${option.price}
                  </div>
                  <div style={{ fontSize: 14, fontFamily: "monospace", color: "#666666" }}>
                    {option.tld}
                  </div>
                  {option.sub && (
                    <div style={{ fontSize: 11, color: "#999999", marginTop: 4 }}>
                      {option.sub}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {!revealed && selectedTld && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <button
              onClick={handleSpin}
              disabled={spinning}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 36px",
                borderRadius: 28,
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: spinning ? "not-allowed" : "pointer",
                backgroundColor: spinning ? "#EFECE6" : "#9E2A2B",
                color: spinning ? "#999999" : "white",
              }}
            >
              {spinning ? (
                <>
                  <div style={{ width: 18, height: 18, border: "2px solid #999999", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  Spinning...
                </>
              ) : (
                <>✨ Spin for ${selectedOption?.price}</>
              )}
            </button>
          </div>
        )}

        {(spinning || revealed) && (
          <section style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 24 }}>
              {spinning ? "Spinning..." : "Step 2: Pick a Box"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 500, margin: "0 auto" }}>
              {boxes.map((box, i) => (
                <button
                  key={i}
                  onClick={() => revealed && handlePickBox(i)}
                  disabled={!revealed}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 16,
                    border: `2px solid ${revealed ? "#9E2A2B" : "rgba(0,0,0,0.08)"}`,
                    backgroundColor: "#EFECE6",
                    cursor: revealed ? "pointer" : "default",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "#111111",
                    transition: "all 0.2s",
                  }}
                >
                  {spinning ? (
                    <div style={{ width: 28, height: 28, border: "2px solid #999999", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  ) : revealed ? (
                    <>📦</>
                  ) : (
                    <>📦</>
                  )}
                  {revealed && (
                    <span style={{ fontSize: 11, color: "#999999" }}>Click to reveal</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {revealed && (
          <div
            style={{
              backgroundColor: "#EFECE6",
              borderRadius: 16,
              padding: 32,
              border: "1px solid rgba(0,0,0,0.05)",
              maxWidth: 500,
              margin: "0 auto 64px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
              Domain Locked
            </h3>
            <p style={{ fontSize: 14, color: "#666666", margin: 0 }}>
              Once you pick a box, the domain is locked exclusively for you. No other user on the platform can purchase it through any means. You'll be prompted to complete the purchase immediately.
            </p>
          </div>
        )}

        <section>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111111", marginBottom: 32, textAlign: "center" }}>
            How It Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, backgroundColor: "#EFECE6", borderRadius: 16, padding: 32, border: "1px solid rgba(0,0,0,0.05)" }}>
            {[
              { num: "1", title: "Pick a TLD", desc: "Choose .com, .net, .io, .co, or any TLD at a flat rate." },
              { num: "2", title: "Spin & Pick", desc: "Three closed boxes appear. Pick one when the animation stops." },
              { num: "3", title: "Reveal & Buy", desc: "Domain revealed and locked. Prompted to register immediately." },
            ].map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: "16px 24px",
                  borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: "#9E2A2B", marginBottom: 8 }}>{step.num}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 64,
            backgroundColor: "#111111",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Prefer browsing?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
            Browse our full marketplace with detailed stats on every listing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <a
              href="/marketplace"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#F4A261",
                color: "#111111",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              View Marketplace
            </a>
            <a
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Sign Up Free
            </a>
          </div>
        </section>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 40,
              maxWidth: 420,
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
              Create an Account
            </h2>
            <p style={{ fontSize: 14, color: "#666666", marginBottom: 24 }}>
              Sign up to lock this domain exclusively for you.
            </p>
            <a
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#9E2A2B",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                marginBottom: 12,
              }}
            >
              Sign Up Free
            </a>
            <div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999999",
                  fontSize: 13,
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
