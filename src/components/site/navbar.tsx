"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
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
import { NavLinkMotion, SPRING_BOUNCY } from "@/components/site/motion";
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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Reviews", href: "/review" },
  { label: "Careers", href: "/careers" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isCompanyActive(pathname: string) {
  return COMPANY_LINKS.some((link) => isActive(pathname, link.href));
}

function NavItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("nav-link", active && "nav-link-active")}
      aria-current={active ? "page" : undefined}
    >
      <NavLinkMotion active={active}>{children}</NavLinkMotion>
    </Link>
  );
}

export function SiteNavbar() {
  const { data } = useSiteData();
  const content = data?.content;
  const brand = getContent(content, "nav_brand", "ULTRABULB IT");
  const tagline = getContent(content, "nav_tagline", "Software Development Agency");
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isHome = pathname === "/";
  const overlayHero = isHome && !scrolled;
  const isDark = mounted && resolvedTheme === "dark";
  const heroOverlayDark = overlayHero && isDark;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const companyActive = isCompanyActive(pathname);

  return (
    <motion.header
      data-overlay={heroOverlayDark ? "true" : "false"}
      initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-all duration-300",
        overlayHero
          ? "border-transparent bg-transparent"
          : "border-border/80 bg-background/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-(--brand-navy-dark)/95"
      )}
    >
      <nav
        aria-label="Primary"
        className="site-container flex h-[4.5rem] items-center justify-between gap-4 lg:h-20"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-4"
        >
          <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.97 }} transition={SPRING_BOUNCY}>
            <SiteLogo alt={brand} priority className="size-11 sm:size-12" showWrapper wrapperClassName="size-12 sm:size-14" />
          </motion.div>
          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={cn(
                "text-base font-bold tracking-tight",
                heroOverlayDark ? "text-white" : "text-(--brand-navy) dark:text-white"
              )}
            >
              {brand}
            </span>
            <span
              className={cn(
                "text-[11px] font-medium uppercase tracking-[0.14em]",
                heroOverlayDark ? "text-white/60" : "text-muted-foreground"
              )}
            >
              {tagline}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavItem href={link.href}>{link.label}</NavItem>
            </li>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn("nav-link group", companyActive && "nav-link-active")}
                  aria-current={companyActive ? "true" : undefined}
                >
                  Company
                  <ChevronDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-52 rounded-xl border-border/70 p-2 shadow-xl">
                <DropdownMenuLabel className="px-3 py-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Company
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {COMPANY_LINKS.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="rounded-lg px-3 py-2.5">
                    <Link href={item.href} className={cn(isActive(pathname, item.href) && "font-semibold text-(--brand-cyan)")}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle overlay={heroOverlayDark} />
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING_BOUNCY}>
            <Button
              asChild
              size="sm"
              className="hidden rounded-full bg-(--brand-cyan) px-4 font-semibold text-(--brand-navy-dark) shadow-sm hover:bg-(--brand-cyan)/90 md:inline-flex"
            >
              <Link href="/schedule" className="gap-1.5">
                <Phone className="size-3.5" />
                Schedule a Call
              </Link>
            </Button>
          </motion.div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className={cn(
                  "size-9 rounded-lg lg:hidden",
                  heroOverlayDark
                    ? "border-white/20 bg-white/5 text-white"
                    : "border-border/60 bg-background text-foreground"
                )}
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-72 flex-col sm:w-80">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="flex items-center gap-3">
                  <SiteLogo alt={brand} className="size-12" showWrapper wrapperClassName="size-14" />
                  <span className="text-left text-base font-bold">{brand}</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                        isActive(pathname, link.href) && "bg-accent font-semibold text-(--brand-cyan)"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Company
                </div>
                {COMPANY_LINKS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                        isActive(pathname, item.href) && "bg-accent font-semibold text-(--brand-cyan)"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="border-t pt-4">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-full bg-(--brand-cyan) text-(--brand-navy-dark) hover:bg-(--brand-cyan)/90">
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
