import { Clock } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Product Updates", desc: "New features, improvements, and bug fixes" },
  { title: "API Changes", desc: "Deprecations, breaking changes, and migration guides" },
  { title: "Performance", desc: "Speed improvements, uptime reports, and infrastructure updates" },
  { title: "Security", desc: "Security patches, vulnerability disclosures, and compliance updates" },
  { title: "Integrations", desc: "New third-party integrations and partner announcements" },
  { title: "Roadmap", desc: "Upcoming features and development priorities" },
];

export default function ChangelogPage() {
  return (
    <ToolPageTemplate
      icon={Clock}
      title="Changelog"
      subtitle="Product updates and new feature releases. Stay informed about what's new in Ceche."
      features={features}
    />
  );
}
