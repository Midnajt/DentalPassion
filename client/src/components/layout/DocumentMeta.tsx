import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { hashPath, type HashView } from "@/lib/hash-view";
import { site } from "@/config/site";

const META: Record<string, { title: string; desc: string }> = {
  home: { title: "meta.homeTitle", desc: "meta.homeDesc" },
  about: { title: "meta.aboutTitle", desc: "meta.aboutDesc" },
  team: { title: "meta.teamTitle", desc: "meta.teamDesc" },
  pricing: { title: "meta.pricingTitle", desc: "meta.pricingDesc" },
  blog: { title: "meta.blogTitle", desc: "meta.blogDesc" },
  blogPost: { title: "meta.blogTitle", desc: "meta.blogDesc" },
  contact: { title: "meta.contactTitle", desc: "meta.contactDesc" },
  rodo: { title: "meta.rodoTitle", desc: "meta.rodoDesc" },
  rights: { title: "meta.rightsTitle", desc: "meta.rightsDesc" },
  privacy: { title: "meta.privacyTitle", desc: "meta.privacyDesc" },
  notFound: { title: "meta.notFoundTitle", desc: "meta.notFoundDesc" },
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function DocumentMeta({ view, pageTitle }: { view: HashView; pageTitle?: string }) {
  const { t, i18n } = useTranslation();
  const keys = META[view.name] ?? META.home;
  const title = pageTitle ?? t(keys.title);
  const description = t(keys.desc);
  const url = `${site.url}${hashPath(view) === "/" ? "/" : hashPath(view)}`;

  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:locale", i18n.language.startsWith("en") ? "en_GB" : "pl_PL", "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (view.name === "notFound") {
      canonical?.remove();
      setMeta("robots", "noindex,follow");
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, url, i18n.language, view.name]);

  return null;
}
