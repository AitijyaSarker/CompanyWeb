"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Activity,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { SiteLogo } from "@/components/site/site-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services & Capabilities", href: "/services" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Engineering Process", href: "/process" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "About ULTRABULB", href: "/about" },
  { label: "Client Testimonials", href: "/review" },
  { label: "Careers & Open Roles", href: "/careers" },
  { label: "Contact Engineering", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Web Platform Engineering", href: "/services#web" },
  { label: "Enterprise AI & LLM Systems", href: "/services#ai" },
  { label: "Mobile Apps (iOS & Android)", href: "/services#mobile" },
  { label: "Cloud & DevOps Architecture", href: "/services#cloud" },
  { label: "Distributed Data Systems", href: "/services#database" },
  { label: "UI/UX & Product Design", href: "/services#design" },
];

export function SiteFooter() {
  const { data } = useSiteData();
  const content = data?.content;
  const [newsEmail, setNewsEmail] = React.useState("");

  const brand = getContent(content, "nav_brand", "ULTRABULB IT");
  const tagline = getContent(
    content,
    "footer_tagline",
    "Elite software engineering agency architecting high-scale digital products, custom AI systems, and mission-critical cloud platforms."
  );
  const email = getContent(content, "footer_email", "hello@ultrabulb.com");
  const phone = getContent(content, "footer_phone", "+880 1700-000000");
  const address = getContent(content, "footer_address", "Dhaka, Bangladesh");
  const copyright = getContent(content, "footer_copyright", "ULTRABULB IT. All rights reserved.");

  const socials = [
    { icon: Facebook, href: getContent(content, "footer_social_facebook", "https://facebook.com"), label: "Facebook" },
    { icon: Linkedin, href: getContent(content, "footer_social_linkedin", "https://linkedin.com"), label: "LinkedIn" },
    { icon: Instagram, href: getContent(content, "footer_social_instagram", "https://instagram.com"), label: "Instagram" },
    { icon: Github, href: getContent(content, "footer_social_github", "https://github.com"), label: "GitHub" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail || !newsEmail.includes("@")) {
      toast.error("Please provide a valid work email.");
      return;
    }
    toast.success("Thank you for subscribing to ULTRABULB Engineering Insights!");
    setNewsEmail("");
  };

  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-950 text-slate-300 border-t border-white/10">
      {/* Background Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center"
      >
        <span className="translate-y-1/3 text-[18vw] font-black leading-none text-white/[0.02]">
          ULTRABULB
        </span>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="site-container relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 mb-16">
          
          {/* Brand Col (4 cols) */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo alt={brand} className="size-9" showWrapper wrapperClassName="size-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10" />
              <span className="text-lg font-bold tracking-tight text-white">{brand}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{tagline}</p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>

            {/* Live Operational Status */}
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>

          {/* Capabilities Col (3 cols) */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Capabilities
            </span>
            <ul className="space-y-2 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-cyan-300 flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Directory (2 cols) */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Company
            </span>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.slice(0, 6).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact (3 cols) */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Engineering Radar
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for quarterly tech briefs on AI architecture, distributed systems, and performance tuning.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="work@company.com"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-xs rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                required
              />
              <Button type="submit" size="icon" className="shrink-0 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:from-cyan-300 hover:to-cyan-400 rounded-xl font-bold shadow-md">
                <Send className="size-4" />
              </Button>
            </form>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-cyan-400" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-cyan-400" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-cyan-400" />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {copyright}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">Security Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
