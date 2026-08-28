# Storybook · Molecules / Card Newsletter

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`card-newsletter.js`](card-newsletter.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `card-newsletter` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-card-newsletter` |
| **Señales** | `—` |
| **Módulo** | [`card-newsletter.js`](card-newsletter.js) · [`card-newsletter.html`](card-newsletter.html) |

## Qué es

Ficha de newsletter para grid: etiqueta, switch de alta (CSS-only, `.btn-bool`), foto del autor y texto con enlace.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone `.ft-tag`, `.ft-list`, `.ft-link`, `.ft-img`.
- Switch `.btn-bool` es CSS-only; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/card-newsletter/_card-newsletter.scss`
- **Showroom legacy:** `fourty/molecules/molecule-card-newsletter.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
