import { ShoppingCart } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Escrow Protection", desc: "Funds held securely until domain transfer is confirmed" },
  { title: "Instant Transfer", desc: "Automated transfer process with registrar integration" },
  { title: "Negotiation Tools", desc: "Make offers, counter-offers, and close deals securely" },
  { title: "Domain History", desc: "Complete ownership and development history before purchase" },
  { title: "Payment Options", desc: "Credit card, wire transfer, and cryptocurrency accepted" },
  { title: "Buyer Guarantee", desc: "72-hour inspection period with full refund if unsatisfied" },
];

export default function BuyPremiumPage() {
  return (
    <ToolPageTemplate
      icon={ShoppingCart}
      title="Buy Premium Domains"
      subtitle="Acquire high-value domains through escrow-protected transactions. Secure, transparent, and instant."
      features={features}
    />
  );
}
