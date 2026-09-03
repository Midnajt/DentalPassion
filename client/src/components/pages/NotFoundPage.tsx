import { useTranslation } from "react-i18next";
import { site } from "@/config/site";
import { HashLink } from "@/components/layout/HashLink";
import { Reveal } from "@/components/motion/Reveal";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("notFound.eyebrow")}</p>
          <h1>{t("notFound.title")}</h1>
          <p>{t("notFound.lead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="container prose">
          <p>{t("notFound.hint")}</p>
          <ul>
            <li>
              <HashLink to="#">{t("nav.home")}</HashLink>
            </li>
            <li>
              <HashLink to="#o-nas">{t("nav.about")}</HashLink>
            </li>
            <li>
              <HashLink to="#zespol">{t("nav.team")}</HashLink>
            </li>
            <li>
              <HashLink to="#cennik">{t("nav.pricing")}</HashLink>
            </li>
            <li>
              <HashLink to="#blog">{t("nav.blog")}</HashLink>
            </li>
            <li>
              <HashLink to="#kontakt">{t("nav.contact")}</HashLink>
            </li>
          </ul>
          <p style={{ marginTop: "2rem" }}>
            <a className="btn btn--primary" href={site.phoneHref}>
              {t("nav.book")}
            </a>{" "}
            <HashLink className="btn btn--ghost" to="#kontakt">
              {t("notFound.contactData")}
            </HashLink>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
