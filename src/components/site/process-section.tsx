"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Zap, Lightbulb, Palette, Code2, Rocket, LineChart, Shield } from "lucide-react";

const PROCESS_STEPS = [
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

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="process"
      className="overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background via-(--brand-cyan)/5 to-background relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-96 h-96 bg-(--brand-navy) rounded-full blur-3xl opacity-5 dark:opacity-10"
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
            Our Proven Process
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground dark:text-white/70 max-w-xl">
            We follow a structured, collaborative approach to deliver exceptional results every time. From discovery through scaling, we're with you at every step.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="space-y-8 lg:space-y-12">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === PROCESS_STEPS.length - 1}
              inView={inView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl border border-(--brand-cyan)/30 bg-(--brand-cyan)/5 dark:bg-(--brand-cyan)/10 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to start your project?</h3>
          <p className="text-muted-foreground dark:text-white/70 mb-6 max-w-lg mx-auto">
            Let's discuss how our proven process can help bring your vision to life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  isLast: boolean;
  inView: boolean;
  prefersReducedMotion: boolean;
}

function ProcessStep({ step, index, isLast, inView, prefersReducedMotion }: ProcessStepProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const stepInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
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
          <div className={`w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5`}>
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
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground dark:text-white mb-2">
            {step.title}
          </h3>
          <p className="text-base lg:text-lg text-muted-foreground dark:text-white/70 max-w-lg">
            {step.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
