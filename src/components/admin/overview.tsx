"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  Clock,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Package,
  Star,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/admin/shared";

interface Counts {
  products: number;
  vacancies: number;
  hiring: number;
  reviewsPending: number;
  reviewsTotal: number;
  callsPending: number;
  callsTotal: number;
  messagesUnread: number;
  messagesTotal: number;
  awards: number;
  gallery: number;
}

const STAT_CARDS: { key: keyof Counts; label: string; icon: typeof Award; color: string }[] = [
  { key: "products", label: "Products", icon: Package, color: "text-(--brand-navy) bg-(--brand-cyan-pale) dark:text-cyan-300 dark:bg-cyan-950/40" },
  { key: "vacancies", label: "Vacancies", icon: Briefcase, color: "text-(--brand-navy-dark) bg-(--brand-cyan)/15 dark:text-cyan-300 dark:bg-cyan-950/40" },
  { key: "hiring", label: "Actively Hiring", icon: Briefcase, color: "text-emerald-600 bg-emerald-500/10" },
  { key: "reviewsPending", label: "Pending Reviews", icon: Star, color: "text-(--brand-navy) bg-(--brand-cyan-pale) dark:text-cyan-300 dark:bg-cyan-950/40" },
  { key: "messagesUnread", label: "Unread Messages", icon: Mail, color: "text-red-600 bg-red-500/10" },
  { key: "callsPending", label: "Pending Calls", icon: Calendar, color: "text-(--brand-navy-dark) bg-(--brand-cyan)/15 dark:text-cyan-300 dark:bg-cyan-950/40" },
];

export function Overview({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [counts, setCounts] = React.useState<Counts | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const [products, vacancies, reviews, calls, messages, awards, gallery] = await Promise.all([
          fetch("/api/admin/products", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/vacancies", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/reviews", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/calls", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/messages", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/awards", { credentials: "same-origin" }).then((r) => r.json()),
          fetch("/api/admin/gallery", { credentials: "same-origin" }).then((r) => r.json()),
        ]);
        setCounts({
          products: products.length,
          vacancies: vacancies.length,
          hiring: vacancies.filter((v: { hiring: boolean }) => v.hiring).length,
          reviewsPending: reviews.filter((r: { approved: boolean }) => !r.approved).length,
          reviewsTotal: reviews.length,
          callsPending: calls.filter((c: { status: string }) => c.status === "pending").length,
          callsTotal: calls.length,
          messagesUnread: messages.filter((m: { read: boolean }) => !m.read).length,
          messagesTotal: messages.length,
          awards: awards.length,
          gallery: gallery.length,
        });
      } catch {
        // ignore
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">A snapshot of your website content and incoming submissions.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {STAT_CARDS.map((s, i) => (
          <FadeIn key={s.key}>
            <Card className="border-border/60 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <span className={`flex size-11 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="size-5" />
                </span>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {counts ? counts[s.key] : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FadeIn>
          <Card className="h-full border-border/60 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <Star className="size-5 text-(--brand-cyan)" />
                <h3 className="text-sm font-semibold text-foreground">Reviews</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {counts ? counts.reviewsPending : "—"} pending, {counts ? counts.reviewsTotal : "—"} total
              </p>
              <Button size="sm" variant="outline" className="w-fit gap-1.5" onClick={() => onNavigate("reviews")}>
                Moderate <ArrowUpRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn>
          <Card className="h-full border-border/60 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-(--brand-cyan)" />
                <h3 className="text-sm font-semibold text-foreground">Scheduled Calls</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {counts ? counts.callsPending : "—"} pending, {counts ? counts.callsTotal : "—"} total
              </p>
              <Button size="sm" variant="outline" className="w-fit gap-1.5" onClick={() => onNavigate("calls")}>
                View Calls <ArrowUpRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn>
          <Card className="h-full border-border/60 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-5 text-(--brand-cyan)" />
                <h3 className="text-sm font-semibold text-foreground">Messages</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {counts ? counts.messagesUnread : "—"} unread, {counts ? counts.messagesTotal : "—"} total
              </p>
              <Button size="sm" variant="outline" className="w-fit gap-1.5" onClick={() => onNavigate("messages")}>
                Read Messages <ArrowUpRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Awards", value: counts?.awards, icon: Award, tab: "awards" },
          { label: "Gallery", value: counts?.gallery, icon: ImageIcon, tab: "gallery" },
          { label: "Time Slots", value: undefined, icon: Clock, tab: "time-slots" },
          { label: "View Site", value: undefined, icon: ArrowUpRight, tab: "" },
        ].map((item) => (
          <FadeIn key={item.label}>
            <Card className="border-border/60 shadow-sm">
              <CardContent className="flex flex-col gap-2 p-4">
                <item.icon className="size-5 text-muted-foreground" />
                <div className="text-xl font-bold text-foreground">{item.value ?? "—"}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/" target="_blank">
            Open Website <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
