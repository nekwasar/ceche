import { BarChart3 } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "DA & PA Scoring", desc: "Domain Authority and Page Authority metrics with historical trends" },
  { title: "Backlink Profile", desc: "Complete backlink analysis with referring domains and anchor text distribution" },
  { title: "Spam Score", desc: "Machine learning spam detection with penalty risk assessment" },
  { title: "Indexation Status", desc: "Search engine indexation checks across Google, Bing, and Yandex" },
  { title: "Technical SEO", desc: "Core Web Vitals, mobile-friendliness, and structured data analysis" },
  { title: "Competitor Analysis", desc: "Compare domain metrics against top competitors in your niche" },
];

export default function SeoScannerPage() {
  return (
    <ToolPageTemplate
      icon={BarChart3}
      title="SEO Scanner"
      subtitle="Free domain and SEO audit with DA, spam score, backlink profiles, and indexation status. Get instant insights into any domain's search engine health."
      features={features}
      badge="Free Tool"
    />
  );
}
