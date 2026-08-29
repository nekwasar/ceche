import { Globe } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "RESTful API", desc: "Full access to all domain intelligence endpoints" },
  { title: "Webhooks", desc: "Real-time notifications for domain changes and events" },
  { title: "Rate Limits", desc: "Generous rate limits with burst capacity" },
  { title: "Documentation", desc: "Complete API reference with code examples" },
  { title: "SDKs", desc: "Official libraries for Python, Node.js, Go, and Ruby" },
  { title: "Sandbox", desc: "Test environment for development and integration testing" },
];

export default function ApiPage() {
  return (
    <ToolPageTemplate
      icon={Globe}
      title="API Access"
      subtitle="RESTful API for programmatic domain intelligence. Build custom integrations and workflows."
      features={features}
      badge="Developer"
    />
  );
}
