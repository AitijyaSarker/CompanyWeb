"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/site/section-heading";
import { SPRING_BOUNCY, SPRING_SMOOTH, fadeUpSpring } from "@/components/site/motion";
import { getContent, useSiteData, type GalleryImage } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

interface GalleryItemProps {
  image: GalleryImage;
  onOpen: (image: GalleryImage) => void;
  index: number;
}

function GalleryItem({ image, onOpen, index }: GalleryItemProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -10 }}
      transition={{ ...SPRING_SMOOTH, delay: index * 0.04 }}
      whileHover={{ y: -8, scale: 1.02, transition: SPRING_BOUNCY }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={() => onOpen(image)}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-sm transition-shadow hover:shadow-lg"
      aria-label={`Open image: ${image.title}`}
    >
      <motion.img
        src={image.imageUrl}
        alt={image.title}
        loading="lazy"
        className="size-full object-cover"
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        className="absolute inset-x-0 bottom-0 p-3"
      >
        <Badge className="rounded-full bg-white/20 text-white backdrop-blur">{image.category}</Badge>
        <div className="mt-1.5 text-sm font-semibold text-white">{image.title}</div>
      </motion.div>
    </motion.button>
  );
}

export function Gallery() {
  const { data } = useSiteData();
  const content = data?.content;
  const gallery = data?.gallery ?? [];

  const badge = getContent(content, "gallery_badge", "Gallery");
  const title = getContent(content, "gallery_title", "Snapshots From Our Journey");
  const subtitle = getContent(
    content,
    "gallery_subtitle",
    "Moments from our office, events, hackathons and the people who make ULTRABULB IT."
  );

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(gallery.map((g) => g.category).filter(Boolean)));
    return ["All", ...unique];
  }, [gallery]);

  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [selected, setSelected] = React.useState<GalleryImage | null>(null);

  const filtered = React.useMemo(() => {
    if (activeCategory === "All") return gallery;
    return gallery.filter((g) => g.category === activeCategory);
  }, [gallery, activeCategory]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="site-container">
        <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" />

        {categories.length > 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative h-9 overflow-hidden rounded-full px-4",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border/70 bg-background/60 text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {activeCategory === cat ? (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={SPRING_BOUNCY}
                  />
                ) : null}
                <span className="relative z-10">{cat}</span>
              </Button>
            ))}
          </motion.div>
        ) : null}

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border/60 bg-card/50 px-6 py-16 text-center"
          >
            <ImageIcon className="size-10 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No photos to display yet.</p>
          </motion.div>
        ) : (
          <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((image, i) => (
                <GalleryItem key={image.id} image={image} onOpen={setSelected} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 sm:max-w-3xl">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING_SMOOTH}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image src={selected.imageUrl} alt={selected.title} fill sizes="(max-width: 768px) 92vw, 900px" className="object-cover" />
                </div>
                <DialogHeader className="px-6 pb-6">
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full bg-accent text-accent-foreground">{selected.category}</Badge>
                  </div>
                  <DialogTitle className="mt-2 text-xl">{selected.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    Full-size view of {selected.title}.
                  </DialogDescription>
                </DialogHeader>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
