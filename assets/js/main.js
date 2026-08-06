(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const consentBanner = document.querySelector("[data-consent-banner]");
  const consentCheckbox = document.querySelector("[data-consent-checkbox]");
  const consentAccept = document.querySelector("[data-consent-accept]");
  const consentKey = "dentalpassion-consent-v1";

  if (consentBanner && consentCheckbox && consentAccept) {
    const stored = (() => {
      try {
        return localStorage.getItem(consentKey);
      } catch {
        return null;
      }
    })();

    if (stored === "accepted") {
      consentBanner.hidden = true;
    } else {
      consentBanner.hidden = false;
      requestAnimationFrame(() => {
        consentBanner.classList.add("is-visible");
        document.body.classList.add("has-consent-banner");
      });

      consentCheckbox.addEventListener("change", () => {
        consentAccept.disabled = !consentCheckbox.checked;
      });

      consentAccept.addEventListener("click", () => {
        if (!consentCheckbox.checked) return;
        try {
          localStorage.setItem(consentKey, "accepted");
        } catch {
          /* ignore storage errors */
        }
        consentBanner.classList.remove("is-visible");
        document.body.classList.remove("has-consent-banner");
        window.setTimeout(() => {
          consentBanner.hidden = true;
        }, 400);
      });
    }
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
      // threshold 0: tall blocks (e.g. legal pages) may never reach 16% visibility
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
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

  const gallery = document.querySelector("[data-lightbox-gallery]");
  if (gallery) {
    const triggers = [...gallery.querySelectorAll(".blog-gallery__trigger")];
    const items = triggers.map((trigger) => {
      const img = trigger.querySelector("img");
      return {
        src: img?.currentSrc || img?.src || "",
        alt: img?.alt || "",
      };
    }).filter((item) => item.src);

    if (items.length) {
      const dialog = document.createElement("div");
      dialog.className = "lightbox";
      dialog.hidden = true;
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-label", "Podgląd zdjęcia");
      dialog.innerHTML = `
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__panel">
          <button type="button" class="lightbox__close" data-lightbox-close aria-label="Zamknij podgląd">×</button>
          <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Poprzednie zdjęcie">‹</button>
          <figure class="lightbox__figure">
            <img class="lightbox__image" alt="">
            <figcaption class="lightbox__caption"></figcaption>
          </figure>
          <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Następne zdjęcie">›</button>
          <p class="lightbox__counter" aria-live="polite"></p>
        </div>
      `;
      document.body.appendChild(dialog);

      const imageEl = dialog.querySelector(".lightbox__image");
      const captionEl = dialog.querySelector(".lightbox__caption");
      const counterEl = dialog.querySelector(".lightbox__counter");
      const prevBtn = dialog.querySelector("[data-lightbox-prev]");
      const nextBtn = dialog.querySelector("[data-lightbox-next]");
      let index = 0;
      let lastFocus = null;

      const render = () => {
        const item = items[index];
        if (!item || !imageEl || !captionEl || !counterEl) return;
        imageEl.src = item.src;
        imageEl.alt = item.alt;
        captionEl.textContent = item.alt;
        counterEl.textContent = `${index + 1} / ${items.length}`;
        if (prevBtn) prevBtn.hidden = items.length < 2;
        if (nextBtn) nextBtn.hidden = items.length < 2;
      };

      const open = (startIndex) => {
        index = startIndex;
        lastFocus = document.activeElement;
        render();
        dialog.hidden = false;
        document.body.classList.add("has-lightbox");
        requestAnimationFrame(() => {
          dialog.classList.add("is-open");
          dialog.querySelector(".lightbox__close")?.focus();
        });
      };

      const close = () => {
        dialog.classList.remove("is-open");
        document.body.classList.remove("has-lightbox");
        window.setTimeout(() => {
          dialog.hidden = true;
          imageEl?.removeAttribute("src");
        }, 200);
        if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      };

      const step = (delta) => {
        index = (index + delta + items.length) % items.length;
        render();
      };

      triggers.forEach((trigger, triggerIndex) => {
        trigger.addEventListener("click", () => open(triggerIndex));
      });

      dialog.querySelectorAll("[data-lightbox-close]").forEach((el) => {
        el.addEventListener("click", close);
      });
      prevBtn?.addEventListener("click", () => step(-1));
      nextBtn?.addEventListener("click", () => step(1));

      document.addEventListener("keydown", (event) => {
        if (dialog.hidden) return;
        if (event.key === "Escape") close();
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      });

      let touchStartX = 0;
      dialog.addEventListener(
        "touchstart",
        (event) => {
          touchStartX = event.changedTouches[0]?.clientX || 0;
        },
        { passive: true }
      );
      dialog.addEventListener(
        "touchend",
        (event) => {
          const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
          if (Math.abs(deltaX) < 48) return;
          step(deltaX > 0 ? -1 : 1);
        },
        { passive: true }
      );
    }
  }

  const accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    const items = [...accordion.querySelectorAll(".accordion__item")];
    const reduceAccordionMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 450;

    items.forEach((item) => {
      const summary = item.querySelector(".accordion__summary");
      if (!summary) return;

      if (item.open) item.classList.add("is-open");

      summary.addEventListener("click", (event) => {
        if (reduceAccordionMotion) return;

        event.preventDefault();
        if (item.classList.contains("is-prep") || item.classList.contains("is-closing")) return;

        const isExpanded = item.open && !item.classList.contains("is-closing");

        if (isExpanded) {
          item.classList.remove("is-open");
          item.classList.add("is-closing");
          window.setTimeout(() => {
            item.open = false;
            item.classList.remove("is-closing");
          }, duration);
          return;
        }

        item.classList.add("is-prep");
        item.open = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.remove("is-prep");
            item.classList.add("is-open");
          });
        });
      });
    });
  }
})();
