"use client";

import { TECH_CATEGORIES } from "@/data/technologies";

const ALL_TECHS = Array.from(new Set(TECH_CATEGORIES.flatMap((category) => category.items)));

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
  React: "#61DAFB", "Next.js": "#ffffff", TypeScript: "#3178C6", "Tailwind CSS": "#06B6D4", "Framer Motion": "#0055FF",
  "Node.js": "#83CD29", Python: "#3776AB", GraphQL: "#E10098", Prisma: "#5A67D8", "React Native": "#61DAFB", Flutter: "#54C5F8",
  PostgreSQL: "#4169E1", SQLite: "#44A8D8", MongoDB: "#47A248", Redis: "#DC382D", AWS: "#FF9900", Azure: "#0078D4", Docker: "#2496ED",
  Vercel: "#ffffff", OpenAI: "#10A37F", TensorFlow: "#FF6F00", LangChain: "#1C3C3C", Kubernetes: "#326CE5", "GitHub Actions": "#2088FF",
};

function TechMark({ name }: { name: string }) {
  const slug = ICON_SLUGS[name];
  if (!slug) return <span className="tech-marquee-wordmark">{name}</span>;

  return (
    <span className="tech-marquee-mark" title={name}>
      <span
        aria-hidden="true"
        className="tech-marquee-mark-icon"
        style={{
          backgroundColor: ICON_COLORS[name] ?? "#ffffff",
          maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg)`,
          WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg)`,
        }}
      />
      <span>{name}</span>
    </span>
  );
}

export function TechMarquee() {
  const track = [...ALL_TECHS, ...ALL_TECHS];

  return (
    <section aria-label="Technology we use" className="tech-marquee-section">
      <div className="tech-marquee-heading" aria-hidden="true">
        <span>Technology</span>
        <span>We Use</span>
      </div>
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-track">
          {track.map((technology, index) => (
            <div className="tech-marquee-item" key={`${technology}-${index}`}>
              <TechMark name={technology} />
            </div>
          ))}
        </div>
      </div>
      <p className="tech-marquee-caption">A considered toolkit for building resilient digital products.</p>
    </section>
  );
}
