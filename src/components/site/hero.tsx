"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getContent, useSiteData } from "@/hooks/use-site-data";

/* ---------------- Hero ---------------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const CLIENT_LABELS = ["Nexus Edu", "ShopWave", "MediTrack", "FinPilot", "FieldOps"];

export function Hero() {
  const { data } = useSiteData();
  const content = data?.content;

  const badge = getContent(content, "hero_badge", "Software Development Agency");
  const title = getContent(content, "hero_title", "We Code Your Ideas Into Light");
  const subtitle = getContent(
    content,
    "hero_subtitle",
    "ULTRABULB IT is a full-cycle software development agency building custom software, cloud platforms, AI products and digital experiences that power businesses across the globe."
  );
  const ctaPrimary = getContent(content, "hero_cta_primary", "Explore Our Work");
  const ctaSecondary = getContent(content, "hero_cta_secondary", "Schedule a Call");
  const statsLabel = getContent(
    content,
    "stats_label",
    "The positive force behind growing digital businesses"
  );

  // Split title into words so we can color one of them with gradient.
  const titleWords = title.split(" ");
  const accentIndex = Math.min(2, Math.max(0, titleWords.length - 2));

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50 via-background to-background dark:from-amber-950/20" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-amber-400/25 blur-3xl dark:bg-amber-500/15" />
      <div className="pointer-events-none absolute -right-16 top-40 size-80 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp}>
            <Badge className="gap-1.5 rounded-full border-amber-300/40 bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              <Lightbulb className="size-3.5" />
              {badge}
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {titleWords.map((word, i) => (
              <React.Fragment key={`${word}-${i}`}>
                {i === accentIndex ? (
                  <span className="gradient-text-amber">{word}</span>
                ) : (
                  <span>{word}</span>
                )}
                {i < titleWords.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <Link href="#products" className="gap-2">
                <Sparkles className="size-4" />
                {ctaPrimary}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border/70 bg-background/70 px-7 text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/schedule">{ctaSecondary}</Link>
            </Button>
          </motion.div>

          {/* Trusted-by row */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70"
          >
            <span className="text-[10px] uppercase tracking-[0.18em]">Trusted by</span>
            {CLIENT_LABELS.map((label) => (
              <span key={label} className="text-sm font-semibold text-muted-foreground/80">
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          {statsLabel}
        </motion.p>

        <StatsBento content={content} />

        {/* Scroll-down chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.1, duration: 0.6 },
            y: { delay: 1.1, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mt-12 flex justify-center"
        >
          <Link href="#about" aria-label="Scroll to About section" className="text-muted-foreground">
            <ChevronDown className="size-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Stats bento ---------------- */

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  featured?: boolean;
}

function StatCard({ value, label, className, featured }: StatCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Try to detect leading numeric portion to count up.
  const { prefix, number, suffix } = parseNumber(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={
        "group relative flex flex-col items-start justify-end gap-2 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 " +
        (className ?? "")
      }
    >
      {featured ? (
        <div className="absolute -right-6 -top-6 size-24 rounded-full bg-amber-400/20 blur-2xl" />
      ) : null}
      <div
        className={
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl " +
          (featured ? "gradient-text-violet" : "gradient-text-amber")
        }
      >
        {prefix}
        {number !== null ? (
          <CountUp end={number} inView={inView} />
        ) : (
          <span>{value}</span>
        )}
        {suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function CountUp({ end, inView }: { end: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, end, {
        duration: 1.2,
        ease: "easeOut",
        onComplete: () => setDisplay(String(end)),
      });
      return () => controls.stop();
    }
  }, [inView, end, motionValue]);

  React.useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(String(Math.round(latest)));
    });
  }, [spring]);

  return <span>{display}</span>;
}

function parseNumber(value: string): { prefix: string; number: number | null; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: "" };
  const [, prefix, numStr, suffix] = match;
  const number = numStr.includes(".") ? parseFloat(numStr) : parseInt(numStr, 10);
  return { prefix, number: Number.isFinite(number) ? number : null, suffix };
}

function StatsBento({ content }: { content: Record<string, string> | undefined }) {
  const stats = [
    {
      value: getContent(content, "stat_projects_value", "120+"),
      label: getContent(content, "stat_projects_label", "Projects Delivered"),
      featured: false,
    },
    {
      value: getContent(content, "stat_clients_value", "45+"),
      label: getContent(content, "stat_clients_label", "Happy Clients"),
      featured: true,
    },
    {
      value: getContent(content, "stat_countries_value", "18"),
      label: getContent(content, "stat_countries_label", "Countries Served"),
      featured: false,
    },
    {
      value: getContent(content, "stat_uptime_value", "99.9%"),
      label: getContent(content, "stat_uptime_label", "Average Uptime"),
      featured: false,
    },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard
          key={s.label}
          value={s.value}
          label={s.label}
          featured={s.featured}
          className={i === 1 ? "md:col-span-2" : ""}
        />
      ))}
    </div>
  );
}
