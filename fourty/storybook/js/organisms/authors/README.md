# Storybook · Organisms / Authors

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`authors.js`](authors.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `authors` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-authors` |
| **Señales** | `—` |
| **Módulo** | [`authors.js`](authors.js) · [`authors.html`](authors.html) |

## Qué es

Organismo de composición del 42DS (`.ft-org-authors`): contenedor que apila una o más tarjetas de autor `.ft-mol-authors`. Sin modificadores propios; su casuística vive en la composición (nº de autores + variante de las tarjetas).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controles: variante de tarjeta `.ft-mol-authors` + nº de autores (los nombres ciclan) |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- Reúne CSS de varias piezas: organismo + molécula `.ft-mol-authors`, más `.ft-mol-rrss`, `.ft-mol-tagsNews`, `.ft-tag`, `.ft-link` (o el bundle `[marca]-core.css`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/authors/_authors.scss`
- **Showroom legacy:** `fourty/organisms/organism-authors.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
