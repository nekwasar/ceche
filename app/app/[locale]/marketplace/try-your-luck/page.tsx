"use client";

import { useState } from "react";
import { ArrowRight, Box, Sparkles, Lock } from "lucide-react";

const tldOptions = [
  { tld: ".com", price: 79, color: "#9E2A2B" },
  { tld: ".net", price: 39, color: "#111111" },
  { tld: ".io", price: 29, color: "#111111" },
  { tld: ".co", price: 9, color: "#111111" },
  { tld: "Any", price: 19, color: "#111111", sub: "flat rate" },
];

export default function TryYourLuckPage() {
  const [selectedTld, setSelectedTld] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [boxes, setBoxes] = useState<string[]>(["?", "?", "?"]);

  const selectedOption = tldOptions.find((o) => o.tld === selectedTld);

  const handleSpin = () => {
    if (!selectedTld) return;
    setSpinning(true);
    setRevealed(false);
    setBoxes(["?", "?", "?"]);

    // Simulate spinning animation
    setTimeout(() => {
      setSpinning(false);
      setRevealed(true);
      // In production, this would be the actual revealed domain
      setBoxes(["cloudops.com", "dataflow.io", "zenstudio.net"]);
    }, 3000);
  };

  const handlePickBox = (index: number) => {
    // In production, this would lock the domain and prompt payment
    alert(`You picked: ${boxes[index]}. In production, this would lock the domain and prompt payment.`);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
            Try Your Luck
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#666666" }}>
            Pick a TLD, spin 3 boxes, reveal a premium domain. It&apos;s locked exclusively for you.
          </p>
        </div>

        {/* TLD Selection */}
        {!revealed && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "#111111" }}>
              Step 1: Pick Your TLD
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {tldOptions.map((option) => (
                <button
                  key={option.tld}
                  onClick={() => setSelectedTld(option.tld)}
                  className={`rounded-2xl p-6 border-2 transition-all text-center ${
                    selectedTld === option.tld
                      ? "border-[#9E2A2B] bg-[#EFECE6] shadow-lg"
                      : "border-black/10 bg-[#EFECE6] hover:border-black/30"
                  }`}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: option.color }}>
                    ${option.price}
                  </div>
                  <div className="text-sm font-mono" style={{ color: "#666666" }}>
                    {option.tld}
                  </div>
                  {option.sub && (
                    <div className="text-xs mt-1" style={{ color: "#999999" }}>
                      {option.sub}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spin Button */}
        {!revealed && selectedTld && (
          <div className="text-center mb-12">
            <button
              onClick={handleSpin}
              disabled={spinning}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base transition-all ${
                spinning
                  ? "bg-[#EFECE6] text-[#999999] cursor-not-allowed"
                  : "bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
              }`}
            >
              {spinning ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#999999] border-t-transparent rounded-full animate-spin" />
                  Spinning...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Spin for ${selectedOption?.price}
                </>
              )}
            </button>
          </div>
        )}

        {/* Boxes */}
        {(spinning || revealed) && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "#111111" }}>
              {spinning ? "Spinning..." : "Step 2: Pick a Box"}
            </h2>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {boxes.map((box, i) => (
                <button
                  key={i}
                  onClick={() => revealed && handlePickBox(i)}
                  disabled={!revealed}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                    revealed
                      ? "border-[#9E2A2B] bg-[#EFECE6] hover:bg-[#9E2A2B] hover:text-white cursor-pointer group"
                      : "border-black/10 bg-[#EFECE6] cursor-default"
                  }`}
                >
                  {spinning ? (
                    <div className="w-8 h-8 border-2 border-[#999999] border-t-transparent rounded-full animate-spin" />
                  ) : revealed ? (
                    <>
                      <Box className="w-8 h-8 mb-2 group-hover:text-white transition-colors" style={{ color: "#111111" }} />
                      <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "inherit" }}>
                        Click to reveal
                      </span>
                    </>
                  ) : (
                    <Box className="w-8 h-8" style={{ color: "#999999" }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lock Info */}
        {revealed && (
          <div className="bg-[#EFECE6] rounded-2xl p-8 border border-black/5 max-w-2xl mx-auto text-center">
            <Lock className="w-8 h-8 mx-auto mb-4" style={{ color: "#047857" }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>
              Domain Locked
            </h3>
            <p className="text-sm" style={{ color: "#666666" }}>
              Once you pick a box, the domain is locked exclusively for you. No other user on the platform can purchase it through any means. You&apos;ll be prompted to complete the purchase immediately.
            </p>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "#111111" }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-0 bg-[#EFECE6] rounded-2xl p-8 border border-black/5">
            <div className="md:border-r border-black/10 md:pr-8 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="text-3xl font-bold mb-2" style={{ color: "#9E2A2B" }}>1</div>
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>Pick a TLD</h3>
              <p className="text-sm" style={{ color: "#666666" }}>Choose .com, .net, .io, .co, or any TLD at a flat rate.</p>
            </div>
            <div className="md:px-8 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="text-3xl font-bold mb-2" style={{ color: "#9E2A2B" }}>2</div>
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>Spin & Pick</h3>
              <p className="text-sm" style={{ color: "#666666" }}>Three closed boxes appear. Pick one when the animation stops.</p>
            </div>
            <div className="md:pl-8">
              <div className="text-3xl font-bold mb-2" style={{ color: "#9E2A2B" }}>3</div>
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>Reveal & Buy</h3>
              <p className="text-sm" style={{ color: "#666666" }}>Domain revealed and locked. Prompted to register immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
