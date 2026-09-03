# dentalpassion

Wizytówka gabinetu stomatologii **dentalpassion** (Marcin Mazik) w Warszawie.

**Produkcja:** [dentalpassion.waw.pl](https://dentalpassion.waw.pl)

## Stack

- Vite 8 (`root` = `client/`) + React 19 + TypeScript
- Tailwind CSS v4, shadcn/ui, Framer Motion, react-i18next (PL/EN)
- Hosting: statyczne pliki na FTP (Apache / cyberFolks, `public_html`)
- Nawigacja: hash (`#cennik`, `#/rodo`) — bez React Router

Szczegóły narzędzi i konwencji: [docs/tech.md](docs/tech.md). Wdrożenie: [docs/DEPLOY.md](docs/DEPLOY.md).

## Komendy

Z korzenia repo:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` = `tsc -b && vite build`. Wynik ląduje w `dist/` (gitignore).

## Publikacja

Wgraj **zawartość** `dist/` (w tym `.htaccess`) do `public_html`. Nie wrzucaj `node_modules/`, `client/`, `.cursor/` ani `.env`.

Kontakt na stronie: `tel:` i `mailto:` z `client/src/config/site.ts`.
