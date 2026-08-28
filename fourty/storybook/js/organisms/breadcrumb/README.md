# Storybook · Organisms / Breadcrumb

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`breadcrumb.js`](breadcrumb.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `breadcrumb-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-breadcrumb` |
| **Señales** | `—` |
| **Módulo** | [`breadcrumb.js`](breadcrumb.js) · [`breadcrumb.html`](breadcrumb.html) |

## Qué es

Organismo del 42DS (`.ft-org-breadcrumb`): contenedor de la miga de pan (`.ft-mol-breadcrumb`), con variante de fondo seccionado (`--is-bg`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | `select` de variante: base · has-home · has-lvl · has-1-lvl · bg-photo · bg-illustration |

## Dependencias clave

- Solo CSS del DS; sin JS.
- El organismo aporta el marco; la navegación vive en la molécula `.ft-mol-breadcrumb` (`-has--home`, `-has--lvl`, `-is--sectioned`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/breadcrumb/_breadcrumb.scss`
- **Showroom legacy:** `fourty/organisms/organism-breadcrumb.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
