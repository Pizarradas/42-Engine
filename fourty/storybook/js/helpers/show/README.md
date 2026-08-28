# Storybook · Helpers / Show

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`show.js`](show.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `show` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-show*` |
| **Señales** | `—` |
| **Módulo** | [`show.js`](show.js) · [`show.html`](show.html) |

## Qué es

Familia `.ft-helper-show*` del 42DS: inverso de Hides + utilidades de display. Muestra/permite un elemento por display (block/flex/inline-block + modificadores) o por rango responsive (mo/sm/md/lg/xlg).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Familia (display utility o responsive) + variante |
| Display utilities | gallery | Block · Flex (+ align/justify) · Inline-block |
| Responsive | gallery | `show-mo/sm/md/lg/xlg`; verificar con el control Viewport |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS (el SCSS usa `hide-visually` de abstracts).

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_shows.scss`
- **Showroom legacy:** `fourty/helpers/helper-show.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
