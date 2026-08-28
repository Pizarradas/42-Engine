# About Face (Alan Cooper)

## meta
- domain: interaction-design-goal-directed
- source: "About Face: The Essentials of Interaction Design — Alan Cooper"
- goal: diseñar y evaluar flujos orientados a objetivos y modelos mentales
- agent_tags: [ux, flow, audit]

---

## concepts

### Diseño orientado a objetivos
El usuario no usa una interfaz: persigue un objetivo. La interfaz debe estar al servicio de ese objetivo, no de las funcionalidades del sistema.
- Cada pantalla debe poder responder: ¿qué objetivo del usuario sirve esto?
- Los elementos que no contribuyen al objetivo principal son ruido.

### Personas y objetivos
Las personas son arquetipos de usuarios con objetivos concretos, no demografías.
- Objetivo final: qué quiere lograr en la vida (ej: sentirse competente).
- Objetivo de experiencia: cómo quiere sentirse usando el producto.
- Objetivo de tarea: qué necesita hacer ahora mismo.

### Primera victoria temprana
El usuario debe obtener valor lo antes posible en el flujo.
- Pasos de bajo valor antes del objetivo central generan abandono.
- Los datos secundarios (perfil, preferencias, configuración) deben pedirse después de la primera victoria.

### Postura del producto
La densidad y complejidad de la UI debe coincidir con la frecuencia e intensidad de uso.
- **Sovereign** (uso continuo, expertos): UI densa, eficiente, atajos.
- **Transient** (uso ocasional): UI guiada, simple, sin curva de aprendizaje.
- **Daemonic** (uso en segundo plano): mínima interferencia.

### Manipulación directa vs diálogos
Siempre que sea posible, el usuario debe actuar directamente sobre los objetos.
- Arrastrar, editar in-place, expandir en contexto.
- Los diálogos modales para acciones simples interrumpen el flujo innecesariamente.

---

## rules

### Goal Alignment
```
check: goal_alignment
target: [flow, screen]
rule: no_clear_user_goal OR ui_elements_not_supporting_primary_goal → issue
output:
  concept: personas_and_goals
  problem: La interfaz no está alineada con el objetivo del usuario
  recommendations:
    - Explicita el objetivo principal de la pantalla
    - Elimina elementos que no contribuyan a ese objetivo
```

### Goal-Directed Flow
```
check: goal_first_flow
target: [flow]
rule: many_low_value_steps_before_core_goal → issue
output:
  concept: goal_directed_flows
  problem: Demasiados pasos antes de aportar valor
  recommendations:
    - Acerca la primera victoria al inicio del flujo
    - Retrasa datos secundarios para después del objetivo principal
```

### Posture Match
```
check: posture_mismatch
target: [app]
rule: product_usage_pattern != ui_posture → issue
output:
  concept: posture_of_products
  problem: Densidad de UI no coincide con la frecuencia/intensidad de uso
  recommendations:
    - Uso continuo → UI densa y eficiente con atajos
    - Uso ocasional → UI guiada y simple
```

### Dialogs vs Direct Manipulation
```
check: overuse_of_dialogs
target: [screen]
rule: many_modals_for_simple_actions → issue
output:
  concept: dialogs_vs_direct_manipulation
  problem: Exceso de diálogos donde podría usarse manipulación directa
  recommendations:
    - Permite arrastrar, editar in-place o expandir en contexto
    - Reserva los modales para acciones con consecuencias importantes
```

---

## checklist
- [ ] ¿Está claro qué objetivo del usuario sirve esta pantalla?
- [ ] ¿Cuántos pasos hay hasta la primera victoria? ¿Pueden reducirse?
- [ ] ¿La densidad de la UI coincide con la frecuencia de uso del producto?
- [ ] ¿Se usan diálogos donde sería posible la manipulación directa?
- [ ] ¿Los elementos secundarios están aplazados para después del objetivo principal?
