import { Globe, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  const footerLinks = {
    products: [
      { label: t("links.domainAppraiser"), href: "/appraise" },
      { label: t("links.seoScanner"), href: "/tools/seo-scanner" },
      { label: t("links.extendedInsights"), href: "/tools/extended-insights" },
      { label: t("links.bulkAnalyzer"), href: "/tools/bulk-analyzer" },
      { label: t("links.apiAccess"), href: "/tools/api" },
    ],
    marketplace: [
      { label: t("links.curatedDomains"), href: "/marketplace/curated" },
      { label: t("links.tryYourLuck"), href: "/marketplace/try-your-luck" },
      { label: t("links.sellDomains"), href: "/marketplace/sell" },
      { label: t("links.howUnmaskingWorks"), href: "/marketplace/how-unmasking-works" },
    ],
    company: [
      { label: t("links.about"), href: "/company/about" },
      { label: t("links.affiliates"), href: "/company/affiliates" },
      { label: t("links.blog"), href: "/resources/blog" },
      { label: t("links.contact"), href: "/help/contact" },
    ],
    legal: [
      { label: t("links.terms"), href: "/legal/terms" },
      { label: t("links.privacy"), href: "/legal/privacy" },
      { label: t("links.cookies"), href: "/legal/cookies" },
    ],
  };

  return (
    <footer className="bg-slate text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="font-branded text-2xl font-bold tracking-tight text-white">Ceche</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
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
            <h4 className="font-semibold text-sm mb-4">{t("sections.products")}</h4>
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
            <h4 className="font-semibold text-sm mb-4">{t("sections.marketplace")}</h4>
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
            <h4 className="font-semibold text-sm mb-4">{t("sections.company")}</h4>
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
            <h4 className="font-semibold text-sm mb-4">{t("sections.legal")}</h4>
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
            &copy; {new Date().getFullYear()} Ceche. {t("copyright")}
          </p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>{t("platform")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
