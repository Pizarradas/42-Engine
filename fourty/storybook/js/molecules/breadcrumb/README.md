# Storybook · Molecules / Breadcrumb

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`breadcrumb.js`](breadcrumb.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `breadcrumb` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-breadcrumb` |
| **Señales** | `—` |
| **Módulo** | [`breadcrumb.js`](breadcrumb.js) · [`breadcrumb.html`](breadcrumb.html) |

## Qué es

Migas de pan en dos familias activas: breadcrumb base en línea y variante `-has--lvl` con titular por niveles y links de apoyo.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/breadcrumb/_breadcrumb.scss`
- **Showroom legacy:** `fourty/__old-showroom/molecules/molecule-breadcrumb.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
