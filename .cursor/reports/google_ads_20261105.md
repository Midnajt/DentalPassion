# Podłączenie i audyt Google Ads Conversion Tracking (`AW-18539018005`) oraz GA4 (`G-55QG7SQY7K`)

Data: 2026-11-05

## Zakres zmian i weryfikacji

1. **`client/index.html`** — dopisano `gtag("config", "AW-18539018005")` po `gtag("config", "G-55QG7SQY7K")` na istniejącym skrypcie `gtag.js`, bez duplikowania ładowania biblioteki.
2. **`client/src/lib/google-ads.ts`** — moduł obsługi Google Ads i zdarzeń kontaktowych:
   - stała `GOOGLE_ADS_ID` (`AW-18539018005` z fallbackiem z `VITE_GOOGLE_ADS_ID`),
   - delegowane śledzenie kliknięć we wszystkie linki `tel:` (`phone_click`) i `mailto:` (`email_click`) w całym dokumencie (`bindContactClickTracking`),
   - usunięto parametry `contact_target` i `link_url` (ochrona przed przesyłaniem numerów telefonów i adresów e-mail do GA4); wysyłane są wyłącznie `send_to: GA_ID` oraz `page_location`,
   - `phone_click` i `email_click` wymagają zgody analitycznej (`hasAnalyticsConsent()`), a `trackGoogleAdsConversion` wymaga zgody reklamowej (`hasMarketingConsent()`) oraz niepustej etykiety konwersji.
3. **`client/src/lib/google-analytics.ts`, `ConsentBanner.tsx`, `Footer.tsx`** — rozdzielony Consent Mode v2 i wycofywanie zgód:
   - przechowywanie preferencji `{"analytics": boolean, "marketing": boolean}` w `localStorage` (`dentalpassion-consent-v2`), przy czym dawna wartość `"accepted"` mapuje się na `{ analytics: true, marketing: false }` (brak automatycznego nadawania zgód reklamowych),
   - dwa niezależne checkboxy w banerze (analityczne GA4 vs reklamowe Google Ads) oraz przyciski „Tylko niezbędne”, „Zapisz wybór”, „Akceptuj wszystkie”,
   - przycisk „Ustawienia cookies” / „Cookie settings” w stopce strony ponownie otwiera baner i pozwala w każdej chwili zmienić lub wycofać zgody (`gtag("consent", "update", ...)`).
4. **Lint i Build** — `eslint .` (0 errors), `tsc -b` i `vite build` zakończyły się sukcesem (`dist/` zbudowany).

Publikacja na FTP nie była wykonywana.
