"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Server,
  Zap,
  Globe,
  Database,
  Layers,
  Code2,
  Play,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SPRING_BOUNCY,
  SPRING_SMOOTH,
  TextReveal,
  fadeUpSpring,
  staggerContainer,
} from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Hero() {
  const { data } = useSiteData();
  const content = data?.content;
  const prefersReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = React.useState<"architecture" | "ai" | "cicd">("architecture");

  const badge = getContent(content, "hero_badge", "Next-Gen Enterprise Engineering");
  const title = getContent(content, "hero_title", "We Code Your Ideas Into Light");
  const subtitle = getContent(
    content,
    "hero_subtitle",
    "ULTRABULB IT architects high-scale digital platforms, enterprise SaaS, custom AI agents, and mission-critical cloud applications with unmatched velocity and precision."
  );
  const ctaPrimary = getContent(content, "hero_cta_primary", "Explore Case Studies");
  const ctaSecondary = getContent(content, "hero_cta_secondary", "Schedule Consultation");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-36 bg-slate-950 text-white"
    >
      {/* Dynamic Cybernetic Ambient Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35" />
      <div className="hero-ambient pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 size-[450px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="site-container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          
          {/* Left Column: Headline, Description & CTAs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6 lg:col-span-7"
          >
            {/* Status Pill Badge */}
            <motion.div variants={fadeUpSpring}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                {!prefersReducedMotion ? (
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
                  </span>
                ) : (
                  <span className="size-2 rounded-full bg-cyan-400" />
                )}
                <span>{badge}</span>
                <span className="text-cyan-500/60">•</span>
                <span className="text-slate-300">ISO & SOC2 Ready</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              id="hero-title"
              variants={fadeUpSpring}
              className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl xl:leading-[1.08] text-white"
            >
              We Code Your Ideas <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                Into Light
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpSpring}
              className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300/90 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* CTAs Cluster */}
            <motion.div
              variants={fadeUpSpring}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:from-cyan-300 hover:to-cyan-400 font-bold shadow-[0_0_30px_rgba(6,182,212,0.45)] px-7 py-6 text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
              >
                <Link href="/projects" className="gap-2">
                  <span>{ctaPrimary}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 px-6 py-6 text-sm sm:text-base backdrop-blur-md transition-all"
              >
                <Link href="/schedule" className="gap-2">
                  <span>{ctaSecondary}</span>
                  <ArrowUpRight className="size-4 text-cyan-400" />
                </Link>
              </Button>
            </motion.div>

            {/* Quick Micro-Trust Badges */}
            <motion.div
              variants={fadeUpSpring}
              className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-400" />
                <span>Zero Technical Debt Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-cyan-400" />
                <span>Enterprise Security Hardened</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-cyan-400" />
                <span>Rapid 2-Week Sprints</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Live Interactive Architecture Telemetry Terminal */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-cyan-500/30 bg-slate-900/90 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">ultrabulb-system-telemetry</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/30">
                  <Activity className="size-3 animate-pulse" />
                  <span>99.99% UP</span>
                </div>
              </div>

              {/* Interactive Telemetry Tab Switcher */}
              <div className="flex border-b border-white/10 bg-slate-900/60 p-1.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
                    activeTab === "architecture"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Server className="size-3.5" />
                  <span>Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
                    activeTab === "ai"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Cpu className="size-3.5" />
                  <span>AI Agent Engine</span>
                </button>
                <button
                  onClick={() => setActiveTab("cicd")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
                    activeTab === "cicd"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="size-3.5" />
                  <span>SecOps / CI/CD</span>
                </button>
              </div>

              {/* Terminal View Content */}
              <div className="p-5 sm:p-6 font-mono text-xs min-h-[310px] flex flex-col justify-between">
                {activeTab === "architecture" && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/5">
                      <span className="text-cyan-400 font-bold">// CLOUD MICROSERVICES CLUSTER</span>
                      <span className="text-[10px] text-emerald-400">AWS us-east-1 (Multi-AZ)</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Globe className="size-4 text-cyan-400" />
                          <span>Edge CDN & Next.js SSR</span>
                        </div>
                        <span className="text-emerald-400 text-[11px] font-semibold">12ms TTFB</span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Server className="size-4 text-sky-400" />
                          <span>GraphQL & REST API Gateway</span>
                        </div>
                        <span className="text-emerald-400 text-[11px] font-semibold">4.8k req/sec</span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Database className="size-4 text-indigo-400" />
                          <span>Distributed PostgreSQL + Redis</span>
                        </div>
                        <span className="text-emerald-400 text-[11px] font-semibold">0.4ms Latency</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Auto-healing: <strong className="text-white">Active</strong></span>
                      <span>DDoS Shield: <strong className="text-cyan-400">Layer 7 Protected</strong></span>
                    </div>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="space-y-3">
                    <div className="text-cyan-400 font-bold pb-2 border-b border-white/5">
                      // AUTONOMOUS AGENT ORCHESTRATION
                    </div>
                    <div className="space-y-1.5 text-slate-300 text-[11px]">
                      <div className="text-emerald-400">&gt; Initializing hybrid RAG vector index...</div>
                      <div className="text-slate-400">&gt; Embeddings loaded: text-embedding-3-large (1536 dim)</div>
                      <div className="text-cyan-300">&gt; Semantic cache hit ratio: 94.2%</div>
                      <div className="text-slate-300">&gt; Agent execution plan verified: 0 hallucinations</div>
                    </div>
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-3 mt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-cyan-300 font-bold">Streaming Tokens/Sec</span>
                        <span className="text-xs text-cyan-400 font-mono">148 t/s</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 w-[88%]" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "cicd" && (
                  <div className="space-y-3">
                    <div className="text-cyan-400 font-bold pb-2 border-b border-white/5">
                      // ENTERPRISE PIPELINE: RELEASE v4.2.0
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> Unit & E2E Tests (1,482 passed)</span>
                        <span className="text-slate-500">28s</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> SAST & OWASP Top 10 Audit</span>
                        <span className="text-slate-500">0 vulnerabilities</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> Docker Multi-Stage Build</span>
                        <span className="text-slate-500">42MB bundle</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-cyan-400"><Zap className="size-3.5" /> Blue/Green Production Deployment</span>
                        <span className="text-cyan-400 font-bold">LIVE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Footer Status */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>ULTRABULB Cloud Node Engine</span>
                  </div>
                  <Link href="/services" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust & Metric Counters Bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl lg:grid-cols-4 lg:gap-8"
        >
          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">150+</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">Digital Products Shipped</div>
            <div className="text-[11px] text-slate-500">Fintech, AI, Health, SaaS</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">99.8%</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">Client Retention & SLA</div>
            <div className="text-[11px] text-slate-500">Enterprise grade reliability</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">&lt;15ms</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">Global Edge Latency</div>
            <div className="text-[11px] text-slate-500">High-performance architecture</div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">24/7</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">Engineering Support</div>
            <div className="text-[11px] text-slate-500">Dedicated SecOps & Tech Leads</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
