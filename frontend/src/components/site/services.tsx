"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGrid, fadeUpSpring } from "@/components/site/motion";
import { SERVICES } from "@/data/services";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export function Services({ hideHeading = false }: { hideHeading?: boolean }) {
  const { data } = useSiteData();
  const content = data?.content;
  const badge = getContent(content, "services_badge", "What We Do");
  const title = getContent(content, "services_title", "Services Built for Scale");
  const subtitle = getContent(
    content,
    "services_subtitle",
    "End-to-end technology services — from strategy and design to engineering, deployment and long-term support."
  );

  return (
    <section id="services" aria-labelledby="services-title" className="section-pad w-full bg-(--brand-navy) text-white">
      <div className="site-container">
        {!hideHeading && <SectionHeading badge={badge} title={title} subtitle={subtitle} align="center" dark />}
        <StaggerGrid className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUpSpring}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-(--brand-cyan)/40 hover:bg-white/8"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(33,187,205,0.12), transparent 70%)" }}
              />
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-(--brand-cyan)/15 text-(--brand-cyan) transition-colors group-hover:bg-(--brand-cyan) group-hover:text-(--brand-navy-dark)">
                <service.icon className="size-5" />
              </span>
              <h3 className="text-base font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{service.description}</p>
              <Badge variant="outline" className="mt-4 rounded-full border-(--brand-cyan)/30 text-(--brand-cyan) opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
              </Badge>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
