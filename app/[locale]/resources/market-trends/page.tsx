import { LineChart } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Sales Database", desc: "Real-time domain sales data from major registrars and marketplaces" },
  { title: "Price Trends", desc: "Historical pricing trends by TLD, category, and industry" },
  { title: "Market Reports", desc: "Weekly and monthly market analysis with expert commentary" },
  { title: "Category Analysis", desc: "Deep dives into specific verticals: tech, finance, health, etc." },
  { title: "Investment Signals", desc: "AI-powered alerts for emerging domain trends and opportunities" },
  { title: "Export Data", desc: "Download market data as CSV or JSON for your own analysis" },
];

export default function MarketTrendsPage() {
  return (
    <ToolPageTemplate
      icon={LineChart}
      title="Market Trends"
      subtitle="Real-time sales database and domain market data trends. Stay informed about the latest domain industry developments."
      features={features}
    />
  );
}
