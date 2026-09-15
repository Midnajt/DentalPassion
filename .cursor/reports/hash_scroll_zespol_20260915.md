# Ponowne kliknięcie tej samej karty zespołu

Data: 15 września 2026

Gdy hash już był `#zespol/wiktor-poczobutt`, drugi klik w kartę nie wywoływał `hashchange`, więc strona nie przewijała do profilu. `HashLink` przy tym samym adresie woła `goTo`, a `scrollTick` ponownie odpala `scrollIntoView`.

Dotyczy też innych linków hash (np. ponowne „Zespół” w menu). Publikacja: `npm run build` i wrzut `dist/` na FTP po zgodzie.
