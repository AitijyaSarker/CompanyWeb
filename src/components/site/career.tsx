"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Eye, Mail, MapPin, Target } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent, parseContentJson, useSiteData, type Vacancy } from "@/hooks/use-site-data";

interface HireStep {
  title: string;
  desc: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function HiringBadge({ hiring }: { hiring: boolean }) {
  if (hiring) {
    return (
      <Badge className="gap-1.5 rounded-full border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        We're Hiring
      </Badge>
    );
  }
  return (
    <Badge className="gap-1.5 rounded-full border-border/60 bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
      Position Filled / No Active Hiring
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
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <HiringBadge hiring={vacancy.hiring} />
            <Badge variant="outline" className="rounded-full bg-background/60 text-foreground">
              {vacancy.department}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-background/60 text-foreground">
              {vacancy.type}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground sm:text-xl">{vacancy.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {vacancy.location}
          </div>
        </div>
        <Briefcase className="hidden size-6 text-muted-foreground/50 sm:block" />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{vacancy.description}</p>

      {requirements.length > 0 ? (
        <ul className="grid grid-cols-1 gap-1.5 text-xs text-muted-foreground sm:grid-cols-2 sm:text-sm">
          {requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-2">
        <Button
          asChild
          size="sm"
          className={
            vacancy.hiring
              ? "rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              : "rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
          }
          disabled={!vacancy.hiring}
        >
          <Link href="#contact" className="gap-1.5">
            <Mail className="size-3.5" />
            Apply Now
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function Career() {
  const { data } = useSiteData();
  const content = data?.content;
  const vacancies = data?.vacancies ?? [];

  const badge = getContent(content, "career_badge", "Careers");
  const title = getContent(content, "career_title", "Build Your Career at ULTRABULB IT");
  const subtitle = getContent(
    content,
    "career_subtitle",
    "We hire for curiosity, craftsmanship and character."
  );

  const howWeHire: HireStep[] = parseContentJson<HireStep[]>(content, "career_how_we_hire", []);
  const whatWeNeed: string[] = parseContentJson<string[]>(content, "career_what_we_need", []);
  const careerVision = getContent(
    content,
    "career_vision_text",
    "We believe great software is built by people who feel trusted and well-rested."
  );
  const careerMission = getContent(
    content,
    "career_mission_text",
    "To create meaningful engineering careers by giving people hard problems and real autonomy."
  );

  return (
    <section
      id="career"
      aria-labelledby="career-title"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />

      {/* How We Hire — stepper */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-foreground sm:text-2xl">How We Hire</h3>
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {howWeHire.map((step, i) => (
            <motion.li
              key={`${step.title}-${i}`}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative flex flex-col gap-2 rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="gradient-amber flex size-8 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">{step.title}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {/* What We Need + Vision/Mission */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-2"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">What We Need</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The qualities we look for in every candidate, regardless of role.
            </p>
          </motion.div>
          <motion.ul
            variants={fadeUp}
            className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
          >
            {whatWeNeed.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm text-foreground shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
            <Card className="h-full border-border/60 bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Eye className="size-4" />
                  </span>
                  <CardTitle className="text-base text-foreground">Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {careerVision}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
            <Card className="h-full border-border/60 bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Target className="size-4" />
                  </span>
                  <CardTitle className="text-base text-foreground">Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {careerMission}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Open positions */}
      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">Open Positions</h3>
          <Badge variant="outline" className="rounded-full bg-background/60 text-foreground">
            {vacancies.length} {vacancies.length === 1 ? "role" : "roles"}
          </Badge>
        </div>

        {vacancies.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border/60 bg-card/50 px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No open positions right now — but we're always happy to hear from great people.
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {vacancies.map((v) => (
              <VacancyCard key={v.id} vacancy={v} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
