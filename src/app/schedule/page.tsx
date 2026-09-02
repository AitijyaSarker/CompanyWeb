"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Gift,
  Lightbulb,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/site/theme-toggle";

interface TimeSlot {
  id: string;
  label: string;
  value: string;
  active: boolean;
  order: number;
}

function formatYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLong(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function SchedulePage() {
  const [content, setContent] = React.useState<Record<string, string>>({});
  const [slots, setSlots] = React.useState<TimeSlot[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [slot, setSlot] = React.useState<string>("");

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState<
    null | {
      id: string;
      date: string;
      timeSlotLabel: string;
      topic: string;
      email: string;
    }
  >(null);

  // Fetch content + time slots on mount
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cRes, sRes] = await Promise.all([
          fetch("/api/content"),
          fetch("/api/time-slots"),
        ]);
        const c = (await cRes.json()) as Record<string, string>;
        const s = (await sRes.json()) as TimeSlot[];
        if (cancelled) return;
        setContent(c);
        setSlots(Array.isArray(s) ? s : []);
        // Default topic = first option
        try {
          const topics = JSON.parse(c.schedule_topics || "[]") as unknown;
          if (
            Array.isArray(topics) &&
            topics.length > 0 &&
            typeof topics[0] === "string"
          ) {
            setForm((f) => ({ ...f, topic: topics[0] as string }));
          }
        } catch {
          // ignore parse error
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load booking data. Please refresh the page.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const topics: string[] = React.useMemo(() => {
    try {
      const t = JSON.parse(content.schedule_topics || "[]") as unknown;
      return Array.isArray(t)
        ? (t.filter((x) => typeof x === "string") as string[])
        : [];
    } catch {
      return [];
    }
  }, [content.schedule_topics]);

  const isFormValid = React.useMemo(() => {
    return (
      !!date &&
      !!slot &&
      form.name.trim().length > 0 &&
      EMAIL_RE.test(form.email.trim()) &&
      form.phone.trim().length > 0 &&
      form.topic.trim().length > 0
    );
  }, [date, slot, form]);

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  function clearError(key: string) {
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.email.trim()) errs.email = "Please enter your email";
    else if (!EMAIL_RE.test(form.email.trim()))
      errs.email = "Please enter a valid email address";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number";
    if (!form.topic.trim()) errs.topic = "Please choose a topic";
    if (!date) errs.date = "Please pick a date";
    if (!slot) errs.timeSlot = "Please choose a time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please complete all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim() || undefined,
          topic: form.topic.trim(),
          date: formatYMD(date as Date),
          timeSlot: slot,
          message: form.message.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Booking failed");
      }
      const slotLabel = slots.find((s) => s.value === slot)?.label || slot;
      setConfirmed({
        id: data.id || "",
        date: formatLong(date as Date),
        timeSlotLabel: slotLabel,
        topic: form.topic,
        email: form.email.trim(),
      });
      toast.success("Booking confirmed! Check your email for the invite.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function resetBooking() {
    setConfirmed(null);
    setDate(undefined);
    setSlot("");
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      topic: topics[0] || "",
      message: "",
    });
    setErrors({});
  }

  const titleText = content.schedule_title || "Book a Call With Us";
  const titleWords = titleText.split(" ");
  const titleAccent =
    titleWords.length > 1 ? titleWords[titleWords.length - 1] : titleWords[0];
  const titleMain = titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : "";

  const navBrand = content.nav_brand || "ULTRABULB IT";
  const navTagline = content.nav_tagline || "WE CODE YOUR IDEAS INTO LIGHT";
  const badgeText = content.schedule_badge || "Schedule a Call";
  const subtitle =
    content.schedule_subtitle ||
    "Pick a date and time that works for you. We'll send a calendar invite and a meeting link to your email.";
  const footerCopyright =
    content.footer_copyright || "ULTRABULB IT. All rights reserved.";

  return (
    <div className="min-h-screen flex flex-col bg-background bg-grid">
      {/* ===== Top bar (floating pill) ===== */}
      <header className="mx-auto w-full max-w-6xl px-4 pt-4 z-30">
        <div className="glass dark:glass-dark rounded-full border border-border/60 shadow-sm px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 group min-w-0"
            aria-label={`${navBrand} — back to home`}
          >
            <span className="size-9 rounded-xl gradient-amber flex items-center justify-center shadow-sm shrink-0">
              <Lightbulb className="size-5 text-amber-950" />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-sm font-bold tracking-tight truncate">
                {navBrand}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">
                {navTagline}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm" className="rounded-full h-9">
              <Link href="/">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ===== Hero header ===== */}
      <section className="px-4 pt-10 sm:pt-14 pb-6">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-4">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1 text-xs border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 dark:bg-amber-500/15"
            >
              <Sparkles className="size-3.5" />
              {badgeText}
            </Badge>
          </motion.div>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance"
          >
            {titleMain ? (
              <>
                {titleMain}{" "}
                <span className="gradient-text-amber">{titleAccent}</span>
              </>
            ) : (
              <span className="gradient-text-amber">{titleAccent}</span>
            )}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-muted-foreground text-base sm:text-lg max-w-2xl text-balance"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* ===== Main booking card ===== */}
      <main className="flex-1 px-4 pb-12 w-full">
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl"
            >
              <Card className="border-emerald-300/50 dark:border-emerald-700/40 shadow-lg overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-violet-500" />
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-5">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 220,
                      damping: 14,
                    }}
                    className="size-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shadow-md ring-8 ring-emerald-100/40 dark:ring-emerald-900/20"
                  >
                    <Check
                      className="size-10 text-emerald-600 dark:text-emerald-400"
                      strokeWidth={3}
                    />
                  </motion.div>
                  <div className="space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Booking Confirmed!
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                      We&apos;ll email a calendar invite to{" "}
                      <span className="font-semibold text-foreground">
                        {confirmed.email}
                      </span>{" "}
                      shortly with the meeting link.
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1 text-left">
                    <div className="rounded-lg border bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3.5" /> Date
                      </div>
                      <div className="text-sm font-medium mt-1 leading-snug">
                        {confirmed.date}
                      </div>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Sparkles className="size-3.5" /> Time
                      </div>
                      <div className="text-sm font-medium mt-1 leading-snug">
                        {confirmed.timeSlotLabel}
                      </div>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <MessageSquare className="size-3.5" /> Topic
                      </div>
                      <div className="text-sm font-medium mt-1 leading-snug">
                        {confirmed.topic}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
                    <Button
                      onClick={resetBooking}
                      variant="outline"
                      className="rounded-full flex-1 h-10"
                    >
                      Book Another
                    </Button>
                    <Button
                      asChild
                      className="rounded-full flex-1 h-10 gradient-amber text-amber-950 font-semibold"
                    >
                      <Link href="/">
                        Back to Home
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Reference ID:{" "}
                    <span className="font-mono">{confirmed.id}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-5xl mx-auto shadow-md border-border/70 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* ===== Left column: calendar ===== */}
                  <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border/60 bg-muted/20 flex flex-col">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="size-7 rounded-full gradient-amber text-amber-950 text-xs font-bold flex items-center justify-center shadow-sm">
                        1
                      </span>
                      <h3 className="font-semibold">Pick a date</h3>
                    </div>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d);
                          clearError("date");
                        }}
                        disabled={(d) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const isPast = d < today;
                          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                          return isPast || isWeekend;
                        }}
                        className="bg-card rounded-lg border shadow-sm"
                      />
                    </div>
                    <div className="mt-4 min-h-[64px]">
                      {date ? (
                        <motion.div
                          key={date.toISOString()}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-lg border bg-card p-3"
                        >
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Sparkles className="size-3.5 text-amber-500" />
                            Selected date
                          </div>
                          <div className="font-medium mt-0.5">
                            {formatLong(date)}
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center pt-2">
                          Weekends are unavailable — choose any business day.
                        </p>
                      )}
                      {errors.date && (
                        <p className="text-xs text-destructive text-center mt-2">
                          {errors.date}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== Right column: time + details ===== */}
                  <div className="p-6 sm:p-8 flex flex-col gap-6">
                    {/* Time slots */}
                    <section>
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="size-7 rounded-full gradient-amber text-amber-950 text-xs font-bold flex items-center justify-center shadow-sm">
                          2
                        </span>
                        <h3 className="font-semibold">Choose a time</h3>
                      </div>
                      {loading ? (
                        <div className="grid grid-cols-2 gap-2" aria-hidden>
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="h-10 rounded-md bg-muted animate-pulse"
                            />
                          ))}
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No time slots are available right now. Please check
                          back soon.
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                          {slots.map((s) => {
                            const active = slot === s.value;
                            return (
                              <motion.button
                                key={s.id}
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  setSlot(s.value);
                                  clearError("timeSlot");
                                }}
                                aria-pressed={active}
                                className={
                                  "h-10 rounded-md border text-xs sm:text-sm font-medium transition-all flex items-center justify-center px-2 " +
                                  (active
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-card hover:border-amber-400/60 hover:bg-accent/50 text-foreground")
                                }
                              >
                                {s.label}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                      {errors.timeSlot && (
                        <p className="text-xs text-destructive mt-2">
                          {errors.timeSlot}
                        </p>
                      )}
                    </section>

                    <Separator />

                    {/* Details form */}
                    <form
                      onSubmit={onSubmit}
                      className="flex flex-col gap-4"
                      noValidate
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="size-7 rounded-full gradient-amber text-amber-950 text-xs font-bold flex items-center justify-center shadow-sm">
                          3
                        </span>
                        <h3 className="font-semibold">Your details</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                          <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="jane@company.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="phone">
                            Phone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+1 555 000 0000"
                            autoComplete="tel"
                            aria-invalid={!!errors.phone}
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="company">
                            Company{" "}
                            <span className="text-muted-foreground text-[10px] font-normal">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            id="company"
                            value={form.company}
                            onChange={(e) =>
                              updateField("company", e.target.value)
                            }
                            placeholder="Acme Inc."
                            autoComplete="organization"
                          />
                        </div>
                      </div>

                      <div className="grid gap-1.5">
                        <Label htmlFor="topic">
                          Topic <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.topic}
                          onValueChange={(v) => updateField("topic", v)}
                        >
                          <SelectTrigger
                            id="topic"
                            className="w-full"
                            aria-invalid={!!errors.topic}
                          >
                            <SelectValue placeholder="Choose a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.topic && (
                          <p className="text-xs text-destructive">
                            {errors.topic}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-1.5">
                        <Label htmlFor="message">
                          Message{" "}
                          <span className="text-muted-foreground text-[10px] font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          placeholder="Tell us a bit about what you'd like to discuss..."
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid || submitting}
                        className="w-full h-11 rounded-md gradient-amber text-amber-950 font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <Check className="size-4" strokeWidth={2.5} />
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center">
                        By booking, you agree to be contacted about your
                        request. We never share your data.
                      </p>
                    </form>
                  </div>
                </div>
              </Card>

              {/* Info strip */}
              <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InfoCard
                  icon={<Clock className="size-4" />}
                  title="Quick Reply"
                  text="We reply to every booking within 1 business day."
                />
                <InfoCard
                  icon={<Gift className="size-4" />}
                  title="Free Consultation"
                  text="A 30-minute call — no obligation, no commitment."
                />
                <InfoCard
                  icon={<ShieldCheck className="size-4" />}
                  title="Secure & Private"
                  text="Your details are encrypted and never shared."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ===== Footer (sticky to bottom) ===== */}
      <footer className="mt-auto bg-zinc-950 text-zinc-400">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg gradient-amber flex items-center justify-center">
              <Lightbulb className="size-4 text-amber-950" />
            </span>
            <span className="text-sm font-semibold text-zinc-100">
              {navBrand}
            </span>
          </div>
          <p className="text-xs text-center">
            &copy; {new Date().getFullYear()} {footerCopyright}
          </p>
          <Link
            href="/"
            className="text-xs hover:text-amber-400 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="size-3" /> Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 flex items-start gap-3 shadow-sm">
      <span className="size-9 rounded-lg bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}
