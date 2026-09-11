"use client";

import * as React from "react";
import { TECH_CATEGORIES } from "@/data/technologies";

const ALL_TECHS = Array.from(new Set(TECH_CATEGORIES.flatMap((category) => category.items)));
const FIRST_HALF = ALL_TECHS.slice(0, Math.ceil(ALL_TECHS.length / 2));
const SECOND_HALF = ALL_TECHS.slice(Math.ceil(ALL_TECHS.length / 2));

const ICON_SLUGS: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framer",
  "Node.js": "nodedotjs",
  Python: "python",
  GraphQL: "graphql",
  Prisma: "prisma",
  "React Native": "react",
  Flutter: "flutter",
  PostgreSQL: "postgresql",
  SQLite: "sqlite",
  MongoDB: "mongodb",
  Redis: "redis",
  AWS: "amazonaws",
  Azure: "microsoftazure",
  Docker: "docker",
  Vercel: "vercel",
  OpenAI: "openai",
  TensorFlow: "tensorflow",
  LangChain: "langchain",
  Kubernetes: "kubernetes",
  "GitHub Actions": "githubactions",
};

const ICON_COLORS: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#ffffff",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#0055FF",
  "Node.js": "#83CD29",
  Python: "#3776AB",
  GraphQL: "#E10098",
  Prisma: "#5A67D8",
  "React Native": "#61DAFB",
  Flutter: "#54C5F8",
  PostgreSQL: "#4169E1",
  SQLite: "#44A8D8",
  MongoDB: "#47A248",
  Redis: "#DC382D",
  AWS: "#FF9900",
  Azure: "#0078D4",
  Docker: "#2496ED",
  Vercel: "#ffffff",
  OpenAI: "#10A37F",
  TensorFlow: "#FF6F00",
  LangChain: "#1C3C3C",
  Kubernetes: "#326CE5",
  "GitHub Actions": "#2088FF",
};

function TechItem({ name }: { name: string }) {
  const slug = ICON_SLUGS[name];
  return (
    <div className="tech-marquee-item group cursor-default">
      <div className="flex items-center gap-3">
        {slug ? (
          <span
            aria-hidden="true"
            className="size-6 shrink-0 bg-current transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: ICON_COLORS[name] ?? "#06B6D4",
              maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg)`,
              WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg)`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
            }}
          />
        ) : null}
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {name}
        </span>
      </div>
    </div>
  );
}

export function TechMarquee() {
  const track1 = [...FIRST_HALF, ...FIRST_HALF, ...FIRST_HALF];
  const track2 = [...SECOND_HALF, ...SECOND_HALF, ...SECOND_HALF];

  return (
    <div className="relative w-full overflow-hidden space-y-4">
      {/* Top Track (Left Scroll) */}
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-track">
          {track1.map((tech, index) => (
            <TechItem key={`t1-${tech}-${index}`} name={tech} />
          ))}
        </div>
      </div>

      {/* Bottom Track (Right Scroll Reverse) */}
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-track-reverse">
          {track2.map((tech, index) => (
            <TechItem key={`t2-${tech}-${index}`} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}
