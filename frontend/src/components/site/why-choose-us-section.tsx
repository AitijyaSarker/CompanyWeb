"use client";

import * as React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  Lock,
  Clock,
  Activity,
  CheckCircle2,
  XCircle,
  Cpu,
  Server,
  Terminal,
  GitBranch,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Fingerprint,
  ChevronRight,
  Check,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fadeUpSpring, staggerContainer, SPRING_SMOOTH } from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

type PersonaKey = "all" | "cto" | "product" | "founder";

interface ComparisonPoint {
  feature: string;
  ultrabulb: string;
  traditional: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonPoint[] = [
  {
    feature: "Engineering Talent",
    ultrabulb: "Top 3% Senior Architects & Leads (Zero Junior Handoffs)",
    traditional: "Pitched by seniors, handed off to unverified junior contractors",
    highlight: true,
  },
  {
    feature: "Delivery Velocity",
    ultrabulb: "2-Week Sprints with Live Staging Environments & Demos",
    traditional: "Multi-month waterfall cycles with delayed visibility",
  },
  {
    feature: "Security & Compliance",
    ultrabulb: "Bank-Grade Zero-Trust, Automated SAST/DAST & SOC2 Readiness",
    traditional: "Basic surface-level testing after development ends",
    highlight: true,
  },
  {
    feature: "Code & IP Ownership",
    ultrabulb: "100% Client Ownership from Day 1 (Full Git History & Clean Docs)",
    traditional: "Proprietary lock-ins, obscure licenses, or hostage codebases",
  },
  {
    feature: "Infrastructure & SLA",
    ultrabulb: "99.999% Multi-AZ Cloud Redundancy & Autoscaling",
    traditional: "Single-server setups without automated failover",
  },
  {
    feature: "Communication Channel",
    ultrabulb: "Direct Shared Slack/Discord with Lead Engineers (<15min SLA)",
    traditional: "Ticketing systems routed through non-technical account managers",
  },
];

export function WhyChooseUsSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { data } = useSiteData();
  const content = data?.content;

  const [activePersona, setActivePersona] = React.useState<PersonaKey>("all");
  const [activeTab, setActiveTab] = React.useState<"bento" | "comparison">("bento");
  const [simulatedStep, setSimulatedStep] = React.useState<number>(0);

  // Auto-advance sprint simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const badge = getContent(content, "why_badge", "Enterprise Value Proposition");
  const title = getContent(content, "why_title", "Why Enterprise Leaders Choose ULTRABULB IT");
  const subtitle = getContent(
    content,
    "why_subtitle",
    "We operate as your elite engineering division — blending technical rigor, rapid delivery velocity, and architectural transparency."
  );

  return (
    <section
      ref={ref}
      id="why-choose-us"
      className="enterprise-value-section relative overflow-hidden py-24 sm:py-32 lg:py-36 bg-slate-50/70 dark:bg-slate-950/80 text-foreground"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 dark:bg-grid-dark dark:opacity-20" />
      <div className="pointer-events-none absolute -top-48 left-1/2 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/20 dark:via-blue-600/15" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[500px] rounded-full bg-indigo-500/10 blur-[140px] dark:bg-indigo-600/15" />

      <div className="site-container relative">
        {/* Section Header */}
        <div className="enterprise-value-header mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <ShieldCheck className="size-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{badge}</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Why Enterprise Leaders Choose <br />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-sky-300">
              ULTRABULB IT
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Interactive Mode & Persona Selector */}
          <div className="enterprise-value-controls mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80">
              <button
                type="button"
                onClick={() => setActiveTab("bento")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer",
                  activeTab === "bento"
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-black"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                <Layers className="size-3.5" />
                <span>Value Architecture</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("comparison")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer",
                  activeTab === "comparison"
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-black"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                <TrendingUp className="size-3.5" />
                <span>ULTRABULB vs Traditional</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Interactive Animated Bento Grid with Live HUD Elements */}
        {activeTab === "bento" ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="enterprise-value-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          >
            {/* Bento Card 1: Top 3% Senior Squads with Live Engineering HUD (7 cols) */}
            <motion.div
              variants={fadeUpSpring}
              className="enterprise-value-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] md:col-span-2 lg:col-span-7 dark:border-white/10 dark:bg-slate-900/80 dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)]"
            >
              {/* Background ambient badge */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 shadow-inner dark:bg-cyan-500/20 dark:text-cyan-400">
                    <Users className="size-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 font-mono">
                      Top 3% Talent Only
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Dedicated Senior Engineering Squads
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Zero junior handoffs. You collaborate directly with battle-tested software architects, full-stack engineers, and cloud specialists who have engineered high-throughput systems for venture-backed hypergrowth startups and Fortune 500 enterprises.
                </p>

                {/* Interactive Simulated Squad Roster */}
                <div className="enterprise-squad-panel mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/60">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center justify-between">
                    <span>Active Squad Allocation</span>
                    <span className="text-slate-400 font-normal">Dedicated pod</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { role: "Lead Systems Architect", spec: "Distributed & Cloud Native", badge: "12+ yrs" },
                      { role: "Senior Full-Stack Lead", spec: "Next.js 15 & High-QPS APIs", badge: "8+ yrs" },
                      { role: "AI & Vector Engineer", spec: "LLMs, RAG & Agents", badge: "Production ML" },
                      { role: "SecOps Principal", spec: "Zero-Trust & SOC2 Hardening", badge: "OWASP Certified" },
                    ].map((member, i) => (
                      <div
                        key={member.role}
                        className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-2.5 shadow-xs dark:border-white/5 dark:bg-slate-900/60"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{member.role}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{member.spec}</p>
                        </div>
                        <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
                          {member.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-white/10 text-center">
                <div>
                  <span className="block font-black text-slate-900 dark:text-white text-xl text-cyan-600 dark:text-cyan-400">100%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">In-house Engineers</span>
                </div>
                <div>
                  <span className="block font-black text-slate-900 dark:text-white text-xl text-cyan-600 dark:text-cyan-400">&lt;15m</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Slack / Discord Sync</span>
                </div>
                <div>
                  <span className="block font-black text-slate-900 dark:text-white text-xl text-cyan-600 dark:text-cyan-400">0</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Junior Handoffs</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Bank-Grade Security & Compliance (5 cols) */}
            <motion.div
              variants={fadeUpSpring}
              className="enterprise-value-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] md:col-span-2 lg:col-span-5 dark:border-white/10 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 shadow-inner dark:bg-blue-500/20 dark:text-blue-400">
                    <Lock className="size-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 font-mono">
                    Zero-Trust Architecture
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Bank-Grade Security & Compliance
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Security by design. Every application repository features automated SAST/DAST audits, continuous dependency vulnerability monitoring, and strict alignment with OWASP Top 10 guidelines.
                </p>

                {/* Live Security Inspector Simulation */}
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-950/20 p-4 font-mono text-xs dark:bg-slate-950/70">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-blue-500/20 text-blue-400 text-[11px] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="size-3.5" /> secops-audit --live
                    </span>
                    <span className="text-emerald-400">100% PASS</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>✓ AES-256 GCM Data Encryption</span>
                      <span className="text-emerald-400 font-semibold">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>✓ TLS 1.3 Strict Transport</span>
                      <span className="text-emerald-400 font-semibold">Enforced</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>✓ SOC2 / GDPR Data Boundary</span>
                      <span className="text-emerald-400 font-semibold">Compliant</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>✓ Automated Dependency SAST</span>
                      <span className="text-emerald-400 font-semibold">0 Vulns</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">Enterprise Hardened</span>
                <span>Defense-in-depth protocol</span>
              </div>
            </motion.div>

            {/* Bento Card 3: 2-Week Sprint Velocity with Animated Step-by-Step Simulator (4 cols) */}
            <motion.div
              variants={fadeUpSpring}
              className="enterprise-value-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-inner dark:bg-amber-500/20 dark:text-amber-400 mb-5">
                  <Zap className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Continuous 2-Week Sprints
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Experience tangible, production-ready deliverables every 14 days with live staging preview URLs and interactive review demos.
                </p>

                {/* Animated Sprint Pipeline Simulator */}
                <div className="mt-5 space-y-2">
                  {[
                    { step: "01", name: "Sprint Planning & Architecture", time: "Day 1" },
                    { step: "02", name: "Concurrent Feature Development", time: "Day 2-9" },
                    { step: "03", name: "Automated CI/CD & Security Gate", time: "Day 10-12" },
                    { step: "04", name: "Live Staging Demo & Deployment", time: "Day 14" },
                  ].map((s, idx) => (
                    <div
                      key={s.step}
                      className={cn(
                        "flex items-center justify-between rounded-xl p-2 text-xs transition-all duration-300 border",
                        simulatedStep === idx
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold shadow-xs scale-102"
                          : "border-transparent bg-slate-100/70 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] opacity-75">{s.step}</span>
                        <span className="text-[11px] truncate">{s.name}</span>
                      </div>
                      <span className="font-mono text-[10px] opacity-80 shrink-0">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 font-mono text-[11px] text-amber-700 dark:text-amber-400 font-semibold pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span>// Rapid Feedback Loop</span>
                <span className="inline-flex size-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Bento Card 4: 99.999% High Availability SLA & Multi-AZ Cluster (4 cols) */}
            <motion.div
              variants={fadeUpSpring}
              className="enterprise-value-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-inner dark:bg-emerald-500/20 dark:text-emerald-400 mb-5">
                  <Activity className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  99.999% Mission-Critical SLA
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Self-healing Kubernetes clusters, automated zero-downtime blue/green rollouts, and multi-region load balancers handling millions of requests.
                </p>

                {/* Cluster Node Status HUD */}
                <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 font-mono text-xs dark:bg-slate-950/70 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold border-b border-emerald-500/20 pb-1.5">
                    <span>Region Telemetry</span>
                    <span>Health Status</span>
                  </div>
                  {[
                    { region: "us-east-1 (N. Virginia)", status: "Active • 100%", ping: "12ms" },
                    { region: "eu-west-1 (Frankfurt)", status: "Active • 100%", ping: "18ms" },
                    { region: "ap-southeast-1 (Singapore)", status: "Active • 100%", ping: "24ms" },
                  ].map((node) => (
                    <div key={node.region} className="flex items-center justify-between text-[10px] text-slate-300">
                      <span className="truncate max-w-[130px]">{node.region}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">{node.status}</span>
                        <span className="text-slate-400">{node.ping}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span>// Multi-AZ Automated Failover</span>
                <span className="inline-flex size-2 rounded-full bg-emerald-500" />
              </div>
            </motion.div>

            {/* Bento Card 5: 100% IP & Clean Code Ownership (4 cols) */}
            <motion.div
              variants={fadeUpSpring}
              className="enterprise-value-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] md:col-span-1 lg:col-span-4 dark:border-white/10 dark:bg-slate-900/80"
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 shadow-inner dark:bg-indigo-500/20 dark:text-indigo-400 mb-5">
                  <Award className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  100% IP & Source Ownership
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  You own 100% of your source code, infrastructure IaC configurations, architectural blueprints, and UI assets with zero proprietary lock-in.
                </p>

                {/* Git Repository Guarantee Pill */}
                <div className="mt-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 font-mono text-xs dark:bg-slate-950/70">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                    <GitBranch className="size-3.5" /> git checkout main
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <p>• Complete Commit History</p>
                    <p>• Clean TypeScript Contracts</p>
                    <p>• Terraform & Dockerfile IaC</p>
                    <p>• Full Architectural Wiki & API Docs</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 font-mono text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span>// Zero Vendor Lock-in</span>
                <span className="inline-flex size-2 rounded-full bg-indigo-500" />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Tab 2: Comparison Radar Matrix: ULTRABULB IT vs Traditional Agencies */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_SMOOTH}
            className="enterprise-comparison-panel overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
          >
            <div className="border-b border-slate-100 p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Direct Comparison: The ULTRABULB Standard
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Why modern high-growth companies transition away from legacy agencies and offshore shops.
                  </p>
                </div>
                <Badge className="rounded-full bg-cyan-500/10 text-cyan-700 border-cyan-500/30 px-3.5 py-1 text-xs font-mono font-bold dark:bg-cyan-500/20 dark:text-cyan-300">
                  Engineering Benchmark
                </Badge>
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-100/70 text-xs uppercase tracking-wider text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-400">
                    <th className="py-4 px-6 font-bold">Pillar / Capability</th>
                    <th className="py-4 px-6 font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 dark:bg-cyan-500/10">
                      ULTRABULB IT Engineering
                    </th>
                    <th className="py-4 px-6 font-bold text-slate-500 dark:text-slate-400">
                      Traditional Agencies & Freelancers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40",
                        row.highlight && "bg-cyan-500/[0.02] dark:bg-cyan-500/[0.04]"
                      )}
                    >
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-cyan-500 shrink-0" />
                        <span>{row.feature}</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 bg-cyan-500/5 dark:bg-cyan-500/10">
                        <div className="flex items-start gap-2">
                          <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{row.ultrabulb}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="size-4 text-rose-500/80 shrink-0 mt-0.5" />
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA Bar */}
        <div className="enterprise-value-cta mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-slate-200/90 bg-gradient-to-r from-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-lg">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                Ready to accelerate your product roadmap with dedicated senior squads?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Book a technical discovery call with our principal architects today.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-6 text-xs sm:text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-95"
          >
            <Link href="/schedule" className="gap-2">
              <span>Schedule Discovery Call</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
