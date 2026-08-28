# 100 Things Every Designer Needs to Know About People (Weinschenk)

## meta
- domain: psychology
- source: "100 Things Every Designer Needs to Know About People — Susan Weinschenk"
- goal: aplicar principios de percepción, memoria, atención y motivación al diseño
- agent_tags: [ux, audit, flow]

---

## concepts

### Percepción global antes que detalle
La primera impresión es estructural: layout, bloques, pesos visuales.
- El usuario ve el conjunto antes de leer cualquier texto.
- Si la estructura global no comunica jerarquía, los detalles no importan.

### Atención limitada y selectiva
El usuario solo puede procesar pocos estímulos a la vez.
- Los elementos que compiten por atención en igual peso se cancelan mutuamente.
- Las animaciones y banners cerca de tareas críticas son distractores de alto impacto.

### Memoria de trabajo limitada
Las personas retienen ~4 ítems activos a la vez en memoria de trabajo.
- Cualquier flujo que exija recordar datos de pantallas anteriores genera fricción.
- Los resúmenes visibles, migas de pan y vistas de comparación alivian esta carga.

### Reconocimiento mejor que recuerdo
Es más fácil reconocer una opción que recordar un dato de memoria.
- Listas, sugerencias, autocompletado e historial siempre son preferibles a campos vacíos.

### Motivación por beneficio claro
El usuario necesita saber qué gana antes de invertir esfuerzo.
- Los flujos que piden datos sin explicar el beneficio generan abandono.
- La frase de resultado ("Así protegemos tu cuenta") reduce la fricción percibida.

### Feedback inmediato refuerza la acción
Sin respuesta del sistema, el usuario siente pérdida de control.
- Cada acción relevante necesita confirmación visible en menos de 0.5s.

### Progreso visible mantiene la motivación
Ver avance en flujos largos reduce la incertidumbre y el abandono.
- Los indicadores de pasos (1/4, 2/4...) son especialmente críticos en onboarding y checkout.

---

## rules

### Attention
```
check: competing_focal_points
target: [screen]
rule: count(primary_visual_competitors) > 2 → issue
output:
  dimension: Attention
  problem: Demasiados elementos compiten por la atención
  recommendations:
    - Reduce el número de elementos destacados
    - Define un punto focal claro alineado con la tarea principal

check: distractions_near_primary_task
target: [screen]
rule: ads_or_animations_close_to(primary_task) == true → issue
output:
  dimension: Attention
  problem: Distractores cerca de la tarea crítica
  recommendations:
    - Reubica o elimina elementos animados o promocionales cerca del área de tarea
```

### Perception
```
check: gestalt_grouping
target: [layout]
rule: inconsistent_spacing_or_alignment → issue
output:
  dimension: Perception
  problem: Agrupación visual poco clara
  recommendations:
    - Usa proximidad, alineación y jerarquía para agrupar elementos relacionados
```

### Memory
```
check: working_memory_load
target: [flow]
rule: required_items_to_remember > 4 → issue
output:
  dimension: Memory
  problem: Se exige recordar demasiada información entre pasos
  recommendations:
    - Añade resúmenes visibles, migas de pan o vistas de comparación

check: recall_vs_recognition
target: [input]
rule: user_must_recall_identifier AND alternative_recognition_possible → issue
output:
  dimension: Memory
  problem: Se obliga a recordar algo que podría ser seleccionable
  recommendations:
    - Ofrece lista, autocompletado o historial en lugar de campo vacío
```

### Motivation
```
check: benefits_explained
target: [screen, critical_action]
rule: effort_required_high AND benefit_text_missing → issue
output:
  dimension: Motivation
  problem: Se pide esfuerzo sin explicar el beneficio
  recommendations:
    - Añade frase que indique qué gana el usuario al completar la acción

check: progress_visibility
target: [multi_step_flow]
rule: steps_count > 2 AND no_progress_indicator → issue
output:
  dimension: Motivation
  problem: Flujo largo sin indicador de progreso
  recommendations:
    - Añade indicador de pasos (1/4, 2/4...) visible en todo momento

check: feedback_presence
target: [action]
rule: no_success_or_error_feedback → issue
output:
  dimension: Motivation
  problem: Acción sin feedback de resultado
  recommendations:
    - Añade confirmación de éxito o mensaje de error tras cada acción relevante
```

---

## checklist
- [ ] ¿Hay un punto focal claro en la pantalla?
- [ ] ¿Hay distractores (animaciones, banners) cerca de la tarea principal?
- [ ] ¿El usuario debe recordar información de pantallas anteriores?
- [ ] ¿Se puede reconocer en lugar de recordar?
- [ ] ¿Se explica el beneficio antes de pedir esfuerzo?
- [ ] ¿Hay feedback inmediato en cada acción relevante?
- [ ] ¿Los flujos de más de 2 pasos tienen indicador de progreso?
