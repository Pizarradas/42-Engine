# Storybook · Helpers / Display

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`display.js`](display.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `display` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-display--block` · `.ft-helper-display-flex` |
| **Señales** | `—` |
| **Módulo** | [`display.js`](display.js) · [`display.html`](display.html) |

## Qué es

Familia `.ft-helper-display*` del 42DS con dos sub-familias de notación distinta: `--block` (doble guion, raíz + 3 modificadores de alineación) y `-flex` (guion simple, raíz + ~13 modificadores composables de dirección/alineación/distribución). La discrepancia de nomenclatura es legacy y se mantiene literal.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de familia (block/flex) + modificadores |
| Block | gallery | Catálogo de alineaciones del bloque |
| Flex | gallery | Dirección, cross axis, main axis y multilínea |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_display.scss`
- **Showroom legacy:** `fourty/helpers/helper-display.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
