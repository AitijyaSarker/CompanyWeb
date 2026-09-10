"use client";

import { PageHero } from "@/components/site/page-hero";
import { Products } from "@/components/site/products";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ProjectsPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "products_badge", "Our Solutions")}
        title={getContent(content, "products_title", "Products & Projects We've Built")}
        subtitle={getContent(
          content,
          "products_subtitle",
          "Innovative and reliable software solutions designed to empower businesses and drive digital transformation."
        )}
      />
      <Products hideHeading />
    </>
  );
}
