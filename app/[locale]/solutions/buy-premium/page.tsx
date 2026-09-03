import Link from "next/link";

export default function BuyPremiumPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#9E2A2B] inline-flex items-center justify-center text-[28px] mb-6">
          💎
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
          Acquire Premium
          <br />
          Domains with Confidence
        </h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-lg mx-auto">
          Secure checkout, transparent pricing, and a 72-hour
          inspection period. Buy premium domains the way they should be —
          safely and fairly.
        </p>
      </section>

      {/* 3-Step Vertical Flow */}
      <section className="max-w-2xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        {[
          { step: "1", title: "Discover & Evaluate", desc: "Browse curated premium domains with full 16-dimension intelligence reports. See ownership history, backlink profiles, and fair market valuation before you make an offer." },
            { step: "2", title: "Negotiate & Transact", desc: "Make offers, counter-offers, and close deals securely. Payment is processed safely until domain transfer is confirmed and verified." },
          { step: "3", title: "Inspect & Confirm", desc: "72-hour inspection period after transfer. Verify the domain meets all expectations before the seller receives payment. Full refund if unsatisfied." },
        ].map((s, i) => (
          <div key={s.step} className="flex gap-5 md:gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#9E2A2B] text-white flex items-center justify-center font-bold text-base shrink-0">
                {s.step}
              </div>
              {i < 2 && (
                <div className="w-0.5 flex-1 bg-[#E8E5DF] mt-2" />
              )}
            </div>
            <div className="pb-8 md:pb-10">
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Trust Signals */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { icon: "🔒", title: "Secure Checkout", desc: "Payment processed securely until domain transfer is confirmed and verified by both parties." },
            { icon: "⏰", title: "72-Hour Inspection", desc: "Full inspection period after transfer. Test the domain, verify records, and ensure it meets your needs." },
            { icon: "💳", title: "Multiple Payment Options", desc: "Credit card, wire transfer, and cryptocurrency accepted. No hidden fees or conversion surprises." },
          ].map((t) => (
            <div key={t.title} className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-8 text-center">
              <div className="text-4xl mb-4">{t.icon}</div>
              <h3 className="text-base font-bold mb-2">{t.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-3">Transparent Pricing</h2>
        <p className="text-base text-[#666] text-center mb-8">No hidden fees. You see the price — you pay the price.</p>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#111] text-white">
                  <th className="py-3.5 px-5 text-left font-bold">Fee Type</th>
                  <th className="py-3.5 px-5 text-left font-bold">Amount</th>
                  <th className="py-3.5 px-5 text-left font-bold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Reveal Fee (Standard)", amount: "$5", notes: "One-time per domain reveal" },
                  { type: "Reveal Fee (Priority)", amount: "$10", notes: "Expedited reveal with full report" },
                  { type: "Buyer Commission", amount: "0%", notes: "Buyers pay zero commission on Ceche" },
                  { type: "Transaction Fee", amount: "Included", notes: "No extra charge for secure checkout" },
                ].map((r, i) => (
                  <tr key={r.type} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}>
                    <td className="py-3.5 px-5 font-semibold">{r.type}</td>
                    <td className="py-3.5 px-5 font-bold text-[#9E2A2B]">{r.amount}</td>
                    <td className="py-3.5 px-5 text-[#666]">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">Buy Premium Domains Today</h2>
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-8">
          Secure, transparent transactions with secure checkout on every purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/marketplace" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">
            Browse Marketplace
          </Link>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">
            View Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
