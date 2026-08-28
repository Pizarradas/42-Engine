# Storybook · Molecules / Tracking

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tracking.js`](tracking.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tracking` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-tracking` |
| **Señales** | `—` |
| **Módulo** | [`tracking.js`](tracking.js) · [`tracking.html`](tracking.html) |

## Qué es

Línea de seguimiento de un tema: hitos con fecha y estado (pendiente / completado / actual).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/tracking/_tracking.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
