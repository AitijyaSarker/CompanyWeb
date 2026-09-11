"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & System Architecture",
    desc: "We analyze business domain requirements, design schema models, select optimal tech stacks, and create immutable API contracts.",
    deliverables: ["Architecture Blueprint", "Data Schema", "Security Threat Model"],
    icon: Compass,
  },
  {
    step: "02",
    title: "High-Fidelity Prototyping",
    desc: "Interactive UI/UX design in Figma with complete design systems, micro-interaction states, and stakeholder approval milestones.",
    deliverables: ["Clickable Prototype", "Design System Tokens", "User Journey Flow"],
    icon: Palette,
  },
  {
    step: "03",
    title: "Agile Engineering & Sprints",
    desc: "Clean modular TypeScript development with 2-week continuous delivery cycles, automated test coverage, and weekly demo syncs.",
    deliverables: ["Production Codebase", "API Documentation", "Unit/Integration Tests"],
    icon: Code2,
  },
  {
    step: "04",
    title: "Rigorous QA & SecOps Hardening",
    desc: "End-to-end load testing, OWASP security scanning, cross-browser audits, accessibility (WCAG AA), and performance tuning.",
    deliverables: ["Security Audit Report", "Performance Benchmarks", "Zero-Defect Signoff"],
    icon: ShieldCheck,
  },
  {
    step: "05",
    title: "Cloud Rollout & Scale Monitoring",
    desc: "Containerized deployment via Docker/Kubernetes with zero-downtime blue/green switches, APM monitoring, and automated alerting.",
    deliverables: ["Live Production Cluster", "CI/CD Pipeline", "24/7 SLA Telemetry"],
    icon: Rocket,
  },
];

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="process"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-950 text-white"
    >
      {/* Background Cyber Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
      <div className="pointer-events-none absolute top-1/3 right-0 size-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="site-container relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="mr-1.5 size-3.5" />
            Methodology & Execution
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Our 5-Stage Engineering Lifecycle
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A battle-tested software delivery engine designed to eliminate project risk, maximize velocity, and guarantee enterprise-grade resilience.
          </p>
        </div>

        {/* Process Steps Timeline Flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={fadeUpSpring}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/95 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="size-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Key Deliverables
                  </span>
                  {step.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="size-3.5 text-cyan-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* 6th Card: Call to Action */}
          <motion.div
            variants={fadeUpSpring}
            className="flex flex-col justify-between rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/60 to-slate-950 p-6 sm:p-8 backdrop-blur-xl"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 mb-6">
                <Rocket className="size-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ready to start Sprint 0?</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Schedule a 30-minute technical roadmap discovery session with our Lead Software Architect.
              </p>
            </div>
            <div className="pt-6">
              <Button
                asChild
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold py-6 shadow-[0_0_25px_rgba(6,182,212,0.35)]"
              >
                <Link href="/schedule" className="gap-2 justify-center">
                  <span>Schedule Discovery Call</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
