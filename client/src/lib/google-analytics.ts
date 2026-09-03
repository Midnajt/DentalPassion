export const CONSENT_KEY = "dentalpassion-consent-v2";
export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-55QG7SQY7K";

export function grantAnalyticsConsent({ resendPageView = false } = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: "granted" });
  if (resendPageView) {
    window.gtag("event", "page_view");
  }
}

export function trackHashPageView(path: string) {
  if (typeof window.gtag !== "function") return;
  const stored = (() => {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  })();
  if (stored !== "accepted") return;
  window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
}

export function hasStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function storeConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, "accepted");
  } catch {
    /* ignore */
  }
}
