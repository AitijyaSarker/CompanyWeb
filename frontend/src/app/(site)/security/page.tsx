import { PageHero } from "@/components/site/page-hero";
import { ShieldCheck } from "lucide-react";

const practices = [
  "Administrator sessions use HTTP-only cookies and production secure-cookie settings.",
  "Public forms are rate-limited and validated before records are stored.",
  "Uploads are restricted to image MIME types and capped by file size.",
  "Production configuration requires a dedicated JWT secret and external MongoDB connection.",
  "Security-related HTTP headers are applied by the backend service.",
];

export default function SecurityPage() {
  return (
    <main>
      <PageHero
        badge="Security"
        title="Security Overview"
        description="A plain-language overview of the safeguards used across the ULTRABULB IT website."
      />
      <section className="site-container py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Current Website Safeguards</h2>
          </div>
          <ul className="mt-6 grid gap-3">
            {practices.map((practice) => (
              <li key={practice} className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                {practice}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
            To report a security concern, email contact@ultrabulbit.com with a clear description and reproduction details.
          </p>
        </div>
      </section>
    </main>
  );
}
