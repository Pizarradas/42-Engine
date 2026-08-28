# Component Patterns

## meta
- domain: component-patterns
- source: "Atomic Design — Brad Frost · MDN Web Docs · web.dev — Component Architecture"
- goal: diseñar componentes reutilizables, desacoplados y mantenibles
- agent_tags: [front, ds, audit]

---

## concepts

### Single Responsibility
Un componente hace una sola cosa bien. Si necesita una lista de responsabilidades separadas por "y", probablemente debe dividirse.
- ❌ Componente que gestiona datos, renderiza Y maneja animaciones
- ✅ Componente de presentación + lógica separada + animación como capa opcional

### Composición sobre herencia
Los componentes se componen (se usan juntos) en lugar de heredar comportamiento de padres:
- Un `Card` no hereda de `Article` — un `Article` puede *contener* una `Card`.
- La composición permite combinar piezas simples para crear piezas complejas.
- Equivalente en CSS: atoms → molecules → organisms (Atomic Design).

### Props / API del componente
La interfaz pública de un componente (sus parámetros o atributos) debe ser:
- **Mínima**: solo lo necesario para cubrir los casos de uso reales.
- **Predecible**: los mismos inputs producen siempre el mismo output.
- **Documentada**: cada parámetro tiene un nombre semántico y un valor por defecto cuando es opcional.

### Separación de estado y presentación
- **Componentes de presentación**: solo renderizan — reciben datos, no los gestionan.
- **Componentes contenedor**: gestionan el estado y pasan datos a los de presentación.
- Esta separación facilita el testing, la reutilización y el mantenimiento.

### Slots y contenido variable
Cuando un componente necesita renderizar contenido arbitrario, usa slots (Web Components) o children (frameworks):
- El componente define *dónde* va el contenido, no *qué* es.
- Permite que el componente sea reutilizable sin saber de antemano su contenido.

### Variantes vs nuevos componentes
Una variante es una modificación visual o de comportamiento del mismo componente base.
- Si comparte más del 70% de la estructura y lógica → es un modificador (`--featured`, `--compact`).
- Si la diferencia es mayor → es un componente nuevo.
- La proliferación de variantes señala que el componente tiene demasiadas responsabilidades.

---

## rules

### Structure
```
check: component_single_responsibility
target: [component]
rule: has_multiple_unrelated_concerns → issue
output:
  problem: Componente con múltiples responsabilidades no relacionadas
  recommendations:
    - Divide en componentes más pequeños y compónolos
    - Separa la lógica de datos de la presentación visual

check: component_depth
target: [component_nesting]
rule: nesting_depth > 4 → warning
output:
  problem: Anidamiento excesivo de componentes
  recommendations:
    - Refactoriza extrayendo sub-componentes
    - Revisa si la composición es la adecuada o hay herencia implícita
```

### API / Interface
```
check: semantic_prop_names
target: [component_props]
rule: prop_name in [data, info, obj, item, val] AND more_specific_name_possible → issue
output:
  problem: Props con nombres genéricos que no comunican su propósito
  recommendations:
    - Usa nombres descriptivos: article, authorName, publishedAt, isLoading
    - El nombre de la prop debe indicar qué contiene, no que "hay un dato"

check: boolean_prop_names
target: [boolean_prop]
rule: prop_type == boolean AND NOT starts_with(is|has|can|should) → warning
output:
  problem: Prop booleana sin prefijo semántico
  recommendations:
    - Prefija con is/has/can/should: isLoading, hasError, canEdit, shouldAnimate
    - Mejora la legibilidad en el sitio de uso: <Card isLoading />

check: required_props_documented
target: [component_definition]
rule: has_required_props AND no_documentation → warning
output:
  problem: Props obligatorias sin documentación
  recommendations:
    - Documenta qué recibe el componente y qué pasa si falta
    - En Design Systems: incluye el componente en el showroom con todos sus estados
```

### Variants
```
check: modifier_vs_new_component
target: [component_variant]
rule: shares_less_than_30_percent_with_base → issue
output:
  problem: Variante que debería ser un componente independiente
  recommendations:
    - Si la diferencia estructural es > 70%, crea un componente nuevo
    - Evita el "gordo modificador" que lleva toda la lógica del producto

check: variant_proliferation
target: [component]
rule: modifier_count > 8 → warning
output:
  problem: Componente con demasiadas variantes
  recommendations:
    - Revisa si algunas variantes responden a responsabilidades distintas
    - Considera dividir en componentes especializados con la base compartida
```

### State
```
check: presentational_component_purity
target: [presentational_component]
rule: fetches_data OR manages_global_state → issue
output:
  problem: Componente de presentación con lógica de datos
  recommendations:
    - Mueve el fetch y la gestión de estado al componente contenedor
    - El componente de presentación solo recibe props y renderiza

check: component_side_effects
target: [component]
rule: has_side_effects AND no_cleanup → issue
output:
  problem: Componente con side effects sin cleanup
  recommendations:
    - Limpia subscripciones, timers y event listeners al destruir el componente
    - Equivalente al return de useEffect en React o el destroyed() en Vue
```

---

## checklist
- [ ] ¿Cada componente tiene una única responsabilidad clara?
- [ ] ¿El anidamiento de componentes no supera 4 niveles?
- [ ] ¿Los nombres de las props son semánticos y descriptivos?
- [ ] ¿Las props booleanas tienen prefijo `is/has/can/should`?
- [ ] ¿Las variantes comparten > 70% de estructura con la base?
- [ ] ¿El componente tiene < 8 modificadores?
- [ ] ¿Los componentes de presentación no gestionan estado ni datos?
- [ ] ¿Los side effects tienen cleanup definido?
