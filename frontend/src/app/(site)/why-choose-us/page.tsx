"use client";

import { PageHero } from "@/components/site/page-hero";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function WhyChooseUsPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "why_badge", "Why ULTRABULB IT")}
        title={getContent(content, "why_title", "Why Teams Choose Us")}
        subtitle={getContent(
          content,
          "why_subtitle",
          "We combine engineering excellence with design craft to deliver products that perform."
        )}
      />
      <WhyChooseUs hideHeading />
    </>
  );
}
