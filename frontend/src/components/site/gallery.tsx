"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  Sparkles,
  X,
  Calendar,
  Layers,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SPRING_BOUNCY, SPRING_SMOOTH, fadeUpSpring, staggerContainer } from "@/components/site/motion";
import { getContent, useSiteData, type GalleryImage } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

const CURATED_GALLERY: GalleryImage[] = [
  {
    id: "g-1",
    title: "Enterprise Distributed Architecture War Room",
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    description: "Deep-dive technical whiteboarding, microservices topology mapping, and load latency audits at ULTRABULB HQ.",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "g-2",
    title: "Annual AI Autonomous Agent Hackathon",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    description: "48-hour continuous innovation marathon building multi-agent LLM systems and custom retrieval pipelines.",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "g-3",
    title: "ULTRABULB Cloud Engineering HQ & Workspace",
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "Ergonomic multi-display workstations, collaborative lounges, and agile war rooms designed for deep engineering focus.",
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "g-4",
    title: "24/7 SecOps & Live Deployment Watch",
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    description: "Real-time Kubernetes cluster telemetry, edge TTFB optimization, and automated vulnerability monitoring.",
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "g-5",
    title: "Global Tech Summit & Keynote Presentation",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    description: "ULTRABULB engineering leaders delivering keynote insights on modern distributed caching and AI orchestration.",
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "g-6",
    title: "Design System & Figma Token Blueprinting",
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    description: "Architecting scalable design tokens, WCAG 2.1 AAA accessible color palettes, and micro-interaction prototypes.",
    order: 6,
    createdAt: new Date().toISOString(),
  },
];

export function Gallery() {
  const { data } = useSiteData();
  const content = data?.content;
  const backendGallery = data?.gallery ?? [];
  const prefersReducedMotion = useReducedMotion();

  // Use backend gallery if populated, otherwise use curated high-tech fallback
  const galleryItems = backendGallery.length > 0 ? backendGallery : CURATED_GALLERY;

  const badge = getContent(content, "gallery_badge", "Life at ULTRABULB");
  const title = getContent(content, "gallery_title", "Snapshots From Our Journey");
  const subtitle = getContent(
    content,
    "gallery_subtitle",
    "Moments from our office, events, hackathons and the people who make ULTRABULB IT."
  );

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(galleryItems.map((g) => g.category).filter(Boolean)));
    return ["All", ...unique];
  }, [galleryItems]);

  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((g) => g.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const selectedImage = selectedIndex !== null ? filtered[selectedIndex] : null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filtered.length);
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filtered]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-slate-50/60 dark:bg-slate-950/70 text-foreground transition-colors duration-300"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 dark:bg-grid-dark dark:opacity-20" />
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-cyan-500/10 blur-[130px] dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[450px] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/15" />

      <div className="site-container relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge className="mb-4 rounded-full border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Camera className="mr-1.5 size-3.5" />
            {badge}
          </Badge>
          <h2
            id="gallery-title"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white"
          >
            Snapshots From{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-sky-300 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105"
                      : "border border-slate-200/80 bg-white/80 text-slate-700 hover:border-cyan-500/40 hover:bg-white dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                  <span>{cat}</span>
                  {cat === "All" && (
                    <span className="ml-1.5 text-[11px] opacity-75 font-mono">({galleryItems.length})</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Bento / Masonry Gallery Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  layout
                  key={item.id || item.imageUrl}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)] dark:border-white/10 dark:bg-slate-900/80",
                    isLarge ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3] sm:aspect-auto sm:min-h-[300px]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className="relative block size-full text-left focus:outline-none cursor-pointer"
                    aria-label={`View full photo: ${item.title}`}
                  >
                    {/* Background Image with Hover Zoom */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-xs">
                        {item.category || "Moment"}
                      </span>
                    </div>

                    {/* Top Right Zoom Trigger */}
                    <div className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                      <Expand className="size-4" />
                    </div>

                    {/* Bottom Content Card */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / High-Res Carousel Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-slate-200/80 bg-slate-950/95 text-white shadow-2xl backdrop-blur-2xl dark:border-cyan-500/30">
          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                key={selectedImage.id || selectedImage.imageUrl}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={SPRING_SMOOTH}
                className="relative flex flex-col"
              >
                {/* Large Preview Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="size-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  {filtered.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-slate-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-slate-950 transition-all backdrop-blur-md shadow-lg cursor-pointer"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-slate-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-slate-950 transition-all backdrop-blur-md shadow-lg cursor-pointer"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}

                  {/* Index Indicator Pill */}
                  <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-mono text-cyan-300 border border-white/10 backdrop-blur-md">
                    {(selectedIndex ?? 0) + 1} / {filtered.length}
                  </div>
                </div>

                {/* Lightbox Information Bar */}
                <div className="p-6 sm:p-8 bg-slate-950">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs">
                      {selectedImage.category || "Moment"}
                    </Badge>
                  </div>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedImage.title}
                  </DialogTitle>
                  {selectedImage.description && (
                    <DialogDescription className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                      {selectedImage.description}
                    </DialogDescription>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}

