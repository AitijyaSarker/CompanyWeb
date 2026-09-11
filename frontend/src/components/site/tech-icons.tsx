import * as React from "react";

export interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
}

export const TECH_SVG_ICONS: Record<string, React.FC<TechIconProps>> = {
  React: (props) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width={props.size || 24} height={props.size || 24} fill="none" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "Next.js": (props) => (
    <svg viewBox="0 0 180 180" width={props.size || 24} height={props.size || 24} fill="none" {...props}>
      <circle cx="90" cy="90" r="86" fill="currentColor" className="text-slate-900 dark:text-white" />
      <path
        d="M149.508 157.438L69.147 54H54V125.986H66.8436V69.4775L138.995 162.296C142.756 160.871 146.287 159.231 149.508 157.438Z"
        fill="currentColor"
        className="text-white dark:text-slate-950"
      />
      <path d="M115 54H127.844V108.571H115V54Z" fill="currentColor" className="text-white dark:text-slate-950" />
    </svg>
  ),
  TypeScript: (props) => (
    <svg viewBox="0 0 128 128" width={props.size || 24} height={props.size || 24} {...props}>
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M38.5 73.5v-27h-14v-9h38v9h-14v27h-10zm33.5-3.5c4 2.5 8.5 4 13.5 4 6 0 9.5-3 9.5-7.5 0-11-20.5-8-20.5-21 0-7 5.5-12.5 15.5-12.5 5 0 9.5 1 13 3l-3.5 8c-3.5-1.5-7-2.5-10-2.5-4.5 0-6.5 2-6.5 4.5 0 9.5 20.5 7.5 20.5 20.5 0 8-6 13.5-18 13.5-6 0-11.5-1.5-16.5-4l3-8z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "Tailwind CSS": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#06B6D4" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
    </svg>
  ),
  "Framer Motion": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#0055FF" {...props}>
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  "Node.js": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#5FA04E" {...props}>
      <path d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.2l8 4.6 8-4.6V8.9l-8-4.6z" />
      <path d="M12 7a5 5 0 0 1 5 5c0 2.2-1.4 4.1-3.4 4.7l-.6-1.9c1.2-.4 2-1.5 2-2.8 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.3.8 2.4 2 2.8l-.6 1.9C8.4 16.1 7 14.2 7 12a5 5 0 0 1 5-5z" />
    </svg>
  ),
  Python: (props) => (
    <svg viewBox="0 0 128 128" width={props.size || 24} height={props.size || 24} fill="none" {...props}>
      <path
        d="M63.5 13C38.6 13 40 23.8 40 23.8l.1 11.2h24v3.4H30.4S14 36.5 14 61.6c0 25.1 14.3 24.2 14.3 24.2h8.5v-12s-.5-14.3 14-14.3h23.8s13.4.2 13.4-13.1V26.2S90 13 63.5 13zM50.4 20.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
        fill="#3776AB"
      />
      <path
        d="M64.5 115c24.9 0 23.5-10.8 23.5-10.8l-.1-11.2h-24v-3.4h33.7s16.4 1.9 16.4-23.2c0-25.1-14.3-24.2-14.3-24.2h-8.5v12s.5 14.3-14 14.3H33.4S20 67.5 20 80.8v20.2S38 115 64.5 115zM77.6 107.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"
        fill="#FFD43B"
      />
    </svg>
  ),
  PostgreSQL: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#4169E1" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
    </svg>
  ),
  MongoDB: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#47A248" {...props}>
      <path d="M12 0s-7 6.36-7 13.25c0 4.3 3.1 7.75 7 8.75 3.9-1 7-4.45 7-8.75C19 6.36 12 0 12 0zm-.25 21.5c-3.35-.95-5.75-3.8-5.75-7.25 0-4.6 4.3-9.5 5.75-11.25V21.5z" />
    </svg>
  ),
  Redis: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#DC382D" {...props}>
      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.6 4.2-3.1 1.7-7.6-4.2 3.1-1.7zm-8 6l7 3.9v7.8l-7-3.9v-7.8zm9 11.7v-7.8l7-3.9v7.8l-7 3.9z" />
    </svg>
  ),
  AWS: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#FF9900" {...props}>
      <path d="M6.9 14.5c0-.6.4-1 1-1h9.2c.6 0 1 .4 1 1 0 2.8-2.5 5-5.6 5s-5.6-2.2-5.6-5zm-2.8-5c.4-.7 1.3-1 2-.6l4.2 2.4c.7.4 1 1.3.6 2-.4.7-1.3 1-2 .6L4.7 11.5c-.7-.4-1-1.3-.6-2zm15.8 0c.4.7.1 1.6-.6 2l-4.2 2.4c-.7.4-1.6.1-2-.6-.4-.7-.1-1.6.6-2l4.2-2.4c.7-.4 1.6-.1 2 .6z" />
    </svg>
  ),
  Docker: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#2496ED" {...props}>
      <path d="M13.9 8.2h2.2v2.2H13.9zm-3.3 0h2.2v2.2h-2.2zm-3.3 0h2.2v2.2H7.3zm6.6-3.3h2.2v2.2h-2.2zm-3.3 0h2.2v2.2h-2.2zm-3.3 0h2.2v2.2H7.3zm10 3.3h2.2v2.2h-2.2zm3.3 3.3c-.6-.4-1.7-.5-2.7-.1-.3-1.4-1.4-2.5-2.8-2.7V8.2H1.5c-.4 1.7-.2 5.5 1.5 8.1 1.8 2.8 4.7 3.7 9 3.7 7.2 0 10.7-4.4 10.5-8.2.7.2 1.4.1 2-.3l-.5-.7z" />
    </svg>
  ),
  Kubernetes: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#326CE5" {...props}>
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3zm0 3.7c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z" />
    </svg>
  ),
  OpenAI: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#10A37F" {...props}>
      <path d="M22.28 10.1a5.6 5.6 0 0 0-.48-4.66 5.75 5.75 0 0 0-5.83-2.7 5.6 5.6 0 0 0-4.32-1.99 5.75 5.75 0 0 0-5.46 3.96 5.6 5.6 0 0 0-3.85 2.8 5.75 5.75 0 0 0 .37 6.4 5.6 5.6 0 0 0 .48 4.66 5.75 5.75 0 0 0 5.83 2.7 5.6 5.6 0 0 0 4.32 1.99 5.75 5.75 0 0 0 5.46-3.96 5.6 5.6 0 0 0 3.85-2.8 5.75 5.75 0 0 0-.37-6.4zM12 14.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z" />
    </svg>
  ),
  LangChain: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#1C3C3C" className="text-emerald-600 dark:text-emerald-400" {...props}>
      <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 12h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  ),
  GraphQL: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#E10098" {...props}>
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3zM12 7l4.33 2.5v5L12 17l-4.33-2.5v-5L12 7z" />
    </svg>
  ),
  Flutter: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#54C5F8" {...props}>
      <path d="M14.3 2L5 11.3l2.8 2.8L19.9 2h-5.6zm0 10.7l-4.9 4.9 4.9 4.9h5.6l-7.7-7.7 2.1-2.1z" />
    </svg>
  ),
  "React Native": (props) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width={props.size || 24} height={props.size || 24} fill="none" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "GitHub Actions": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#2088FF" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  ),
  Azure: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#0078D4" {...props}>
      <path d="M5.4 20h11.2l-4.1-7.2H3.7L5.4 20zm7.8-16L7.4 12.3l4.6 2.6 6.3-8.9h-5.1z" />
    </svg>
  ),
  Vercel: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="currentColor" {...props}>
      <path d="M12 1L24 22H0L12 1z" />
    </svg>
  ),
  TensorFlow: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#FF6F00" {...props}>
      <path d="M12 2L2 7.8v8.4L6 14v-4.5l6-3.5 6 3.5V14l4 2.2V7.8L12 2zm-4 9.5l4 2.3v7.7l-4-2.3v-7.7zm8 0v7.7l-4 2.3v-7.7l4-2.3z" />
    </svg>
  ),
  Prisma: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#5A67D8" {...props}>
      <path d="M12.7 1.2a1 1 0 0 0-1.4 0l-9.3 17.5a1 1 0 0 0 .7 1.4l15.6 3.8a1 1 0 0 0 1.2-1.1L12.7 1.2zm-.7 3.5l5.5 14.5-11.2-2.7L12 4.7z" />
    </svg>
  ),
  SQLite: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#44A8D8" {...props}>
      <path d="M12 2C6.5 2 2 4.2 2 7v10c0 2.8 4.5 5 10 5s10-2.2 10-5V7c0-2.8-4.5-5-10-5zm0 2.5c4.7 0 8 1.6 8 2.5s-3.3 2.5-8 2.5-8-1.6-8-2.5 3.3-2.5 8-2.5zm8 6.2c-.8.7-2.6 1.4-4.8 1.8 2.2.4 4 1.1 4.8 1.8V17c-.8.7-2.6 1.4-4.8 1.8 2.2.4 4 1.1 4.8 1.8v-7.9z" />
    </svg>
  ),
  "REST APIs": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-500" {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
      <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
    </svg>
  ),
  "CI/CD": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" {...props}>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  ),
  iOS: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.64-1.04 1.7-0.91 2.72 1.02.08 2.05-.51 2.64-1.24z" />
    </svg>
  ),
  Android: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="#3DDC84" {...props}>
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.72 1.24 12.88 1 12 1s-1.72.24-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.73 3.23 5.5 5.07 5.5 7.2h13c0-2.13-1.23-3.97-2.97-5.04zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  Monitoring: (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="#06B6D4" strokeWidth="2" {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Computer Vision": (props) => (
    <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="#A855F7" strokeWidth="2" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9v1m0 4v1m-3-3h1m4 0h1" />
    </svg>
  ),
};

export function TechIcon({ name, className = "", size = 24 }: { name: string; className?: string; size?: number }) {
  const IconComponent = TECH_SVG_ICONS[name];
  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  // Fallback generic tech icon
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" className={`text-cyan-500 ${className}`}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
    </svg>
  );
}
