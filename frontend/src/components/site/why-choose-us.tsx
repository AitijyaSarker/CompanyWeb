"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Users, Zap, MessageSquare, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const STRENGTHS = [
  { icon: Zap, title: "Modern Technology", desc: "Latest frameworks and proven patterns for future-ready products." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow with your user base and business." },
  { icon: Users, title: "User-Focused Design", desc: "Interfaces that prioritize clarity, accessibility and delight." },
  { icon: ShieldCheck, title: "Reliable Development", desc: "Rigorous QA, code reviews and production-grade standards." },
  { icon: MessageSquare, title: "Transparent Communication", desc: "Regular updates, clear timelines and honest collaboration." },
  { icon: HeartHandshake, title: "Long-Term Support", desc: "Ongoing maintenance, optimization and partnership beyond launch." },
];

export function WhyChooseUs({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;
  const badge = getContent(content, "why_badge", "Why ULTRABULB IT");
  const title = getContent(content, "why_title", "Why Teams Choose Us");
  const subtitle = getContent(
    content,
    "why_subtitle",
    "We combine engineering excellence with design craft to deliver products that perform."
  );

  return (
    <section id="why-us" aria-labelledby="why-title" className="section-pad section-alt w-full">
      <div className="site-container">
        {!hideHeading && <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STRENGTHS.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUpSpring}
              whileHover={{ scale: 1.02 }}
              className="group flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:border-(--brand-cyan)/30 hover:shadow-md"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--brand-cyan-pale) text-(--brand-navy) transition-colors group-hover:bg-(--brand-cyan) group-hover:text-white dark:bg-cyan-950/40 dark:text-cyan-200">
                <item.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
