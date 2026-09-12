import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Link({ href, to, children, className, onClick, ...props }) {
  const navigate = useNavigate();
  const rawHref = href || to || "#";
  const hrefStr = typeof rawHref === "string" ? rawHref : typeof rawHref === "object" && rawHref?.pathname ? rawHref.pathname : "#";

  // Check if external link (http, mailto, tel) or anchor on same page
  const isExternal =
    hrefStr.startsWith("http://") ||
    hrefStr.startsWith("https://") ||
    hrefStr.startsWith("mailto:") ||
    hrefStr.startsWith("tel:");
  const isHashOnly = hrefStr.startsWith("#");

  if (isExternal) {
    return (
      <a href={hrefStr} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  if (isHashOnly) {
    const handleHashClick = (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      const targetId = hrefStr.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <a href={hrefStr} className={className} onClick={handleHashClick} {...props}>
        {children}
      </a>
    );
  }

  // Handle combined pathname + hash (e.g. /services#web)
  const [path, hash] = hrefStr.split("#");
  const targetPath = path || "/";

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (hash) {
      e.preventDefault();
      navigate(targetPath);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    }
  };

  return (
    <RouterLink to={hrefStr} className={className} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
}