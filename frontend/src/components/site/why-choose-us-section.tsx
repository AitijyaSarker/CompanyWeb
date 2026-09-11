"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  Lock,
  Clock,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";

export function WhyChooseUsSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="why-choose-us"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-900/40 dark:bg-slate-950/60 text-foreground"
    >
      <div className="site-container relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <ShieldCheck className="mr-1.5 size-3.5" />
            Enterprise Value Proposition
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Why Enterprise Leaders Choose <br />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-sky-300">
              ULTRABULB IT
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            We operate as your elite engineering division — blending technical rigor, rapid delivery velocity, and architectural transparency.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6"
        >
          {/* Bento Card 1: Large Featured - Senior Engineering Depth (7 cols) */}
          <motion.div
            variants={fadeUpSpring}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:col-span-3 lg:col-span-7 dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                  <Users className="size-7" />
                </div>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  Top 3% Talent
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dedicated Senior Engineering Squads
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero junior handoffs. You work directly with battle-tested software architects, full-stack engineers, and cloud specialists who have built high-scale systems for venture-backed startups and Fortune 500 enterprises.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-white/10 text-xs">
              <div>
                <span className="block font-bold text-slate-900 dark:text-white text-base">100%</span>
                <span className="text-slate-500">In-house Engineers</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900 dark:text-white text-base">&lt;24h</span>
                <span className="text-slate-500">Response SLA</span>
              </div>
              <div>
                <span className="block font-bold text-slate-900 dark:text-white text-base">Direct</span>
                <span className="text-slate-500">Slack / Discord Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Enterprise Security & Compliance (5 cols) */}
          <motion.div
            variants={fadeUpSpring}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:col-span-3 lg:col-span-5 dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Lock className="size-7" />
                </div>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                  SecOps Certified
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Bank-Grade Security & Compliance
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Security by design. Every codebase undergoes automated SAST, DAST, dependency vulnerability scanning, and strict adherence to OWASP Top 10 guidelines.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/10 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-500 shrink-0" />
                <span>SOC2 Type II & GDPR architecture readiness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-500 shrink-0" />
                <span>Encrypted at rest (AES-256) & in transit (TLS 1.3)</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: 2-Week Sprint Velocity (4 cols) */}
          <motion.div
            variants={fadeUpSpring}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 mb-5">
                <Zap className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Rapid 2-Week Sprints
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Experience tangible, deployable deliverables every two weeks with live staging environments and interactive demo walkthroughs.
              </p>
            </div>
            <div className="mt-6 font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">
              // Continuous Delivery & CI/CD
            </div>
          </motion.div>

          {/* Bento Card 4: 99.99% High Availability SLA (4 cols) */}
          <motion.div
            variants={fadeUpSpring}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 mb-5">
                <Activity className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                99.99% Production Uptime
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Self-healing container clusters, automated failovers, and multi-region load balancers that ensure non-stop operations under heavy traffic.
              </p>
            </div>
            <div className="mt-6 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              // Global Multi-AZ Redundancy
            </div>
          </motion.div>

          {/* Bento Card 5: Full IP & Clean Code Ownership (4 cols) */}
          <motion.div
            variants={fadeUpSpring}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 mb-5">
                <Award className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                100% IP & Code Ownership
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                You own 100% of your source code, infrastructure scripts, and design assets with no vendor lock-in and thorough technical documentation.
              </p>
            </div>
            <div className="mt-6 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              // Zero Vendor Lock-in
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
