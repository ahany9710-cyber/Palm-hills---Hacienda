import type { Metadata } from "next";
// import { SiteCreekLanding } from "@/components/landings/SiteCreekLanding"; // OLD home — Mountain View hub
import { SiteHaciendaLanding } from "@/components/landings/SiteHaciendaLanding";

export const metadata: Metadata = {
  title: { absolute: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي" },
  description:
    "إطلاق هاسيندا راس الحكمة من بالم هيلز على كيلو ٢٣٨: شاطئ ٤.٨ كم، خليجين طبيعيين، وحدات بفيو بحري. تواصل واتساب فوري أو سجّل اهتمامك.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي",
    description:
      "مجتمع ساحلي فاخر على راس الحكمة — شقق، شاليهات، توين/تاون، وفيلات. واتساب فوري للتفاصيل والأسعار.",
    images: [{ url: "/hacienda/brochure/hero-render.webp", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return <SiteHaciendaLanding />;
}
