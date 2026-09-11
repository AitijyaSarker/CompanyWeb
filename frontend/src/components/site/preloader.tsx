"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import { SiteLogo } from "@/components/site/site-logo";

const BRAND_NAME = "ULTRABULB IT";
const LETTERS = BRAND_NAME.split("");

const TELEMETRY_PHASES = [
  "Bootstrapping Edge Network & CDN...",
  "Calibrating Zero-Trust Security Gates...",
  "Synchronizing Distributed Microservices...",
  "ULTRABULB IT Architecture Ready.",
];

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = React.useState<number>(0);
  const [phaseIndex, setPhaseIndex] = React.useState<number>(0);
  const [isDoorOpen, setIsDoorOpen] = React.useState<boolean>(false);
  const [isUnmounted, setIsUnmounted] = React.useState<boolean>(false);

  // High-precision smooth progress increment
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Trigger the cinematic door opening after writing completes
          setTimeout(() => {
            setIsDoorOpen(true);
          }, 300);

          // Complete and unmount after doors finish sliding open
          setTimeout(() => {
            setIsUnmounted(true);
            onComplete?.();
          }, 1100);

          return 100;
        }

        // Natural tech progression curve
        const step = prev < 25 ? 3 : prev < 60 ? 5 : prev < 88 ? 4 : 6;
        const next = Math.min(prev + step, 100);

        if (next >= 85) setPhaseIndex(3);
        else if (next >= 55) setPhaseIndex(2);
        else if (next >= 25) setPhaseIndex(1);
        else setPhaseIndex(0);

        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isUnmounted) return null;

  // Calculate how many characters of "ULTRABULB IT" have been written
  const revealedCount = Math.floor((progress / 100) * LETTERS.length);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[999999] pointer-events-auto flex h-screen w-screen overflow-hidden select-none"
    >
      {/* ================= LEFT DOOR PANEL ================= */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isDoorOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="relative h-full w-1/2 bg-slate-950 border-r border-cyan-500/30 overflow-hidden shadow-[25px_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Ambient Grid & Glow Accent */}
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        
        {/* Door Mechanical Seam & Bevel Details */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
      </motion.div>

      {/* ================= RIGHT DOOR PANEL ================= */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isDoorOpen ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="relative h-full w-1/2 bg-slate-950 border-l border-cyan-500/30 overflow-hidden shadow-[-25px_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Ambient Grid & Glow Accent */}
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
        <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 size-96 rounded-full bg-blue-600/10 blur-[120px]" />
        
        {/* Door Mechanical Seam & Bevel Details */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
      </motion.div>

      {/* ================= CENTER WRITING & HUD STAGE ================= */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isDoorOpen ? 0 : 1,
          scale: isDoorOpen ? 0.95 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-4"
      >
        {/* Glowing Central Emblem HUD */}
        <div className="relative mb-6 flex size-24 sm:size-28 items-center justify-center">
          {/* Animated Tech Orbits */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-full border border-cyan-400/20 shadow-[0_0_35px_rgba(6,182,212,0.4)]"
          />

          {/* Logo Card */}
          <div className="relative flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-slate-900/95 p-3 shadow-2xl border border-white/15 backdrop-blur-2xl">
            <SiteLogo className="size-full object-contain" />
          </div>
        </div>

        {/* ================= HIGH-TECH WRITING REVEAL ================= */}
        <div className="relative flex items-center justify-center overflow-hidden py-2 px-4">
          <div className="flex items-center tracking-widest text-3xl sm:text-5xl lg:text-6xl font-black">
            {LETTERS.map((char, index) => {
              const isRevealed = index < revealedCount;
              const isCurrent = index === revealedCount && progress < 100;

              if (char === " ") {
                return <span key={`space-${index}`} className="w-3 sm:w-5 inline-block" />;
              }

              return (
                <span key={`char-${char}-${index}`} className="relative inline-block transition-all duration-150">
                  <span
                    className={
                      isRevealed
                        ? index >= 9
                          ? "bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                          : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "text-slate-800 opacity-20"
                    }
                  >
                    {char}
                  </span>

                  {/* Active Laser Spark on current letter being written */}
                  {isCurrent && (
                    <motion.span
                      layoutId="laser-pen"
                      className="absolute -right-1 top-0 bottom-0 w-[3px] bg-cyan-400 shadow-[0_0_12px_#06b6d4] animate-pulse"
                    />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 15 ? 1 : 0 }}
          className="mt-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400/90"
        >
          Enterprise Engineering Systems
        </motion.p>

        {/* Progress Telemetry Bar */}
        <div className="mt-8 w-full max-w-xs sm:max-w-md px-4">
          {/* Top Status Line */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-2 text-cyan-300">
              <Activity className="size-3.5 animate-pulse text-cyan-400" />
              <span>{progress < 100 ? "INITIALIZING" : "SYSTEM READY"}</span>
            </span>
            <span className="font-bold text-cyan-400 font-mono text-sm">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-white/10 p-[1px]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 shadow-[0_0_18px_rgba(6,182,212,0.9)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          {/* Dynamic Status Phase Message */}
          <div className="mt-3 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phaseIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs text-slate-400"
              >
                {TELEMETRY_PHASES[phaseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="absolute bottom-6 flex items-center gap-4 text-[10px] font-mono text-slate-500">
          <span>SOC2 Ready</span>
          <span>•</span>
          <span>99.999% SLA</span>
          <span>•</span>
          <span>Zero-Trust Gate</span>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * World-Class Route Transition Top Laser Bar
 */
export function RouteProgressBar({ isRouting }: { isRouting?: boolean }) {
  return (
    <AnimatePresence>
      {isRouting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-x-0 top-0 z-[9999] h-[3px] bg-slate-900/20"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "65%", "90%", "100%"] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
