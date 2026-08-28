# Practical UI (Adham Dannaway)

## meta
- domain: practical-ui
- source: "Practical UI — Adham Dannaway"
- goal: aplicar reglas binarias sobre sombras, profundidad, legibilidad y accesibilidad
- agent_tags: [ui, audit]

---

## concepts

### Sombras y elevación
La sombra debe comunicar la altura real del elemento sobre la superficie.
- Elementos cercanos al fondo: sombras pequeñas, suaves, poca opacidad.
- Elementos flotantes (modales, tooltips, FABs): sombras más grandes y difusas.
- Una sombra grande en un elemento de baja elevación genera inconsistencia visual.

### Fuente de luz única
Todas las sombras deben proyectarse desde la misma dirección.
- Convención estándar: fuente de luz desde arriba-izquierda.
- Sombras con direcciones inconsistentes rompen la coherencia del sistema.

### Jerarquía por profundidad
La elevación visual debe reflejar la jerarquía de contenido.
- Los elementos más importantes deben parecer "más arriba" que los secundarios.
- Un elemento secundario con sombra más fuerte que el principal invierte la jerarquía.

### Legibilidad en mobile
El tamaño mínimo de texto en mobile es crítico para la legibilidad.
- Texto primario: mínimo 16px.
- Texto secundario: mínimo 12px.
- Por debajo de estos umbrales, el esfuerzo de lectura aumenta significativamente.

### Texto sobre imágenes
El texto sobre imágenes requiere siempre una solución de contraste explícita.
- Overlay oscuro o claro, blur, o caja sólida detrás del texto.
- Nunca confiar en que la imagen tenga suficiente contraste por sí sola.

### Área táctil mínima
En dispositivos touch, el área clicable mínima es ~44×44 px.
- El área visual del elemento puede ser menor, pero el área táctil debe cubrirlo.

---

## rules

### Elevation & Shadows
```
check: shadow_strength_vs_elevation
target: [card, modal, floating_button]
rule:
  - elevation_low AND shadow_blur_large AND opacity_high → issue
  - elevation_high AND shadow_too_subtle → issue
output:
  dimension: elevation_and_shadows
  problem: Sombra no coherente con la elevación del elemento
  recommendations:
    - Sombras pequeñas y suaves para elementos cercanos al fondo
    - Sombras más grandes y difusas para elementos flotantes

check: multiple_light_sources
target: [screen]
rule: inconsistent_shadow_directions → issue
output:
  dimension: elevation_and_shadows
  problem: Sombras con múltiples direcciones de luz
  recommendations:
    - Alinea todas las sombras con una única fuente de luz (arriba-izquierda)
```

### Hierarchy & Depth
```
check: depth_used_for_priority
target: [screen]
rule: low_priority_elements_on_top_with_stronger_shadows → issue
output:
  dimension: hierarchy_and_depth
  problem: Elementos secundarios parecen por encima de los principales
  recommendations:
    - Reserva mayor elevación y sombras para contenido y acciones más importantes
```

### Legibility
```
check: minimum_font_size_mobile
target: [text_on_mobile]
rule:
  - role == primary_text AND font_size < 16px → issue
  - role == secondary_text AND font_size < 12px → issue
output:
  dimension: legibility
  problem: Tamaño de fuente insuficiente en mobile
  recommendations:
    - Mínimo 16px para texto primario; 12–14px para texto secundario

check: text_on_images
target: [text_over_image]
rule: low_contrast_with_background OR busy_background → issue
output:
  dimension: legibility
  problem: Texto sobre imagen difícil de leer
  recommendations:
    - Añade overlay, blur o caja sólida detrás del texto
```

### Accessibility
```
check: hit_target_size
target: [button, icon_button, control]
rule: touch_device AND size < 44x44px → issue
output:
  dimension: accessibility
  problem: Área clicable demasiado pequeña
  recommendations:
    - Asegura que los objetivos táctiles midan al menos 44×44 px

check: secondary_text_weight
target: [secondary_text]
rule: font_size_small AND color_low_contrast AND weight_thin → issue
output:
  dimension: accessibility
  problem: Texto secundario excesivamente débil
  recommendations:
    - Equilibra tamaño, color y peso para que sea legible sin competir con el primario
```

---

## checklist
- [ ] ¿Las sombras reflejan la elevación real de cada elemento?
- [ ] ¿Todas las sombras apuntan en la misma dirección?
- [ ] ¿Los elementos más importantes tienen mayor elevación visual?
- [ ] ¿El texto primario en mobile es mínimo 16px?
- [ ] ¿El texto sobre imágenes tiene solución de contraste explícita?
- [ ] ¿Los objetivos táctiles miden al menos 44×44 px?
