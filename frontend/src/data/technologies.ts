export interface TechItemData {
  name: string;
  category: string;
  tagline: string;
  description: string;
  metrics: string;
  tags: string[];
  featured?: boolean;
}

export interface TechCategory {
  name: string;
  description: string;
  iconName?: string;
  items: string[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    name: "Frontend & UI",
    description: "Ultra-fast rendering architectures with pixel-perfect responsive micro-interactions.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend & Systems",
    description: "High-throughput microservices, concurrent APIs, and real-time event streaming pipelines.",
    items: ["Node.js", "Python", "REST APIs", "GraphQL", "Prisma"],
  },
  {
    name: "AI & Machine Learning",
    description: "Enterprise LLM agents, vector semantic embeddings, and computer vision pipelines.",
    items: ["OpenAI", "TensorFlow", "LangChain", "Computer Vision"],
  },
  {
    name: "Cloud & DevOps",
    description: "Zero-downtime automated CI/CD pipelines, multi-region container orchestration.",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "Vercel", "CI/CD", "Monitoring"],
  },
  {
    name: "Databases & Cache",
    description: "Distributed ACID databases, in-memory caching, and sub-millisecond query execution.",
    items: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    name: "Mobile Platforms",
    description: "Native-grade cross-platform iOS & Android engineering with offline-first synchronicity.",
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
];

export const TECH_DETAILS: TechItemData[] = [
  {
    name: "Next.js",
    category: "Frontend & UI",
    tagline: "React Framework for the Web",
    description: "Server-side rendering, streaming SSR, ISR, and Edge Middleware providing sub-second TTFB globally.",
    metrics: "< 50ms Edge TTFB",
    tags: ["SSR / SSG", "Edge Runtime", "App Router"],
    featured: true,
  },
  {
    name: "React",
    category: "Frontend & UI",
    tagline: "Component Architecture",
    description: "Declarative component ecosystems with concurrent rendering and optimized virtual DOM diffing.",
    metrics: "100% Component Driven",
    tags: ["React 19", "Concurrent Mode", "Hooks"],
    featured: true,
  },
  {
    name: "TypeScript",
    category: "Frontend & UI",
    tagline: "Type-Safe JavaScript",
    description: "Strict end-to-end static type safety preventing runtime faults across frontend and backend boundaries.",
    metrics: "0 Runtime Type Mismatches",
    tags: ["Strict Typing", "Generics", "AST"],
    featured: true,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend & UI",
    tagline: "Utility-First CSS Engine",
    description: "JIT-compiled atomic design tokens with zero CSS runtime overhead and flawless responsive breakpoints.",
    metrics: "Zero Runtime Overhead",
    tags: ["Tailwind v4", "JIT Engine", "Design Systems"],
  },
  {
    name: "Framer Motion",
    category: "Frontend & UI",
    tagline: "Physics-Based Animations",
    description: "Spring-physics gestures, smooth layout shifts, and 60fps hardware-accelerated fluid transitions.",
    metrics: "60 FPS Transitions",
    tags: ["Spring Physics", "Layout Shift", "Gestures"],
  },
  {
    name: "Node.js",
    category: "Backend & Systems",
    tagline: "Event-Driven Asynchronous Engine",
    description: "Non-blocking event-driven I/O built on V8 engine, handling tens of thousands of concurrent client sockets.",
    metrics: "50k+ Concurrent Conns",
    tags: ["V8 Engine", "Async I/O", "Microservices"],
    featured: true,
  },
  {
    name: "Python",
    category: "Backend & Systems",
    tagline: "Data Science & AI Backend",
    description: "High-performance data manipulation, asynchronous FastAPI services, and seamless ML library integration.",
    metrics: "FastAPI Async QPS",
    tags: ["FastAPI", "Pandas", "NumPy"],
    featured: true,
  },
  {
    name: "GraphQL",
    category: "Backend & Systems",
    tagline: "Declarative Data Querying",
    description: "Predictable API query layers eliminating over-fetching with unified schema stitching and Apollo Federation.",
    metrics: "Zero Over-fetching",
    tags: ["Apollo", "Federation", "Type Schema"],
  },
  {
    name: "Prisma",
    category: "Backend & Systems",
    tagline: "Next-Generation ORM",
    description: "Auto-generated type-safe database client with declarative schema migrations and connection pooling.",
    metrics: "100% Type-Safe ORM",
    tags: ["Migrations", "Connection Pool", "Schema Driven"],
  },
  {
    name: "PostgreSQL",
    category: "Databases & Cache",
    tagline: "Enterprise Relational Database",
    description: "ACID-compliant relational engine with advanced JSON indexing, full-text search, and horizontal read replicas.",
    metrics: "99.999% Reliability",
    tags: ["ACID Compliance", "pgvector", "JSONB Indexing"],
    featured: true,
  },
  {
    name: "MongoDB",
    category: "Databases & Cache",
    tagline: "Flexible Document Store",
    description: "High-volume polymorphic document store with automatic sharding and aggregation pipelines.",
    metrics: "Auto Sharded Clusters",
    tags: ["Document Model", "Atlas", "Aggregation"],
  },
  {
    name: "Redis",
    category: "Databases & Cache",
    tagline: "In-Memory Data Grid",
    description: "Ultra-low-latency in-memory cache, pub/sub bus, and rate-limiting store with sub-millisecond responses.",
    metrics: "< 1ms Latency",
    tags: ["In-Memory", "Pub/Sub", "Distributed Lock"],
    featured: true,
  },
  {
    name: "OpenAI",
    category: "AI & Machine Learning",
    tagline: "State-of-the-Art LLM Integration",
    description: "GPT-4o multimodal reasoning, function calling, tool use, and structured JSON generation pipelines.",
    metrics: "GPT-4o Vision & Audio",
    tags: ["RAG Pipelines", "Function Calling", "Embeddings"],
    featured: true,
  },
  {
    name: "LangChain",
    category: "AI & Machine Learning",
    tagline: "Agentic Orchestration Framework",
    description: "Autonomous reasoning agent loops, memory management, vector retrieval, and prompt sequencing.",
    metrics: "Multi-Agent Workflows",
    tags: ["LangGraph", "Vector Store", "Agents"],
    featured: true,
  },
  {
    name: "TensorFlow",
    category: "AI & Machine Learning",
    tagline: "End-to-End ML Infrastructure",
    description: "Custom neural network training, inference optimization, edge deployment with TensorRT and TFLite.",
    metrics: "GPU Accelerated",
    tags: ["Neural Nets", "TFLite", "ONNX"],
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    tagline: "Containerization Standard",
    description: "Reproducible container runtimes ensuring environment parity from local development to production cluster.",
    metrics: "Deterministic Builds",
    tags: ["Containerization", "Multi-stage", "Isolation"],
    featured: true,
  },
  {
    name: "Kubernetes",
    category: "Cloud & DevOps",
    tagline: "Production Grade Orchestration",
    description: "Automated container deployment, autoscaling, self-healing nodes, and declarative Helm management.",
    metrics: "Auto-Scaling Nodes",
    tags: ["K8s Cluster", "Helm", "Service Mesh"],
    featured: true,
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    tagline: "Global Cloud Ecosystem",
    description: "Resilient multi-AZ architectures across ECS, EKS, Lambda, S3, RDS, CloudFront, and Route 53.",
    metrics: "Multi-AZ High Availability",
    tags: ["Lambda", "S3", "CloudFront", "RDS"],
    featured: true,
  },
  {
    name: "GitHub Actions",
    category: "Cloud & DevOps",
    tagline: "Automated CI/CD Workflows",
    description: "Continuous integration pipelines testing every commit, linting, building, and deploying in minutes.",
    metrics: "< 3min Deploy Loop",
    tags: ["Automated Tests", "Security Scans", "CD Deploy"],
  },
  {
    name: "React Native",
    category: "Mobile Platforms",
    tagline: "Native Mobile with React",
    description: "Cross-platform mobile apps with native UI components, Hermes JS engine, and high performance.",
    metrics: "iOS & Android Parity",
    tags: ["Hermes Engine", "Native Modules", "TurboModules"],
  },
  {
    name: "Flutter",
    category: "Mobile Platforms",
    tagline: "High-Performance Mobile UI",
    description: "Compiles to native ARM machine code with Impeller graphics engine for flawless 120Hz mobile experiences.",
    metrics: "120 FPS Rendering",
    tags: ["Dart", "Impeller", "Material 3"],
  },
];
