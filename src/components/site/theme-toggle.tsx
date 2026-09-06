"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  overlay?: boolean;
}

export function ThemeToggle({ overlay = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative size-9 rounded-full backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
        overlay
          ? "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          : "border border-border/60 bg-background/80 text-foreground hover:bg-accent hover:text-foreground"
      )}
      onClick={toggle}
      disabled={!mounted}
    >
      <Sun className={cn("size-4 transition-all duration-200 ease-out", isDark ? "rotate-90 scale-0" : "rotate-0 scale-100")} />
      <Moon className={cn("absolute size-4 transition-all duration-200 ease-out", isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
