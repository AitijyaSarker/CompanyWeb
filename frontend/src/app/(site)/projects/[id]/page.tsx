import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { db } from "@/lib/db";
import { ProjectAccessForm } from "@/components/site/project-access-form";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.product.findUnique({ where: { id }, include: { serviceCategory: true } });
  if (!project) return notFound();
  const gallery = [project.imageUrl, ...(project.galleryUrls ?? "").split(/\r?\n|,/).map((url) => url.trim()).filter(Boolean)];
  const owners = (project.serviceOwners ?? "").split(/\r?\n|,/).map((owner) => owner.trim()).filter(Boolean);

  return (
    <>
      <PageHero badge={project.serviceCategory?.name ?? project.category} title={project.title} subtitle={project.description} />
      <section className="section-pad w-full">
        <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${project.title} view ${index + 1}`} className="aspect-video w-full rounded-2xl object-cover shadow-sm sm:first:col-span-2" />)}
          </div>
          <div className="flex flex-col justify-center gap-5">
            <p className="text-lg leading-8 text-muted-foreground">{project.description}</p>
            {project.techStack ? <div><h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Tech stack</h2><p className="text-(--brand-cyan)">{project.techStack}</p></div> : null}
            <a href="#project-access" className="w-fit rounded-full bg-(--brand-cyan) px-6 py-3 font-semibold text-(--brand-navy-dark)">Request Access</a>
            {project.link ? <a href={project.link} target="_blank" rel="noreferrer" className="w-fit text-sm font-semibold text-(--brand-navy) underline-offset-4 hover:underline dark:text-white">Visit live project</a> : null}
          </div>
        </div>
      </section>
      <section className="section-pad section-alt w-full">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {project.accessFeatures ? <div><h2 className="mb-3 text-2xl font-bold">Access features</h2><ul className="list-disc space-y-2 pl-5 text-muted-foreground">{project.accessFeatures.split(/\r?\n|,/).map((feature) => feature.trim()).filter(Boolean).map((feature) => <li key={feature}>{feature}</li>)}</ul></div> : null}
            {project.review ? <blockquote className="border-l-2 border-(--brand-cyan) pl-5 text-lg italic text-muted-foreground">{project.review}</blockquote> : null}
            {project.awards ? <div><h2 className="mb-2 text-2xl font-bold">Awards & recognition</h2><p className="whitespace-pre-line text-muted-foreground">{project.awards}</p></div> : null}
            {owners.length > 0 ? <div><h2 className="mb-3 text-2xl font-bold">Service owners</h2><ul className="space-y-2 text-muted-foreground">{owners.map((owner) => <li key={owner} className="rounded-lg border border-border/60 bg-background px-4 py-3">{owner}</li>)}</ul></div> : null}
          </div>
          <div id="project-access" className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"><h2 className="mb-2 text-2xl font-bold">Request project access</h2><p className="mb-6 text-sm text-muted-foreground">Tell us who you are and what you would like to explore.</p><ProjectAccessForm projectId={project.id} /></div>
        </div>
      </section>
    </>
  );
}