# Storybook · Helpers / Images

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`images.js`](images.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `images` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-img-*` |
| **Señales** | `—` |
| **Módulo** | [`images.js`](images.js) · [`images.html`](images.html) |

## Qué es

Familia `.ft-helper-img-*` del 42DS: tres sub-familias — responsive (`-rd`), inline en texto (`-intext`) y posicionada absolute (`-positioned` con modificadores de ancla `--top/--rgt/--bttm/--lft/--cnt`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Sub-familia + modificador de posición + slot |
| Positioned (5 anclas) | gallery | Modificadores de ancla sobre wrapper relative |
| Combinaciones (esquinas) | gallery | Modificadores apilados (esquinas, centrados) |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_images.scss`
- **Showroom legacy:** `fourty/helpers/helper-images.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
