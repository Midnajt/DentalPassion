import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { priceGroups } from "@/data/cennik";
import { normalizeSearch, pick, priceSortValue } from "@/lib/locale";
import { Reveal } from "@/components/motion/Reveal";

type SortMode = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

export function PricingPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("default");

  const totalItems = useMemo(
    () => priceGroups.reduce((sum, group) => sum + group.items.length, 0),
    [],
  );

  const normalizedQuery = normalizeSearch(query);

  const visibleGroups = priceGroups
    .map((group) => {
      const items = group.items
        .map((item) => ({
          ...item,
          nameText: pick(item.name, lang),
          noteText: item.note ? pick(item.note, lang) : "",
          sortPrice: priceSortValue(item.price),
        }))
        .filter((item) => {
          if (!normalizedQuery) return true;
          return normalizeSearch(`${item.nameText} ${item.noteText} ${item.price}`).includes(normalizedQuery);
        });

      const ordered =
        sort === "default"
          ? items
          : [...items].sort((a, b) => {
              const nameA = normalizeSearch(a.nameText);
              const nameB = normalizeSearch(b.nameText);
              if (sort === "name-asc") return nameA.localeCompare(nameB, lang.startsWith("en") ? "en" : "pl");
              if (sort === "name-desc") return nameB.localeCompare(nameA, lang.startsWith("en") ? "en" : "pl");
              if (sort === "price-asc") return a.sortPrice - b.sortPrice || nameA.localeCompare(nameB);
              if (sort === "price-desc") return b.sortPrice - a.sortPrice || nameA.localeCompare(nameB);
              return 0;
            });

      return { title: pick(group.title, lang), items: ordered };
    })
    .filter((group) => group.items.length > 0);

  const visibleCount = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);
  const sortLabels: Record<SortMode, string> = {
    default: "",
    "name-asc": t("pricing.sortNameAsc"),
    "name-desc": t("pricing.sortNameDesc"),
    "price-asc": t("pricing.sortPriceAsc"),
    "price-desc": t("pricing.sortPriceDesc"),
  };

  const statusParts = [];
  if (normalizedQuery) statusParts.push(t("pricing.found", { visible: visibleCount, total: totalItems }));
  if (sort !== "default") statusParts.push(t("pricing.sorting", { label: sortLabels[sort] }));

  return (
    <main id="main">
      <section className="page-hero">
        <Reveal className="container">
          <p className="section__eyebrow">{t("pricing.eyebrow")}</p>
          <h1>{t("pricing.title")}</h1>
          <p>{t("pricing.lead")}</p>
          <div className="price-toolbar">
            <div className="price-search">
              <label className="visually-hidden" htmlFor="price-search">
                {t("pricing.searchLabel")}
              </label>
              <input
                id="price-search"
                className="price-search__input"
                type="search"
                name="q"
                placeholder={t("pricing.searchPlaceholder")}
                autoComplete="off"
                enterKeyHint="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="price-sort">
              <label className="price-sort__label" htmlFor="price-sort">
                {t("pricing.sort")}
              </label>
              <select
                id="price-sort"
                className="price-sort__select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
              >
                <option value="default">{t("pricing.sortDefault")}</option>
                <option value="name-asc">{t("pricing.sortNameAsc")}</option>
                <option value="name-desc">{t("pricing.sortNameDesc")}</option>
                <option value="price-asc">{t("pricing.sortPriceAsc")}</option>
                <option value="price-desc">{t("pricing.sortPriceDesc")}</option>
              </select>
            </div>
            <p className="price-search__status" aria-live="polite">
              {statusParts.join(" · ")}
            </p>
          </div>
        </Reveal>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container price-groups">
          {visibleGroups.map((group) => (
            <Reveal as="section" className="price-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="price-list">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.nameText}`}>
                    <span className="price-list__name">{item.nameText}</span>
                    <span className="price-list__price">{item.price}</span>
                    {item.noteText ? <span className="price-list__note">{item.noteText}</span> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal as="p" className="price-note">
            {t("pricing.note")}
          </Reveal>
          {visibleCount === 0 ? <p className="price-search__empty">{t("pricing.empty")}</p> : null}
        </div>
      </section>
    </main>
  );
}
