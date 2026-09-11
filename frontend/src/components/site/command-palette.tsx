"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Code2,
  Briefcase,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Shield,
  FileCode,
  X,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useSiteData } from "@/hooks/use-site-data";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const { data } = useSiteData();

  const products = data?.products || [];
  const vacancies = data?.vacancies || [];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const navigationItems = [
    { label: "Home", href: "/", icon: Compass, category: "Navigation" },
    { label: "Services & Capabilities", href: "/services", icon: Layers, category: "Navigation" },
    { label: "Featured Projects & Case Studies", href: "/projects", icon: Code2, category: "Navigation" },
    { label: "Why Choose ULTRABULB IT", href: "/why-choose-us", icon: Shield, category: "Navigation" },
    { label: "Our 5-Stage Engineering Process", href: "/process", icon: Sparkles, category: "Navigation" },
    { label: "About Our Company", href: "/about", icon: Users, category: "Navigation" },
    { label: "Careers & Open Positions", href: "/careers", icon: Briefcase, category: "Navigation" },
    { label: "Schedule a Consultation Call", href: "/schedule", icon: Calendar, category: "Action" },
    { label: "Contact Engineering Team", href: "/contact", icon: Phone, category: "Action" },
    { label: "Client Reviews & Testimonials", href: "/review", icon: Sparkles, category: "Navigation" },
  ];

  const serviceItems = [
    { label: "Web Application Engineering", href: "/services#web", icon: FileCode, category: "Services" },
    { label: "Enterprise Software Systems", href: "/services#software", icon: Code2, category: "Services" },
    { label: "Mobile Apps (iOS & Android)", href: "/services#mobile", icon: Layers, category: "Services" },
    { label: "AI & Autonomous Agents", href: "/services#ai", icon: Sparkles, category: "Services" },
    { label: "Cloud Infrastructure & DevOps", href: "/services#cloud", icon: Shield, category: "Services" },
  ];

  const projectItems = products.slice(0, 6).map((p: any) => ({
    label: p.title,
    href: `/projects/${p.id}`,
    icon: Code2,
    category: "Projects",
    desc: p.category || "Case Study",
  }));

  const vacancyItems = vacancies.map((v: any) => ({
    label: `${v.title} (${v.type || "Full-time"})`,
    href: "/careers",
    icon: Briefcase,
    category: "Careers",
  }));

  const allItems = [...navigationItems, ...serviceItems, ...projectItems, ...vacancyItems];

  const filtered = query.trim()
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 10);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/95 p-0 shadow-2xl backdrop-blur-2xl dark:border-cyan-500/30 dark:bg-slate-950/95"
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-slate-200/80 px-4 py-3.5 dark:border-white/10">
              <Search className="size-5 shrink-0 text-cyan-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, services, case studies, technologies..."
                className="w-full border-none bg-transparent px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                onClick={() => onOpenChange(false)}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  No results found for &ldquo;<span className="text-cyan-500">{query}</span>&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={`${item.label}-${idx}`}
                        onClick={() => handleSelect(item.href)}
                        className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-cyan-500 group-hover:text-slate-950 dark:bg-slate-900 dark:text-slate-300">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-300">
                              {item.label}
                            </div>
                            {item.category && (
                              <div className="text-xs text-slate-400 dark:text-slate-500">
                                {item.category}
                              </div>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-slate-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-cyan-500 group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Footer Shortcut Hint */}
            <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/80 px-4 py-2 text-xs text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>Navigate: <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">↑</kbd> <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">↓</kbd></span>
                <span>Select: <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">↵</kbd></span>
              </div>
              <div>
                Press <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">ESC</kbd> to close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
