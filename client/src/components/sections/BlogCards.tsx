import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blog";
import { pick } from "@/lib/locale";
import { HashLink } from "@/components/layout/HashLink";
import { Reveal } from "@/components/motion/Reveal";

export function BlogCards({ limit }: { limit?: number }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const posts = blogPosts.slice(0, limit ?? blogPosts.length);

  return (
    <>
      {posts.map((post) => {
        const isVideo = Boolean(post.video);
        return (
          <Reveal
            key={post.slug}
            as={HashLink}
            to={`#blog/${post.slug}`}
            className={`blog-card${isVideo ? " blog-card--video" : ""}`}
          >
            <span className="blog-card__media">
              <img src={post.cover} alt="" width={960} height={640} loading="lazy" />
              {isVideo ? <span className="blog-card__play" aria-hidden="true"></span> : null}
            </span>
            <span className="blog-card__body">
              <time className="blog-card__date" dateTime={post.date}>
                {pick(post.dateLabel, lang)}
              </time>
              <h3 className="blog-card__title">{pick(post.title, lang)}</h3>
              <p className="blog-card__excerpt">{pick(post.excerpt, lang)}</p>
              <span className="blog-card__more">{isVideo ? t("blogPage.watch") : t("blogPage.readMore")}</span>
            </span>
          </Reveal>
        );
      })}
    </>
  );
}
