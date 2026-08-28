# Storybook · Molecules / Ranking News

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`rankingNews.js`](rankingNews.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `rankingnews` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-rankingNews` |
| **Señales** | `—` |
| **Módulo** | [`rankingNews.js`](rankingNews.js) · [`rankingNews.html`](rankingNews.html) |

## Qué es

Listado numerado de noticias con epígrafe, titular y marca opcional de suscriptor.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/rankingNews/_rankingNews.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
