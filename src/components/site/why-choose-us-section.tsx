"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Zap,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Lightbulb,
  CheckCircle2,
  Target,
} from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: "Lightning-Fast Development",
    description:
      "We optimize every step of development to deliver quickly without compromising quality. Modern tools and efficient processes mean faster time-to-market.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Security isn't an afterthought. We build robust systems with industry best practices, compliance, and proactive security measures.",
  },
  {
    icon: Users,
    title: "Expert Team Partnership",
    description:
      "You'll work with experienced engineers, designers, and architects who bring diverse expertise and stay current with cutting-edge technology.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description:
      "We design systems that grow with your business. From MVP to enterprise, our architecture supports millions of users and petabytes of data.",
  },
  {
    icon: Clock,
    title: "Transparent Communication",
    description:
      "Regular updates, clear timelines, and honest assessments. We keep you informed every step of the way with detailed progress reports.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Guidance",
    description:
      "Beyond coding, we provide technology strategy and architectural advice to ensure your long-term success and competitive advantage.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyChooseUsSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-(--brand-cyan)/5 to-transparent relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-(--brand-cyan) rounded-full blur-3xl opacity-5 dark:opacity-10"
          aria-hidden="true"
        />
      </div>

      <div className="site-container relative">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Choose ULTRABULB IT
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground dark:text-white/70 max-w-xl">
            We're not just a development agency. We're your technology partner, committed to understanding your business and building solutions that drive real results.
          </p>
        </motion.div>

        {/* Differentiators grid */}
        <motion.div
          variants={prefersReducedMotion ? {} : container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16"
        >
          {DIFFERENTIATORS.map((diff, i) => (
            <motion.div key={diff.title} variants={item} className="group">
              <div className={`h-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 
                border-border/60 bg-card/50 hover:bg-card/80 hover:border-(--brand-cyan)/30
                dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10
                group-hover:shadow-lg group-hover:-translate-y-1`}>
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-xl bg-(--brand-cyan)/10 group-hover:bg-(--brand-cyan)/20 transition-colors">
                  <diff.icon className="w-6 h-6 text-(--brand-cyan)" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white group-hover:text-(--brand-cyan) transition-colors">
                  {diff.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground dark:text-white/70 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-8 rounded-2xl border border-border/60 bg-gradient-to-br from-(--brand-cyan)/5 to-transparent dark:border-white/10 dark:bg-white/5"
        >
          <TrustMetric number="50+" label="Projects Delivered" />
          <TrustMetric number="99.9%" label="Uptime Guarantee" />
          <TrustMetric number="24/7" label="Support Available" />
          <TrustMetric number="6+" label="Years Experience" />
        </motion.div>
      </div>
    </section>
  );
}

function TrustMetric({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-(--brand-cyan) mb-1">
        {number}
      </div>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-white/70">
        {label}
      </p>
    </div>
  );
}
