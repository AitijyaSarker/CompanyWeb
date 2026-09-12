"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  fadeUpSpring,
  staggerContainer,
} from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const ROTATING_DOMAINS = [
  "High-Scale Web SaaS",
  "Enterprise AI Agents",
  "Cloud & Kubernetes",
  "Distributed Systems",
  "Mission-Critical Apps",
];

export function Hero() {
  const { data } = useSiteData();
  const content = data?.content;
  const prefersReducedMotion = useReducedMotion();

  const [domainIndex, setDomainIndex] = React.useState(0);

  // Rotating domain text timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDomainIndex((prev) => (prev + 1) % ROTATING_DOMAINS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const badge = getContent(content, "hero_badge", "Catalyst for bright ideas");
  const title = getContent(content, "hero_title", "We Code Your Ideas");
  const subtitle = getContent(
    content,
    "hero_subtitle",
    "ULTRABULB IT architects high-scale digital platforms, enterprise SaaS, custom AI agents, and mission-critical cloud applications with unmatched velocity and precision."
  );
  const ctaPrimary = getContent(content, "hero_cta_primary", "Explore Case Studies");
  const ctaSecondary = getContent(content, "hero_cta_secondary", "Schedule Architecture Call");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="mobile-hero-section relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 bg-background text-foreground transition-colors duration-300"
    >
      {/* ===== 1. Clean Premium Ambient Background ===== */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-transparent dark:from-cyan-500/[0.07] transition-opacity duration-300" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 dark:bg-grid-dark dark:opacity-10 transition-opacity duration-300" />

      {/* Subtle Centered Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl dark:from-cyan-500/15 dark:via-blue-600/10 transition-all duration-300" />


      <div className="site-container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          
          {/* ===== 2. Left Column: Headline, Rotating Typing Domain & Dual CTAs ===== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6 lg:col-span-7"
          >
            {/* Top Status & SLA Pill Badge */}
            <motion.div variants={fadeUpSpring}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
                </span>
                <span>{badge}</span>
                <span className="text-cyan-500/50">•</span>
                <span className="text-slate-600 dark:text-slate-300">SOC-2 & ISO Ready</span>
              </div>
            </motion.div>

            {/* Main World-Class Dynamic Headline */}
            <motion.h1
              id="hero-title"
              variants={fadeUpSpring}
              className="text-balance text-4xl font-black tracking-tight sm:text-5xl md:text-6xl xl:text-7xl xl:leading-[1.06] text-slate-900 dark:text-white"
            >
              We Code Your Ideas <br />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.35)]">
                  Into Light
                </span>
              </span>
            </motion.h1>

            {/* Rotating Dynamic Specialization Pill */}
            <motion.div variants={fadeUpSpring} className="flex items-center gap-2.5 text-sm sm:text-base font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Architecting:</span>
              <div className="relative h-8 overflow-hidden inline-flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={domainIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1 text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-mono shadow-xs"
                  >
                    <Sparkles className="size-3.5 text-cyan-500" />
                    {ROTATING_DOMAINS[domainIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Subtitle Description */}
            <motion.p
              variants={fadeUpSpring}
              className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              {subtitle}
            </motion.p>

            {/* Dual Action CTAs Cluster */}
            <motion.div
              variants={fadeUpSpring}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-400 hover:to-sky-300 font-extrabold shadow-[0_0_35px_rgba(6,182,212,0.45)] px-8 py-6 text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
              >
                <Link href="/projects" className="gap-2 justify-center">
                  <span>{ctaPrimary}</span>
                  <ArrowRight className="size-4.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full border-slate-300 bg-white/90 text-slate-800 hover:bg-slate-100 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-800 dark:hover:border-cyan-400/60 dark:hover:text-cyan-300 px-7 py-6 text-sm sm:text-base backdrop-blur-md transition-all shadow-sm"
              >
                <Link href="/schedule" className="gap-2 justify-center">
                  <span>{ctaSecondary}</span>
                  <ArrowUpRight className="size-4 text-cyan-600 dark:text-cyan-400" />
                </Link>
              </Button>
            </motion.div>

            {/* Reassurance Micro-Badges */}
            <motion.div
              variants={fadeUpSpring}
              className="flex flex-wrap items-center gap-5 sm:gap-6 pt-3 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400" />
                <span>Zero Technical Debt</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-cyan-600 dark:text-cyan-400" />
                <span>NDA & Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-cyan-600 dark:text-cyan-400" />
                <span>2-Week Sprints</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ===== 3. Right Column: Clean Glowing Catalyst Architecture Animation (Desktop Only) ===== */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex relative lg:col-span-5 items-center justify-center"
          >
            {/* Ambient Background Light Aura */}
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-blue-600/20 blur-3xl dark:from-cyan-500/25 dark:via-blue-500/20 dark:to-indigo-500/20" />

            {/* Clean Interactive Visual Container */}
            <div className="mobile-hero-orbit relative w-full max-w-[500px] h-[390px] xs:h-[420px] sm:h-[480px] rounded-3xl border border-slate-200/80 bg-white/40 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_0_60px_rgba(6,182,212,0.12)] overflow-hidden flex flex-col items-center justify-center">
              
              {/* Subtle Grid Accent */}
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10 dark:bg-grid-dark dark:opacity-15" />

              {/* Background Orbital Rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {/* Outer Rotating Dashed Ring */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="size-[290px] xs:size-[340px] sm:size-[380px] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-400/25"
                />
                {/* Middle Rotating Counter-Ring */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute size-[210px] xs:size-[250px] sm:size-[280px] rounded-full border border-dotted border-sky-400/30 dark:border-sky-300/30"
                />
                {/* Inner Glowing Pulsing Ring */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute size-[140px] xs:size-[160px] sm:size-[180px] rounded-full border border-cyan-400/40 bg-gradient-to-tr from-cyan-500/10 to-transparent shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                />
              </div>

              {/* Central Radiant Catalyst Core */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [-6, 6, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex size-24 sm:size-32 items-center justify-center rounded-2xl sm:rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 shadow-[0_0_50px_rgba(6,182,212,0.35)] backdrop-blur-2xl group cursor-pointer transition-transform hover:scale-110 p-2.5 sm:p-3.5"
                >
                  {/* Ambient Glow Aura behind logo */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-radial from-cyan-400/25 via-transparent to-transparent animate-pulse" />
                  
                  {/* Official ULTRABULB Logo */}
                  <div className="relative flex size-full items-center justify-center">
                    <Image
                      src="/UltrabulbHeroLogo.png"
                      alt="ULTRABULB IT Logo"
                      width={120}
                      height={120}
                      className="size-full object-contain drop-shadow-[0_0_18px_rgba(6,182,212,0.6)] transition-all group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Micro Live Status Beacon */}
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 flex size-5 sm:size-6 items-center justify-center rounded-full bg-slate-950 border border-emerald-400/90 shadow-md">
                    <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </motion.div>

                {/* Core Title Pill */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold font-mono tracking-wide text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                >
                  <Activity className="size-2.5 sm:size-3 text-cyan-500 animate-pulse" />
                  <span>CATALYST CORE • ACTIVE</span>
                </motion.div>
              </div>

              {/* ===== Floating Feature Satellite Nodes ===== */}

              {/* Node 1: Top Left - AI & Neural Agents */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [-4, 5, -4], x: [-2, 3, -2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white/95 p-2 sm:p-3 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/95 hover:scale-105 transition-transform"
              >
                <div className="flex size-7 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shrink-0">
                  <Cpu className="size-3.5 sm:size-4.5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">AI Systems</div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                    <span className="size-1 sm:size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Auto RAG</span>
                  </div>
                </div>
              </motion.div>

              {/* Node 2: Top Right - High-Speed Cloud Mesh */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [5, -4, 5], x: [2, -2, 2] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-3 right-3 sm:top-8 sm:right-6 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white/95 p-2 sm:p-3 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/95 hover:scale-105 transition-transform"
              >
                <div className="flex size-7 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 shrink-0">
                  <Globe className="size-3.5 sm:size-4.5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">Edge Mesh</div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="size-1 sm:size-1.5 rounded-full bg-emerald-400" />
                    <span>&lt;12ms</span>
                  </div>
                </div>
              </motion.div>

              {/* Node 3: Bottom Left - Bank-Grade Security */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [4, -5, 4], x: [-3, 2, -3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white/95 p-2 sm:p-3 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/95 hover:scale-105 transition-transform"
              >
                <div className="flex size-7 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                  <ShieldCheck className="size-3.5 sm:size-4.5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">Zero-Trust</div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    SOC-2 Ready
                  </div>
                </div>
              </motion.div>

              {/* Node 4: Bottom Right - 2-Week Sprint Velocity */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [-5, 4, -5], x: [3, -2, 3] }}
                transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white/95 p-2 sm:p-3 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/95 hover:scale-105 transition-transform"
              >
                <div className="flex size-7 sm:size-9 items-center justify-center rounded-lg sm:rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shrink-0">
                  <Zap className="size-3.5 sm:size-4.5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">Fast Sprint</div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                    <span className="size-1 sm:size-1.5 rounded-full bg-cyan-400" />
                    <span>2-Wk CI/CD</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* ===== 4. Bottom Trust & High-Throughput Metric Counters Bar ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mobile-metrics-grid mt-16 sm:mt-24 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white/85 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 lg:grid-cols-4 lg:gap-8 transition-colors"
        >
          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
              150+
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-900 dark:text-white font-bold">
              Digital Systems Deployed
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Fintech, AI Agents, SaaS, Cloud</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
              99.99%
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-900 dark:text-white font-bold">
              Verified Uptime SLA
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Multi-region active redundancy</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
              &lt;12ms
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-900 dark:text-white font-bold">
              Global Edge TTFB
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Edge caching & SSR optimization</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
              24/7/365
            </div>
            <div className="mt-1 text-xs sm:text-sm text-slate-900 dark:text-white font-bold">
              Dedicated SecOps Watch
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct senior engineer escalation</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
