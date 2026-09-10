"use client";

import { PageHero } from "@/components/site/page-hero";
import { Career } from "@/components/site/career";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function CareersPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge="Careers"
        title="Join Our Team"
        subtitle="Build meaningful products with a team that values craft, curiosity, and collaboration."
      />
      <Career hideHeading />
    </>
  );
}
