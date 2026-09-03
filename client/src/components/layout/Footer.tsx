import { useTranslation } from "react-i18next";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { HashLink } from "./HashLink";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assets.logo} alt="dentalpassion" width={240} height={52} />
          <p>{t("footer.blurb")}</p>
        </div>
        <div className="footer-col">
          <h3>{t("footer.menu")}</h3>
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
        </div>
        <div className="footer-col">
          <h3>{t("footer.info")}</h3>
          <ul>
            <li>
              <HashLink to="#/rodo">{t("footer.rodo")}</HashLink>
            </li>
            <li>
              <HashLink to="#/prawa-pacjenta">{t("footer.rights")}</HashLink>
            </li>
            <li>
              <HashLink to="#/polityka">{t("footer.privacy")}</HashLink>
            </li>
            <li>
              <a href={site.facebook} rel="noopener noreferrer" target="_blank">
                {t("footer.facebook")}
              </a>
            </li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <br />
            <a href={site.emailHref}>{site.email}</a>
            <br />
            {site.addressLine1}
            <br />
            {site.addressLine2}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="footer-bottom__meta">
          <span>
            &copy; {year} {t("footer.copy")}
          </span>
          <span>{t("footer.city")}</span>
        </div>
        <div className="footer-credits">
          <p>
            {t("footer.credits")}{" "}
            <a href={site.addPattern} rel="noopener noreferrer" target="_blank">
              addpattern.pl
            </a>
          </p>
          <p>
            {t("footer.stock")}{" "}
            <a href={site.pixabay} rel="noopener noreferrer" target="_blank">
              pixabay.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
