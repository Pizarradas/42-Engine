# Storybook · Molecules / Table

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`table.js`](table.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `table` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-table` |
| **Señales** | `—` |
| **Módulo** | [`table.js`](table.js) · [`table.html`](table.html) |

## Qué es

Tabla de datos con celdas alineables, filas alternas y variantes de presentación.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/table/_table.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
