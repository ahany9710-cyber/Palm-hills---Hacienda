import type { Metadata } from "next";
import { ALL_PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { LeadPopup } from "@/components/LeadPopup";
import { SiteHeroSection } from "@/components/sections/SiteHeroSection";
import { TrustStripSection } from "@/components/sections/TrustStripSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { CompareSection } from "@/components/sections/CompareSection";
import { WhyThisSection } from "@/components/sections/WhyThisSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export const metadata: Metadata = {
  // `absolute` skips the layout's "%s | ماونتن ڤيو" template so the brand
  // doesn't get appended to a title that already starts with it.
  title: { absolute: "ماونتن ڤيو — كريك ڤيو نيو كايرو، أليڤا، وجراند فاليز" },
  description:
    "إطلاق كريك ڤيو من ماونتن ڤيو في القاهرة الجديدة: واجهة مائية، جدول أسعار خطة ٦ سنوات، وتقسيط حتى ١٤ سنة. كمان أليڤا وجراند فاليز. تواصل واحجز.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ماونتن ڤيو — كريك ڤيو القاهرة الجديدة",
    description:
      "كريك ڤيو نيو كايرو: أسعار بداية، تقسيط حتى ١٤ سنة، وتسليم مبكر. أليڤا وجراند فاليز متاحين للمقارنة.",
    images: [{ url: "/projects/creekview-new-cairo/cover.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <MinimalHeader
        whatsappNumber={SITE.whatsappNumber}
        callPhone={SITE.phoneNumber}
        whatsappInquiryMessage="السلام عليكم، مهتم بكريك ڤيو نيو كايرو وأرغب في التفاصيل من المبيعات."
        overHero
      />
      <main className="pb-24 md:pb-0">
        <SiteHeroSection
          eyebrow={SITE.hero.eyebrow}
          headline={SITE.hero.headline}
          subheadline={SITE.hero.subheadline}
          primaryCta={SITE.hero.primaryCta}
          secondaryCta={SITE.hero.secondaryCta}
          image={SITE.hero.image}
          phoneNumber={SITE.phoneNumber}
          whatsappNumber={SITE.whatsappNumber}
          whatsappMessage="السلام عليكم، مهتم بكريك ڤيو وأرغب أعرف التفاصيل والأسعار."
        />
        <TrustStripSection facts={SITE.trustFacts} />

        {ALL_PROJECTS.map((project, i) => (
          <ProjectShowcaseSection key={project.slug} project={project} index={i} />
        ))}

        <CompareSection projects={ALL_PROJECTS} />
        <WhyThisSection whyPoints={SITE.whyPoints} />
        <LeadFormSection
          projects={ALL_PROJECTS}
          phoneNumber={SITE.phoneNumber}
          whatsappNumber={SITE.whatsappNumber}
        />
        <FAQSection faqs={SITE.faqs} />
        <FinalCTASection
          phoneNumber={SITE.phoneNumber}
          whatsappNumber={SITE.whatsappNumber}
          whatsappMessage="السلام عليكم، عايز أتكلم مع مستشار عن كريك ڤيو أو مشروع تاني من ماونتن ڤيو."
        />
      </main>
      <MinimalFooter tagline="ماونتن ڤيو — كريك ڤيو القاهرة الجديدة، ومشاريع أخرى" />
      <FloatingWhatsApp
        phoneNumber={SITE.whatsappNumber}
        message="السلام عليكم، مهتم بكريك ڤيو وأرغب في التفاصيل."
      />
      <LeadPopup
        projects={ALL_PROJECTS}
        phoneNumber={SITE.phoneNumber}
        whatsappNumber={SITE.whatsappNumber}
        triggerSelector="#creekview-new-cairo"
      />
      <StickyMobileCTA
        whatsappNumber={SITE.whatsappNumber}
        callPhone={SITE.phoneNumber}
        whatsappMessage="السلام عليكم، مهتم بكريك ڤيو أو مشاريع ماونتن ڤيو — عايز أكلم المبيعات."
      />
    </>
  );
}
