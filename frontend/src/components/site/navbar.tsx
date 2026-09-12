"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Phone,
  Search,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Shield,
  Smartphone,
  ArrowRight,
  Globe,
  Briefcase,
  Users,
  Calendar,
  Zap,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { SiteLogo } from "@/components/site/site-logo";
import { NavLinkMotion } from "@/components/site/motion";
import { CommandPalette } from "@/components/site/command-palette";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getContent, useSiteData } from "@/hooks/use-site-data";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Why Us", href: "/why-choose-us" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const COMPANY_MENU = [
  {
    title: "About ULTRABULB",
    desc: "Our mission, engineering culture and leadership team.",
    href: "/about",
    icon: Users,
    badge: "Who We Are",
  },
  {
    title: "Engineering Process",
    desc: "Our 5-stage agile lifecycle from blueprint to cloud deployment.",
    href: "/process",
    icon: Sparkles,
    badge: "Methodology",
  },
  {
    title: "Why Choose Us",
    desc: "Enterprise SLAs, SOC2 compliance and guaranteed velocity.",
    href: "/why-choose-us",
    icon: Shield,
    badge: "99.99% SLA",
  },
  {
    title: "Client Testimonials",
    desc: "Verified reviews from venture-backed startups and enterprises.",
    href: "/review",
    icon: Globe,
    badge: "Verified",
  },
  {
    title: "Careers & Open Roles",
    desc: "Join our world-class engineering and AI product teams.",
    href: "/careers",
    icon: Briefcase,
    badge: "Hiring",
  },
];

const SERVICES_MENU = [
  {
    title: "Web Platforms & SaaS",
    desc: "Next.js 15, React 19, high-concurrency micro-frontends.",
    href: "/services#web",
    icon: Code2,
    tag: "High Scale",
  },
  {
    title: "Enterprise AI & LLM Systems",
    desc: "Custom autonomous agents, RAG vector retrieval & neural pipelines.",
    href: "/services#ai",
    icon: Cpu,
    tag: "Trending",
  },
  {
    title: "Mobile Apps (iOS & Android)",
    desc: "Cross-platform mobile applications with native 120 FPS speed.",
    href: "/services#mobile",
    icon: Smartphone,
    tag: "Native Feel",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    desc: "AWS, Kubernetes, Terraform, zero-downtime CI/CD pipelines.",
    href: "/services#cloud",
    icon: Layers,
    tag: "Kubernetes",
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavbar() {
  const { data } = useSiteData();
  const content = data?.content;
  const brand = getContent(content, "nav_brand", "ULTRABULB IT");
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 w-full transition-all duration-300"
      >
        <div className="site-container pt-3 sm:pt-4">
          <div
            className={cn(
              "mobile-nav-frame relative flex items-center justify-between rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300",
              scrolled
                ? "border border-slate-200/80 bg-white/85 shadow-[0_10px_35px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-slate-950/85 dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                : "border border-slate-200/50 bg-white/70 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
            )}
          >
            {/* Left: Brand Logo & Status Pill */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link href="/" className="group flex items-center gap-3 focus:outline-none">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-sm group-hover:opacity-75 transition-opacity" />
                  <SiteLogo
                    alt={brand}
                    className="relative size-8 sm:size-9 transition-transform duration-300 group-hover:scale-105"
                    showWrapper
                    wrapperClassName="size-9 sm:size-10 bg-white/95 shadow-sm border border-slate-200/80 dark:bg-slate-900 dark:border-white/10"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {brand}
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400">
                    Enterprise Engineering
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links & Mega-Menus */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <Link
                href="/"
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all",
                  isActive(pathname, "/")
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                <NavLinkMotion active={isActive(pathname, "/")}>Home</NavLinkMotion>
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all outline-none cursor-pointer flex items-center gap-1",
                    isActive(pathname, "/services")
                      ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  <span>Services</span>
                  <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[460px] p-3.5 rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-slate-950/95"
                >
                  <div className="flex items-center justify-between mb-2 px-2 py-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                      Engineering Capabilities
                    </span>
                    <Badge variant="outline" className="text-[10px] font-medium border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                      Enterprise Grade
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {SERVICES_MENU.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem
                          key={item.title}
                          asChild
                          className="p-0 rounded-xl focus:bg-cyan-500/10 cursor-pointer"
                        >
                          <Link
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 group/item"
                          >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 group-hover/item:bg-cyan-500 group-hover/item:text-slate-950 transition-colors dark:bg-cyan-500/20 dark:text-cyan-400">
                              <Icon className="size-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 font-mono">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                  <DropdownMenuSeparator className="my-2 dark:bg-white/10" />
                  <DropdownMenuItem asChild className="p-0">
                    <Link
                      href="/services"
                      className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 group/link"
                    >
                      <span>Explore Complete Engineering Stack</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/projects"
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all",
                  isActive(pathname, "/projects")
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                <NavLinkMotion active={isActive(pathname, "/projects")}>Projects</NavLinkMotion>
              </Link>

              {/* Company Mega Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all outline-none cursor-pointer flex items-center gap-1",
                    isActive(pathname, "/about") || isActive(pathname, "/process") || isActive(pathname, "/careers")
                      ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  <span>Company</span>
                  <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[420px] p-3.5 rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-slate-950/95"
                >
                  <div className="mb-2 px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                    Corporate Architecture
                  </div>
                  <div className="space-y-1">
                    {COMPANY_MENU.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem
                          key={item.title}
                          asChild
                          className="p-0 rounded-xl focus:bg-cyan-500/10 cursor-pointer"
                        >
                          <Link
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 group/corp"
                          >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 group-hover/corp:bg-cyan-500 group-hover/corp:text-slate-950 transition-colors">
                              <Icon className="size-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/why-choose-us"
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all",
                  isActive(pathname, "/why-choose-us")
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                <NavLinkMotion active={isActive(pathname, "/why-choose-us")}>Why Us</NavLinkMotion>
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all",
                  isActive(pathname, "/contact")
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/15 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                <NavLinkMotion active={isActive(pathname, "/contact")}>Contact</NavLinkMotion>
              </Link>
            </nav>

            {/* Right: Quick Search, Theme Toggle, CTA & Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Command Palette Icon Trigger */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="relative size-9 rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:scale-105 active:scale-95 shadow-xs dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-all duration-200"
                title="Search and Navigation (Cmd+K)"
                aria-label="Search and Navigation (Cmd+K)"
              >
                <Search className="size-4 text-cyan-600 dark:text-cyan-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Primary Consultation Call CTA with liquid shimmer */}
              <Button
                asChild
                className="hidden sm:inline-flex relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-400 text-slate-950 font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.4)] px-4 sm:px-5 py-2 text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Link href="/schedule" className="gap-2">
                  <Calendar className="size-3.5" />
                  <span>Book Consultation</span>
                </Link>
              </Button>

              {/* Mobile Menu Drawer Sheet */}
              <div className="lg:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 rounded-xl border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-900/80"
                      aria-label="Open Navigation Menu"
                    >
                      <Menu className="size-5 text-slate-800 dark:text-slate-200" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="mobile-menu-panel w-full max-w-sm border-l border-slate-200/80 bg-white/95 p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95"
                  >
                    <SheetHeader className="mb-6 flex flex-row items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <SiteLogo alt={brand} className="size-8" showWrapper wrapperClassName="size-9 bg-white shadow-xs border border-slate-200/80 dark:bg-slate-900 dark:border-white/10" />
                        <SheetTitle className="text-base font-bold text-slate-900 dark:text-white">
                          {brand}
                        </SheetTitle>
                      </div>
                      <ThemeToggle />
                    </SheetHeader>

                    <div className="flex flex-col space-y-1 overflow-y-auto max-h-[75vh] pr-1">
                      {NAV_LINKS.map((link) => (
                        <SheetClose asChild key={link.label}>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
                              isActive(pathname, link.href)
                                ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                            )}
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="size-4 opacity-40" />
                          </Link>
                        </SheetClose>
                      ))}

                      <div className="pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Capabilities & Portals
                      </div>

                      <SheetClose asChild>
                        <Link
                          href="/services"
                          className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                          <span>All Services</span>
                          <ArrowRight className="size-4 opacity-40" />
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/review"
                          className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                          <span>Client Reviews</span>
                          <ArrowRight className="size-4 opacity-40" />
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/careers"
                          className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                          <span>Careers & Vacancies</span>
                          <ArrowRight className="size-4 opacity-40" />
                        </Link>
                      </SheetClose>

                      <div className="pt-6 space-y-3">
                        <SheetClose asChild>
                          <Button
                            asChild
                            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] py-5"
                          >
                            <Link href="/schedule" className="gap-2 justify-center">
                              <Calendar className="size-4" />
                              <span>Schedule Architecture Call</span>
                            </Link>
                          </Button>
                        </SheetClose>

                        <SheetClose asChild>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-xl border-slate-200 dark:border-white/10 py-5"
                          >
                            <Link href="/contact" className="gap-2 justify-center">
                              <Phone className="size-4" />
                              <span>Direct RFP / Contact</span>
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Global Command Search Palette */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
