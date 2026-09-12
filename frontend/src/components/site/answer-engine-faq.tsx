"use client";

import { HelpCircle, Mail, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    question: "What does ULTRABULB IT do?",
    answer:
      "ULTRABULB IT designs and builds enterprise software, websites, mobile applications, AI systems, cloud infrastructure, and digital products for startups and growing companies.",
  },
  {
    question: "Where is ULTRABULB IT based?",
    answer:
      "ULTRABULB IT is based in Sylhet, Bangladesh and works with clients globally.",
  },
  {
    question: "Which services does ULTRABULB IT offer?",
    answer:
      "ULTRABULB IT offers web platform engineering, enterprise AI and LLM systems, mobile app development, cloud infrastructure, DevOps, data systems, UI/UX design, and technology consulting.",
  },
  {
    question: "How can clients contact ULTRABULB IT?",
    answer:
      "Clients can email contact@ultrabulbit.com or schedule a discovery call through the website.",
  },
];

export function AnswerEngineFAQ() {
  return (
    <section
      id="answers"
      aria-labelledby="answers-title"
      className="relative overflow-hidden bg-white py-16 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 dark:bg-grid-dark dark:opacity-15" />
      <div className="site-container relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
              <HelpCircle className="size-3.5" />
              Direct Answers
            </div>
            <h2 id="answers-title" className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Clear facts for search and AI assistants
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Quick, citation-friendly answers about ULTRABULB IT, our services, location, and contact paths.
            </p>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="size-4 text-cyan-600 dark:text-cyan-400" />
                <span>Sylhet, Bangladesh. Serving global clients.</span>
              </div>
              <Link
                href="/contact"
                className="flex items-center gap-2 font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300"
              >
                <Mail className="size-4" />
                <span>contact@ultrabulbit.com</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:col-span-8">
            {FAQ_ITEMS.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold leading-snug text-slate-950 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
