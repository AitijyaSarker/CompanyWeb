"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMagnetic, useTilt3D } from "@/lib/animations/scroll";
import type { Product } from "@/hooks/use-site-data";

interface ProjectScrollShowcaseProps {
  products: Product[];
}

export function ProjectScrollShowcase({ products }: ProjectScrollShowcaseProps) {
  return (
    <div className="mt-12 flex flex-col gap-8 lg:gap-10">
      {products.map((product, index) => (
        <ScrollProjectCard key={product.id} product={product} index={index} featured />
      ))}
    </div>
  );
}

/** Mobile / tablet fallback list */
export function ProjectList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 flex flex-col gap-8 lg:hidden">
      {products.map((product, i) => (
        <ScrollProjectCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

interface ScrollProjectCardProps {
  product: Product;
  index: number;
  featured?: boolean;
  onFocus?: () => void;
}

function ScrollProjectCard({ product, index, featured, onFocus }: ScrollProjectCardProps) {
  const tiltRef = useTilt3D(3);
  const magneticRef = useMagnetic(0.2);
  const [light, setLight] = React.useState({ x: 50, y: 50 });
  const num = String(index + 1).padStart(2, "0");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <article
      data-cursor="view"
      className={`group relative ${onFocus ? "cursor-pointer" : ""}`}
      onClick={(event) => {
        if (onFocus && !(event.target as HTMLElement).closest("a,button")) onFocus();
      }}
      onKeyDown={(event) => {
        if (onFocus && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onFocus();
        }
      }}
      role={onFocus ? "button" : undefined}
      tabIndex={onFocus ? 0 : undefined}
      aria-label={onFocus ? `Focus ${product.title}` : undefined}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        className={`relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-shadow duration-500 hover:shadow-2xl ${featured ? "lg:grid lg:grid-cols-2 lg:gap-0" : ""}`}
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.4s ease" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(33,187,205,0.15), transparent 55%)`,
          }}
        />

        <div className={`relative overflow-hidden ${featured ? "lg:order-2" : ""}`}>
          <div className={`w-full overflow-hidden bg-muted ${featured ? "aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-80" : "aspect-16/10"}`}>
            <motion.img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        <div className={`relative flex flex-col gap-4 p-6 sm:p-8 ${featured ? "lg:order-1 lg:justify-center" : ""}`}>
          <span className="text-5xl font-black leading-none text-(--brand-cyan)/20">{num}</span>
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{product.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{product.description}</p>
          <>
            <div ref={magneticRef} className="mt-2 inline-block transition-transform duration-200">
              <Button
                asChild
                className="rounded-full bg-(--brand-navy) px-6 text-white hover:bg-(--brand-navy-dark)"
              >
                <Link href={`/projects/${product.id}`} className="gap-2">
                  View Project
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>
            {product.link ? <Link href={product.link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Visit live project</Link> : null}
          </>
        </div>
      </div>
    </article>
  );
}
