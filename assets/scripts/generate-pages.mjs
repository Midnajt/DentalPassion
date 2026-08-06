import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");

/** Public site origin on GitHub Pages (no trailing slash). */
const SITE_URL = "https://midnajt.github.io/DentalPassion";

const fonts = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,450;9..144,550;9..144,650&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">`;

function head({ title, description, active = "", heroHeader = false, pagePath = "" }) {
  const file = pagePath || active || "index.html";
  const pageUrl =
    file === "index.html" ? SITE_URL : `${SITE_URL}/${file}`;
  const ogImage = `${SITE_URL}/assets/images/og-image.png`;
  const favicon = `${SITE_URL}/assets/images/favicon.png`;

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="dentalpassion">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:secure_url" content="${ogImage}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="dentalpassion — gabinet stomatologii">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="assets/images/favicon.png" type="image/png" sizes="512x512">
  <link rel="icon" href="assets/images/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="assets/images/favicon.png">
  <link rel="shortcut icon" href="${favicon}">
${fonts}
  <link rel="stylesheet" href="assets/css/tokens.css">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/pages.css">
</head>
<body>
  <a class="skip-link" href="#main">Przejdź do treści</a>
  <header class="site-header${heroHeader ? " site-header--hero" : ""}">
    <div class="site-header__inner">
      <a class="logo" href="index.html" aria-label="dentalpassion — strona główna">
        <img src="assets/logo.png" alt="dentalpassion" width="280" height="60">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Otwórz menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" id="site-nav" aria-label="Menu główne">
        <ul class="nav__list">
          ${navItem("index.html", "Strona główna", active)}
          ${navItem("o-nas.html", "O nas", active)}
          ${navItem("zespol.html", "Zespół", active)}
          ${navItem("cennik.html", "Cennik", active)}
          ${navItem("blog.html", "Blog", active)}
          ${navItem("kontakt.html", "Kontakt", active)}
        </ul>
        <a class="btn btn--primary" href="tel:+48501430894">Zamów wizytę</a>
      </nav>
    </div>
  </header>`;
}

function navItem(href, label, active) {
  const current = active === href ? ' aria-current="page"' : "";
  return `<li><a href="${href}"${current}>${label}</a></li>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="assets/logo.png" alt="dentalpassion" width="240" height="52">
        <p>Gabinet stomatologii w Warszawie. Kompleksowe leczenie w przyjaznej atmosferze — zgodnie z filozofią FACE i Digital Smile Design.</p>
      </div>
      <div class="footer-col">
        <h3>Menu</h3>
        <ul>
          <li><a href="index.html">Strona główna</a></li>
          <li><a href="o-nas.html">O nas</a></li>
          <li><a href="zespol.html">Zespół</a></li>
          <li><a href="cennik.html">Cennik</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="kontakt.html">Kontakt</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Informacje</h3>
        <ul>
          <li><a href="rodo.html">RODO</a></li>
          <li><a href="prawa-pacjenta.html">Prawa pacjenta</a></li>
          <li><a href="polityka-prywatnosci.html">Polityka prywatności</a></li>
          <li><a href="https://www.facebook.com/DentalPassion-Warszawa-1872834242995470" rel="noopener noreferrer" target="_blank">Facebook</a></li>
        </ul>
        <p style="margin-top:1rem">
          <a href="tel:+48501430894">501 430 894</a><br>
          <a href="mailto:kontakt@dentalpassion.waw.pl">kontakt@dentalpassion.waw.pl</a><br>
          ul. Ostrobramska 126/lok U14<br>04-026 Warszawa
        </p>
      </div>
    </div>
    <div class="container footer-bottom">
      <div class="footer-bottom__meta">
        <span>&copy; <span data-year></span> dentalpassion Marcin Mazik</span>
        <span>Warszawa · stomatologia</span>
      </div>
      <div class="footer-credits">
        <p>Strona stworzona przez AddPattern Marcin Krzysztoszek — <a href="mailto:midnajt0@gmail.com">kontakt</a></p>
        <p>Część zdjęć z oferty pochodzi z stocku <a href="https://pixabay.com/" rel="noopener noreferrer" target="_blank">pixabay.com</a></p>
      </div>
    </div>
  </footer>
  <div class="consent-banner" data-consent-banner hidden role="dialog" aria-modal="false" aria-labelledby="consent-title" aria-describedby="consent-desc">
    <div class="consent-banner__inner">
      <div class="consent-banner__text">
        <p id="consent-title" class="consent-banner__title">Zgoda na pliki cookies i przetwarzanie danych</p>
        <p id="consent-desc">Korzystamy z plików cookies oraz przetwarzamy dane zgodnie z <a href="rodo.html">informacją RODO</a> i <a href="polityka-prywatnosci.html">polityką prywatności</a>. Aby kontynuować, potwierdź zgodę poniżej.</p>
        <label class="consent-banner__check">
          <input type="checkbox" id="consent-checkbox" data-consent-checkbox>
          <span>Wyrażam zgodę na wykorzystywanie plików cookies oraz przetwarzanie danych osobowych w celach opisanych w dokumentach RODO i polityki prywatności.</span>
        </label>
      </div>
      <div class="consent-banner__actions">
        <button type="button" class="btn btn--primary" data-consent-accept disabled>Akceptuję</button>
      </div>
    </div>
  </div>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
}

const team = [
  {
    id: "marcin-mazik",
    name: "Marcin Mazik",
    role: "Lekarz dentysta",
    spec: "stomatologia zachowawcza, protetyka, leczenie schorzeń stawu skroniowo-żuchwowego",
    photo: "assets/images/marcin.jpg",
  },
  {
    id: "wiktor-poczobutt",
    name: "Wiktor Poczobutt-Odlanicki",
    role: "Lekarz dentysta",
    spec: "chirurgia, implantologia",
    photo: "assets/images/team-placeholder-m.svg",
  },
  {
    id: "katarzyna-cichon",
    name: "Katarzyna Cichoń",
    role: "Lekarz dentysta",
    spec: "chirurgia, endodoncja",
    photo: "assets/images/team-placeholder-f.svg",
  },
  {
    id: "agnieszka-fundakowska",
    name: "Agnieszka Fundakowska",
    role: "Lekarz dentysta",
    spec: "stomatologia zachowawcza, stomatologia dziecięca",
    photo: "assets/images/team-placeholder-f.svg",
  },
  {
    id: "karina-kuczynska",
    name: "Karina Kuczyńska-Witan",
    role: "Lekarz dentysta",
    spec: "endodoncja, stomatologia zachowawcza",
    photo: "assets/images/team-placeholder-f.svg",
  },
  {
    id: "anna-karwacka-oneczka",
    name: "mgr Anna Karwacka",
    role: "Higienistka stomatologiczna",
    spec: "",
    photo: "assets/images/ania.jpg",
  },
];

function teamGrid(linkPrefix = "zespol.html#") {
  return `<ul class="team-grid">
${team
  .map(
    (m) => `    <li>
      <a class="team-member" href="${linkPrefix}${m.id}">
        <img class="team-member__photo" src="${m.photo}" alt="" width="320" height="400">
        <p class="team-member__role">${m.role}</p>
        <h3 class="team-member__name">${m.name}</h3>
        ${m.spec ? `<p class="team-member__spec">${m.spec}</p>` : ""}
      </a>
    </li>`
  )
  .join("\n")}
  </ul>`;
}

const priceGroups = JSON.parse(
  fs.readFileSync(path.join(root, "assets", "data", "cennik.json"), "utf8")
);

const blogPosts = JSON.parse(
  fs.readFileSync(path.join(root, "assets", "data", "blog.json"), "utf8")
);

function priceSortValue(price) {
  const match = String(price).replace(/\s/g, "").match(/(\d+(?:[.,]\d+)?)/);
  return match ? Number(match[1].replace(",", ".")) : Number.POSITIVE_INFINITY;
}

function renderPrices() {
  return priceGroups
    .map(
      (g) => `
        <section class="price-group reveal">
          <h3>${g.title}</h3>
          <ul class="price-list">
            ${g.items
              .map(({ name, price, note }) => {
                const sortPrice = priceSortValue(price);
                return `
            <li data-name="${name.replace(/"/g, "&quot;")}" data-price="${sortPrice}">
              <span class="price-list__name">${name}</span>
              <span class="price-list__price">${price}</span>
              ${note ? `<span class="price-list__note">${note}</span>` : ""}
            </li>`;
              })
              .join("")}
          </ul>
        </section>`
    )
    .join("");
}

function blogPostHref(slug) {
  return `blog-${slug}.html`;
}

function renderBlogCards(limit = blogPosts.length) {
  return blogPosts
    .slice(0, limit)
    .map((post) => {
      const isVideo = Boolean(post.video);
      return `
        <a class="blog-card${isVideo ? " blog-card--video" : ""} reveal" href="${blogPostHref(post.slug)}">
          <span class="blog-card__media">
            <img src="${post.cover}" alt="" width="960" height="640" loading="lazy">
            ${isVideo ? `<span class="blog-card__play" aria-hidden="true"></span>` : ""}
          </span>
          <span class="blog-card__body">
            <time class="blog-card__date" datetime="${post.date}">${post.dateLabel}</time>
            <h3 class="blog-card__title">${post.title}</h3>
            <p class="blog-card__excerpt">${post.excerpt}</p>
            <span class="blog-card__more">${isVideo ? "Zobacz wpis i rolkę" : "Czytaj więcej"}</span>
          </span>
        </a>`;
    })
    .join("");
}

function renderBlogPost(post) {
  const gallery = (post.images || [])
    .map(
      (img, index) => `
          <figure class="blog-gallery__item">
            <button type="button" class="blog-gallery__trigger" data-lightbox-index="${index}" aria-label="Powiększ zdjęcie: ${img.alt}">
              <img src="${img.src}" alt="${img.alt}" width="1200" height="800" loading="lazy">
            </button>
          </figure>`
    )
    .join("");

  const paragraphs = (post.paragraphs || []).map((p) => `<p>${p}</p>`).join("\n");
  const links = (post.links || (post.externalLink ? [post.externalLink] : []))
    .map(
      (link) =>
        `<li><a href="${link.href}" rel="noopener noreferrer" target="_blank">${link.label}</a></li>`
    )
    .join("");
  const linksBlock = links
    ? `<div class="blog-links"><p class="blog-links__label">Zobacz też</p><ul>${links}</ul></div>`
    : "";

  const media = post.video
    ? `
          <aside class="blog-video reveal">
            <a class="blog-video__link" href="${post.video.href}" rel="noopener noreferrer" target="_blank">
              <img src="${post.video.poster}" alt="Miniatura rolki: ${post.title}" width="720" height="1280" loading="lazy">
              <span class="blog-video__play" aria-hidden="true"></span>
              <span class="blog-video__caption">${post.video.label}</span>
            </a>
          </aside>`
    : gallery
      ? `
          <div class="blog-gallery reveal" data-lightbox-gallery aria-label="Galeria zdjęć">
            ${gallery}
          </div>`
      : "";

  return (
    head({
      title: `${post.title} — dentalpassion`,
      description: post.excerpt,
      active: "blog.html",
      pagePath: blogPostHref(post.slug),
    }) +
    `
  <main id="main">
    <article class="blog-article${post.video ? " blog-article--with-video" : ""}">
      <header class="page-hero">
        <div class="container reveal">
          <p class="section__eyebrow"><a href="blog.html">Blog</a></p>
          <h1>${post.title}</h1>
          <p><time datetime="${post.date}">${post.dateLabel}</time></p>
        </div>
      </header>
      <section class="section" style="padding-top:0">
        <div class="container blog-article__layout">
          <div class="blog-article__content prose reveal">
            ${paragraphs}
            ${linksBlock}
            <p style="margin-top:2rem"><a class="btn btn--ghost" href="blog.html">Wróć do bloga</a></p>
          </div>
          ${media}
        </div>
      </section>
    </article>
  </main>
` +
    footer()
  );
}

function decodeEntities(s) {
  return s
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, "„")
    .replace(/&#8221;/g, "”")
    .replace(/&#8222;/g, "„")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&");
}

function cleanLegal(html) {
  const parts = [];
  const re = /<(h[2-4]|p|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[1].toLowerCase();
    let inner = decodeEntities(match[2]).replace(/<br\s*\/?>/gi, "<br>").trim();
    if (!inner || inner.length < 2) continue;
    if (tag.startsWith("h")) {
      parts.push(`<${tag}>${inner.replace(/<[^>]+>/g, "")}</${tag}>`);
    } else {
      // keep simple links
      inner = inner.replace(/<\/?span[^>]*>/gi, "");
      parts.push(`<${tag}>${inner}</${tag}>`);
    }
  }
  return parts.join("\n");
}

const index =
  head({
    title: "dentalpassion Marcin Mazik — stomatologia Warszawa",
    description:
      "Gabinet stomatologii dentalpassion w Warszawie. Stomatologia zachowawcza, estetyczna, endodoncja, protetyka, chirurgia i implantologia.",
    active: "index.html",
    heroHeader: true,
  }) +
  `
  <main id="main">
    <section class="hero" aria-label="Wprowadzenie">
      <div class="hero__media" aria-hidden="true">
        <img src="assets/images/hero.jpg" alt="" width="2048" height="1365">
        <div class="hero__overlay"></div>
      </div>
      <img class="hero__feathers" src="assets/images/feathers.png" alt="" width="240" height="240" aria-hidden="true">
      <div class="hero__content">
        <img class="hero__brand" src="assets/logo.png" alt="dentalpassion" width="420" height="90">
        <h1>Gabinet stomatologii z&nbsp;pasją do&nbsp;uśmiechu</h1>
        <p class="hero__text">Kompleksowe leczenie w Warszawie — funkcjonalność i estetyka w oparciu o najnowszą wiedzę oraz Digital Smile Design.</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="tel:+48501430894">Zamów wizytę</a>
          <a class="btn btn--light" href="cennik.html">Zobacz cennik</a>
        </div>
      </div>
    </section>

    <section class="section" id="zakres">
      <div class="container services-layout">
        <div class="reveal">
          <p class="section__eyebrow">Zakres usług</p>
          <h2>Kompleksowe leczenie pacjentów</h2>
          <p class="section__lead">Celem naszego leczenia jest przywrócenie funkcji oraz estetyki w oparciu o najnowszą wiedzę oraz wysokiej jakości materiały stomatologiczne.</p>
          <ul class="services-list">
            <li>stomatologia zachowawcza</li>
            <li>stomatologia estetyczna</li>
            <li>stomatologia dziecięca</li>
            <li>periodontologia</li>
            <li>endodoncja</li>
            <li>protetyka stomatologiczna</li>
            <li>chirurgia oraz implantologia</li>
          </ul>
          <p style="margin-top:1.5rem">Zaprojektujemy Państwa uśmiech w oparciu o dokumentację fotograficzną i zgodnie z zasadami Digital Smile Design (DSD).</p>
        </div>
        <div class="services-layout__media reveal">
          <img src="assets/images/clinic.jpg" alt="Wnętrze gabinetu stomatologicznego" width="800" height="600">
        </div>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container">
        <div class="reveal" style="margin-bottom:2rem">
          <p class="section__eyebrow">Dlaczego my</p>
          <h2>Leczenie bez stresu, z&nbsp;indywidualnym planem</h2>
        </div>
        <div class="highlights">
          <article class="highlight reveal">
            <span class="highlight__mark" aria-hidden="true"></span>
            <h3>FACE i DSD</h3>
            <p>Plan leczenia zgodny z filozofią FACE oraz Digital Smile Design — od dokumentacji fotograficznej po finalny efekt.</p>
          </article>
          <article class="highlight reveal">
            <span class="highlight__mark" aria-hidden="true"></span>
            <h3>Członek PASE</h3>
            <p>Dr Marcin Mazik jest członkiem Polskiej Akademii Stomatologii Estetycznej i stale rozwija kompetencje w kraju i za granicą.</p>
          </article>
          <article class="highlight reveal">
            <span class="highlight__mark" aria-hidden="true"></span>
            <h3>Przyjazna atmosfera</h3>
            <p>Dbamy o bezbolesne, spokojne wizyty — także u najmłodszych pacjentów i osób z dentofobią.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="zespol">
      <div class="container">
        <div class="reveal" style="margin-bottom:2rem; display:flex; flex-wrap:wrap; justify-content:space-between; gap:1rem; align-items:end">
          <div>
            <p class="section__eyebrow">Zespół</p>
            <h2>Poznaj naszych lekarzy</h2>
            <p class="section__lead">Doświadczeni dentyści specjalizujący się w zachowawczej, estetycznej, endodoncji, chirurgii i implantologii.</p>
          </div>
          <a class="btn btn--ghost" href="zespol.html">Pełny zespół</a>
        </div>
        <div class="reveal">
          ${teamGrid()}
        </div>
      </div>
    </section>

    <section class="section section--surface" id="blog">
      <div class="container">
        <div class="reveal" style="margin-bottom:2rem; display:flex; flex-wrap:wrap; justify-content:space-between; gap:1rem; align-items:end">
          <div>
            <p class="section__eyebrow">Blog</p>
            <h2>Aktualności z życia gabinetu</h2>
            <p class="section__lead">Szkolenia, wydarzenia i nowości, które wpływają na jakość leczenia w dentalpassion.</p>
          </div>
          <a class="btn btn--ghost" href="blog.html">Wszystkie wpisy</a>
        </div>
        <div class="blog-grid">
          ${renderBlogCards(2)}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band reveal">
          <div>
            <h2>Umów wizytę w dentalpassion</h2>
            <p>Ostrobramska 126/lok U14, Warszawa. Zadzwoń lub napisz — chętnie pomożemy wybrać dogodny termin.</p>
          </div>
          <div class="cta-band__actions">
            <a class="btn btn--light" href="tel:+48501430894">501 430 894</a>
            <a class="btn btn--ghost" href="kontakt.html" style="border-color:rgba(255,255,255,.4);color:#fff">Dane kontaktowe</a>
          </div>
        </div>
      </div>
    </section>
  </main>
` +
  footer();

const oNas =
  head({
    title: "O nas — dentalpassion Marcin Mazik",
    description:
      "Poznaj gabinet dentalpassion i lekarza dentystę Marcina Mazika — stomatologia estetyczna, protetyka i leczenie stawu skroniowo-żuchwowego w Warszawie.",
    active: "o-nas.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <p class="section__eyebrow">O nas</p>
        <h1>Gabinet z&nbsp;pasją do precyzji i&nbsp;estetyki</h1>
        <p>Witamy w dentalpassion — miejscu, w którym indywidualny plan leczenia łączy funkcję z pięknym uśmiechem.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container about-split">
        <div class="about-split__media reveal">
          <img src="assets/images/marcin.jpg" alt="lek. dent. Marcin Mazik" width="720" height="960">
        </div>
        <div class="prose reveal">
          <img class="feather-accent" src="assets/images/feathers.png" alt="" width="120" height="120" aria-hidden="true">
          <h2>Marcin Mazik</h2>
          <p>Witam w moim gabinecie, nazywam się Marcin Mazik i jestem lekarzem dentystą.</p>
          <p>Ukończyłem studia na Warszawskim Uniwersytecie Medycznym w 2006 roku, ale nieprzerwanie poszerzam swoją wiedzę i umiejętności na licznych stażach i szkoleniach w Polsce i zagranicą, zwłaszcza z zakresu stomatologii estetycznej i protetyki.</p>
          <p>Pasjonuję się funkcjonowaniem stawu skroniowo-żuchwowego oraz zaburzeniami narządu żucia.</p>
          <p>Jestem członkiem Polskiej Akademii Stomatologii Estetycznej PASE.</p>
          <p>Podchodzę do każdego Pacjenta indywidualnie i ustalam plan leczenia w oparciu o najnowszą wiedzę, zgodnie z filozofią FACE oraz DSD.</p>
          <p>Staram się, aby leczenie przebiegało bezstresowo, bezboleśnie i w przyjaznej atmosferze, dzięki czemu wielu pacjentów pozbawiłem dentofobii. Najlepszym tego przykładem są moi najmłodsi Pacjenci.</p>
          <p style="margin-top:2rem"><a class="btn btn--primary" href="tel:+48501430894">Zamów wizytę</a></p>
        </div>
      </div>
    </section>
  </main>
` +
  footer();

const zespol =
  head({
    title: "Zespół — dentalpassion Warszawa",
    description:
      "Poznaj zespół lekarzy dentystów dentalpassion: stomatologia zachowawcza, endodoncja, chirurgia i implantologia.",
    active: "zespol.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <p class="section__eyebrow">Zespół</p>
        <h1>Lekarze dentalpassion</h1>
        <p>Kompetencje w zakresie leczenia zachowawczego, estetycznego, endodoncji, chirurgii i implantologii.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="reveal" style="margin-bottom:3rem">
          ${teamGrid("#")}
        </div>
        ${team
          .map(
            (m) => `
        <article class="team-detail reveal" id="${m.id}">
          <div class="team-detail__grid">
            <img src="${m.photo}" alt="" width="200" height="250" style="border-radius:var(--radius-md);background:var(--color-surface)">
            <div>
              <p class="team-member__role">${m.role}</p>
              <h2>${m.name}</h2>
              ${m.spec ? `<p>${m.spec}</p>` : ""}
            </div>
          </div>
        </article>`
          )
          .join("")}
      </div>
    </section>
  </main>
` +
  footer();

const blog =
  head({
    title: "Blog — dentalpassion Warszawa",
    description:
      "Aktualności z życia gabinetu dentalpassion: szkolenia, sympozja i wydarzenia stomatologiczne.",
    active: "blog.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <p class="section__eyebrow">Blog</p>
        <h1>Aktualności z życia gabinetu</h1>
        <p>Relacje ze szkoleń, konferencji i wydarzeń, które rozwijają naszą praktykę stomatologiczną.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container blog-grid">
        ${renderBlogCards()}
      </div>
    </section>
  </main>
` +
  footer();

const blogPostPages = Object.fromEntries(
  blogPosts.map((post) => [blogPostHref(post.slug), renderBlogPost(post)])
);

const cennik =
  head({
    title: "Cennik — dentalpassion Warszawa",
    description:
      "Cennik usług stomatologicznych gabinetu dentalpassion w Warszawie: konsultacje, higiena, endodoncja, protetyka, chirurgia i implantologia.",
    active: "cennik.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <p class="section__eyebrow">Cennik</p>
        <h1>Przejrzyste ceny usług</h1>
        <p>Orientacyjne ceny zabiegów. Ostateczna wycena ustalana jest indywidualnie podczas konsultacji.</p>
        <div class="price-toolbar">
          <div class="price-search">
            <label class="visually-hidden" for="price-search">Szukaj w cenniku</label>
            <input
              id="price-search"
              class="price-search__input"
              type="search"
              name="q"
              placeholder="Szukaj zabiegu, np. implant, scaling…"
              autocomplete="off"
              enterkeyhint="search"
            >
          </div>
          <div class="price-sort">
            <label class="price-sort__label" for="price-sort">Sortuj</label>
            <select id="price-sort" class="price-sort__select">
              <option value="default">Domyślnie (kategorie)</option>
              <option value="name-asc">Usługa A–Z</option>
              <option value="name-desc">Usługa Z–A</option>
              <option value="price-asc">Cena: rosnąco</option>
              <option value="price-desc">Cena: malejąco</option>
            </select>
          </div>
          <p class="price-search__status" data-price-search-status aria-live="polite"></p>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container price-groups" data-price-catalog>
        ${renderPrices()}
        <p class="price-note reveal">Podane ceny mają charakter orientacyjny. Szczegółowa wycena pracy protetycznej oraz planu leczenia następuje na wizycie konsultacyjnej.</p>
        <p class="price-search__empty" data-price-search-empty hidden>Brak pozycji pasujących do wyszukiwania.</p>
      </div>
    </section>
  </main>
` +
  footer();

const kontakt =
  head({
    title: "Kontakt — dentalpassion Warszawa",
    description:
      "Skontaktuj się z gabinetem dentalpassion: ul. Ostrobramska 126, Warszawa. Tel. 501 430 894.",
    active: "kontakt.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <p class="section__eyebrow">Kontakt</p>
        <h1>Zapraszamy do gabinetu</h1>
        <p>Umów wizytę telefonicznie lub napisz — odpowiemy najszybciej, jak to możliwe.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container contact-grid">
        <div class="reveal">
          <div class="contact-block" style="margin-bottom:2rem">
            <h3>Adres</h3>
            <p>ul. Ostrobramska 126/lok U14<br>04-026 Warszawa</p>
          </div>
          <div class="contact-block" style="margin-bottom:2rem">
            <h3>Kontakt</h3>
            <p>Telefon: <a href="tel:+48501430894">501 430 894</a></p>
            <p>E-mail: <a href="mailto:kontakt@dentalpassion.waw.pl">kontakt@dentalpassion.waw.pl</a></p>
            <p style="margin-top:1rem">
              <a class="btn btn--primary" href="tel:+48501430894">Zamów wizytę</a>
            </p>
          </div>
          <div class="contact-block" style="margin-bottom:2rem">
            <h3>Godziny otwarcia</h3>
            <ul class="hours-list">
              <li><span>Poniedziałek</span><span>10:00 – 20:00</span></li>
              <li><span>Wtorek</span><span>10:00 – 20:00</span></li>
              <li><span>Środa</span><span>10:00 – 15:00</span></li>
              <li><span>Czwartek</span><span>10:00 – 20:00</span></li>
              <li><span>Piątek</span><span>10:00 – 15:00</span></li>
              <li><span>Sobota</span><span>Zamknięte</span></li>
              <li><span>Niedziela</span><span>Zamknięte</span></li>
            </ul>
          </div>
          <div class="contact-block">
            <h3>Social media</h3>
            <p><a href="https://www.facebook.com/DentalPassion-Warszawa-1872834242995470" rel="noopener noreferrer" target="_blank">Facebook — DentalPassion Warszawa</a></p>
          </div>
        </div>
        <div class="reveal">
          <iframe class="map-embed" title="Mapa — dentalpassion, Ostrobramska 126, Warszawa" src="https://maps.google.com/maps?q=Ostrobramska%20126%20Warszawa&t=m&z=15&output=embed&iwloc=near" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
      </div>
    </section>
  </main>
` +
  footer();

const rodo =
  head({
    title: "RODO — dentalpassion",
    description: "Informacja o ochronie danych osobowych (RODO) w gabinecie dentalpassion Marcin Mazik.",
    pagePath: "rodo.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <h1>RODO</h1>
        <p>Informacja o ochronie danych osobowych.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container prose reveal">
        <p>Informacja o ochronie danych osobowych na podstawie Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych), zwanym dalej „RODO”.</p>
        <h2>Kto jest administratorem danych osobowych?</h2>
        <p>Administratorem Państwa danych osobowych jest Marcin Mazik prowadzący działalność gospodarczą jako MARCIN MAZIK STOMATOLOGIA z siedzibą ul. Łukowska 30/96, 04-133 Warszawa, NIP: 1132511181, Numer REGON: 141414778, wykonujący działalność będąc zarejestrowanym zakładem leczniczym Dentalpassion „Mazik” ul. Ostrobramska 126 lok. 14, 04-026 Warszawa, określanym w dalszej części „MY” lub „Dentalpassion”.</p>
        <h2>Jakie dane osobowe pozyskujemy?</h2>
        <p>Państwa dane osobowe pozyskaliśmy i przetwarzamy w celu realizacji usługi opieki zdrowotnej w Dentalpassion zgodnie z art. 9 ust. 2 lit. h) RODO. Przepisy prawa nakładają na nas obowiązek pozyskania danych osobowych w celu realizacji usługi medycznej i prowadzenia związanej z nią dokumentacji medycznej. Ustawa o prawach pacjenta i Rzeczniku Praw Pacjenta w art. 25 wskazuje zakres zbieranych przez nas danych, zaś w art. 26 — jakie dane musimy zebrać w celu realizacji Państwa prawa do wglądu i udostępniania dokumentacji medycznej.</p>
        <p>Zgodnie z obowiązującymi przepisami do prawidłowej realizacji usługi medycznej niezbędne jest zebranie przez nas informacji o Państwa stanie zdrowia. Bez podania powyższych danych nie możemy świadczyć naszych usług. W celu sprawniejszej obsługi prosimy o dobrowolne wyrażenie zgody na przetwarzanie numeru telefonu i adresu e-mail.</p>
        <p>Możemy również pozyskiwać dane w przypadku korzystania przez Państwa ze strony internetowej w postaci plików cookie.</p>
        <p>Zgodę na przetwarzanie danych osobowych możecie Państwo wycofać w dowolnym momencie w ten sam sposób, w jaki ją wyraziliście.</p>
        <h2>Kto oprócz nas jest odbiorcą danych osobowych?</h2>
        <p>Odbiorcą Państwa danych mogą być współpracujące z nami podmioty takie jak:</p>
        <ul>
          <li>pracownie protetyczne w ramach realizacji procesu leczenia,</li>
          <li>firma świadcząca usługi księgowo-podatkowe,</li>
          <li>podmiot świadczący obsługę informatyczną.</li>
        </ul>
        <p>Państwa dane przed powierzeniem zabezpieczamy, podpisując wymaganą prawem umowę powierzenia i zapewniając zabezpieczenia techniczne przed dostępem osób niepowołanych oraz stosując zasady szyfrowania, pseudonimizacji i anonimizacji.</p>
        <h2>Jak długo przetwarzamy dane osobowe?</h2>
        <p>O czasie przetwarzania pozyskanych przez nas danych osobowych decydują terminy wskazane w przywołanych wyżej przepisach prawa o archiwizacji dokumentacji medycznej; termin ten wynosi 20 lat. Pozostałe dane przetwarzamy do czasu przedawnienia roszczeń związanych ze świadczonymi usługami w związku z ich rozliczeniem lub w celu wykonania zawartej umowy o kompleksowe leczenie lub świadczenie usługi medycznej.</p>
        <h2>Czy przetwarzamy dane osobowe automatycznie?</h2>
        <p>Państwa dane osobowe będą przetwarzane w sposób zautomatyzowany (w tym w formie profilowania), jednakże nie będzie to wywoływać żadnych skutków prawnych lub w podobny sposób istotnie wpływać na Państwa sytuację. Profilowanie danych osobowych przez nas polega jedynie na przetwarzaniu danych osobowych (również w sposób zautomatyzowany) poprzez wykorzystywanie ich do oceny niektórych informacji, w szczególności do analizy lub prognozy osobistych potrzeb i statystyk wykonywanych świadczeń w ramach zarządzania usługą medyczną.</p>
        <h2>Jakie prawa przysługują naszym Pacjentom?</h2>
        <p>Naszym Pacjentom przysługuje prawo dostępu do treści danych osobowych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu. Jeżeli przetwarzanie odbywa się na podstawie wyrażonej zgody: prawo do cofnięcia zgody w dowolnym momencie. Jedynie zgodnie z przepisami prawa może dojść do ograniczenia praw związanych z usunięciem danych lub prawem do ograniczenia przetwarzania, o czym Państwa w danym przypadku poinformujemy.</p>
        <p>Zgodnie z art. 21 ust. 4 RODO przysługuje Państwu prawo wniesienia sprzeciwu wobec przetwarzania dotyczących Państwa danych osobowych. Zgodnie z art. 21 ust. 1 RODO, składając sprzeciw, należy wskazać jego przyczyny związane z Państwa szczególną sytuacją.</p>
        <p>W przypadku potrzeby uzyskania dodatkowych informacji dotyczących przetwarzania Państwa danych lub wyrażenia sprzeciwu prosimy o zgłoszenie tego faktu bezpośrednio w naszej recepcji przy ul. Ostrobramskiej 126 lok. 14, 04-026 Warszawa, telefonicznie: <a href="tel:+48501430894">501 430 894</a> lub e-mail: <a href="mailto:kontakt@dentalpassion.waw.pl">kontakt@dentalpassion.waw.pl</a>.</p>
        <p>Jeśli uznacie Państwo, iż przetwarzanie danych osobowych narusza przepisy RODO, przysługuje Państwu prawo wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</p>
      </div>
    </section>
  </main>
` +
  footer();

const prawaRaw = fs.readFileSync(path.join(root, "docs", "content-export", "prawa-pacjenta.html"), "utf8");
const politRaw = fs.readFileSync(path.join(root, "docs", "content-export", "polityka-prywatnosci.html"), "utf8");

let prawaBody = cleanLegal(prawaRaw);
if (prawaBody.length < 500) {
  prawaBody =
    `<p>Szczegółowe informacje możesz uzyskać na stronie <a href="https://www.gov.pl/web/rpp/" rel="noopener noreferrer" target="_blank">gov.pl/web/rpp</a> lub pod numerem telefonu <a href="tel:800190590">800 190 590</a>.</p>` +
    prawaBody;
}

let politBody = cleanLegal(politRaw);
if (politBody.length < 500) {
  politBody =
    `<p>Polityka prywatności opisuje zasady przetwarzania informacji na Twój temat, w tym danych osobowych oraz plików cookies.</p>` +
    politBody;
}

const prawa =
  head({
    title: "Prawa pacjenta — dentalpassion",
    description: "Informacje o prawach pacjenta w gabinecie dentalpassion.",
    pagePath: "prawa-pacjenta.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <h1>Prawa pacjenta</h1>
        <p>Podstawowe informacje o Twoich prawach w placówce medycznej.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container prose reveal">
        ${prawaBody}
      </div>
    </section>
  </main>
` +
  footer();

const polityka =
  head({
    title: "Polityka prywatności — dentalpassion",
    description:
      "Polityka prywatności serwisu dentalpassion.waw.pl — dane osobowe i pliki cookies.",
    pagePath: "polityka-prywatnosci.html",
  }) +
  `
  <main id="main">
    <section class="page-hero">
      <div class="container reveal">
        <h1>Polityka prywatności</h1>
        <p>Zasady przetwarzania danych osobowych oraz plików cookies w serwisie dentalpassion.waw.pl.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container prose reveal">
        ${politBody}
      </div>
    </section>
  </main>
` +
  footer();

const files = {
  "index.html": index,
  "o-nas.html": oNas,
  "zespol.html": zespol,
  "cennik.html": cennik,
  "blog.html": blog,
  ...blogPostPages,
  "kontakt.html": kontakt,
  "rodo.html": rodo,
  "prawa-pacjenta.html": prawa,
  "polityka-prywatnosci.html": polityka,
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
  console.log("wrote", file, content.length);
}
