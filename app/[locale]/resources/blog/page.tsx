"use client";

export default function BlogPage() {
  const articles = [
    { date: "Aug 28, 2026", title: "Why Premium .com Domains Still Outperform New gTLDs" },
    { date: "Aug 21, 2026", title: "The Hidden ROI of Portfolio Health Scores" },
    { date: "Aug 14, 2026", title: "5 Red Flags in Domain Appraisals You're Ignoring" },
    { date: "Aug 07, 2026", title: "How to Price a Domain Without Guessing" },
    { date: "Jul 31, 2026", title: "Blind Auctions vs. Fixed Listings: A Data Comparison" },
    { date: "Jul 24, 2026", title: "Building a Domain Reselling Workflow from Scratch" },
  ];

  const categories = ["Strategy", "Market Data", "Tutorials", "Industry News", "Case Studies"];

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="flex-[5] min-w-0">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#9E2A2B] mb-4">
              Ceche Blog
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#111] leading-tight font-[Georgia,serif] m-0">
              Domain intelligence, decoded.
            </h1>
            <p className="text-base md:text-lg text-[#666] leading-relaxed mt-5 max-w-md">
              Strategy guides, market analysis, and frameworks for domain investors who trade on data—not intuition.
            </p>
          </div>

          <div className="flex-[2] min-w-[180px] pt-2">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">
              Topics
            </span>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <span key={cat} className="text-sm text-[#9E2A2B] cursor-pointer font-medium border-b border-transparent hover:border-[#9E2A2B] transition-colors">
                  {cat} →
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-[#EFECE6] py-3.5 mb-12 md:mb-15 border-y border-[#E8E5DE]">
        <div className="flex gap-[60px] whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-xs text-[#999] tracking-[2px] uppercase font-mono">
              Domain Valuations · Market Reports · Portfolio Analytics · Blind Marketplace · 16-Dimension Framework · Health Scores · CPC Data · Brandability Index · Try Your Luck ·
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Article Grid */}
      <section className="pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((a, i) => (
              <a key={i} href="#" className="block py-7 md:py-8 border-t border-[#E8E5DE] no-underline text-[#111]">
                <span className="block text-xs text-[#999] font-mono mb-3">{a.date}</span>
                <h2 className="text-xl md:text-[26px] font-bold leading-snug m-0 text-[#111]">{a.title}</h2>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Want the full library?</h2>
          <p className="text-base text-[#999] mb-8">Download our ebooks and go deeper on domain investing.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/resources/ebooks" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">
              Browse Ebooks →
            </a>
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
