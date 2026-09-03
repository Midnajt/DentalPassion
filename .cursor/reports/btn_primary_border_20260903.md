# Usunięcie czerwonej krawędzi przycisku primary

Data: 3 września 2026

Na hero przycisk „Zamów wizytę” (`.btn--primary`) miał ledwo widoczny czerwony otok. Źródłem był 1 px border z `.btn` oraz fioletowo-magenta `box-shadow` (`rgba(142, 35, 144, …)`), który na ciemnym tle wyglądał jak czerwona ramka.

Na `.btn--primary` jest teraz `border: 0`, a cień jest neutralny (`rgba(20, 16, 24, …)`). Ghost i light nadal mają obramowanie.

Headerowy przycisk primary bez zmian (`box-shadow: none`).
