import { TrendingUp } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Portfolio Yield", desc: "Track ROI across your entire domain portfolio with analytics dashboard" },
  { title: "Flipper Metrics", desc: "Buy low, sell high with price history and market trend predictions" },
  { title: "Drop-Catching Alerts", desc: "Get notified when high-value domains are about to expire" },
  { title: "Market Comparables", desc: "See similar domain sales and valuation benchmarks" },
  { title: "Tax Reporting", desc: "Automated capital gains calculations and exportable tax reports" },
  { title: "Bulk Listing", desc: "List multiple domains across marketplaces with one-click syndication" },
];

export default function DomainInvestorsPage() {
  return (
    <ToolPageTemplate
      icon={TrendingUp}
      title="Domain Investors"
      subtitle="Portfolio yield analysis, flipper valuation metrics, and drop-catching alerts. Maximize returns on your domain investments."
      features={features}
    />
  );
}
