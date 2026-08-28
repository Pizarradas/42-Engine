# Storybook · Molecules / Promo Header

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`promoHeader.js`](promoHeader.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `promoheader` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-promoHeader` |
| **Señales** | `—` |
| **Módulo** | [`promoHeader.js`](promoHeader.js) · [`promoHeader.html`](promoHeader.html) |

## Qué es

Cinta promocional alineada a la derecha que se incrusta en la cabecera (texto + badge + imagen + enlace).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/promoHeader/_promoHeader.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
