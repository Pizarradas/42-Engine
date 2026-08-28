# Storybook · Helpers / Grids

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`grids.js`](grids.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `grids` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-grid-*` |
| **Señales** | `—` |
| **Módulo** | [`grids.js`](grids.js) · [`grids.html`](grids.html) |

## Qué es

Familia `.ft-helper-grid-*` del 42DS: anchos en columnas (`grid-width-1..12`, activos desde Lg ≥1024px) y un sangrado de borde solo-móvil (`grid-out-mo`). Pensadas para componerse con el grid flex del DS (`.ft-layout-grid-flex__col*`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Eje grid-width 1..12 simulado con flex-basis |
| Anchos 1..12 | gallery | Escala completa de anchuras |
| Grid-out-mo | gallery | Sangrado de borde solo en móvil |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_grids.scss`
- **Showroom legacy:** `fourty/helpers/helper-grids.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
