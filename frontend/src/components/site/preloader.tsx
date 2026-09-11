"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Activity, Sparkles } from "lucide-react";
import { SiteLogo } from "@/components/site/site-logo";

const STATUS_MESSAGES = [
  "Bootstrapping Edge Network & CDN...",
  "Calibrating Zero-Trust Security Policies...",
  "Synchronizing Distributed Microservices...",
  "ULTRABULB IT Architecture Online.",
];

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = React.useState<number>(0);
  const [statusIndex, setStatusIndex] = React.useState<number>(0);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Smooth high-tech incrementing timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 250);
          return 100;
        }

        // Variable acceleration curve for organic tech feel
        const increment = prev < 30 ? 4 : prev < 70 ? 7 : prev < 90 ? 5 : 8;
        const next = Math.min(prev + increment, 100);

        if (next >= 75) setStatusIndex(3);
        else if (next >= 50) setStatusIndex(2);
        else if (next >= 25) setStatusIndex(1);
        else setStatusIndex(0);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        >
          {/* Ambient Cyber Grid & Glow Orbs */}
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
          <div className="pointer-events-none absolute size-[500px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" />
          <div className="pointer-events-none absolute size-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

          {/* Central Logo HUD */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing & Rotating Neon Rings */}
            <div className="relative flex size-32 sm:size-36 items-center justify-center">
              {/* Outer Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
              />

              {/* Inner Pulsing Ring with Gradient Rim */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-2 rounded-full border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              />

              {/* Center Glowing Logo Card */}
              <div className="relative flex size-20 sm:size-24 items-center justify-center rounded-2xl bg-slate-900/90 p-3 shadow-2xl border border-white/10 backdrop-blur-xl">
                <SiteLogo className="size-full object-contain" />
              </div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-center"
            >
              <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white">
                ULTRABULB <span className="text-cyan-400">IT</span>
              </h1>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-cyan-400/80">
                Enterprise Engineering Systems
              </p>
            </motion.div>

            {/* Progress Bar & Telemetry HUD */}
            <div className="mt-8 w-64 sm:w-80">
              {/* Telemetry Status Line */}
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Activity className="size-3 animate-pulse text-cyan-400" />
                  <span>{progress < 100 ? "INITIALIZING" : "SYSTEM READY"}</span>
                </span>
                <span className="font-bold text-cyan-400">{progress}%</span>
              </div>

              {/* High-Tech Progress Track */}
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800 border border-white/10 p-[1px]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Dynamic Status Message */}
              <div className="mt-3 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[11px] text-slate-400"
                  >
                    {STATUS_MESSAGES[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Security & SLA Pill */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-mono text-slate-500">
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>99.999% SLA</span>
            <span>•</span>
            <span>Zero-Trust Architecture</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
