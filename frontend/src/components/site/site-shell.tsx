"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { SiteNavbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { useSiteData } from "@/hooks/use-site-data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { loading, error } = useSiteData();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
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

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-x-0 top-0 z-60 h-1 overflow-hidden bg-(--brand-navy)/10"
          >
            <motion.div
              className="h-full w-full origin-left bg-linear-to-r from-(--brand-navy) via-(--brand-cyan) to-(--brand-navy)"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 0.6, 0.85, 1] }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
