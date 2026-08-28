# Storybook · Molecules / Pagination

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`pagination.js`](pagination.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `pagination` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-pagination` |
| **Señales** | `—` |
| **Módulo** | [`pagination.js`](pagination.js) · [`pagination.html`](pagination.html) |

## Qué es

Paginación accesible: lista de páginas con flechas anterior/siguiente, página activa y páginas deshabilitadas, dentro de un `<nav aria-label>`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS (cada página es un enlace; las flechas usan iconos CSS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/pagination/_pagination.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
