import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { DocumentMeta } from "@/components/layout/DocumentMeta";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutPage } from "@/components/pages/AboutPage";
import { BlogPage } from "@/components/pages/BlogPage";
import { BlogPostPage } from "@/components/pages/BlogPostPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { HomePage } from "@/components/pages/HomePage";
import { PrivacyPage, RightsPage, RodoPage } from "@/components/pages/LegalPages";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { PricingPage } from "@/components/pages/PricingPage";
import { TeamPage } from "@/components/pages/TeamPage";
import { getBlogPost } from "@/data/blog";
import { pick } from "@/lib/locale";
import { hashPath, useHashView } from "@/lib/hash-view";
import { trackHashPageView } from "@/lib/google-analytics";

function CurrentView() {
  const { view } = useHashView();
  switch (view.name) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "team":
      return <TeamPage />;
    case "pricing":
      return <PricingPage />;
    case "blog":
      return <BlogPage />;
    case "blogPost":
      return <BlogPostPage slug={view.slug} />;
    case "contact":
      return <ContactPage />;
    case "rodo":
      return <RodoPage />;
    case "rights":
      return <RightsPage />;
    case "privacy":
      return <PrivacyPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const { view } = useHashView();
  const { i18n } = useTranslation();
  const post = view.name === "blogPost" && view.slug ? getBlogPost(view.slug) : undefined;
  const pageTitle = post ? `${pick(post.title, i18n.language)} — dentalpassion` : undefined;

  useEffect(() => {
    if (view.name === "team" && view.memberId) return;
    window.scrollTo(0, 0);
  }, [view.name, view.slug, view.memberId]);

  useEffect(() => {
    trackHashPageView(hashPath(view));
  }, [view]);

  return (
    <>
      <a className="skip-link" href="#main">
        {i18n.t("skip")}
      </a>
      <DocumentMeta view={view} pageTitle={pageTitle} />
      <Navbar hero={view.name === "home"} />
      <CurrentView />
      <Footer />
      <ConsentBanner />
    </>
  );
}
