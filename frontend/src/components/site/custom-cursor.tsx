"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { useTilt3D } from "@/lib/animations/scroll";

type CursorMode = "default" | "view" | "explore";

export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const [mode, setMode] = React.useState<CursorMode>("default");
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-active");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const project = target.closest("[data-cursor='view']");
      const explore = target.closest("[data-cursor='explore']");
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      if (project) setMode("view");
      else if (explore) setMode("explore");
      else if (interactive) setMode("default");
      else setMode("default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  const expanded = mode === "view" || mode === "explore";

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--brand-cyan) md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-(--brand-cyan)/60 transition-[width,height] duration-300 md:flex ${expanded ? "size-16 bg-(--brand-cyan)/10" : "size-8"}`}
        aria-hidden
      >
        {expanded && (
          <span ref={labelRef} className="text-[10px] font-bold uppercase tracking-wider text-(--brand-cyan)">
            {mode === "view" ? "View" : "Explore"}
          </span>
        )}
      </div>
    </>
  );
}
