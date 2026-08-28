# Microinteractions (Dan Saffer)

## meta
- domain: microinteractions
- source: "Microinteractions: Designing with Details — Dan Saffer"
- goal: evaluar los pequeños detalles de interacción que mejoran la UX
- agent_tags: [ux, ui, audit]

---

## concepts

### Estructura de una microinteracción
Toda microinteracción se compone de 4 partes:
1. **Trigger** — Qué la inicia (acción del usuario o evento del sistema).
2. **Rules** — Qué ocurre como consecuencia.
3. **Feedback** — Qué percibe el usuario (visual, auditivo, táctil).
4. **Loops & Modes** — Cómo se repite o cambia con el tiempo.

### Triggers
El disparador debe ser obvio y estar cerca del elemento que afecta.
- Un trigger lejano o poco visible rompe la relación causa-efecto.
- Los triggers del sistema (notificaciones, alertas) deben ser controlables por el usuario.

### Rules
La respuesta del sistema debe ser predecible a partir de la acción.
- Una respuesta inesperada genera desconfianza.
- Las reglas deben ser consistentes: la misma acción siempre produce el mismo resultado.

### Feedback
El feedback debe ser sutil pero perceptible.
- No todos los feedbacks requieren un mensaje grande: un cambio de color, una animación mínima o un sonido suave pueden ser suficientes.
- La ausencia de feedback hace que el usuario dude si su acción tuvo efecto.

### Loops & Modes
- **Loops**: las microinteracciones repetidas deben poder desactivarse o adaptarse.
- **Modes**: cuando la interfaz cambia de modo (ej: edición activa), el estado debe ser visualmente obvio.

---

## rules

### Triggers
```
check: unclear_triggers
target: [microinteraction]
rule: trigger_not_obvious OR trigger_distant_from_object → issue
output:
  concept: triggers
  problem: No está claro qué acción inicia la microinteracción
  recommendations:
    - Haz el disparador visible y cercano al elemento afectado
```

### Rules
```
check: confusing_rules
target: [microinteraction]
rule: system_response_inconsistent_with_trigger → issue
output:
  concept: rules
  problem: La respuesta del sistema no es predecible desde la acción
  recommendations:
    - Asegura que la consecuencia sea consistente con el disparador
```

### Feedback
```
check: micro_feedback_presence
target: [control, state_change]
rule: no_micro_feedback → warning
output:
  concept: feedback
  problem: Falta feedback sutil al interactuar
  recommendations:
    - Añade animación mínima, cambio de color o microcopy de confirmación
```

### Loops & Modes
```
check: unclear_modes
target: [mode_toggle]
rule: mode_change_not_visually_obvious → issue
output:
  concept: loops_and_modes
  problem: El usuario no sabe en qué modo está
  recommendations:
    - Haz visible el estado de modo activo (icono, color, label)

check: endless_loops
target: [repeated_notification, reminder]
rule: loop_no_exit_or_adaptation → issue
output:
  concept: loops_and_modes
  problem: Notificación repetida sin control ni adaptación
  recommendations:
    - Permite desactivar o adaptar la frecuencia de repetición
```

---

## checklist
- [ ] ¿La acción que dispara el cambio es evidente?
- [ ] ¿La respuesta del sistema se entiende sin pensar?
- [ ] ¿Hay feedback sutil (no solo mensajes grandes)?
- [ ] ¿El usuario sabe en qué modo está en todo momento?
- [ ] ¿Las notificaciones repetidas pueden controlarse o desactivarse?
