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
import {
  SPRING_BOUNCY,
  SPRING_SMOOTH,
  fadeUpSpring,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoCard({ icon, label, value, href }: InfoCardProps) {
  const content = (
    <CardContent className="flex items-start gap-4 p-5">
      <motion.span
        className="gradient-brand flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={SPRING_BOUNCY}
      >
        {icon}
      </motion.span>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </CardContent>
  );
  if (href) {
    return (
      <motion.a variants={fadeUpSpring} whileHover={{ y: -6, transition: SPRING_BOUNCY }} href={href} className="block">
        <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">{content}</Card>
      </motion.a>
    );
  }
  return (
    <motion.div variants={fadeUpSpring} whileHover={{ y: -6, transition: SPRING_BOUNCY }}>
      <Card className="h-full border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">{content}</Card>
    </motion.div>
  );
}

const formFieldVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: SPRING_SMOOTH },
};

export function Contact({ hideHeading = false }: { hideHeading?: boolean }) {
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
  const [sent, setSent] = React.useState(false);
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
      setSent(true);
      toast.success("Message sent!", {
        description: "We'll get back to you within one business day.",
      });
      setName("");
      setEmailField("");
      setPhoneField("");
      setSubject("");
      setMessage("");
      setErrors({});
      setTimeout(() => setSent(false), 2000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad section-alt w-full">
      <div className="site-container">
        {!hideHeading && <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />}

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            variants={staggerContainer}
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
              <motion.div variants={slideFromLeft} className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
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

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div animate={sent ? { scale: [1, 1.02, 1] } : {}} transition={SPRING_BOUNCY}>
              <Card className="border-border/60 bg-card shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <motion.form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    noValidate
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {[
                      { id: "c-name", label: "Name", required: true, value: name, onChange: setName, error: errors.name, placeholder: "Your name" },
                      { id: "c-email", label: "Email", required: true, value: emailField, onChange: setEmailField, error: errors.email, placeholder: "you@example.com", type: "email" },
                      { id: "c-phone", label: "Phone", required: false, value: phoneField, onChange: setPhoneField, error: undefined, placeholder: "+880 1XXX-XXXXXX" },
                      { id: "c-subject", label: "Subject", required: true, value: subject, onChange: setSubject, error: errors.subject, placeholder: "How can we help?" },
                    ].map((field) => (
                      <motion.div key={field.id} variants={formFieldVariants} className="flex flex-col gap-1.5">
                        <Label htmlFor={field.id}>
                          {field.label} {field.required ? <span className="text-destructive">*</span> : null}
                        </Label>
                        <Input
                          id={field.id}
                          type={field.type ?? "text"}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder={field.placeholder}
                          aria-invalid={!!field.error}
                        />
                        {field.error ? <span className="text-xs text-destructive">{field.error}</span> : null}
                      </motion.div>
                    ))}
                    <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="c-message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="c-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Tell us about your project..."
                        aria-invalid={!!errors.message}
                      />
                      {errors.message ? <span className="text-xs text-destructive">{errors.message}</span> : null}
                    </motion.div>
                    <motion.div variants={formFieldVariants} className="sm:col-span-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={SPRING_BOUNCY}>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                        >
                          {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                          {submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
