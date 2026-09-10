"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Subtle brand-inspired cyan path that traces across a section */
export function BrandPathLine({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <motion.path
          d="M0,100 C200,40 400,160 600,100 S1000,40 1200,100"
          fill="none"
          stroke="var(--brand-cyan)"
          strokeWidth="1"
          strokeOpacity="0.25"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          r="3"
          fill="var(--brand-cyan)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        >
          <animateMotion dur="2.5s" repeatCount="1" path="M0,100 C200,40 400,160 600,100 S1000,40 1200,100" />
        </motion.circle>
      </svg>
    </div>
  );
}
