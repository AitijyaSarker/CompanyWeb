"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { SiteNavbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Career } from "@/components/site/career";
import { Gallery } from "@/components/site/gallery";
import { ReviewsAwards } from "@/components/site/reviews-awards";
import { Contact } from "@/components/site/contact";
import { useSiteData } from "@/hooks/use-site-data";

export default function Home() {
  const { loading, error } = useSiteData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNavbar />

      <main className="flex-1">
        {error ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-32 text-center">
            <AlertCircle className="size-10 text-destructive" />
            <h2 className="text-lg font-semibold text-foreground">Couldn&apos;t load content</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <Hero />
            <About />
            <Products />
            <Career />
            <Gallery />
            <ReviewsAwards />
            <Contact />
          </>
        )}
      </main>

      {/* Global loading bar while initial data loads */}
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="h-full w-1/3 bg-amber-500"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
