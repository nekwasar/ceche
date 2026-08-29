import { ShoppingCart } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Curated Selection", desc: "Hand-picked premium domains sorted by commercial intent and SEO authority" },
  { title: "Instant Purchase", desc: "Buy domains directly with integrated payment and escrow services" },
  { title: "Domain History", desc: "Complete ownership history, previous pricing, and development background" },
  { title: "Negotiation Tools", desc: "Make offers, counter-offers, and close deals with secure messaging" },
  { title: "Transfer Support", desc: "Guided domain transfer process with registrar coordination" },
  { title: "Buyer Protection", desc: "Escrow-backed transactions with 72-hour inspection period" },
];

export default function CuratedPage() {
  return (
    <ToolPageTemplate
      icon={ShoppingCart}
      title="Curated Marketplace"
      subtitle="Premium domains sorted by commercial intent score and SEO authority. Each listing includes full intelligence report and valuation."
      features={features}
    />
  );
}
