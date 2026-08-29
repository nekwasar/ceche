import { Database } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "TLD Registry", desc: "Comprehensive database of all gTLDs and ccTLDs" },
  { title: "Expiry Tracking", desc: "Monitor domain expiration dates across your portfolio" },
  { title: "Drop Lists", desc: "Daily lists of domains about to expire or drop" },
  { title: "Registrar Data", desc: "Registration counts and market share by registrar" },
  { title: "Price History", desc: "Historical registration and renewal pricing data" },
  { title: "Bulk Queries", desc: "Check thousands of domains in a single API call" },
];

export default function DomainDatabasePage() {
  return (
    <ToolPageTemplate
      icon={Database}
      title="Domain Database"
      subtitle="Comprehensive TLD registry and expiry tracking. Access the most complete domain data available."
      features={features}
      badge="Enterprise"
    />
  );
}
