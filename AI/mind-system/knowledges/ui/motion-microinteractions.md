# Motion & Microinteractions en UI

## meta
- domain: ui
- subdomain: motion-and-microinteractions
- source: "Microinteractions — Dan Saffer" + "Material Design Motion" + "Apple HIG Animation"
- goal: evaluar animaciones y microinteracciones desde la perspectiva visual y de UI
- agent_tags: [ui, audit]

---

## concepts

### Propósito de la animación
Toda animación debe cumplir una función. Las funciones válidas son:
- **Feedback** — confirmar que una acción tuvo efecto.
- **State change** — mostrar que algo ha cambiado de estado.
- **Navigation transition** — orientar al usuario en el espacio de la app.
- **Attention hint** — dirigir la atención hacia algo importante.
La animación decorativa sin función es ruido.

### Timing recomendado
- Microinteracciones (hover, toggle, feedback): **150–250 ms**
- Transiciones de navegación (pantalla a pantalla): **200–400 ms**
- Por debajo de 100 ms: imperceptible o brusco.
- Por encima de 500 ms: lento y frustrante.

### Easing (curva de movimiento)
El movimiento lineal parece mecánico e irreal.
- Usar curvas de aceleración/desaceleración: `ease-in-out`, `standard curve` de Material.
- Excepción: movimiento constante (loaders de progreso continuo) puede ser lineal.

### Continuidad entre pantallas
Si un elemento aparece en dos pantallas, el motion puede conectarlos visualmente.
- Shared element transition, scale, position.
- Sin continuidad, las transiciones parecen cortes abruptos.

### Sobrecarga de movimiento
Demasiados elementos animados simultáneamente saturan la atención del usuario.
- Máximo 1–2 elementos con movimiento protagonista a la vez.

### Accesibilidad y reduce motion
Algunos usuarios son sensibles al movimiento (vestibular disorders).
- El sistema operativo expone la preferencia `prefers-reduced-motion`.
- Las animaciones no esenciales deben simplificarse o desactivarse cuando está activa.

---

## rules

### Purpose
```
check: motion_has_purpose
target: [animation, microinteraction]
rule: role NOT IN [feedback, state_change, navigation_transition, attention_hint] → warning
output:
  dimension: purpose
  problem: Animación sin propósito claro
  recommendations:
    - Elimina o justifica cada animación con una función concreta
```

### Timing & Easing
```
check: duration_range
target: [animation]
rule: duration_ms < 100 OR duration_ms > 500 → warning
output:
  dimension: timing_and_easing
  problem: Duración fuera del rango recomendado
  recommendations:
    - Microinteracciones: 150–250 ms
    - Transiciones de navegación: 200–400 ms

check: easing_curve
target: [animation]
rule: easing_type == linear AND context != constant_motion → warning
output:
  dimension: timing_and_easing
  problem: Curva de easing lineal (movimiento poco natural)
  recommendations:
    - Usa ease-in-out o standard curve de Material
```

### Continuity
```
check: element_continuity_between_screens
target: [navigation_transition]
rule: element_reappears_in_new_screen AND no_motion_link → notice
output:
  dimension: continuity
  problem: Transición sin relación visual entre origen y destino
  recommendations:
    - Conecta el elemento con shared element transition, scale o position

check: motion_overload
target: [screen]
rule: animated_elements_count > threshold → warning
output:
  dimension: continuity
  problem: Demasiados elementos animados simultáneamente
  recommendations:
    - Limita a 1–2 elementos con movimiento protagonista a la vez
```

### Accessibility Motion
```
check: respects_reduce_motion
target: [animation]
rule: prefers_reduced_motion == true AND animation_not_simplified → issue
output:
  dimension: accessibility_motion
  problem: Animaciones no respetan la preferencia del sistema
  recommendations:
    - Simplifica o desactiva animaciones no esenciales con prefers-reduced-motion

check: potential_motion_sickness
target: [animation]
rule: large_area_motion AND repeated_loop → warning
output:
  dimension: accessibility_motion
  problem: Animación de gran área en bucle — riesgo de mareo
  recommendations:
    - Limita el área de movimiento, reduce loops o hazlo opcional
```

---

## checklist
- [ ] ¿Cada animación tiene una función clara (feedback, estado, transición, atención)?
- [ ] ¿Las microinteracciones duran entre 150–250 ms?
- [ ] ¿Las transiciones de navegación duran entre 200–400 ms?
- [ ] ¿Se usan curvas de easing naturales (no lineal)?
- [ ] ¿Hay más de 2 elementos animados simultáneamente?
- [ ] ¿Las animaciones respetan `prefers-reduced-motion`?
- [ ] ¿Hay bucles de animación de gran área que puedan causar malestar?
