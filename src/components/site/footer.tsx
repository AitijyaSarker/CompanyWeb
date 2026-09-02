"use client";

import * as React from "react";
import Link from "next/link";
import { Facebook, Github, Lightbulb, Linkedin, Twitter } from "lucide-react";

import { getContent, useSiteData } from "@/hooks/use-site-data";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Career", href: "#career" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  const { data } = useSiteData();
  const content = data?.content;

  const brand = getContent(content, "nav_brand", "ULTRABULB IT");
  const tagline = getContent(
    content,
    "footer_tagline",
    "A software development agency crafting digital products that create real business value."
  );
  const email = getContent(content, "footer_email", "hello@ultrabulb.com");
  const phone = getContent(content, "footer_phone", "+880 1700-000000");
  const address = getContent(content, "footer_address", "Dhaka, Bangladesh");
  const copyright = getContent(content, "footer_copyright", "ULTRABULB IT. All rights reserved.");
  const socials = [
    { icon: Facebook, href: getContent(content, "footer_social_facebook", "https://facebook.com"), label: "Facebook" },
    { icon: Linkedin, href: getContent(content, "footer_social_linkedin", "https://linkedin.com"), label: "LinkedIn" },
    { icon: Twitter, href: getContent(content, "footer_social_twitter", "https://twitter.com"), label: "Twitter" },
    { icon: Github, href: getContent(content, "footer_social_github", "https://github.com"), label: "GitHub" },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden bg-zinc-950 text-zinc-300">
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center"
      >
        <span className="translate-y-1/3 text-[18vw] font-black leading-none text-white/5">
          ULTRABULB
        </span>
      </div>

      {/* Subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="#home" className="flex items-center gap-2.5">
              <span className="gradient-amber flex size-9 items-center justify-center rounded-full text-primary-foreground">
                <Lightbulb className="size-5" />
              </span>
              <span className="text-base font-bold tracking-tight text-white">{brand}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">{tagline}</p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-amber-500 hover:text-amber-400"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Company</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Get in Touch</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-amber-400">{email}</a>
              </li>
              <li>
                <a href={`tel:${phone}`} className="transition-colors hover:text-amber-400">{phone}</a>
              </li>
              <li className="leading-relaxed">{address}</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Start a Project</h3>
            <p className="text-sm text-zinc-400">
              Have an idea? Let&apos;s turn it into a product people love.
            </p>
            <Link
              href="/schedule"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-400"
            >
              Schedule a Call
            </Link>
            <Link
              href="/admin"
              className="mt-1 w-fit text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Admin Login →
            </Link>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} {copyright}
          </p>
          <p className="text-xs text-zinc-600">Crafted with care by ULTRABULB IT</p>
        </div>
      </div>
    </footer>
  );
}
