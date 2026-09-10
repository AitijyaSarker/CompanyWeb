"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMagnetic } from "@/lib/animations/scroll";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function FinalCTA() {
  const { data } = useSiteData();
  const content = data?.content;
  const title = getContent(content, "cta_title", "Have a project in mind?");
  const subtitle = getContent(content, "cta_subtitle", "Let's build something exceptional together.");
  const magneticRef = useMagnetic(0.25);

  return (
    <section id="cta" aria-labelledby="cta-title" className="relative overflow-hidden bg-(--brand-navy-dark) py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 30% 50%, rgba(33,187,205,0.15), transparent 50%), radial-gradient(circle at 80% 20%, rgba(33,187,205,0.08), transparent 40%)" }}
      />
      <div className="site-container relative text-center">
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-lg text-white/70"
        >
          {subtitle}
        </motion.p>
        <motion.div
          ref={magneticRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 inline-block transition-transform duration-200"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-(--brand-cyan) px-8 text-base font-semibold text-(--brand-navy-dark) shadow-lg shadow-(--brand-cyan)/25 hover:bg-(--brand-cyan)/90"
          >
            <Link href="/schedule" className="gap-2">
              Start a Project
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
