"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduced || products.length <= 1) {
    return (
      <div className="mt-12 flex flex-col gap-8 lg:gap-10">
        {products.map((product, i) => (
          <ScrollProjectCard key={product.id} product={product} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-12 hidden lg:block"
      style={{ height: `${products.length * 85}vh` }}
    >
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center">
        {products.map((product, index) => (
          <ScrollProjectLayer
            key={product.id}
            product={product}
            index={index}
            total={products.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
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

interface ScrollProjectLayerProps {
  product: Product;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ScrollProjectLayer({ product, index, total, scrollYProgress }: ScrollProjectLayerProps) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;

  const scale = useTransform(scrollYProgress, [start, end], [1, index < total - 1 ? 0.92 : 1]);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segment * 0.5, end],
    [index === 0 ? 1 : 0.4, 1, index < total - 1 ? 0.35 : 1]
  );
  const y = useTransform(scrollYProgress, [start, end], [index * 12, index * -8]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        zIndex: total - index,
      }}
      className="absolute inset-x-0 mx-auto w-full max-w-5xl px-4"
    >
      <ScrollProjectCard product={product} index={index} featured />
    </motion.div>
  );
}

interface ScrollProjectCardProps {
  product: Product;
  index: number;
  featured?: boolean;
}

function ScrollProjectCard({ product, index, featured }: ScrollProjectCardProps) {
  const tiltRef = useTilt3D(3);
  const magneticRef = useMagnetic(0.2);
  const [light, setLight] = React.useState({ x: 50, y: 50 });
  const tags = (product.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean);
  const num = String(index + 1).padStart(2, "0");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <article data-cursor="view" className="group relative">
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
          <div className={`w-full overflow-hidden bg-muted ${featured ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px]" : "aspect-[16/10]"}`}>
            <motion.img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <Badge className="absolute left-4 top-4 rounded-full border-0 bg-(--brand-navy)/90 text-white backdrop-blur">
            {product.category}
          </Badge>
        </div>

        <div className={`relative flex flex-col gap-4 p-6 sm:p-8 ${featured ? "lg:order-1 lg:justify-center" : ""}`}>
          <span className="text-5xl font-black leading-none text-(--brand-cyan)/20">{num}</span>
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{product.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{product.description}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-(--brand-cyan)/30 bg-(--brand-cyan-pale)/50 text-xs text-(--brand-navy-dark)"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {product.link && (
            <div ref={magneticRef} className="mt-2 inline-block transition-transform duration-200">
              <Button
                asChild
                className="rounded-full bg-(--brand-navy) px-6 text-white hover:bg-(--brand-navy-dark)"
              >
                <Link href={product.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                  View Project
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
