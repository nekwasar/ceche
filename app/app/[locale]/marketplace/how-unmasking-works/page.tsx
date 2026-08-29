import { FileSearch } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Buyer Escrow", desc: "Funds held securely until domain transfer is confirmed and verified" },
  { title: "Anti-Front-Running", desc: "5-minute lock mechanism prevents domain sniping and price manipulation" },
  { title: "Domain Verification", desc: "TXT/CNAME record verification proves ownership before listing" },
  { title: "Instant Reseller API", desc: "Register as a reseller and access wholesale pricing programmatically" },
  { title: "Listing Fees", desc: "Transparent fee structure based on domain valuation and category" },
  { title: "Payout Process", desc: "Weekly payouts via wire transfer or cryptocurrency" },
];

export default function HowUnmaskingWorksPage() {
  return (
    <ToolPageTemplate
      icon={FileSearch}
      title="How Unmasking Works"
      subtitle="Buyer escrow, anti-front-running 5-minute lock mechanism, and instant reseller API registration. Transparent and secure domain acquisition."
      features={features}
    />
  );
}
