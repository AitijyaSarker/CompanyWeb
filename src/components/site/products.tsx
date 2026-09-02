"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent, useSiteData, type Product } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

interface ProductRowProps {
  product: Product;
  index: number;
}

function ProductRow({ product, index }: ProductRowProps) {
  const isLeft = index % 2 === 0;
  const tags = (product.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const slide = isLeft ? { x: -40 } : { x: 40 };

  return (
    <motion.article
      initial={{ opacity: 0, ...slide }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "grid grid-cols-1 items-center gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-2 md:gap-10",
        isLeft ? "bg-amber-50/60 dark:bg-amber-950/20" : "bg-violet-50/60 dark:bg-violet-950/20"
      )}
    >
      {/* Image */}
      <div className={cn("order-1", !isLeft && "md:order-2")}>
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 shadow-sm">
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <Badge className="absolute left-3 top-3 rounded-full bg-background/85 text-foreground backdrop-blur">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Text */}
      <div className={cn("order-2 flex flex-col gap-3", !isLeft && "md:order-1")}>
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {product.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {product.description}
        </p>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full border-border/70 bg-background/60 text-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        {product.link ? (
          <div className="mt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-border/70 bg-background/70 hover:bg-accent hover:text-accent-foreground"
            >
              <Link href={product.link} className="gap-1.5" target="_blank" rel="noopener noreferrer">
                View Project
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function Products() {
  const { data } = useSiteData();
  const content = data?.content;
  const products = data?.products ?? [];

  const badge = getContent(content, "products_badge", "Our Work");
  const title = getContent(content, "products_title", "Products & Projects We've Built");
  const subtitle = getContent(
    content,
    "products_subtitle",
    "A selection of platforms, apps and systems we've engineered for clients across industries."
  );

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative w-full bg-muted/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />

        <div className="mt-12 flex flex-col gap-6 sm:gap-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border/60 bg-card/50 px-6 py-16 text-center">
              <PackageOpen className="size-10 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                No products to showcase yet. Check back soon.
              </p>
            </div>
          ) : (
            products.map((product, i) => (
              <ProductRow key={product.id} product={product} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
