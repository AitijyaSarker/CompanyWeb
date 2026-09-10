"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  alt?: string;
  className?: string;
  /** Wrapper around the image (navbar badge, footer, etc.) */
  wrapperClassName?: string;
  showWrapper?: boolean;
  priority?: boolean;
}

export function SiteLogo({
  alt = "ULTRABULB IT",
  className,
  wrapperClassName,
  showWrapper = false,
  priority = false,
}: SiteLogoProps) {
  const img = (
    <Image
      src="/UltrabulbLogo.svg"
      alt={alt}
      className={cn("object-contain", className)}
      width={64}
      height={64}
      priority={priority}
    />
  );

  if (!showWrapper) return img;

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-white/95",
        wrapperClassName
      )}
    >
      {img}
    </span>
  );
}
