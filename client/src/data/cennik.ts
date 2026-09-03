import type { Localized } from "@/lib/locale";

export type PriceItem = {
  name: Localized;
  price: string;
  note?: Localized;
};

export type PriceGroup = {
  title: Localized;
  items: PriceItem[];
};

const n = (pl: string, en: string): Localized => ({ pl, en });

export const priceGroups: PriceGroup[] = [
  {
    title: n("Konsultacje", "Consultations"),
    items: [
      { name: n("Badanie stomatologiczne", "Dental examination"), price: "120 zł" },
      {
        name: n(
          "Konsultacja dotycząca stawu skroniowo-żuchwowego / ortodontyczna",
          "TMJ / orthodontic consultation",
        ),
        price: "250–350 zł",
      },
    ],
  },
  {
    title: n("Znieczulenie", "Anaesthesia"),
    items: [
      { name: n("Znieczulenie nasiękowe", "Infiltration anaesthesia"), price: "50 zł" },
      { name: n("Znieczulenie przewodowe", "Nerve-block anaesthesia"), price: "60 zł" },
      { name: n("Znieczulenie do zabiegu higienizacji", "Anaesthesia for hygiene treatment"), price: "80 zł" },
    ],
  },
  {
    title: n("Higiena i profilaktyka", "Hygiene and prevention"),
    items: [
      { name: n("Scaling + polerowanie / piaskowanie", "Scaling + polishing / air polishing"), price: "200 zł" },
      { name: n("Fluoryzacja", "Fluoride treatment"), price: "120 zł" },
      {
        name: n(
          "Scaling + piaskowanie + polerowanie + fluoryzacja / hydroksyapatyt",
          "Scaling + air polishing + polishing + fluoride / hydroxyapatite",
        ),
        price: "350 zł",
      },
      { name: n("Zabieg higienizacji u dziecka powyżej 9 lat", "Hygiene treatment for a child over 9"), price: "290 zł" },
      { name: n("Czyszczenie + fluoryzacja u dziecka", "Cleaning + fluoride for a child"), price: "180–230 zł" },
      {
        name: n(
          "Vector Paro (całość jamy ustnej) / Zabieg higienizacji Vector z hydroksyapatytem",
          "Vector Paro (full mouth) / Vector hygiene with hydroxyapatite",
        ),
        price: "od 500 zł",
      },
      { name: n("Vector Paro (1 kieszonka)", "Vector Paro (1 pocket)"), price: "80–100 zł" },
    ],
  },
  {
    title: n("Stomatologia zachowawcza i estetyczna", "Restorative and aesthetic dentistry"),
    items: [
      { name: n("Wypełnienie małe", "Small filling"), price: "300 zł" },
      { name: n("Wypełnienie średnie", "Medium filling"), price: "350–380 zł" },
      { name: n("Wypełnienie duże", "Large filling"), price: "400–480 zł" },
      {
        name: n(
          "Wypełnienie wielopowierzchniowe wzmocnione włóknem szklanym",
          "Multi-surface filling reinforced with glass fibre",
        ),
        price: "500–1000 zł",
      },
      { name: n("Wypełnienie w zębie mlecznym", "Filling in a primary tooth"), price: "250 zł" },
      { name: n("Opatrunek", "Dressing"), price: "150 zł" },
      { name: n("Opatrunek ZNO", "ZOE dressing"), price: "250 zł" },
      { name: n("Opatrunek Fuji", "Fuji dressing"), price: "300 zł" },
      { name: n("Zmiana kształtu zęba / zamykanie diastemy", "Tooth reshaping / diastema closure"), price: "350–1000 zł" },
      { name: n("Licówka kompozytowa", "Composite veneer"), price: "1000–1500 zł" },
      { name: n("Leczenie w koferdamie", "Treatment under rubber dam"), price: "+ 30 zł" },
      { name: n("Płukanie kieszeni + Alveogyl", "Pocket irrigation + Alveogyl"), price: "120 zł" },
    ],
  },
  {
    title: n("Endodoncja", "Endodontics"),
    items: [
      { name: n("Pierwsza pomoc endodontyczna", "Emergency endodontic care"), price: "300 zł" },
      { name: n("Odbudowa pod koferdam", "Build-up under rubber dam"), price: "250–300 zł" },
      { name: n("Trepanacja przez koronę", "Access through a crown"), price: "150–200 zł" },
      {
        name: n("Usunięcie narzędzia / wkładu z kanału", "Removal of a file / post from the canal"),
        price: "600 zł",
        note: n("za 1h pracy", "per 1 hour of work"),
      },
      { name: n("Usunięcie zębiniaka", "Removal of a pulp stone"), price: "400 zł" },
      { name: n("MTA", "MTA"), price: "300–500 zł" },
      {
        name: n("Dewitalizacja z opatrunkiem", "Devitalisation with dressing"),
        price: "300–350 zł",
        note: n("Cena zawiera znieczulenie", "Price includes anaesthesia"),
      },
      { name: n("Leczenie endodontyczne — 1 kanał", "Root canal treatment — 1 canal"), price: "1000 zł" },
      { name: n("Leczenie endodontyczne — 2 kanały", "Root canal treatment — 2 canals"), price: "1300 zł" },
      { name: n("Leczenie endodontyczne — 3 kanały", "Root canal treatment — 3 canals"), price: "1600 zł" },
      { name: n("Leczenie endodontyczne — 4 kanały", "Root canal treatment — 4 canals"), price: "2000 zł" },
      { name: n("Powtórne leczenie endodontyczne — 1 kanał", "Retreatment — 1 canal"), price: "1200 zł" },
      { name: n("Powtórne leczenie endodontyczne — 2 kanały", "Retreatment — 2 canals"), price: "1500 zł" },
      { name: n("Powtórne leczenie endodontyczne — 3 kanały", "Retreatment — 3 canals"), price: "2000 zł" },
      { name: n("Powtórne leczenie endodontyczne — 4 kanały", "Retreatment — 4 canals"), price: "2300 zł" },
    ],
  },
  {
    title: n("Protetyka", "Prosthodontics"),
    items: [
      { name: n("Korona porcelanowa na stopie Cr-Co", "Porcelain crown on Cr-Co alloy"), price: "1800 zł" },
      { name: n("Korona porcelanowa na złocie", "Porcelain crown on gold"), price: "1800 zł + koszt złota" },
      {
        name: n("Korona pełnoceramiczna na podbudowie cyrkonowej", "Full-ceramic crown on zirconia"),
        price: "2500–3500 zł",
      },
      { name: n("Licówka", "Veneer"), price: "2500–4500 zł" },
      { name: n("Inlay / onlay kompozytowy", "Composite inlay / onlay"), price: "1800 zł" },
      { name: n("Inlay / onlay ceramiczny", "Ceramic inlay / onlay"), price: "2500 zł" },
      { name: n("Wkład z włókna szklanego — 1 kanał", "Glass-fibre post — 1 canal"), price: "950 zł" },
      { name: n("Wkład z włókna szklanego — każdy kolejny kanał", "Glass-fibre post — each extra canal"), price: "350 zł" },
      { name: n("Wkład koronowo-korzeniowy metalowy", "Metal cast post and core"), price: "1000 zł" },
      { name: n("Proteza częściowa", "Partial denture"), price: "250 zł", note: n("za punkt", "per unit") },
      { name: n("Proteza całkowita", "Complete denture"), price: "3000 zł" },
      { name: n("Proteza szkieletowa", "Cast partial denture"), price: "3000–3500 zł" },
      {
        name: n("Osadzenie korony wykonanej w innym gabinecie", "Cementation of a crown made elsewhere"),
        price: "350 zł",
        note: n("za punkt", "per unit"),
      },
      { name: n("Model orientacyjny", "Study model"), price: "100 zł" },
      { name: n("Korona tymczasowa", "Temporary crown"), price: "250–300 zł" },
      { name: n("Szynowanie — włókno szklane", "Splinting — glass fibre"), price: "200 zł", note: n("za ząb", "per tooth") },
      { name: n("Szyna relaksacyjna", "Occlusal splint"), price: "1200–1500 zł" },
      { name: n("Korekta szyny", "Splint adjustment"), price: "200 zł" },
      { name: n("Ekwilibracja", "Occlusal equilibration"), price: "250–500 zł" },
      { name: n("Badanie zwarcia OccluSense", "OccluSense bite analysis"), price: "350 zł" },
      { name: n("Planowanie leczenia protetycznego", "Prosthetic treatment planning"), price: "2000 zł" },
      {
        name: n("Podnoszenie zwarcia metodą tłoczenia kompozytu", "Bite raising with injected composite"),
        price: "1000 zł",
        note: n("za punkt", "per unit"),
      },
    ],
  },
  {
    title: n("Wybielanie", "Whitening"),
    items: [
      {
        name: n("Wybielanie Prevdent 2 łuki + pasta podtrzymująca efekt", "Prevdent whitening, both arches + maintenance paste"),
        price: "2000 zł",
      },
      { name: n("Wybielanie Beyond lampa", "Beyond lamp whitening"), price: "1200 zł" },
      { name: n("Odświeżenie wybielania", "Whitening touch-up"), price: "500 zł" },
      { name: n("Wybielanie nakładkowe", "Tray whitening"), price: "1400 zł" },
      { name: n("Wybielanie martwego zęba — pierwsza wizyta", "Internal whitening — first visit"), price: "150–200 zł" },
      { name: n("Wybielanie martwego zęba — kolejna wizyta", "Internal whitening — next visit"), price: "120 zł" },
    ],
  },
  {
    title: n("Chirurgia", "Surgery"),
    items: [
      { name: n("Usunięcie zęba rozchwianego / mlecznego", "Extraction of a loose / primary tooth"), price: "150–250 zł" },
      { name: n("Usunięcie zęba stałego", "Extraction of a permanent tooth"), price: "400–600 zł" },
      { name: n("Operacyjne usunięcie zęba", "Surgical extraction"), price: "700–1000 zł" },
      { name: n("Resekcja", "Apicoectomy"), price: "1000 zł" },
      { name: n("Usunięcie zmiany", "Removal of a lesion"), price: "400–600 zł" },
      {
        name: n("Wyłuszczenie torbieli + badanie histo-patologiczne", "Cyst enucleation + histopathology"),
        price: "600–800 zł",
      },
      { name: n("Opatrunek chirurgiczny", "Surgical dressing"), price: "100 zł" },
      {
        name: n("Kiretaż zamknięty", "Closed curettage"),
        price: "100–150 zł",
        note: n(
          "za ząb — w zależności od stanu przyzębia i liczby zębów objętych zabiegiem",
          "per tooth — depending on periodontal status and number of teeth treated",
        ),
      },
      { name: n("Plastyka wędzidełka", "Frenuloplasty"), price: "400–500 zł" },
    ],
  },
  {
    title: n("Implantologia", "Implantology"),
    items: [
      { name: n("Wszczepienie implantu", "Implant placement"), price: "3500 zł" },
      { name: n("Podniesienie dna zatoki", "Sinus lift"), price: "3800–6000 zł" },
      { name: n("Korona na implancie", "Crown on implant"), price: "3300–4000 zł" },
    ],
  },
  {
    title: n("Diagnostyka", "Diagnostics"),
    items: [{ name: n("RTG punktowe", "Periapical X-ray"), price: "50 zł" }],
  },
];
