import { Eye } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Deep Analysis", desc: "16-dimension intelligence report for any domain" },
  { title: "Ownership History", desc: "Complete WHOIS history and ownership transitions" },
  { title: "Backlink Profile", desc: "Detailed backlink analysis with quality scoring" },
  { title: "Traffic Estimates", desc: "Monthly traffic predictions based on SEO metrics" },
  { title: "Valuation Range", desc: "Algorithmic pricing with confidence intervals" },
  { title: "Risk Assessment", desc: "Trademark, spam, and penalty risk analysis" },
];

export default function ResearchIntelligencePage() {
  return (
    <ToolPageTemplate
      icon={Eye}
      title="Research Intelligence"
      subtitle="Deep domain analysis before acquisition. Make informed decisions with comprehensive intelligence reports."
      features={features}
    />
  );
}
