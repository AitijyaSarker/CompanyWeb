"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { SiteNavbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { Preloader, RouteProgressBar } from "@/components/site/preloader";
import { useSiteData } from "@/hooks/use-site-data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { loading, error } = useSiteData();
  const [hasPreloaded, setHasPreloaded] = React.useState<boolean>(false);

  // Show preloader on initial application boot
  const [showPreloader, setShowPreloader] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("ultrabulb_has_preloaded");
      if (alreadyLoaded) return false;
    }
    return true;
  });

  const handlePreloaderComplete = React.useCallback(() => {
    setShowPreloader(false);
    setHasPreloaded(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ultrabulb_has_preloaded", "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-cyan-500 selection:text-slate-950">
      {/* World-Class Initial Boot Preloader */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Top Edge Route Loading Laser */}
      <RouteProgressBar isRouting={loading && hasPreloaded} />

      <SiteNavbar />

      <main className="flex-1">
        {error ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-32 text-center">
            <AlertCircle className="size-10 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">Couldn&apos;t load content</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : (
          children
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
