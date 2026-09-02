"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Menu, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Career", href: "#career" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function SiteNavbar() {
  const { data } = useSiteData();
  const content = data?.content;
  const brand = getContent(content, "nav_brand", "ULTRABULB IT");
  const tagline = getContent(content, "nav_tagline", "WE CODE YOUR IDEAS INTO LIGHT");

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 mx-auto mt-4 w-full max-w-5xl px-4"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex items-center justify-between gap-3 rounded-full border px-3 py-2 shadow-sm transition-all duration-300 sm:px-4",
          "glass dark:glass-dark border-border/60",
          scrolled ? "shadow-lg" : "shadow-sm"
        )}
      >
        {/* Brand */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 rounded-full px-1.5 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="gradient-amber flex size-9 items-center justify-center rounded-full text-primary-foreground shadow-sm">
            <Lightbulb className="size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-foreground">{brand}</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              {tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-primary px-4 text-primary-foreground shadow-sm hover:bg-primary/90 sm:inline-flex"
          >
            <Link href="/schedule" className="gap-1.5">
              <Phone className="size-3.5" />
              Schedule a Call
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="size-9 rounded-full border border-border/60 bg-background/60 lg:hidden"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="flex items-center gap-2">
                  <span className="gradient-amber flex size-8 items-center justify-center rounded-full text-primary-foreground">
                    <Lightbulb className="size-4" />
                  </span>
                  <span className="text-base">{brand}</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto px-4 pb-6">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href="/schedule" className="gap-2">
                      <Phone className="size-4" />
                      Schedule a Call
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
