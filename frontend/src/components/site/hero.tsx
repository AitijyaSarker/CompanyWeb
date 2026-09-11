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
  Server,
  Zap,
  Globe,
  Database,
  Terminal,
  Sparkles,
  Lock,
  Radio,
  Layers,
  Code2,
  Play,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

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

  const [activeTab, setActiveTab] = React.useState<"edge" | "ai" | "secops" | "throughput">("edge");
  const [domainIndex, setDomainIndex] = React.useState(0);
  const [simulating, setSimulating] = React.useState(false);
  const [simTps, setSimTps] = React.useState(128450);
  const [simLatency, setSimLatency] = React.useState(11.4);

  // Rotating domain text timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDomainIndex((prev) => (prev + 1) % ROTATING_DOMAINS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Simulate load spike in telemetry
  const handleSimulateLoad = () => {
    if (simulating) return;
    setSimulating(true);
    const spikeTps = Math.floor(Math.random() * 40000) + 180000;
    const spikeLatency = Number((Math.random() * 2 + 13.8).toFixed(1));
    setSimTps(spikeTps);
    setSimLatency(spikeLatency);

    setTimeout(() => {
      setSimTps(128450);
      setSimLatency(11.4);
      setSimulating(false);
    }, 2800);
  };

  const badge = getContent(content, "hero_badge", "Next-Gen Enterprise Engineering Collective");
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
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 bg-gradient-to-b from-slate-50 via-cyan-50/25 to-white text-slate-900 dark:from-slate-950 dark:via-slate-900/95 dark:to-slate-950 dark:text-white transition-colors duration-300"
    >
      {/* ===== 1. Clean Premium Ambient Background ===== */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 dark:bg-grid-dark dark:opacity-10" />

      {/* Subtle Centered Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl dark:from-cyan-500/15 dark:via-blue-600/10" />


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

          {/* ===== 3. Right Column: Live Interactive Architecture & Telemetry HUD ===== */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.35)] dark:border-cyan-500/30 dark:bg-slate-900/95 dark:shadow-[0_0_60px_rgba(6,182,212,0.18)] backdrop-blur-2xl overflow-hidden text-white">
              
              {/* Telemetry Window Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <div className="size-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="size-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="ml-2 font-mono text-xs text-slate-400">ultrabulb-telemetry-v4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded-md border border-cyan-500/30">
                    <Activity className="size-3 animate-pulse text-cyan-400" />
                    <span>99.999% SLA</span>
                  </span>
                </div>
              </div>

              {/* HUD Mode Tab Switcher */}
              <div className="grid grid-cols-4 border-b border-white/10 bg-slate-900/80 p-1.5 text-xs font-medium gap-1">
                <button
                  onClick={() => setActiveTab("edge")}
                  className={`flex items-center justify-center gap-1 rounded-xl py-2 px-1 text-[11px] transition-all ${
                    activeTab === "edge"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Server className="size-3 shrink-0" />
                  <span className="truncate">Edge Node</span>
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center justify-center gap-1 rounded-xl py-2 px-1 text-[11px] transition-all ${
                    activeTab === "ai"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Cpu className="size-3 shrink-0" />
                  <span className="truncate">AI Engine</span>
                </button>
                <button
                  onClick={() => setActiveTab("secops")}
                  className={`flex items-center justify-center gap-1 rounded-xl py-2 px-1 text-[11px] transition-all ${
                    activeTab === "secops"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="size-3 shrink-0" />
                  <span className="truncate">SecOps</span>
                </button>
                <button
                  onClick={() => setActiveTab("throughput")}
                  className={`flex items-center justify-center gap-1 rounded-xl py-2 px-1 text-[11px] transition-all ${
                    activeTab === "throughput"
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Radio className="size-3 shrink-0" />
                  <span className="truncate">Live TPS</span>
                </button>
              </div>

              {/* HUD Screen Body */}
              <div className="p-5 sm:p-6 font-mono text-xs min-h-[320px] flex flex-col justify-between">
                {activeTab === "edge" && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/5">
                      <span className="text-cyan-400 font-bold">// CLOUD DISTRIBUTED TOPOLOGY</span>
                      <span className="text-[10px] text-emerald-400">AWS + Cloudflare Global</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Globe className="size-4 text-cyan-400" />
                          <span>Anycast Global Edge CDN</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{simLatency}ms TTFB</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Server className="size-4 text-sky-400" />
                          <span>Kubernetes Multi-Region Pods</span>
                        </div>
                        <span className="text-cyan-400 font-bold">Auto-Scaling</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Database className="size-4 text-indigo-400" />
                          <span>Distributed CockroachDB & Redis</span>
                        </div>
                        <span className="text-emerald-400 font-bold">0.3ms P99</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Zero-Loss Failover: <strong className="text-emerald-400">Armed</strong></span>
                      <span>DDoS Mitigation: <strong className="text-cyan-400">Active</strong></span>
                    </div>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-cyan-400 font-bold pb-2 border-b border-white/5">
                      <span>// NEURAL AGENT RETRIEVAL PIPELINE</span>
                      <span className="text-[10px] text-cyan-300">RAG v3.2</span>
                    </div>
                    <div className="space-y-1.5 text-slate-300 text-[11px]">
                      <div className="text-emerald-400">&gt; Vector Database: Pinecone Serverless (1536 dim)</div>
                      <div className="text-slate-400">&gt; Hybrid Search: Dense + Sparse BM25 rerank</div>
                      <div className="text-cyan-300">&gt; Semantic Cache Hit Ratio: 96.4%</div>
                      <div className="text-emerald-400">&gt; Hallucination Verification: Passed (0.00% err)</div>
                    </div>
                    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/40 p-3 mt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-cyan-300 font-bold">LLM Token Generation Stream</span>
                        <span className="text-xs text-cyan-400 font-mono font-bold">168 tokens/s</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 w-[92%]" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "secops" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-cyan-400 font-bold pb-2 border-b border-white/5">
                      <span>// ZERO-TRUST CONTINUOUS COMPLIANCE</span>
                      <span className="text-[10px] text-emerald-400">SOC2 Type II</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> OWASP Top 10 SAST Scan</span>
                        <span className="text-emerald-400 font-bold">0 CVEs</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> mTLS Encryption & Vault Keys</span>
                        <span className="text-slate-400">Rotated 2h ago</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="size-3.5" /> Automated Unit & E2E Suite</span>
                        <span className="text-slate-400">1,840 Passed</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1.5 text-cyan-400"><Zap className="size-3.5" /> Blue/Green Production Gateway</span>
                        <span className="text-cyan-400 font-bold">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "throughput" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-cyan-400 font-bold pb-2 border-b border-white/5">
                      <span>// REAL-TIME CONCURRENCY MONITOR</span>
                      <span className="text-[10px] text-emerald-400">Cluster Live</span>
                    </div>

                    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/40 p-3.5">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Processed Requests / Sec</div>
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                        {simTps.toLocaleString()} <span className="text-xs font-normal text-cyan-400">req/s</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-300">
                        <span>P99: <strong className="text-emerald-400">{simLatency}ms</strong></span>
                        <span>Error Rate: <strong className="text-emerald-400">0.0001%</strong></span>
                      </div>
                    </div>

                    <Button
                      onClick={handleSimulateLoad}
                      disabled={simulating}
                      size="sm"
                      className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold gap-2"
                    >
                      {simulating ? (
                        <>
                          <RotateCcw className="size-3.5 animate-spin" />
                          <span>Simulating 50k Concurrency Burst...</span>
                        </>
                      ) : (
                        <>
                          <Play className="size-3.5" />
                          <span>Simulate Traffic Spike (Test Cluster)</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* HUD Footer Status Bar */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>ULTRABULB Cloud Mesh (us-east-1)</span>
                  </div>
                  <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                    <span>Inspect Stack</span>
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== 4. Bottom Trust & High-Throughput Metric Counters Bar ===== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white/85 p-6 sm:p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 lg:grid-cols-4 lg:gap-8 transition-colors"
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
