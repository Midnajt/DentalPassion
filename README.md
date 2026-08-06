# dentalpassion

Statyczna strona internetowa gabinetu stomatologii **dentalpassion** (Marcin Mazik) w Warszawie.

**Live:** [midnajt.github.io/DentalPassion](https://midnajt.github.io/DentalPassion)

## Stack

- HTML5 + CSS (custom design tokens)
- Vanilla JavaScript
- Generator stron: Node.js (`assets/scripts/generate-pages.mjs`)
- Hosting: GitHub Pages (oraz opcjonalnie Apache / cyberFolks — zob. [docs/DEPLOY.md](docs/DEPLOY.md))

## Struktura

```
/
  *.html                 strony publiczne
  .htaccess              przekierowania 301 (Apache)
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

Skrypt nadpisuje wygenerowane pliki `*.html` w katalogu głównym.

## Wdrożenie

### GitHub Pages

Repozytorium publikuje stronę z gałęzi `master` (katalog główny) na:

`https://midnajt.github.io/DentalPassion`

Po pushu do `master` workflow Pages buduje i wdraża stronę automatycznie.

### Serwer Apache (cyberFolks)

Szczegóły, checklista i mapowanie starych URL WordPress → nowe strony: [docs/DEPLOY.md](docs/DEPLOY.md).

## Kontakt (CTA na stronie)

- Telefon: `+48 501 430 894`
- E-mail: `kontakt@dentalpassion.waw.pl`
