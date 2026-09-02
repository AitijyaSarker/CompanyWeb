"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge ? (
        <motion.div variants={item}>
          <Badge
            variant="secondary"
            className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground"
          >
            {badge}
          </Badge>
        </motion.div>
      ) : null}
      <motion.h2
        variants={item}
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={item}
          className={cn(
            "text-base text-muted-foreground sm:text-lg",
            isCenter ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
