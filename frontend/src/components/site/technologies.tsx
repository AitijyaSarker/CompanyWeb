"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Search,
  Zap,
  ShieldCheck,
  Server,
  Workflow,
  Globe2,
  Database,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { TechMarquee } from "@/components/site/tech-marquee";
import { TechIcon } from "@/components/site/tech-icons";
import { TECH_CATEGORIES, TECH_DETAILS, TechItemData } from "@/data/technologies";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Technologies() {
  const { data } = useSiteData();
  const content = data?.content;
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeTab, setActiveTab] = React.useState<"grid" | "architecture">("grid");

  const badge = getContent(content, "tech_badge", "Technology Stack");
  const title = getContent(content, "tech_title", "Modern Engineering Stack");
  const subtitle = getContent(
    content,
    "tech_subtitle",
    "We select battle-tested, high-performance frameworks and cloud-native infrastructure that ensure sub-second latency and long-term maintainability."
  );

  // Filter categories
  const categories = ["All", ...TECH_CATEGORIES.map((c) => c.name)];

  // Filter detailed items based on selected category & search query
  const filteredTechs = React.useMemo(() => {
    return TECH_DETAILS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="technologies"
      aria-labelledby="tech-title"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/70 dark:bg-slate-950/80 text-foreground transition-colors duration-300"
    >
      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl dark:from-cyan-500/15 dark:via-blue-600/10" />

      <div className="site-container relative">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
            <Cpu className="size-3.5 animate-spin-slow" />
            <span>{badge}</span>
          </Badge>
          <h2
            id="tech-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white"
          >
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="inline-flex rounded-full border border-slate-200/80 bg-white/80 p-1 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80">
              <button
                onClick={() => setActiveTab("grid")}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "grid"
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Layers className="size-3.5" />
                <span>Technologies Matrix</span>
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "architecture"
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Workflow className="size-3.5" />
                <span>Enterprise Architecture Flow</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === "grid" ? (
          <div>
            {/* Filter & Search Bar */}
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const count =
                    cat === "All"
                      ? TECH_DETAILS.length
                      : TECH_DETAILS.filter((t) => t.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)] font-bold"
                          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-cyan-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                          selectedCategory === cat
                            ? "bg-slate-950/20 text-slate-950 font-bold"
                            : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Search Input */}
              <div className="relative w-full lg:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name, tag, or capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-medium text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Grid Showcase */}
            {filteredTechs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 p-12 text-center dark:border-white/10 dark:bg-slate-900/30">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  No technologies found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-bold text-slate-950"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredTechs.map((tech) => (
                    <motion.div
                      layout
                      key={tech.name}
                      variants={fadeUpSpring}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_12px_30px_rgba(6,182,212,0.12)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_12px_30px_rgba(6,182,212,0.18)]"
                    >
                      <div>
                        {/* Top Row: Icon & Metric Badge */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800/80">
                            <TechIcon name={tech.name} size={28} />
                          </div>
                          <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold tracking-tight text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                            {tech.metrics}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div className="mb-2.5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                              {tech.name}
                            </h3>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                              {tech.category.split("&")[0].trim()}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {tech.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          {tech.description}
                        </p>
                      </div>

                      {/* Capabilities Tags */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1.5">
                        {tech.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-white/5 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        ) : (
          /* Enterprise Architecture Flow View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200/90 bg-white/80 p-6 lg:p-10 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
          >
            <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-slate-100 pb-6 text-center sm:flex-row sm:text-left dark:border-white/10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Full-Stack Enterprise Architecture Flow
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  How ULTRABULB IT combines modern tools into high-availability distributed systems.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  Live Topology
                </span>
              </div>
            </div>

            {/* 4-Tier Pipeline */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {/* Tier 1: Client & Edge */}
              <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5 dark:border-cyan-500/20 dark:bg-cyan-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe2 className="size-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                      Tier 1: Edge & Client
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Next.js 15 & Global CDN
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Streaming Server Components, Edge Middleware, ISR caching, and Tailwind v4 design tokens.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-cyan-700 dark:text-cyan-400 pt-3 border-t border-cyan-500/20">
                  <span>Latency</span>
                  <span className="font-bold">&lt; 35ms TTFB</span>
                </div>
              </div>

              {/* Tier 2: Microservices & Gateway */}
              <div className="flex flex-col justify-between rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 dark:border-blue-500/20 dark:bg-blue-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="size-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                      Tier 2: API Gateway
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Concurrent Microservices
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    FastAPI & Node.js clusters processing REST / GraphQL endpoints with rate limiting & JWT verification.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Node.js", "Python", "GraphQL", "Prisma"].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-blue-700 dark:text-blue-400 pt-3 border-t border-blue-500/20">
                  <span>Concurrency</span>
                  <span className="font-bold">50k+ Req/sec</span>
                </div>
              </div>

              {/* Tier 3: AI Agents & Logic */}
              <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Tier 3: AI Pipelines
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    LLM & Vector Intelligence
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Autonomous LangChain agent reasoning, vector embeddings with pgvector, and automated prompt synthesis.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["OpenAI", "LangChain", "TensorFlow", "pgvector"].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-emerald-700 dark:text-emerald-400 pt-3 border-t border-emerald-500/20">
                  <span>Intelligence</span>
                  <span className="font-bold">GPT-4o Multi-Modal</span>
                </div>
              </div>

              {/* Tier 4: Distributed Cloud & Data */}
              <div className="flex flex-col justify-between rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 dark:border-purple-500/20 dark:bg-purple-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="size-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      Tier 4: Cloud & Data
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Multi-AZ High Availability
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    Kubernetes automated cluster scaling, PostgreSQL read-replicas, and Redis sub-millisecond caching.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"].map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-purple-700 dark:text-purple-400 pt-3 border-t border-purple-500/20">
                  <span>Uptime SLA</span>
                  <span className="font-bold">99.999% Fault Tolerant</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enterprise Architecture Trust Metrics Bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:grid-cols-4 dark:border-white/10 dark:bg-slate-900/60">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">99.999%</span>
            <span className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">High Availability SLA</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Multi-region redundancy</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">&lt; 50ms</span>
            <span className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">Global TTFB</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Edge network delivery</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
            <span className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">Type-Safe Contracts</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Strict TypeScript & Prisma</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">Zero</span>
            <span className="mt-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">Vendor Lock-in</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Cloud-agnostic Docker/K8s</span>
          </div>
        </div>
      </div>

      {/* Infinite Dual-Direction Animated Marquee */}
      <div className="mt-16">
        <TechMarquee />
      </div>
    </section>
  );
}
