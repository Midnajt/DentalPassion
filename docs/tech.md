# Technologie i struktura — playbook do skopiowania

Dokument opisuje rozwiązania z repozytorium strony ślubnej (ewelinaiarkadiusz.pl). Da się je przenieść na inną wizytówkę SPA: ten sam stack, te same konwencje Cursora i ta sama ścieżka **build → `dist/` → FTP**.

To, co jest specyficzne dla wesela (treść, zdjęcia, kolory Boho), zostaw w tym repo. Do nowego projektu bierz **narzędzia, układ folderów i zasady pracy z agentem**.

---

## 1. Co to za aplikacja

Jednostronicowa wizytówka (SPA) bez backendu i bez bazy.

- Hosting: statyczne pliki na FTP (Apache z `.htaccess`).
- Nawigacja: kotwice `#sekcja`. Podstrony prawne: hash `#/rodo`, `#/polityka` (bez React Router).
- Kontakt: `tel:` i `mailto:` z pliku konfiguracji, nie formularz POST.
- Języki: PL (domyślny) i EN, `react-i18next`, wybór w `localStorage`.

`server/` jest pusty celowo. Nie stawiaj Expressa ani MySQL, dopóki nie ma takiego wymagania.

---

## 2. Stack

| Warstwa | Wybór | Uwagi |
| --- | --- | --- |
| Bundler | **Vite 8** | `root` to `client/`, wynik w `dist/` w korzeniu repo |
| UI | **React 19** + **TypeScript strict** | `tsc -b` przed bundlowaniem |
| Style | **Tailwind CSS v4** (`@tailwindcss/vite`) | tokeny w `index.css` `:root` + lustro w `theme.ts` |
| Komponenty | **shadcn/ui** (styl New York) | `components.json`, UI w `client/src/components/ui/` |
| Ikony | **lucide-react** | |
| Animacje | **Framer Motion** | profil w `client/src/lib/motion.ts` |
| i18n | **i18next** + **react-i18next** | `pl.json` / `en.json` |
| Zdjęcia | **vite-imagetools** | import `?as=picture` → AVIF/WebP + srcset |
| Karuzela | **Embla** (shadcn Carousel) | |
| Dialog / menu | **Radix** (Dialog, Sheet) | |
| Menedżer pakietów | **npm** | `package-lock.json` |
| Node w CI | **22** | `.github/workflows/pages.yml` |

Narzędzia deweloperskie: ESLint (typescript-eslint, react-hooks, react-refresh).

Zmienne w kodzie: wyłącznie `import.meta.env.VITE_*`. Wzór: `.env.example`. Plik `.env` jest w `.gitignore` — agent nie zgaduje sekretów.

Przykładowe zmienne:

- `VITE_BASE` — prefiks ścieżek przy hostowaniu w podkatalogu (np. GitHub Pages).
- `VITE_GA_MEASUREMENT_ID` — GA4 (`G-…`).

---

## 3. Drzewo repozytorium

```
.
├── .cursor/                 # zasady agenta + dziennik prac (kopiuj do nowego projektu)
│   ├── rules/               # *.mdc — Cursor Rules
│   └── reports/             # krótkie notatki po zmianach
├── .github/workflows/       # opcjonalnie: Pages; produkcja główna to FTP
├── client/                  # jedyne źródło aplikacji
│   ├── assets/              # oryginały zdjęć i logo (importowane w kodzie)
│   ├── public/              # pliki kopiowane 1:1 do dist/ (favicon, OG, .htaccess)
│   ├── index.html           # SEO, OG, fonty
│   └── src/                 # aplikacja
├── docs/                    # dokumentacja (ten plik)
├── dist/                    # WYNIK BUILD — to idzie na FTP (gitignore)
├── server/                  # pusty placeholder; nie wymagany
├── scripts/                 # np. generowanie og-image (jeśli jest)
├── components.json          # shadcn
├── vite.config.ts
├── tsconfig.json            # project references
├── tsconfig.app.json        # aplikacja, alias @/*
├── tsconfig.node.json       # vite.config.ts
├── eslint.config.js
├── package.json
└── .env.example
```

Vite ma `root: client/`, więc `npm run dev` serwuje `client/index.html`. Alias `@/` → `client/src`.

---

## 4. Folder `.cursor` — jak pracuje agent

To nie jest kod produkcyjny. To **pamięć i reguły** dla Cursora. Skopiuj cały `.cursor/` do nowego repo, potem zmień cel w `shared.mdc`.

### 4.1 `rules/` (Cursor Rules, pliki `.mdc`)

| Plik | `alwaysApply` | Kiedy działa | Po co |
| --- | --- | --- | --- |
| `shared.mdc` | tak | zawsze | cel projektu, stack, FTP, i18n, raporty, `.env`, „Ostatnie zadania” |
| `frontend.mdc` | nie | glob `client/**` | SPA, kotwice, shadcn, SEO, brak formularza POST |
| `theme.mdc` | nie | glob `client/src/config/**` | kolory w `theme.ts` + `index.css`, treść w `site.ts` i locale |
| `backend.mdc` | nie | glob `server/**` | nie stawaj serwera sam z siebie |
| `db.mdc` | nie | na żądanie | nie dodawaj MySQL / dumpów |

Konwencje warte przeniesienia:

- Komunikacja z człowiekiem **po polsku**, identyfikatory w kodzie **po angielsku**.
- Treść klienta: `site.ts`, `theme.ts`, `i18n/locales/`. Grafiki: najpierw `client/assets/ASSETS.md`.
- Po skończonej pracy agent dopisuje w `shared.mdc` trzy zdania pod `Ostatnie zadania:` — kontekst na kolejną sesję.
- Nie commituj `.env`. Nie zgaduj zmiennych.

Nagłówek typowego rule:

```yaml
---
description: Krótko, po co jest ten plik
globs: client/**          # opcjonalnie; shared nie ma globa
alwaysApply: true         # tylko shared
---
```

W nowym projekcie zmień blok **Cel** w `shared.mdc` (domena, para / firma). Resztę stacku zostaw.

### 4.2 `reports/` — dziennik zmian

Każdy raport, podsumowanie albo plan: `.cursor/reports/temat_YYYYMMDD.md`.

Przykłady z tego repo: `niezbednik_nocleg_20260901.md`, `kotwice_slub_wesele_20260901.md`, `google_analytics_20260826.md`.

Po co to jest:

- Agent i człowiek wracają do decyzji bez grzebania w całym gicie.
- Raporty **nie idą na FTP** — zostają w repo źródłowym.
- Format: krótko (kilka zdań), pliki których dotyczy zmiana, bez lania wody.

Nie kopiuj starych raportów wesela do nowego klienta. Skopiuj **konwencję nazewnictwa** i pusty folder `reports/`.

### 4.3 `.cursorignore`

Ogranicza indeksowanie Cursora (`node_modules`, `.env`, sekrety, dumpy). Osobno od `.gitignore`.

---

## 5. `client/src` — układ kodu

```
client/src/
├── main.tsx                 # i18n, CSS, HashViewProvider, GA
├── App.tsx                  # skład one-pagera + widoki prawne
├── index.css                # Tailwind v4, tokeny :root
├── vite-env.d.ts            # VITE_* oraz ?as=picture
├── config/
│   ├── site.ts              # telefony, adresy, mapy, daty
│   ├── theme.ts             # kolory / fonty (zgodne z CSS)
│   └── assets.ts            # importy zdjęć, object-position
├── i18n/
│   ├── index.ts
│   └── locales/pl.json, en.json
├── components/
│   ├── layout/              # Navbar, Footer, Section, Container
│   ├── sections/            # Hero, EventCards, Contact, …
│   ├── legal/               # RODO, polityka, cookies
│   ├── motion/              # Reveal, Stagger
│   └── ui/                  # shadcn (nie edytuj stylu „na dziko”)
└── lib/
    ├── utils.ts             # cn()
    ├── hash-view.tsx        # home | rodo | privacy
    ├── scroll-to-section.ts # kotwice + offset sticky nav
    ├── motion.ts
    ├── calendar.ts          # .ics
    └── google-analytics.ts
```

Nowa sekcja = nowy plik w `components/sections/`, montaż w `App.tsx` (albo zakomentowanie, gdy sekcja ma poczekać).

Sekcje współdzielą `Section` + `SectionHeader` + `Container` (`max-w-6xl`). Kotwica = `id` na `<section>` (np. `#kontakt`).

---

## 6. Routing bez React Router

`HashViewProvider` czyta `window.location.hash`:

| Hash | Widok |
| --- | --- |
| (pusty) lub `#slub`, `#kontakt`, … | strona główna, potem scroll do sekcji |
| `#/rodo` lub `#rodo` | strona RODO |
| `#/polityka` | polityka prywatności |

Scroll do kotwic: `scroll-padding-top` w CSS (sticky navbar ~`h-16`) oraz `goToNavHash` / `scrollToNavHash` — menu mobilne (Sheet) zamyka się, potem następuje scroll, żeby Radix nie zjadał skoku.

Na Apache w `client/public/.htaccess` jest fallback do `index.html` (gdyby ktoś wszedł w ścieżkę bez hasha). Na FTP ten plik ląduje w korzeniu `dist/`.

---

## 7. Treść, motyw, grafiki

- **Teksty UI** — `i18n/locales`. Nie twórz zdań na sztywno w JSX, jeśli mają być dwujęzyczne.
- **Fakty** (godziny, telefony, linki map) — `config/site.ts`, interpolacja w i18n (`{{from}}`).
- **Kolory** — zmiana w **dwóch** miejscach: `theme.ts` i `:root` w `index.css`.
- **Zdjęcia** — `client/assets/` + katalog w `ASSETS.md`. Import:

```ts
import hero from "../../assets/hero.png?as=picture";
```

`vite-imagetools` przy `?as=picture` robi formaty `avif;webp`, jakość 82, szerokości 800 / 1280 / 1920. Logo importuj `?url` (bez konwersji).

Kadr: `objectPosition` / `objectPositionMobile` w `assets.ts`. Komponent `ResponsivePhoto` przełącza mobile przy `max-width: 767px`.

`client/public/` (nie mylić z `assets/`):

- favicon, `apple-touch-icon`
- `images/og-image.png` (1200×630) — meta `og:image` w `index.html` musi wskazywać **absolutny** URL na produkcji
- `.htaccess`

OG nie zadziała, jeśli pliku nie ma w `public/images/` (Vite skopiuje go do `dist/images/`).

---

## 8. Jak powstają pliki na produkcję (FTP)

To jest jedyna ścieżka publikacji uzgodniona w rules: **ręczny wrzut `dist/`**. Nie ma skryptu FTP w `package.json` (celowo).

### 8.1 Komendy

Z **korzenia** repo:

```bash
npm ci          # lub npm install — raz, lokalnie
npm run dev     # podgląd, Vite z root=client
npm run build   # to, co idzie na serwer
npm run preview # lokalny test zawartości dist/
```

`npm run build` = `tsc -b && vite build`.

1. TypeScript sprawdza `client/src` (strict, bez emit).
2. Vite czyta `client/index.html` jako wejście.
3. Bundluje JS/CSS, przetwarza importy `?as=picture`.
4. Kopiuje `client/public/**` do `dist/` (`.htaccess`, favicon, `images/og-image.png`).
5. Czyści poprzedni `dist/` (`emptyOutDir: true`).
6. Zapisuje wynik w `dist/` w korzeniu (nie w `client/dist`).

`assetsInlineLimit: 0` — obrazki jako osobne pliki, nie base64.

`base` w Vite = `VITE_BASE` albo `/`. Na zwykłym FTP z domeną w korzeniu zostaw `/`. W podkatalogu ustaw `VITE_BASE=/nazwa/`.

### 8.2 Co wrzucasz na FTP

**Całą zawartość `dist/`**, nie folder `dist` jako jedyny katalog-opakowanie (chyba że hosting tak wymaga). Typowo:

```
dist/
├── index.html
├── .htaccess
├── favicon.ico
├── favicon.svg
├── assets/          # zahashowane js/css/webp/avif z builda
└── images/          # og-image.png
```

Nadpisz poprzednie pliki na serwerze. `index.html` ma nowe nazwy chunków — stary `assets/` bez aktualnego HTML da białe strony.

Nie wrzucaj: `node_modules/`, `client/`, `.cursor/`, `.env`, `src/`.

### 8.3 Inny kanał (opcjonalny)

`.github/workflows/pages.yml` buduje to samo `npm run build` i wgrywa `dist` na GitHub Pages (`VITE_BASE` pod ścieżkę repo). To **nie zastępuje** FTP z rules — to zapas / preview.

---

## 9. Jak przenieść to do nowego projektu

1. Skopiuj szkielet: `package.json` (zależności), `vite.config.ts`, tsconfigi, `eslint.config.js`, `components.json`, `client/src` bez treści klienta.
2. Skopiuj `.cursor/rules/` i pusty `.cursor/reports/`. Podmień cel w `shared.mdc`.
3. Skopiuj ten plik do `docs/`.
4. Wyczyść `site.ts`, locale, `assets.ts`, `index.html` (tytuł, OG URL).
5. Wrzuć grafiki do `client/assets/` i opisz je w `ASSETS.md`.
6. `npm install` → `npm run build` → wrzuć `dist/` na FTP.

Sekcje, których nie potrzebujesz, zostaw w kodzie i zakomentuj import w `App.tsx` (tak jest z galerią, sliderem, RSVP).

---

## 10. Czego nie robić (świadome ograniczenia)

- Nie dodawaj backendu, ORM ani Dockera z MySQL „na zapas”.
- Nie commituj `.env`, dumpów SQL, kluczy.
- Nie rozrzucaj hexów w komponentach.
- Nie dodawaj skryptu wrzucającego na FTP, dopóki nie poprosisz.
- Nie używaj React Router, dopóki hash + `.htaccess` wystarczają.

---

## 11. Szybka checklista nowego deploya

1. Treść i zdjęcia zaktualizowane.
2. `og:image` istnieje w `client/public/images/` i URL w `index.html` jest absolutny.
3. `npm run build` przechodzi (`tsc` + Vite).
4. `npm run preview` — kotwice, PL/EN, mapy, RODO.
5. Wgranie **zawartości** `dist/` na FTP.
6. Po wrzuceniu: otwórz domenę, twardy refresh, sprawdź `https://domena/images/og-image.png`.
