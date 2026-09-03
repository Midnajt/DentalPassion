import logoUrl from "../../assets/logo.png?url";
import heroUrl from "../../assets/images/hero.jpg?url";
import feathersUrl from "../../assets/images/feathers.png?url";
import portraitUrl from "../../assets/images/marcin-portrait.jpg?url";
import aniaUrl from "../../assets/images/ania.jpg?url";
import fbUrl from "../../assets/images/fb.png?url";
import znanyUrl from "../../assets/images/znanylekarz.png?url";
import placeholderM from "../../assets/images/team-placeholder-m.svg?url";
import placeholderF from "../../assets/images/team-placeholder-f.svg?url";
import event1 from "../../assets/events/first/1.jpg?url";
import event2 from "../../assets/events/first/2.jpg?url";
import event3 from "../../assets/events/first/3.jpg?url";
import event4 from "../../assets/events/first/4.jpg?url";
import event5 from "../../assets/events/first/5.jpg?url";
import reelThumb from "../../assets/events/summer/reel-thumb.jpg?url";

export const assets = {
  logo: logoUrl,
  hero: heroUrl,
  feathers: feathersUrl,
  portrait: portraitUrl,
  ania: aniaUrl,
  facebookIcon: fbUrl,
  znanyLekarzIcon: znanyUrl,
  placeholderM,
  placeholderF,
  events: {
    first: [event1, event2, event3, event4, event5] as const,
    reelThumb,
  },
} as const;
