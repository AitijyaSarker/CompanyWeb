"use client";

import * as React from "react";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { ReviewForm } from "@/components/site/reviews-awards";
import { AwardsSection } from "@/components/site/awards-section";
import { getContent, useSiteData, type Review } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ReviewPage() {
  const { data, loading } = useSiteData();
  const [formOpen, setFormOpen] = React.useState(false);
  const content = data?.content;
  const title = getContent(content, "review_form_title", "Share Your Experience");
  const pageTitle = getContent(content, "reviews_title", "What Clients Say About Us");
  const subtitle = getContent(
    content,
    "review_form_subtitle",
    "Tell us about your experience working with ULTRABULB IT. Reviews are published after approval."
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 section-alt px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 dark:bg-grid-dark" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="site-container relative max-w-3xl text-center"
        >
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-(--brand-cyan) text-(--brand-navy-dark) shadow-lg shadow-(--brand-cyan)/20">
            <MessageSquare className="size-5" />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--brand-navy-dark) dark:text-cyan-300">
            Reviews
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-(--brand-navy) dark:text-white sm:text-4xl">
            {pageTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            Read what our clients say, then share your own experience with the team.
          </p>
          <Button onClick={() => setFormOpen(true)} className="mt-6 gap-2 rounded-full bg-primary px-5 text-primary-foreground">
            <Star className="size-4" />
            Submit Your Review
          </Button>
        </motion.div>
      </section>

      <section className="site-container py-7 sm:py-10">
        <Button asChild variant="ghost" className="mb-6 gap-2 rounded-full px-3 text-muted-foreground">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </Button>
        {loading ? (
          <div className="h-80 animate-pulse rounded-2xl border border-border/60 bg-muted/50" />
        ) : (
          <>
            <PublishedReviews reviews={data?.reviews ?? []} />
            <div className="mt-16">
              <AwardsSection hideHeading={false} />
            </div>
          </>
        )}
      </section>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>
          <ReviewForm title="" subtitle="" />
        </DialogContent>
      </Dialog>
    </>
  );
}

function PublishedReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-card px-6 py-16 text-center">
        <MessageSquare className="mx-auto size-8 text-(--brand-cyan)" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">Be the first to share your experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">Approved client reviews will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => {
        const initials = review.name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
        return (
          <Card key={review.id} className="border-border/60 bg-card shadow-sm">
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 border border-border/60">
                  {review.avatarUrl ? <AvatarImage src={review.avatarUrl} alt={review.name} /> : null}
                  <AvatarFallback className="bg-(--brand-cyan) text-(--brand-navy-dark) font-bold">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}{review.company ? ` @ ${review.company}` : ""}</p>
                </div>
              </div>
              <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`size-4 ${star <= review.rating ? "fill-cyan-400 text-cyan-500" : "text-muted-foreground/30"}`} />)}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{review.message}&rdquo;</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
