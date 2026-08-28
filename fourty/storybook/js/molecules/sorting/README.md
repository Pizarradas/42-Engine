# Storybook · Molecules / Sorting

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`sorting.js`](sorting.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `sorting` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-sorting` |
| **Señales** | `—` |
| **Módulo** | [`sorting.js`](sorting.js) · [`sorting.html`](sorting.html) |

## Qué es

Tabla de clasificación / ranking con posición, nombre y estado por fila.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/sorting/_sorting.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
