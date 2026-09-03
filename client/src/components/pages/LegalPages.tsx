import { useTranslation } from "react-i18next";
import { patientRights, privacyHtml, rodoHtml } from "@/data/legal";
import { pick } from "@/lib/locale";
import { Reveal } from "@/components/motion/Reveal";

function HtmlBlock({ html }: { html: string }) {
  return <div className="container prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function RodoPage() {
  const { t, i18n } = useTranslation();
  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <h1>{t("legal.rodoTitle")}</h1>
          <p>{t("legal.rodoLead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <HtmlBlock html={pick(rodoHtml, i18n.language)} />
      </section>
    </main>
  );
}

export function PrivacyPage() {
  const { t, i18n } = useTranslation();
  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <h1>{t("legal.privacyTitle")}</h1>
          <p>{t("legal.privacyLead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <HtmlBlock html={pick(privacyHtml, i18n.language)} />
      </section>
    </main>
  );
}

export function RightsPage() {
  const { t, i18n } = useTranslation();
  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <h1>{t("legal.rightsTitle")}</h1>
          <p>
            {t("legal.rightsLead")}{" "}
            <a href="https://www.gov.pl/web/rpp/" rel="noopener noreferrer" target="_blank">
              gov.pl/web/rpp
            </a>{" "}
            <a href="tel:800190590">800 190 590</a>
          </p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="container">
          <div className="accordion">
            {patientRights.map((item, index) => (
              <details key={item.title.pl} className="accordion__item">
                <summary className="accordion__summary">
                  <span className="accordion__title">{pick(item.title, i18n.language)}</span>
                  <span className="accordion__icon" aria-hidden="true"></span>
                </summary>
                <div className="accordion__panel" id={`prawa-panel-${index + 1}`}>
                  <div
                    className="accordion__panel-inner"
                    dangerouslySetInnerHTML={{ __html: pick(item.body, i18n.language) }}
                  />
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
