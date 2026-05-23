"use client";

import type { ReactNode } from "react";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";
import { HaciendaLeadForm } from "@/components/sections/HaciendaLeadForm";
import { telHref } from "@/lib/phone-display";
import "./hacienda.css";

const TEL_HREF = telHref(HACIENDA.PHONE);
const waUrl = (preset: string) => `/r/hh-wa?t=${encodeURIComponent(preset)}`;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

function trackCta(id: string) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: "cta_click", cta_id: id });
  // Meta Pixel stub — uncomment when pixel is loaded + CSP updated:
  // if (typeof window.fbq === "function") window.fbq("track", "Lead", { cta_id: id });
}

function StatIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    location: (
      <path d="M12 2 C8 2 5 5.5 5 10 C5 15 12 22 12 22 C12 22 19 15 19 10 C19 5.5 16 2 12 2 Z M12 13 A3 3 0 1 1 12 7 A3 3 0 0 1 12 13 Z" />
    ),
    area: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 10 H20 M10 4 V20" />
      </>
    ),
    beach: (
      <path d="M2 18 Q6 14 12 16 T22 14 V20 H2 Z M6 10 A2 2 0 1 1 6 14 A2 2 0 0 1 6 10 M18 8 A2 2 0 1 1 18 12 A2 2 0 0 1 18 8" />
    ),
    green: (
      <path d="M12 22 V12 M12 12 C12 8 8 4 4 4 C4 8 8 12 12 12 M12 12 C12 8 16 4 20 4 C20 8 16 12 12 12" />
    ),
    footprint: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </>
    ),
    hotel: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="1" />
        <path d="M3 12 H21 M8 8 V5 H16 V8 M7 16 H7.01 M12 16 H12.01 M17 16 H17.01" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {paths[type] ?? paths.location}
    </svg>
  );
}

function EcoIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    airport: <path d="M2 16 L22 16 M6 16 L10 8 L14 8 L18 16 M8 12 H16" fill="none" stroke="currentColor" strokeWidth="1.8" />,
    marina: <path d="M4 18 Q12 10 20 18 M8 14 L16 14" fill="none" stroke="currentColor" strokeWidth="1.8" />,
    freezone: <><rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 10 H16 M8 14 H13" /></>,
    cbd: <><rect x="3" y="10" width="8" height="10" /><rect x="13" y="4" width="8" height="16" /></>,
    amphitheatre: <path d="M4 18 Q12 8 20 18" fill="none" stroke="currentColor" strokeWidth="1.8" />,
    transit: <path d="M6 18 V8 H18 V18 M8 18 H16 M10 12 H14" fill="none" stroke="currentColor" strokeWidth="1.8" />,
    dining: <><path d="M8 4 V14 M6 4 V8 M10 4 V8 M8 14 V20" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M16 4 C14 4 13 6 13 8 V14 H19 V8 C19 6 18 4 16 4 Z M16 14 V20" stroke="currentColor" strokeWidth="1.8" fill="none" /></>,
    smart: <><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="2" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      {paths[type] ?? paths.smart}
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.088 5.972L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function SiteHaciendaLanding() {
  const onWa = (id: string) => () => trackCta(id);
  const onCall = (id: string) => () => trackCta(id);

  return (
    <div className="ph-page">
      {/* 1. Sticky header */}
      <header className="ph-header">
        <div className="wrap">
          <div className="ph-brand">
            <div className="ph-brand-logo">
              <div className="ph-brand-row">
                <img
                  src={HACIENDA.logos.developer}
                  alt=""
                  className="ph-brand-mark-img"
                  width={36}
                  height={36}
                  aria-hidden
                />
                <span className="dev">Palm Hills</span>
              </div>
              <span className="proj">{HACIENDA.projectName}</span>
            </div>
          </div>
          <div className="ph-header-actions">
            <span className="ph-lang-toggle" aria-hidden>
              <span className="active">ع</span>
              <span>/</span>
              <span>EN</span>
            </span>
            <a
              className="ph-btn ph-btn-call"
              href={TEL_HREF}
              aria-label="اتصل بنا"
              data-cta="call_header"
              onClick={onCall("call_header")}
            >
              <PhoneIcon size={16} />
              <span className="label">اتصل بنا</span>
            </a>
            <a
              className="ph-btn ph-btn-wa"
              href={waUrl("header")}
              aria-label="تواصل واتساب"
              data-cta="whatsapp_header"
              onClick={onWa("whatsapp_header")}
            >
              <WhatsAppIcon size={16} />
              <span className="label">تواصل واتساب</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="ph-hero" id="hero">
        <div className="ph-hero-bg">
          <img
            src={HACIENDA.hero.heroImage}
            alt={HACIENDA.hero.heroAlt}
            fetchPriority="high"
          />
        </div>

        <a
          href="#units"
          className="ph-explore-badge"
          aria-label="استكشف الوحدات"
        >
          <span>Explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 5 V19 M5 12 L12 19 L19 12" />
          </svg>
        </a>

        <div className="wrap ph-hero-inner">
          <h1 className="ph-h1">
            <span className="dark">{HACIENDA.hero.headlineDark}</span>
            <span className="accent">{HACIENDA.hero.headlineAccent}</span>
          </h1>
          <p className="ph-hero-tagline">{HACIENDA.hero.taglineEn}</p>
          <p className="ph-hero-value">{HACIENDA.hero.valueProp}</p>
          <div className="ph-hero-ctas">
            <a
              className="ph-btn ph-btn-wa"
              href={waUrl("hero")}
              data-cta="whatsapp_hero"
              onClick={onWa("whatsapp_hero")}
            >
              <WhatsAppIcon />
              <span>تواصل واتساب</span>
            </a>
            <a
              className="ph-btn ph-btn-outline"
              href="#lead"
              data-cta="form_scroll_hero"
              onClick={() => trackCta("form_scroll_hero")}
            >
              احجز معاينة
            </a>
          </div>
          <p className="ph-trust-line">{HACIENDA.hero.trustLine}</p>
        </div>
      </section>

      {/* 3. Highlights stat bar */}
      <section className="ph-highlights" aria-label="أبرز المميزات">
        <div className="wrap">
          {HACIENDA.highlights.map((h) => (
            <div className="ph-stat" key={h.label}>
              <div className="ph-stat-ico">
                <StatIcon type={h.icon} />
              </div>
              <div className="ph-stat-label">{h.label}</div>
              <div className="ph-stat-value">{h.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Partnership */}
      <section className="ph-section ph-partnership" id="partnership">
        <div className="wrap">
          <div className="ph-partnership-grid">
            <div className="ph-partnership-copy">
              <p className="ph-eyebrow">الشراكة</p>
              <h2 className="ph-h2">{HACIENDA.partnership.title}</h2>
              <p className="ph-lede">{HACIENDA.partnership.description}</p>
              <div className="ph-partnership-logos">
                {HACIENDA.partnership.developers.map((d, i) => (
                  <div className="ph-partner" key={d.id}>
                    {d.logo ? (
                      <img src={d.logo} alt={d.nameAr} className="ph-partner-logo" loading="lazy" />
                    ) : (
                      <span className="ph-partner-badge">{d.name}</span>
                    )}
                    <span className="ph-partner-name">{d.nameAr}</span>
                    <span className="ph-partner-country">{d.country}</span>
                    {i === 0 ? <span className="ph-partner-x" aria-hidden>×</span> : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="ph-partnership-img">
              <img
                src={HACIENDA.partnership.image}
                alt={HACIENDA.partnership.imageAlt}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location & Ecosystem */}
      <section className="ph-section ph-location" id="location">
        <div className="wrap">
          <div className="ph-section-head">
            <p className="ph-eyebrow">الموقع</p>
            <h2 className="ph-h2">
              {HACIENDA.location.title.split(" ")[0]}{" "}
              <span className="accent">{HACIENDA.location.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="ph-lede">{HACIENDA.location.description}</p>
          </div>
          <div className="ph-location-grid">
            <div className="ph-location-map">
              <img src={HACIENDA.location.image} alt={HACIENDA.location.imageAlt} loading="lazy" />
            </div>
            <div className="ph-location-distances">
              {HACIENDA.location.distances.map((d) => (
                <div className="ph-distance" key={d.km + d.label}>
                  <span className="km">{d.km}</span>
                  <span className="lbl">KM — {d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ph-section ph-ecosystem" id="ecosystem">
        <div className="wrap">
          <div className="ph-ecosystem-head">
            <div>
              <p className="ph-eyebrow">المنظومة</p>
              <h2 className="ph-h2">
                مدينة <span className="accent">تتجاوز الساحل</span>
              </h2>
              <p className="ph-lede">{HACIENDA.ecosystem.description}</p>
            </div>
            <div className="ph-ecosystem-visual">
              <img src={HACIENDA.ecosystem.image} alt={HACIENDA.ecosystem.imageAlt} loading="lazy" />
            </div>
          </div>
          <div className="ph-ecosystem-grid">
            {HACIENDA.ecosystem.items.map((item) => (
              <div className="ph-eco-item" key={item.icon}>
                <div className="ph-eco-ico">
                  <EcoIcon type={item.icon} />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Masterplan */}
      <section className="ph-section ph-masterplan" id="masterplan">
        <div className="wrap">
          <div className="ph-masterplan-grid">
            <div className="ph-masterplan-img">
              <img src={HACIENDA.masterplan.image} alt={HACIENDA.masterplan.imageAlt} loading="lazy" />
            </div>
            <div>
              <p className="ph-eyebrow">الماستر بلان</p>
              <h2 className="ph-h2">
                فلسفة <span className="accent">التصميم</span>
              </h2>
              <p className="ph-lede">{HACIENDA.masterplan.description}</p>
              <div className="ph-masterplan-stats">
                <div className="ph-mp-stat">
                  <div className="num">{HACIENDA.masterplan.acres.toLocaleString("ar-EG")}</div>
                  <div className="lbl">فدان</div>
                </div>
                <div className="ph-mp-stat">
                  <div className="num">{HACIENDA.masterplan.shorelineKm} كم</div>
                  <div className="lbl">شاطئ</div>
                </div>
                <div className="ph-mp-stat">
                  <div className="num">{HACIENDA.masterplan.greenWaterPercent}٪</div>
                  <div className="lbl">خضراء ومائية</div>
                </div>
                <div className="ph-mp-stat">
                  <div className="num">{HACIENDA.masterplan.footprintPercent}٪</div>
                  <div className="lbl">footprint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Shoreline + Parks */}
      <section className="ph-section ph-split" id="shoreline">
        <div className="wrap ph-split-grid">
          <article className="ph-split-card">
            <div className="ph-split-img">
              <img src={HACIENDA.shoreline.image} alt={HACIENDA.shoreline.imageAlt} loading="lazy" />
            </div>
            <div className="ph-split-body">
              <h3 className="ph-h3">{HACIENDA.shoreline.title}</h3>
              <p>{HACIENDA.shoreline.description}</p>
            </div>
          </article>
          <article className="ph-split-card">
            <div className="ph-split-img">
              <img src={HACIENDA.parks.image} alt={HACIENDA.parks.imageAlt} loading="lazy" />
            </div>
            <div className="ph-split-body">
              <h3 className="ph-h3">{HACIENDA.parks.title}</h3>
              <p>{HACIENDA.parks.description}</p>
            </div>
          </article>
        </div>
      </section>

      {/* 8. Unit types + prices */}
      <section className="ph-section" id="units">
        <div className="wrap">
          <div className="ph-section-head">
            <p className="ph-eyebrow">أنواع الوحدات</p>
            <h2 className="ph-h2">
              اختار <span className="accent">وحدتك</span>
            </h2>
            <p className="ph-lede">
              {HACIENDA.finishingNote} — الأسعار استرشادية قبل الإطلاق الرسمي.
            </p>
          </div>
          <div className="ph-units-grid">
            {HACIENDA.units.map((u) => (
              <article className="ph-unit-card" key={u.id}>
                <div className="ph-unit-img">
                  <img
                    className="ph-arched"
                    src={u.image}
                    alt={u.imageAlt}
                    loading="lazy"
                  />
                </div>
                <div className="ph-unit-body">
                  <h3 className="ph-unit-type">{u.typeAr}</h3>
                  <p className="ph-unit-en">{u.type}</p>
                  <p className="ph-unit-price">{HACIENDA.prices[u.priceKey]}</p>
                  <p className="ph-unit-note">{HACIENDA.finishingNote}</p>
                  <a
                    className="ph-btn ph-btn-wa"
                    href={waUrl(u.waPreset)}
                    data-cta={`whatsapp_${u.id}`}
                    onClick={onWa(`whatsapp_${u.id}`)}
                  >
                    <WhatsAppIcon size={16} />
                    <span>استفسر على واتساب</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Hospitality */}
      <section className="ph-section ph-hospitality" id="hospitality">
        <div className="ph-hospitality-bg">
          <img src={HACIENDA.hospitality.image} alt={HACIENDA.hospitality.imageAlt} loading="lazy" />
        </div>
        <div className="wrap ph-hospitality-inner">
          <p className="ph-eyebrow">الضيافة</p>
          <h2 className="ph-h2">
            شراكات <span className="accent">عالمية</span>
          </h2>
          <p className="ph-lede">{HACIENDA.hospitality.description}</p>
          <ul className="ph-feature-list">
            {HACIENDA.hospitality.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Sports & Wellness */}
      <section className="ph-section ph-sports" id="sports">
        <div className="wrap ph-sports-grid">
          <div>
            <p className="ph-eyebrow">{HACIENDA.sportsWellness.anchor}</p>
            <h2 className="ph-h2">
              {HACIENDA.sportsWellness.titleAr.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="accent">
                {HACIENDA.sportsWellness.titleAr.split(" ").slice(2).join(" ")}
              </span>
            </h2>
            <p className="ph-lede">{HACIENDA.sportsWellness.description}</p>
            <ul className="ph-pill-list">
              {HACIENDA.sportsWellness.facilities.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="ph-sports-img">
            <img
              src={HACIENDA.sportsWellness.image}
              alt={HACIENDA.sportsWellness.imageAlt}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 11. Payment plan + delivery */}
      <section className="ph-section ph-payment">
        <div className="wrap">
          <div className="ph-section-head">
            <p className="ph-eyebrow">خطط السداد</p>
            <h2 className="ph-h2">
              سداد <span className="accent">مرن</span>
            </h2>
          </div>
          <div className="ph-payment-grid">
            <div className="ph-payment-card">
              <h3>المقدم</h3>
              <p>{HACIENDA.paymentPlan.downPayment}</p>
            </div>
            <div className="ph-payment-card">
              <h3>التقسيط</h3>
              <p>{HACIENDA.paymentPlan.installment}</p>
            </div>
            <div className="ph-payment-card">
              <h3>الاستلام</h3>
              <p>{HACIENDA.delivery}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Gallery */}
      <section className="ph-section ph-gallery" id="gallery">
        <div className="wrap">
          <div className="ph-section-head">
            <p className="ph-eyebrow">المعرض</p>
            <h2 className="ph-h2">
              سلسلة <span className="accent">هاسيندا</span>
            </h2>
            <p className="ph-lede">
              من راس الحكمة إلى باي ووايت وبلو وريد — legacy هاسيندا على الساحل الشمالي.
            </p>
          </div>
          <div className="ph-gal-grid">
            {HACIENDA.gallery.map((g) => (
              <div
                className={`ph-gal-item ${"featured" in g && g.featured ? "g1" : ""}`}
                key={g.id}
              >
                <img src={g.image} alt={g.imageAlt} loading="lazy" />
                <div className="ph-gal-cap">{g.label}</div>
              </div>
            ))}
          </div>
          <div className="ph-sister-strip" aria-label="مشاريع هاسيندا">
            {HACIENDA.sisterProjects.map((p) => (
              <div className="ph-sister-card" key={p.id}>
                <div className="ph-sister-thumb">
                  <img src={p.photo} alt={p.nameAr} loading="lazy" />
                </div>
                <div className="ph-sister-meta">
                  {p.logo ? (
                    <img
                      className="ph-sister-logo"
                      src={p.logo}
                      alt={`${p.nameAr} — شعار`}
                      loading="lazy"
                    />
                  ) : null}
                  <span className="ph-sister-name">{p.nameAr}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Developer trust */}
      <section className="ph-section ph-trust" id="developer">
        <div className="wrap">
          <div className="ph-trust-grid">
            <div>
              <p className="ph-eyebrow">بالم هيلز</p>
              <h2 className="ph-h2">
                مطور <span className="accent">موثوق</span>
              </h2>
              <p className="ph-lede">
                واحد من أكبر المطورين في مصر — سجل تنفيذي يمتد لعقود.
              </p>
              <div className="ph-trust-stats">
                <div className="ph-trust-stat">
                  <div className="num">{HACIENDA.developerTrust.sqm}</div>
                  <div className="lbl">{HACIENDA.developerTrust.sqmLabel}</div>
                </div>
                <div className="ph-trust-stat">
                  <div className="num">{HACIENDA.developerTrust.projects}</div>
                  <div className="lbl">{HACIENDA.developerTrust.projectsLabel}</div>
                </div>
                <div className="ph-trust-stat">
                  <div className="num">{HACIENDA.developerTrust.families}</div>
                  <div className="lbl">{HACIENDA.developerTrust.familiesLabel}</div>
                </div>
                <div className="ph-trust-stat">
                  <div className="num">{HACIENDA.developerTrust.since}</div>
                  <div className="lbl">{HACIENDA.developerTrust.sinceLabel}</div>
                </div>
              </div>
            </div>
            <div className="ph-trust-img">
              <img
                src={HACIENDA.developerTrust.image}
                alt={HACIENDA.developerTrust.imageAlt}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 14. Sales offices */}
      <section className="ph-section ph-offices" id="offices">
        <div className="wrap">
          <div className="ph-section-head">
            <p className="ph-eyebrow">مكاتب المبيعات</p>
            <h2 className="ph-h2">
              تواصل <span className="accent">معنا</span>
            </h2>
          </div>
          <div className="ph-offices-grid">
            {HACIENDA.salesOffices.map((office) => (
              <article className="ph-office-card" key={office.area}>
                <h3>{office.area}</h3>
                <p className="ph-office-address">{office.address}</p>
                <a className="ph-office-phone" href={TEL_HREF} aria-label="اتصل بنا">
                  اتصل بنا
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Lead form */}
      <section className="ph-section ph-lead" id="lead">
        <div className="wrap">
          <div className="ph-lead-grid">
            <div>
              <p className="ph-eyebrow">سجّل اهتمامك</p>
              <h2 className="ph-h2">
                اترك <span className="accent">بياناتك</span>
              </h2>
              <p className="ph-lede">
                فريق المبيعات هيرد عليك في دقايق — أو كمّل على واتساب للرد الأسرع.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
                <a
                  className="ph-btn ph-btn-wa"
                  href={waUrl("hero")}
                  data-cta="whatsapp_lead_section"
                  onClick={onWa("whatsapp_lead_section")}
                >
                  <WhatsAppIcon size={16} />
                  <span>واتساب</span>
                </a>
                <a
                  className="ph-btn ph-btn-call"
                  href={TEL_HREF}
                  data-cta="call_lead_section"
                  onClick={onCall("call_lead_section")}
                >
                  <PhoneIcon size={16} />
                  <span>اتصل بنا</span>
                </a>
              </div>
            </div>
            <HaciendaLeadForm onCtaClick={trackCta} />
          </div>
        </div>
      </section>

      {/* 16. Footer */}
      <footer className="ph-footer">
        <div className="wrap">
          <a
            className="ph-btn ph-btn-wa"
            href={waUrl("footer")}
            data-cta="whatsapp_footer"
            onClick={onWa("whatsapp_footer")}
            style={{ minWidth: 220 }}
          >
            <WhatsAppIcon />
            <span>تواصل واتساب الآن</span>
          </a>
          <p>
            © {new Intl.NumberFormat("ar-EG").format(2026)} {HACIENDA.developer} —{" "}
            {HACIENDA.projectName}
          </p>
          <p className="ph-footer-legal">
            الأسعار والمساحات استرشادية قبل الإطلاق الرسمي — العرض الكتابي يُعتمد من
            المطور.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        className="ph-float-wa"
        href={waUrl("float")}
        aria-label="WhatsApp"
        data-cta="whatsapp_float"
        onClick={onWa("whatsapp_float")}
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* Mobile sticky CTA */}
      <nav className="ph-sticky-mobile" aria-label="Mobile CTA">
        <div className="row">
          <a
            className="call"
            href={TEL_HREF}
            data-cta="call_sticky"
            onClick={onCall("call_sticky")}
            aria-label="اتصل بنا"
          >
            <PhoneIcon size={20} />
            <span>اتصل بنا</span>
          </a>
          <a
            className="wa"
            href={waUrl("sticky")}
            data-cta="whatsapp_sticky"
            onClick={onWa("whatsapp_sticky")}
          >
            <WhatsAppIcon size={20} />
            <span>واتساب</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
