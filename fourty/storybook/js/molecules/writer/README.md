# Storybook · Molecules / Writer

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`writer.js`](writer.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `writer` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-writer` |
| **Señales** | `—` |
| **Módulo** | [`writer.js`](writer.js) · [`writer.html`](writer.html) |

## Qué es

Firma de autor o redacción: avatar, nombre y cargo, con varias disposiciones.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/writer/_writer.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
