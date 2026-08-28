# Storybook · Molecules / Score

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`score.js`](score.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `score` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-score` |
| **Señales** | `—` |
| **Módulo** | [`score.js`](score.js) · [`score.html`](score.html) |

## Qué es

Marcador compacto de un partido: dos equipos (escudo + sigla) y el resultado en el centro.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/score/_score.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
