"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { HACIENDA } from "@/content/projects/hacienda-ras-el-hekma";

/** Strict Egyptian mobile — 01[0125] + 8 digits */
const EG_PHONE = /^01[0125][0-9]{8}$/;

const WA_FORM_FOLLOWUP = `/r/hh-wa?t=form_followup`;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

function trackFormLead() {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({
    event: "generate_lead",
    form_name: "hacienda_lead",
    project: HACIENDA.projectName,
  });
  // Meta Pixel stub — uncomment when pixel is loaded + CSP updated:
  // if (typeof window.fbq === "function") window.fbq("track", "Lead");
}

interface HaciendaLeadFormProps {
  onCtaClick?: (ctaId: string) => void;
}

export function HaciendaLeadForm({ onCtaClick }: HaciendaLeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [unitType, setUnitType] = useState<string>(
    HACIENDA.formUnitTypes[HACIENDA.formUnitTypes.length - 1],
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim().replace(/\s/g, "");

    if (!trimmedName) next.name = "الاسم مطلوب";
    if (!trimmedPhone) next.phone = "رقم الموبايل مطلوب";
    else if (!EG_PHONE.test(trimmedPhone)) {
      next.phone = "رقم موبايل مصري صحيح مطلوب (مثال: 01012345678)";
    }

    if (altPhone.trim()) {
      const alt = altPhone.trim().replace(/\s/g, "");
      if (!EG_PHONE.test(alt)) {
        next.altPhone = "رقم بديل غير صحيح (اختياري)";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    const payload: Record<string, string> = {
      name: name.trim(),
      phone: phone.trim().replace(/\s/g, ""),
      unit_type: unitType,
      project: HACIENDA.projectName,
      developer: HACIENDA.developer,
      source: "hacienda_home",
      _subject: `استفسار هاسيندا — ${name.trim()} — ${unitType}`,
    };

    if (altPhone.trim()) {
      payload.alt_phone = altPhone.trim().replace(/\s/g, "");
    }

    try {
      const res = await fetch(HACIENDA.LEAD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          Object.values(data.errors ?? {})[0] ||
          "تعذر إرسال النموذج. حاول مرة أخرى.";
        setErrors({ form: msg });
        return;
      }

      trackFormLead();
      onCtaClick?.("form_submit");
      setSuccess(true);
    } catch {
      setErrors({
        form: "حدث خطأ في الاتصال. تحقق من الإنترنت أو تواصل على واتساب.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="ph-form-success">
        <div className="ph-form-success-mark" aria-hidden>
          ✓
        </div>
        <h3>تم استلام بياناتك</h3>
        <p>فريق المبيعات هيتواصل معاك قريب — أو كمّل على واتساب دلوقتي.</p>
        <a
          className="ph-btn ph-btn-wa"
          href={WA_FORM_FOLLOWUP}
          data-cta="whatsapp_form_success"
          onClick={() => onCtaClick?.("whatsapp_form_success")}
          style={{ display: "inline-flex", width: "100%" }}
        >
          <WhatsAppIcon size={20} />
          <span>كمّل على واتساب</span>
        </a>
      </div>
    );
  }

  return (
    <form className="ph-form-card" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="hh-name">الاسم *</label>
        <input
          id="hh-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم الكامل"
          autoComplete="name"
          disabled={submitting}
          aria-invalid={!!errors.name}
        />
        <div className="err">{errors.name ?? ""}</div>
      </div>

      <div className="field">
        <label htmlFor="hh-phone">رقم الموبايل *</label>
        <input
          id="hh-phone"
          type="tel"
          inputMode="numeric"
          dir="ltr"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01012345678"
          autoComplete="tel"
          disabled={submitting}
          aria-invalid={!!errors.phone}
        />
        <div className="err">{errors.phone ?? ""}</div>
      </div>

      <div className="field">
        <label htmlFor="hh-alt-phone">
          رقم آخر للتواصل{" "}
          <span style={{ fontWeight: 400, opacity: 0.75 }}>(اختياري)</span>
        </label>
        <input
          id="hh-alt-phone"
          type="tel"
          inputMode="numeric"
          dir="ltr"
          value={altPhone}
          onChange={(e) => setAltPhone(e.target.value)}
          placeholder="01098765432"
          autoComplete="tel"
          disabled={submitting}
          aria-invalid={!!errors.altPhone}
        />
        <div className="err">{errors.altPhone ?? ""}</div>
      </div>

      <div className="field">
        <label htmlFor="hh-unit">نوع الوحدة</label>
        <select
          id="hh-unit"
          value={unitType}
          onChange={(e) => setUnitType(e.target.value)}
          disabled={submitting}
        >
          {HACIENDA.formUnitTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {errors.form ? (
        <div className="ph-form-error-fallback">
          <p>{errors.form}</p>
          <a
            className="ph-btn ph-btn-wa"
            href={WA_FORM_FOLLOWUP}
            data-cta="whatsapp_form_error"
            onClick={() => onCtaClick?.("whatsapp_form_error")}
            style={{ display: "inline-flex", width: "100%" }}
          >
            <WhatsAppIcon size={18} />
            <span>تواصل على واتساب</span>
          </a>
        </div>
      ) : null}

      <button
        type="submit"
        className="btn-submit"
        disabled={submitting}
        data-cta="form_submit"
      >
        <Send size={18} aria-hidden />
        {submitting ? "جاري الإرسال…" : "ابعت استفساري"}
      </button>

      <p className="ph-form-privacy">
        بياناتك سرية ولن تُستخدم إلا للتواصل معك
      </p>
    </form>
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
