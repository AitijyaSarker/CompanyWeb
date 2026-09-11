"use client";

import { PageHero } from "@/components/site/page-hero";
import { WhyChooseUsSection } from "@/components/site/why-choose-us-section";
import { FinalCTA } from "@/components/site/final-cta";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function WhyChooseUsPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "why_badge", "Enterprise Value Proposition")}
        title={getContent(content, "why_title", "Why Enterprise Leaders Choose ULTRABULB IT")}
        subtitle={getContent(
          content,
          "why_subtitle",
          "We operate as your elite engineering division — blending senior talent, bank-grade security, 2-week sprint velocity, and 99.99% SLA guarantees."
        )}
      />
      <WhyChooseUsSection />
      <FinalCTA />
    </>
  );
}
