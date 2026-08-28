# Storybook · Molecules / Menu Anchor

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`menuanchor.js`](menuanchor.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `menu-anchor` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-menu-anchor` |
| **Señales** | `—` |
| **Módulo** | [`menuanchor.js`](menuanchor.js) · [`menuanchor.html`](menuanchor.html) |

## Qué es

Barra de navegación por anclas: enlaces que saltan a secciones de la misma página, en scroll horizontal sobre el color de marca. Compone el átomo `.ft-anchor`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Anchor (`.ft-anchor`).
- JavaScript opcional (scroll-spy para resaltar sección visible).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/menuanchor/_menuanchor.scss`
- **Showroom legacy:** `fourty/molecules/molecule-menu-anchor.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
