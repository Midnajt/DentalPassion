import { assets } from "@/config/assets";
import type { Localized } from "@/lib/locale";

export type BlogImage = { src: string; alt: Localized };
export type BlogLink = { href: string; label: Localized };
export type BlogPost = {
  slug: string;
  title: Localized;
  date: string;
  dateLabel: Localized;
  excerpt: Localized;
  cover: string;
  images?: BlogImage[];
  video?: { href: string; poster: string; label: Localized };
  paragraphs: Localized[];
  links: BlogLink[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "wloska-szkola-stomatologii-posturalnej-2026",
    title: {
      pl: "Moduł II Włoskiej Szkoły Stomatologii Posturalnej",
      en: "Module II of the Italian School of Postural Dentistry",
    },
    date: "2026-09-13",
    dateLabel: { pl: "11–13 września 2026", en: "11–13 September 2026" },
    excerpt: {
      pl: "Lek. dent. Marcin Mazik wziął udział w module II Włoskiej Szkoły Stomatologii Posturalnej (SOSPP) — szkoleniu o związkach okluzji, stawu skroniowo-żuchwowego i postawy całego ciała.",
      en: "Marcin Mazik, DDS, took part in Module II of the Italian School of Postural Dentistry (SOSPP) — training on the links between occlusion, the TMJ and whole-body posture.",
    },
    cover: assets.events.postural[2],
    images: [
      {
        src: assets.events.postural[2],
        alt: {
          pl: "Uczestnicy modułu II SOSPP na tle ścianki Holimedica",
          en: "Participants of SOSPP Module II in front of the Holimedica backdrop",
        },
      },
      {
        src: assets.events.postural[1],
        alt: {
          pl: "Wykład o płaszczyźnie okluzyjnej i klasach zgryzu podczas szkolenia posturalnego",
          en: "Lecture on the occlusal plane and bite classes during the postural dentistry course",
        },
      },
      {
        src: assets.events.postural[0],
        alt: {
          pl: "Plakat modułu II Włoskiej Szkoły Stomatologii Posturalnej, Holimedica, 11–13 września 2026",
          en: "Poster for Module II of the Italian School of Postural Dentistry, Holimedica, 11–13 September 2026",
        },
      },
    ],
    paragraphs: [
      {
        pl: "W dniach 11–13 września 2026 roku lek. dent. Marcin Mazik wziął udział w module II Włoskiej Szkoły Stomatologii Posturalnej, organizowanym przez Holimedica w ramach SOSPP — School of Systemic Postural Dentistry, Poland.",
        en: "On 11–13 September 2026 Marcin Mazik, DDS, took part in Module II of the Italian School of Postural Dentistry, organised by Holimedica as part of SOSPP — School of Systemic Postural Dentistry, Poland.",
      },
      {
        pl: "Stomatolog interesuje się postawą całego ciała, bo w organizmie wszystko jest ze sobą połączone. Zgryz, staw skroniowo-żuchwowy, napięcia mięśniowe, a nawet bóle głowy, karku czy kręgosłupa to często jedna układanka — a nie osobne problemy.",
        en: "A dentist looks at whole-body posture because everything in the body is connected. The bite, the temporomandibular joint, muscle tension, and even headaches, neck or back pain are often one puzzle — not separate problems.",
      },
      {
        pl: "W drugim module szkolenie pogłębiało zależności między okluzją a postawą, diagnostykę posturalną pacjenta oraz interdyscyplinarne podejście do leczenia. Tę wiedzę przenosimy do gabinetu dentalpassion: zdrowe zęby to nie tylko piękny uśmiech, ale też równowaga całego ciała.",
        en: "The second module went deeper into the relationship between occlusion and posture, postural diagnosis of the patient, and an interdisciplinary approach to treatment. We bring that knowledge into the dentalpassion practice: healthy teeth are not only a beautiful smile, but also whole-body balance.",
      },
    ],
    links: [
      {
        href: "https://www.facebook.com/permalink.php?story_fbid=pfbid037BwADG6zPhZQ31a4RBoP1Fhxuk5HzM5BSqJj6gnwqabEof7Xc8SZvr1TrCxijxmql&id=100038760174635",
        label: { pl: "Relacja na Facebooku", en: "Facebook post" },
      },
      {
        href: "https://holimedica.pl/produkt/wloska-szkola-2026/",
        label: { pl: "Szkoła — holimedica.pl", en: "Course — holimedica.pl" },
      },
    ],
  },
  {
    slug: "seeking-occlusion-madrid",
    title: {
      pl: "Dentalpassion na Seeking Occlusion w Madrycie",
      en: "Dentalpassion at Seeking Occlusion in Madrid",
    },
    date: "2025-05-31",
    dateLabel: { pl: "31 maja 2025", en: "31 May 2025" },
    excerpt: {
      pl: "Nasz zespół wziął udział w międzynarodowym sympozjum Seeking Occlusion Global Concept — trzech dniach wykładów, paneli i wystawy poświęconych okluzji oraz rehabilitacji narządu żucia.",
      en: "Our team took part in the international Seeking Occlusion Global Concept symposium — three days of lectures, panels and an exhibition on occlusion and rehabilitation of the masticatory system.",
    },
    cover: assets.events.first[1],
    images: [
      { src: assets.events.first[0], alt: { pl: "Plakat sympozjum Seeking Occlusion Global Concept w Madrycie", en: "Poster of the Seeking Occlusion Global Concept symposium in Madrid" } },
      { src: assets.events.first[1], alt: { pl: "Spotkanie podczas Seeking Occlusion Global Concept", en: "A meeting during Seeking Occlusion Global Concept" } },
      { src: assets.events.first[2], alt: { pl: "Uczestnicy sympozjum Seeking Occlusion przed ekranem konferencyjnym", en: "Seeking Occlusion participants in front of the conference screen" } },
      { src: assets.events.first[3], alt: { pl: "Wykład o anatomii stawu i kręgosłupa szyjnego podczas sympozjum", en: "Lecture on joint and cervical spine anatomy during the symposium" } },
      { src: assets.events.first[4], alt: { pl: "Prezentacja analiz okluzyjnych na skanach 3D podczas Seeking Occlusion", en: "Presentation of occlusal analyses on 3D scans at Seeking Occlusion" } },
    ],
    paragraphs: [
      {
        pl: "W dniach 29–31 maja 2025 roku mieliśmy okazję uczestniczyć w Seeking Occlusion Global Concept — międzynarodowym sympozjum poświęconym okluzji i rehabilitacji układu stomatognatycznego, które odbyło się w COEM w Madrycie.",
        en: "On 29–31 May 2025 we took part in Seeking Occlusion Global Concept — an international symposium on occlusion and rehabilitation of the stomatognathic system, held at COEM in Madrid.",
      },
      {
        pl: "Wydarzenie zgromadziło najważniejsze szkoły i specjalistów z całego świata. Przez trzy dni można było poznać, zrozumieć i porównać różne podejścia do okluzji oraz rehabilitacji narządu żucia — a także wymieniać doświadczenia kliniczne i technologiczne podczas codziennych paneli dyskusyjnych. Tak intensywna konfrontacja protokołów w jednym miejscu i czasie zdarza się w stomatologii rzadko.",
        en: "The event brought together leading schools and specialists from around the world. Over three days it was possible to learn, understand and compare different approaches to occlusion and rehabilitation of the masticatory system — and to exchange clinical and technological experience during daily discussion panels. Such an intensive comparison of protocols in one place is rare in dentistry.",
      },
      {
        pl: "Równolegle z sesją wykładową trwała wystawa innowacyjnych produktów i usług związanych z diagnostyką oraz leczeniem układu żucia. To była doskonała okazja do rozmów z ekspertami, praktykami i firmami z branży stomatologicznej.",
        en: "Alongside the lecture programme there was an exhibition of innovative products and services related to diagnosis and treatment of the masticatory system — a chance to talk with experts, clinicians and dental companies.",
      },
      {
        pl: "Wiedzę i inspiracje z Madrytu przenosimy do codziennej pracy w gabinecie dentalpassion — zwłaszcza w obszarze funkcjonowania stawu skroniowo-żuchwowego oraz kompleksowej rehabilitacji.",
        en: "We bring the knowledge and inspiration from Madrid into everyday work at dentalpassion — especially in TMJ function and comprehensive rehabilitation.",
      },
    ],
    links: [
      {
        href: "https://www.seekingocclusion.com/",
        label: { pl: "Strona wydarzenia — seekingocclusion.com", en: "Event website — seekingocclusion.com" },
      },
    ],
  },
  {
    slug: "profesjonalna-higienizacja",
    title: {
      pl: "Na czym polega profesjonalna higienizacja?",
      en: "What does professional dental hygiene involve?",
    },
    date: "2025-08-01",
    dateLabel: { pl: "sierpień 2025", en: "August 2025" },
    excerpt: {
      pl: "Zabieg zalecany zwykle co 6 miesięcy — a u części pacjentów częściej. To nie tylko estetyka: implanty, aparat i prace protetyczne nie wykluczają higienizacji.",
      en: "Usually recommended every 6 months — more often for some patients. It is not just about looks: implants, braces and prosthetic work are not a reason to skip it.",
    },
    cover: assets.events.reelThumb,
    video: {
      href: "https://www.facebook.com/reel/1035115892020722",
      poster: assets.events.reelThumb,
      label: { pl: "Obejrzyj rolkę na Facebooku", en: "Watch the reel on Facebook" },
    },
    paragraphs: [
      {
        pl: "Profesjonalna higienizacja to zabieg profilaktyczny, który usuwa kamień, osad i biofilm trudny do wyczyszczenia w domu. W dentalpassion zalecamy go zwykle co 6 miesięcy. Przy zapaleniu dziąseł, większej skłonności do kamienia albo gdy w jamie ustnej jest aparat, implanty lub prace protetyczne — wizyty bywają częstsze.",
        en: "Professional hygiene treatment is a preventive visit that removes tartar, stain and biofilm that home brushing cannot fully reach. At dentalpassion we usually recommend it every 6 months. With gum inflammation, a tendency to build-up, or with braces, implants or prosthetic work, visits may be more frequent.",
      },
      {
        pl: "To nie jest wyłącznie zabieg „na ładniejszy uśmiech”. Regularne oczyszczanie chroni dziąsła, zmniejsza ryzyko próchnicy i stanów zapalnych oraz pomaga utrzymać świeży oddech. Jaśniejsze, gładsze zęby są skutkiem zdrowej jamy ustnej — nie jedynym celem.",
        en: "It is not just a cosmetic polish. Regular professional cleaning protects the gums, lowers the risk of cavities and inflammation, and helps keep breath fresh. Whiter, smoother teeth are a result of a healthier mouth — not the only goal.",
      },
      {
        pl: "Implanty, aparat ortodontyczny i uzupełnienia protetyczne nie są przeciwwskazaniem. Wręcz przeciwnie: wokół implantów, zamków i koron osad zbiera się łatwiej, więc higienizacja jest szczególnie ważna. Dobieramy narzędzia i technikę tak, by oczyścić te miejsca bez uszkodzenia prac.",
        en: "Implants, orthodontic appliances and prosthetic restorations are not a contraindication. On the contrary: plaque collects more easily around implants, brackets and crowns, so hygiene visits matter even more. We choose instruments and technique so those areas can be cleaned without damaging the work.",
      },
      {
        pl: "Typowe etapy to ocena stanu jamy ustnej, usunięcie kamienia (skaling), piaskowanie osadów, polerowanie powierzchni oraz — gdy jest wskazanie — fluoryzacja i instruktaż higieny w domu. W rolce na Facebooku rozwijamy te zagadnienia: po co ten zabieg, czy to tylko estetyka i jak wygląda krok po kroku.",
        en: "Typical stages include an oral-health check, tartar removal (scaling), air-polishing of stains, surface polishing and — when indicated — fluoride and home-care advice. The Facebook reel goes further into why the treatment is done, whether it is only about aesthetics, and what happens step by step.",
      },
    ],
    links: [
      {
        href: "https://www.facebook.com/reel/1035115892020722",
        label: { pl: "Zobacz rolkę na Facebooku", en: "See the reel on Facebook" },
      },
    ],
  },
];

const blogSlugAliases: Record<string, string> = {
  "wakacje-w-dentalpassion": "profesjonalna-higienizacja",
};

export function getBlogPost(slug: string) {
  const resolved = blogSlugAliases[slug] ?? slug;
  return blogPosts.find((post) => post.slug === resolved);
}
