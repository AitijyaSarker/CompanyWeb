"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Shield,
  Database,
  Cloud,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";

const EXTENDED_SERVICES = [
  {
    id: "web",
    title: "Web Platforms & Next.js SaaS",
    subtitle: "Enterprise-grade web engineering with React, Next.js, and modern TypeScript architectures.",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GraphQL"],
    metrics: "Sub-second load times & 99.9% Lighthouse scores",
    icon: Code2,
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "ai",
    title: "Enterprise AI & Autonomous Agents",
    subtitle: "Custom LLM integrations, RAG vector retrieval systems, and predictive automation pipelines.",
    tags: ["OpenAI", "LangChain", "PyTorch", "Vector DBs", "Fine-Tuning"],
    metrics: "10x workflow velocity & automated operational pipelines",
    icon: Cpu,
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "mobile",
    title: "Mobile Apps (iOS & Android)",
    subtitle: "High-performance native and cross-platform applications with offline-first synchronization.",
    tags: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
    metrics: "60 FPS fluid rendering & seamless cross-platform parity",
    icon: Smartphone,
    gradient: "from-indigo-500/20 to-cyan-500/10",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & DevOps",
    subtitle: "Cloud-native architectures, automated CI/CD pipelines, Kubernetes, and zero-downtime scaling.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    metrics: "Zero-downtime blue/green deployments with auto-healing",
    icon: Cloud,
    gradient: "from-sky-500/20 to-teal-500/10",
  },
  {
    id: "database",
    title: "High-Throughput Data Systems",
    subtitle: "Distributed database architecture, caching layers, and high-concurrency transaction processing.",
    tags: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "ElasticSearch"],
    metrics: "<1ms query execution under peak enterprise loads",
    icon: Database,
    gradient: "from-teal-500/20 to-cyan-500/10",
  },
  {
    id: "design",
    title: "UI/UX & Product Design Systems",
    subtitle: "Human-centered interfaces, accessible design tokens, micro-interactions, and conversion engineering.",
    tags: ["Figma", "Design Systems", "Prototyping", "Design Tokens"],
    metrics: "+45% user engagement & intuitive user experience",
    icon: Palette,
    gradient: "from-cyan-500/20 to-sky-500/10",
  },
];

export function ServicesShowcase() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/60 dark:bg-slate-950/70 text-foreground"
    >
      {/* Background Decorative Grids */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 dark:bg-grid-dark dark:opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-0 size-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="site-container relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
              <Layers className="mr-1.5 size-3.5" />
              Core Capabilities
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              End-to-End Technology <br />
              <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-sky-300">
                Engineered for Scale
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From strategic technical architecture to production-grade implementation, we build resilient software that gives your enterprise an unfair advantage.
          </p>
        </div>

        {/* Services Capability Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {EXTENDED_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeUpSpring}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900/90"
              >
                {/* Ambient Top Corner Gradient */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br ${service.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-6" />
                    </div>
                    <ArrowUpRight className="size-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.subtitle}
                  </p>
                </div>

                {/* Tech Tags & Impact Metric */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/5 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Zap className="size-3.5 shrink-0" />
                    <span>{service.metrics}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Explorer Action */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-cyan-500/20 bg-cyan-50/80 dark:bg-cyan-500/5 p-6 backdrop-blur-md gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <Sparkles className="size-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>Need a custom architecture or technical audit for an existing codebase?</span>
          </div>
          <Button
            asChild
            className="rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold px-6 shadow-md"
          >
            <Link href="/schedule" className="gap-2">
              <span>Book Architecture Call</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
