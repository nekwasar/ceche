import { Rocket } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "Brandability Index", desc: "AI-powered brandability scoring with linguistic analysis" },
  { title: "Pronounceability", desc: "Vowel balance, consonant clusters, and bigram frequency analysis" },
  { title: "Extension Penetration", desc: "Compare TLD options and their market penetration rates" },
  { title: "Competitor Naming", desc: "Analyze naming patterns in your industry for competitive insights" },
  { title: "Social Availability", desc: "Check username availability across major social platforms" },
  { title: "Trademark Risk", desc: "USPTO and WIPO database screening before brand commitment" },
];

export default function StartupFoundersPage() {
  return (
    <ToolPageTemplate
      icon={Rocket}
      title="Startup Founders"
      subtitle="Brandability index, keyword pronounceability, and extension penetration tools. Find the perfect domain for your startup."
      features={features}
    />
  );
}
