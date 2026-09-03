import { BookOpen, Brush, Droplets, Plus, ShieldPlus, Sparkles, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HashLink } from "@/components/layout/HashLink";
import { Reveal } from "@/components/motion/Reveal";

type PrevStep = { title: string; text: string };

const STEP_ICONS = [Waves, Sparkles, Droplets, BookOpen] as const;

function ToothCareMark() {
  return (
    <svg className="prevent-mark__svg" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="72" fill="currentColor" opacity="0.08" />
      <path
        d="M80 46c14 0 24 12 24 28 0 22-10 40-16 52-3 6-9 8-8 2 2-10-2-18-8-18s-10 8-8 18c1 6-5 4-8-2-6-12-16-30-16-52 0-16 10-28 24-28 6 0 10 3 16 3s10-3 16-3Z"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M38 58h84"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M46 50h12l4 16H50l-4-16Zm24 0h12l4 16H74l-4-16Zm24 0h12l4 16H98l-4-16Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M112 42h18a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PreventionSection() {
  const { t } = useTranslation();
  const stepsRaw = t("home.prevSteps", { returnObjects: true });
  const gainsRaw = t("home.prevGains", { returnObjects: true });
  const steps = Array.isArray(stepsRaw) ? (stepsRaw as PrevStep[]) : [];
  const gains = Array.isArray(gainsRaw) ? (gainsRaw as string[]) : [];

  return (
    <section className="section" id="profilaktyka" aria-labelledby="prevent-title">
      <div className="container">
        <div className="prevent-intro">
          <Reveal>
            <p className="section__eyebrow">{t("home.prevEyebrow")}</p>
            <h2 id="prevent-title">
              {t("home.prevTitle")} <em>{t("home.prevTitleAccent")}</em>
            </h2>
            <p className="section__lead">{t("home.prevLead")}</p>
            <HashLink className="btn btn--primary" to="#cennik">
              {t("home.prevCta")}
            </HashLink>
          </Reveal>
          <Reveal className="prevent-mark" aria-hidden="true">
            <ToothCareMark />
            <span className="prevent-mark__badge">
              <ShieldPlus size={22} strokeWidth={2.2} />
            </span>
          </Reveal>
        </div>

        <Reveal className="prevent-pack">
          <div className="prevent-pack__head">
            <span className="prevent-pack__icon" aria-hidden="true">
              <Brush size={22} strokeWidth={2.1} />
            </span>
            <div>
              <h3>{t("home.prevPackTitle")}</h3>
              <p>{t("home.prevPackLead")}</p>
            </div>
          </div>
          <ol className="prevent-steps">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Plus;
              return (
                <li key={step.title}>
                  <span className="prevent-steps__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="prevent-steps__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal className="prevent-gains">
          <h3>{t("home.prevGainsTitle")}</h3>
          <ul>
            {gains.map((item) => (
              <li key={item}>
                <Plus size={18} strokeWidth={2.4} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="prevent-why">
          <p className="prevent-why__eyebrow">{t("home.prevWhyEyebrow")}</p>
          <h3>{t("home.prevWhyTitle")}</h3>
          <p>{t("home.prevWhyText")}</p>
        </Reveal>
      </div>
    </section>
  );
}
