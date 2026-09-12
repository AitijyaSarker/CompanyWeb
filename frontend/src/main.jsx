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

import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedSiteRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailRoute />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="ultrabulb-theme" disableTransitionOnChange={false}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/*"
            element={
              <SiteShell>
                <AnimatedSiteRoutes />
              </SiteShell>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function ProjectDetailRoute() {
  const { id } = useParams();
  return <ProjectDetail id={id} />;
}

createRoot(document.getElementById("root")).render(<App />);
