import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-18066287198";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ماونتن ڤيو — كريك ڤيو نيو كايرو، أليڤا، جراند فاليز",
    template: "%s | ماونتن ڤيو",
  },
  description:
    "كريك ڤيو من ماونتن ڤيو في القاهرة الجديدة: واجهة مائية، جدول أسعار، وتقسيط حتى ١٤ سنة. أليڤا وجراند فاليز كخيارات إضافية. اتصل أو راسلنا واتساب.",
  metadataBase: new URL("https://mountainview.realestates.properties"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    images: [{ url: "/projects/creekview-new-cairo/cover.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
