import { FileText } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Getting Started", desc: "Step-by-step guides to set up your account and start using Ceche" },
  { title: "API Documentation", desc: "Complete REST API reference with code examples in multiple languages" },
  { title: "Video Tutorials", desc: "Walkthrough videos for every feature and workflow" },
  { title: "FAQ", desc: "Answers to the most common questions about our platform" },
  { title: "Community Forum", desc: "Connect with other users, share tips, and get help" },
  { title: "Status Page", desc: "Real-time system status and incident history" },
];

export default function HelpCenterPage() {
  return (
    <ToolPageTemplate
      icon={FileText}
      title="Help Center"
      subtitle="Documentation, FAQs, and getting started guides. Everything you need to make the most of Ceche."
      features={features}
    />
  );
}
