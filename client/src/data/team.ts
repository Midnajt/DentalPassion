import { assets } from "@/config/assets";
import type { Localized } from "@/lib/locale";

export type TeamGroup = "dentist" | "hygiene";

export type TeamMember = {
  id: string;
  name: string;
  role: Localized;
  spec: Localized;
  photo: string;
  bio: Localized;
  facebook: string;
  znanyLekarz: string;
  group: TeamGroup;
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
      pl: "Zajmuje się kompleksowymi rekonstrukcjami zgryzu, leczeniem protetycznym — również na implantach — oraz diagnostyką i leczeniem zaburzeń stawów skroniowo-żuchwowych. W pracy łączy prawidłową funkcję, naturalną estetykę i cyfrowe planowanie leczenia. Jest członkiem Polskiej Akademii Stomatologii Estetycznej (PASE) oraz wykładowcą — prowadzi szkolenia dla lekarzy dentystów w kraju i za granicą.",
      en: "He focuses on comprehensive bite reconstructions, prosthetic treatment — including implant-supported work — and diagnosis and treatment of TMJ disorders. His work combines proper function, natural aesthetics and digital treatment planning. He is a member of the Polish Academy of Aesthetic Dentistry (PASE) and a lecturer who runs courses for dentists in Poland and abroad.",
    },
    facebook: "https://www.facebook.com/mazik.marcin",
    znanyLekarz: "https://www.znanylekarz.pl/marcin-mazik/stomatolog/warszawa",
    group: "dentist",
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
    group: "dentist",
  },
  {
    id: "wiktor-poczobutt",
    name: "Wiktor Poczobutt-Odlanicki",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: { pl: "chirurgia, implantologia, protetyka", en: "surgery, implantology, prosthodontics" },
    photo: assets.wiktor,
    bio: {
      pl: "Certyfikowany implantolog OSIS-EDI (European Association of Dental Implantology). Absolwent Uniwersytetu Medycznego w Gdańsku (2008 r.). Ukończył dwuletni kurs implantologiczny na Uniwersytecie w Nowym Jorku, prezentując swoje dotychczasowe zabiegi i broniąc pracę pt. „Szablony chirurgiczne”. W latach 2017–2020 był wolontariuszem w Klinice Chirurgii Czaszkowo-Szczękowo-Twarzowej, Chirurgii Jamy Ustnej i Implantologii WUM. Uczestnik licznych kursów i kongresów z zakresu implantologii i implantoprotetyki. Swoje umiejętności rozwija pod okiem czołowych polskich implantologów. W codziennej praktyce wykonuje zabiegi chirurgiczne i protetyczne, kompleksowo podchodząc do planowania leczenia.",
      en: "A certified OSIS-EDI implantologist (European Association of Dental Implantology). He graduated from the Medical University of Gdańsk in 2008 and completed a two-year implantology course at New York University, presenting his clinical work and defending a thesis titled “Surgical templates”. From 2017 to 2020 he volunteered at the Department of Cranio-Maxillofacial Surgery, Oral Surgery and Implantology at the Medical University of Warsaw. He takes part in numerous courses and congresses in implantology and implant prosthetics, developing his skills under leading Polish implantologists. In daily practice he performs both surgical and prosthetic procedures, with a comprehensive approach to treatment planning.",
    },
    facebook: "#",
    znanyLekarz: "https://www.znanylekarz.pl/wiktor-poczobutt-odlanicki/stomatolog-protetyk/warszawa",
    group: "dentist",
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
    group: "dentist",
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
    group: "dentist",
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
    group: "dentist",
  },
  {
    id: "stella-stepniewska",
    name: "Stella Stępniewska",
    role: { pl: "Lekarz dentysta", en: "Dentist" },
    spec: {
      pl: "stomatologia zachowawcza, endodoncja mikroskopowa, stomatologia dziecięca",
      en: "restorative dentistry, microscope endodontics, paediatric dentistry",
    },
    photo: assets.stella,
    bio: {
      pl: "Absolwentka kierunku lekarsko-dentystycznego Uniwersytetu Medycznego w Łodzi. Staż podyplomowy odbyła w Wojskowym Instytucie Medycyny Lotniczej w Warszawie pod kierownictwem ppłk. lek. stom. Remigiusza Budziłło. W codziennej praktyce zajmuje się stomatologią zachowawczą, leczeniem kanałowym pod mikroskopem oraz stomatologią dziecięcą. Podobnie jak dr Marcin Mazik, zawodowo pasjonuje się stomatologią estetyczną i protetyką — każde leczenie planuje indywidualnie, do potrzeb, warunków zgryzowych i oczekiwań pacjenta. Stawia na zdrowie, satysfakcję pacjenta i precyzję, tak aby efekt był nie tylko estetyczny, ale też funkcjonalny i trwały. Duży nacisk kładzie na rozmowę i dokładne omówienie planu leczenia. Korzysta z nowoczesnych, minimalnie inwazyjnych technik i regularnie uczestniczy w konferencjach oraz szkoleniach. Ukończyła studia podyplomowe z medycyny estetycznej w Centrum Kształcenia Podyplomowego Warszawskiego Uniwersytetu Medycznego. Przyjmuje po polsku, angielsku i hiszpańsku.",
      en: "A graduate of dentistry at the Medical University of Łódź. She completed her postgraduate internship at the Military Institute of Aviation Medicine in Warsaw under Lt. Col. Remigiusz Budziłło, DDS. In daily practice she provides restorative dentistry, microscope-assisted root-canal treatment and paediatric dentistry. Like Marcin Mazik, DDS, she is especially drawn to aesthetic dentistry and prosthodontics — each treatment is planned individually around the patient’s needs, bite and expectations. She focuses on health, patient comfort and precision, so the result is aesthetic, functional and durable. She places strong emphasis on conversation and a clear discussion of the treatment plan. She uses modern, minimally invasive techniques and regularly attends conferences and courses. She completed postgraduate studies in aesthetic medicine at the Postgraduate Education Centre of the Medical University of Warsaw. She treats patients in Polish, English and Spanish.",
    },
    facebook: "#",
    znanyLekarz: "#",
    group: "dentist",
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
    facebook: "https://www.facebook.com/HigienistkaAnnaK/",
    znanyLekarz: "https://www.znanylekarz.pl/anna-karwacka-2/higienistka-stomatologiczna/warszawa#about-section",
    group: "hygiene",
  },
];

export const LEAD_ID = "marcin-mazik";

function teamSortKey(name: string) {
  return name.replace(/^(lek\.?\s*dent\.?|mgr|dr|n\.?\s*med\.?)\s+/i, "").trim();
}

function byName(a: TeamMember, b: TeamMember) {
  return teamSortKey(a.name).localeCompare(teamSortKey(b.name), "pl");
}

function listDentists(members: TeamMember[]) {
  const dentists = members.filter((m) => m.group === "dentist");
  const lead = dentists.filter((m) => m.id === LEAD_ID);
  const rest = dentists.filter((m) => m.id !== LEAD_ID).sort(byName);
  return [...lead, ...rest];
}

export const dentists = listDentists(team);
export const hygieneTeam = team.filter((m) => m.group === "hygiene").sort(byName);
export const teamListed = [...dentists, ...hygieneTeam];
