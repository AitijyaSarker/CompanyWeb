"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export function PageHero({ badge, title, subtitle, className, dark = false }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 pt-24 pb-12 sm:pt-28 sm:pb-16",
        dark
          ? "bg-(--brand-navy-dark) text-white"
          : "bg-(--brand-bg-light) text-(--brand-navy) dark:bg-(--brand-navy) dark:text-white",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:bg-grid-dark dark:opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="site-container relative text-center"
      >
        {badge ? (
          <Badge
            className={cn(
              "mb-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
              dark
                ? "border-(--brand-cyan)/40 bg-(--brand-cyan)/15 text-(--brand-cyan)"
                : "border-(--brand-cyan)/30 bg-(--brand-cyan-pale) text-(--brand-navy-dark) dark:border-cyan-400/30 dark:bg-cyan-950/40 dark:text-cyan-200"
            )}
          >
            {badge}
          </Badge>
        ) : null}
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
        {subtitle ? (
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed sm:text-lg",
              dark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        ) : null}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 block h-1 w-12 origin-center rounded-full bg-(--brand-cyan)"
        />
      </motion.div>
    </section>
  );
}
