/** E.164-ish stored whatsapp/call numbers → tel: and readable display. */

export function digitsOnlyPhone(s: string): string {
  return s.replace(/\D/g, "");
}

export function telHref(phone: string): string {
  const d = digitsOnlyPhone(phone);
  return d ? `tel:+${d}` : "#";
}
