# Płynny hover przycisków

Data: 3 września 2026

Przyciski `.btn` nie skaczą już na hover. Kolor, `border-color`, `background-color`, cień i lekkie uniesienie przechodzą przez `transition` z tokenami `--duration` / `--ease`.

Gradient na `btn--primary` jest krzyżowany warstwą `::before` (opacity), bo samego gradientu przeglądarka nie interpoluje. To samo dla mięty w headerze.

`prefers-reduced-motion` wyłącza te animacje. Przełącznik języka też ma transition.
