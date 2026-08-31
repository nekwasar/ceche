import { DollarSign } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Listing Fees", desc: "Transparent fee structure based on domain valuation" },
  { title: "Commission Rates", desc: "Competitive commission on successful sales" },
  { title: "Payment Processing", desc: "Secure payment handling with multiple options" },
  { title: "Volume Discounts", desc: "Reduced fees for bulk listings and high-volume sellers" },
  { title: "Payout Schedule", desc: "Weekly payouts with fast processing" },
  { title: "Fee Calculator", desc: "Estimate your costs before listing" },
];

export default function MarketplacePricingPage() {
  return (
    <ToolPageTemplate
      icon={DollarSign}
      title="Seller Fees"
      subtitle="Automated listing fee and valuation estimates. Transparent pricing for sellers."
      features={features}
    />
  );
}
