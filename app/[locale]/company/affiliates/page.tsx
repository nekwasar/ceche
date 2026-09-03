"use client";

export default function AffiliatesPage() {
  const benefits = [
    { title: "30% Recurring Commission", desc: "Earn on every paying customer you refer—for as long as they stay subscribed. No caps, no limits." },
    { title: "90-Day Cookie Window", desc: "Your referral link tracks visitors for 90 days. Even if they come back weeks later, you still get credit." },
    { title: "Real-Time Dashboard", desc: "Track clicks, signups, and earnings in real time. No guessing, no waiting for monthly reports." },
    { title: "Dedicated Affiliate Support", desc: "Get priority access to our affiliate team. Custom landing pages, promo assets, and campaign guidance." },
    { title: "Instant Payouts", desc: "Get paid monthly via bank transfer or PayPal. No minimum threshold. No delays." },
    { title: "Free Premium Access", desc: "Active affiliates get a free Ceche Pro account. Use the product, sell the product, believe in the product." },
  ];

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden bg-gradient-to-br from-[#9E2A2B] via-[#7A1F21] to-[#111]">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,162,97,0.2) 0%, transparent 60%)" }} />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#F4A261] mb-4">
            Ceche Affiliates
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-tight mx-auto mb-5 max-w-lg">
            Earn by referring domain investors
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md mx-auto mb-8 md:mb-9">
            Join our affiliate program, share Ceche with your network, and earn recurring commissions on every customer you refer.
          </p>

          {/* Timeline */}
          <div className="flex justify-center items-center gap-0 mt-5 flex-wrap">
            {[
              { step: "1", label: "Sign up" },
              { step: "2", label: "Share link" },
              { step: "3", label: "Earn 30%" },
            ].map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F4A261] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#111]">{s.step}</span>
                  </div>
                  <span className="text-xs text-white/70 mt-2 whitespace-nowrap">{s.label}</span>
                </div>
                {i < 2 && (
                  <div className="w-16 md:w-20 h-0.5 bg-[#F4A261]/40 mx-2 mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {benefits.map((b, i) => (
            <div key={i} className={`flex flex-col sm:flex-row gap-5 md:gap-8 items-start py-8 md:py-9 ${i < benefits.length - 1 ? "border-b border-[#E8E5DE]" : ""}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#9E2A2B]" : "bg-[#EFECE6]"}`}>
                <span className={`text-sm font-bold ${i % 2 === 0 ? "text-white" : "text-[#9E2A2B]"}`}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex-1 min-w-[280px]">
                <h3 className="text-lg font-bold text-[#111] m-0 mb-2">{b.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed m-0">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Start earning today</h2>
          <p className="text-base text-[#999] mb-8">Sign up for the affiliate program and start referring in minutes.</p>
          <a href="https://affiliates.ceche.net/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F4A261] text-[#111] font-bold text-sm no-underline mb-6">
            Join Affiliate Program →
          </a>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/70 font-medium text-xs no-underline">
              View Pricing
            </a>
            <a href="/help/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/70 font-medium text-xs no-underline">
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
