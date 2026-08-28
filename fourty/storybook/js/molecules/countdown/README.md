# Storybook · Molecules / Countdown

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`countdown.js`](countdown.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `countdown` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-countdown` |
| **Señales** | `—` |
| **Módulo** | [`countdown.js`](countdown.js) · [`countdown.html`](countdown.html) |

## Qué es

Cuenta atrás a un evento: imágenes laterales y bloque central con título y casillas de días/horas/minutos.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Timer JS de cuenta atrás (actualiza `#days`/`#hours`/`#minutes` en producción).
- Imágenes de fondo en variantes `--bg` y `--custom`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/countdown/_countdown.scss`
- **Showroom legacy:** `fourty/molecules/molecule-countdown.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
