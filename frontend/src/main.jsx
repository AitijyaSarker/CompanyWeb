import React from "react";
import { createRoot } from "react-dom/client";
import "./compat/api.js";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import HomePage from "./app/(site)/page.tsx";
import AboutPage from "./app/(site)/about/page.tsx";
import CareersPage from "./app/(site)/careers/page.tsx";
import ContactPage from "./app/(site)/contact/page.tsx";
import ProcessPage from "./app/(site)/process/page.tsx";
import ProjectsPage from "./app/(site)/projects/page.tsx";
import ReviewPage from "./app/(site)/review/page.tsx";
import SchedulePage from "./app/(site)/schedule/page.tsx";
import ServicesPage from "./app/(site)/services/page.tsx";
import WhyChooseUsPage from "./app/(site)/why-choose-us/page.tsx";
import AdminPage from "./app/admin/page.tsx";
import { SiteShell } from "./components/site/site-shell.tsx";
import { ProjectAccessForm } from "./components/site/project-access-form.tsx";
import "./app/globals.css";

function App() {
  const site = (element) => <SiteShell>{element}</SiteShell>;
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="ultrabulb-theme"><BrowserRouter><Routes>
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/" element={site(<HomePage />)} />
    <Route path="/about" element={site(<AboutPage />)} />
    <Route path="/careers" element={site(<CareersPage />)} />
    <Route path="/contact" element={site(<ContactPage />)} />
    <Route path="/process" element={site(<ProcessPage />)} />
    <Route path="/projects" element={site(<ProjectsPage />)} />
    <Route path="/projects/:id" element={site(<ProjectDetail />)} />
    <Route path="/review" element={site(<ReviewPage />)} />
    <Route path="/schedule" element={site(<SchedulePage />)} />
    <Route path="/services" element={site(<ServicesPage />)} />
    <Route path="/why-choose-us" element={site(<WhyChooseUsPage />)} />
  </Routes></BrowserRouter></ThemeProvider>;
}

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  React.useEffect(() => { fetch(`/api/products/${id}`).then((response) => response.ok ? response.json() : null).then(setProject).catch(() => {}); }, [id]);
  if (!project) return <div className="site-container section-pad">Loading project...</div>;
  const gallery = [project.imageUrl, ...(project.galleryUrls || "").split(/\r?\n|,/).map((url) => url.trim()).filter(Boolean)];
  return <article className="site-container section-pad"><div className="grid gap-4 sm:grid-cols-2">{gallery.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${project.title} view ${index + 1}`} className="aspect-video w-full rounded-2xl object-cover sm:first:col-span-2" />)}</div><span className="mt-8 inline-block text-sm font-semibold uppercase tracking-widest text-(--brand-cyan)">{project.category}</span><h1 className="mt-4 text-4xl font-bold text-(--brand-navy) dark:text-white">{project.title}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>{project.techStack ? <div className="mt-8"><h2 className="text-xl font-bold">Tech stack</h2><p className="mt-2 font-semibold text-(--brand-cyan)">{project.techStack}</p></div> : null}{project.review ? <blockquote className="mt-8 border-l-2 border-(--brand-cyan) pl-5 text-lg italic text-muted-foreground">{project.review}</blockquote> : null}{project.awards ? <div className="mt-8"><h2 className="text-xl font-bold">Awards & recognition</h2><p className="mt-2 whitespace-pre-line text-muted-foreground">{project.awards}</p></div> : null}{project.serviceOwners ? <div className="mt-8"><h2 className="text-xl font-bold">Service owners</h2><p className="mt-2 whitespace-pre-line text-muted-foreground">{project.serviceOwners}</p></div> : null}<div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"><h2 className="text-2xl font-bold">Request project access</h2><p className="mb-6 mt-2 text-muted-foreground">Tell us who you are and what you would like to explore.</p><ProjectAccessForm projectId={project.id} /></div></article>;
}

createRoot(document.getElementById("root")).render(<App />);
