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
        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/70"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.4s ease" }}
      >
        {/* Cursor-following cyan light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(6,182,212,0.18), transparent 55%)`,
          }}
        />

        <div className="relative overflow-hidden">
          <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
            <motion.img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-3 p-5 sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{product.description}</p>
          {product.link && (
            <div ref={magneticRef} className="mt-auto inline-block transition-transform duration-200">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-slate-300 bg-white text-slate-800 hover:border-cyan-500 hover:bg-cyan-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
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
