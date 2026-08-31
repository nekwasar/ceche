import { AlertTriangle, ArrowRight, Home } from "lucide-react";

export default function AppraisalLimitPage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-[#EFECE6] rounded-2xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-8 h-8" style={{ color: "#9E2A2B" }} />
        </div>

        <h1 className="text-2xl font-bold mb-4" style={{ color: "#111111" }}>
          Rate Limit Reached
        </h1>

        <p className="text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>
          This request didn&apos;t go through. You&apos;ve used all your free appraisals for today.
          Sign up to increase your rate limit and appraise more domains.
        </p>

        <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5 mb-8">
          <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "#999999" }}>
            Your current limits
          </p>
          <div className="space-y-2 text-sm" style={{ color: "#666666" }}>
            <div className="flex justify-between">
              <span>Not signed up</span>
              <span className="font-mono font-semibold" style={{ color: "#111111" }}>3/day</span>
            </div>
            <div className="flex justify-between">
              <span>Signed up (free)</span>
              <span className="font-mono font-semibold" style={{ color: "#111111" }}>12/day</span>
            </div>
            <div className="flex justify-between">
              <span>Premium Startup ($79/mo)</span>
              <span className="font-mono font-semibold" style={{ color: "#111111" }}>30/day</span>
            </div>
            <div className="flex justify-between">
              <span>Premium Enterprise ($129/mo)</span>
              <span className="font-mono font-semibold" style={{ color: "#111111" }}>Unlimited</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
          >
            Sign Up Free
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all border border-black text-black hover:bg-black hover:text-white"
          >
            <Home className="w-4 h-4" />
            Go Back Home
          </a>
        </div>
      </div>
    </main>
  );
}
