"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export function PageHero({ badge, title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-slate-200/80 pt-32 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-slate-100 via-cyan-50/20 to-white text-slate-900 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 dark:text-white dark:border-white/10 transition-colors duration-300",
        className
      )}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 dark:bg-grid-dark dark:opacity-35" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-96 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/15" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="site-container relative text-center"
      >
        {/* Breadcrumb hint */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="size-3 text-slate-400 dark:text-slate-600" />
          <span className="text-cyan-600 dark:text-cyan-400 font-medium">{badge || "Explore"}</span>
        </div>

        {badge ? (
          <Badge
            className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Sparkles className="mr-1.5 size-3" />
            {badge}
          </Badge>
        ) : null}

        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
          {title}
        </h1>

        {subtitle ? (
          <p
            className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed sm:text-lg text-slate-600 dark:text-slate-300"
          >
            {subtitle}
          </p>
        ) : null}

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 block h-1 w-16 origin-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </motion.div>
    </section>
  );
}
