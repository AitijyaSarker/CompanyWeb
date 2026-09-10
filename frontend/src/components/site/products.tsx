"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PackageOpen } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { ProjectScrollShowcase, ProjectList } from "@/components/site/project-scroll-showcase";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Products({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;
  const products = data?.products ?? [];

  const badge = getContent(content, "products_badge", "Our Solutions");
  const title = getContent(content, "products_title", "Products & Projects We've Built");
  const subtitle = getContent(
    content,
    "products_subtitle",
    "Innovative and reliable software solutions designed to empower businesses and drive digital transformation."
  );

  const featured = products.filter((p) => p.featured);
  const display = featured.length > 0 ? featured : products;

  return (
    <section id="products" aria-labelledby="products-title" className="section-pad section-alt w-full">
      <div className="site-container">
        {!hideHeading && <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />}

        {display.length === 0 ? (
          <div className="col-span-full mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/50 px-6 py-16 text-center">
            <PackageOpen className="size-10 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No products to showcase yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <ProjectScrollShowcase products={display} />
            <ProjectList products={display} />
          </>
        )}
      </div>
    </section>
  );
}
