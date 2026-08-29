import { Layers } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Batch Processing", desc: "Evaluate up to 1,000 domains simultaneously with parallel processing" },
  { title: "CSV Export", desc: "Download results as CSV with all 16 dimensions and pricing data" },
  { title: "Custom Scoring", desc: "Weight dimensions based on your specific use case and priorities" },
  { title: "Portfolio Analysis", desc: "Aggregate metrics across your entire domain portfolio" },
  { title: "API Integration", desc: "Programmatic access via RESTful API with webhook callbacks" },
  { title: "Priority Queue", desc: "Enterprise users get expedited processing with dedicated resources" },
];

export default function BulkAnalyzerPage() {
  return (
    <ToolPageTemplate
      icon={Layers}
      title="Bulk Analyzer"
      subtitle="Multi-domain batch evaluation tool for portfolio analysis and large-scale domain research. Process thousands of domains in seconds."
      features={features}
      badge="Enterprise"
    />
  );
}
