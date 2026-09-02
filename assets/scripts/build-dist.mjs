import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const dist = path.join(root, "dist");

/**
 * Pliki produkcyjne utrzymywane ręcznie, kopiowane z katalogu głównego bez zmian.
 * Strony HTML, `sitemap.xml` i `robots.txt` dokłada generator uruchamiany na końcu.
 */
function isStaticRootFile(name) {
  return name === ".htaccess" || /^google[0-9a-f]+\.html$/.test(name);
}

/**
 * Ścieżki pominięte przy kopiowaniu `assets/`: skrypty budujące oraz grafiki,
 * do których nie odwołuje się żadna strona ani arkusz stylów (ok. 5,5 MB).
 * `clinic.jpg` zostaje — jest tłem sekcji `.cta-band` w `pages.css`.
 */
const skipped = new Set(
  [
    "assets/scripts",
    "assets/events/first/info.txt",
    "assets/images/clinic (1).jpg",
    "assets/images/clinic2.png",
    "assets/images/clinic3.png",
    "assets/images/clinic4.png",
    "assets/images/marcin.jpg",
  ].map((entry) => path.normalize(entry))
);

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDir(relative) {
  for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
    const entryRelative = path.join(relative, entry.name);
    if (skipped.has(entryRelative)) continue;

    if (entry.isDirectory()) {
      copyDir(entryRelative);
    } else {
      copyFile(path.join(root, entryRelative), path.join(dist, entryRelative));
    }
  }
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const name of fs.readdirSync(root)) {
  if (isStaticRootFile(name)) {
    copyFile(path.join(root, name), path.join(dist, name));
  }
}

copyDir("assets");

await import("./generate-pages.mjs");

let files = 0;
let bytes = 0;

(function measure(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) measure(full);
    else {
      files += 1;
      bytes += fs.statSync(full).size;
    }
  }
})(dist);

console.log(`dist/: ${files} plików, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
