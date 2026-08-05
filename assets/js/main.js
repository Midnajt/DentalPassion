(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  const priceSearch = document.querySelector("#price-search");
  const priceSort = document.querySelector("#price-sort");
  const priceCatalog = document.querySelector("[data-price-catalog]");
  if (priceCatalog && (priceSearch || priceSort)) {
    const groups = [...priceCatalog.querySelectorAll(".price-group")].map((group) => {
      const list = group.querySelector(".price-list");
      const items = list ? [...list.querySelectorAll("li")] : [];
      return { group, list, originalOrder: items };
    });
    const status = document.querySelector("[data-price-search-status]");
    const empty = document.querySelector("[data-price-search-empty]");
    const totalItems = groups.reduce((sum, entry) => sum + entry.originalOrder.length, 0);

    const normalize = (value) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const compareItems = (a, b, mode) => {
      const nameA = normalize(a.dataset.name || a.querySelector(".price-list__name")?.textContent || "");
      const nameB = normalize(b.dataset.name || b.querySelector(".price-list__name")?.textContent || "");
      const priceA = Number(a.dataset.price);
      const priceB = Number(b.dataset.price);

      if (mode === "name-asc") return nameA.localeCompare(nameB, "pl");
      if (mode === "name-desc") return nameB.localeCompare(nameA, "pl");
      if (mode === "price-asc") return priceA - priceB || nameA.localeCompare(nameB, "pl");
      if (mode === "price-desc") return priceB - priceA || nameA.localeCompare(nameB, "pl");
      return 0;
    };

    const applyCatalog = () => {
      const query = normalize(priceSearch?.value || "");
      const mode = priceSort?.value || "default";
      let visibleCount = 0;

      groups.forEach(({ group, list, originalOrder }) => {
        if (!list) return;

        const ordered =
          mode === "default"
            ? [...originalOrder]
            : [...originalOrder].sort((a, b) => compareItems(a, b, mode));

        ordered.forEach((item) => list.appendChild(item));

        let groupVisible = 0;
        ordered.forEach((item) => {
          const haystack = normalize(item.textContent || "");
          const match = !query || haystack.includes(query);
          item.classList.toggle("is-filtered-out", !match);
          if (match) groupVisible += 1;
        });

        group.classList.toggle("is-filtered-out", groupVisible === 0);
        visibleCount += groupVisible;
      });

      if (status) {
        const parts = [];
        if (query) parts.push(`Znaleziono ${visibleCount} z ${totalItems} pozycji`);
        if (mode !== "default") {
          const labels = {
            "name-asc": "A–Z",
            "name-desc": "Z–A",
            "price-asc": "cena rosnąco",
            "price-desc": "cena malejąco",
          };
          parts.push(`Sortowanie: ${labels[mode] || mode}`);
        }
        status.textContent = parts.join(" · ");
      }

      if (empty) {
        empty.hidden = visibleCount > 0;
      }
    };

    priceSearch?.addEventListener("input", applyCatalog);
    priceSort?.addEventListener("change", applyCatalog);
  }
})();
