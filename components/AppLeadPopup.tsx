"use client";

import { LeadPopup } from "@/components/LeadPopup";
import { ALL_PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

export function AppLeadPopup() {
  return (
    <LeadPopup
      projects={ALL_PROJECTS}
      phoneNumber={SITE.phoneNumber}
      whatsappNumber={SITE.whatsappNumber}
    />
  );
}
