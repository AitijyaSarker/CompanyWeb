"use client";

import { PageHero } from "@/components/site/page-hero";
import { Process } from "@/components/site/process";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ProcessPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "process_badge", "How We Work")}
        title={getContent(content, "process_title", "Our Development Process")}
        subtitle={getContent(
          content,
          "process_subtitle",
          "A proven workflow that turns ideas into production-ready products."
        )}
      />
      <Process hideHeading />
    </>
  );
}
