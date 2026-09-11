"use client";

import * as React from "react";
import { TECH_CATEGORIES, TECH_DETAILS } from "@/data/technologies";
import { TechIcon } from "@/components/site/tech-icons";

const ALL_TECHS = Array.from(new Set(TECH_CATEGORIES.flatMap((category) => category.items)));
const FIRST_HALF = ALL_TECHS.slice(0, Math.ceil(ALL_TECHS.length / 2));
const SECOND_HALF = ALL_TECHS.slice(Math.ceil(ALL_TECHS.length / 2));

function TechItem({ name }: { name: string }) {
  const detail = TECH_DETAILS.find((t) => t.name === name);

  return (
    <div className="group relative flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-white hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)] dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-cyan-400/40 dark:hover:bg-slate-800/90 dark:hover:shadow-[0_8px_20px_rgba(6,182,212,0.2)]">
      <div className="relative flex size-8 items-center justify-center rounded-xl bg-slate-100/80 p-1.5 transition-transform duration-300 group-hover:scale-110 dark:bg-white/5">
        <TechIcon name={name} size={22} className="shrink-0" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
            {name}
          </span>
          {detail?.metrics ? (
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
              {detail.metrics}
            </span>
          ) : null}
        </div>
        {detail?.tagline ? (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[140px]">
            {detail.tagline}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const track1 = [...FIRST_HALF, ...FIRST_HALF, ...FIRST_HALF];
  const track2 = [...SECOND_HALF, ...SECOND_HALF, ...SECOND_HALF];

  return (
    <div className="relative w-full overflow-hidden space-y-4 py-2">
      {/* Top Track (Left Scroll) */}
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-track flex gap-4 items-center">
          {track1.map((tech, index) => (
            <TechItem key={`t1-${tech}-${index}`} name={tech} />
          ))}
        </div>
      </div>

      {/* Bottom Track (Right Scroll Reverse) */}
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-track-reverse flex gap-4 items-center">
          {track2.map((tech, index) => (
            <TechItem key={`t2-${tech}-${index}`} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}
