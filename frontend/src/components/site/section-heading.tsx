"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blurIn, fadeUp, lineExpand, staggerContainer } from "@/components/site/motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge ? (
        <motion.div variants={fadeUp}>
          <Badge className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
            dark
              ? "border-(--brand-cyan)/40 bg-(--brand-cyan)/15 text-(--brand-cyan)"
              : "border-(--brand-cyan)/25 bg-(--brand-cyan-pale) text-(--brand-navy-dark) dark:border-cyan-400/25 dark:bg-cyan-950/40 dark:text-cyan-200"
          )}>
            {badge}
          </Badge>
        </motion.div>
      ) : null}

      <motion.div
        variants={blurIn}
        className={cn("flex flex-col gap-2", isCenter && "items-center")}
      >
        <h2 className={cn(
          "max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-(--brand-navy) dark:text-white"
        )}>
          {title}
        </h2>
        <motion.span
          aria-hidden
          variants={lineExpand}
          className={cn(
            "h-1 w-12 origin-left rounded-full bg-(--brand-cyan)",
            isCenter && "origin-center"
          )}
        />
      </motion.div>

      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted-foreground",
            isCenter ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
