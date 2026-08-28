# Storybook · Molecules / Promo

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`promo.js`](promo.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `promo` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-promo` |
| **Señales** | `—` |
| **Módulo** | [`promo.js`](promo.js) · [`promo.html`](promo.html) |

## Qué es

Bloque promocional con imagen, texto, listado de ventajas y botón de acción.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/promo/_promo.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
