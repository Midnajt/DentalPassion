import { useTranslation } from "react-i18next";
import { site } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

export function ContactPage() {
  const { t } = useTranslation();

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("contact.eyebrow")}</p>
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.lead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-block" style={{ marginBottom: "2rem" }}>
              <h3>{t("contact.address")}</h3>
              <p>
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </p>
            </div>
            <div className="contact-block" style={{ marginBottom: "2rem" }}>
              <h3>{t("contact.contact")}</h3>
              <p>
                {t("contact.phone")} <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
              <p>
                {t("contact.email")} <a href={site.emailHref}>{site.email}</a>
              </p>
              <p style={{ marginTop: "1rem" }}>
                <a className="btn btn--primary" href={site.phoneHref}>
                  {t("nav.book")}
                </a>
              </p>
            </div>
            <div className="contact-block" style={{ marginBottom: "2rem" }}>
              <h3>{t("contact.hours")}</h3>
              <ul className="hours-list">
                {site.hours.map((row) => (
                  <li key={row.key}>
                    <span>{t(`contact.${row.key}`)}</span>
                    <span>{row.value === "closed" ? t("contact.closed") : row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-block">
              <h3>{t("contact.social")}</h3>
              <p>
                <a href={site.facebook} rel="noopener noreferrer" target="_blank">
                  {t("contact.fbLabel")}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal>
            <iframe
              className="map-embed"
              title={t("contact.mapTitle")}
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
