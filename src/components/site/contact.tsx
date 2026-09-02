"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoCard({ icon, label, value, href }: InfoCardProps) {
  const content = (
    <CardContent className="flex items-start gap-4 p-5">
      <span className="gradient-amber flex size-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-sm">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </CardContent>
  );
  if (href) {
    return (
      <motion.a variants={fadeUp} whileHover={{ y: -4 }} href={href} className="block">
        <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">{content}</Card>
      </motion.a>
    );
  }
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
      <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">{content}</Card>
    </motion.div>
  );
}

export function Contact() {
  const { data } = useSiteData();
  const content = data?.content;

  const badge = getContent(content, "contact_badge", "Contact");
  const title = getContent(content, "contact_title", "Let's Build Something Bright Together");
  const subtitle = getContent(
    content,
    "contact_subtitle",
    "Have a project in mind or a question? We usually reply within one business day."
  );
  const email = getContent(content, "contact_email", "hello@ultrabulb.com");
  const phone = getContent(content, "contact_phone", "+880 1700-000000");
  const address = getContent(content, "contact_address", "Dhaka, Bangladesh");
  const mapEmbed = getContent(content, "contact_map_embed", "");

  const [name, setName] = React.useState("");
  const [emailField, setEmailField] = React.useState("");
  const [phoneField, setPhoneField] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!emailField.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) e.email = "Enter a valid email";
    if (!subject.trim()) e.subject = "Subject is required";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: emailField, phone: phoneField, subject, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent!", {
        description: "We'll get back to you within one business day.",
      });
      setName("");
      setEmailField("");
      setPhoneField("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full bg-muted/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Left: info + map */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoCard icon={<Mail className="size-5" />} label="Email" value={email} href={`mailto:${email}`} />
              <InfoCard icon={<Phone className="size-5" />} label="Phone" value={phone} href={`tel:${phone}`} />
              <InfoCard icon={<MapPin className="size-5" />} label="Address" value={address} />
            </div>

            {mapEmbed ? (
              <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <iframe
                  title="ULTRABULB IT location"
                  src={mapEmbed}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            ) : null}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-name">Name <span className="text-destructive">*</span></Label>
                    <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-invalid={!!errors.name} />
                    {errors.name ? <span className="text-xs text-destructive">{errors.name}</span> : null}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-email">Email <span className="text-destructive">*</span></Label>
                    <Input id="c-email" type="email" value={emailField} onChange={(e) => setEmailField(e.target.value)} placeholder="you@example.com" aria-invalid={!!errors.email} />
                    {errors.email ? <span className="text-xs text-destructive">{errors.email}</span> : null}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-phone">Phone</Label>
                    <Input id="c-phone" value={phoneField} onChange={(e) => setPhoneField(e.target.value)} placeholder="+880 1XXX-XXXXXX" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-subject">Subject <span className="text-destructive">*</span></Label>
                    <Input id="c-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" aria-invalid={!!errors.subject} />
                    {errors.subject ? <span className="text-xs text-destructive">{errors.subject}</span> : null}
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="c-message">Message <span className="text-destructive">*</span></Label>
                    <Textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell us about your project..." aria-invalid={!!errors.message} />
                    {errors.message ? <span className="text-xs text-destructive">{errors.message}</span> : null}
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" disabled={submitting} className="w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                      {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
