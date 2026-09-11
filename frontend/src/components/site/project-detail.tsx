"use client";

import * as React from "react";
import { ArrowUpRight, Award, CheckCircle2, ExternalLink, Loader2, Quote, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectAccessForm } from "@/components/site/project-access-form";
import type { Product } from "@/hooks/use-site-data";

function splitList(value?: string | null) {
  return (value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProjectDetail({ id }: { id?: string }) {
  const [project, setProject] = React.useState<Product | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setError(null);
    setProject(null);

    fetch(`/api/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Project not found");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setProject(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load project");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <section className="site-container section-pad pt-32">
        <div className="mx-auto max-w-xl rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">We could not load this project</h1>
          <p className="mt-3 text-sm text-muted-foreground">{error}</p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="site-container flex min-h-[70vh] items-center justify-center pt-28">
        <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card px-5 py-3 text-sm font-medium text-muted-foreground shadow-sm">
          <Loader2 className="size-4 animate-spin text-(--brand-cyan)" />
          Loading project case study
        </div>
      </section>
    );
  }

  const gallery = [project.imageUrl, ...splitList(project.galleryUrls)].filter(Boolean);
  const technologies = splitList(project.techStack);
  const features = splitList(project.accessFeatures);
  const owners = splitList(project.serviceOwners);

  return (
    <article className="bg-background">
      <section className="relative overflow-hidden border-b border-border/70 bg-(--surface-muted) pt-28 dark:bg-(--surface-muted)">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-45 dark:bg-grid-dark dark:opacity-30" />
        <div className="site-container relative grid gap-10 pb-16 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:pb-20 lg:pt-16">
          <div className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit rounded-full border-(--brand-cyan)/30 bg-(--brand-cyan)/10 px-3 py-1 text-(--brand-cyan)">
              Enterprise Case Study
            </Badge>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-(--brand-cyan) text-(--brand-navy-dark) hover:bg-(--brand-cyan)/90">
                <a href="#project-access">
                  Request Access
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              {project.link ? (
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Live Project
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-(--brand-cyan)/20" />
            {gallery[0] ? (
              <img
                src={gallery[0]}
                alt={project.title}
                className="relative aspect-[4/3] w-full rounded-[1.5rem] border border-border/70 bg-muted object-cover shadow-2xl shadow-(--brand-navy)/10 dark:border-white/10 dark:shadow-black/20"
              />
            ) : (
              <div className="relative aspect-[4/3] w-full rounded-[1.5rem] border border-border/70 bg-muted" />
            )}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-10">
            {gallery.length > 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.slice(1).map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${project.title} view ${index + 2}`}
                    className="aspect-video w-full rounded-xl border border-border/60 bg-muted object-cover shadow-sm"
                  />
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-3">
              <CaseSignal icon={ShieldCheck} label="Delivery" value="Production oriented" />
              <CaseSignal icon={CheckCircle2} label="Architecture" value={technologies.length ? "Documented stack" : "Built for scale"} />
              <CaseSignal icon={Users} label="Access" value={features.length ? `${features.length} gated features` : "Request based"} />
            </div>

            {features.length ? (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">Access Features</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-(--brand-cyan)" />
                      <span className="text-sm leading-6 text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {project.review ? (
              <blockquote className="rounded-2xl border border-(--brand-cyan)/25 bg-(--brand-cyan)/10 p-6 text-lg leading-8 text-foreground dark:bg-(--brand-cyan)/10">
                <Quote className="mb-4 size-6 text-(--brand-cyan)" />
                {project.review}
              </blockquote>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            {technologies.length ? (
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Technology</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-full bg-background">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {project.awards ? (
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Award className="size-4 text-(--brand-cyan)" />
                  Awards
                </h2>
                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">{project.awards}</p>
              </div>
            ) : null}

            {owners.length ? (
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Service Owners</h2>
                <div className="mt-4 space-y-2">
                  {owners.map((owner) => (
                    <div key={owner} className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
                      {owner}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <section id="project-access" className="section-pad border-t border-border/70 bg-(--surface-muted) dark:bg-(--surface-muted)">
        <div className="site-container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <Badge className="rounded-full border-(--brand-cyan)/30 bg-(--brand-cyan)/10 text-(--brand-cyan)">Private Preview</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Request project access</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Tell us who you are and what you want to explore. The existing access workflow stays connected to this project.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-8">
            <ProjectAccessForm projectId={project.id} />
          </div>
        </div>
      </section>
    </article>
  );
}

function CaseSignal({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
      <Icon className="size-5 text-(--brand-cyan)" />
      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
