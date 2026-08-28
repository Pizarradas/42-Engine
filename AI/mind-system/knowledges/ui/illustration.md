# Ilustración en UI

## meta
- domain: ui
- subdomain: illustration
- source: "Best practices de ilustración UI — Tubik, Nick Babich, Shakuro, Dizz Agency"
- goal: evaluar cuándo, cómo y cuánto usar ilustraciones en producto digital
- agent_tags: [ui, audit]

---

## concepts

### Cuándo usar ilustración
Las ilustraciones son efectivas en contextos específicos:
- **Onboarding** — explicar el valor del producto antes de que el usuario lo experimente.
- **Empty states** — motivar la primera acción cuando no hay contenido.
- **Error states** — suavizar la fricción de un fallo del sistema.
- **Hero / educación** — reforzar un mensaje clave con apoyo visual.
En flujos de tarea, la ilustración puede competir con la acción principal.

### Ilustración decorativa vs funcional
- **Funcional**: explica, refuerza o genera confianza.
- **Decorativa**: ocupa espacio sin aportar significado.
La ilustración decorativa en zonas críticas de tarea es siempre un riesgo.

### Consistencia de estilo
Mezclar estilos ilustrativos (flat + outline + skeuomorphic) en el mismo producto genera incoherencia visual.
- Definir un único estilo y mantenerlo en todos los contextos.

### Alineación de paleta
La paleta de la ilustración debe ser compatible con la paleta de la UI.
- Reutilizar los colores del sistema (accent, neutrals, brand colors).
- Una ilustración con colores propios desconectados de la UI parece importada.

### Jerarquía: ilustración vs CTA
En flujos de tarea, la ilustración nunca debe tener más peso visual que el CTA principal.
- Si la ilustración domina, el usuario no sabe qué hacer.

### Accesibilidad
La información crítica nunca debe comunicarse solo a través de ilustración.
- Si la ilustración desaparece (modo reducido, lector de pantalla), el mensaje debe seguir siendo comprensible desde el texto.

---

## rules

### Purpose
```
check: illustration_has_purpose
target: [illustration]
rule: context IN [onboarding, empty_state, error_state, hero] AND meaning == pure_decoration → warning
output:
  dimension: purpose
  problem: Ilustración sin propósito claro en zona crítica
  recommendations:
    - Usa ilustración para explicar, reforzar o generar confianza
    - Elimina o reduce ilustraciones puramente decorativas en zonas de tarea

check: illustration_vs_task
target: [screen]
rule: large_illustration AND critical_task_elements_pushed_below_fold → issue
output:
  dimension: purpose
  problem: Ilustración compite con la tarea principal
  recommendations:
    - Reduce tamaño o reubica la ilustración para que la acción principal sea protagonista
```

### Style Consistency
```
check: style_alignment
target: [illustration_set]
rule: mixed_styles (flat + skeuomorphic + outline) → warning
output:
  dimension: style_consistency
  problem: Estilos de ilustración mezclados
  recommendations:
    - Define un único estilo ilustrativo y mantenlo en todos los contextos

check: palette_alignment
target: [illustration]
rule: illustration_palette NOT compatible_with_ui_palette → issue
output:
  dimension: style_consistency
  problem: Paleta de ilustración desconectada de la UI
  recommendations:
    - Reutiliza colores del sistema (accent, neutrals, brand colors)
```

### Hierarchy & Focus
```
check: illustration_dominance
target: [screen]
rule: illustration_visual_weight > primary_cta_visual_weight AND context == task_flow → warning
output:
  dimension: hierarchy_and_focus
  problem: La ilustración domina sobre el CTA en un flujo de tarea
  recommendations:
    - Reduce contraste/tamaño de la ilustración
    - Incrementa el peso visual del CTA
```

### Accessibility
```
check: critical_info_only_in_illustration
target: [screen]
rule: key_information_only_in_illustration → issue
output:
  dimension: accessibility
  problem: Información crítica comunicada solo mediante ilustración
  recommendations:
    - Asegura que el mensaje principal también esté en texto

check: motion_in_illustrations
target: [animated_illustration]
rule: high_motion AND context == background → warning
output:
  dimension: accessibility
  problem: Ilustración animada de fondo potencialmente distractora
  recommendations:
    - Limita la animación de fondo o permite desactivarla
```

---

## checklist
- [ ] ¿La ilustración tiene un propósito claro (no es puramente decorativa)?
- [ ] ¿La ilustración no empuja el CTA o la tarea principal fuera del fold?
- [ ] ¿Todas las ilustraciones del producto siguen el mismo estilo?
- [ ] ¿La paleta de la ilustración es compatible con la paleta de la UI?
- [ ] ¿El CTA tiene más peso visual que la ilustración en flujos de tarea?
- [ ] ¿La información crítica también está en texto (no solo en imagen)?
