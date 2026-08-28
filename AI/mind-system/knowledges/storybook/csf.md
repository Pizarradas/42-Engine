# Storybook CSF (Component Story Format)

## meta
- domain: storybook-csf
- source: "Storybook Docs — Writing stories · Component Story Format (https://storybook.js.org/docs/writing-stories)"
- goal: definir stories estructuradas, puras y reutilizables
- agent_tags: [storybook, ds, front]

---

## concepts

### Anatomía de un CSF
- **`default export` (`meta`)**: metadatos del componente (título, componente, configuración compartida).
- **exports nombrados**: cada uno es una story (un estado).
- **`args`**: estado configurable de la story.
- **`argTypes`**: documentación y tipo de control de cada arg (ver `controls-args`).
- **`parameters`**: comportamiento de Storybook para esa story o componente.
- **`decorators`**: envoltorios de render (ver `decorators-globals`).
- **`play`**: secuencia de interacción y aserciones (ver `testing`).

### Estructura mínima
1. Importar el componente.
2. Exportar el `meta` por defecto.
3. Definir stories como exports nombrados.
4. Reutilizar `args` entre stories para no duplicar estado.

### Pureza de la story
Una story describe **un estado**, no contiene lógica de render propia ni efectos colaterales. La lógica vive en el componente; la story solo fija inputs.

---

## rules

### State modeling
```
check: one_story_per_state
target: [component_stories]
rule: single_story_with_many_toggles OR missing_critical_state → issue
output:
  problem: Estados del componente no representados como stories independientes
  recommendations:
    - Crea una story por estado relevante (default, loading, error, empty, disabled…)
    - Evita una única story con muchos toggles que oculten estados reales

check: no_equivalent_states
target: [component_stories]
rule: two_stories_render_visually_equivalent → warning
output:
  problem: Stories que representan estados visualmente equivalentes
  recommendations:
    - Elimina duplicados que no aporten un estado distinto
    - Diferencia variantes superficiales con args, no con stories nuevas
```

### Purity / reuse
```
check: story_purity
target: [story]
rule: contains_render_logic OR side_effects → issue
output:
  problem: Story con lógica de render o efectos propios
  recommendations:
    - Mueve la lógica al componente; la story solo fija args
    - Mantén la story declarativa y predecible

check: args_reuse
target: [component_stories]
rule: same_args_duplicated_across_stories → warning
output:
  problem: Args duplicados entre stories
  recommendations:
    - Define args base en el meta y sobreescribe solo lo que cambia
    - Reutiliza args entre stories para reducir mantenimiento
```

---

## checklist
- [ ] ¿Hay un `meta` por defecto y stories como exports nombrados?
- [ ] ¿Cada estado relevante es una story independiente?
- [ ] ¿No hay stories visualmente equivalentes?
- [ ] ¿Las stories son puras (sin lógica de render ni side effects)?
- [ ] ¿Los `args` comunes se reutilizan desde el `meta`?
