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
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function About() {
  const { data } = useSiteData();
  const content = data?.content;

  const badge = getContent(content, "about_badge", "About Us");
  const title = getContent(content, "about_title", "What is ULTRABULB IT?");
  const description = getContent(
    content,
    "about_description",
    "ULTRABULB IT is a software development agency founded with one belief — every great idea deserves to be engineered into a product people love."
  );
  const visionTitle = getContent(content, "about_vision_title", "Our Vision");
  const visionText = getContent(
    content,
    "about_vision_text",
    "To become the most trusted technology partner for ambitious teams worldwide."
  );
  const missionTitle = getContent(content, "about_mission_title", "Our Mission");
  const missionText = getContent(
    content,
    "about_mission_text",
    "To deliver reliable, scalable and beautiful software that solves real problems."
  );
  const fieldTitle = getContent(content, "about_field_title", "Our Field of Work");
  const fieldText = getContent(
    content,
    "about_field_text",
    "We operate across the full software lifecycle — product strategy, design, engineering, cloud, AI, QA and maintenance."
  );
  const fields: FieldItem[] = parseContentJson<FieldItem[]>(content, "fields", []);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionHeading badge={badge} title={title} subtitle={description} align="center" />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Left: vision + mission */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
            <Card className="h-full border-border/60 bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="gradient-amber flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-sm">
                    <Eye className="size-5" />
                  </span>
                  <CardTitle className="text-xl text-foreground">{visionTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {visionText}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
            <Card className="h-full border-border/60 bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="gradient-amber flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-sm">
                    <Target className="size-5" />
                  </span>
                  <CardTitle className="text-xl text-foreground">{missionTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {missionText}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right: field of work */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-5"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">{fieldTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{fieldText}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field, i) => {
              const Icon = ICON_MAP[field.icon] ?? Code2;
              return (
                <motion.div
                  key={`${field.title}-${i}`}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform group-hover:scale-105">
                    <Icon className="size-5" />
                  </span>
                  <div className="text-sm font-semibold text-foreground">{field.title}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {field.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
