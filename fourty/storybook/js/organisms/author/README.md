# Storybook · Organisms / Author

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`author.js`](author.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `author-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-author` |
| **Señales** | `—` |
| **Módulo** | [`author.js`](author.js) · [`author.html`](author.html) |

## Qué es

Organismo del 42DS (`.ft-org-author`): distribuye fichas de firma `.ft-mol-author` en una rejilla, con destacado opcional (`--has-highlighted`) y modo scrollable (`--is-scrollable`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controles: variante de organismo · layout de ficha · nº de fichas · destacar la 1ª |

## Dependencias clave

- Solo CSS del DS; sin JS.
- Compone la molécula `.ft-mol-author` y reparte las fichas con `.ft-layout-grid-flex__nested`; las fotos las aporta el consumidor.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/author/_author.scss`
- **Showroom legacy:** `fourty/organisms/organism-author.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
