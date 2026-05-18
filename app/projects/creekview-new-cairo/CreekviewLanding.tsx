"use client";

import { useState, useEffect, useCallback } from "react";
import "./creekview.css";

const PHONE = "201223147238";
const WHATSAPP = "201118884994";
const WA_BASE = `https://wa.me/${WHATSAPP}`;
const waLink = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

const HERO_IMAGES = [
  "/projects/creekview-new-cairo/creek-01.jpeg",
  "/projects/creekview-new-cairo/creek-04.jpeg",
  "/projects/creekview-new-cairo/creek-06.jpeg",
  "/projects/creekview-new-cairo/creek-05.jpeg",
];

const UNITS = [
  { tag: "Millennial", type: "غرفة نوم واحدة", area: "٦٥ – ٨٠ م²", config: "١ مطبخ · ١ حمام · شرفة", price: "٥٫٤ مليون", priceFull: "٥٬٤٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "غرفة نوم + حديقة", area: "٦٥ م²", config: "+ حديقة خاصة", price: "٦٫٥ مليون", priceFull: "٦٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "Millennial", type: "غرفتان", area: "١١٠ – ١٢٥ م²", config: "٢ حمام · ريسبشن", price: "٦٫٩ مليون", priceFull: "٦٬٩٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "غرفتان + حديقة", area: "١١٠ م²", config: "+ حديقة خاصة", price: "٧٫٥ مليون", priceFull: "٧٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "Millennial", type: "٣ غرف", area: "١٤٠ – ١٥٥ م²", config: "٣ حمام · ماستر", price: "٨٫٦ مليون", priceFull: "٨٬٦٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "٣ غرف + حديقة", area: "١٤٠ – ١٥٥ م²", config: "+ حديقة خاصة", price: "٩٫٨ مليون", priceFull: "٩٬٨٠٠٬٠٠٠ جنيه" },
  { tag: "Skyvilla", type: "٣ غرف — سكاي ڤيلا", area: "١٦٠ – ١٦٥ م²", config: "تيراس واسع", price: "١١٫٥ مليون", priceFull: "١١٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "I-villa Garden", type: "فيلا حديقة — ٣ غرف", area: "١٨٠ – ٢٠٥ م²", config: "حديقة كبيرة + مدخل خاص", price: "١٢٫٩ مليون", priceFull: "١٢٬٩٠٠٬٠٠٠ جنيه" },
];

const FAQS = [
  { q: "الأسعار المعروضة على أي أساس؟", a: "الأرقام في الجدول تمثّل سعر بداية على خطة سداد ٦ سنوات. ممكن مناقشة خيارات أطول (حتى ١٤ سنة) مع تعديل الجدولة مع مستشار المبيعات." },
  { q: "إمتى التسليم؟", a: "تسليم مبكر خلال ٢٫٥ سنة مع الالتزام بخطة السداد ٦ سنوات، حسب مادة الإطلاق الرسمية." },
  { q: "إيه أنواع الوحدات المتاحة؟", a: "Millennial و Garden Millennial و Skyvilla و I-villa Garden — بمساحات وعدد غرف مختلفة كما في الجدول. للتوفر الحالي تواصل مع المبيعات." },
  { q: "إزاي أحجز؟ والمقدم بيتدفع امتى؟", a: "بتتواصل مع فريق المبيعات بالاتصال أو واتساب، بنناقش الوحدة والخطة المناسبة، وبنبعتلك العرض الكتابي. المقدم والجدولة يتثبتوا حسب المشروع والمرحلة — رسمياً من ماونتن ڤيو." },
  { q: "ينفع أقسّط على بنك؟", a: "كثير من الوحدات بتتقسّط مع المطور مباشرة. لو محتاج تمويل عقاري نقدر نوضّحلك الخيارات مع البنوك الشريكة." },
  { q: "أقدر أزور الموقع قبل ما أقرر؟", a: "أيوه، بنرتّب لك معاينة مع مستشار مبيعات — ابعت واتساب أو سجّل في النموذج وهنرد بسرعة." },
];

const GALLERY = [
  { src: "/projects/creekview-new-cairo/creek-01.jpeg", label: "The Canal", caption: "قلب المجتمع على الماء", cls: "g1" },
  { src: "/projects/creekview-new-cairo/creek-02.jpeg", label: "Garden Lounge", caption: "جلسات خارجية على الكريك", cls: "g2" },
  { src: "/projects/creekview-new-cairo/creek-06.jpeg", label: "Boardwalk", caption: "ممشى على الواجهة المائية", cls: "g3" },
  { src: "/projects/creekview-new-cairo/creek-05.jpeg", label: "Approach", caption: "مدخل بسلالم حجرية", cls: "g4" },
  { src: "/projects/creekview-new-cairo/creek-04.jpeg", label: "After hours", caption: "إضاءة الكريك بعد المغرب", cls: "g5" },
  { src: "/projects/creekview-new-cairo/creek-07.jpeg", label: "The Walk", caption: "ممشى الواجهة الرئيسي", cls: "g6" },
];

function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M20.52 3.48A11.85 11.85 0 0 0 12.07 0C5.46 0 .1 5.36.1 11.97a11.9 11.9 0 0 0 1.6 6L0 24l6.18-1.62a11.97 11.97 0 0 0 5.89 1.5h.01c6.6 0 11.96-5.36 11.96-11.97 0-3.2-1.24-6.2-3.52-8.43z" />
    </svg>
  );
}

export function CreekviewLanding() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroFading, setHeroFading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  const switchHero = useCallback((i: number) => {
    setHeroFading(true);
    setTimeout(() => {
      setHeroIdx(i);
      setHeroFading(false);
    }, 350);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      switchHero((heroIdx + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroIdx, switchHero]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const errors: { name?: string; phone?: string } = {};
    if (name.length < 2) errors.name = "من فضلك ادخل الاسم";
    if (!/^[0-9+\s]{7,}$/.test(phone)) errors.phone = "رقم الموبايل غير صحيح";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmittedPhone(phone);
    setFormSubmitted(true);
  }

  return (
    <div className="cv-page">
      {/* UTILITY BAR */}
      <div className="utility">
        <div className="wrap">
          <div className="utility-left">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span className="utility-dot" />
              مستشار المبيعات متاح الآن للرد
            </span>
            <span>·</span>
            <span>إطلاق جديد · كريك ڤيو</span>
          </div>
          <div className="utility-right">
            <a href={`tel:+${PHONE}`} aria-label="Call">
              <PhoneIcon size={13} />
              <span>+20 122 314 7238</span>
            </a>
            <a href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو")} aria-label="WhatsApp">
              <WhatsAppIcon size={13} />
              <span>+20 111 888 4994</span>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="cv-header">
        <div className="wrap">
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 3 L3 12 H7 V21 H17 V12 H21 Z" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="a">MOUNTAIN VIEW</span>
              <span className="b">Creekview</span>
            </div>
          </div>
          <nav className="header-cta">
            <a className="ph" href={`tel:+${PHONE}`} aria-label="اتصل بنا">
              <PhoneIcon />
              <span className="t">اتصل الآن</span>
            </a>
            <a className="wa" href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو")} aria-label="واتساب">
              <WhatsAppIcon />
              <span className="t">سجّل اهتمامك</span>
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${HERO_IMAGES[heroIdx]}')`,
            opacity: heroFading ? 0 : 1,
          }}
        />
        <div className="hero-grain" />
        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span>إطلاق رسمي · أكتوبر ٢٠٢٦</span>
          </div>

          <div className="hero-mid">
            <div className="hero-eyebrow">
              <span className="l" />
              <span className="t">Mountain View · New Cairo</span>
            </div>
            <h1 className="hero-title">
              <span className="serif" style={{ fontStyle: "italic" }}>Creekview</span>
              <span className="row2">عيشة على الكريك في القاهرة الجديدة</span>
            </h1>
            <p className="hero-sub">
              مجتمع سكني على الواجهة المائية بتصميم ماونتن ڤيو المعتاد — ممرات مشاة ومساحات خضراء، تشكيلة وحدات من غرفة وحتى فيلا حديقة، وتسليم مبكر خلال ٢٫٥ سنة على خطة سداد ٦ سنوات.
            </p>

            <div className="hero-bottom">
              <div className="hero-ctas">
                <a className="btn btn-call" href={`tel:+${PHONE}`}>
                  <PhoneIcon size={18} />
                  اتصل بنا الآن
                </a>
                <a className="btn btn-wa" href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو وأرغب في التفاصيل والأسعار")}>
                  <WhatsAppIcon size={18} />
                  كلمنا واتساب
                </a>
                <a className="btn btn-form" href="#lead">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
                    <path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" />
                    <path d="M14 2 v6 h6" />
                    <path d="M9 13 h6 M9 17 h6" />
                  </svg>
                  خصم الجدول الكامل
                </a>
              </div>

              <div className="hero-meta">
                <div className="m">
                  <span className="k">Starting from</span>
                  <span className="v">٥٫٤ مليون جنيه</span>
                </div>
                <div className="m">
                  <span className="k">Down Payment</span>
                  <span className="v">حسب خطة السداد</span>
                </div>
                <div className="m">
                  <span className="k">Installments</span>
                  <span className="v">حتى ١٤ سنة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail switcher */}
        <div className="hero-thumbs">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`hero-thumb ${i === heroIdx ? "active" : ""}`}
              style={{ backgroundImage: `url('${img}')` }}
              onClick={() => switchHero(i)}
            />
          ))}
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust">
        <div className="wrap">
          <div className="cell"><div className="num">+٢٥ سنة</div><div className="lbl">خبرة في تطوير المجتمعات</div></div>
          <div className="cell"><div className="num">+٢٥ مشروع</div><div className="lbl">في القاهرة والساحل</div></div>
          <div className="cell"><div className="num">+٣٠ ألف</div><div className="lbl">عميل اختار ماونتن ڤيو</div></div>
          <div className="cell"><div className="num">تسليم في موعده</div><div className="lbl">سجل تنفيذ موثّق</div></div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="s highlights">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">المشروع باختصار</div>
              <h2>أربع نقاط<br />تختصر كريك ڤيو</h2>
            </div>
            <p>إطلاق جديد من ماونتن ڤيو في قلب القاهرة الجديدة — تصميم على الكريك، خطط سداد مرنة، وتسليم مبكر. التفاصيل الكاملة في الجدول والمحادثة مع مستشار المبيعات.</p>
          </div>
          <div className="hl-grid">
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 L12 3 L21 12 M5 10 V20 H19 V10" /></svg>
              </div>
              <div className="hl-label">التشكيلة</div>
              <div className="hl-value">من غرفة حتى فيلا حديقة</div>
              <div className="hl-note">Millennial · Garden · Skyvilla · I-villa</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10 H22" /><circle cx="17" cy="15" r="1.4" fill="currentColor" /></svg>
              </div>
              <div className="hl-label">خطة السداد</div>
              <div className="hl-value">تقسيط حتى ١٤ سنة</div>
              <div className="hl-note">بداية الأسعار على خطة ٦ سنوات</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17 L9 11 L13 14 L21 6" /><path d="M14 6 H21 V13" /></svg>
              </div>
              <div className="hl-label">أسعار البداية</div>
              <div className="hl-value">من ٥٫٤ مليون جنيه</div>
              <div className="hl-note">سعر ١ غرفة Millennial — خطة ٦ سنوات</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 9 H21 M8 3 V7 M16 3 V7" /></svg>
              </div>
              <div className="hl-label">التسليم</div>
              <div className="hl-value">مبكر — ٢٫٥ سنة</div>
              <div className="hl-note">مع الالتزام بخطة ٦ سنوات</div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="s editorial">
        <div className="wrap">
          <div className="ed-grid">
            <div className="ed-img">
              <img src="/projects/creekview-new-cairo/creek-03.jpeg" alt="Creekview canal view" />
              <div className="ribbon">Creekview, dawn</div>
            </div>
            <div className="ed-body">
              <div className="eyebrow-ar">لماذا كريك ڤيو</div>
              <h3>المكان<br />قبل الوحدة.</h3>
              <p style={{ color: "var(--cv-stone)", fontSize: 16, maxWidth: 520, lineHeight: 1.75 }}>
                الفكرة ببساطة: مجتمع متكامل على الواجهة المائية في القاهرة الجديدة، مساحات مفتوحة، وممرات مشاة. مش بس وحدة بتشتريها — أسلوب حياة بترجعله كل يوم.
              </p>
              <div className="ed-pillars">
                {[
                  { n: "01", h: "مجتمع على الماء", p: "تصميم يركّز على الكريك والمشي والمساحات الخضراء — هدوء وخصوصية وسط حركة التجمع الخامس." },
                  { n: "02", h: "مرونة في السداد", p: "خطة بداية ٦ سنوات للأسعار المعروضة، مع إمكانية تقسيط حتى ١٤ سنة. التفاصيل والجدولة الفعلية مع مستشار المبيعات." },
                  { n: "03", h: "جودة ماونتن ڤيو", p: "نفس فلسفة التطوير والتشطيبات اللي عرفتها في باقي مشاريع ماونتن ڤيو — سجل تسليم في موعده موثّق." },
                  { n: "04", h: "تسليم مبكر", p: "٢٫٥ سنة فقط على خطة ٦ سنوات — قيمة سكنية وقيمة استثمارية في نفس الوقت." },
                ].map((pillar) => (
                  <div className="pillar" key={pillar.n}>
                    <span className="n">{pillar.n}</span>
                    <div>
                      <h4>{pillar.h}</h4>
                      <p>{pillar.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="s gallery">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar" style={{ color: "var(--cv-gold)" }}>المعرض</div>
              <h2>لقطات من<br />داخل المجتمع.</h2>
            </div>
            <p>صور الإطلاق الرسمية. للتجوّل الكامل والمعاينة على الأرض، رتّب موعدك معنا.</p>
          </div>
          <div className="gal-grid">
            {GALLERY.map((g) => (
              <div className={`cell ${g.cls}`} key={g.src}>
                <img src={g.src} alt={g.label} />
                <div className="cap"><small>{g.label}</small>{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNITS / PRICING */}
      <section className="s units" id="units">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">جدول الأسعار · خطة ٦ سنوات</div>
              <h2>التشكيلة<br />والأسعار.</h2>
            </div>
            <p>الأرقام التالية تمثّل سعر بداية على خطة سداد ٦ سنوات. يمكن مناقشة خيارات أطول حتى ١٤ سنة وتعديل الجدولة مع مستشار المبيعات.</p>
          </div>

          <div className="units-table">
            {UNITS.map((u, i) => (
              <div className="unit-row" key={i}>
                <div><span className="unit-tag">{u.tag}</span></div>
                <div className="unit-type">{u.type}<small>{u.config}</small></div>
                <div className="unit-meta"><small>المساحة المبنية</small>{u.area}</div>
                <div className="unit-meta"><small>خطة السداد</small>٦ سنوات · حتى ١٤</div>
                <div className="unit-price">{u.priceFull}<small>سعر بداية على خطة ٦ سنوات</small></div>
                <div className="unit-cta">
                  <button onClick={() => window.location.href = waLink(`السلام عليكم، مهتم بـ ${u.tag} ${u.type} في كريك ڤيو`)}>
                    <WhatsAppIcon size={13} />
                    السعر النهائي
                  </button>
                  <button className="primary" onClick={() => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    احجز
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="units-foot">
            <p>* الجدول والأسعار وفقاً لمادة الإطلاق الرسمية من ماونتن ڤيو. التوفر والمراحل تتغيّر — يُفضل تثبيت العرض مع المبيعات.</p>
            <a className="btn btn-wa" href={waLink("السلام عليكم، محتاج جدول كريك ڤيو الكامل")} style={{ background: "var(--cv-ink)", color: "var(--cv-cream)" }}>
              <WhatsAppIcon size={16} />
              استلام الجدول كامل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* LIFESTYLE QUOTE */}
      <section className="lifestyle">
        <div className="bg" style={{ backgroundImage: "url('/projects/creekview-new-cairo/creek-04.jpeg')" }} />
        <div className="wrap">
          <div className="quote-mark">&ldquo;</div>
          <h2>كل بيت فيه كريك يطل عليه.</h2>
          <p>ماونتن ڤيو ما بتبنيش وحدات. بتصمّم لحظات — مشي الصبح على الممشى، فطار على شرفة على الماء، وأطفال بيتسلوا في حدائق على بُعد دقائق من باب البيت.</p>
          <a className="btn btn-call" href="#lead">احجز معاينة على الموقع</a>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="s lead" id="lead">
        <div className="wrap">
          <div className="lead-grid">
            <div className="lead-left">
              <div>
                <div className="eyebrow-ar">سجّل اهتمامك</div>
                <h2>اتركلنا رقمك،<br />والتفاصيل توصلك خلال الساعة.</h2>
                <p>بنبعتلك جدول الأسعار الكامل، خرائط الموقع، وعرض رسمي مكتوب من ماونتن ڤيو. مكالمة مجاملة، بدون التزام.</p>
              </div>
              <ul className="lead-perks">
                {[
                  "عرض رسمي مكتوب من ماونتن ڤيو",
                  "جدول أسعار كامل لكل تشكيلة",
                  "خطط سداد مرنة تتلاءم مع ميزانيتك",
                  "تنسيق معاينة على أرض المشروع",
                ].map((perk) => (
                  <li key={perk}>
                    <span className="check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width={12} height={12}><path d="M4 12 L10 18 L20 6" /></svg>
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lead-card">
              {formSubmitted ? (
                <div className="success">
                  <div className="success-mark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={28} height={28}><path d="M4 12 L10 18 L20 6" /></svg>
                  </div>
                  <h3 className="serif">تم استلام طلبك</h3>
                  <p style={{ color: "var(--cv-stone)", margin: "8px 0 22px" }}>
                    مستشار المبيعات هيتواصل معاك خلال الساعة على رقم<br />
                    <strong style={{ color: "var(--cv-ink)" }}>{submittedPhone}</strong>
                  </p>
                  <a className="btn btn-wa" style={{ display: "inline-flex" }} href={waLink("السلام عليكم، لسه بعتلكم استمارة كريك ڤيو — أرغب في التفاصيل بسرعة")}>
                    <WhatsAppIcon size={16} />
                    ابدأ محادثة فورية بدل الانتظار
                  </a>
                </div>
              ) : (
                <>
                  <h3>طلب التفاصيل</h3>
                  <div className="sub">٣٠ ثانية فقط — استمارة قصيرة</div>
                  <form onSubmit={handleSubmit} autoComplete="on">
                    <div className="row2c">
                      <div className="field">
                        <label htmlFor="lf-name">الاسم</label>
                        <input id="lf-name" name="name" type="text" placeholder="اسمك بالكامل" required />
                        <div className="err">{formErrors.name || ""}</div>
                      </div>
                      <div className="field">
                        <label htmlFor="lf-phone">رقم الموبايل</label>
                        <input id="lf-phone" name="phone" type="tel" placeholder="01XXXXXXXXX" inputMode="numeric" required />
                        <div className="err">{formErrors.phone || ""}</div>
                      </div>
                    </div>
                    <div className="field">
                      <label>نوع الوحدة المطلوبة</label>
                      <select name="type">
                        <option>Millennial — غرفة نوم</option>
                        <option>Garden Millennial — غرفة نوم</option>
                        <option>Millennial — غرفتين</option>
                        <option>Garden Millennial — غرفتين</option>
                        <option>Millennial — ٣ غرف</option>
                        <option>Garden Millennial — ٣ غرف</option>
                        <option>Skyvilla — ٣ غرف</option>
                        <option>I-villa Garden — ٣ غرف</option>
                        <option>غير متأكد بعد — محتاج استشارة</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>الميزانية التقريبية</label>
                      <div className="budget-chips">
                        {["٥–٧ مليون", "٧–٩ مليون", "٩–١٢ مليون", "١٢ مليون+", "أحتاج استشارة"].map((b) => (
                          <div
                            key={b}
                            className={`chip ${budget === b ? "active" : ""}`}
                            onClick={() => setBudget(b)}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="btn-submit" type="submit">
                      <span>ابعتلي تفاصيل كريك ڤيو</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}><path d="M5 12 H19 M19 12 L13 6 M19 12 L13 18" /></svg>
                    </button>
                    <div className="fineprint">بإرسال النموذج أنت توافق على تواصل فريق المبيعات معك — لن نشارك بياناتك مع أي طرف ثالث.</div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="s location">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">الموقع</div>
              <h2>قلب القاهرة الجديدة<br />وعلى مرمى البصر.</h2>
            </div>
            <p>الموقع بيوفّر سهولة وصول للحركة الرئيسية في التجمع، مع قربه من مراكز التعليم والخدمات الكبرى ومشاريع ماونتن ڤيو الأخرى.</p>
          </div>
          <div className="loc-grid">
            <div className="loc-list">
              {[
                { nm: "الحركة الرئيسية بالتجمع الخامس", dst: "سهولة وصول" },
                { nm: "مراكز تعليم وخدمات", dst: "دقائق" },
                { nm: "العاصمة الإدارية الجديدة", dst: "قريب" },
                { nm: "مطار القاهرة الدولي", dst: "≈ ٢٥ دقيقة" },
                { nm: "ماونتن ڤيو — مشاريع أخرى", dst: "نفس المطوّر" },
              ].map((loc) => (
                <div className="row" key={loc.nm}>
                  <span className="nm">{loc.nm}</span>
                  <span className="dst">{loc.dst}</span>
                </div>
              ))}
            </div>
            <div className="loc-map" aria-label="Map">
              <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="450" fill="url(#grid)" />
                <path d="M 0 220 Q 200 200 600 250" stroke="rgba(184,153,104,.55)" strokeWidth="2" fill="none" />
                <path d="M 320 0 L 280 450" stroke="rgba(184,153,104,.35)" strokeWidth="2" fill="none" />
                <path d="M 0 360 L 600 320" stroke="rgba(184,153,104,.25)" strokeWidth="1" fill="none" />
                <path d="M 0 280 Q 180 240 350 280 T 600 290" stroke="rgba(120,180,210,.4)" strokeWidth="6" fill="none" strokeLinecap="round" />
                <text x="60" y="200" fill="rgba(255,255,255,.4)" fontFamily="Inter" fontSize="11" letterSpacing="2">NEW CAIRO</text>
                <text x="430" y="380" fill="rgba(255,255,255,.4)" fontFamily="Inter" fontSize="11" letterSpacing="2">90TH ST.</text>
                <text x="30" y="290" fill="rgba(120,180,210,.7)" fontFamily="Inter" fontSize="10" letterSpacing="3" fontStyle="italic">THE CREEK</text>
              </svg>
              <div className="marker">
                <div className="pulse" />
                <div className="pin" />
                <div className="pin-lbl">Creekview</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="s faq">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">أسئلة شائعة</div>
              <h2>إجابات سريعة<br />قبل المكالمة.</h2>
            </div>
            <p>لو في سؤال مش لاقي إجابته هنا، ابعتلنا واتساب وهنرد عليك خلال دقائق.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="ind">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}><path d="M12 5 V19 M5 12 H19" /></svg>
                  </span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === i ? 300 : 0 }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="final">
        <div className="wrap">
          <div className="final-body">
            <h2><small>تحب تكلمنا إزاي؟</small>اختار طريقتك<br />وفريق المبيعات هيرد عليك.</h2>
          </div>
          <div className="final-actions">
            <a className="final-card" href={`tel:+${PHONE}`}>
              <div className="ic"><PhoneIcon size={22} /></div>
              <div className="tx"><div className="a">CALL · مكالمة مباشرة</div><div className="b">+20 122 314 7238</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو")}>
              <div className="ic" style={{ background: "#25D366" }}><WhatsAppIcon size={22} /></div>
              <div className="tx"><div className="a">WHATSAPP · أسرع رد</div><div className="b">+20 111 888 4994</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href="#lead">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" /><path d="M14 2 v6 h6" /></svg>
              </div>
              <div className="tx"><div className="a">FORM · استمارة سريعة</div><div className="b">٣٠ ثانية فقط</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
          </div>
        </div>
        <div className="deco-line" />
      </section>

      {/* FOOTER */}
      <footer className="cv-footer">
        <div className="wrap">
          <div>© ٢٠٢٦ ماونتن ڤيو · كريك ڤيو نيو كايرو</div>
          <div className="legal">الأسعار والمساحات استرشادية وقد تتغيّر — العرض الرسمي يُعتمد من المطوّر.</div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a className="float-wa" href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو")} aria-label="WhatsApp">
        <WhatsAppIcon size={30} />
        <span className="tip">مستشار المبيعات متاح الآن</span>
      </a>

      {/* MOBILE STICKY CTA */}
      <nav className="sticky-mobile" aria-label="Mobile CTA">
        <div className="row">
          <a className="call" href={`tel:+${PHONE}`}>
            <PhoneIcon size={20} />
            اتصل بنا
          </a>
          <a className="wa" href={waLink("السلام عليكم، مهتم بمشروع كريك ڤيو")}>
            <WhatsAppIcon size={20} />
            واتساب
          </a>
          <a href="#lead">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={20} height={20}><path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" /><path d="M14 2 v6 h6" /></svg>
            استمارة
          </a>
        </div>
      </nav>
    </div>
  );
}
