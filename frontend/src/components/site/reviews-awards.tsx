"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/site/section-heading";
import { SPRING_BOUNCY, StaggerGrid, fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData, type Award, type Review } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fadeUp = fadeUpSpring;

/* ---------------- Reviews grid ---------------- */

function StarRating({ rating, interactive, onRate }: { rating: number; interactive?: boolean; onRate?: (n: number) => void }) {
  const [hover, setHover] = React.useState(0);
  const active = hover || rating;
  return (
    <div className="flex items-center gap-0.5" role={interactive ? "radiogroup" : undefined} aria-label="Rating">
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
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
            !interactive && "pointer-events-none"
          )}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "size-5",
              n <= active ? "fill-cyan-400 text-cyan-500" : "fill-muted text-muted-foreground/40"
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
    <motion.article variants={fadeUp} whileHover={{ y: -8, transition: SPRING_BOUNCY }}>
      <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-lg">
        <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-border/60">
              {review.avatarUrl ? <AvatarImage src={review.avatarUrl} alt={review.name} /> : null}
              <AvatarFallback className="gradient-brand text-sm font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{review.name}</span>
              <span className="text-xs text-muted-foreground">
                {review.role}
                {review.company ? ` @ ${review.company}` : ""}
              </span>
            </div>
          </div>
          <StarRating rating={review.rating} />
          <p className="text-sm leading-relaxed text-muted-foreground">"{review.message}"</p>
        </CardContent>
      </Card>
    </motion.article>
  );
}

/* ---------------- Review submission form ---------------- */

export function ReviewForm({ title, subtitle }: { title: string; subtitle: string }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (rating < 1) e.rating = "Please select a rating";
    if (!message.trim()) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, company, rating, message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast.success("Thank you! Your review is pending approval.", {
        description: "We'll review it shortly before publishing.",
      });
      setName("");
      setEmail("");
      setRole("");
      setCompany("");
      setRating(0);
      setMessage("");
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rv-name">Name <span className="text-destructive">*</span></Label>
            <Input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-invalid={!!errors.name} />
            {errors.name ? <span className="text-xs text-destructive">{errors.name}</span> : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rv-email">Email <span className="text-destructive">*</span></Label>
            <Input id="rv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!errors.email} />
            {errors.email ? <span className="text-xs text-destructive">{errors.email}</span> : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rv-role">Role / Title</Label>
            <Input id="rv-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Product Manager" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rv-company">Company</Label>
            <Input id="rv-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Rating <span className="text-destructive">*</span></Label>
            <StarRating rating={rating} interactive onRate={setRating} />
            {errors.rating ? <span className="text-xs text-destructive">{errors.rating}</span> : null}
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="rv-message">Your Review <span className="text-destructive">*</span></Label>
            <Textarea id="rv-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Share your experience working with us..." aria-invalid={!!errors.message} />
            {errors.message ? <span className="text-xs text-destructive">{errors.message}</span> : null}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={submitting} className="w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              {submitting ? <Loader2 className="size-4 animate-spin" /> : <Star className="size-4" />}
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/* ---------------- Awards ---------------- */

function AwardCard({ award }: { award: Award }) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -8, scale: 1.02, transition: SPRING_BOUNCY }}>
      <Card className="group h-full overflow-hidden border-border/60 bg-card shadow-sm transition-shadow hover:shadow-lg">
        <div className="aspect-4/3 w-full overflow-hidden bg-muted">
          <Image
            src={award.imageUrl}
            alt={award.title}
            loading="lazy"
            width={720}
            height={540}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col gap-2 p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge className="w-fit rounded-full bg-accent text-accent-foreground">{award.year}</Badge>
            <span className="text-xs font-medium text-muted-foreground">{award.issuer}</span>
          </div>
          <h3 className="text-base font-bold text-foreground">{award.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{award.description}</p>
        </CardContent>
      </Card>
    </motion.article>
  );
}

/* ---------------- Main section ---------------- */

export function ReviewsAwards() {
  const { data } = useSiteData();
  const content = data?.content;
  const reviews = data?.reviews ?? [];
  const awards = data?.awards ?? [];

  const badge = getContent(content, "reviews_badge", "Reviews & Awards");
  const title = getContent(content, "reviews_title", "What Clients Say & What We've Achieved");
  const subtitle = getContent(
    content,
    "reviews_subtitle",
    "Honest words from the people we've worked with, alongside the recognition we've earned."
  );
  const awardsTitle = getContent(content, "awards_title", "Awards & Recognition");

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="section-pad section-alt site-container w-full"
    >
      <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />

      <div className="mt-6 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_BOUNCY}
        >
          <Button
            asChild
            className="gap-2 rounded-full bg-primary px-5 text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Link href="/review">
              Submit Your Review
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {reviews.length > 0 ? (
        <StaggerGrid className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </StaggerGrid>
      ) : (
        <div className="mt-12 rounded-3xl border border-dashed border-border/60 bg-card/50 px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your experience below.</p>
        </div>
      )}

      {/* Awards */}
      {awards.length > 0 ? (
        <div className="mt-20">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{awardsTitle}</h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {awards.map((a) => (
              <AwardCard key={a.id} award={a} />
            ))}
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
