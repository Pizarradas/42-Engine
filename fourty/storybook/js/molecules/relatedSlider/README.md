# Storybook · Molecules / Related Slider

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`relatedSlider.js`](relatedSlider.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `relatedslider` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-relatedSlider` |
| **Señales** | `—` |
| **Módulo** | [`relatedSlider.js`](relatedSlider.js) · [`relatedSlider.html`](relatedSlider.html) |

## Qué es

Carrusel de noticias relacionadas movido por una librería externa (Swiper o Glide).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `swiper-js/swiper-bundle.min.js` + `swiper-js.js` (opción Swiper) o `vendors/glide.js` (alternativa). El storybook zero-toolchain no los carga: diapositivas en estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/relatedSlider/_relatedSlider.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
