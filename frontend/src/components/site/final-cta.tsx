"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail, Sparkles, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function FinalCTA() {
  const { data } = useSiteData();
  const content = data?.content;
  const title = getContent(content, "cta_title", "Ready to Turn Your Vision Into Production Reality?");
  const subtitle = getContent(
    content,
    "cta_subtitle",
    "Partner with our world-class engineering team to build scalable, high-performance software that dominates your industry."
  );

  return (
    <section id="cta" aria-labelledby="cta-title" className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 text-white border-t border-cyan-500/20">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-35" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-cyan-500/15 blur-[140px]" />

      <div className="site-container relative text-center">
        <Badge className="mb-5 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="mr-1.5 size-3.5" />
          Start Your Technical Transformation
        </Badge>

        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:from-cyan-300 hover:to-cyan-400 font-bold px-8 py-6 text-base shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-105 active:scale-95 transition-all"
          >
            <Link href="/schedule" className="gap-2">
              <Calendar className="size-5" />
              <span>Schedule Architecture Consultation</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 px-8 py-6 text-base backdrop-blur-md transition-all"
          >
            <Link href="/contact" className="gap-2">
              <Mail className="size-5" />
              <span>Send Direct RFP / Inquiry</span>
            </Link>
          </Button>
        </motion.div>

        {/* Reassurance Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-cyan-400" />
            <span>Non-Disclosure Agreement (NDA) Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Sprint kickoff in under 7 business days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
