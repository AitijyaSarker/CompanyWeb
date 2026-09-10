"use client";

import { PageHero } from "@/components/site/page-hero";
import { Services } from "@/components/site/services";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ServicesPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "services_badge", "What We Do")}
        title={getContent(content, "services_title", "Services Built for Scale")}
        subtitle={getContent(
          content,
          "services_subtitle",
          "End-to-end technology services — from strategy and design to engineering, deployment and long-term support."
        )}
        dark
      />
      <Services hideHeading />
    </>
  );
}
