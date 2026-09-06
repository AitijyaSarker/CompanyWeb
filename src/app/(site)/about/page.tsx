"use client";

import { PageHero } from "@/components/site/page-hero";
import { About } from "@/components/site/about";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function AboutPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "about_badge", "About Us")}
        title={getContent(content, "about_title", "What is ULTRABULB IT?")}
        subtitle={getContent(
          content,
          "about_description",
          "ULTRABULB IT is a software development agency founded with one belief — every great idea deserves to be engineered into a product people love."
        )}
      />
      <About hideHeading />
    </>
  );
}
