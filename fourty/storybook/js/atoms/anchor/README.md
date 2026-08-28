# Storybook · Atoms / Anchor

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`anchor.js`](anchor.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `anchor-atom` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-anchor` |
| **Señales** | `—` |
| **Módulo** | [`anchor.js`](anchor.js) · [`anchor.html`](anchor.html) |

## Qué es

Átomo estructural (`.ft-anchor`): contenedor `display:block` que envuelve un punto de destino de salto (`#id`) o un bloque de contenido. Su único modificador, `--absolute`, lo convierte en un ancla invisible fuera del flujo.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `absolute`, `spacer` |
| Con espaciadores | gallery | offset cabecera fija |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. (el salto es nativo de `#id`)

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/anchor/_anchor.scss`
- **Showroom legacy:** `fourty/atoms/atom-anchor.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
