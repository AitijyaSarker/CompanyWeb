"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Eye,
  Palette,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Award,
  Zap,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  staggerContainer,
  fadeUpSpring,
} from "@/components/site/motion";
import { getContent, parseContentJson, useSiteData } from "@/hooks/use-site-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  BrainCircuit,
  Palette,
  ShieldCheck,
  Rocket,
};

interface FieldItem {
  icon: string;
  title: string;
  desc: string;
}

export function About({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;

  const badge = getContent(content, "about_badge", "About ULTRABULB");
  const title = getContent(content, "about_title", "Engineering Digital Excellence");
  const description = getContent(
    content,
    "about_description",
    "ULTRABULB IT is an elite software engineering agency founded with one immutable principle — every breakthrough idea deserves to be architected into a resilient, scalable digital product."
  );
  const visionTitle = getContent(content, "about_vision_title", "Our Vision");
  const visionText = getContent(
    content,
    "about_vision_text",
    "To be the global benchmark for enterprise engineering velocity, high-concurrency cloud architecture, and autonomous AI innovation."
  );
  const missionTitle = getContent(content, "about_mission_title", "Our Mission");
  const missionText = getContent(
    content,
    "about_mission_text",
    "To empower ambitious global companies with zero-debt software engineering, bank-grade security, and transformative digital experiences."
  );
  const fieldTitle = getContent(content, "about_field_title", "Our Engineering Domains");
  const fieldText = getContent(
    content,
    "about_field_text",
    "We operate across the entire software lifecycle — product blueprinting, UI/UX design systems, cloud-native microservices, custom AI agents, and 24/7 automated monitoring."
  );
  const fields: FieldItem[] = parseContentJson<FieldItem[]>(content, "fields", []);

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/50 dark:bg-slate-950/40 text-foreground">
      <div className="site-container relative">
        {/* Heading */}
        {!hideHeading && (
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Users className="mr-1.5 size-3.5" />
              {badge}
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
        )}

        {/* Vision & Mission Bento */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mb-12"
        >
          {/* Vision Card */}
          <motion.div
            variants={fadeUpSpring}
            className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                <Eye className="size-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{visionTitle}</h3>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {visionText}
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={fadeUpSpring}
            className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Target className="size-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{missionTitle}</h3>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {missionText}
            </p>
          </motion.div>
        </motion.div>

        {/* Engineering Domains Strip */}
        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white/90 to-slate-100/90 p-8 sm:p-12 shadow-sm backdrop-blur-xl dark:border-white/10 dark:from-slate-900/80 dark:to-slate-950/90">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Cross-Functional Mastery
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {fieldTitle}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {fieldText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(fields.length > 0
              ? fields
              : [
                  { icon: "Code2", title: "Enterprise Web Platforms", desc: "Next.js & React 19 scalable frontends" },
                  { icon: "Cloud", title: "Cloud & Microservices", desc: "AWS, Kubernetes, Docker & Serverless" },
                  { icon: "BrainCircuit", title: "Autonomous AI Agents", desc: "RAG vector retrieval & custom fine-tuning" },
                  { icon: "Palette", title: "Design Systems & UI/UX", desc: "Precision Figma prototypes & accessible tokens" },
                  { icon: "ShieldCheck", title: "SecOps & Compliance", desc: "Automated vulnerability & penetration audits" },
                  { icon: "Rocket", title: "High-Throughput Mobile", desc: "Native iOS & Android cross-platform apps" },
                ]
            ).map((field, i) => {
              const Icon = ICON_MAP[field.icon] || Code2;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{field.title}</h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{field.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
