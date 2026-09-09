"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSiteData, getContent } from "@/hooks/use-site-data";
import { EASE_OUT, SPRING_SMOOTH, TiltCard } from "@/components/site/motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FeaturedProjects() {
  const { data } = useSiteData();
  const products = data?.products || [];
  const prefersReducedMotion = useReducedMotion();

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = products.filter((p: any) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : products.slice(0, 3);

  if (!displayProjects || displayProjects.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-(--brand-cyan)/5 to-transparent dark:from-(--brand-cyan)/5 dark:to-transparent relative"
    >
      <div className="site-container relative">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground dark:text-white/70 max-w-xl">
            Our recent work demonstrates expertise across diverse industries and technologies. Each project reflects our commitment to excellence.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={prefersReducedMotion ? {} : container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12"
        >
          {displayProjects.map((project: any, index: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
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
            <Link href="/projects" className="gap-2">
              View All Projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-border/60 hover:border-(--brand-cyan)/50 hover:bg-(--brand-cyan)/5 dark:border-white/10 dark:hover:border-(--brand-cyan)/50"
          >
            <Link href="/schedule">Start Your Project</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const tags = React.useMemo(() => {
    if (!project?.tags) return [];

    if (Array.isArray(project.tags)) {
      return project.tags.filter(Boolean).map((tag: string) => String(tag).trim()).filter(Boolean);
    }

    return String(project.tags)
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean);
  }, [project.tags]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      transition={SPRING_SMOOTH}
      className="group"
    >
      <TiltCard className="h-full" intensity={5}>
        <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-sm transition-[border-color,box-shadow] duration-500 group-hover:border-(--brand-cyan)/40 group-hover:shadow-2xl group-hover:shadow-(--brand-cyan)/10 dark:border-white/10 dark:bg-white/5">
        {/* Image container */}
        {project.imageUrl && (
          <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
            <motion.div
              className="absolute inset-0"
              initial={false}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title || "Project"}
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-(--brand-navy)/65 via-(--brand-navy)/10 to-transparent"
              initial={{ opacity: 0.35 }}
              whileHover={prefersReducedMotion ? undefined : { opacity: 0.8 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileHover={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
            >
              Explore project
            </motion.span>
          </div>
        )}

        {/* Content */}
        <motion.div className="p-5 sm:p-6" layout>
          {/* Category badge */}
          {project.category && (
            <Badge
              variant="secondary"
              className="mb-3 bg-(--brand-cyan)/10 text-(--brand-cyan) border-(--brand-cyan)/20 hover:bg-(--brand-cyan)/20"
            >
              {project.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 text-foreground dark:text-white group-hover:text-(--brand-cyan) transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground dark:text-white/70 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 2).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-white/30 dark:bg-white/10 border-border/60 text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="bg-white/30 dark:bg-white/10 border-border/60 text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Footer with link */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-(--brand-cyan) font-medium text-sm hover:gap-3 transition-all duration-300"
              >
                View Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
        </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
