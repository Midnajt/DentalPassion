export const site = {
  name: "dentalpassion",
  url: import.meta.env.VITE_SITE_URL || "https://dentalpassion.waw.pl",
  phoneDisplay: "501 430 894",
  phoneHref: "tel:+48501430894",
  email: "kontakt@dentalpassion.waw.pl",
  emailHref: "mailto:kontakt@dentalpassion.waw.pl",
  addressLine1: "ul. Ostrobramska 126/lok U14",
  addressLine2: "04-026 Warszawa",
  mapEmbed:
    "https://maps.google.com/maps?q=Ostrobramska%20126%20Warszawa&t=m&z=15&output=embed&iwloc=near",
  facebook: "https://www.facebook.com/DentalPassion-Warszawa-1872834242995470",
  addPattern: "https://addpattern.pl",
  pixabay: "https://pixabay.com/",
  hours: [
    { key: "monday", value: "10:00 – 20:00" },
    { key: "tuesday", value: "10:00 – 20:00" },
    { key: "wednesday", value: "10:00 – 20:00" },
    { key: "thursday", value: "10:00 – 20:00" },
    { key: "friday", value: "10:00 – 20:00" },
    { key: "saturday", value: "closed" },
    { key: "sunday", value: "closed" },
  ],
} as const;
