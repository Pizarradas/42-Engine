# Storybook · Helpers / Branded

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`branded.js`](branded.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `branded` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-branded` |
| **Señales** | `—` |
| **Módulo** | [`branded.js`](branded.js) · [`branded.html`](branded.html) |

## Qué es

Helper de una sola clase `.ft-helper-branded`: aplica la tipografía firma de la marca (`var(--font-branded)`) con `font-weight: 400`. Es la fuente editorial reservada para piezas destacadas, y propaga la regla a todos los descendientes.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle on/off + tamaño tipográfico + slot |
| Default vs Branded | gallery | Contraste font-stack vs --font-branded por escala |
| Propagación a descendientes | gallery | Hijos heredan la fuente vía `* { @include Branded }` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. Consume `--font-branded` de `setting.css` y el mixin `Branded` (`scss/abstracts/mixins/_fonts.scss`).

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_branded.scss`
- **Showroom legacy:** `fourty/helpers/helper-branded.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
