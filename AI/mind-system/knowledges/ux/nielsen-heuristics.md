# 10 Heurísticas de Usabilidad (Nielsen)

## meta
- domain: usability-heuristics
- source: "10 Usability Heuristics for User Interface Design — Jakob Nielsen"
- goal: evaluar interfaces según 10 heurísticas clásicas
- agent_tags: [ux, audit, ui]

---

## concepts

Las 10 heurísticas son principios generales de diseño de interacción, no guías específicas. Sirven para detectar problemas de usabilidad en auditorías expertas (heuristic evaluation).

1. **Visibilidad del estado** — El sistema informa siempre qué está pasando.
2. **Correspondencia sistema–mundo** — El sistema habla el idioma del usuario, no del sistema.
3. **Control y libertad** — El usuario puede deshacer errores fácilmente.
4. **Consistencia y estándares** — Las mismas palabras y acciones significan lo mismo siempre.
5. **Prevención de errores** — Mejor evitar el error que recuperarse de él.
6. **Reconocimiento > recuerdo** — Minimizar la memoria que el usuario debe usar.
7. **Flexibilidad y eficiencia** — Atajos para usuarios expertos sin perjudicar a novatos.
8. **Diseño estético y minimalista** — Sin información irrelevante que compita con la relevante.
9. **Recuperación de errores** — Mensajes de error claros, en lenguaje humano, con solución.
10. **Ayuda y documentación** — Si es necesaria, debe ser fácil de encontrar y usar.

---

## rules

### H1 — Visibilidad del estado
```
check: action_feedback
target: [action]
rule: time_to_feedback > 0.5s → issue
output:
  problem: Acción sin feedback inmediato
  recommendations:
    - Añade loaders, toasts o cambios de estado visibles

check: system_status_presence
target: [screen]
rule: long_process AND no_progress_indicator → issue
output:
  problem: Proceso largo sin indicador de progreso
  recommendations:
    - Usa barra de progreso o indicador de pasos
```

### H2 — Correspondencia sistema–mundo
```
check: real_world_language
target: [labels, messages]
rule: jargon_high AND audience != expert → issue
output:
  problem: Lenguaje técnico para audiencia no experta
  recommendations:
    - Usa palabras del vocabulario del usuario, no del sistema

check: natural_order
target: [forms, flows]
rule: field_order != mental_model_order → issue
output:
  problem: Orden de campos no sigue el modelo mental del usuario
  recommendations:
    - Reorganiza campos según el orden habitual del usuario
```

### H3 — Control y libertad
```
check: undo_redo_paths
target: [critical_action]
rule: no_undo AND destructive == true → issue
output:
  problem: Acción destructiva sin posibilidad de deshacer
  recommendations:
    - Añade deshacer/revertir para acciones críticas

check: escape_routes
target: [modal, wizard]
rule: no_cancel OR no_back → issue
output:
  problem: Flujo sin vía de escape
  recommendations:
    - Incluye Cancelar y Atrás en flujos multi-paso
```

### H4 — Consistencia y estándares
```
check: visual_consistency
target: [screen]
rule: inconsistent_styles_for_same_pattern → issue

check: platform_conventions
target: [component]
rule: deviates_platform_standard_without_reason → issue
output:
  problem: Inconsistencias o ruptura de estándares
  recommendations:
    - Reutiliza patrones visuales y de interacción de forma consistente
    - Alinea con las pautas de la plataforma (iOS, Android, web)
```

### H5 — Prevención de errores
```
check: destructive_actions_protection
target: [destructive_action]
rule: no_confirmation AND impact == high → issue
output:
  problem: Acción irreversible sin confirmación
  recommendations:
    - Añade diálogo de confirmación con consecuencias claras

check: input_constraints
target: [input]
rule: no_validation AND error_likely → issue
output:
  problem: Input sin validación en campo propenso a errores
  recommendations:
    - Valida y limita la entrada para evitar errores comunes
```

### H6 — Reconocimiento > recuerdo
```
check: recall_vs_recognition
target: [selection, navigation]
rule: user_must_remember_id_or_code AND alternative_list_possible → issue
output:
  problem: Se exige recordar información que podría ser visible
  recommendations:
    - Sustituye campos vacíos por listas, sugerencias o autocompletado
    - Muestra historial o elementos recientes
```

### H7 — Flexibilidad y eficiencia
```
check: accelerators_for_experts
target: [flow]
rule: high_frequency AND no_shortcuts_for_power_users → notice
output:
  problem: Sin atajos para usuarios frecuentes
  recommendations:
    - Añade atajos de teclado, saltos de paso o presets para expertos
```

### H8 — Diseño estético y minimalista
```
check: visual_noise
target: [screen]
rule: irrelevant_elements_ratio > threshold → issue
output:
  problem: Elementos irrelevantes que compiten con el contenido principal
  recommendations:
    - Elimina texto, iconos o elementos decorativos que no ayuden a la tarea
```

### H9 — Recuperación de errores
```
check: error_message_quality
target: [error_message]
rule: only_generic_message OR no_next_step → issue
output:
  problem: Mensaje de error poco útil
  recommendations:
    - Explica qué pasó, por qué, y qué puede hacer el usuario
    - Usa tono claro y no culpabilizador
```

### H10 — Ayuda y documentación
```
check: help_availability
target: [complex_flow, advanced_feature]
rule: complexity_high AND no_help_entry_point → issue
output:
  problem: Sin ayuda accesible en tareas complejas
  recommendations:
    - Incluye enlaces a ayuda contextual o FAQ
    - Muestra tips breves en puntos críticos sin saturar
```

---

## checklist
- [ ] ¿Cada acción produce feedback en menos de 0.5s?
- [ ] ¿El lenguaje es comprensible para el usuario objetivo?
- [ ] ¿Las acciones destructivas tienen confirmación y opción de deshacer?
- [ ] ¿Los patrones visuales son consistentes en toda la interfaz?
- [ ] ¿Se previenen errores mediante validación y restricciones?
- [ ] ¿El usuario puede reconocer opciones en lugar de recordarlas?
- [ ] ¿Los mensajes de error explican causa y solución?
- [ ] ¿Hay ayuda accesible en flujos complejos?
