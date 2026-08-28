# Storybook · Helpers / Font Size

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`fontsize.js`](fontsize.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `fontsize` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-fontSize-*` |
| **Señales** | `—` |
| **Módulo** | [`fontsize.js`](fontsize.js) · [`fontsize.html`](fontsize.html) |

## Qué es

Familia `.ft-helper-fontSize-*` del 42DS: aplica un tamaño tipográfico canónico (display / heading / body, más variantes `--small` y `fluid`) sin escribir `font-size` ni `line-height` ad-hoc. Composable con fontWeight, fontColor y fontType.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector único con todas las escalas + slot |
| Display | gallery | Titulares hero display L/M/S |
| Heading | gallery | Escala editorial XXL..XXS |
| Body | gallery | Body regular + variante `--small` |
| Fluid | gallery | Capa progresiva clamp() heading + body |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_fonts.scss`
- **Showroom legacy:** `fourty/helpers/helper-fontsize.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
