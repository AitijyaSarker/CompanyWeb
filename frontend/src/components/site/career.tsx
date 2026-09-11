"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  Heart,
  Laptop,
  GraduationCap,
  Clock,
  DollarSign,
  Coffee,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, parseContentJson, useSiteData, type Vacancy } from "@/hooks/use-site-data";

const PERKS = [
  { icon: Laptop, title: "High-End M-Series Tech", desc: "Top-of-the-line Apple Silicon hardware & dual 4K monitors." },
  { icon: Clock, title: "Flexible & Remote-First", desc: "Work from anywhere with core async collaboration hours." },
  { icon: GraduationCap, title: "Learning & Conference Budget", desc: "$2,000/yr stipend for books, courses, and global tech conferences." },
  { icon: DollarSign, title: "Competitive Salary & Equity", desc: "Top 10% market compensation with annual performance reviews." },
  { icon: Heart, title: "Comprehensive Healthcare", desc: "Full medical coverage for you and your immediate dependents." },
  { icon: Coffee, title: "Wellness & Subscriptions", desc: "Gym allowances, mental health resources, and workspace setup grants." },
];

function HiringBadge({ hiring }: { hiring: boolean }) {
  if (hiring) {
    return (
      <Badge className="gap-1.5 rounded-full border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        Actively Hiring
      </Badge>
    );
  }
  return (
    <Badge className="rounded-full border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5">
      Position Filled
    </Badge>
  );
}

function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const requirements = (vacancy.requirements ?? "")
    .split(/\r?\n|,/)
    .map((r) => r.trim())
    .filter(Boolean);

  return (
    <motion.article
      variants={fadeUpSpring}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] dark:border-white/10 dark:bg-slate-900/70"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <HiringBadge hiring={vacancy.hiring} />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {vacancy.department}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {vacancy.type}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="size-3.5 text-cyan-500" />
            <span>{vacancy.location}</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {vacancy.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {vacancy.description}
        </p>

        {requirements.length > 0 && (
          <div className="mt-6 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Candidate Qualifications
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 pt-5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">ID: ULTRABULB-ROLE-{vacancy.id}</span>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold px-5"
        >
          <Link href={`/contact?subject=Application: ${vacancy.title}`}>
            <span>Apply Now</span>
            <ArrowRight className="size-3.5 ml-1.5" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function Career({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const vacancies = data?.vacancies || [];
  const content = data?.content;

  const badge = getContent(content, "career_badge", "Careers at ULTRABULB");
  const title = getContent(content, "career_title", "Build the Future of Enterprise Tech");
  const subtitle = getContent(
    content,
    "career_subtitle",
    "Join our world-class engineering collective. We solve hard distributed problems, push AI boundaries, and engineer software that matters."
  );

  return (
    <section id="career" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/50 dark:bg-slate-950/40 text-foreground">
      <div className="site-container relative">
        {/* Section Header */}
        {!hideHeading && (
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Briefcase className="mr-1.5 size-3.5" />
              {badge}
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        )}

        {/* Culture & Perks Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Engineering Culture & Benefits
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Why Engineers Thrive Here</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{perk.title}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Vacancies Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Open Roles</h3>
            <p className="text-xs sm:text-sm text-slate-500">Explore active positions across our engineering hubs.</p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            {vacancies.length} Active {vacancies.length === 1 ? "Role" : "Roles"}
          </span>
        </div>

        {/* Vacancies List */}
        {vacancies.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-white/10">
            <p className="text-base font-medium">No open roles currently posted.</p>
            <p className="text-xs text-slate-400 mt-1">We are always scouting exceptional engineering talent. Send your GitHub/portfolio to careers@ultrabulb.com.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
