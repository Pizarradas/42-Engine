# Laws of UX

## meta
- domain: ui-ux-psychology
- source: "Laws of UX — Jon Yablonski"
- goal: evaluar interfaces según leyes psicológicas de UX
- agent_tags: [ux, audit, flow]

---

## concepts

### Ley de Hick
Cuantas más opciones simultáneas, más tiempo tarda el usuario en decidir.
- Aplica a: menús, filtros, listas de opciones, configuraciones.
- Umbral práctico: máximo 5–7 opciones visibles a la vez.

### Ley de Fitts
El tiempo para alcanzar un objetivo depende de su tamaño y distancia.
- Aplica a: botones, enlaces, controles táctiles.
- Umbral práctico: mínimo 44×44 px en touch; botones críticos más grandes y cercanos al contenido que afectan.

### Ley de Miller / Chunking
La memoria de trabajo maneja ~7±2 elementos a la vez.
- Aplica a: menús, formularios, listados, pasos de flujo.
- Umbral práctico: agrupar en bloques de 4–7 ítems con títulos claros.

### Efecto de Usabilidad Estética
Los usuarios perciben los diseños atractivos como más usables.
- Riesgo: un diseño visualmente coherente puede ocultar problemas graves de usabilidad.
- La IA debe distinguir entre estética real y usabilidad real.

### Ley de Jakob
Los usuarios esperan que tu producto funcione como los que ya conocen.
- Aplica a: posición de navegación, iconos estándar, patrones comunes.
- Solo innovar cuando el beneficio es evidente y se educa al usuario.

---

## rules

### Hick
```
check: count_visible_choices
target: [nav_menu, choice_group, filter_group]
rule: count(options.visible) > 7 → issue
output:
  law: Hick
  problem: Demasiadas opciones simultáneas
  rationale: Más opciones → mayor tiempo de decisión
  recommendations:
    - Agrupa opciones en categorías; deja visibles solo 5–7
    - Introduce filtros progresivos o pasos secuenciales
```

### Fitts
```
check: tappable_size
target: [button, icon_button, touch_target]
rule: width < 44px OR height < 44px → issue
output:
  law: Fitts
  problem: Objetivo demasiado pequeño
  recommendations:
    - Aumenta área clicable a mínimo 44×44 px en touch

check: distance_to_related_content
target: [primary_cta]
rule: distance_to(related_content) > threshold → issue
output:
  law: Fitts
  problem: Botón alejado del contenido que afecta
  recommendations:
    - Acerca el botón al elemento que modifica
```

### Miller
```
check: long_lists
target: [menu, list, form_section]
rule: count(items) > 9 → issue
output:
  law: Miller
  problem: Demasiados ítems en un solo bloque
  recommendations:
    - Agrupa en bloques temáticos con títulos
    - Divide formularios en secciones de 4–7 campos
```

### AestheticUsability
```
check: visual_consistency
target: [screen]
rule: inconsistency(alignment, spacing, typography, color) → issue
output:
  law: AestheticUsability
  problem: Inconsistencias visuales
  recommendations:
    - Unifica tipografías, espaciados y estilos de botón

check: beauty_masking_problems
target: [screen]
rule: design_score.visual_high AND ux_issues_count.high → notice
output:
  law: AestheticUsability
  problem: Diseño atractivo oculta problemas de usabilidad
  recommendations:
    - No confíes solo en la estética; reduce opciones y simplifica flujos
```

### Jakob
```
check: common_patterns
target: [header, nav, icon_set]
rule: violates_conventions(global_patterns) → issue
conventions:
  - logo_click → home
  - cart_icon → top_right
  - hamburger → top_left o top_right en mobile
output:
  law: Jakob
  problem: Ruptura de patrones conocidos sin beneficio claro
  recommendations:
    - Alinea posición y comportamiento con patrones estándar
    - Solo innova cuando el beneficio es evidente
```

### Severity
```
- law in [Hick, Fitts, Miller] AND location in [checkout, login, critical_flow] → impact: high
- law == Jakob AND deviation_minor → impact: low
- AestheticUsability inconsistencies → impact: medium
```

---

## checklist
- [ ] ¿Hay más de 7 opciones visibles en algún menú o grupo?
- [ ] ¿Los objetivos táctiles miden al menos 44×44 px?
- [ ] ¿Los botones principales están cerca del contenido que afectan?
- [ ] ¿Los listados o formularios están agrupados en bloques de máximo 9 ítems?
- [ ] ¿La coherencia visual oculta problemas reales de usabilidad?
- [ ] ¿La navegación y los iconos siguen patrones estándar?
