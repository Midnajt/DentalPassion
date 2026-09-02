# Raport: wdrożenie dentalpassion.waw.pl (zamiana WordPressa na stronę statyczną)

Data: 2 września 2026
Wykonawca: Marcin Krzysztoszek (AddPattern) przy wsparciu asystenta Cursor
Repozytorium: https://github.com/Midnajt/DentalPassion (gałąź `master`)

## Cel

Zastąpić WordPressa działającego na `dentalpassion.waw.pl` statyczną stroną z repozytorium.
GitHub Pages służył wyłącznie do prezentacji projektu klientowi i miał zostać wyłączony.

## Środowisko

- Hosting cyberFolks, serwer `s183.cyber-folks.pl`, panel w układzie DirectAdmin.
- Dostęp: wyłącznie FTP (konto `admin@dentalpassion.waw.pl`), bez panelu i bez phpMyAdmin.
- Katalog WWW: `public_html`. `private_html` to dowiązanie symboliczne do tego samego katalogu.
- Stary WordPress miał 5 zaindeksowanych adresów (wg `wp-sitemap-posts-page-1.xml`):
  `/`, `/index.php/cennik/`, `/index.php/rodo/`, `/index.php/prawa-pacjenta/`,
  `/index.php/polityka-prywatnosci/`.

## Zmiany w kodzie przed wdrożeniem

Commit `727b054` — *prepare production deploy on dentalpassion.waw.pl*:

1. **Adres produkcyjny.** Stała `SITE_URL` w `assets/scripts/generate-pages.mjs` zmieniona z
   `https://midnajt.github.io/DentalPassion` na `https://dentalpassion.waw.pl`.
   Przed regeneracją porównałem wyjście generatora z plikami w repozytorium — były identyczne,
   więc żadne ręczne zmiany w HTML nie przepadły. Po regeneracji diff obejmował wyłącznie linie
   `canonical`, `og:url`, `og:image`, `twitter:image` i `shortcut icon` w 11 plikach.
2. **Strona 404.** Dodana do generatora jako `404.html`, z `<meta name="robots" content="noindex,follow">`
   zamiast adresu kanonicznego. Ścieżki do CSS, grafik i menu są liczone od katalogu głównego —
   Apache serwuje ten plik pod pierwotnie żądanym adresem, więc przy ścieżkach względnych strona
   błędu rozsypałaby się pod adresami zagnieżdżonymi (np. `/wp-admin/`).
3. **robots.txt i sitemap.xml.** Generowane przez ten sam skrypt, z tej samej stałej `SITE_URL`,
   dzięki czemu adres produkcyjny jest utrzymywany w jednym miejscu. Sitemap zawiera 11 adresów
   (bez strony 404).
4. **`.htaccess`.** Włączone wymuszanie HTTPS z wyjątkiem `/.well-known/` (odnawianie certyfikatu
   Let's Encrypt), `DirectoryIndex index.html`, `ErrorDocument 404 /404.html`. Do listy krótkich
   aliasów bez `.html` dopisany `blog`.
5. **Optymalizacja grafik.**

   | Plik | Przed | Po | Uwagi |
   |------|-------|-----|-------|
   | `assets/logo.png` | 1908 kB (5558x2299) | 110 kB (840x347) | ładowany na każdej podstronie |
   | `assets/images/fb.png` | 577 kB (1024x1024) | 3 kB (48x48) | wyświetlany w 20x20 px |
   | `assets/images/znanylekarz.png` | 397 kB (1254x1254) | 3 kB (48x48) | wyświetlany w 20x20 px |
   | `assets/images/feathers.png` | 143 kB | bez zmian | oryginał lepiej skompresowany |
   | `assets/images/favicon.png` | 143 kB | bez zmian | oryginał lepiej skompresowany |

   Łącznie około 2,7 MB mniej do pobrania przy wizycie na stronie.

Commit `7c9bb79` — *document go-live state on dentalpassion.waw.pl*: aktualizacja `README.md`
i `docs/DEPLOY.md` (procedura wymiany WordPressa, lista plików do wysłania, checklista, stan po
wdrożeniu).

## Przebieg wdrożenia

Kopia zapasowa `public_html` — wykonana wcześniej samodzielnie przez właściciela projektu.

Kolejność operacji przez FTP (WinSCP w trybie skryptowym, transfer binarny):

1. Wgranie `assets/` do `public_html/assets/` z pominięciem `assets/scripts/` i nieużywanych
   grafik `clinic*` (ok. 7 MB). WordPress działał normalnie w trakcie tej operacji.
2. Wgranie plików `*.html`, `robots.txt` i `sitemap.xml`.
3. Utworzenie katalogu `/wp-old` **poza** `public_html` i przeniesienie do niego całego
   WordPressa: `wp-admin/`, `wp-content/`, `wp-includes/`, wszystkich `wp-*.php`, `index.php`,
   `xmlrpc.php`, `license.txt`, `readme.html` oraz wszystkich wariantów starego `.htaccess`.
   Przeniesienie po stronie serwera trwa sekundy i pozwala natychmiast się wycofać.
4. Wgranie nowego `.htaccess`.

Do `public_html` **nie** trafiły: `docs/`, `assets/scripts/`, `README.md`, `.git/`
ani grafiki `assets/images/clinic*`.

Nie były ruszane: `logs`, `stats`, `awstats`, `public_ftp`, `.htpasswd`, `private_html`.

### Incydent

Pierwsza próba wysyłki plików HTML użyła polecenia `put *.html robots.txt sitemap.xml` bez jawnego
katalogu docelowego. WinSCP potraktował ostatni argument jako cel i zapisał wszystkie pliki jeden
po drugim do pojedynczego pliku `/public_html/sitemap.xml`. Wykryte natychmiast przy listowaniu
katalogu na serwerze, przed przeniesieniem WordPressa — czyli w momencie, gdy stara strona wciąż
działała i nic nie było widoczne dla użytkowników. Błędny plik usunięto, a wysyłkę powtórzono
z jawnym celem `/public_html/`. Wniosek na przyszłość: w skryptach WinSCP zawsze podawać katalog
docelowy zakończony ukośnikiem.

## Weryfikacja po wdrożeniu

Wszystko sprawdzone na żywym serwerze:

- 11 stron HTML oraz `robots.txt` i `sitemap.xml` — kod 200, rozmiary zgodne z lokalnymi.
- Wszystkie 41 unikalnych odwołań do plików lokalnych ze wszystkich stron — kod 200.
  To wyklucza problemy z wielkością liter w nazwach plików (Windows kontra Linux).
- Przekierowania 301 ze starych adresów WordPressa:
  `/index.php/cennik/` → `/cennik.html`, `/index.php/rodo/` → `/rodo.html`,
  `/index.php/prawa-pacjenta/` → `/prawa-pacjenta.html`,
  `/index.php/polityka-prywatnosci/` → `/polityka-prywatnosci.html`, `/index.php/` → `/`.
- `http://dentalpassion.waw.pl` → 301 na `https://` (już z naszej reguły, nie z WordPressa).
- Krótki alias bez rozszerzenia (`/cennik`) — kod 200.
- `/wp-admin/` i `/wp-login.php` — kod 404, WordPress nie jest już dostępny.
- Nieistniejący adres — kod 404 z własną stroną błędu (poprawnie ładuje CSS, ma `noindex`).
- `/assets/` — kod 403 zamiast listingu katalogu.
- Adres kanoniczny strony głównej: `https://dentalpassion.waw.pl`.
- W treści stron brak jakichkolwiek odwołań do `wp-content` i `wp-includes`.

## Stan końcowy

- Produkcja: `https://dentalpassion.waw.pl` serwuje stronę statyczną z repozytorium.
- Pliki WordPressa: `/wp-old` na serwerze, poza katalogiem WWW, niedostępne z internetu.
- Baza danych WordPressa: nietknięta (brak dostępu do panelu), nieużywana.
- GitHub Pages: wyłączone (`DELETE /repos/Midnajt/DentalPassion/pages`).
- Konta e-mail, DNS i domena: bez zmian.

## Google Search Console i Analytics (tego samego dnia wieczorem)

Do konta Google nie była podpięta żadna usługa dla tej domeny, więc powstała nowa, typu
„prefiks adresu URL", dla `https://dentalpassion.waw.pl/`. Weryfikacja plikiem
`googlecd3613b93d6cc0c9.html` wgranym przez FTP do `public_html` — plik jest też w repozytorium
i na liście plików produkcyjnych w `docs/DEPLOY.md`, żeby kolejne wdrożenie go nie zgubiło.

Mapa witryny zgłoszona jako `sitemap.xml`. Bezpośrednio po zgłoszeniu Search Console pokazywał
„Nie udało się pobrać" przy pustej kolumnie „Ostatni odczyt" — to stan sprzed pierwszego odczytu,
nie błąd. Sprawdzone: serwer zwraca 200 z `Content-Type: application/xml`, a żądanie z nagłówkiem
Googlebota dostaje pełną treść, więc hosting nie blokuje robotów.

Starej `wp-sitemap.xml` nie było czego usuwać — w nowej usłudze lista map jest pusta, a sam plik
zwraca 404, bo WordPress leży w `/wp-old`.

Google Analytics 4 (`G-55QG7SQY7K`) podpięty pod istniejący baner zgody. Pierwsza wersja ładowała
`gtag.js` dopiero po akceptacji banera, czyli nie kontaktowała się z Google w ogóle przed zgodą.
Miało to jednak skutek uboczny: kreator Analytics przy „Sprawdź ponownie" nigdy nie widział tagu,
bo robot Google nie klika w baner. Ostatecznie wybrano **Consent Mode v2** — tag jest w `<head>`
każdej strony i startuje z `analytics_storage: 'denied'`, więc przed zgodą nie zapisuje cookies
ani identyfikatorów, a `main.js` po akceptacji wywołuje `gtag('consent', 'update', …)`.

Klucz zgody podbity z `dentalpassion-consent-v1` na `-v2`, żeby osoby, które zaakceptowały baner
przed dodaniem analityki, zobaczyły go ponownie i zgodziły się na rzeczywisty zakres przetwarzania.

Weryfikacja w DevTools pokazała żądanie `google-analytics.com/g/collect` ze statusem 204 i
parametrem `gcs=G100`, czyli ping sprzed zgody — bez identyfikatora użytkownika, więc niewidoczny
w raporcie czasu rzeczywistego. Stąd wniosek, że odsłona pierwszej strony po akceptacji banera
musi zostać powtórzona: `main.js` wysyła wtedy dodatkowe zdarzenie `page_view`. Bez tego wizyty
osób, które otwierają jedną podstronę i klikają zgodę, nie trafiałyby do statystyk.

Polityka prywatności dostała sekcję o Google Analytics (zakres danych, podstawa prawna, działanie
Consent Mode, okres przechowywania, sposób wycofania zgody), a tekst banera wprost wymienia
analitykę.

## Zadania otwarte

1. Po 2-4 tygodniach stabilnej pracy: usunięcie `/wp-old` z serwera oraz bazy danych WordPressa
   (baza wymaga panelu hostingu — do zgłoszenia hostingowi lub klientowi).
2. `www.dentalpassion.waw.pl` nie jest objęty certyfikatem SSL i zwraca błąd zaufania.
   Jeśli ma działać, trzeba to zgłosić do cyberFolks — nie da się tego naprawić plikami na FTP.
3. Potwierdzenie z klientem, że nie polegał na formularzu kontaktowym WordPressa. Nowa strona
   ma wyłącznie odnośniki `tel:` i `mailto:`, więc nie wymaga niczego po stronie serwera.

## Jak się wycofać

Gdyby trzeba było przywrócić WordPressa: przenieść zawartość `/wp-old` z powrotem do
`public_html` (w tym stary `.htaccess`), a nowe pliki (`*.html`, `robots.txt`, `sitemap.xml`,
`assets/`, nowy `.htaccess`) usunąć lub przenieść obok. Baza danych nie była modyfikowana,
więc strona wróci do stanu sprzed wdrożenia.
