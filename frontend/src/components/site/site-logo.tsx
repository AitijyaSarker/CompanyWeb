"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  alt?: string;
  className?: string;
  /** Custom light mode image source */
  lightSrc?: string;
  /** Custom dark mode image source */
  darkSrc?: string;
  /** Wrapper around the image (navbar badge, footer, etc.) */
  wrapperClassName?: string;
  showWrapper?: boolean;
  priority?: boolean;
}

export function SiteLogo({
  alt = "ULTRABULB IT",
  className,
  lightSrc = "/UltrabulbLogo.svg",
  darkSrc = "/UltrabulbLogoDark.png",
  wrapperClassName,
  showWrapper = false,
  priority = false,
}: SiteLogoProps) {
  const lightImg = (
    <Image
      src={lightSrc}
      alt={alt}
      className={cn("object-contain block dark:hidden transition-opacity", className)}
      width={64}
      height={64}
      priority={priority}
    />
  );

  const darkImg = (
    <Image
      src={darkSrc}
      alt={alt}
      className={cn("object-contain hidden dark:block transition-opacity", className)}
      width={64}
      height={64}
      priority={priority}
    />
  );

  if (!showWrapper) {
    return (
      <span className="inline-flex shrink-0 items-center justify-center">
        {lightImg}
        {darkImg}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-200/80 dark:bg-slate-900 dark:border-white/10 overflow-hidden",
        wrapperClassName
      )}
    >
      {lightImg}
      {darkImg}
    </span>
  );
}
