import { PageHero } from "@/components/site/page-hero";

const sections = [
  {
    title: "Website Use",
    body: "You may use this website to learn about ULTRABULB IT, submit business inquiries, request project access, schedule consultations, and share reviews in good faith.",
  },
  {
    title: "Submitted Content",
    body: "You are responsible for the accuracy of information you submit. We may remove spam, abusive content, or submissions that are unrelated to legitimate business inquiries.",
  },
  {
    title: "Service Discussions",
    body: "Information on this website is for general business and technical discussion. A project begins only after a written agreement, scope, timeline, and payment terms are accepted.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to contact@ultrabulbit.com.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        badge="Terms"
        title="Terms Of Service"
        description="The basic terms for using the ULTRABULB IT website and inquiry tools."
      />
      <section className="site-container py-16">
        <div className="mx-auto grid max-w-4xl gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
