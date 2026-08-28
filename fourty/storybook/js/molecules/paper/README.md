# Storybook · Molecules / Paper

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`paper.js`](paper.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `paper` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-paper` |
| **Señales** | `—` |
| **Módulo** | [`paper.js`](paper.js) · [`paper.html`](paper.html) |

## Qué es

Bloque de edición impresa / hemeroteca: portada del periódico (con icono de lupa para ampliar) junto a un título, una lista de accesos y un CTA de compra.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS (el icono de lupa es un SVG en el CSS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/paper/_paper.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
