export interface TechCategory {
  name: string;
  items: string[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Python", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    name: "Mobile",
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    name: "Database",
    items: ["PostgreSQL", "SQLite", "MongoDB", "Redis"],
  },
  {
    name: "Cloud",
    items: ["AWS", "Azure", "Docker", "Vercel"],
  },
  {
    name: "AI/ML",
    items: ["OpenAI", "TensorFlow", "LangChain", "Computer Vision"],
  },
  {
    name: "DevOps",
    items: ["CI/CD", "GitHub Actions", "Kubernetes", "Monitoring"],
  },
];
