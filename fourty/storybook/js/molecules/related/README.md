# Storybook · Molecules / Related

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`related.js`](related.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `related` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-related` |
| **Señales** | `—` |
| **Módulo** | [`related.js`](related.js) · [`related.html`](related.html) |

## Qué es

Bloque de noticias relacionadas: cabecera + lista de enlaces, con variantes con miniatura y de opinión.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/related/_related.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
