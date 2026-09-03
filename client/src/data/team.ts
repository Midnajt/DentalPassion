import { assets } from "@/config/assets";
import type { Localized } from "@/lib/locale";

export type TeamMember = {
  id: string;
  name: string;
  role: Localized;
  spec: Localized;
  photo: string;
  bio: Localized;
  facebook: string;
  znanyLekarz: string;
};

export const team: TeamMember[] = [
  {
    id: "marcin-mazik",
    name: "Marcin Mazik",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: {
      pl: "protetyka i kompleksowa odbudowa zgryzu, stomatologia estetyczna, diagnostyka i leczenie zaburzeń stawów skroniowo-żuchwowych",
      en: "prosthodontics and comprehensive bite reconstruction, aesthetic dentistry, TMJ disorder diagnosis and treatment",
    },
    photo: assets.portrait,
    bio: {
      pl: "Założyciel dentalpassion. Zajmuje się kompleksowymi rekonstrukcjami zgryzu, leczeniem protetycznym — również na implantach — oraz diagnostyką i leczeniem zaburzeń stawów skroniowo-żuchwowych. W swojej pracy łączy prawidłową funkcję, naturalną estetykę i cyfrowe planowanie leczenia. Jest członkiem PASE oraz wykładowcą prowadzącym szkolenia dla lekarzy dentystów.",
      en: "Founder of dentalpassion. He focuses on comprehensive bite reconstructions, prosthetic treatment — including implant-supported work — and diagnosis and treatment of TMJ disorders. His work combines proper function, natural aesthetics and digital treatment planning. He is a PASE member and a lecturer who trains fellow dentists.",
    },
    facebook: "https://www.facebook.com/mazik.marcin",
    znanyLekarz: "https://www.znanylekarz.pl/marcin-mazik/stomatolog/warszawa",
  },
  {
    id: "marcin-kucharski",
    name: "dr Marcin Kucharski",
    role: { pl: "Ortodonta", en: "Orthodontist" },
    spec: { pl: "ortodoncja", en: "orthodontics" },
    photo: assets.placeholderM,
    bio: {
      pl: "Ortodonta w zespole dentalpassion. Zajmuje się leczeniem wad zgryzu i ustawieniem zębów — od diagnostyki po indywidualny plan terapii dopasowany do potrzeb pacjenta.",
      en: "Orthodontist on the dentalpassion team. He treats malocclusion and tooth alignment — from diagnosis to an individual therapy plan tailored to the patient.",
    },
    facebook: "#",
    znanyLekarz: "#",
  },
  {
    id: "wiktor-poczobutt",
    name: "Wiktor Poczobutt-Odlanicki",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: { pl: "chirurgia, implantologia", en: "surgery, implantology" },
    photo: assets.placeholderM,
    bio: {
      pl: "Specjalizuje się w zabiegach chirurgicznych oraz implantologii. Pracuje spokojnie i przewidywalnie, dbając o bezpieczeństwo leczenia oraz jasne omówienie planu przed każdym zabiegiem.",
      en: "He specialises in surgical procedures and implantology. He works calmly and predictably, focusing on treatment safety and a clear plan before every procedure.",
    },
    facebook: "#",
    znanyLekarz: "https://www.znanylekarz.pl/wiktor-poczobutt-odlanicki/stomatolog-protetyk/warszawa",
  },
  {
    id: "katarzyna-cichon",
    name: "Katarzyna Cichoń",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: { pl: "chirurgia, endodoncja", en: "surgery, endodontics" },
    photo: assets.placeholderF,
    bio: {
      pl: "Łączy doświadczenie z zakresu chirurgii i endodoncji. Podchodzi do leczenia metodycznie, z naciskiem na precyzję i komfort pacjenta na każdym etapie terapii.",
      en: "She combines experience in surgery and endodontics. Her approach is methodical, with emphasis on precision and patient comfort at every stage.",
    },
    facebook: "#",
    znanyLekarz: "#",
  },
  {
    id: "agnieszka-fundakowska",
    name: "Agnieszka Fundakowska",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: {
      pl: "stomatologia zachowawcza, stomatologia dziecięca",
      en: "restorative dentistry, paediatric dentistry",
    },
    photo: assets.placeholderF,
    bio: {
      pl: "Zajmuje się stomatologią zachowawczą oraz opieką nad najmłodszymi pacjentami. Stawia na przyjazną atmosferę wizyty i dokładne, estetyczne odbudowy zębów.",
      en: "She provides restorative dentistry and care for the youngest patients, with a friendly visit atmosphere and precise, aesthetic restorations.",
    },
    facebook: "#",
    znanyLekarz: "#",
  },
  {
    id: "karina-kuczynska",
    name: "Karina Kuczyńska-Witan",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: { pl: "endodoncja, stomatologia zachowawcza", en: "endodontics, restorative dentistry" },
    photo: assets.placeholderF,
    bio: {
      pl: "Koncentruje się na endodoncji i leczeniu zachowawczym. Pracuje dokładnie i spokojnie, tak aby leczenie kanałowe oraz odbudowy były skuteczne i komfortowe dla pacjenta.",
      en: "She focuses on endodontics and restorative treatment, working carefully so that root-canal therapy and restorations are effective and comfortable.",
    },
    facebook: "#",
    znanyLekarz: "https://www.znanylekarz.pl/karina-kuczynska-witan/stomatolog/warszawa",
  },
  {
    id: "stella-stepniewska",
    name: "Stella Stępniewska",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: { pl: "", en: "" },
    photo: assets.placeholderF,
    bio: {
      pl: "Lekarz dentysta w zespole dentalpassion. Dbamy wspólnie o indywidualne podejście do pacjenta, dokładną diagnostykę i leczenie dopasowane do potrzeb uśmiechu.",
      en: "A dentist on the dentalpassion team. Together we focus on an individual approach, thorough diagnostics and treatment tailored to each smile.",
    },
    facebook: "#",
    znanyLekarz: "#",
  },
  {
    id: "anna-karwacka-oneczka",
    name: "mgr Anna Karwacka",
    role: { pl: "Higienistka stomatologiczna", en: "Dental hygienist" },
    spec: { pl: "", en: "" },
    photo: assets.ania,
    bio: {
      pl: "Higienistka stomatologiczna, która dba o profilaktykę i komfort wizyt higienizacyjnych. Wspiera pacjentów w utrzymaniu zdrowych dziąseł oraz pięknego, zadbanego uśmiechu na co dzień.",
      en: "A dental hygienist who focuses on prevention and comfortable hygiene visits. She helps patients keep healthy gums and a well-cared-for smile every day.",
    },
    facebook: "https://www.facebook.com/anna.oneczka?locale=pl_PL",
    znanyLekarz: "https://www.znanylekarz.pl/anna-karwacka-2/higienistka-stomatologiczna/warszawa#about-section",
  },
];

function teamSortKey(name: string) {
  return name.replace(/^(lek\.?\s*dent\.?|mgr|dr|n\.?\s*med\.?)\s+/i, "").trim();
}

export const teamSorted = [...team].sort((a, b) =>
  teamSortKey(a.name).localeCompare(teamSortKey(b.name), "pl"),
);
