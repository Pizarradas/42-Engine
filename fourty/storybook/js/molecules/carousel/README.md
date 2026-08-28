# Storybook · Molecules / Carousel

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`carousel.js`](carousel.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `carousel-mol` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-carousel` |
| **Señales** | `—` |
| **Módulo** | [`carousel.js`](carousel.js) · [`carousel.html`](carousel.html) |

## Qué es

Carrusel de imágenes CSS-only: slides navegables con flechas (labels que apuntan a radios) y paginación de radios; el estado activo lo resuelve el CSS con `:has(input:checked)`, sin JavaScript.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS (radio + `:has()`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/carousel/_carousel.scss`
- **Showroom legacy:** `fourty/molecules/molecule-carousel.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
