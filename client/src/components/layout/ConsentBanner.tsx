import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CONSENT_OPEN_EVENT,
  applyConsentPreferences,
  readConsentPreferences,
  storeConsentPreferences,
  type ConsentPreferences,
} from "@/lib/google-analytics";
import { HashLink } from "./HashLink";

export function ConsentBanner() {
  const { t } = useTranslation();
  const [initialPrefs] = useState<ConsentPreferences | null>(() => readConsentPreferences());
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(initialPrefs !== null);
  const [analytics, setAnalytics] = useState<boolean>(initialPrefs?.analytics ?? false);
  const [marketing, setMarketing] = useState<boolean>(initialPrefs?.marketing ?? false);

  useEffect(() => {
    if (initialPrefs !== null) {
      applyConsentPreferences(initialPrefs);
      return;
    }
    const id = requestAnimationFrame(() => {
      setVisible(true);
      document.body.classList.add("has-consent-banner");
    });
    return () => cancelAnimationFrame(id);
  }, [initialPrefs]);

  useEffect(() => {
    const onOpen = () => {
      const current = readConsentPreferences();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setHidden(false);
      requestAnimationFrame(() => {
        setVisible(true);
        document.body.classList.add("has-consent-banner");
      });
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const saveAndClose = (next: ConsentPreferences) => {
    const previous = readConsentPreferences();
    const newlyGrantedAnalytics = next.analytics && !previous?.analytics;
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    storeConsentPreferences(next);
    applyConsentPreferences(next, { resendPageView: newlyGrantedAnalytics });
    setVisible(false);
    document.body.classList.remove("has-consent-banner");
    window.setTimeout(() => setHidden(true), 400);
  };

  return (
    <div
      className={`consent-banner${visible ? " is-visible" : ""}`}
      hidden={hidden}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div className="consent-banner__inner">
        <div className="consent-banner__text">
          <p id="consent-title" className="consent-banner__title">
            {t("consent.title")}
          </p>
          <p id="consent-desc">
            {t("consent.body")}{" "}
            <HashLink to="#/rodo">{t("footer.rodo")}</HashLink>
            {" · "}
            <HashLink to="#/polityka">{t("footer.privacy")}</HashLink>
          </p>
          <div className="consent-banner__options">
            <label className="consent-banner__check">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>{t("consent.analyticsCheck")}</span>
            </label>
            <label className="consent-banner__check">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>{t("consent.marketingCheck")}</span>
            </label>
          </div>
        </div>
        <div className="consent-banner__actions">
          <button
            type="button"
            className="btn btn--ghost consent-banner__btn-secondary"
            onClick={() => saveAndClose({ analytics: false, marketing: false })}
          >
            {t("consent.rejectOptional")}
          </button>
          <button
            type="button"
            className="btn btn--ghost consent-banner__btn-secondary"
            onClick={() => saveAndClose({ analytics, marketing })}
          >
            {t("consent.saveSelected")}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => saveAndClose({ analytics: true, marketing: true })}
          >
            {t("consent.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
