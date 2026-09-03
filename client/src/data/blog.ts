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
    slug: "wakacje-w-dentalpassion",
    title: { pl: "Czas wakacji w Dentalpassion", en: "Holiday time at Dentalpassion" },
    date: "2025-08-01",
    dateLabel: { pl: "sierpień 2025", en: "August 2025" },
    excerpt: {
      pl: "Wakacje w naszym gabinecie to nie tylko urlop — to także serwis sprzętu i drobne zmiany, dzięki którym wszystko działa jeszcze sprawniej.",
      en: "Holidays at our practice are not only time off — they are also equipment servicing and small changes that make everything run even more smoothly.",
    },
    cover: assets.events.reelThumb,
    video: {
      href: "https://www.facebook.com/reel/1035115892020722",
      poster: assets.events.reelThumb,
      label: { pl: "Obejrzyj rolkę na Facebooku", en: "Watch the reel on Facebook" },
    },
    paragraphs: [
      {
        pl: "Czas wakacji w Dentalpassion to nie tylko urlop i wypoczynek. To także moment, w którym dbamy o zaplecze gabinetu — tak, by po powrocie pacjentów wszystko działało jeszcze sprawniej i komfortowo.",
        en: "Holiday time at Dentalpassion is not only rest. It is also when we take care of the practice infrastructure — so that when patients return, everything works even more smoothly and comfortably.",
      },
      {
        pl: "Wykorzystujemy ten okres na serwisowanie sprzętu oraz wprowadzanie małych, ale zauważalnych zmian: w gabinecie, w recepcji i w poczekalni. Porządkujemy przestrzeń, dopracowujemy detale i przygotowujemy stanowiska pracy na kolejny intensywny sezon.",
        en: "We use this period to service equipment and introduce small but noticeable changes in the treatment rooms, reception and waiting area. We tidy the space, refine details and prepare workstations for the next busy season.",
      },
      {
        pl: "Dzięki temu możemy skupić się na tym, co najważniejsze — spokojnym, precyzyjnym leczeniu w przyjaznej atmosferze. Pozdrawiamy serdecznie — zespół Dentalpassion.",
        en: "This lets us focus on what matters most — calm, precise treatment in a friendly atmosphere. Warm regards — the Dentalpassion team.",
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

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
