"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Star,
  Quote,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SPRING_BOUNCY, StaggerGrid, fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData, type Award as AwardType, type Review } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

function StarRating({ rating, interactive, onRate }: { rating: number; interactive?: boolean; onRate?: (n: number) => void }) {
  const [hover, setHover] = React.useState(0);
  const active = hover || rating;
  return (
    <div className="flex items-center gap-1" role={interactive ? "radiogroup" : undefined} aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(n)}
          className={cn(
            "transition-transform",
            interactive ? "cursor-pointer hover:scale-125" : "cursor-default",
            !interactive && "pointer-events-none"
          )}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "size-4 sm:size-4.5",
              n <= active
                ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-700"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.article
      variants={fadeUpSpring}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] dark:border-white/10 dark:bg-slate-900/70"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={review.rating} />
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-3" />
            <span>Verified Project</span>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 italic mb-6">
          &ldquo;{review.message}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60 dark:border-white/10">
        <Avatar className="size-11 border border-cyan-500/30">
          {review.avatarUrl ? <AvatarImage src={review.avatarUrl} alt={review.name} /> : null}
          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-slate-950">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {review.role}
            {review.company ? ` • ${review.company}` : ""}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function ReviewForm({ title, subtitle }: { title: string; subtitle: string }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message || rating < 1) {
      toast.error("Please fill in all required fields and choose a rating.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, company, rating, message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast.success("Thank you! Your verified review has been submitted.");
      setName("");
      setEmail("");
      setRole("");
      setCompany("");
      setRating(5);
      setMessage("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rev-name" className="text-xs font-semibold">Your Name *</Label>
            <Input id="rev-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Jenkins" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="rev-email" className="text-xs font-semibold">Work Email *</Label>
            <Input id="rev-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sarah@company.com" required className="mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rev-role" className="text-xs font-semibold">Your Role</Label>
            <Input id="rev-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="VP of Engineering / CTO" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="rev-company" className="text-xs font-semibold">Company Name</Label>
            <Input id="rev-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Global Inc." className="mt-1" />
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold block mb-1.5">Rating</Label>
          <StarRating rating={rating} interactive onRate={setRating} />
        </div>

        <div>
          <Label htmlFor="rev-msg" className="text-xs font-semibold">Your Testimonial *</Label>
          <Textarea
            id="rev-msg"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the outcomes, engineering quality, and collaboration experience..."
            required
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-6 shadow-md"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Submit Verified Review"}
        </Button>
      </form>
    </div>
  );
}

export function ReviewsAwards({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const reviews = data?.reviews || [];
  const awards = data?.awards || [];
  const content = data?.content;

  const badge = getContent(content, "reviews_badge", "Client Testimonials");
  const title = getContent(content, "reviews_title", "Trusted by Visionary Leaders");
  const subtitle = getContent(
    content,
    "reviews_subtitle",
    "Hear directly from founders, CTOs, and product leaders who rely on ULTRABULB IT to architect mission-critical software."
  );

  return (
    <section id="reviews" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/50 dark:bg-slate-950/40 text-foreground">
      <div className="site-container relative">
        {/* Section Header */}
        {!hideHeading && (
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Quote className="mr-1.5 size-3.5" />
              {badge}
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        )}

        {/* Reviews Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </motion.div>

        {/* Awards & Certifications Strip */}
        {awards.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200/80 dark:border-white/10">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Industry Recognitions & Certifications
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
              {awards.map((award: AwardType) => (
                <div
                  key={award.id}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/60 p-4 text-center dark:border-white/10 dark:bg-slate-900/60"
                >
                  <Award className="size-6 text-cyan-500 mb-2" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{award.title}</span>
                  <span className="text-xs text-slate-500">{award.issuer} • {award.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Action Trigger */}
        <div className="mt-14 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-cyan-500/40 text-cyan-600 hover:bg-cyan-500/10 dark:text-cyan-400 px-6"
          >
            <Link href="/review" className="gap-2">
              <span>Submit a Verified Client Review</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
