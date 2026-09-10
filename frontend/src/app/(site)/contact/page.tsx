"use client";

import { PageHero } from "@/components/site/page-hero";
import { Contact } from "@/components/site/contact";
import { FinalCTA } from "@/components/site/final-cta";
import { getContent, useSiteData } from "@/hooks/use-site-data";

export default function ContactPage() {
  const { data } = useSiteData();
  const content = data?.content;

  return (
    <>
      <PageHero
        badge={getContent(content, "contact_badge", "Contact")}
        title={getContent(content, "contact_title", "Let's Start a Conversation")}
        subtitle={getContent(
          content,
          "contact_subtitle",
          "Tell us about your project. We'll respond within one business day."
        )}
      />
      <Contact hideHeading />
      <FinalCTA />
    </>
  );
}
