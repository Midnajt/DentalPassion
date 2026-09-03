import { useTranslation } from "react-i18next";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { HashLink } from "@/components/layout/HashLink";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCards } from "@/components/sections/BlogCards";
import { TeamGrid } from "@/components/sections/TeamGrid";

export function HomePage() {
  const { t } = useTranslation();
  const services = t("home.services", { returnObjects: true }) as string[];

  return (
    <main id="main">
      <section className="hero" aria-label={t("home.heroAria")}>
        <div className="hero__media" aria-hidden="true">
          <img src={assets.hero} alt="" width={2048} height={1365} />
          <div className="hero__overlay"></div>
        </div>
        <img className="hero__feathers" src={assets.feathers} alt="" width={240} height={240} aria-hidden="true" />
        <div className="hero__content">
          <img className="hero__brand" src={assets.logo} alt="dentalpassion" width={420} height={90} />
          <h1>{t("home.heroTitle")}</h1>
          <p className="hero__text">{t("home.heroText")}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={site.phoneHref}>
              {t("nav.book")}
            </a>
            <HashLink className="btn btn--light" to="#cennik">
              {t("home.seePricing")}
            </HashLink>
          </div>
        </div>
      </section>

      <section className="section" id="zakres">
        <div className="container services-layout">
          <Reveal>
            <p className="section__eyebrow">{t("home.careEyebrow")}</p>
            <h2>{t("home.careTitle")}</h2>
            <p className="section__lead">{t("home.careLead")}</p>
            <ul className="services-list">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ marginTop: "1.5rem" }}>{t("home.careNote")}</p>
          </Reveal>
          <Reveal className="services-layout__media">
            <img src={assets.portrait} alt={t("home.portraitAlt")} width={1122} height={1402} />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal style={{ marginBottom: "2rem" }}>
            <p className="section__eyebrow">{t("home.whyEyebrow")}</p>
            <h2>{t("home.whyTitle")}</h2>
          </Reveal>
          <div className="highlights">
            <Reveal as="article" className="highlight">
              <span className="highlight__mark" aria-hidden="true"></span>
              <h3>{t("home.h1Title")}</h3>
              <p>{t("home.h1Text")}</p>
            </Reveal>
            <Reveal as="article" className="highlight">
              <span className="highlight__mark" aria-hidden="true"></span>
              <h3>{t("home.h2Title")}</h3>
              <p>{t("home.h2Text")}</p>
            </Reveal>
            <Reveal as="article" className="highlight">
              <span className="highlight__mark" aria-hidden="true"></span>
              <h3>{t("home.h3Title")}</h3>
              <p>{t("home.h3Text")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="zespol">
        <div className="container">
          <Reveal
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "end",
            }}
          >
            <div>
              <p className="section__eyebrow">{t("home.teamEyebrow")}</p>
              <h2>{t("home.teamTitle")}</h2>
              <p className="section__lead">{t("home.teamLead")}</p>
            </div>
            <HashLink className="btn btn--ghost" to="#zespol">
              {t("home.fullTeam")}
            </HashLink>
          </Reveal>
          <Reveal>
            <TeamGrid />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="blog">
        <div className="container">
          <Reveal
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "end",
            }}
          >
            <div>
              <p className="section__eyebrow">{t("home.blogEyebrow")}</p>
              <h2>{t("home.blogTitle")}</h2>
              <p className="section__lead">{t("home.blogLead")}</p>
            </div>
            <HashLink className="btn btn--ghost" to="#blog">
              {t("home.allPosts")}
            </HashLink>
          </Reveal>
          <div className="blog-grid">
            <BlogCards limit={2} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h2>{t("home.ctaTitle")}</h2>
              <p>{t("home.ctaText")}</p>
            </div>
            <div className="cta-band__actions">
              <a className="btn btn--light" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
              <HashLink className="btn btn--ghost" to="#kontakt" style={{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }}>
                {t("home.ctaContact")}
              </HashLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
