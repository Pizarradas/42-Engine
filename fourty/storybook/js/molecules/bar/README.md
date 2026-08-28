# Storybook · Molecules / Bar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`bar.js`](bar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `bar` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-bar` |
| **Señales** | `—` |
| **Módulo** | [`bar.js`](bar.js) · [`bar.html`](bar.html) |

## Qué es

Barra de progreso/votos con etiqueta, cifra y una pista cuyo relleno marca el porcentaje (resultados electorales o progreso de una porra). El ancho del relleno y los colores son inline (data del consumidor).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/bar/_bar.scss`
- **Showroom legacy:** `fourty/molecules/molecule-bar.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
