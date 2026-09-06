"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Lightbulb,
  Zap,
  Palette,
  Code2,
  Shield,
  Rocket,
  LineChart,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const STEPS = [
  {
    number: 1,
    title: "Discover",
    description: "Understanding your vision, goals, challenges, and the business opportunity.",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    title: "Plan",
    description: "Defining strategy, scope, timeline, resources, and technical architecture.",
    icon: Zap,
    color: "from-cyan-500 to-teal-500",
  },
  {
    number: 3,
    title: "Design",
    description: "Creating user-centered interfaces and experiences that align with your brand.",
    icon: Palette,
    color: "from-teal-500 to-green-500",
  },
  {
    number: 4,
    title: "Develop",
    description: "Building robust, scalable, and maintainable software with modern technologies.",
    icon: Code2,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: 5,
    title: "Test",
    description: "Rigorous testing for quality, performance, security, and user experience.",
    icon: Shield,
    color: "from-emerald-500 to-blue-500",
  },
  {
    number: 6,
    title: "Launch",
    description: "Deploying to production with monitoring and support infrastructure in place.",
    icon: Rocket,
    color: "from-blue-500 to-purple-500",
  },
  {
    number: 7,
    title: "Scale",
    description: "Optimizing performance, adding features, and evolving based on user feedback.",
    icon: LineChart,
    color: "from-purple-500 to-pink-500",
  },
];

export function Process({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;
  const badge = getContent(content, "process_badge", "How We Work");
  const title = getContent(content, "process_title", "Our Development Process");
  const subtitle = getContent(
    content,
    "process_subtitle",
    "A proven workflow that turns ideas into production-ready products."
  );

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-title"
      className="section-pad w-full relative bg-gradient-to-b from-background via-(--brand-cyan)/5 to-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-96 h-96 bg-(--brand-navy) rounded-full blur-3xl opacity-5 dark:opacity-10"
          aria-hidden="true"
        />
      </div>

      <div className="site-container relative">
        {!hideHeading && (
          <SectionHeading
            badge={badge}
            title={title}
            subtitle={subtitle}
            align="center"
          />
        )}

        {/* Process steps */}
        <div className="mt-12 space-y-8 lg:space-y-12">
          {STEPS.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === STEPS.length - 1}
              inView={inView}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: (typeof STEPS)[0];
  index: number;
  isLast: boolean;
  inView: boolean;
  prefersReducedMotion: boolean;
}

function ProcessStep({
  step,
  index,
  isLast,
  inView,
  prefersReducedMotion,
}: ProcessStepProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const stepInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={
        prefersReducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
      }
      animate={stepInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative"
    >
      {/* Connector line */}
      {!isLast && (
        <motion.div
          initial={prefersReducedMotion ? false : { scaleY: 0 }}
          animate={stepInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-(--brand-cyan)/60 to-(--brand-cyan)/0 origin-top"
        />
      )}

      {/* Step content */}
      <div className="flex gap-6 lg:gap-10">
        {/* Icon circle */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          className="relative flex-shrink-0"
        >
          <div
            className={`w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5`}
          >
            <div className="w-full h-full rounded-full bg-background dark:bg-(--brand-navy-dark) flex items-center justify-center">
              <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-(--brand-cyan)" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-(--brand-cyan) flex items-center justify-center text-(--brand-navy-dark) font-bold text-sm">
            {step.number}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : { x: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-1 pt-3 lg:pt-5"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground dark:text-white">
            {step.title}
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground dark:text-white/70 max-w-lg mt-2">
            {step.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

