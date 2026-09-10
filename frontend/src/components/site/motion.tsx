"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

/* ── Shared easing & springs ── */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 380, damping: 28 };
export const SPRING_SMOOTH = { type: "spring" as const, stiffness: 120, damping: 18 };
export const SPRING_BOUNCY = { type: "spring" as const, stiffness: 260, damping: 20 };

/* ── Reusable variants ── */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING_SMOOTH },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: SPRING_SMOOTH },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};

export const lineExpand: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.15 } },
};

/* ── Section wrapper with scroll reveal ── */
interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
}

export function MotionSection({ children, delay = 0, className, ...props }: MotionSectionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

/* ── Floating ambient orbs (hero backgrounds) ── */
export function FloatingOrbs() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const orbs = [
    { size: 280, x: "75%", y: "15%", delay: 0, duration: 14 },
    { size: 180, x: "10%", y: "70%", delay: 2, duration: 18 },
    { size: 120, x: "55%", y: "80%", delay: 4, duration: 12 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-(--brand-cyan)/10 blur-3xl dark:bg-(--brand-cyan)/15"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{
            y: [0, -24, 0, 18, 0],
            x: [0, 12, 0, -8, 0],
            scale: [1, 1.08, 1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Word-by-word text reveal ── */
export function TextReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: 40 },
            show: { opacity: 1, y: 0, rotateX: 0, transition: SPRING_SNAPPY },
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* ── 3D tilt card on mouse move ── */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), SPRING_SNAPPY);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), SPRING_SNAPPY);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduced ? { y: -4 } : { scale: 1.02 }}
      transition={SPRING_BOUNCY}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Hover lift with glow ── */
export function HoverLift({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -6, transition: SPRING_BOUNCY }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className={className}
    >
      {glow ? (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(26,188,207,0.12), transparent 40%)",
          }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}

/* ── Animated underline for nav links ── */
export function NavLinkMotion({
  children,
  className,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <motion.span className={`relative ${className ?? ""}`} whileHover="hover" animate={active ? "active" : "initial"}>
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-(--brand-cyan)"
        variants={{ hover: { scaleX: 1 }, active: { scaleX: 1 }, initial: { scaleX: 0 } }}
        initial="initial"
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
    </motion.span>
  );
}

/* ── Stagger grid wrapper ── */
export function StaggerGrid({
  children,
  className,
  fast = false,
}: {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}) {
  return (
    <motion.div
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Count-up hook helper export ── */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { once: false, margin: "-20%" });
  return inView;
}
