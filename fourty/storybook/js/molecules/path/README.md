# Storybook · Molecules / Path

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`path.js`](path.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `path-mol` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-path` |
| **Señales** | `—` |
| **Módulo** | [`path.js`](path.js) · [`path.html`](path.html) |

## Qué es

Miga de pan tipo carril / navegación contextual: combina migas de pan con la página actual, un carril de secciones relacionadas y un espacio promocional opcional en un solo `<nav>`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `js/scroll/smooth-scrollbar/smooth-scrollbar-library.js` + `-functions.js` — solo para el scroll del carril (opcional).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/path/_path.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
