import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getBlogPost } from "@/data/blog";
import { pick } from "@/lib/locale";
import { HashLink } from "@/components/layout/HashLink";
import { Reveal } from "@/components/motion/Reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage({ slug }: { slug?: string }) {
  const { t, i18n } = useTranslation();
  const post = slug ? getBlogPost(slug) : undefined;
  const lang = i18n.language;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!post) return <NotFoundPage />;

  const images = post.images ?? [];
  const current = images[index];

  return (
    <main id="main">
      <article className={`blog-article${post.video ? " blog-article--with-video" : ""}`}>
        <header className="page-hero">
          <Reveal className="container">
            <p className="section__eyebrow">
              <HashLink to="#blog">{t("nav.blog")}</HashLink>
            </p>
            <h1>{pick(post.title, lang)}</h1>
            <p>
              <time dateTime={post.date}>{pick(post.dateLabel, lang)}</time>
            </p>
          </Reveal>
        </header>
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container blog-article__layout">
            <Reveal className="blog-article__content prose">
              {post.paragraphs.map((p) => (
                <p key={p.pl}>{pick(p, lang)}</p>
              ))}
              {post.links.length ? (
                <div className="blog-links">
                  <p className="blog-links__label">{t("blogPage.seeAlso")}</p>
                  <ul>
                    {post.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} rel="noopener noreferrer" target="_blank">
                          {pick(link.label, lang)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p style={{ marginTop: "2rem" }}>
                <HashLink className="btn btn--ghost" to="#blog">
                  {t("blogPage.back")}
                </HashLink>
              </p>
            </Reveal>
            {post.video ? (
              <Reveal as="aside" className="blog-video">
                <a className="blog-video__link" href={post.video.href} rel="noopener noreferrer" target="_blank">
                  <img src={post.video.poster} alt={`${pick(post.title, lang)}`} width={720} height={1280} loading="lazy" />
                  <span className="blog-video__play" aria-hidden="true"></span>
                  <span className="blog-video__caption">{pick(post.video.label, lang)}</span>
                </a>
              </Reveal>
            ) : images.length ? (
              <Reveal className="blog-gallery" aria-label={t("blogPage.gallery")}>
                {images.map((img, i) => (
                  <figure className="blog-gallery__item" key={img.src}>
                    <button
                      type="button"
                      className="blog-gallery__trigger"
                      aria-label={t("blogPage.zoom", { alt: pick(img.alt, lang) })}
                      onClick={() => {
                        setIndex(i);
                        setOpen(true);
                      }}
                    >
                      <img src={img.src} alt={pick(img.alt, lang)} width={1200} height={800} loading="lazy" />
                    </button>
                  </figure>
                ))}
              </Reveal>
            ) : null}
          </div>
        </section>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="lightbox is-open"
          aria-label={t("blogPage.lightbox")}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
            if (event.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
          }}
        >
          <DialogTitle>{t("blogPage.lightbox")}</DialogTitle>
          <button type="button" className="lightbox__close" aria-label={t("blogPage.close")} onClick={() => setOpen(false)}>
            ×
          </button>
          {images.length > 1 ? (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              aria-label={t("blogPage.prev")}
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            >
              ‹
            </button>
          ) : null}
          <figure className="lightbox__figure">
            {current ? <img className="lightbox__image" src={current.src} alt={pick(current.alt, lang)} /> : null}
            <figcaption className="lightbox__caption">{current ? pick(current.alt, lang) : ""}</figcaption>
          </figure>
          {images.length > 1 ? (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              aria-label={t("blogPage.next")}
              onClick={() => setIndex((i) => (i + 1) % images.length)}
            >
              ›
            </button>
          ) : null}
          <p className="lightbox__counter" aria-live="polite">
            {images.length ? `${index + 1} / ${images.length}` : ""}
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
