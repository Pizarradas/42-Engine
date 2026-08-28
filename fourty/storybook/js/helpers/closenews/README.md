# Storybook · Helpers / Close News

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`closenews.js`](closenews.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `closenews` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-closenews` |
| **Señales** | `—` |
| **Módulo** | [`closenews.js`](closenews.js) · [`closenews.html`](closenews.html) |

## Qué es

Helper de una sola clase `.ft-helper-closenews`: limita el alto del bloque a 21.5rem y añade un fade-out blanco en los últimos 200px (`:after` linear-gradient). Patrón editorial para previews de noticia o teasers tipo "lectura cortada".

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle on/off + número de párrafos demo |
| Con vs sin (comparativa) | gallery | Bloque libre frente a recortado |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. El fade está hardcoded a `var(--color-white)`: se rompe sobre fondos no blancos.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_closenews.scss`
- **Showroom legacy:** `fourty/helpers/helper-closenews.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
