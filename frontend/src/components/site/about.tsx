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

import { BrandPathLine } from "@/components/site/brand-path-line";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  SPRING_BOUNCY,
  slideFromLeft,
  slideFromRight,
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
    <section id="about" aria-labelledby="about-title" className="section-pad site-container relative w-full">
      <BrandPathLine />
      {!hideHeading && <SectionHeading badge={badge} title={title} subtitle={description} align="center" />}

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={slideFromLeft} whileHover={{ y: -6, transition: SPRING_BOUNCY }}>
            <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="gradient-brand flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  >
                    <Eye className="size-5" />
                  </motion.span>
                  <CardTitle className="text-xl text-foreground">{visionTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{visionText}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideFromLeft} whileHover={{ y: -6, transition: SPRING_BOUNCY }}>
            <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="gradient-brand flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  >
                    <Target className="size-5" />
                  </motion.span>
                  <CardTitle className="text-xl text-foreground">{missionTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{missionText}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-5"
        >
          <motion.div variants={slideFromRight}>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">{fieldTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{fieldText}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field, i) => {
              const Icon = ICON_MAP[field.icon] ?? Code2;
              return (
                <motion.div
                  key={`${field.title}-${i}`}
                  variants={fadeUpSpring}
                  whileHover={{ y: -6, scale: 1.02, transition: SPRING_BOUNCY }}
                  className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:border-(--brand-cyan)/30 hover:shadow-md"
                >
                  <motion.span
                    className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={SPRING_BOUNCY}
                  >
                    <Icon className="size-5" />
                  </motion.span>
                  <div className="text-sm font-semibold text-foreground">{field.title}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{field.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
