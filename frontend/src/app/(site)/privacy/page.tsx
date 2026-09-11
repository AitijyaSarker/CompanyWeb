import { PageHero } from "@/components/site/page-hero";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect the details you submit through contact, review, project access, and scheduling forms, including your name, email, phone number, company, message, and selected meeting preferences.",
  },
  {
    title: "How We Use It",
    body: "We use submitted information to respond to inquiries, review project fit, manage consultation requests, improve our services, and maintain basic business records.",
  },
  {
    title: "Storage And Access",
    body: "Form submissions are stored in our secured application database and are accessible only to authorized ULTRABULB IT administrators for business operations.",
  },
  {
    title: "Your Choices",
    body: "You can request correction or deletion of your submitted information by emailing contact@ultrabulbit.com from the address associated with the request.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        badge="Privacy"
        title="Privacy Policy"
        description="How ULTRABULB IT handles the information you share with us."
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
