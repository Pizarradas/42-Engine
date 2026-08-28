# Storybook · Molecules / Slider

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`slider.js`](slider.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `slider` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-carousel` |
| **Señales** | `—` |
| **Módulo** | [`slider.js`](slider.js) · [`slider.html`](slider.html) |

## Qué es

Carrusel de imágenes 100% CSS, sin JavaScript: conmuta con radios y el selector `:has()`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS (es CSS puro).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/slider/_slider.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
