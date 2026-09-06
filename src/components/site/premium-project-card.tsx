"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUpSpring } from "@/components/site/motion";
import { useMagnetic, useTilt3D } from "@/lib/animations/scroll";
import type { Product } from "@/hooks/use-site-data";

interface PremiumProjectCardProps {
  product: Product;
  index: number;
}

export function PremiumProjectCard({ product, index }: PremiumProjectCardProps) {
  const tiltRef = useTilt3D(3);
  const magneticRef = useMagnetic(0.2);
  const [light, setLight] = React.useState({ x: 50, y: 50 });
  const tags = (product.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      variants={fadeUpSpring}
      data-cursor="view"
      className="group relative"
      style={{ zIndex: 10 - index }}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow duration-500 hover:shadow-2xl"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.4s ease" }}
      >
        {/* Cursor-following cyan light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(33,187,205,0.18), transparent 55%)`,
          }}
        />

        <div className="relative overflow-hidden">
          <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
            <motion.img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ clipPath: "inset(0 round 0)" }}
            />
          </div>
          <Badge className="absolute left-4 top-4 rounded-full border-0 bg-(--brand-navy)/90 text-white backdrop-blur">
            {product.category}
          </Badge>
        </div>

        <div className="relative flex flex-col gap-3 p-5 sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-foreground">{product.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-(--brand-cyan)/30 bg-(--brand-cyan-pale)/50 text-xs text-(--brand-navy-dark) opacity-80 transition-opacity group-hover:opacity-100"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {product.link && (
            <div ref={magneticRef} className="mt-auto inline-block transition-transform duration-200">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-(--brand-navy)/20 hover:border-(--brand-cyan) hover:bg-(--brand-cyan-pale)"
              >
                <Link href={product.link} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  View Project
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
