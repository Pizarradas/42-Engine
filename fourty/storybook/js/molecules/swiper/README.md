# Storybook · Molecules / Swiper

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`swiper.js`](swiper.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `swiper` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-swiper` |
| **Señales** | `js` |
| **Módulo** | [`swiper.js`](swiper.js) · [`swiper.html`](swiper.html) |

## Qué es

Galería multimedia (imágenes y embeds) movida por la librería externa Swiper.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `swiper-js/swiper-bundle.min.js` — obligatorio para deslizar. El storybook zero-toolchain no lo carga: se muestra solo la diapositiva.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/swiper/_swiper.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
