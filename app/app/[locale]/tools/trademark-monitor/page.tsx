import { Shield } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "USPTO Monitoring", desc: "Real-time monitoring of USPTO trademark applications" },
  { title: "EUIPO Checks", desc: "European Union Intellectual Property Office database screening" },
  { title: "WIPO Database", desc: "World Intellectual Property Organization global trademark search" },
  { title: "Conflict Alerts", desc: "Instant notifications when similar trademarks are filed" },
  { title: "Risk Scoring", desc: "Trademark conflict risk assessment with confidence levels" },
  { title: "Legal Resources", desc: "Connect with trademark attorneys for formal opinions" },
];

export default function TrademarkMonitorPage() {
  return (
    <ToolPageTemplate
      icon={Shield}
      title="Trademark Monitor"
      subtitle="USPTO/WIPO conflict detection and alerts. Protect your brand with proactive trademark monitoring."
      features={features}
      badge="Premium"
    />
  );
}
