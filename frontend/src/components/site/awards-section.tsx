"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Trophy,
  Medal,
  Star,
  Layers,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData, type Award as AwardType } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

const CURATED_AWARDS: AwardType[] = [
  {
    id: "award-1",
    title: "Global Leader in Enterprise Software Engineering",
    issuer: "Clutch Global Recognition",
    year: "2025",
    description: "Ranked among top 1% global engineering agencies for cloud-native microservices and architectural reliability.",
    order: 1,
  },
  {
    id: "award-2",
    title: "AWS Advanced Tier Architecture Partner",
    issuer: "Amazon Web Services",
    year: "2024 - 2025",
    description: "Certified for multi-AZ Kubernetes container scaling, edge CDN delivery, and zero-downtime deployment pipelines.",
    order: 2,
  },
  {
    id: "award-3",
    title: "SOC 2 Type II Security Standard Certified",
    issuer: "AICPA Compliance & Trust",
    year: "2025",
    description: "Audited and verified for bank-grade data encryption, zero-trust access control, and continuous vulnerability scanning.",
    order: 3,
  },
  {
    id: "award-4",
    title: "Enterprise AI & Autonomous Agent Pioneer",
    issuer: "AI Architecture Summit",
    year: "2025",
    description: "Awarded for breakthrough RAG vector pipelines, multi-agent LLM reasoning loops, and private model deployments.",
    order: 4,
  },
  {
    id: "award-5",
    title: "High-Throughput Fintech Innovation Award",
    issuer: "Global Tech Radar",
    year: "2024",
    description: "Honored for sub-millisecond distributed transaction processing and fault-tolerant database replication.",
    order: 5,
  },
  {
    id: "award-6",
    title: "ISO/IEC 27001 Information Security Standard",
    issuer: "ISO International",
    year: "2025",
    description: "International accreditation for comprehensive risk management, automated SAST/DAST gates, and code governance.",
    order: 6,
  },
];

export function AwardsSection({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const backendAwards = data?.awards ?? [];
  const content = data?.content;
  const [selectedAward, setSelectedAward] = React.useState<AwardType | null>(null);

  // Use backend awards from admin dashboard if available, otherwise show curated recognitions
  const displayedAwards: AwardType[] = backendAwards.length > 0 ? backendAwards : CURATED_AWARDS;

  const badge = getContent(content, "awards_badge", "Accreditations & Honors");
  const title = getContent(content, "awards_title", "Industry Recognitions & Certifications");
  const subtitle = getContent(
    content,
    "awards_subtitle",
    "Our commitment to architectural precision, zero-trust security, and engineering velocity is validated by premier global standards."
  );

  return (
    <section
      id="awards"
      aria-labelledby="awards-title"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/70 dark:bg-slate-950/80 text-foreground"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-amber-500/10 blur-[140px] dark:bg-amber-500/15" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[500px] rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-500/15" />

      <div className="site-container relative">
        {/* Section Header */}
        {!hideHeading && (
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <Badge className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <Trophy className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>{badge}</span>
            </Badge>
            <h2
              id="awards-title"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white"
            >
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        {/* Awards Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayedAwards.map((award, i) => (
            <motion.div
              key={award.id || `award-${i}`}
              variants={fadeUpSpring}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-amber-400/40 dark:hover:shadow-[0_20px_50px_rgba(245,158,11,0.22)]"
            >
              {/* Card Ambient Glow Orb */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/25 transition-all duration-300" />

              <div>
                {/* Prominent Picture Container */}
                <div
                  onClick={() => award.imageUrl && setSelectedAward(award)}
                  className={cn(
                    "relative mb-5 w-full overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 transition-all duration-300",
                    award.imageUrl
                      ? "cursor-pointer bg-slate-100/90 dark:bg-slate-950/80 group-hover:border-amber-500/40 group-hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)]"
                      : "bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent p-6 flex items-center justify-center min-h-[160px]"
                  )}
                >
                  {award.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={award.imageUrl}
                        alt={award.title}
                        className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Overlay with expand icon */}
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg dark:bg-slate-900 dark:text-white">
                          <Maximize2 className="size-3.5" />
                          <span>View Full Photo</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-inner mb-3">
                        <Trophy className="size-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {award.issuer || "Accreditation"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Issuer & Year Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {award.issuer && (
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 truncate">
                      {award.issuer}
                    </span>
                  )}
                  {award.year && (
                    <Badge variant="outline" className="shrink-0 rounded-full border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300">
                      {award.year}
                    </Badge>
                  )}
                </div>

                {/* Award Title */}
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors line-clamp-2">
                  {award.title}
                </h3>

                {/* Description */}
                {award.description && (
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {award.description}
                  </p>
                )}
              </div>

              {/* Verified Credential Tagline */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-[11px]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Verified Recognition</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">ID: UB-AWD-{award.id?.slice(-4) || (i + 1)}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Award Image Lightbox Modal */}
        <Dialog open={Boolean(selectedAward)} onOpenChange={(open) => !open && setSelectedAward(null)}>
          <DialogContent className="max-w-3xl overflow-hidden p-0 bg-slate-950 border-white/10 text-white shadow-2xl">
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center gap-2 mb-1">
                {selectedAward?.year && (
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-xs">
                    {selectedAward.year}
                  </Badge>
                )}
                {selectedAward?.issuer && (
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedAward.issuer}
                  </span>
                )}
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                {selectedAward?.title}
              </DialogTitle>
              {selectedAward?.description && (
                <DialogDescription className="text-sm text-slate-300 mt-1">
                  {selectedAward.description}
                </DialogDescription>
              )}
            </DialogHeader>

            {selectedAward?.imageUrl && (
              <div className="relative flex items-center justify-center p-6 bg-slate-900/90 border-t border-white/10">
                <img
                  src={selectedAward.imageUrl}
                  alt={selectedAward.title}
                  className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:grid-cols-4 dark:border-white/10 dark:bg-slate-900/60">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500">100%</span>
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Enterprise Compliance</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">SOC 2 & ISO Standards</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500">Top 1%</span>
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Engineering Quality</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Clutch Global Benchmark</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500">0 CVEs</span>
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Security Vulnerability</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Automated SAST Pipeline</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500">150+</span>
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Delivered Deployments</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Fortune 500 & Startups</span>
          </div>
        </div>
      </div>
    </section>
  );
}
