# Storybook · Helpers / Divider

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`divider.js`](divider.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `divider` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-divider*` (`-spacer` · `-line` · `-img`) |
| **Señales** | `—` |
| **Módulo** | [`divider.js`](divider.js) · [`divider.html`](divider.html) |

## Qué es

Familia `.ft-helper-divider*` del 42DS con tres sub-familias: spacers verticales (escala xxs..xlg con visibilidad responsive), líneas decorativas (grosores y colores) e imgs integradas. Más 2 modificadores del bloque (`--radius-tr-bl`, `--white`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | divider-line interactiva: grosor + color + --50 |
| Spacers | gallery | Escala de padding vertical + hideDesktop/hideMobile |
| Lines (grosores+colores) | gallery | Estilos, colores y ancho parcial --50 |
| Img wrappers | gallery | Tabla de clases; ejemplos vivos en Markup |
| Modificadores del bloque | gallery | --radius-tr-bl y --white |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. `--skew` requiere el asset SVG `ft-helper-divider-line-skew.svg`; la sub-familia `-img` depende del átomo `.ft-img`.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_dividers.scss`
- **Showroom legacy:** `fourty/helpers/helper-divider.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
