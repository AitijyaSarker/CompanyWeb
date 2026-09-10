"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Sparkles, Monitor, Smartphone, Code2, BarChart3 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SPRING_BOUNCY,
  SPRING_SMOOTH,
  SPRING_SNAPPY,
  TextReveal,
  fadeUpSpring,
  staggerContainer,
} from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { data } = useSiteData();
  const content = data?.content;
  const prefersReducedMotion = useReducedMotion();

  const badge = getContent(content, "hero_badge", "Software Development Agency");
  const title = getContent(content, "hero_title", "We Code Your Ideas Into Light");
  const subtitle = getContent(
    content,
    "hero_subtitle",
    "ULTRABULB IT builds digital products, software, websites, mobile applications, AI solutions, and modern technology systems."
  );
  const ctaPrimary = getContent(content, "hero_cta_primary", "Explore Our Work");
  const ctaSecondary = getContent(content, "hero_cta_secondary", "Schedule a Call");
  const statsLabel = getContent(content, "stats_label", "A proven track record of consistent growth");

  const titleWords = title.split(" ");
  const accentIndex = Math.min(2, Math.max(0, titleWords.length - 2));
  const titleBefore = titleWords.slice(0, accentIndex).join(" ");
  const accentWord = titleWords[accentIndex] ?? "";
  const titleAfter = titleWords.slice(accentIndex + 1).join(" ");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-(--brand-surface) text-(--brand-navy) dark:bg-(--brand-navy-dark) dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:bg-grid-dark dark:opacity-30" />
      <div className="hero-ambient pointer-events-none absolute inset-0" />

      <div className="site-container relative grid items-center gap-10 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-5 text-left"
        >
          <motion.div variants={fadeUp}>
            <Badge className="gap-1.5 rounded-full border-(--brand-cyan)/30 bg-(--brand-cyan)/10 px-3 py-1 text-xs font-semibold text-(--brand-cyan)">
              {!prefersReducedMotion ? (
                <motion.span
                  className="size-1.5 rounded-full bg-(--brand-cyan)"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <span className="size-1.5 rounded-full bg-(--brand-cyan)" />
              )}
              {badge}
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={fadeUpSpring}
            className="max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            {titleBefore ? <><TextReveal text={titleBefore} as="span" />{" "}</> : null}
            <motion.span
              className="text-(--brand-cyan) inline-block"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_BOUNCY, delay: 0.35 }}
            >
              {accentWord}
            </motion.span>
            {titleAfter ? <>{" "}<TextReveal text={titleAfter} as="span" delay={0.4} /></> : null}
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-lg text-balance text-base leading-relaxed text-muted-foreground dark:text-white/70 sm:text-lg">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING_SNAPPY}>
              <Button asChild size="lg" className="h-11 rounded-full bg-(--brand-cyan) px-6 font-semibold text-(--brand-navy-dark) hover:bg-(--brand-cyan)/90">
                <Link href="/projects" className="gap-2">
                  <Sparkles className="size-4" />
                  {ctaPrimary}
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING_SNAPPY}>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full border-(--brand-navy)/20 bg-white/80 px-6 hover:bg-(--brand-cyan-pale) dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                <Link href="/schedule">{ctaSecondary}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <HeroVisual prefersReducedMotion={!!prefersReducedMotion} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="col-span-full text-center text-sm font-medium uppercase tracking-wider text-muted-foreground dark:text-white/50 lg:text-left"
        >
          {statsLabel}
        </motion.p>

        <div className="col-span-full">
          <StatsBento content={content} />
        </div>

        {!prefersReducedMotion ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 0.9 }, y: { delay: 0.9, duration: 1.8, repeat: Infinity } }}
            className="col-span-full flex justify-center pt-2"
          >
            <Link href="/about" aria-label="Scroll to About section" className="text-muted-foreground transition-colors hover:text-(--brand-cyan) dark:text-white/50">
              <ChevronDown className="size-6" />
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function HeroVisual({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const panels = [
    { icon: Monitor, label: "Web Platform", x: "5%", y: "10%", delay: 0.2 },
    { icon: Smartphone, label: "Mobile App", x: "55%", y: "5%", delay: 0.35 },
    { icon: Code2, label: "Backend API", x: "10%", y: "55%", delay: 0.5 },
    { icon: BarChart3, label: "Analytics", x: "50%", y: "50%", delay: 0.65 },
  ];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...SPRING_SMOOTH, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-lg"
    >
      <div className="absolute inset-0 rounded-3xl border border-(--brand-navy)/10 bg-white/55 shadow-[0_24px_70px_rgb(15_46_80/0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none" />
      <div className="absolute inset-4 rounded-2xl border border-(--brand-cyan)/20 bg-white/45 dark:bg-(--brand-navy)/60" />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, clipPath: "inset(100% 0 0 0 round 1.5rem)" }}
        animate={prefersReducedMotion ? undefined : { opacity: [0, 1, 1], scale: [0.88, 1.04, 1], clipPath: ["inset(100% 0 0 0 round 1.5rem)", "inset(0 0 0 0 round 1.5rem)", "inset(0 0 0 0 round 1.5rem)"] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.4, times: [0, 0.7, 1], ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={prefersReducedMotion ? undefined : { delay: 2.7, duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-3xl p-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: [0, 0.8, 0], scale: [0.85, 1.15, 1.2] }}
            transition={prefersReducedMotion ? undefined : { duration: 1.6, delay: 1.05, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-(--brand-cyan)/25 blur-2xl"
          />
          <img src="/UltrabulbLogo.svg" alt="Ultrabulb IT" className="relative size-44 object-contain drop-shadow-[0_8px_18px_rgb(0_0_0/0.16)] sm:size-52" />
        </motion.div>
      </motion.div>
      {panels.map((p) => (
        <motion.div
          key={p.label}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, -4, 0] }}
          transition={{
            opacity: { delay: p.delay, duration: 0.4 },
            scale: { delay: p.delay, ...SPRING_SMOOTH },
            y: prefersReducedMotion ? undefined : { delay: p.delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ left: p.x, top: p.y }}
          className="absolute flex items-center gap-2 rounded-xl border border-(--brand-navy)/10 bg-white/70 px-3 py-2 text-(--brand-navy) shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          <p.icon className="size-4 text-(--brand-cyan)" />
          <span className="text-xs font-medium text-(--brand-navy)/80 dark:text-white/80">{p.label}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-(--brand-cyan)/30 bg-(--brand-cyan)/10 px-4 py-2"
      >
        <span className="size-2 animate-pulse rounded-full bg-(--brand-cyan)" />
        <span className="text-xs font-medium text-(--brand-cyan)">Live ecosystem</span>
      </motion.div>
    </motion.div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  index: number;
  featured?: boolean;
}

function StatCard({ value, label, index, featured }: StatCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { prefix, number, suffix } = parseNumber(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...SPRING_SMOOTH, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: SPRING_BOUNCY }}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 text-center backdrop-blur-sm sm:p-6 dark:border-white/10 dark:bg-white/5",
        featured && "border-(--brand-cyan)/30 bg-(--brand-cyan-pale)/50 dark:bg-(--brand-cyan)/10"
      )}
    >
      <div className={cn("relative text-3xl font-bold tracking-tight sm:text-4xl", featured ? "text-(--brand-cyan)" : "text-(--brand-navy) dark:text-white")}>
        {prefix}
        {number !== null ? <CountUp end={number} inView={inView} /> : <span>{value}</span>}
        {suffix}
      </div>
      <div className="relative text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/60 sm:text-sm">{label}</div>
    </motion.div>
  );
}

function CountUp({ end, inView }: { end: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, end, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onComplete: () => setDisplay(String(end)) });
      return () => controls.stop();
    }
  }, [inView, end, motionValue]);

  React.useEffect(() => spring.on("change", (v) => setDisplay(String(Math.round(v)))), [spring]);
  return <span>{display}</span>;
}

function parseNumber(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: "" };
  const [, prefix, numStr, suffix] = match;
  const number = numStr.includes(".") ? parseFloat(numStr) : parseInt(numStr, 10);
  return { prefix, number: Number.isFinite(number) ? number : null, suffix };
}

function StatsBento({ content }: { content: Record<string, string> | undefined }) {
  const stats = [
    { value: getContent(content, "stat_projects_value", "120+"), label: getContent(content, "stat_projects_label", "Projects Delivered"), featured: false },
    { value: getContent(content, "stat_clients_value", "45+"), label: getContent(content, "stat_clients_label", "Happy Clients"), featured: true },
    { value: getContent(content, "stat_countries_value", "18"), label: getContent(content, "stat_countries_label", "Countries Served"), featured: false },
    { value: getContent(content, "stat_uptime_value", "99.9%"), label: getContent(content, "stat_uptime_label", "Average Uptime"), featured: false },
  ];
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => <StatCard key={s.label} value={s.value} label={s.label} index={i} featured={s.featured} />)}
    </div>
  );
}
