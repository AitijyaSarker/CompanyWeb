"use client";

import { gsap, registerGsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export function animateCounter(
  el: HTMLElement,
  end: number,
  suffix = "",
  prefix = ""
) {
  registerGsap();
  if (prefersReducedMotion()) {
    el.textContent = `${prefix}${end}${suffix}`;
    return () => {};
  }

  const obj = { val: 0 };
  const tween = gsap.to(obj, {
    val: end,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
    },
  });

  return () => {
    tween.kill();
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill();
    });
  };
}

export function fadeUpOnScroll(
  selector: string,
  container?: HTMLElement | null
) {
  registerGsap();
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });
  }, container ?? undefined);

  return () => ctx.revert();
}
