import { LucideIcon } from "lucide-react";

interface ToolPageProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  features: { title: string; desc: string }[];
  badge?: string;
}

export function ToolPageTemplate({ icon: Icon, title, subtitle, features, badge }: ToolPageProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-brand/10 rounded-full px-4 py-1.5 mb-6 border border-brand/20">
              <span className="text-brand text-xs font-medium">{badge}</span>
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate tracking-tight">{title}</h1>
          </div>
          <p className="text-lg text-slate-muted leading-relaxed">{subtitle}</p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate/5 hover:border-brand/20 transition-colors">
              <h3 className="font-semibold text-slate mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl border border-slate/5 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-slate">Coming Soon</span>
          </div>
          <p className="text-slate-muted">
            This feature is under active development. Join the waitlist to get early access.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:max-w-sm bg-canvas rounded-lg px-4 py-3 text-sm border border-slate/10 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
            />
            <button className="cta-button">Join Waitlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
