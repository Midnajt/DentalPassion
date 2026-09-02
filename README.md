# dentalpassion

Statyczna strona internetowa gabinetu stomatologii **dentalpassion** (Marcin Mazik) w Warszawie.

**Produkcja:** [dentalpassion.waw.pl](https://dentalpassion.waw.pl)

## Stack

- HTML5 + CSS (custom design tokens)
- Vanilla JavaScript
- Generator stron: Node.js (`assets/scripts/generate-pages.mjs`, budowanie `build-dist.mjs`)
- Hosting: Apache / cyberFolks, katalog `public_html` — zob. [docs/DEPLOY.md](docs/DEPLOY.md)

## Struktura

```
/
  .htaccess              przekierowania 301, HTTPS, strona błędu (Apache)
  google….html           weryfikacja Google Search Console
  assets/
    css/                 style
    js/                  skrypty frontowe
    images/              grafiki
    data/                źródła danych (cennik, blog)
    scripts/             generator stron i skrypt budujący (tylko lokalnie)
  docs/                  dokumentacja i eksport treści
  dist/                  wynik budowania, poza repozytorium
```

Strony HTML, `sitemap.xml` i `robots.txt` są generowane i trafiają wyłącznie do `dist/`.

## Budowanie i lokalny podgląd

```bash
node assets/scripts/build-dist.mjs
npx serve dist
```

Potem otwórz adres podany w terminalu (zwykle `http://localhost:3000`).

Źródła treści (m.in. cennik) leżą w `assets/data/` — po ich zmianie wystarczy przebudować.
Adres produkcyjny jest w jednym miejscu: stała `SITE_URL` w `generate-pages.mjs`.

Zawartość `dist/` odpowiada jeden do jednego temu, co ma leżeć w `public_html` na serwerze.

## Wdrożenie

### Serwer Apache (cyberFolks)

Docelowy hosting. Pliki trafiają przez FTP do `public_html`.
Procedura, lista plików do wysłania, mapowanie starych URL WordPress i checklista: [docs/DEPLOY.md](docs/DEPLOY.md).

### GitHub Pages

Służyło wyłącznie do prezentacji projektu klientowi i zostało wyłączone po wdrożeniu na docelowej
domenie. Repozytorium pozostaje źródłem kodu.

## Kontakt (CTA na stronie)

- Telefon: `+48 501 430 894`
- E-mail: `kontakt@dentalpassion.waw.pl`
