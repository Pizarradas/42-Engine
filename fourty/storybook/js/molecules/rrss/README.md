# Storybook · Molecules / RRSS

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`rrss.js`](rrss.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `rrss` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-rrss` |
| **Señales** | `—` |
| **Módulo** | [`rrss.js`](rrss.js) · [`rrss.html`](rrss.html) |

## Qué es

Sistema de iconos de redes sociales y acciones de compartir.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Inline | interactive | Barra horizontal `.ft-mol-rrss-inline` con botones `.ft-btn-rrss` (full) |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

**Subgrupos:** `Galleries` (Redes · Variantes de color).

## Dependencias clave

- Solo CSS del DS; sin JS. SVG de cada red como background; variante inline usa `.ft-btn-rrss` (átomo Btn).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/rrss/_rrss.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
