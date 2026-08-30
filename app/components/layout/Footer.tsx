import { Globe, ExternalLink } from "lucide-react";

const footerLinks = {
  products: [
    { label: "Domain Appraiser", href: "/tools/appraisal" },
    { label: "SEO Scanner", href: "/tools/seo-scanner" },
    { label: "Extended Insights", href: "/tools/extended-insights" },
    { label: "Bulk Analyzer", href: "/tools/bulk-analyzer" },
    { label: "API Access", href: "/tools/api" },
  ],
  marketplace: [
    { label: "Curated Domains", href: "/marketplace/curated" },
    { label: "Try Your Luck", href: "/marketplace/try-your-luck" },
    { label: "Sell Domains", href: "/marketplace/sell" },
    { label: "How Unmasking Works", href: "/marketplace/how-unmasking-works" },
  ],
  company: [
    { label: "About", href: "/company/about" },
    { label: "Careers", href: "/company/careers" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Contact", href: "/resources/contact" },
  ],
  legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="font-bold text-xl tracking-tight text-white">Ceche</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Enterprise-grade domain intelligence and marketplace platform.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="text-white/40 hover:text-accent transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              {footerLinks.marketplace.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Ceche. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>Domain Intelligence Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
