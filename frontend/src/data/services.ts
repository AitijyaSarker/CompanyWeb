import { Code2, Cloud, BrainCircuit, Palette, Smartphone, Database, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Modern, performant web applications built with React, Next.js and cutting-edge frontend stacks.",
  },
  {
    icon: Server,
    title: "Software Development",
    description: "Custom software systems engineered for reliability, scalability and long-term maintainability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver seamless experiences on every device.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with usability and brand consistency.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by modern AI — from automation to predictive analytics.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud-native architecture, deployment pipelines and infrastructure that scales with your business.",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Robust data architecture, optimization and management for high-performance applications.",
  },
  {
    icon: Wrench,
    title: "IT Consulting",
    description: "Strategic technology guidance to help teams make confident, future-proof decisions.",
  },
];
