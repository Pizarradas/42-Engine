# Don't Make Me Think (Krug)

## meta
- domain: usability
- source: "Don't Make Me Think — Steve Krug"
- goal: minimizar fricción y carga cognitiva en interfaces
- agent_tags: [ux, audit, flow]

---

## concepts

### "No me hagas pensar"
El usuario no debería tener que pararse a descifrar cómo usar la interfaz.
- El propósito de cada pantalla debe ser evidente en 3–5 segundos.
- La acción principal debe ser obvia a simple vista.

### El usuario escanea, no lee
Los usuarios leen en diagonal, buscando pistas visuales y palabras clave.
- La jerarquía de texto (títulos, subtítulos, bullets) es crítica.
- Los bloques largos sin estructura son invisibles para el usuario.

### Satisficing
El usuario no optimiza: elige la primera opción que parece funcionar.
- Lo más visible debe coincidir con el camino recomendado.
- Un CTA secundario más prominente que el principal es un error crítico.

### Convenciones y consistencia
Las convenciones reducen el esfuerzo mental.
- La ruptura de convenciones sin beneficio claro genera fricción.
- La inconsistencia de estilos (links, botones, nav) genera duda.

### Happy path visible
Siempre debe existir una ruta clara hacia el objetivo principal.
- La acción crítica no puede estar en menús ocultos o secundarios.
- El flujo principal debe ser visible sin scroll ni exploración.

---

## rules

### Clarity
```
check: page_purpose_clarity
target: [screen]
rule: time_to_understand_purpose > 3s OR top_level_text_missing → issue
output:
  principle: Clarity
  problem: Propósito de la pantalla no evidente
  recommendations:
    - Añade título claro que resuma la tarea principal
    - Añade subtítulo que explique qué obtiene el usuario

check: primary_action_visibility
target: [screen]
rule: primary_cta_missing OR primary_cta_visual_weight < secondary_elements → issue
output:
  principle: Clarity
  problem: Acción principal no evidente
  recommendations:
    - Aumenta contraste, tamaño o posición del CTA principal
    - Reduce protagonismo de acciones secundarias
```

### Scanability
```
check: text_blocks
target: [text_block]
rule: chars_length > 400 AND no_headings_or_bullets → issue
output:
  principle: Scanability
  problem: Texto difícil de escanear
  recommendations:
    - Divide en párrafos cortos con títulos y bullets
    - Destaca palabras clave relacionadas con la tarea
```

### Satisficing
```
check: first_attention_target
target: [screen]
rule: visual_first_focus != primary_goal_component → issue
output:
  principle: Satisficing
  problem: Lo que más destaca no es lo que más conviene al usuario
  recommendations:
    - Reordena jerarquía visual para que el camino recomendado sea el más visible
```

### Conventions
```
check: basic_ui_conventions
target: [links, buttons, nav]
rule: inconsistent_link_styles OR unexpected_nav_location → issue
output:
  principle: Conventions
  problem: Ruptura de convenciones que genera duda
  recommendations:
    - Unifica estilo de enlaces y botones
    - Usa patrones de navegación comunes
```

### HappyPath
```
check: happy_path_visibility
target: [screen]
rule: steps_to_goal.hidden OR main_flow_cta_nested_in_hidden_menu → issue
output:
  principle: HappyPath
  problem: Ruta principal poco visible
  recommendations:
    - Surfacea el flujo principal en la vista inicial
    - Evita esconder la acción crítica en menús secundarios
```

---

## checklist
- [ ] ¿El propósito de la pantalla se entiende en 1 frase sin leer todo?
- [ ] ¿El siguiente paso es obvio?
- [ ] ¿Hay elementos que parecen clicables sin serlo?
- [ ] ¿Hay ruido visual innecesario?
- [ ] ¿La ruta principal es visible sin hacer scroll?
- [ ] ¿Lo más prominente visualmente corresponde al camino recomendado?
