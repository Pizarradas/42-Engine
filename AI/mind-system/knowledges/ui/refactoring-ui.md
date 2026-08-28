# Refactoring UI (Wathan & Schoger)

## meta
- domain: visual-design
- source: "Refactoring UI — Adam Wathan & Steve Schoger"
- goal: evaluar espaciado, color, tipografía y limpieza visual
- agent_tags: [ui, audit]

---

## concepts

### Escala de espaciado
El espaciado no debe ser arbitrario. Debe seguir una escala definida y repetible.
- Escala base recomendada: 4, 8, 12, 16, 20, 24, 32, 48, 64.
- La consistencia del espaciado es lo que hace que un diseño parezca "ordenado" sin esfuerzo aparente.

### Jerarquía tipográfica
La tipografía comunica importancia antes de que el usuario lea.
- 2–4 niveles claros son suficientes: H1, H2, H3 (opcional) + body.
- Más de 4 niveles genera ruido. Menos de 2 niveles aplana la jerarquía.

### Color en fondos oscuros
El blanco puro (#FFFFFF) sobre fondos oscuros genera fatiga visual por exceso de contraste.
- Usar grises muy claros (ej: #F1F5F9) es más cómodo y sigue siendo legible.

### Contraste WCAG
El contraste mínimo para texto normal es 4.5:1. Para texto grande o iconos UI, 3:1.
- Fórmula: C = (L1 + 0.05) / (L2 + 0.05), donde L1 es la luminancia más alta.

### Separación sin bordes
El exceso de líneas divisorias y bordes genera ruido visual.
- El espaciado, el tamaño del texto y el color son separadores más elegantes que los bordes.

### Punto focal
Cada pantalla debe tener un elemento con mayor peso visual que el resto.
- Sin punto focal, el usuario no sabe por dónde empezar.

---

## rules

### Spacing
```
check: consistent_vertical_rhythm
target: [stacked_elements]
rule: spacing_between_items NOT IN [4,8,12,16,20,24,32,48,64] → issue
output:
  dimension: spacing
  problem: Espaciado vertical inconsistente
  recommendations:
    - Ajusta espacios para que sigan una escala definida (4/8/12/16/24/32...)

check: padding_consistency
target: [button, card, input]
rule: padding_vertical / padding_horizontal fuera de rango [0.5, 1] → issue
output:
  dimension: spacing
  problem: Padding interno desproporcionado
  recommendations:
    - Usa padding vertical y horizontal basados en la misma escala
```

### Typography
```
check: hierarchy_levels
target: [text_styles]
rule: heading_levels < 2 OR heading_levels > 4 → warning
output:
  dimension: typography
  problem: Jerarquía tipográfica pobre o excesiva
  recommendations:
    - Define 2–4 niveles claros (H1/H2/H3 + body) y reutilízalos

check: line_height_readability
target: [body_text]
rule: line_height / font_size NOT IN [1.3, 1.6] → issue
output:
  dimension: typography
  problem: Interlineado poco legible
  recommendations:
    - Ajusta line-height a ~1.4–1.6 para párrafos
```

### Color & Contrast
```
check: dark_background_text_color
target: [text_on_dark_bg]
rule: text_color == #FFFFFF AND bg_luminance_low → warning
output:
  dimension: color_and_contrast
  problem: Texto blanco puro sobre fondo oscuro
  recommendations:
    - Usa gris muy claro en lugar de blanco puro para reducir fatiga visual

check: contrast_wcag
target: [text, icon]
rule:
  - contrast_ratio < 4.5 (texto normal) → issue
  - contrast_ratio < 3.0 (texto grande / UI secundario) → issue
output:
  dimension: color_and_contrast
  problem: Contraste insuficiente según WCAG
  recommendations:
    - Ajusta color de texto o fondo hasta alcanzar ratio ≥ 4.5:1 para texto normal
```

### Layout & Hierarchy
```
check: noisy_cards
target: [card]
rule: too_many_borders OR too_many_dividers → issue
output:
  dimension: layout_and_hierarchy
  problem: Exceso de líneas y bordes para separar contenido
  recommendations:
    - Usa espaciado, tamaño de texto y color en lugar de bordes

check: focal_point
target: [screen]
rule: no_clear_primary_visual_weight → issue
output:
  dimension: layout_and_hierarchy
  problem: Sin punto focal claro
  recommendations:
    - Aumenta tamaño, contraste o proximidad del elemento principal
    - Reduce peso visual de los elementos secundarios
```

---

## checklist
- [ ] ¿El espaciado sigue una escala repetible?
- [ ] ¿Los componentes comparten patrones de padding?
- [ ] ¿La jerarquía tipográfica tiene 2–4 niveles claros?
- [ ] ¿El texto en fondos oscuros usa grises claros, no blanco puro?
- [ ] ¿El contraste cumple ratios WCAG mínimos?
- [ ] ¿La separación de contenidos usa espacio y color, no solo bordes?
- [ ] ¿Hay un punto focal claro en cada pantalla?
