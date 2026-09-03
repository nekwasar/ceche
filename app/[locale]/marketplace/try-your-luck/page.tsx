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
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">
            Marketplace
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#111] mb-4">Try Your Luck</h1>
          <p className="text-base md:text-lg text-[#666] max-w-md mx-auto">
            Pick a TLD, spin 3 boxes, reveal a premium domain. It&apos;s locked exclusively for you.
          </p>
        </div>

        {/* TLD Selection */}
        {!revealed && (
          <section className="mb-8 md:mb-12 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-5 md:mb-6">
              Step 1: Pick Your TLD
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-3.5 max-w-[600px] mx-auto">
              {tldOptions.map((option) => (
                <button
                  key={option.tld}
                  onClick={() => setSelectedTld(option.tld)}
                  className={`py-5 md:py-7 px-3 md:px-4 rounded-2xl border-2 cursor-pointer text-center transition-all ${
                    selectedTld === option.tld
                      ? "border-[#9E2A2B] bg-[#EFECE6] shadow-[0_4px_12px_rgba(158,42,43,0.15)]"
                      : "border-black/8 bg-[#EFECE6] shadow-none"
                  }`}
                >
                  <div className="text-2xl md:text-[28px] font-bold text-[#111] mb-1">${option.price}</div>
                  <div className="text-sm font-mono text-[#666]">{option.tld}</div>
                  {option.sub && <div className="text-[11px] text-[#999] mt-1">{option.sub}</div>}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Spin Button */}
        {!revealed && selectedTld && (
          <div className="text-center mb-8 md:mb-12">
            <button
              onClick={handleSpin}
              disabled={spinning}
              className="inline-flex items-center gap-2.5 px-8 md:px-9 py-4 rounded-full font-semibold text-base border-none transition-colors disabled:cursor-not-allowed disabled:opacity-60 bg-[#9E2A2B] text-white"
            >
              {spinning ? (
                <>
                  <div className="w-[18px] h-[18px] border-2 border-[#999] border-t-transparent rounded-full animate-spin" />
                  Spinning...
                </>
              ) : (
                <>✨ Spin for ${selectedOption?.price}</>
              )}
            </button>
          </div>
        )}

        {/* Mystery Boxes */}
        {(spinning || revealed) && (
          <section className="mb-8 md:mb-12 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-5 md:mb-6">
              {spinning ? "Spinning..." : "Step 2: Pick a Box"}
            </h2>
            <div className="grid grid-cols-3 gap-4 md:gap-5 max-w-[500px] mx-auto">
              {boxes.map((box, i) => (
                <button
                  key={i}
                  onClick={() => revealed && handlePickBox(i)}
                  disabled={!revealed}
                  className="aspect-square rounded-2xl border-2 border-black/8 bg-[#EFECE6] cursor-default flex flex-col items-center justify-center gap-2 text-sm text-[#111] transition-all enabled:cursor-pointer enabled:border-[#9E2A2B]"
                >
                  {spinning ? (
                    <div className="w-7 h-7 border-2 border-[#999] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>📦</>
                  )}
                  {revealed && (
                    <span className="text-[11px] text-[#999]">Click to reveal</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Locked Notice */}
        {revealed && (
          <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-8 border border-black/5 max-w-[500px] mx-auto mb-12 md:mb-16 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-lg font-bold text-[#111] mb-2">Domain Locked</h3>
            <p className="text-sm text-[#666] m-0">
              Once you pick a box, the domain is locked exclusively for you. No other user on the platform can purchase it through any means. You&apos;ll be prompted to complete the purchase immediately.
            </p>
          </div>
        )}

        {/* How It Works */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6 md:mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 bg-[#EFECE6] rounded-2xl p-6 md:p-8 border border-black/5">
            {[
              { num: "1", title: "Pick a TLD", desc: "Choose .com, .net, .io, .co, or any TLD at a flat rate." },
              { num: "2", title: "Spin & Pick", desc: "Three closed boxes appear. Pick one when the animation stops." },
              { num: "3", title: "Reveal & Buy", desc: "Domain revealed and locked. Prompted to register immediately." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`py-4 md:py-4 text-center ${i < 2 ? "sm:border-r sm:border-black/8" : ""} ${i < 2 ? "border-b sm:border-b-0 border-black/8 pb-6 sm:pb-4 mb-4 sm:mb-0" : ""}`}
              >
                <div className="text-[28px] font-bold text-[#9E2A2B] mb-2">{step.num}</div>
                <h3 className="text-sm font-bold text-[#111] mb-1.5">{step.title}</h3>
                <p className="text-xs text-[#666] m-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 md:mt-16 bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Prefer browsing?</h2>
          <p className="text-base text-white/60 mb-7">
            Browse our full marketplace with detailed stats on every listing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">
              View Marketplace
            </a>
            <a href="/signup" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">
              Sign Up Free
            </a>
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-[20px] p-8 md:p-10 max-w-[420px] w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-2">Create an Account</h2>
            <p className="text-sm text-[#666] mb-6">Sign up to lock this domain exclusively for you.</p>
            <a href="/signup" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm no-underline mb-3">
              Sign Up Free
            </a>
            <div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-transparent border-none text-[#999] text-xs cursor-pointer mt-2"
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
