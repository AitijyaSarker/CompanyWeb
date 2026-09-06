"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Phone, Twitter } from "lucide-react";

import { SiteLogo } from "@/components/site/site-logo";
import { fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Reviews", href: "/review" },
  { label: "Schedule a Call", href: "/schedule" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  "Web Development",
  "Software Development",
  "Mobile Development",
  "UI/UX Design",
  "AI & Machine Learning",
  "Cloud Solutions",
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
    <footer className="relative mt-auto overflow-hidden bg-(--brand-navy) text-slate-300">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <span className="translate-y-1/3 text-[18vw] font-black leading-none text-white/[0.03]">ULTRABULB</span>
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--brand-cyan)/60 to-transparent" />

      <div className="site-container relative py-16 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
        >
          <motion.div variants={fadeUpSpring} className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo alt={brand} className="size-10" showWrapper wrapperClassName="size-11 bg-white" />
              <span className="text-base font-bold tracking-tight text-white">{brand}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{tagline}</p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-slate-400 transition-colors hover:border-(--brand-cyan) hover:text-(--brand-cyan)"
                >
                  <s.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-(--brand-cyan)"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-slate-400 transition-colors hover:text-(--brand-cyan)">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-(--brand-cyan)">
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone}`} className="transition-colors hover:text-(--brand-cyan)">
                  {phone}
                </a>
              </li>
              <li className="leading-relaxed">{address}</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUpSpring} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Start a Project</h3>
            <p className="text-sm text-slate-400">
              Have an idea? Let&apos;s turn it into a product people love.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/schedule"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-(--brand-cyan) px-5 py-2.5 text-sm font-semibold text-(--brand-navy-dark) transition-colors hover:bg-(--brand-cyan)/90"
              >
                <Phone className="size-4" />
                Schedule a Call
              </Link>
            </motion.div>
            <Link
              href="/admin"
              className="mt-1 w-fit text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Admin Login →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row"
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {copyright}
          </p>
          <p className="text-xs text-slate-600">Crafted with care by ULTRABULB IT</p>
        </motion.div>
      </div>
    </footer>
  );
}
