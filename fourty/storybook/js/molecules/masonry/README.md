# Storybook · Molecules / Masonry

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`masonry.js`](masonry.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `masonry` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-masonry` |
| **Señales** | `—` |
| **Módulo** | [`masonry.js`](masonry.js) · [`masonry.html`](masonry.html) |

## Qué es

Ítem de cuadrícula irregular: imagen + contenido (antetítulo, titular, entradilla). Marca el tipo de contenido (foto/vídeo/audio) con un icono sobre la imagen y admite cuatro disposiciones.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Link (`.ft-link`); sin JS (los iconos de media son SVG embebidos en el CSS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/masonry/_masonry.scss`
- **Showroom legacy:** `fourty/molecules/molecule-masonry.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
