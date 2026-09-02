# dentalpassion

Statyczna strona internetowa gabinetu stomatologii **dentalpassion** (Marcin Mazik) w Warszawie.

**Produkcja:** [dentalpassion.waw.pl](https://dentalpassion.waw.pl)

## Stack

- HTML5 + CSS (custom design tokens)
- Vanilla JavaScript
- Generator stron: Node.js (`assets/scripts/generate-pages.mjs`)
- Hosting: Apache / cyberFolks, katalog `public_html` — zob. [docs/DEPLOY.md](docs/DEPLOY.md)

## Struktura

```
/
  *.html                 strony publiczne (w tym 404.html)
  .htaccess              przekierowania 301, HTTPS, strona błędu (Apache)
  robots.txt             generowane razem ze stronami
  sitemap.xml            generowane razem ze stronami
  assets/
    css/                 style
    js/                  skrypty frontowe
    images/              grafiki
    data/                źródła danych (cennik, blog)
    scripts/             generator HTML (tylko lokalnie)
  docs/                  dokumentacja i eksport treści
```

## Lokalny podgląd

W katalogu projektu:

```bash
npx serve .
```

Potem otwórz adres podany w terminalu (zwykle `http://localhost:3000`).

## Regeneracja stron HTML

Źródła treści (m.in. cennik) leżą w `assets/data/`. Po zmianach uruchom:

```bash
node assets/scripts/generate-pages.mjs
```

Skrypt nadpisuje wygenerowane pliki `*.html`, `sitemap.xml` i `robots.txt` w katalogu głównym.
Adres produkcyjny jest w jednym miejscu — stała `SITE_URL` w generatorze.

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
