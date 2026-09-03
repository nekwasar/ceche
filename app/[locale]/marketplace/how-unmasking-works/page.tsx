const steps = [
  { num: "01", title: "Browse", desc: "Explore our blind marketplace. Full stats shown — domain name hidden. Filter by TLD, category, or valuation range." },
  { num: "02", title: "Pay to Reveal", desc: "When you find a listing you like, pay the reveal fee ($5–$50 based on domain value) to unlock the name." },
  { num: "03", title: "Reveal & Inspect", desc: "The domain name is revealed. You have 5 minutes to inspect and decide. No one else can see or purchase it." },
  { num: "04", title: "Recheck or Walk Away", desc: "If you pass, the domain goes back to the blind pool. If you proceed, it's locked exclusively for you." },
  { num: "05", title: "Complete or Walk Away", desc: "Register the domain through our partner registrars (Dynadot, Namecheap, Porkbun) or walk away. No obligation." },
];

export default function HowUnmaskingWorksPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">
            Marketplace
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#111] mb-4">
            How Unmasking Works
          </h1>
          <p className="text-base md:text-lg text-[#666] max-w-md">
            Our blind marketplace protects domain names from front-running and sniping. Here&apos;s the process.
          </p>
        </div>

        {/* Steps */}
        <section className="mb-16 md:mb-20">
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-5 md:gap-8 py-7 md:py-8 ${i < steps.length - 1 ? "border-b border-black/8" : ""}`}
              >
                <div className="w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-[#9E2A2B] text-white flex items-center justify-center text-lg md:text-xl font-bold font-mono shrink-0">
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg md:text-xl font-bold text-[#111] mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-[#666] m-0 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vault Protection */}
        <section className="bg-[#EFECE6] rounded-2xl p-6 md:p-8 lg:p-10 border border-black/5 mb-12 md:mb-16">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#047857] text-white flex items-center justify-center text-xl shrink-0">
              🛡
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111] mb-2">Vault Protection</h3>
              <p className="text-sm text-[#666] m-0 leading-relaxed">
                All unrevealed domain names are stored in an encrypted vault. No partial names, no asterisks, no hints. The only way to see the name is to pay the reveal fee. This eliminates domain front-running and ensures fair pricing for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
          {[
            { icon: "🔒", title: "Encrypted Vault", desc: "Domain names stored with zero-knowledge encryption." },
            { icon: "⏱", title: "5-Minute Lock", desc: "After reveal, you have 5 minutes of exclusive access." },
            { icon: "💰", title: "No Obligation", desc: "Walk away at any point. No commitment required." },
          ].map((item) => (
            <div key={item.title} className="bg-[#EFECE6] rounded-[14px] p-5 md:p-6 border border-black/5 text-center">
              <div className="text-[28px] mb-3">{item.icon}</div>
              <h4 className="text-sm font-bold text-[#111] mb-1.5">{item.title}</h4>
              <p className="text-xs text-[#666] m-0">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to explore?</h2>
          <p className="text-base text-white/60 mb-7">
            Browse thousands of premium domains with full intelligence data.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">
              Browse Marketplace
            </a>
            <a href="/marketplace/try-your-luck" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">
              Try Your Luck
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
