# Storybook · Molecules / Tags News

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tagsNews.js`](tagsNews.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tagsnews` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-tagsNews` |
| **Señales** | `—` |
| **Módulo** | [`tagsNews.js`](tagsNews.js) · [`tagsNews.html`](tagsNews.html) |

## Qué es

Fila de temas relacionados: un título y una lista de etiquetas con scroll horizontal.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/tagsNews/_tagsNews.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
