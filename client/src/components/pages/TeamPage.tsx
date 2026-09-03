import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { assets } from "@/config/assets";
import { teamSorted } from "@/data/team";
import { pick } from "@/lib/locale";
import { useHashView } from "@/lib/hash-view";
import { Reveal } from "@/components/motion/Reveal";
import { TeamGrid } from "@/components/sections/TeamGrid";

export function TeamPage() {
  const { t, i18n } = useTranslation();
  const { view } = useHashView();
  const lang = i18n.language;

  useEffect(() => {
    if (!view.memberId) return;
    const el = document.getElementById(view.memberId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view.memberId]);

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("teamPage.eyebrow")}</p>
          <h1>{t("teamPage.title")}</h1>
          <p>{t("teamPage.lead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <TeamGrid prefix="#zespol/" />
          </Reveal>
          {teamSorted.map((m) => (
            <Reveal as="article" className="team-detail" id={m.id} key={m.id}>
              <div className="team-detail__grid">
                <img
                  src={m.photo}
                  alt=""
                  width={200}
                  height={250}
                  style={{ borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}
                />
                <div>
                  <p className="team-member__role">{pick(m.role, lang)}</p>
                  <h2>{m.name}</h2>
                  {m.spec.pl ? <p className="team-detail__spec">{pick(m.spec, lang)}</p> : null}
                  {m.bio.pl ? <p className="team-detail__bio">{pick(m.bio, lang)}</p> : null}
                  <ul className="team-detail__links">
                    <li>
                      <a
                        className="team-detail__link"
                        href={m.facebook}
                        {...(m.facebook !== "#" ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                      >
                        <img src={assets.facebookIcon} alt="" width={20} height={20} decoding="async" />
                        <span>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="team-detail__link"
                        href={m.znanyLekarz}
                        {...(m.znanyLekarz !== "#" ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                      >
                        <img src={assets.znanyLekarzIcon} alt="" width={20} height={20} decoding="async" />
                        <span>znanylekarz.pl</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
