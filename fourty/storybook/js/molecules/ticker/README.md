# Storybook · Molecules / Ticker

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`ticker.js`](ticker.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `ticker` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-ticker` |
| **Señales** | `—` |
| **Módulo** | [`ticker.js`](ticker.js) · [`ticker.html`](ticker.html) |

## Qué es

Cinta de última hora con desplazamiento automático de titulares.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS (el desplazamiento es animación CSS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/ticker/_ticker.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
