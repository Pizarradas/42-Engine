# CSS Architecture

## meta
- domain: css-architecture
- source: "MDN Web Docs · CSS Cascade Level 5 · BEM Methodology · Custom Properties W3C"
- goal: escribir CSS mantenible, predecible y escalable
- agent_tags: [front, audit, 42ds]

---

## concepts

### Cascade y especificidad
El CSS funciona en cascada: cuando dos reglas aplican al mismo elemento, gana la más específica. La especificidad es:
1. `!important` — evitar salvo excepciones justificadas
2. Estilos inline (`style=""`) — evitar en componentes reutilizables
3. ID (`#id`) — especificidad alta, difícil de sobreescribir
4. Clases, atributos, pseudo-clases (`.clase`, `[attr]`, `:hover`)
5. Elementos y pseudo-elementos (`div`, `::before`)

El problema de la especificidad escalada: cada override requiere mayor especificidad, creando una escalada que termina en `!important`.

### Custom Properties (CSS Variables)
Las custom properties permiten tematización sin duplicar código:
- Se definen en `:root` o en el componente que las contiene.
- Se heredan por el DOM: un hijo puede leer la variable del padre.
- Se pueden sobreescribir localmente: `--color-primary` puede ser diferente por marca.
- Permiten JavaScript: `element.style.setProperty('--color', value)`.

### BEM (Block, Element, Modifier)
Metodología para nombrar clases que evita conflictos de especificidad:
- **Block**: componente independiente → `.card`
- **Element**: parte del block → `.card__title`, `.card__image`
- **Modifier**: variante o estado → `.card--featured`, `.card--loading`
- Regla clave: los elementos no se anidan → `.card__image__caption` es incorrecto; usar `.card__caption`

### Separación de responsabilidades
- **Layout**: dónde están los elementos (grid, flex, position)
- **Box model**: tamaño, padding, margin, border
- **Visual**: color, tipografía, sombras, efectos
- **State**: hover, focus, disabled, active

### Utility classes vs componentes
- **Utility classes** (ej: `.mt-4`, `.text-sm`): rápidas, predecibles, sin semántica
- **Component classes** (ej: `.btn--primary`): encapsulan variantes, más semánticas
- Mezclar ambas es válido; lo que se evita es duplicar lógica entre las dos aproximaciones

---

## rules

### Specificity
```
check: no_id_selectors
target: [css_rule]
rule: selector contains # AND context != override_third_party → issue
output:
  problem: Selector por ID en CSS de componente
  recommendations:
    - Usa clases en lugar de IDs para estilos
    - Los IDs se reservan para anchors y referencias JS/ARIA

check: no_important_overuse
target: [css_declaration]
rule: uses_!important AND context != utility_class → issue
output:
  problem: Uso de !important fuera de utility classes
  recommendations:
    - Refactoriza la especificidad en lugar de usar !important
    - Si es override de terceros: documenta el motivo con comentario

check: inline_styles
target: [html_element]
rule: has_style_attribute AND NOT dynamic_value → issue
output:
  problem: Estilo inline en elemento estático
  recommendations:
    - Mueve el estilo a una clase CSS
    - Los estilos inline solo se justifican para valores dinámicos (JS, variables CSS)
```

### BEM
```
check: bem_element_nesting
target: [class_name]
rule: class contains __[x]__[y] → issue
output:
  problem: Elemento BEM anidado en otro elemento
  recommendations:
    - ❌ .card__image__caption → ✅ .card__caption
    - Los elementos BEM son hijos directos del block, no de otros elementos

check: modifier_without_block
target: [html_element]
rule: has_modifier_class AND NOT has_block_class → issue
output:
  problem: Modificador BEM sin clase base del bloque
  recommendations:
    - ❌ class="card--featured" → ✅ class="card card--featured"
    - El modificador nunca reemplaza al bloque, lo extiende
```

### Custom Properties
```
check: hardcoded_color
target: [css_declaration]
rule: color|background-color == hex_or_rgb AND custom_property_exists → issue
output:
  problem: Color hardcoded cuando existe una custom property equivalente
  recommendations:
    - Usa var(--color-primary) en lugar de #C00
    - Los valores hardcoded bloquean la tematización por marca

check: custom_property_fallback
target: [css_var]
rule: var(--X) AND no_fallback AND --X_not_guaranteed_defined → warning
output:
  problem: Custom property sin valor de fallback
  recommendations:
    - Añade fallback: var(--color-primary, #000)
    - Solo omite el fallback si la variable está garantizada en :root
```

### Responsive
```
check: fixed_width_elements
target: [css_declaration]
rule: width == Npx AND context != icon|avatar|fixed_component → issue
output:
  problem: Ancho fijo en elemento que debería ser fluido
  recommendations:
    - Usa max-width en lugar de width para contenedores
    - Usa porcentajes, fr o clamp() para elementos fluidos

check: mobile_first_media_queries
target: [media_query]
rule: uses_max_width AND NOT override_context → warning
output:
  problem: Media queries max-width (desktop-first)
  recommendations:
    - Prefiere min-width (mobile-first): estilos base para móvil, overrides para pantallas mayores
```

---

## checklist
- [ ] ¿Los selectores usan clases, no IDs?
- [ ] ¿`!important` está ausente o justificado?
- [ ] ¿Sin estilos inline para valores estáticos?
- [ ] ¿Los elementos BEM no están anidados entre sí?
- [ ] ¿Los modificadores BEM siempre van con la clase base?
- [ ] ¿Los colores usan `var(--custom-property)` en lugar de valores hardcoded?
- [ ] ¿Los contenedores usan `max-width`, no `width` fija?
- [ ] ¿Las media queries son mobile-first (`min-width`)?
