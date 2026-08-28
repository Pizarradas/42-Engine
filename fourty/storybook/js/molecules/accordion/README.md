# Storybook · Molecules / Accordion

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`accordion.js`](accordion.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `accordion` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-accordion` |
| **Señales** | `—` |
| **Módulo** | [`accordion.js`](accordion.js) · [`accordion.html`](accordion.html) |

## Qué es

Molécula que agrupa varios paneles plegables `<details>`/`<summary>` nativos. El plegado lo gestiona el navegador: no necesita JavaScript.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | full-width; controla nº de paneles, `--xs`, `--has-icon`, `--has-data-rgt`, subtítulo y primer panel abierto |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS. `<details>` es nativo.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/accordion/_accordion.scss`
- **Showroom legacy:** `fourty/molecules/molecule-accordion.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
