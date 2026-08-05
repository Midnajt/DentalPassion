# Wdrożenie dentalpassion (cyberFolks / Apache)

## Co wrzucić na serwer

Do katalogu WWW (zwykle `public_html`) skopiuj:

- wszystkie pliki `*.html`
- katalogi `css/`, `js/`, `assets/`
- plik `.htaccess`

**Nie** wrzucaj na produkcję: briefów Word, screenshotów panelu WP, `cennik.pdf`, `scripts/`, `content-export/`, plików źródłowych logo `.ai`.

## Przed publikacją

1. Zrób pełną kopię zapasową obecnego WordPressa (pliki + baza).
2. Sprawdź stronę lokalnie (np. Live Server / `npx serve .`).
3. Podmień placeholdery zdjęć zespołu w `assets/images/` na prawdziwe portrety (obecnie SVG).
4. Opcjonalnie wyeksportuj logo z `dental_logo (1).ai` do PNG/SVG z przezroczystym tłem i podmień `assets/logo.jpg`.

## Przekierowania 301

Plik `.htaccess` mapuje stare adresy WP:

| Stary URL | Nowy |
|-----------|------|
| `/index.php/cennik/` | `/cennik.html` |
| `/index.php/rodo/` | `/rodo.html` |
| `/index.php/prawa-pacjenta/` | `/prawa-pacjenta.html` |
| `/index.php/polityka-prywatnosci/` | `/polityka-prywatnosci.html` |
| `/index.php/` | `/` |

Po wdrożeniu sprawdź w Search Console, czy stare URL-e zwracają 301.

## CTA i kontakt

- „Zamów wizytę” → `tel:+48501430894`
- E-mail → `mailto:kontakt@dentalpassion.waw.pl`
- Facebook → profil DentalPassion Warszawa

## Regeneracja stron HTML

Jeśli zmieniasz wspólny header/footer w generatorze:

```bash
node scripts/generate-pages.mjs
```

## Checklist po wdrożeniu

- [ ] Home, O nas, Zespół, Cennik, Kontakt otwierają się poprawnie
- [ ] Menu mobilne działa
- [ ] Mapa na Kontakt ładuje się
- [ ] Linki RODO / Prawa pacjenta / Polityka prywatności w stopce
- [ ] Stare URL z `index.php` przekierowują
- [ ] HTTPS aktywne (odkomentuj regułę w `.htaccess` jeśli trzeba)
- [ ] Usunięty / wyłączony stary WordPress po migracji DNS/plików
