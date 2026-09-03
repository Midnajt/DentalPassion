import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCards } from "@/components/sections/BlogCards";

export function BlogPage() {
  const { t } = useTranslation();

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("blogPage.eyebrow")}</p>
          <h1>{t("blogPage.title")}</h1>
          <p>{t("blogPage.lead")}</p>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container blog-grid">
          <BlogCards />
        </div>
      </section>
    </main>
  );
}
