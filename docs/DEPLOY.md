# Wdrożenie dentalpassion (cyberFolks / Apache)

Docelowy adres: `https://dentalpassion.waw.pl`. Hosting działa w układzie DirectAdmin —
katalogiem WWW jest `public_html`, a `private_html` jest dowiązaniem do niego.

## Struktura projektu

```
/
  *.html              ← strony (w tym 404.html)
  robots.txt          ← generowany
  sitemap.xml         ← generowany
  .htaccess           ← HTTPS, przekierowania 301, strona błędu
  assets/
    css/ js/ images/ data/ events/ logo.png
    scripts/          ← generator HTML (nie na produkcję)
  docs/               ← briefy, źródła, screenshoty (nie na produkcję)
```

## Co wrzucić na serwer

Do `public_html` kopiujemy:

- wszystkie pliki `*.html` (razem z `404.html`)
- `robots.txt` i `sitemap.xml`
- `.htaccess`
- katalog `assets/` **bez** `assets/scripts/`

**Nie** wrzucamy: `docs/`, `assets/scripts/`, `README.md`, katalogu `.git/` ani nieużywanych
grafik `assets/images/clinic*.jpg|png` (ok. 7 MB).

## Przed publikacją

1. Sprawdź stronę lokalnie (`npx serve .`).
2. Upewnij się, że `SITE_URL` w `assets/scripts/generate-pages.mjs` wskazuje na domenę produkcyjną,
   i przegeneruj strony (`node assets/scripts/generate-pages.mjs`).
3. Zrób pełną kopię zapasową obecnego WordPressa: przez FTP pobierz **całe** `public_html`
   (w WinSCP włącz pokazywanie plików ukrytych, inaczej nie zobaczysz `.htaccess`).
   Kopię trzymaj poza repozytorium — `wp-config.php` zawiera hasło do bazy danych.
4. Bazy danych nie da się wyeksportować przez samo FTP. Jeśli jest potrzebna, poproś hosting
   lub właściciela panelu o eksport `.sql` przed usunięciem WordPressa.

## Procedura wymiany WordPressa

Kolejność ogranicza przerwę w działaniu serwisu do kilku minut.

1. W WinSCP ustaw tryb transferu **binarny**.
2. Wgraj `assets/` do `public_html/assets/` — WordPress działa w tym czasie normalnie.
3. Przenieś pliki WordPressa z `public_html` do katalogu `wp-old` **obok** `public_html`:
   `index.php`, `wp-admin/`, `wp-content/`, `wp-includes/`, wszystkie `wp-*.php`, `xmlrpc.php`,
   `license.txt`, `readme.html`, `robots.txt` oraz stary `.htaccess`.
   Przeniesienie po stronie serwera trwa sekundy i pozwala natychmiast się wycofać.
   Jeśli serwer nie pozwala tworzyć katalogów poza `public_html`, użyj `public_html/_wp-old/`
   i od razu wgraj tam `.htaccess` z regułą `Require all denied`.
4. Wgraj do `public_html/`: pliki `*.html`, `.htaccess`, `robots.txt`, `sitemap.xml`.

Na co uważać:

- **Nie usuwaj** katalogu `.well-known` — służy do odnawiania certyfikatu Let's Encrypt.
- **Nie ruszaj** katalogów `logs`, `stats`, `awstats`, `public_ftp` ani pliku `.htpasswd`.
- Usunięcie WordPressa nie dotyka kont e-mail, DNS ani domeny.
- Linux rozróżnia wielkość liter w nazwach plików — po wdrożeniu sprawdź konsolę przeglądarki
  pod kątem błędów 404 na grafikach.
- `www.dentalpassion.waw.pl` nie jest objęty certyfikatem SSL. Jeśli ma działać, trzeba to
  zgłosić hostingowi — nie da się tego naprawić plikami na FTP.

## Przekierowania 301

Plik `.htaccess` mapuje stare adresy WP (to komplet adresów ze starej mapy strony):

| Stary URL | Nowy |
|-----------|------|
| `/index.php/cennik/` | `/cennik.html` |
| `/index.php/rodo/` | `/rodo.html` |
| `/index.php/prawa-pacjenta/` | `/prawa-pacjenta.html` |
| `/index.php/polityka-prywatnosci/` | `/polityka-prywatnosci.html` |
| `/index.php/` | `/` |

`.htaccess` wymusza też HTTPS (z wyjątkiem `/.well-known/`), ustawia `index.html` jako stronę
domyślną i wskazuje `404.html` jako stronę błędu.

## CTA i kontakt

- „Zamów wizytę” → `tel:+48501430894`
- E-mail → `mailto:kontakt@dentalpassion.waw.pl`
- Facebook → profil DentalPassion Warszawa

## Regeneracja stron HTML

Źródło cennika: `assets/data/cennik.json`. Po zmianie cen uruchom:

```bash
node assets/scripts/generate-pages.mjs
```

## Checklist po wdrożeniu

- [ ] Home, O nas, Zespół, Cennik, Blog, Kontakt otwierają się poprawnie
- [ ] Menu mobilne działa
- [ ] Mapa na Kontakt ładuje się
- [ ] Linki RODO / Prawa pacjenta / Polityka prywatności w stopce
- [ ] Stare URL z `index.php` przekierowują (301)
- [ ] `http://` przekierowuje na `https://`
- [ ] `/wp-admin/` i `/wp-login.php` zwracają 404
- [ ] Nieistniejący adres pokazuje `404.html`, a nie listing katalogu
- [ ] `robots.txt` i `sitemap.xml` odpowiadają pod nowymi adresami
- [ ] Nowa mapa strony zgłoszona w Google Search Console
- [ ] Po okresie próbnym: usunięty `wp-old` z serwera i baza danych WordPressa

## Stan po wdrożeniu (2 września 2026)

Strona statyczna działa na `dentalpassion.waw.pl`. Pliki WordPressa leżą w `/wp-old` poza
`public_html` — są niedostępne z internetu i pozwalają się wycofać. GitHub Pages wyłączone.

Do zrobienia później:

- zgłoszenie `sitemap.xml` w Google Search Console (wymaga konta Google z dostępem do usługi),
- po 2-4 tygodniach stabilnej pracy: usunięcie `/wp-old` i bazy danych WordPressa,
- objęcie certyfikatem SSL adresu `www.dentalpassion.waw.pl` (zgłoszenie do hostingu).
