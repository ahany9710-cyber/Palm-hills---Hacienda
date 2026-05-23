"use client";

import { LeadPopup } from "@/components/LeadPopup";
import { ALL_PROJECTS } from "@/content/projects";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

export function AppLeadPopup() {
  return (
    <LeadPopup
      projects={ALL_PROJECTS}
      phoneNumber={HACIENDA.PHONE}
      whatsappNumber={HACIENDA.WHATSAPP_NUMBER}
    />
  );
}
