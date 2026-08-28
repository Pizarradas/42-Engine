# Storybook · Molecules / Mod News

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`modNews.js`](modNews.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `modnews` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-modNews` |
| **Señales** | `—` |
| **Módulo** | [`modNews.js`](modNews.js) · [`modNews.html`](modNews.html) |

## Qué es

Módulo de recirculación de noticias: título de sección y una lista de artículos (titular + fecha + miniatura, con badge premium opcional). Variantes para recirculación, bloque final y contenido patrocinado.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Link (`.ft-link`); sin JS esencial (`--taboola` lo carga el proveedor externo).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/modNews/_modNews.scss`
- **Showroom legacy:** `fourty/molecules/molecule-modNews.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
