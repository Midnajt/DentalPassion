import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ViewName =
  | "home"
  | "about"
  | "team"
  | "pricing"
  | "blog"
  | "blogPost"
  | "contact"
  | "rodo"
  | "rights"
  | "privacy"
  | "notFound";

export type HashView = {
  name: ViewName;
  slug?: string;
  memberId?: string;
};

const PAGE_HEADS = new Set([
  "o-nas",
  "zespol",
  "cennik",
  "blog",
  "kontakt",
  "rodo",
  "prawa-pacjenta",
  "polityka",
  "404",
]);

export function parseHash(raw: string): HashView {
  const trimmed = raw.replace(/^#/, "").replace(/^\//, "");
  if (!trimmed) return { name: "home" };

  if (trimmed.startsWith("blog-") && trimmed !== "blog") {
    return { name: "blogPost", slug: trimmed.slice(5) };
  }

  const [head, ...rest] = trimmed.split("/");
  const tail = rest.filter(Boolean);

  switch (head) {
    case "o-nas":
      return { name: "about" };
    case "zespol":
      return { name: "team", memberId: tail[0] };
    case "cennik":
      return { name: "pricing" };
    case "blog":
      return tail[0] ? { name: "blogPost", slug: tail[0] } : { name: "blog" };
    case "kontakt":
      return { name: "contact" };
    case "rodo":
      return { name: "rodo" };
    case "prawa-pacjenta":
      return { name: "rights" };
    case "polityka":
      return { name: "privacy" };
    case "404":
      return { name: "notFound" };
    default:
      if (!PAGE_HEADS.has(head)) return { name: "notFound" };
      return { name: "notFound" };
  }
}

export function viewHref(view: HashView): string {
  switch (view.name) {
    case "home":
      return "#";
    case "about":
      return "#o-nas";
    case "team":
      return view.memberId ? `#zespol/${view.memberId}` : "#zespol";
    case "pricing":
      return "#cennik";
    case "blog":
      return "#blog";
    case "blogPost":
      return view.slug ? `#blog/${view.slug}` : "#blog";
    case "contact":
      return "#kontakt";
    case "rodo":
      return "#/rodo";
    case "rights":
      return "#/prawa-pacjenta";
    case "privacy":
      return "#/polityka";
    case "notFound":
      return "#/404";
  }
}

export function hashPath(view: HashView): string {
  const href = viewHref(view);
  return href === "#" ? "/" : `/${href}`;
}

type HashViewContextValue = {
  view: HashView;
  goTo: (next: HashView | string) => void;
};

const HashViewContext = createContext<HashViewContextValue | null>(null);

export function HashViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<HashView>(() =>
    typeof window === "undefined" ? { name: "home" } : parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => setView(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goTo = useCallback((next: HashView | string) => {
    const href = typeof next === "string" ? (next.startsWith("#") ? next : `#${next}`) : viewHref(next);
    if (href === "#" || href === "") {
      if (window.location.hash) {
        window.location.hash = "";
      } else {
        setView({ name: "home" });
      }
      return;
    }
    window.location.hash = href.replace(/^#/, "");
  }, []);

  const value = useMemo(() => ({ view, goTo }), [view, goTo]);

  return <HashViewContext.Provider value={value}>{children}</HashViewContext.Provider>;
}

export function useHashView() {
  const ctx = useContext(HashViewContext);
  if (!ctx) throw new Error("useHashView must be used within HashViewProvider");
  return ctx;
}
