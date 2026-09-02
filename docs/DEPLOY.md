# Wdrożenie dentalpassion (cyberFolks / Apache)

Docelowy adres: `https://dentalpassion.waw.pl`. Hosting działa w układzie DirectAdmin —
katalogiem WWW jest `public_html`, a `private_html` jest dowiązaniem do niego.

## Struktura projektu

```
/
  .htaccess           ← HTTPS, przekierowania 301, strona błędu
  google….html        ← weryfikacja Google Search Console
  assets/
    css/ js/ images/ data/ events/ logo.png
    scripts/          ← generator stron i skrypt budujący (nie na produkcję)
  docs/               ← briefy, źródła, screenshoty (nie na produkcję)
  dist/               ← wynik budowania = zawartość public_html (poza repozytorium)
```

Strony HTML, `sitemap.xml` i `robots.txt` powstają wyłącznie w `dist/` i nie są trzymane
w repozytorium. Źródłem treści są `assets/scripts/generate-pages.mjs` oraz pliki
`assets/data/*.json`.

## Co wrzucić na serwer

Zawartość `public_html` przygotowuje jedno polecenie:

```bash
node assets/scripts/build-dist.mjs
```

Skrypt kasuje `dist/`, kopiuje tam pliki utrzymywane ręcznie (`.htaccess` i plik weryfikacyjny
Google) oraz `assets/`, a na końcu uruchamia generator, który dopisuje strony HTML, `sitemap.xml`
i `robots.txt`. Osobne wywoływanie `generate-pages.mjs` nie jest potrzebne — i tak zapisuje
do `dist/`.

Na FTP wysyłamy **zawartość** `dist/`, a nie sam katalog. `dist/` jest w `.gitignore`, bo to
artefakt budowania, nie źródło.

Plik weryfikacyjny `googlecd3613b93d6cc0c9.html` musi zostać na serwerze na stałe — jego
usunięcie odbiera weryfikację usługi w Search Console.

Pomijane są: `docs/`, `README.md`, `.git/`, `assets/scripts/` (generator) oraz grafiki, do których
nie odwołuje się żadna strona ani arkusz stylów — `clinic (1).jpg`, `clinic2-4.png`, `marcin.jpg`
i `events/first/info.txt`, razem około 5,5 MB. Uwaga: `clinic.jpg` **zostaje**, bo jest tłem
sekcji `.cta-band` w `pages.css`.

Listę wyjątków trzyma stała `skipped` w `build-dist.mjs` — dopisanie nowej nieużywanej grafiki
wymaga jej uzupełnienia.

## Przed publikacją

1. Upewnij się, że `SITE_URL` w `assets/scripts/generate-pages.mjs` wskazuje na domenę
   produkcyjną.
2. Zbuduj katalog wysyłkowy: `node assets/scripts/build-dist.mjs`.
3. Sprawdź wynik lokalnie: `npx serve dist` — to dokładnie ten zestaw plików, który trafi
   na serwer.
4. Zrób pełną kopię zapasową obecnego WordPressa: przez FTP pobierz **całe** `public_html`
   (w WinSCP włącz pokazywanie plików ukrytych, inaczej nie zobaczysz `.htaccess`).
   Kopię trzymaj poza repozytorium — `wp-config.php` zawiera hasło do bazy danych.
5. Bazy danych nie da się wyeksportować przez samo FTP. Jeśli jest potrzebna, poproś hosting
   lub właściciela panelu o eksport `.sql` przed usunięciem WordPressa.

Punkty 4 i 5 dotyczyły pierwszego wdrożenia i są już wykonane — WordPress leży w `/wp-old`.

## Aktualizacja działającej strony

1. `node assets/scripts/build-dist.mjs`.
2. W WinSCP tryb transferu **binarny**, katalog docelowy zawsze podawany jawnie i zakończony
   ukośnikiem (`/public_html/`). Bez tego `put` potraktuje ostatni argument jako nazwę pliku
   docelowego i sklei wszystkie pliki w jeden.
3. Wyślij zawartość `dist/` do `/public_html/`, zachowując strukturę katalogów.
4. Sprawdź stronę z wymuszonym odświeżeniem (`Ctrl+Shift+R`) — inaczej przeglądarka może jeszcze
   trzymać starą wersję `main.js` lub arkuszy stylów.

## Procedura wymiany WordPressa (wykonana 2 września 2026)

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

## Google Search Console i Analytics

Usługa w Search Console: `https://dentalpassion.waw.pl/` (typ „prefiks adresu URL"),
zweryfikowana plikiem `googlecd3613b93d6cc0c9.html` w katalogu głównym. Mapa witryny zgłoszona
jako `sitemap.xml`.

Google Analytics 4, identyfikator `G-55QG7SQY7K`, działa w trybie Consent Mode v2. Tag jest
wstawiany w `<head>` każdej strony przez `generate-pages.mjs` (stała `GA_ID` i szablon
`analytics`) i startuje z `analytics_storage: 'denied'`, czyli bez zapisu cookies. Zgodę
odblokowuje `assets/js/main.js`, wywołując `gtag('consent', 'update', …)` po akceptacji banera
oraz przy kolejnych wizytach, gdy w `localStorage` jest klucz `dentalpassion-consent-v2`
o wartości `accepted`.

Zmiana identyfikatora wymaga edycji `GA_ID` i regeneracji stron.

Odsłona wysłana przed zgodą leci bez identyfikatora użytkownika (`gcs=G100` w żądaniu
`google-analytics.com/g/collect`) i nie tworzy sesji, dlatego po świeżej akceptacji banera
`main.js` powtarza zdarzenie `page_view`. Bez tego wizyta osoby, która wchodzi na jedną stronę
i akceptuje zgodę, w ogóle nie trafiłaby do statystyk.

Rozszerzenie zakresu zgody (nowe narzędzie, nowy cel przetwarzania) wymaga podbicia numeru
w `consentKey`. Stara zgoda przestaje wtedy obowiązywać i baner pokazuje się ponownie — inaczej
nowe narzędzie ruszyłoby u osób, które zgadzały się na węższy zakres.

Przycisk „Sprawdź ponownie" w kreatorze Analytics wykrywa tag, bo `gtag.js` ładuje się przy
każdym wejściu. Rzeczywisty pomiar i tak potwierdza dopiero raport **Czas rzeczywisty** po
zaakceptowaniu banera.

Testując zgodę lokalnie, czyść `localStorage` dla danego hosta, inaczej baner się nie pokaże.

## Regeneracja stron HTML

Źródło cennika: `assets/data/cennik.json`. Po zmianie cen przebuduj katalog wysyłkowy:

```bash
node assets/scripts/build-dist.mjs
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
- [x] Nowa mapa strony zgłoszona w Google Search Console
- [ ] Baner zgody pojawia się na czystej przeglądarce, a Google Analytics rusza dopiero
      po kliknięciu „Akceptuję"
- [ ] Po okresie próbnym: usunięty `wp-old` z serwera i baza danych WordPressa

## Stan po wdrożeniu (2 września 2026)

Strona statyczna działa na `dentalpassion.waw.pl`. Pliki WordPressa leżą w `/wp-old` poza
`public_html` — są niedostępne z internetu i pozwalają się wycofać. GitHub Pages wyłączone.

Do zrobienia później:

- po 2-4 tygodniach stabilnej pracy: usunięcie `/wp-old` i bazy danych WordPressa,
- objęcie certyfikatem SSL adresu `www.dentalpassion.waw.pl` (zgłoszenie do hostingu).
