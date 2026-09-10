"use client";

import { Hero } from "@/components/site/hero";
import { ServicesShowcase } from "@/components/site/services-showcase";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { ProcessSection } from "@/components/site/process-section";
import { WhyChooseUsSection } from "@/components/site/why-choose-us-section";
import { Technologies } from "@/components/site/technologies";
import { Gallery } from "@/components/site/gallery";
import { ReviewsAwards } from "@/components/site/reviews-awards";
import { FinalCTA } from "@/components/site/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      <FeaturedProjects />
      <ProcessSection />
      <WhyChooseUsSection />
      <Technologies />
      <Gallery />
      <ReviewsAwards />
      <FinalCTA />
    </>
  );
}
