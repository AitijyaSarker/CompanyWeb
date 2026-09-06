"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TECH_CATEGORIES } from "@/data/technologies";

const ALL_TECHS = TECH_CATEGORIES.flatMap((c) => c.items);

export function TechMarquee() {
  const reduced = useReducedMotion();
  const items = [...ALL_TECHS, ...ALL_TECHS];

  if (reduced) {
    return (
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {ALL_TECHS.map((t) => (
          <span key={t} className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-10 overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-(--brand-bg-light) to-transparent dark:from-[oklch(0.17_0.04_245)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-(--brand-bg-light) to-transparent dark:from-[oklch(0.17_0.04_245)]" />
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-(--brand-cyan)/20 bg-white px-4 py-2 text-sm font-medium text-(--brand-navy) shadow-sm dark:bg-white/5 dark:text-white"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
