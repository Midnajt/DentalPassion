# Grafiki dentalpassion

Oryginały leżą w `client/assets/`. Kopie publiczne (te same URL-e co na produkcji) są w `client/public/assets/`, żeby `og:image` i favicon zostały pod `/assets/images/…`.

| Plik | Użycie |
| --- | --- |
| `logo.png` | Navbar, hero, stopka |
| `images/hero.jpg` | Tło hero na stronie głównej |
| `images/feathers.png` | Akcenty i eyebrow |
| `images/marcin-portrait.jpg` | O nas, zakres, karta zespołu |
| `images/ania.jpg` | Higienistka |
| `images/team-placeholder-m.svg` / `team-placeholder-f.svg` | Placeholdery zespołu |
| `images/fb.png` / `znanylekarz.png` | Ikony social |
| `images/clinic.jpg` | Tło pasa CTA (`pages.css`) |
| `images/og-image.png` | Open Graph 1200×630 — **nie zmieniaj publicznego URL** `/assets/images/og-image.png` |
| `images/favicon.png` / `favicon-32.png` | Ikony |
| `events/first/*.jpg` | Wpis Seeking Occlusion |
| `events/summer/reel-thumb.jpg` | Wpis wakacyjny / rolka |

Import w kodzie: `?url` (logo bez konwersji). Zdjęcia treści można też importować `?as=picture` (vite-imagetools).
