import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Globe,
  Layers,
  Palette,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Modern, performant web applications and platforms built with React, Next.js and scalable architectures.",
  },
  {
    id: "software",
    icon: Code2,
    title: "Software Development",
    description: "Custom software solutions tailored to your business — from MVPs to enterprise-grade systems.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps with polished UX and reliable performance.",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with usability and brand consistency.",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description: "Intelligent products powered by AI — automation, analytics, and smart decision systems.",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud-native infrastructure, deployment pipelines, and scalable hosting strategies.",
  },
  {
    id: "database",
    icon: Database,
    title: "Database Solutions",
    description: "Robust data architecture, optimization, and migration for high-availability systems.",
  },
  {
    id: "devops",
    icon: Server,
    title: "DevOps",
    description: "CI/CD, containerization, monitoring, and infrastructure automation for reliable delivery.",
  },
  {
    id: "consulting",
    icon: Wrench,
    title: "IT Consulting",
    description: "Technology strategy, architecture reviews, and guidance to align tech with business goals.",
  },
];

export const WHY_US = [
  {
    id: "modern",
    icon: Layers,
    title: "Modern Technology",
    description: "We use proven, cutting-edge stacks to build products that stay relevant and maintainable.",
  },
  {
    id: "scale",
    icon: Server,
    title: "Scalable Architecture",
    description: "Systems designed to grow with your business — from startup to enterprise scale.",
  },
  {
    id: "design",
    icon: Palette,
    title: "User-Focused Design",
    description: "Every interface is crafted for clarity, accessibility, and meaningful user experiences.",
  },
  {
    id: "reliable",
    icon: Code2,
    title: "Reliable Development",
    description: "Clean code, thorough testing, and disciplined engineering practices you can trust.",
  },
  {
    id: "communication",
    icon: Globe,
    title: "Transparent Communication",
    description: "Regular updates, clear timelines, and honest collaboration throughout every project.",
  },
  {
    id: "support",
    icon: Wrench,
    title: "Long-Term Support",
    description: "We stay with you after launch — maintenance, updates, and continuous improvement.",
  },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand your goals, users, and technical requirements." },
  { step: "02", title: "Plan", description: "Define scope, architecture, timeline, and success metrics." },
  { step: "03", title: "Design", description: "Create wireframes, prototypes, and visual systems." },
  { step: "04", title: "Develop", description: "Build with agile sprints, code reviews, and quality gates." },
  { step: "05", title: "Test", description: "Rigorous QA, performance testing, and user validation." },
  { step: "06", title: "Launch", description: "Deploy, monitor, and ensure a smooth go-live." },
  { step: "07", title: "Scale", description: "Optimize, iterate, and grow your product over time." },
];

export const TECHNOLOGIES = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "SQLite", "MongoDB", "Redis"],
  },
  {
    category: "Cloud",
    items: ["AWS", "Vercel", "Docker", "Kubernetes"],
  },
  {
    category: "AI/ML",
    items: ["OpenAI", "TensorFlow", "LangChain", "Computer Vision"],
  },
  {
    category: "DevOps",
    items: ["GitHub Actions", "CI/CD", "Nginx", "Monitoring"],
  },
];
