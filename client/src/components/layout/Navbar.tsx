import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { useHashView, type ViewName } from "@/lib/hash-view";
import { HashLink } from "./HashLink";

const NAV: { to: string; key: string; views: ViewName[] }[] = [
  { to: "#", key: "home", views: ["home"] },
  { to: "#o-nas", key: "about", views: ["about"] },
  { to: "#zespol", key: "team", views: ["team"] },
  { to: "#cennik", key: "pricing", views: ["pricing"] },
  { to: "#blog", key: "blog", views: ["blog", "blogPost"] },
  { to: "#kontakt", key: "contact", views: ["contact"] },
];

export function Navbar({ hero }: { hero?: boolean }) {
  const { t, i18n } = useTranslation();
  const { view } = useHashView();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [view]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${hero ? " site-header--hero" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <HashLink className="logo" to="#" aria-label={t("nav.logo")} onClick={close}>
          <img src={assets.logo} alt="dentalpassion" width={280} height={60} />
        </HashLink>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={t("nav.openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label={t("nav.main")}>
          <ul className="nav__list">
            {NAV.map((item) => (
              <li key={item.key}>
                <HashLink
                  to={item.to}
                  aria-current={item.views.includes(view.name) ? "page" : undefined}
                  onClick={close}
                >
                  {t(`nav.${item.key}`)}
                </HashLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="lang-switch"
            onClick={() => void i18n.changeLanguage(i18n.language.startsWith("en") ? "pl" : "en")}
          >
            {i18n.language.startsWith("en") ? "PL" : "EN"}
          </button>
          <a className="btn btn--primary" href={site.phoneHref} onClick={close}>
            {t("nav.book")}
          </a>
        </nav>
      </div>
    </header>
  );
}
