import Link from "next/link";

export default function StartupFoundersPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <span className="inline-block px-3.5 py-1.5 bg-[#F4A261] text-[#111] rounded-md text-xs font-bold tracking-wider uppercase mb-5">
          For Founders
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold leading-tight mb-4">
          Build Your Brand
          <br />
          on the Right Domain
        </h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl mx-auto">
          AI-powered brandability scoring, pronounceability analysis, and
          trademark screening — everything you need before you commit to a name.
        </p>
      </section>

      {/* 3-Step Process */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { num: "1", title: "Describe Your Brand", desc: "Enter a brief description of your startup, industry, and audience." },
            { num: "2", title: "Score & Compare", desc: "Get 16-dimension scores across 4 TLDs with brandability ratings." },
            { num: "3", title: "Claim Your Domain", desc: "Register, buy on marketplace, or set alerts for expiring names." },
          ].map((s, i) => (
            <div key={s.num} className="relative">
              <div className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-7 text-center">
                <div className="w-11 h-11 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-base mb-3.5">
                  {s.num}
                </div>
                <h3 className="text-base font-bold mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{s.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 text-2xl text-[#ccc] z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Alternating Feature Rows */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {[
          { title: "Brandability Index", desc: "AI-powered scoring that evaluates brandability, memorability, and market potential. Not just a name — a brand asset.", icon: "🏷️" },
          { title: "Pronounceability", desc: "Vowel balance, consonant clusters, and bigram frequency analysis ensure your domain is easy to say, spell, and remember.", icon: "🗣️" },
          { title: "Extension Penetration", desc: "Compare .com, .io, .co, and .ai with market penetration rates. Know which TLD fits your audience before committing.", icon: "🌐" },
          { title: "Social Availability", desc: "Check username availability across major platforms alongside your domain search. Secure the full brand identity in one pass.", icon: "📱" },
        ].map((f, i) => (
          <div
            key={f.title}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center mb-10 md:mb-12`}
          >
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-sm md:text-base text-[#666] leading-relaxed">{f.desc}</p>
            </div>
            <div className="flex-1 w-full h-40 md:h-48 bg-white border border-[#E8E5DF] rounded-xl flex items-center justify-center text-[40px] md:text-[48px]">
              {f.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Built for Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Competitor Naming", desc: "Analyze naming patterns in your industry for competitive insights." },
            { title: "Trademark Risk", desc: "USPTO and WIPO database screening before brand commitment." },
            { title: "Appraisal Tool", desc: "Get algorithmic valuations with confidence intervals." },
            { title: "SEO Scanner", desc: "Evaluate backlink profiles of potential domains instantly." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-6">
              <h4 className="text-base font-bold mb-1.5">{f.title}</h4>
              <p className="text-sm text-[#666] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">Find Your Brand Domain</h2>
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-8">
          Start with a free account. Score unlimited domains across 4 TLDs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">
            Create Free Account
          </Link>
          <Link href="/tools/appraisal" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">
            Try Appraisal Tool
          </Link>
        </div>
      </section>
    </main>
  );
}
