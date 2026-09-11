"use client";

import { PageHero } from "@/components/site/page-hero";
import { ServicesShowcase } from "@/components/site/services-showcase";
import { CostEstimator } from "@/components/site/cost-estimator";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ServicesPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "services_badge", "Capabilities & Architecture")}
        title={getContent(content, "services_title", "Services Engineered for Scale")}
        subtitle={getContent(
          content,
          "services_subtitle",
          "From cloud-native systems and custom AI agents to high-concurrency web platforms — our engineering teams deliver mission-critical software."
        )}
        dark
      />
      <ServicesShowcase />
      <CostEstimator />
    </>
  );
}
