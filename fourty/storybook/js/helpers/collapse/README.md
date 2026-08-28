# Storybook · Helpers / Collapse

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`collapse.js`](collapse.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `collapse` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-collapse` · `.ft-helper-collapse--show` |
| **Señales** | `js` |
| **Módulo** | [`collapse.js`](collapse.js) · [`collapse.html`](collapse.html) |

## Qué es

Pareja mínima `.ft-helper-collapse` (display: none) + `.ft-helper-collapse--show` (display: block) del 42DS. Patrón CSS para esconder/mostrar un bloque por `display`, sin animación ni estado interno: pensado para que el consumidor lo togglee con JS.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle on/off del modificador --show + slot |
| Patrón JS-driven | gallery | Toggle real onclick + ejemplo de JS de consumidor |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Requiere JS del consumidor para togglear el modificador `--show` en runtime (señal `js`). El helper en sí es CSS puro, sin transición.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_collapses.scss`
- **Showroom legacy:** `fourty/helpers/helper-collapse.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
