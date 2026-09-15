import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { normalizeHash, useHashView } from "@/lib/hash-view";

type HashLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function HashLink({ to, children, onClick, ...props }: HashLinkProps) {
  const { goTo } = useHashView();
  const href = to.startsWith("#") || to.startsWith("tel:") || to.startsWith("mailto:") || to.startsWith("http")
    ? to
    : `#${to}`;

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || isModifiedClick(event)) return;
        if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) return;
        if (normalizeHash(window.location.hash) !== normalizeHash(href)) return;
        event.preventDefault();
        goTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
