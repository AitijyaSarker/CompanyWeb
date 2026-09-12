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
import PrivacyPage from "./app/(site)/privacy/page.tsx";
import SecurityPage from "./app/(site)/security/page.tsx";
import TermsPage from "./app/(site)/terms/page.tsx";
import AdminPage from "./app/admin/page.tsx";
import { SiteShell } from "./components/site/site-shell.tsx";
import { ProjectDetail } from "./components/site/project-detail.tsx";
import "./app/globals.css";

function App() {
  const site = (element) => <SiteShell>{element}</SiteShell>;
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="ultrabulb-theme" disableTransitionOnChange={false}><BrowserRouter><Routes>
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/" element={site(<HomePage />)} />
    <Route path="/about" element={site(<AboutPage />)} />
    <Route path="/careers" element={site(<CareersPage />)} />
    <Route path="/contact" element={site(<ContactPage />)} />
    <Route path="/process" element={site(<ProcessPage />)} />
    <Route path="/projects" element={site(<ProjectsPage />)} />
    <Route path="/projects/:id" element={site(<ProjectDetailRoute />)} />
    <Route path="/privacy" element={site(<PrivacyPage />)} />
    <Route path="/review" element={site(<ReviewPage />)} />
    <Route path="/schedule" element={site(<SchedulePage />)} />
    <Route path="/security" element={site(<SecurityPage />)} />
    <Route path="/services" element={site(<ServicesPage />)} />
    <Route path="/terms" element={site(<TermsPage />)} />
    <Route path="/why-choose-us" element={site(<WhyChooseUsPage />)} />
  </Routes></BrowserRouter></ThemeProvider>;
}

function ProjectDetailRoute() {
  const { id } = useParams();
  return <ProjectDetail id={id} />;
}

createRoot(document.getElementById("root")).render(<App />);
