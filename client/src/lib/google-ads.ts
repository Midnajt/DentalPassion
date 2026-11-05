import { GA_ID, hasAnalyticsConsent, hasMarketingConsent } from "./google-analytics";

export const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || "AW-18539018005";

export const GOOGLE_ADS_CONVERSION_LABELS = {
  phoneClick: (import.meta.env.VITE_GOOGLE_ADS_PHONE_CONVERSION_LABEL || "").trim(),
  emailClick: (import.meta.env.VITE_GOOGLE_ADS_EMAIL_CONVERSION_LABEL || "").trim(),
} as const;

export type ContactClickEvent = "phone_click" | "email_click";

export function trackGoogleAdsConversion(
  conversionLabel?: string,
  params?: Record<string, unknown>,
) {
  if (typeof window.gtag !== "function") return;
  if (!hasMarketingConsent()) return;
  const label = conversionLabel?.trim();
  if (!label) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...params,
  });
}

export function trackContactClick(type: ContactClickEvent) {
  if (typeof window.gtag !== "function") return;

  if (hasAnalyticsConsent()) {
    window.gtag("event", type, {
      send_to: GA_ID,
      page_location: window.location.href,
    });
  }

  const label =
    type === "phone_click"
      ? GOOGLE_ADS_CONVERSION_LABELS.phoneClick
      : GOOGLE_ADS_CONVERSION_LABELS.emailClick;

  if (label && hasMarketingConsent()) {
    trackGoogleAdsConversion(label);
  }
}

export function bindContactClickTracking() {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest("a[href]");
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const rawHref = (anchor.getAttribute("href") || "").trim();
    const lower = rawHref.toLowerCase();

    if (lower.startsWith("tel:")) {
      trackContactClick("phone_click");
    } else if (lower.startsWith("mailto:")) {
      trackContactClick("email_click");
    }
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
