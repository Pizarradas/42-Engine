# Storybook · Helpers / Spacers

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`spacers.js`](spacers.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `spacers` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-spacer-*` |
| **Señales** | `—` |
| **Módulo** | [`spacers.js`](spacers.js) |

## Qué es

Familia de utilidades `.ft-helper-spacer-*` del 42DS. Resuelve espaciado, overlap y limpieza de floats sin CSS ad hoc, organizada en Storybook por intención de uso.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Padding | interactive | `-spacer-{y\|t\|b}-{size}`; `xxlg` solo en `-t` |
| Gap entre hermanos | interactive | `-spacer-gap-{y\|t\|b}-{size}` |
| Inner padding | interactive | `-spacer-inner-{size}` · `-inner-y-{size}` |
| Viewport | interactive | `-spacer-b-vp-{10..100}` (margin-bottom en dvh) |
| Offset negativo | interactive | `-spacer-voffset/-hoffset`; hoffset desde 768px |
| Clear | gallery | `-spacer-clear` para limpiar floats heredados |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_spacers.scss`
- **Showroom legacy:** `fourty/helpers/helper-spacers.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
