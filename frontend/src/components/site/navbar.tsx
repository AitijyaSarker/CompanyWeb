"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
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
  },
  {
    title: "Engineering Process",
    desc: "Our 5-stage agile lifecycle from blueprint to cloud deployment.",
    href: "/process",
    icon: Sparkles,
  },
  {
    title: "Why Choose Us",
    desc: "Enterprise SLAs, SOC2 compliance and guaranteed velocity.",
    href: "/why-choose-us",
    icon: Shield,
  },
  {
    title: "Client Testimonials",
    desc: "Verified reviews from venture-backed startups and enterprises.",
    href: "/review",
    icon: Globe,
  },
  {
    title: "Careers & Open Roles",
    desc: "Join our world-class engineering and AI product teams.",
    href: "/careers",
    icon: Briefcase,
  },
];

const SERVICES_MENU = [
  {
    title: "Web Platforms & SaaS",
    desc: "High-performance React & Next.js web applications.",
    href: "/services#web",
    icon: Code2,
  },
  {
    title: "Enterprise AI & LLM Systems",
    desc: "Custom autonomous agents, RAG & predictive AI.",
    href: "/services#ai",
    icon: Cpu,
  },
  {
    title: "Mobile Apps (iOS & Android)",
    desc: "Cross-platform mobile applications with native speeds.",
    href: "/services#mobile",
    icon: Smartphone,
  },
  {
    title: "Cloud Infrastructure & DevOps",
    desc: "AWS, Kubernetes, microservices & automated CI/CD.",
    href: "/services#cloud",
    icon: Layers,
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
    const onScroll = () => setScrolled(window.scrollY > 15);
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
        initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/80 bg-white/80 py-3 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="navbar-container flex items-center justify-between">
          {/* Brand Logo & Status Pill */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="group flex items-center gap-3 focus:outline-none">
              <SiteLogo
                alt={brand}
                className="size-9 sm:size-10 transition-transform duration-300 group-hover:scale-105"
                showWrapper
                wrapperClassName="size-10 sm:size-11 bg-white/90 shadow-sm border border-slate-200/60 dark:bg-slate-900 dark:border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {brand}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400">
                  Enterprise Software Agency
                </span>
              </div>
            </Link>

            {/* Availability status badge */}
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Q2/Q3 Projects</span>
            </div>
          </div>

          {/* Desktop Navigation Links & Mega-Menus */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={cn("nav-link", isActive(pathname, "/") && "nav-link-active")}
            >
              <NavLinkMotion active={isActive(pathname, "/")}>Home</NavLinkMotion>
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link outline-none cursor-pointer flex items-center gap-1">
                <span>Services</span>
                <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[420px] p-3 rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95"
              >
                <div className="mb-2 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  Engineering Capabilities
                </div>
                <div className="space-y-1">
                  {SERVICES_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.title} asChild className="p-0 rounded-xl focus:bg-cyan-500/10">
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {item.desc}
                            </div>
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
                    className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    <span>View All Services & Tech Stack</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/projects"
              className={cn("nav-link", isActive(pathname, "/projects") && "nav-link-active")}
            >
              <NavLinkMotion active={isActive(pathname, "/projects")}>Projects</NavLinkMotion>
            </Link>

            {/* Company Mega Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link outline-none cursor-pointer flex items-center gap-1">
                <span>Company</span>
                <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[380px] p-3 rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95"
              >
                <div className="mb-2 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  Corporate Architecture
                </div>
                <div className="space-y-1">
                  {COMPANY_MENU.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.title} asChild className="p-0 rounded-xl focus:bg-cyan-500/10">
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15"
                        >
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {item.desc}
                            </div>
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
              className={cn("nav-link", isActive(pathname, "/why-choose-us") && "nav-link-active")}
            >
              <NavLinkMotion active={isActive(pathname, "/why-choose-us")}>Why Us</NavLinkMotion>
            </Link>

            <Link
              href="/contact"
              className={cn("nav-link", isActive(pathname, "/contact") && "nav-link-active")}
            >
              <NavLinkMotion active={isActive(pathname, "/contact")}>Contact</NavLinkMotion>
            </Link>
          </nav>

          {/* Right Action Icons & Primary Schedule Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-100/80 px-2.5 py-1.5 text-xs text-slate-500 hover:border-cyan-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:text-white transition-all shadow-xs"
              title="Search and Navigation (Cmd+K)"
            >
              <Search className="size-3.5 text-cyan-500" />
              <span className="hidden sm:inline-block">Search</span>
              <kbd className="hidden sm:inline-block rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-white/20 dark:bg-slate-800 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Primary Action Button */}
            <Button
              asChild
              className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 hover:from-cyan-400 hover:to-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] px-4 sm:px-5 text-xs sm:text-sm"
            >
              <Link href="/schedule" className="gap-2">
                <Calendar className="size-4" />
                <span>Schedule Call</span>
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
                  className="w-full max-w-sm border-l border-slate-200/80 bg-white/95 p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/95"
                >
                  <SheetHeader className="mb-6 flex flex-row items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <SiteLogo alt={brand} className="size-8" />
                      <SheetTitle className="text-base font-bold text-slate-900 dark:text-white">
                        {brand}
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col space-y-1 overflow-y-auto max-h-[75vh] pr-2">
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
                      Quick Portals
                    </div>

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
                            <span>Schedule Consultation</span>
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
                            <span>Get Direct In Touch</span>
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
      </motion.header>

      {/* Global Command Search Palette */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
