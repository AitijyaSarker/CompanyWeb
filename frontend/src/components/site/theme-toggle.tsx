"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  overlay?: boolean;
  className?: string;
}

export function ThemeToggle({ overlay = false, className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const transitionTimerRef = React.useRef<ReturnType<typeof window.setTimeout> | null>(null);

  React.useEffect(() => {
    setMounted(true);

    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const current = resolvedTheme || theme || "light";
  const isDark = mounted && current === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof document !== "undefined" && "startViewTransition" in document && !isReducedMotion) {
      root.classList.add("theme-switching");
      const transition = (document as any).startViewTransition(() => {
        setTheme(next);
      });
      transition.finished.finally(() => {
        root.classList.remove("theme-switching");
      });
    } else {
      root.classList.add("theme-switching");
      setTheme(next);

      transitionTimerRef.current = window.setTimeout(() => {
        root.classList.remove("theme-switching");
        transitionTimerRef.current = null;
      }, 380);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "theme-toggle-button relative size-9 overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs",
        overlay
          ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
          : "border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
        className
      )}
      onClick={toggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <Sun className={cn("size-4 text-amber-500 transition-transform duration-300", isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      <Moon className={cn("absolute size-4 text-cyan-400 transition-transform duration-300", isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
