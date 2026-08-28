# Storybook · Molecules / Subtitle

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`subtitle.js`](subtitle.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `subtitle` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-subtitle` |
| **Señales** | `—` |
| **Módulo** | [`subtitle.js`](subtitle.js) · [`subtitle.html`](subtitle.html) |

## Qué es

Entradilla / subtítulo de artículo, con viñeta decorativa y variantes de lista.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS. Variantes de lista componen con el átomo Lista (`.ft-list__item`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/subtitle/_subtitle.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
