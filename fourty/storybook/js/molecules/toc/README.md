# Storybook · Molecules / TOC

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`toc.js`](toc.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `toc` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-toc` |
| **Señales** | `—` |
| **Módulo** | [`toc.js`](toc.js) · [`toc.html`](toc.html) |

## Qué es

Tabla de contenidos de un especial: título + lista numerada de artículos, con el actual destacado.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/toc/_toc.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
