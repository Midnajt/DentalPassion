export type Localized = { pl: string; en: string };

export function pick(value: Localized, language: string) {
  return language.startsWith("en") ? value.en : value.pl;
}

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function priceSortValue(price: string) {
  const match = String(price).replace(/\s/g, "").match(/(\d+(?:[.,]\d+)?)/);
  return match ? Number(match[1].replace(",", ".")) : Number.POSITIVE_INFINITY;
}
