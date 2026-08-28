# Storybook · Molecules / Figcaption

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`figcaption.js`](figcaption.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `figcaption` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-figcaption` |
| **Señales** | `—` |
| **Módulo** | [`figcaption.js`](figcaption.js) · [`figcaption.html`](figcaption.html) |

## Qué es

Pie de imagen con texto de crédito y, opcionalmente, un número destacado a la derecha. Va dentro del `<figcaption>` de un `<figure class="ft-img">`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/figcaption/_figcaption.scss`
- **Showroom legacy:** `fourty/molecules/molecule-figcaption.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
