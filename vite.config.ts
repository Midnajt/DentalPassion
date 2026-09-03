import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { imagetools } from "vite-imagetools";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const HASH_PAGES = [
  "",
  "#o-nas",
  "#zespol",
  "#cennik",
  "#blog",
  "#blog/seeking-occlusion-madrid",
  "#blog/wakacje-w-dentalpassion",
  "#kontakt",
  "#/rodo",
  "#/prawa-pacjenta",
  "#/polityka",
];

function seoFilesPlugin(siteUrl: string): Plugin {
  const origin = siteUrl.replace(/\/$/, "");
  return {
    name: "seo-files",
    generateBundle() {
      const urls = HASH_PAGES.map((hash) => (hash ? `${origin}/${hash}` : `${origin}/`));
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;
      const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const siteUrl = env.VITE_SITE_URL || "https://dentalpassion.waw.pl";

  return {
    root: path.resolve(rootDir, "client"),
    base: env.VITE_BASE || "/",
    plugins: [react(), tailwindcss(), imagetools(), seoFilesPlugin(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "client/src"),
      },
    },
    build: {
      outDir: path.resolve(rootDir, "dist"),
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
    envDir: rootDir,
  };
});
