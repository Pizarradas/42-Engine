# Storybook · Molecules / Overlay Live

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`overlay-live.js`](overlay-live.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `overlay-live` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-overlay-live` |
| **Señales** | `—` |
| **Módulo** | [`overlay-live.js`](overlay-live.js) · [`overlay-live.html`](overlay-live.html) |

## Qué es

Listado de partidos de una competición: cada marcador (`__scoreboard`) muestra horario/estado, los dos equipos (escudo + nombre + resultado) y un enlace al directo. `--is-live` resalta el partido en juego.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Link (`.ft-link--block`).
- JavaScript opcional (overlay plegable + datos en vivo).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/overlay-live/_overlay-live.scss`
- **Showroom legacy:** `fourty/molecules/molecule-overlaylive.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
