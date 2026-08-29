import { Globe } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Smart Suggestions", desc: "AI-powered domain name suggestions based on your business description" },
  { title: "TLD Comparison", desc: "Compare available extensions across .com, .net, .io, .co, and more" },
  { title: "Availability Check", desc: "Real-time availability checks across major registrars" },
  { title: "Price Comparison", desc: "Compare registration prices from multiple registrars" },
  { title: "Batch Search", desc: "Check availability for multiple domain variations at once" },
  { title: "Expiry Tracking", desc: "Monitor expiring domains and set acquisition alerts" },
];

export default function FindAvailablePage() {
  return (
    <ToolPageTemplate
      icon={Globe}
      title="Find Available Domains"
      subtitle="Scan millions of combinations for available domain names. Smart suggestions and real-time availability checks."
      features={features}
    />
  );
}
