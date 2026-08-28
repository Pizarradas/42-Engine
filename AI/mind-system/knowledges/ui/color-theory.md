# Color en UI (Erik D. Kennedy)

## meta
- domain: color-system
- source: "The Rules of Color — Erik D. Kennedy (Learn UI Design)"
- goal: evaluar y construir sistemas de color coherentes, legibles y estéticamente sólidos
- agent_tags: [ui, audit]

---

## concepts

### Estructura de paleta
Una paleta de UI necesita dos componentes mínimos:
1. **Neutrales (grises)** — para fondos, textos, bordes, superficies.
2. **Color de acento** — para CTAs, estados activos, elementos clave.
Sin neutrales, el diseño no tiene base. Sin acento, no hay jerarquía de atención.

### Escala de pasos por color
Cada color clave debe tener múltiples intensidades para ser usable.
- Mínimo 5 pasos por familia de color: 50 / 100 / 200 / 400 / 700 (o equivalente).
- Con menos pasos, no hay suficiente rango para fondos, bordes, textos y estados.

### Hue shifting
Al oscurecer o aclarar un color, no basta con ajustar la luminosidad: el tono (hue) también debe moverse.
- Oscurecer → mover el hue hacia azul/morado.
- Aclarar → mover el hue ligeramente hacia amarillo (según color base).
- Sin hue shifting, los colores oscuros parecen "sucios" y los claros "lavados".

### Contraste WCAG
```
C = (L1 + 0.05) / (L2 + 0.05)
L1 = luminancia relativa más alta
L2 = luminancia relativa más baja
```
- Texto normal: ratio mínimo 4.5:1
- Texto grande (≥18px regular / ≥14px bold) o iconos UI: ratio mínimo 3:1

### Uso del color de acento
El color de acento pierde efectividad si se usa en exceso.
- Debe reservarse para: CTA principal, estados activos, alertas, elementos clave.
- Si aparece en demasiados lugares, deja de guiar la atención.

---

## rules

### Palette Structure
```
check: neutral_and_accent_presence
target: [palette]
rule: no_neutrals OR no_clear_accent → issue
output:
  dimension: palette_structure
  problem: Paleta sin neutrales o sin color de acento claro
  recommendations:
    - Define escala de grises (neutrals) y 1–2 colores de acento

check: shade_steps
target: [color_scale]
rule: steps_per_color_family < 5 → warning
output:
  dimension: palette_structure
  problem: Escala de color con pocos pasos
  recommendations:
    - Crea mínimo 5 intensidades por color clave (50/100/200/400/700)
```

### Hue Shifting
```
check: dirty_colors
target: [palette]
rule: dark_shades_not_shifted AND light_shades_not_shifted → warning
output:
  dimension: hue_shifting
  problem: Variantes de color parecen sucias o lavadas
  recommendations:
    - Al oscurecer: desplaza hue hacia azul/morado
    - Al aclarar: desplaza hue ligeramente hacia amarillo
```

### Contrast WCAG
```
check: text_contrast
target: [text, icon]
rule:
  - role == body_text AND contrast_ratio < 4.5 → issue
  - role == large_text_or_icon AND contrast_ratio < 3.0 → issue
output:
  dimension: contrast_wcag
  problem: Contraste insuficiente (WCAG)
  recommendations:
    - Ajusta luminancia del texto o fondo hasta alcanzar el ratio recomendado
```

### Accent Usage
```
check: overuse_of_accent
target: [screen]
rule: accent_color_usage_ratio > threshold → issue
output:
  dimension: accent_usage
  problem: Color de acento usado en exceso
  recommendations:
    - Reserva el acento para CTAs, estados activos y elementos clave

check: insufficient_accent
target: [screen]
rule: accent_color_absent AND need_for_focus == true → warning
output:
  dimension: accent_usage
  problem: Sin color de acento para guiar la atención
  recommendations:
    - Introduce un color de acento para CTA y estados importantes
```

---

## checklist
- [ ] ¿Existe una escala de grises (neutrals) completa?
- [ ] ¿Hay 1–2 colores de acento bien definidos?
- [ ] ¿Cada color clave tiene mínimo 5 pasos de intensidad?
- [ ] ¿Las variantes oscuras/claras usan hue shifting, no solo luminosidad?
- [ ] ¿El contraste de texto cumple WCAG (4.5:1 normal / 3:1 grande)?
- [ ] ¿El color de acento guía la atención o está en demasiados lugares?
