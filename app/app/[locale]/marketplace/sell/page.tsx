import { TrendingUp } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Seller Verification", desc: "TXT/CNAME domain verification to prove ownership" },
  { title: "Listing Calculator", desc: "Automated listing fees based on domain valuation" },
  { title: "Marketplace Exposure", desc: "List on Ceche marketplace and partner networks" },
  { title: "Payout Options", desc: "Weekly payouts via wire transfer or cryptocurrency" },
  { title: "Analytics Dashboard", desc: "Track views, offers, and conversion rates" },
  { title: "Bulk Listing", desc: "Import and manage multiple domain listings at once" },
];

export default function SellPage() {
  return (
    <ToolPageTemplate
      icon={TrendingUp}
      title="Sell Domains"
      subtitle="Submit domains with TXT/CNAME verification and automated listing fee calculator. Reach qualified buyers."
      features={features}
    />
  );
}
