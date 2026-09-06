"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { TechMarquee } from "@/components/site/tech-marquee";
import { TECH_CATEGORIES } from "@/data/technologies";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Technologies() {
  const { data } = useSiteData();
  const content = data?.content;
  const badge = getContent(content, "tech_badge", "Technologies");
  const title = getContent(content, "tech_title", "Our Technology Ecosystem");
  const subtitle = getContent(
    content,
    "tech_subtitle",
    "Modern tools and proven frameworks powering every product we build."
  );

  return (
    <section id="technologies" aria-labelledby="tech-title" className="section-pad section-alt w-full">
      <div className="site-container">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {TECH_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              variants={fadeUpSpring}
              className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-(--brand-cyan)/30 hover:shadow-md"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-(--brand-cyan)">{cat.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-(--brand-bg-light) px-3 py-1 text-xs font-medium text-(--brand-navy) transition-colors group-hover:border-(--brand-cyan)/20 dark:bg-white/5 dark:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <TechMarquee />
      </div>
    </section>
  );
}
