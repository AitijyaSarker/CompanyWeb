"use client";

import { PageHero } from "@/components/site/page-hero";
import { ProcessSection } from "@/components/site/process-section";
import { FinalCTA } from "@/components/site/final-cta";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ProcessPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "process_badge", "Methodology & Execution")}
        title={getContent(content, "process_title", "Our 5-Stage Engineering Lifecycle")}
        subtitle={getContent(
          content,
          "process_subtitle",
          "A battle-tested software delivery engine designed to eliminate project risk, maximize velocity, and guarantee enterprise-grade resilience."
        )}
      />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}
