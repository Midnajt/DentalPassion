# dentalpassion

Wizytówka gabinetu stomatologii **dentalpassion** (Marcin Mazik) w Warszawie.

**Produkcja:** [dentalpassion.waw.pl](https://dentalpassion.waw.pl)

## Projekt komercyjny

To **projekt komercyjny** dla realnego klienta, nie demo kursowe ani portfolio-sandbox. Strona jest zamówiona i utrzymywana dla gabinetu dentalpassion; działa publicznie pod powyższym adresem. Zakres: SPA (home, o nas, zespół, cennik, blog, kontakt, RODO / prawa pacjenta / polityka prywatności), dwujęzyczność PL/EN, Consent Mode v2 + GA4, publikacja na hostingu klienta.

Brak backendu i bazy: kontakt wyłącznie przez `tel:` i `mailto:` (`client/src/config/site.ts`).

## Tech stack

| Warstwa | Technologia |
| --- | --- |
| Runtime UI | React 19, TypeScript (strict, `tsc -b` przed bundlem) |
| Bundler | Vite 8 (`root` = `client/`, `outDir` = `dist/` w korzeniu) |
| Style | Tailwind CSS v4, tokeny w `index.css` `:root` + lustro `theme.ts` |
| UI kit | shadcn/ui (New York), Radix Dialog/Slot, Lucide |
| i18n | i18next / react-i18next — PL (domyślny), EN; wybór w `localStorage` |
| Ruch | Framer Motion (reveal), CSS transitions na przyciskach |
| Nawigacja | hash (`#cennik`, `#/rodo`, `#blog/slug`) — bez React Router |
| Analityka | GA4, Consent Mode v2 |
| Hosting | pliki statyczne na FTP (Apache / cyberFolks, `public_html`) |
| Narzędzia | npm + `package-lock.json`, ESLint, vite-imagetools |
| Env | wyłącznie `import.meta.env.VITE_*` (patrz `.env.example`) |

## Struktura projektu

```
.
├── client/                      # źródło aplikacji (Vite root)
│   ├── index.html
│   ├── public/                  # kopiowane 1:1 do dist (.htaccess, OG, GSC)
│   ├── assets/                  # grafiki źródłowe + ASSETS.md
│   └── src/
│       ├── main.tsx             # bootstrap
│       ├── App.tsx              # widoki po hashu
│       ├── index.css            # tokeny + import stylów
│       ├── components/
│       │   ├── layout/          # Navbar, Footer, ConsentBanner, meta
│       │   ├── pages/           # home, o-nas, zespół, cennik, blog, kontakt, legal, 404
│       │   ├── sections/        # bloki wielokrotnego użytku
│       │   ├── motion/          # Reveal
│       │   └── ui/              # shadcn — bez dzikich zmian stylu
│       ├── config/              # site.ts, theme.ts, assets.ts
│       ├── data/                # cennik, zespół, blog, teksty prawne
│       ├── i18n/locales/        # pl.json, en.json
│       ├── lib/                 # hash-view, GA, locale
│       └── styles/              # base, components, pages
├── vite.config.ts
├── package.json
├── .env.example
├── dist/                        # wynik builda (gitignore) → FTP
└── README.md
```

Treść klienta: `site.ts`, `theme.ts`, `i18n/locales/`. Nowa strona = plik w `components/pages/`, montaż w `App.tsx`.

## Komendy

Z korzenia repo (Node 22):

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run lint
```

`npm run build` = `tsc -b && vite build`. Wynik ląduje w `dist/`.

## Publikacja

Wgraj **zawartość** `dist/` (w tym `.htaccess`) do `public_html`. Nie wrzucaj `node_modules/`, `client/`, `.cursor/` ani `.env`.
