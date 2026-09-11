"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { TechMarquee } from "@/components/site/tech-marquee";
import { TECH_CATEGORIES } from "@/data/technologies";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Technologies() {
  const { data } = useSiteData();
  const content = data?.content;
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const badge = getContent(content, "tech_badge", "Technology Stack");
  const title = getContent(content, "tech_title", "Modern Engineering Stack");
  const subtitle = getContent(
    content,
    "tech_subtitle",
    "We select battle-tested, high-performance frameworks and cloud-native infrastructure that ensure long-term maintainability."
  );

  const categories = ["All", ...TECH_CATEGORIES.map((c) => c.name)];

  const displayedCategories =
    selectedCategory === "All"
      ? TECH_CATEGORIES
      : TECH_CATEGORIES.filter((c) => c.name === selectedCategory);

  return (
    <section id="technologies" aria-labelledby="tech-title" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/60 dark:bg-slate-950/70 text-foreground transition-colors duration-300">
      <div className="site-container relative">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
            <Cpu className="mr-1.5 size-3.5" />
            {badge}
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold"
                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-cyan-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {displayedCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={fadeUpSpring}
              className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {cat.items.length} tools
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-800 transition-all group-hover:border-cyan-500/30 dark:border-white/5 dark:bg-white/5 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Dual-Direction Marquee */}
      <div className="mt-16">
        <TechMarquee />
      </div>
    </section>
  );
}
