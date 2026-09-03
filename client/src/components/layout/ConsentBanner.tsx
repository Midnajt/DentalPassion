import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { grantAnalyticsConsent, hasStoredConsent, storeConsent } from "@/lib/google-analytics";
import { HashLink } from "./HashLink";

export function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (hasStoredConsent()) {
      grantAnalyticsConsent();
      setHidden(true);
      setVisible(false);
      return;
    }
    setHidden(false);
    const id = requestAnimationFrame(() => {
      setVisible(true);
      document.body.classList.add("has-consent-banner");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const accept = () => {
    if (!checked) return;
    storeConsent();
    grantAnalyticsConsent({ resendPageView: true });
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
          <label className="consent-banner__check">
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <span>{t("consent.check")}</span>
          </label>
        </div>
        <div className="consent-banner__actions">
          <button type="button" className="btn btn--primary" disabled={!checked} onClick={accept}>
            {t("consent.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
