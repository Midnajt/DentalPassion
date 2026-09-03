import { useTranslation } from "react-i18next";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("about.eyebrow")}</p>
          <h1>{t("about.title")}</h1>
          <p>{t("about.lead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container about-split">
          <Reveal className="about-split__media">
            <img src={assets.portrait} alt={t("home.portraitAlt")} width={1122} height={1402} />
          </Reveal>
          <Reveal className="prose">
            <img className="feather-accent" src={assets.feathers} alt="" width={120} height={120} aria-hidden="true" />
            <p className="section__eyebrow">{t("about.role")}</p>
            <h2>{t("about.name")}</h2>
            <p>
              <strong>{t("about.spec")}</strong>
            </p>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p style={{ marginTop: "2rem" }}>
              <a className="btn btn--primary" href={site.phoneHref}>
                {t("nav.book")}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
