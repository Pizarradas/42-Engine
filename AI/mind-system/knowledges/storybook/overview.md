# Storybook Overview

## meta
- domain: storybook-overview
- source: "Storybook Docs — Get started · Configure (https://storybook.js.org/docs)"
- goal: entender qué resuelve Storybook y cuándo adoptarlo
- agent_tags: [storybook, ds, front]

---

## concepts

### Qué es
Storybook es un entorno para desarrollar, documentar y probar componentes UI **en aislamiento**, sin depender de la aplicación completa.

### Qué resuelve
- **Desarrollo aislado**: construir un componente sin levantar toda la app.
- **Documentación viva**: ejemplos reales que se mantienen con el código.
- **Testing de UI**: estados, interacción y accesibilidad sobre la misma definición.

### Conceptos base
- **Story**: un estado concreto renderizado de un componente.
- **Docs**: documentación automática o personalizada de ese componente.
- **Testing**: validación visual, funcional e interactiva a partir de las stories.
- **Sharing**: publicación y reutilización del catálogo de componentes.

### Cuándo usarlo
- Design systems y librerías de componentes.
- Interfaces complejas con múltiples estados.
- Documentación técnica de UI que debe permanecer sincronizada con el código.

### Cuándo aporta poco
- Páginas estáticas únicas sin componentes reutilizables.
- Prototipos desechables sin estados que documentar.

---

## rules

### Adoption
```
check: storybook_fit
target: [project]
rule: no_reusable_components AND no_multiple_component_states → warning
output:
  problem: Storybook aporta poco valor en proyectos sin componentes reutilizables ni estados que aislar
  recommendations:
    - Reserva Storybook para design systems, librerías de componentes o UIs con muchos estados
    - Para páginas estáticas puntuales, documenta con otro medio más ligero

check: story_as_unit
target: [component]
rule: documents_component AND no_story_per_state → issue
output:
  problem: Componente documentado sin representar sus estados como stories
  recommendations:
    - Modela cada estado relevante como una story independiente
    - La story es la unidad mínima de desarrollo, documentación y test
```

---

## checklist
- [ ] ¿El proyecto tiene componentes reutilizables o estados que justifiquen aislarlos?
- [ ] ¿Cada componente expone sus estados relevantes como stories?
- [ ] ¿La documentación se genera desde las stories (viva) y no en paralelo?
- [ ] ¿Se entiende Story / Docs / Testing / Sharing como las cuatro capas del flujo?
