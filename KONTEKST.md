# dentalpassion — kontekst projektu

Brief dla kolejnej sesji. Produkcja: https://dentalpassion.waw.pl. Projekt komercyjny (gabinet stomatologii, Marcin Mazik, Warszawa), nie demo.

Jednostronicowa aplikacja SPA, **bez backendu, bez bazy, bez formularza POST**. Kontakt tylko `tel:` i `mailto:` z `client/src/config/site.ts`.

Z człowiekiem po polsku. Identyfikatory w kodzie po angielsku.

## Czego nie robić

- Nie wrzucać nic na FTP bez wyraźnej zgody. Publikacja to osobna decyzja człowieka.
- Nie dodawać skryptu FTP, Expressa ani MySQL.
- Nie committować `.env`. Nie zgadywać sekretów. Zmienne wyłącznie `import.meta.env.VITE_*`.
- Nie dopisywać React Routera, dopóki hash i `.htaccess` wystarczają.
- Nie rozrzucać hexów w komponentach. Kolory i fonty zmieniać w **dwóch** miejscach: `client/src/config/theme.ts` i `:root` w `client/src/index.css`.
- Komponenty shadcn (New York) w `client/src/components/ui/` — nie przerabiać ich stylu „na dziko”.
- Nie zmieniać publicznego URL obrazka Open Graph: `/assets/images/og-image.png`.
- Nie usuwać pliku weryfikacji Google Search Console (opis niżej).
- Katalog `assets/` w korzeniu repo (stare CSS/JS/JSON) to pozostałość sprzed migracji na React. Źródłem aplikacji jest wyłącznie `client/`.

## Stack

| Warstwa | Technologia |
| --- | --- |
| UI | React 19, TypeScript strict (`tsc -b` przed bundlem) |
| Bundler | Vite 8. `root` = `client/`, `outDir` = `dist/` w korzeniu, `assetsInlineLimit: 0` |
| Style | Tailwind CSS v4 (`@tailwindcss/vite`) + własne CSS w `client/src/styles/` (`base.css`, `components.css`, `pages.css`) |
| Tokeny | CSS variables w `:root` i lustro w `theme.ts` (fiolet `#8e2390`, mięta, fonty Fraunces + Outfit) |
| UI kit | shadcn/ui New York, Radix Dialog i Slot, `class-variance-authority`, `clsx`, `tailwind-merge`, ikony Lucide |
| i18n | i18next + react-i18next. PL domyślny, EN. Klucz `localStorage`: `dentalpassion-lang` |
| Ruch | Framer Motion (komponent `Reveal`), CSS transitions na przyciskach |
| Obrazki | `vite-imagetools`; importy `?url` w `client/src/config/assets.ts` |
| Lint | ESLint 10 |
| Node | 22 w CI. npm + `package-lock.json` |
| Hosting | pliki statyczne, Apache na cyberFolks, katalog `public_html` |

Alias `@/` → `client/src`.

## Komendy

Z korzenia repo:

```bash
npm ci
npm run dev       # Vite
npm run build     # tsc -b && vite build → dist/
npm run preview
npm run lint
```

Publikacja (tylko po zgodzie): wgrać **zawartość** `dist/` (razem z `.htaccess`) do `public_html`. Nie wrzucać `node_modules/`, `client/`, `.cursor/` ani `.env`.

## Zmienne środowiskowe (`.env.example`)

```
VITE_BASE=/
VITE_GA_MEASUREMENT_ID=G-55QG7SQY7K
VITE_GOOGLE_ADS_ID=AW-18539018005
VITE_GOOGLE_ADS_PHONE_CONVERSION_LABEL=
VITE_GOOGLE_ADS_EMAIL_CONVERSION_LABEL=
VITE_SITE_URL=https://dentalpassion.waw.pl
```

`VITE_SITE_URL` zasila kanoniczne URL-e, sitemapę i `robots.txt` (plugin `seoFilesPlugin` w `vite.config.ts`). `VITE_GA_MEASUREMENT_ID` jest czytane w `client/src/lib/google-analytics.ts` z fallbackiem na `G-55QG7SQY7K`. `VITE_GOOGLE_ADS_ID` jest czytane w `client/src/lib/google-ads.ts` z fallbackiem na `AW-18539018005`. Skrypt w `client/index.html` ma oba identyfikatory **na sztywno** — zmiana ID wymaga obu miejsc. Etykiety konwersji (`VITE_GOOGLE_ADS_PHONE_CONVERSION_LABEL`, `VITE_GOOGLE_ADS_EMAIL_CONVERSION_LABEL`) są opcjonalne i puste do czasu utworzenia akcji konwersji w panelu Google Ads.

## Nawigacja (hash, bez React Routera)

Parser: `client/src/lib/hash-view.tsx`. Montaż widoków: `client/src/App.tsx`.

| Hash | Widok |
| --- | --- |
| `#` / pusto | home |
| `#o-nas` | o nas |
| `#zespol` i `#zespol/{id}` | zespół i profil członka |
| `#cennik` | cennik |
| `#blog` i `#blog/{slug}` | lista i wpis (stary alias `#blog-{slug}` też działa) |
| `#kontakt` | kontakt |
| `#/rodo` | informacja RODO |
| `#/prawa-pacjenta` | prawa pacjenta |
| `#/polityka` | polityka prywatności |
| `#/404` | 404 |

Nowa strona = plik w `client/src/components/pages/` (albo sekcja w `components/sections/`) i gałąź w `App.tsx` plus wpis w parserze hasha. Kotwica w obrębie widoku = `id` na elemencie. Linki wewnętrzne przez `HashLink`, nie `<a href>` na ślepo.

`client/public/.htaccess` (Apache, `mod_rewrite`):

- wymusza HTTPS (wyjątek `/.well-known/` dla Let's Encrypt),
- 301 ze starych permalinków WordPress / HTML (`o-nas.html`, `index.php/cennik`, `polityka-prywatnosci` itd.) na hashe SPA,
- istniejące pliki serwuje wprost,
- nieznana ścieżka → `/#/404`,
- `ErrorDocument 404 /index.html`.

## Tagi Google — Analytics, Ads, Search Console

To jest stan **kodu**, nie panelu Google.

### Google Analytics 4 — jest wpięte

- Measurement ID: **`G-55QG7SQY7K`**.
- Ładowane globalnym tagiem gtag (nie ma osobnego kontenera Google Tag Manager `GTM-…`).
- Miejsce: inline script + `https://www.googletagmanager.com/gtag/js?id=G-55QG7SQY7K` w `client/index.html`.
- Logika zgody i `page_view`: `client/src/lib/google-analytics.ts`.
- Baner: `client/src/components/layout/ConsentBanner.tsx`.
- Przy zmianie hasha `App.tsx` woła `trackHashPageView` (SPA nie przeładowuje dokumentu, więc widoki trzeba wysyłać ręcznie).

### Google Ads — jest wpięte (`AW-18539018005`)

- Google Ads ID: **`AW-18539018005`**.
- W `client/index.html` wywoływane jest `gtag("config", "AW-18539018005")` na tym samym skrypcie `gtag.js` co GA4 (bez duplikacji skryptu).
- Obsługa kliknięć i konwersji: `client/src/lib/google-ads.ts`.
- Delegowany listener `bindContactClickTracking()` (montowany w `App.tsx`) śledzi kliknięcia we wszystkie linki `<a href="tel:...">` jako zdarzenie `phone_click` oraz `<a href="mailto:...">` jako `email_click` (wysyłane do GA4 po zgodzie analitycznej, bez parametrów `link_url` i `contact_target`, aby nie przekazywać numerów telefonów ani adresów e-mail).
- Funkcja `trackGoogleAdsConversion(conversionLabel, params)` wysyła `gtag("event", "conversion", { send_to: "AW-18539018005/ETYKIETA" })` wyłącznie po wyrażeniu zgody reklamowej (`marketing: true`) oraz gdy podano niepustą etykietę (`VITE_GOOGLE_ADS_PHONE_CONVERSION_LABEL` / `VITE_GOOGLE_ADS_EMAIL_CONVERSION_LABEL`). Bez etykiety zdarzenie `conversion` nie jest wysyłane (brak fikcyjnych etykiet).

### Consent Mode v2 — jak działa

- W `client/index.html`, **zanim** załaduje się `gtag.js`, domyślnie:

```js
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500,
});
gtag("js", new Date());
gtag("config", "G-55QG7SQY7K");
gtag("config", "AW-18539018005");
```

- Klucz w `localStorage`: `dentalpassion-consent-v2` (JSON `{"analytics": boolean, "marketing": boolean}`; stary string `"accepted"` jest mapowany na `{"analytics": true, "marketing": false}`, by nie włączać automatycznie zgody reklamowej).
- Przed zgodą GA4 i Google Ads działają w trybie ograniczonym: brak cookies analitycznych i reklamowych; do Google idą tylko zanonimizowane sygnały Consent Mode.
- Baner (`ConsentBanner.tsx`) posiada dwa niezależne checkboxy: **Analityczne (Google Analytics)** oraz **Reklamowe (Google Ads)** i trzy akcje: „Tylko niezbędne”, „Zapisz wybór”, „Akceptuj wszystkie”.
- `applyConsentPreferences` ustawia `analytics_storage` na podstawie wyboru analitycznego, a `ad_storage`, `ad_user_data` i `ad_personalization` wyłącznie na podstawie wyboru reklamowego.
- Zmiana lub wycofanie zgody: przycisk **„Ustawienia cookies”** w stopce strony (`Footer.tsx` → `openConsentBanner()`) w każdej chwili ponownie otwiera baner i pozwala odznaczyć lub odrzucić zgody (co wywołuje `gtag("consent", "update", ...)` ze statusem `"denied"`).
- Tekst banera (PL/EN) informuje o Google Analytics i Google Ads (`client/src/i18n/locales/pl.json` i `en.json`, `consent.*`).
- Polityka prywatności (`client/src/data/legal.ts`) opisuje GA4, Google Ads, Consent Mode v2 i brak łączenia statystyk z dokumentacją medyczną.

### Google Search Console

- Plik weryfikacyjny: `client/public/googlecd3613b93d6cc0c9.html` (kopia też w korzeniu repo). Vite kopiuje `client/public/` 1:1 do `dist/`. Adres produkcyjny: `https://dentalpassion.waw.pl/googlecd3613b93d6cc0c9.html`. Nie zmieniać nazwy.

### Inne usługi Google (to nie są tagi Ads/Analytics)

- **Google Fonts**: Fraunces i Outfit, `<link>` w `client/index.html`.
- **Google Maps**: iframe na stronie Kontakt, URL w `site.mapEmbed` (Ostrobramska 126, Warszawa).
- Brak Google Tag Managera jako kontenera. Biblioteka `gtag.js` jest serwowana z domeny `googletagmanager.com` — to standardowy loader GA4, nie wdrożony kontener GTM.

## SEO

- Domyślne title, description, canonical, Open Graph i Twitter Card są w `client/index.html`.
- Po zmianie widoku `DocumentMeta` podmienia title, description, `og:*`, `twitter:*`, canonical i `og:locale` (`pl_PL` / `en_GB`). Widok 404 dostaje `noindex,follow` i traci canonical.
- `og:image` to absolutny URL `https://dentalpassion.waw.pl/assets/images/og-image.png` (1200×630). Zostawić ten path.
- Build generuje `sitemap.xml` i `robots.txt` z listy `HASH_PAGES` w `vite.config.ts`. Nowy publiczny hash (np. nowy wpis bloga) trzeba dopisać do tej listy, inaczej nie wejdzie do sitemapy.

## Treść i dane

Fakty kontaktowe tylko w `client/src/config/site.ts` (telefon `501 430 894`, `kontakt@dentalpassion.waw.pl`, ul. Ostrobramska 126/lok U14, 04-026 Warszawa, godziny pn–pt 10:00–20:00, sb–nd nieczynne, Facebook, mapa). W tłumaczeniach interpolacja `{{phone}}` itd., nie twarde stringi w JSX.

| Plik | Co trzyma |
| --- | --- |
| `client/src/config/site.ts` | telefon, mail, adres, mapa, godziny, social |
| `client/src/config/theme.ts` | kolory i fonty (lustro CSS) |
| `client/src/config/assets.ts` | ścieżki grafik |
| `client/src/i18n/locales/pl.json`, `en.json` | UI, meta, baner |
| `client/src/data/team.ts` | zespół |
| `client/src/data/cennik.ts` | cennik (grupy PL/EN, ceny jako string, np. `120 zł`) |
| `client/src/data/blog.ts` | wpisy |
| `client/src/data/legal.ts` | RODO, prawa pacjenta, polityka (HTML w stringach, PL i EN) |
| `client/assets/ASSETS.md` | inwentarz grafik — czytać przed dodaniem zdjęcia |

Zespół (`#zespol/{id}`), lekarz prowadzący Marcin Mazik zawsze pierwszy, reszta lekarzy alfabetycznie, potem higiena:

- `marcin-mazik` — protetyka, estetyka, stawy skroniowo-żuchwowe
- `marcin-kucharski` — ortodoncja (placeholder zdjęcia)
- `wiktor-poczobutt` — chirurgia, implantologia, protetyka
- `katarzyna-cichon` — chirurgia, endodoncja (placeholder)
- `agnieszka-fundakowska` — zachowawcza, dzieci; zdjęcie `agnieszka_fundowska.png`
- `karina-kuczynska` — endodoncja, zachowawcza (placeholder)
- `stella-stepniewska` — zachowawcza, endo mikroskopowa, dzieci, estetyka/protetyka; języki PL/EN/ES
- `anna-karwacka-oneczka` — higienistka (`group: "hygiene"`)

Blog (`#blog/{slug}`):

- `wloska-szkola-stomatologii-posturalnej-2026`
- `seeking-occlusion-madrid`
- `profesjonalna-higienizacja`

Cennik: konsultacje, znieczulenie, higiena i profilaktyka, zachowawcza i estetyczna, endodoncja, protetyka, wybielanie, chirurgia, implantologia, diagnostyka.

## Grafiki

- Źródła importowane przez Vite: `client/assets/` → `assets.ts`.
- Pliki statyczne kopiowane 1:1: `client/public/` (`.htaccess`, plik GSC, favicony, `og-image.png`, część zdjęć).
- Favicony i OG są podlinkowane w `index.html` jako `/assets/images/…`, więc muszą zostać w `public`.

## Struktura źródła

```
client/
  index.html                 # head, gtag + Consent Mode, fonty, meta
  public/                    # .htaccess, GSC, OG, favicon
  assets/                    # grafiki źródłowe + ASSETS.md
  src/
    main.tsx                 # StrictMode + HashViewProvider
    App.tsx                  # widok po hashu, scroll, page_view
    index.css                # tokeny + import stylów
    components/layout/       # Navbar, Footer, ConsentBanner, DocumentMeta, HashLink
    components/pages/        # Home, About, Team, Pricing, Blog, BlogPost, Contact, Legal, 404
    components/sections/     # m.in. TeamGrid, BlogCards, PreventionSection
    components/motion/       # Reveal
    components/ui/           # shadcn
    config/                  # site.ts, theme.ts, assets.ts
    data/                    # team, cennik, blog, legal
    i18n/                    # index.ts, locales/pl.json, locales/en.json
    lib/                     # hash-view, google-analytics, locale, motion, utils
    styles/                  # base, components, pages
vite.config.ts
package.json
.env.example
dist/                        # wynik builda, gitignore, to idzie na FTP
```

## Zasady pracy z treścią

- Nowy tekst UI → oba locale (`pl.json` i `en.json`).
- Nowy fakt (telefon, adres, godziny) → `site.ts`, potem ewentualnie interpolacja w locale.
- Nowe zdjęcie → wpis w `ASSETS.md`, plik w `client/assets/`, eksport w `assets.ts`.
- Profil członka zespołu → obiekt w `team.ts` (id w slugu, `group`: `dentist` albo `hygiene`).
- Wpis na blogu → obiekt w `blog.ts` **oraz** hash w `HASH_PAGES` w `vite.config.ts`.
