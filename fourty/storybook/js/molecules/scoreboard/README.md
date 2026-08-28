# Storybook · Molecules / Scoreboard

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`scoreboard.js`](scoreboard.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `scoreboard` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-scoreboard` |
| **Señales** | `—` |
| **Módulo** | [`scoreboard.js`](scoreboard.js) · [`scoreboard.html`](scoreboard.html) |

## Qué es

Marcador amplio de un partido: escudo, club y goleadores por equipo, con el resultado al centro.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- JavaScript del consumidor — solo en variante `--interactive` (lógica de los botones +/- del marcador).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/scoreboard/_scoreboard.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
