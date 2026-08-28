# Storybook · Molecules / Pick

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`pick.js`](pick.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `pick-mol` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-pick` |
| **Señales** | `—` |
| **Módulo** | [`pick.js`](pick.js) · [`pick.html`](pick.html) |

## Qué es

Tarjeta de pronóstico de un partido (porra/quiniela): dos equipos con marcador o empate, estado del partido, pronóstico del usuario con acciones editar/añadir y bloques opcionales de evento, votación y recompensa.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `js/timer/fourty-js-timer.js` — solo para el estado `--live` (anima el minuto).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/pick/_pick.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
