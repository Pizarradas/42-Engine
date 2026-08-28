# Storybook · Molecules / Tapbar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tapbar.js`](tapbar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tapbar` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-tapbar` |
| **Señales** | `js` |
| **Módulo** | [`tapbar.js`](tapbar.js) · [`tapbar.html`](tapbar.html) |

## Qué es

Barra de navegación inferior fija para móvil: cada ítem tiene doble icono (outline/sólido) que el CSS conmuta según el activo, más texto y estados opcionales (alert · badge).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `cds-statics/js/tapbar/fourty-js-tapbar.js` — interacción real (activación, teclado).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/tapbar/_tapbar.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
