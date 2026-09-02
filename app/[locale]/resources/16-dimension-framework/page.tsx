import { BookOpen } from "lucide-react";
import { ToolPageTemplate } from "@/components/layout/ToolPageTemplate";

const features = [
  { title: "M01 RDAP", desc: "Registration data, domain age, and registrar information" },
  { title: "M02 TLD Table", desc: "16-tier TLD scoring with market demand multipliers" },
  { title: "M03 Length", desc: "Sigmoid-based length scoring with digit and hyphen penalties" },
  { title: "M04 Word Count", desc: "Single word, two-word, and multi-word domain analysis" },
  { title: "M05 Pronounceability", desc: "Vowel balance, consonant clusters, and phonetic patterns" },
  { title: "M06-M16", desc: "Segmenter, keywords, CPC, search, cross-TLD, trademark, authority, confidence, pricing, brandability" },
];

export default function FrameworkPage() {
  return (
    <ToolPageTemplate
      icon={BookOpen}
      title="16-Dimension Framework"
      subtitle="Comprehensive breakdown of the 16 valuation metrics used by our algorithmic pricing engine. Understand what drives domain value."
      features={features}
    />
  );
}
