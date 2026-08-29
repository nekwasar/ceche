import { Gavel } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Blind Drops", desc: "Gamified unmasking pool with .com, .net, .co domains at fixed prices" },
  { title: "Real-time Lock", desc: "Instant verification with 5-minute exclusive lock mechanism" },
  { title: "Fair Pricing", desc: "All domains in the pool are priced equally — no premium markup" },
  { title: "Anti-Front-Running", desc: "Encrypted submissions prevent domain front-running and sniping" },
  { title: "Instant Reveal", desc: "See your domain immediately after purchase with full intelligence report" },
  { title: "Refund Policy", desc: "If the domain is already registered, full refund within 24 hours" },
];

export default function TryYourLuckPage() {
  return (
    <ToolPageTemplate
      icon={Gavel}
      title="Try Your Luck"
      subtitle="Gamified blind domain drops with real-time lock verification. Purchase blind and reveal your premium domain instantly."
      features={features}
      badge="Gamified"
    />
  );
}
