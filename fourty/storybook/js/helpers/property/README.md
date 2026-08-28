# Storybook · Helpers / Property

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`property.js`](property.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `property` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-property*` |
| **Señales** | `—` |
| **Módulo** | [`property.js`](property.js) · [`property.html`](property.html) |

## Qué es

Familia `.ft-helper-property*` del 42DS: categoría miscelánea con 5 sub-familias sin nexo temático fuerte: opacidad, border-radius, borders, indicador "live" y columnas multi-column.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Opacity (la sub-familia más visual), step de 10 en 10 |
| Opacity | gallery | `-opacity-{10..100}` |
| Round | gallery | `-round-{xs,sm,md,lg,xlg}` (border-radius) |
| Border | gallery | `-border` + `-thin`/`-grey`/`-mediumgrey`/`-lightgrey`; `-short-top/bottom` solo en revistas |
| --live | gallery | Punto rojo pulsante (animación `shift`), brand-aware |
| Column count+gap | gallery | `-column-count-xs` (≥1024px) + `-column-gap-{xs..xlg}` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_properties.scss`
- **Showroom legacy:** `fourty/helpers/helper-property.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
