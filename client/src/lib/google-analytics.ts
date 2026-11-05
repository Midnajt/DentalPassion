export const CONSENT_KEY = "dentalpassion-consent-v2";
export const CONSENT_OPEN_EVENT = "dentalpassion:open-consent";
export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-55QG7SQY7K";

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

export function readConsentPreferences(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    if (raw === "accepted") {
      // Wsteczna kompatybilność: wcześniejsza zgoda dotyczyła wyłącznie GA4,
      // nie przyznajemy automatycznie zgód reklamowych.
      return { analytics: true, marketing: false };
    }
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (typeof parsed === "object" && parsed !== null) {
      return {
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function hasSavedConsentDecision(): boolean {
  return readConsentPreferences() !== null;
}

export function hasAnalyticsConsent(): boolean {
  return readConsentPreferences()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readConsentPreferences()?.marketing === true;
}

export function hasStoredConsent(): boolean {
  return hasAnalyticsConsent();
}

export function storeConsentPreferences(prefs: ConsentPreferences) {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        analytics: Boolean(prefs.analytics),
        marketing: Boolean(prefs.marketing),
      }),
    );
  } catch {
    /* ignore */
  }
}

export function applyConsentPreferences(
  prefs: ConsentPreferences,
  {
    resendPageView = false,
    pagePath,
  }: {
    resendPageView?: boolean;
    pagePath?: string;
  } = {},
) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
  if (resendPageView && prefs.analytics) {
    window.gtag("event", "page_view", {
      send_to: GA_ID,
      page_path: pagePath ?? (window.location.hash ? `/${window.location.hash}` : "/"),
      page_location: window.location.href,
    });
  }
}

export function revokeConsentPreferences() {
  const denied: ConsentPreferences = { analytics: false, marketing: false };
  storeConsentPreferences(denied);
  applyConsentPreferences(denied);
}

export function openConsentBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

export function trackHashPageView(path: string) {
  if (typeof window.gtag !== "function") return;
  if (!hasAnalyticsConsent()) return;
  window.gtag("event", "page_view", {
    send_to: GA_ID,
    page_path: path,
    page_location: window.location.href,
  });
}
