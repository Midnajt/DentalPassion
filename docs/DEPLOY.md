# Wdrożenie dentalpassion (cyberFolks / Apache)

## Struktura projektu

```
/
  *.html              ← strony
  .htaccess           ← przekierowania 301
  assets/
    css/ js/ images/ logo.png
    scripts/          ← generator HTML (nie na produkcję)
  docs/               ← briefy, źródła, screenshoty (nie na produkcję)
```

## Co wrzucić na serwer

Do katalogu WWW (zwykle `public_html`) skopiuj:

- wszystkie pliki `*.html`
- katalog `assets/` **bez** `assets/scripts/`
- plik `.htaccess`

**Nie** wrzucaj na produkcję: całego `docs/`, `assets/scripts/`, plików źródłowych logo `.ai`.

## Przed publikacją

1. Zrób pełną kopię zapasową obecnego WordPressa (pliki + baza).
2. Sprawdź stronę lokalnie (np. `npx serve .`).
3. Podmień placeholdery zdjęć zespołu w `assets/images/` na prawdziwe portrety.
4. Opcjonalnie wyeksportuj lżejsze logo PNG z `docs/source/` i podmień `assets/logo.png`.

## Przekierowania 301

Plik `.htaccess` mapuje stare adresy WP:

| Stary URL | Nowy |
|-----------|------|
| `/index.php/cennik/` | `/cennik.html` |
| `/index.php/rodo/` | `/rodo.html` |
| `/index.php/prawa-pacjenta/` | `/prawa-pacjenta.html` |
| `/index.php/polityka-prywatnosci/` | `/polityka-prywatnosci.html` |
| `/index.php/` | `/` |

## CTA i kontakt

- „Zamów wizytę” → `tel:+48501430894`
- E-mail → `mailto:kontakt@dentalpassion.waw.pl`
- Facebook → profil DentalPassion Warszawa

## Regeneracja stron HTML

```bash
node assets/scripts/generate-pages.mjs
```

## Checklist po wdrożeniu

- [ ] Home, O nas, Zespół, Cennik, Kontakt otwierają się poprawnie
- [ ] Menu mobilne działa
- [ ] Mapa na Kontakt ładuje się
- [ ] Linki RODO / Prawa pacjenta / Polityka prywatności w stopce
- [ ] Stare URL z `index.php` przekierowują
- [ ] HTTPS aktywne
- [ ] Usunięty / wyłączony stary WordPress po migracji
