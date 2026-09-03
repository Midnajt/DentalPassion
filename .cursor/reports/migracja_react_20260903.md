# Migracja na Vite + React (playbook)

Data: 3 września 2026

Strona działa teraz jako SPA w `client/` (Vite 8, React 19, TypeScript, Tailwind v4, shadcn, i18n PL/EN). Build zapisuje `dist/` w korzeniu; na FTP idzie zawartość tego katalogu.

Nawigacja jest hashowa (`#cennik`, `#/rodo`, `#blog/slug`). `.htaccess` zostawia 301 ze starych HTML/WordPress i zachowuje publiczny URL OG `/assets/images/og-image.png` oraz plik GSC.

GA4 `G-55QG7SQY7K` startuje w Consent Mode v2 jak wcześniej; po zgodzie i przy zmianie hash leci `page_view`. Stary generator HTML został usunięty.
