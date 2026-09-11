"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, ExternalLink, Sparkles, Layers, CheckCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/hooks/use-site-data";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";

function ProjectCard({ project, index }: { project: any; index: number }) {
  const imageUrl = project.imageUrl || project.image || "/UltrabulbLogo.svg";

  return (
    <motion.div
      variants={fadeUpSpring}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)] dark:border-white/10 dark:bg-slate-900/70"
    >
      {/* Project Image Preview Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950/40">
        <Image
          src={imageUrl}
          alt={project.title}
          width={600}
          height={380}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Live Action Trigger on Hover */}
        <div className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Project Content Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
            {project.description || project.subtitle || "Enterprise software architecture engineered for maximum performance, security and scalability."}
          </p>
        </div>

        {/* Action Link Row */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            Enterprise Architecture
          </span>

          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
          >
            <span>Explore Case Study</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const { data } = useSiteData();
  const products = data?.products || [];
  const prefersReducedMotion = useReducedMotion();

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featuredProjects = products.filter((p: any) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : products.slice(0, 3);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/50 dark:bg-slate-950/40 text-foreground"
    >
      <div className="site-container relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Code2 className="mr-1.5 size-3.5" />
              Proven Track Record
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              Featured Case Studies & <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-sky-300">
                Production Deployments
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore how we engineered high-concurrency systems, AI automation engines, and custom platforms that transformed businesses.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayProjects.map((project: any, index: number) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </motion.div>

        {/* Bottom Hub Actions */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 hover:from-cyan-400 hover:to-cyan-300 font-bold px-8 shadow-lg"
          >
            <Link href="/projects" className="gap-2">
              <span>View Full Case Study Portfolio</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
