import { Eye } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Historical Data", desc: "Wayback Machine snapshots and historical content changes over time" },
  { title: "DNS Records", desc: "Complete DNS record enumeration including A, MX, NS, TXT, and CNAME" },
  { title: "WHOIS / RDAP", desc: "Registration data, domain age, registrar history, and nameserver changes" },
  { title: "Trademark Checks", desc: "USPTO and WIPO trademark database conflict detection" },
  { title: "SSL Certificate", desc: "Certificate authority, expiry dates, and chain verification" },
  { title: "Server Intelligence", desc: "Hosting provider, IP geolocation, and technology stack detection" },
];

export default function ExtendedInsightsPage() {
  return (
    <ToolPageTemplate
      icon={Eye}
      title="Extended Insights"
      subtitle="Deep historical data, DNS records, USPTO/WIPO trademark checks, and WHOIS/RDAP logs for comprehensive domain research."
      features={features}
      badge="Premium"
    />
  );
}
