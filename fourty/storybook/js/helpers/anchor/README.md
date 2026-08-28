# Storybook · Helpers / Anchor

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`anchor.js`](anchor.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `anchor` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-anchor-spacer` |
| **Señales** | `—` |
| **Módulo** | [`anchor.js`](anchor.js) · [`anchor.html`](anchor.html) |

## Qué es

Helper de una sola clase: amortiguador para enlaces ancla (#id) cuando una cabecera fija tapa el target del salto. Usa un pseudo `:before` con margin negativo y solo aplica en ≥768px.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle on/off + demo de salto a ID |
| Mecanismo + alternativa | gallery | Explicación + `scroll-margin-top` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_anchors.scss`
- **Showroom legacy:** `fourty/helpers/helper-anchor.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
