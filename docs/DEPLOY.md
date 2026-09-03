# Wdrożenie dentalpassion.waw.pl

## Ścieżka produkcji

1. `npm ci` (raz, lokalnie).
2. Ustawienia w `.env` według `.env.example` (`VITE_SITE_URL`, `VITE_GA_MEASUREMENT_ID`, `VITE_BASE=/`).
3. `npm run build` — TypeScript + Vite. Wynik: `dist/` w korzeniu repo.
4. `npm run preview` — kotwice, PL/EN, cennik, blog, RODO, baner zgody.
5. Wgraj **zawartość** `dist/` na FTP do `public_html` (nadpisz poprzednie pliki).
6. Twardy refresh domeny. Sprawdź `https://dentalpassion.waw.pl/assets/images/og-image.png` oraz plik GSC `googlecd3613b93d6cc0c9.html`.

Nie ma skryptu FTP w `package.json` — wrzut jest ręczny.

## Co musi być w `dist/`

- `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`
- `googlecd3613b93d6cc0c9.html` (Search Console)
- `assets/` (bundel + publiczne grafiki, w tym `assets/images/og-image.png`)

Nie wrzucaj: `node_modules/`, `client/`, `docs/`, `.cursor/`, `.env`, `src/`.

## Stare adresy

`.htaccess` przekierowuje 301:

- permalinki WordPress `/index.php/…`
- poprzednie pliki HTML (`/cennik.html`, `/rodo.html`, `blog-….html`) na hash SPA (`/#cennik`, `/#/rodo`, `/#blog/slug`)

Nieznane ścieżki idą na `/#/404`.

## Google Analytics

GA4 `G-55QG7SQY7K`, Consent Mode v2, klucz zgody `dentalpassion-consent-v2`.
Tag jest w `<head>` (`client/index.html`) z `analytics_storage: denied`.
Po akceptacji banera: `gtag('consent','update')` i dodatkowy `page_view` przy świeżej zgodzie.
Przy zmianie hash SPA: `page_view` z `page_path`.

## Uwaga

Stary generator `assets/scripts/generate-pages.mjs` został wyłączony. Źródłem jest `client/`.
