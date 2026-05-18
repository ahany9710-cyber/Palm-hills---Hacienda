"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";
import { buildWhatsAppUrl } from "@/lib/utils";
import { telHref } from "@/lib/phone-display";
import type { ProjectContent } from "@/types/project";
import "@/app/projects/creekview-new-cairo/creekview.css";

interface LeadPopupProps {
  projects: ProjectContent[];
  phoneNumber: string;
  whatsappNumber: string;
}

const STORAGE_KEY = "mv_popup_seen";

/** Ratio of vertical scroll (`scrollY / maxScroll`) that opens the popup. */
const SCROLL_DEPTH_RATIO = 0.75;

/** Fallback when the document is barely scrollable: only time-based trigger. */
const MIN_SCROLL_ROOM_PX = 120;

/** Time-only trigger delay (before or alongside scroll gate). */
const TIME_TRIGGER_MS = 15_000;

/** Decorative progress strip duration when the dialog opens — matches urgency timer. */
const PROGRESS_DURATION_S = 15;

const noopSubscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

function useIsClient(): boolean {
  return useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);
}

/**
 * Opens once per session after the user reaches 75% scroll depth or 15s on the page — whichever happens first — except on `/thank-you`. Matches Creekview lead-card styling.
 */
export function LeadPopup({
  projects,
  phoneNumber,
  whatsappNumber,
}: LeadPopupProps) {
  const pathname = usePathname();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/thank-you") return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* private mode */
    }
    if (alreadySeen) return;

    let disposed = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const arm = () => {
      timeoutId = setTimeout(trigger, TIME_TRIGGER_MS);
    };

    const passiveScroll: AddEventListenerOptions = { passive: true };

    const trigger = () => {
      if (disposed) return;
      disposed = true;
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScrollOrResize, passiveScroll);
      window.removeEventListener("resize", onScrollOrResize);

      setOpen((prev) => {
        if (prev) return prev;
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        return true;
      });
    };

    const maxScrollY = (): number =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    function onScroll() {
      const room = maxScrollY();
      if (room < MIN_SCROLL_ROOM_PX) return;
      const pct = window.scrollY / Math.max(room, 1);
      if (pct >= SCROLL_DEPTH_RATIO) {
        trigger();
      }
    }

    function onScrollOrResize() {
      if (disposed) return;
      onScroll();
    }

    arm();
    window.addEventListener("scroll", onScrollOrResize, passiveScroll);
    window.addEventListener("resize", onScrollOrResize);
    queueMicrotask(() => {
      if (!disposed) onScrollOrResize();
    });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScrollOrResize, passiveScroll);
      window.removeEventListener("resize", onScrollOrResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    if (typeof document === "undefined") return;

    lastFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      const last = lastFocusedRef.current;
      if (last instanceof HTMLElement) last.focus();
    };
  }, [open]);

  if (!isClient) return null;
  if (pathname === "/thank-you") return null;

  const tel = telHref(phoneNumber);
  const wa = buildWhatsAppUrl(
    whatsappNumber,
    "السلام عليكم، شفت الإعلان وعايز استشارة مجانية بخصوص مشاريع ماونتن ڤيو."
  );

  const handleClose = () => setOpen(false);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lead-popup-backdrop"
          className="cv-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          role="dialog"
          aria-modal
          aria-labelledby="lead-popup-title"
        >
          <motion.div
            key="lead-popup-card"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: "22%", scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: "22%", scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="cv-lead-popup-root lead-card relative w-full sm:max-w-[440px] max-h-[min(90dvh,calc(100vh-56px))] overflow-y-auto overflow-x-hidden rounded-t-xl sm:rounded-sm shadow-2xl [-webkit-overflow-scrolling:touch]"
          >
            <div className="cv-lead-popup-progress" aria-hidden>
              {reduce ? (
                <span className="cv-lead-popup-progress-fill block scale-x-100" />
              ) : (
                <motion.span
                  className="cv-lead-popup-progress-fill block"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: PROGRESS_DURATION_S,
                    ease: "linear",
                  }}
                />
              )}
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="إغلاق"
              className="cv-lead-popup-close touch-manipulation"
            >
              <X size={20} strokeWidth={2.3} aria-hidden />
            </button>

            <div className="cv-lead-popup-copy">
              <p className="eyebrow-ar">عرض لفترة حصرية</p>
              <h2 id="lead-popup-title" className="lead-popup-title">
                استشارة مجانية مع مستشار ماونتن ڤيو
              </h2>
              <p className="lead-popup-lede">
                ثبّت سعرك واحصل على خصم الإطلاق.
              </p>

              <div className="cv-popup-cta-grid">
                <a
                  href={tel}
                  className="btn btn-call"
                  onClick={handleClose}
                >
                  <Phone aria-hidden strokeWidth={2.2} />
                  اتصل الآن
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa"
                  onClick={handleClose}
                >
                  <MessageCircle aria-hidden strokeWidth={2.2} />
                  واتساب
                </a>
              </div>

              <div className="cv-popup-divider">
                أو سجّل بياناتك
              </div>

              <LeadForm
                projects={projects}
                source="popup"
                appearance="creek"
                submitLabel="احجز استشارتي المجانية"
                compact
                onSuccess={handleClose}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
