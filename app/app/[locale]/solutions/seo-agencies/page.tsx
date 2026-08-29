import { BarChart3 } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Expired Domain Authority", desc: "Evaluate backlink profiles of expired domains for acquisition" },
  { title: "Spam Recovery Audits", desc: "Identify and recover from Google penalties with detailed analysis" },
  { title: "Backlink Quality", desc: "Dofollow/nofollow ratio, anchor text distribution, and link velocity" },
  { title: "Content Analysis", desc: "Historical content quality and topical relevance assessment" },
  { title: "Competitor Backlinks", desc: "Discover link building opportunities from competitor profiles" },
  { title: "Reporting Dashboard", desc: "White-label reports for client presentations and team collaboration" },
];

export default function SeoAgenciesPage() {
  return (
    <ToolPageTemplate
      icon={BarChart3}
      title="SEO Agencies"
      subtitle="Expired domain backlink authority scoring and spam penalty recovery audits. Data-driven domain acquisition for agency growth."
      features={features}
    />
  );
}
