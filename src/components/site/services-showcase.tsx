"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function ServicesShowcase() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="overflow-hidden py-16 sm:py-20 lg:py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-0 w-96 h-96 bg-(--brand-cyan) rounded-full blur-3xl opacity-5"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-(--brand-navy) rounded-full blur-3xl opacity-5 dark:opacity-10"
          aria-hidden="true"
        />
      </div>

      <div className="site-container relative">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            What We Build
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground dark:text-white/70 max-w-xl">
            We offer a comprehensive suite of technology services designed to transform your business into a competitive digital powerhouse.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={prefersReducedMotion ? {} : container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-(--brand-cyan)/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className={cn(
                "relative h-full p-6 sm:p-7 rounded-2xl border transition-all duration-300",
                "border-border/60 bg-card/50 hover:bg-card/80 hover:border-(--brand-cyan)/30",
                "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                "group-hover:shadow-lg group-hover:-translate-y-1"
              )}>
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-xl bg-(--brand-cyan)/10 group-hover:bg-(--brand-cyan)/20 transition-colors">
                  <service.icon className="w-6 h-6 text-(--brand-cyan)" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground dark:text-white group-hover:text-(--brand-cyan) transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground dark:text-white/70 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Hover indicator */}
                <div className="flex items-center text-(--brand-cyan) text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-(--brand-cyan) text-(--brand-navy-dark) hover:bg-(--brand-cyan)/90 font-semibold"
          >
            <Link href="/services" className="gap-2">
              Explore All Services
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-border/60 hover:border-(--brand-cyan)/50 hover:bg-(--brand-cyan)/5 dark:border-white/10 dark:hover:border-(--brand-cyan)/50"
          >
            <Link href="/schedule">Schedule a Consultation</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
