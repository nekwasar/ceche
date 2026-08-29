import { FileText } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Blog", desc: "Industry insights, guides, and domain news" },
  { title: "Case Studies", desc: "Success stories from domain investors and startups" },
  { title: "Market Reports", desc: "Weekly and monthly domain market analysis" },
  { title: "Webinars", desc: "Live sessions with domain industry experts" },
  { title: "Podcasts", desc: "Interviews with successful domain entrepreneurs" },
  { title: "Newsletters", desc: "Weekly digest of market trends and opportunities" },
];

export default function BlogPage() {
  return (
    <ToolPageTemplate
      icon={FileText}
      title="Blog"
      subtitle="Industry insights, guides, and domain news. Stay informed about the latest in domain intelligence."
      features={features}
    />
  );
}
