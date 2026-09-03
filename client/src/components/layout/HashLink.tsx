import type { AnchorHTMLAttributes, ReactNode } from "react";

type HashLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

export function HashLink({ to, children, onClick, ...props }: HashLinkProps) {
  const href = to.startsWith("#") || to.startsWith("tel:") || to.startsWith("mailto:") || to.startsWith("http")
    ? to
    : `#${to}`;

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
}
