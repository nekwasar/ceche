import { Users } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "General Inquiries", desc: "Questions about our platform, features, or company" },
  { title: "Sales & Partnerships", desc: "Enterprise plans, custom integrations, and business development" },
  { title: "Technical Support", desc: "Help with account issues, API problems, or billing" },
  { title: "Press & Media", desc: "Interview requests, press kits, and media inquiries" },
  { title: "Bug Reports", desc: "Report issues or suggest improvements to the platform" },
  { title: "Office Location", desc: "Remote-first company with team members worldwide" },
];

export default function ContactPage() {
  return (
    <ToolPageTemplate
      icon={Users}
      title="Contact"
      subtitle="Reach our team for support, partnerships, or general inquiries. We typically respond within 24 hours."
      features={features}
    />
  );
}
