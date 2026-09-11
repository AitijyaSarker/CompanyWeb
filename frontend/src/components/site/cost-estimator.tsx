"use client";

import * as React from "react";
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Smartphone,
  Globe,
  Cpu,
  Database,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ProjectTypeOption {
  id: string;
  name: string;
  desc: string;
  baseWeeks: number;
  icon: any;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "web",
    name: "Web Platform & SaaS",
    desc: "Next.js, React, scalable cloud architecture & microservices.",
    baseWeeks: 4,
    icon: Globe,
  },
  {
    id: "mobile",
    name: "Mobile App (iOS & Android)",
    desc: "React Native / Flutter with native performance & offline sync.",
    baseWeeks: 5,
    icon: Smartphone,
  },
  {
    id: "ai",
    name: "Enterprise AI & LLM Systems",
    desc: "Autonomous AI agents, RAG pipelines, fine-tuned models & automation.",
    baseWeeks: 4,
    icon: Cpu,
  },
  {
    id: "enterprise",
    name: "Full Enterprise Ecosystem",
    desc: "Multi-tenant architecture, ERP/CRM, distributed database systems.",
    baseWeeks: 8,
    icon: Layers,
  },
];

const FEATURE_OPTIONS = [
  { id: "auth", name: "Enterprise Auth & RBAC", weeks: 1, icon: Lock },
  { id: "ai_chat", name: "AI Agent & NLP Engine", weeks: 2, icon: Cpu },
  { id: "payment", name: "Payment & Subscription Billing", weeks: 1, icon: Zap },
  { id: "realtime", name: "Real-Time WebSockets & Sync", weeks: 1.5, icon: Sparkles },
  { id: "analytics", name: "Executive Analytics Dashboard", weeks: 1.5, icon: Database },
  { id: "security", name: "SOC2 / HIPAA Compliance Hardening", weeks: 2, icon: Shield },
];

const TIMELINE_OPTIONS = [
  { id: "express", label: "Express Sprint (Dedicated Team)", mult: 1.2 },
  { id: "standard", label: "Standard Production Flow", mult: 1.0 },
  { id: "extended", label: "Phase-by-Phase Rollout", mult: 0.9 },
];

export function CostEstimator() {
  const [selectedType, setSelectedType] = React.useState<string>("web");
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>(["auth", "analytics"]);
  const [timeline, setTimeline] = React.useState<string>("standard");

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculation
  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const featuresWeeks = selectedFeatures.reduce((acc, fId) => {
    const f = FEATURE_OPTIONS.find((opt) => opt.id === fId);
    return acc + (f ? f.weeks : 0);
  }, 0);

  const rawWeeks = currentType.baseWeeks + featuresWeeks;
  const mult = TIMELINE_OPTIONS.find((t) => t.id === timeline)?.mult || 1.0;
  const estimatedWeeks = Math.max(3, Math.round(rawWeeks * mult));

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-cyan-500/20 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 dark:bg-grid-dark dark:opacity-30" />
      <div className="pointer-events-none absolute -top-40 right-10 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 size-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="site-container relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
            <Calculator className="mr-1.5 size-3.5" />
            Interactive Scope & Architecture Engine
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Estimate Your Project Scope
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Select your architecture parameters to calculate estimated development sprints, team configuration, and roadmap deliverables.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Configuration Controls */}
          <div className="space-y-8 lg:col-span-7">
            {/* Step 1: Project Type */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300 font-bold">1</span>
                Select Core Architecture Type
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-50/90 text-slate-950 shadow-md dark:border-cyan-400 dark:bg-cyan-950/40 dark:text-white dark:shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                          : "border-slate-200/90 bg-white text-slate-800 shadow-sm hover:border-cyan-500/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-cyan-500 text-slate-950" : "bg-slate-100 text-cyan-600 dark:bg-white/10 dark:text-cyan-400"}`}>
                          <Icon className="size-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="size-5 text-cyan-600 dark:text-cyan-400" />}
                      </div>
                      <span className="text-base font-bold transition-colors">
                        {type.name}
                      </span>
                      <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {type.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Advanced Feature Modules */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300 font-bold">2</span>
                Add Required Feature Capabilities
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FEATURE_OPTIONS.map((feat) => {
                  const Icon = feat.icon;
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                        isChecked
                          ? "border-cyan-500 bg-cyan-50 text-slate-950 dark:border-cyan-500/60 dark:bg-cyan-950/30 dark:text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`size-4 ${isChecked ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"}`} />
                        <span className="text-xs sm:text-sm font-medium">{feat.name}</span>
                      </div>
                      <div
                        className={`size-4 rounded-md border flex items-center justify-center ${
                          isChecked ? "border-cyan-500 bg-cyan-500 text-white dark:border-cyan-400 dark:text-slate-950" : "border-slate-400 bg-transparent dark:border-slate-600"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="size-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline Cadence */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300 font-bold">3</span>
                Target Delivery Cadence
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {TIMELINE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`rounded-xl border p-3 text-center text-xs font-medium transition-all ${
                      timeline === t.id
                        ? "border-cyan-500 bg-cyan-50 text-cyan-800 font-bold dark:border-cyan-400 dark:bg-cyan-950/40 dark:text-cyan-300"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate & Blueprint Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-cyan-500/30 dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/95 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-5">
                <div>
                  <span className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">Engineering Blueprint</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{currentType.name}</h3>
                </div>
                <div className="size-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 flex items-center justify-center border border-cyan-500/30">
                  <Sparkles className="size-6" />
                </div>
              </div>

              {/* Estimate Metrics */}
              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-xs mb-1">
                    <Clock className="size-3.5" />
                    <span>Est. Timeline</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">
                    {estimatedWeeks} - {estimatedWeeks + 2} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Weeks</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-xs mb-1">
                    <Zap className="size-3.5" />
                    <span>Team Matrix</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400">
                    3 - 5 <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Engineers</span>
                  </div>
                </div>
              </div>

              {/* Scope Checklist */}
              <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Full-cycle architecture, UI/UX prototyping & QA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>CI/CD cloud deployment & containerized infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{selectedFeatures.length} enterprise modules selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Dedicated tech lead & weekly milestone demonstrations</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 hover:from-cyan-400 hover:to-cyan-300 font-bold shadow-md py-6 text-base"
                >
                  <Link href={`/schedule?type=${selectedType}&features=${selectedFeatures.join(",")}`} className="gap-2 justify-center">
                    Schedule Blueprint Review
                    <ArrowRight className="size-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-2xl border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-cyan-300 py-6 text-sm"
                >
                  <Link href={`/contact?subject=Estimation for ${currentType.name}`}>
                    Request Custom Proposal
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-center text-[11px] text-slate-500">
                * Timelines are calculated based on agile sprint velocity and vary according to specific enterprise scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
