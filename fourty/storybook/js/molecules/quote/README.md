# Storybook · Molecules / Quote

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`quote.js`](quote.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `quote` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-quote` |
| **Señales** | `—` |
| **Módulo** | [`quote.js`](quote.js) · [`quote.html`](quote.html) |

## Qué es

Cita destacada en `<blockquote>` con comilla decorativa y atribución de autor.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/quote/_quote.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
