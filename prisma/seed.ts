import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth";

async function main() {
  console.log("🌱 Seeding ULTRABULB IT database...");

  // ---- Default admin ----
  const existingAdmin = await db.adminUser.findFirst();
  if (!existingAdmin) {
    await db.adminUser.create({
      data: {
        email: "admin@ultrabulb.com",
        passwordHash: hashPassword("admin123"),
        name: "ULTRABULB Admin",
      },
    });
    console.log("  ✓ Created default admin (admin@ultrabulb.com / admin123)");
  } else {
    console.log("  • Admin already exists, skipping");
  }

  // ---- Site content (key/value) — every editable text on the site ----
  const content: Record<string, string> = {
    // Nav
    nav_brand: "ULTRABULB IT",
    nav_tagline: "WE CODE YOUR IDEAS INTO LIGHT",

    // Hero
    hero_badge: "Software Development Agency",
    hero_title: "We Code Your Ideas Into Light",
    hero_subtitle:
      "ULTRABULB IT is a full-cycle software development agency building custom software, cloud platforms, AI products and digital experiences that power businesses across the globe.",
    hero_cta_primary: "Explore Our Work",
    hero_cta_secondary: "Schedule a Call",

    // Stats
    stats_label: "The positive force behind growing digital businesses",
    stat_projects_value: "120+",
    stat_projects_label: "Projects Delivered",
    stat_clients_value: "45+",
    stat_clients_label: "Happy Clients",
    stat_countries_value: "18",
    stat_countries_label: "Countries Served",
    stat_uptime_value: "99.9%",
    stat_uptime_label: "Average Uptime",

    // About
    about_badge: "About Us",
    about_title: "What is ULTRABULB IT?",
    about_description:
      "ULTRABULB IT is a software development agency founded with one belief — every great idea deserves to be engineered into a product people love. From startups to enterprises, we partner with teams to design, build, scale and maintain digital products that create real business value. Our engineers, designers and strategists work as an extension of your team, shipping fast without cutting corners.",
    about_vision_title: "Our Vision",
    about_vision_text:
      "To become the most trusted technology partner for ambitious teams worldwide — illuminating the path from raw idea to market-leading product through engineering excellence and genuine partnership.",
    about_mission_title: "Our Mission",
    about_mission_text:
      "To deliver reliable, scalable and beautiful software that solves real problems — while treating every client's product, timeline and budget as if it were our own.",
    about_field_title: "Our Field of Work",
    about_field_text:
      "We operate across the full software lifecycle — product strategy, UI/UX design, web & mobile engineering, cloud & DevOps, AI & data, QA and long-term maintenance.",

    // Field of work cards (stored as JSON)
    fields: JSON.stringify([
      { icon: "Code2", title: "Custom Software", desc: "Tailored web & mobile applications built to fit your exact business processes." },
      { icon: "Cloud", title: "Cloud & DevOps", desc: "Scalable cloud architecture, CI/CD pipelines, infrastructure as code and 24/7 monitoring." },
      { icon: "BrainCircuit", title: "AI & Data", desc: "Machine learning, LLM integrations, data pipelines and intelligent automation." },
      { icon: "Palette", title: "Product Design", desc: "User research, UX flows and pixel-perfect UI that turns first-time users into fans." },
      { icon: "ShieldCheck", title: "QA & Security", desc: "Automated testing, security audits and compliance reviews so you ship with confidence." },
      { icon: "Rocket", title: "Staff Augmentation", desc: "Embed vetted senior engineers into your team to move faster without hiring overhead." },
    ]),

    // Products
    products_badge: "Our Work",
    products_title: "Products & Projects We've Built",
    products_subtitle:
      "A selection of platforms, apps and systems we've engineered for clients across industries.",

    // Career
    career_badge: "Careers",
    career_title: "Build Your Career at ULTRABULB IT",
    career_subtitle:
      "We hire for curiosity, craftsmanship and character. Here's how we work and what we look for.",
    career_how_we_hire: JSON.stringify([
      { title: "Apply", desc: "Send your CV or portfolio through the contact form or a vacancy listing." },
      { title: "Intro Call", desc: "A friendly 30-minute conversation to understand your story and goals." },
      { title: "Technical Round", desc: "A practical task or pair-programming session relevant to the role." },
      { title: "Culture Fit", desc: "Meet the team and make sure we're a great match for each other." },
      { title: "Offer", desc: "We move fast — most candidates receive an offer within two weeks." },
    ]),
    career_what_we_need: JSON.stringify([
      "Strong fundamentals in at least one modern language or framework",
      "Ownership mindset — you care about the product, not just the ticket",
      "Clear, kind communication in English",
      "Curiosity and a habit of learning continuously",
      "Experience working in agile, remote-first teams",
    ]),
    career_vision_text:
      "We believe great software is built by people who feel trusted, well-rested and genuinely excited about what they make. Our vision is a workplace where engineers grow into leaders.",
    career_mission_text:
      "To create meaningful engineering careers by giving people hard problems, real autonomy and the support to solve them well.",
    career_no_hiring_note:
      "We're always looking for exceptional talent. Even if no role fits, send us your portfolio — we hire when the right person appears.",

    // Gallery
    gallery_badge: "Gallery",
    gallery_title: "Snapshots From Our Journey",
    gallery_subtitle:
      "Moments from our office, events, hackathons and the people who make ULTRABULB IT.",

    // Reviews & Awards
    reviews_badge: "Reviews & Awards",
    reviews_title: "What Clients Say & What We've Achieved",
    reviews_subtitle:
      "Honest words from the people we've worked with, alongside the recognition we've earned.",
    review_form_title: "Submit Your Review",
    review_form_subtitle:
      "Share your experience working with ULTRABULB IT. Reviews are published after approval.",
    awards_title: "Awards & Recognition",

    // Contact
    contact_badge: "Contact",
    contact_title: "Let's Build Something Bright Together",
    contact_subtitle:
      "Have a project in mind, a question, or just want to say hello? We usually reply within one business day.",
    contact_email: "hello@ultrabulb.com",
    contact_phone: "+880 1700-000000",
    contact_address: "Floor 6, Tech Tower, Banani, Dhaka 1213, Bangladesh",
    contact_map_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.8!2d90.4023!3d23.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM3LjMiTiA5MMKwMjQnMDguMyJF!5e0!3m2!1sen!2sbd!4v1700000000000",

    // Schedule
    schedule_badge: "Schedule a Call",
    schedule_title: "Book a Call With Us",
    schedule_subtitle:
      "Pick a date and time that works for you. We'll send a calendar invite and a meeting link to your email.",
    schedule_topics: JSON.stringify([
      "New project enquiry",
      "Partnership / collaboration",
      "Career opportunity",
      "Technical consultation",
      "General question",
    ]),

    // Footer
    footer_tagline: "A software development agency crafting digital products that create real business value.",
    footer_email: "hello@ultrabulb.com",
    footer_phone: "+880 1700-000000",
    footer_address: "Floor 6, Tech Tower, Banani, Dhaka 1213, Bangladesh",
    footer_social_facebook: "https://facebook.com",
    footer_social_linkedin: "https://linkedin.com",
    footer_social_twitter: "https://twitter.com",
    footer_social_github: "https://github.com",
    footer_copyright: "ULTRABULB IT. All rights reserved.",
  };

  for (const [key, value] of Object.entries(content)) {
    await db.siteContent.upsert({
      where: { id: key },
      update: { value },
      create: { id: key, value },
    });
  }
  console.log(`  ✓ Seeded ${Object.keys(content).length} site content entries`);

  // ---- Products ----
  const productCount = await db.product.count();
  if (productCount === 0) {
    await db.product.createMany({
      data: [
        { title: "Nexus LMS", description: "A modern learning management system serving 80k+ students with live classes, assessments and analytics.", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", category: "Education", tags: "Next.js,Postgres,AWS", featured: true, order: 0 },
        { title: "MediTrack", description: "Hospital management platform handling appointments, records and billing for 30+ clinics.", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", category: "Healthcare", tags: "React,Node,MongoDB", featured: true, order: 1 },
        { title: "ShopWave", description: "Headless e-commerce engine powering a fashion brand with 2M+ annual orders.", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", category: "E-commerce", tags: "Next.js,Stripe,Redis", featured: true, order: 2 },
        { title: "FinPilot AI", description: "AI-powered personal finance assistant with transaction insights and budgeting.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", category: "Fintech", tags: "Python,LLM,React", order: 3 },
        { title: "FieldOps", description: "Field-service management app with offline sync for 500+ technicians.", imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", category: "Logistics", tags: "React Native,GraphQL", order: 4 },
        { title: "StreamLive", description: "Low-latency live streaming platform for online events and webinars.", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80", category: "Media", tags: "WebRTC,Go,Kubernetes", order: 5 },
      ],
    });
    console.log("  ✓ Seeded 6 products");
  }

  // ---- Vacancies ----
  const vacancyCount = await db.vacancy.count();
  if (vacancyCount === 0) {
    await db.vacancy.createMany({
      data: [
        { title: "Senior Full-Stack Engineer", department: "Engineering", type: "Full-time", location: "Remote / Dhaka", description: "Lead end-to-end delivery of client products using Next.js, Node and modern cloud tooling.", requirements: "5+ years experience, strong TypeScript, system design, AWS basics.", hiring: true, order: 0 },
        { title: "Product Designer", department: "Design", type: "Full-time", location: "Dhaka (Hybrid)", description: "Own the design of web and mobile products from research to high-fidelity handoff.", requirements: "Portfolio of shipped products, Figma mastery, UX research skills.", hiring: true, order: 1 },
        { title: "DevOps Engineer", department: "Infrastructure", type: "Full-time", location: "Remote", description: "Build and operate scalable, secure infrastructure for client platforms.", requirements: "Kubernetes, Terraform, CI/CD, observability tooling.", hiring: false, order: 2 },
        { title: "AI/ML Engineer", department: "Engineering", type: "Contract", location: "Remote", description: "Design and ship LLM-powered features and data pipelines.", requirements: "Python, PyTorch, experience with RAG/agents, production ML.", hiring: true, order: 3 },
      ],
    });
    console.log("  ✓ Seeded 4 vacancies");
  }

  // ---- Gallery ----
  const galleryCount = await db.galleryImage.count();
  if (galleryCount === 0) {
    await db.galleryImage.createMany({
      data: [
        { title: "Team Hackathon 2024", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", category: "Events", order: 0 },
        { title: "Our Dhaka Office", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", category: "Office", order: 1 },
        { title: "Product Launch Day", imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80", category: "Events", order: 2 },
        { title: "Pair Programming", imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", category: "Office", order: 3 },
        { title: "Annual Retreat", imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80", category: "Events", order: 4 },
        { title: "Design Workshop", imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", category: "Office", order: 5 },
        { title: "Conference Talk", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", category: "Events", order: 6 },
        { title: "Late Night Shipping", imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", category: "Office", order: 7 },
      ],
    });
    console.log("  ✓ Seeded 8 gallery images");
  }

  // ---- Reviews (some approved, some pending) ----
  const reviewCount = await db.review.count();
  if (reviewCount === 0) {
    await db.review.createMany({
      data: [
        { name: "Sarah Mitchell", email: "sarah@example.com", role: "CTO", company: "Nexus Edu", rating: 5, message: "ULTRABULB IT delivered our LMS ahead of schedule and the quality was outstanding. They felt like part of our team.", approved: true, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
        { name: "David Chen", email: "david@example.com", role: "Founder", company: "ShopWave", rating: 5, message: "From design to deployment, the engineering rigor was impressive. Our platform has never been more stable.", approved: true, avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
        { name: "Aisha Rahman", email: "aisha@example.com", role: "Product Lead", company: "MediTrack", rating: 5, message: "They understood our healthcare domain quickly and built something doctors actually love using.", approved: true, avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
        { name: "James Park", email: "james@example.com", role: "VP Engineering", company: "FinPilot", rating: 4, message: "Solid AI integration work. Communication was excellent throughout.", approved: false, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
      ],
    });
    console.log("  ✓ Seeded 4 reviews (3 approved, 1 pending)");
  }

  // ---- Awards ----
  const awardCount = await db.award.count();
  if (awardCount === 0) {
    await db.award.createMany({
      data: [
        { title: "Top Software Agency 2024", description: "Recognized among the top 10 software agencies in South Asia.", imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80", issuer: "TechAsia Awards", year: "2024", order: 0 },
        { title: "Best Fintech Solution", description: "Awarded for innovation in AI-driven personal finance.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80", issuer: "Global Fintech Forum", year: "2023", order: 1 },
        { title: "Excellence in Cloud", description: "For scalable, secure cloud architecture across client platforms.", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", issuer: "CloudWorld Conference", year: "2023", order: 2 },
      ],
    });
    console.log("  ✓ Seeded 3 awards");
  }

  // ---- Time slots ----
  const slotCount = await db.timeSlot.count();
  if (slotCount === 0) {
    await db.timeSlot.createMany({
      data: [
        { label: "09:00 AM — 09:30 AM", value: "09:00", active: true, order: 0 },
        { label: "10:00 AM — 10:30 AM", value: "10:00", active: true, order: 1 },
        { label: "11:00 AM — 11:30 AM", value: "11:00", active: true, order: 2 },
        { label: "02:00 PM — 02:30 PM", value: "14:00", active: true, order: 3 },
        { label: "03:00 PM — 03:30 PM", value: "15:00", active: true, order: 4 },
        { label: "04:00 PM — 04:30 PM", value: "16:00", active: true, order: 5 },
      ],
    });
    console.log("  ✓ Seeded 6 time slots");
  }

  console.log("✅ Seed complete!");
  console.log("   Admin login: admin@ultrabulb.com / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
