# Storybook · Helpers / Font Weight

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`fontweight.js`](fontweight.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `fontweight` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-fontWeight-*` |
| **Señales** | `—` |
| **Módulo** | [`fontweight.js`](fontweight.js) · [`fontweight.html`](fontweight.html) |

## Qué es

Familia `.ft-helper-fontWeight-*` del 42DS: aplica un peso de 300 a 800 junto a la `font-family` específica de ese peso en la marca activa (no es solo `font-weight`, también hace swap de familia).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Peso seleccionable + slot textual |
| Escala completa | gallery | Pesos 300..800 apilados |
| Composición con fontSize | gallery | Pesos cruzados con tamaños |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_fonts.scss`
- **Showroom legacy:** `fourty/helpers/helper-fontweight.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
