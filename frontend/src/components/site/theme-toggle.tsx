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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const current = resolvedTheme || theme || "light";
  const isDark = mounted && current === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative size-9 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs",
        overlay
          ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
          : "border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
        className
      )}
      onClick={toggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <Sun className={cn("size-4 text-amber-500 transition-all duration-300", isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      <Moon className={cn("absolute size-4 text-cyan-400 transition-all duration-300", isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
