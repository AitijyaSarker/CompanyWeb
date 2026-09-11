"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Calendar,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  fadeUpSpring,
  staggerContainer,
} from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Contact({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;

  const badge = getContent(content, "contact_badge", "Contact Engineering Hub");
  const title = getContent(content, "contact_title", "Start Your Technical Transformation");
  const subtitle = getContent(
    content,
    "contact_subtitle",
    "Have a project blueprint or architectural question? Our engineering leadership responds within 24 business hours."
  );
  const email = getContent(content, "contact_email", "contact@ultrabulbit.com");
  const address = getContent(content, "contact_address", "Dhaka, Bangladesh");

  const [name, setName] = React.useState("");
  const [emailField, setEmailField] = React.useState("");
  const [phoneField, setPhoneField] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !emailField.trim() || !message.trim()) {
      toast.error("Please fill in your name, work email, and project message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailField,
          phone: phoneField,
          subject: subject || "Enterprise Project Inquiry",
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Inquiry received! Our Lead Architect will reach out shortly.");
      setName("");
      setEmailField("");
      setPhoneField("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Failed to send inquiry. Please email contact@ultrabulbit.com directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/50 dark:bg-slate-950/40 text-foreground">
      <div className="site-container relative">
        {/* Header */}
        {!hideHeading && (
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <MessageSquare className="mr-1.5 size-3.5" />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Fast Action (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Quick Consultation Booking Card */}
            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-950 p-6 sm:p-8 backdrop-blur-xl shadow-lg text-white">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Calendar className="size-4" />
                <span>Fastest Option</span>
              </div>
              <h3 className="text-xl font-bold">Schedule an Architecture Call</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Book a direct 30-minute technical roadmap & scoping session with our Engineering Director.
              </p>
              <Button
                asChild
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Link href="/schedule" className="gap-2 justify-center">
                  <span>Open Calendar Selector</span>
                </Link>
              </Button>
            </div>

            {/* Direct Contact Items */}
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:hover:bg-slate-900"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                  <Mail className="size-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Direct Email</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">HQ Headquarters</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{address}</div>
                </div>
              </div>
            </div>

            {/* NDA badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 px-2">
              <ShieldCheck className="size-4 text-cyan-500" />
              <span>We sign standard mutual NDAs prior to technical disclosure.</span>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Message Form (7 cols) */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80 lg:col-span-7">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send Direct RFP / Project Specs</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 mb-8">
              Tell us about your technical requirements, desired timeline, and key product deliverables.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name" className="text-xs font-semibold">Your Name *</Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-xs font-semibold">Work Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    placeholder="alex@company.com"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-phone" className="text-xs font-semibold">Phone / WhatsApp</Label>
                  <Input
                    id="contact-phone"
                    value={phoneField}
                    onChange={(e) => setPhoneField(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-sub" className="text-xs font-semibold">Subject / Project Domain</Label>
                  <Input
                    id="contact-sub"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Next.js SaaS & AI Agent Build"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-msg" className="text-xs font-semibold">Project Details & Architecture Scope *</Label>
                <Textarea
                  id="contact-msg"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your target features, current tech stack, deadlines, or challenges..."
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-6 text-base shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    <span>Transmitting Specifications...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="size-4" />
                    <span>Submit Project Scope for Review</span>
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
