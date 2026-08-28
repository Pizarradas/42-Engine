# Storybook · Helpers / UI Helpers

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`uihelpers.js`](uihelpers.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `uihelpers` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ui-helper-hidden-accessible` |
| **Señales** | `—` |
| **Módulo** | [`uihelpers.js`](uihelpers.js) · [`uihelpers.html`](uihelpers.html) |

## Qué es

Una sola clase legacy `.ui-helper-hidden-accessible` que oculta visualmente el contenido (`left: -999em`) manteniéndolo accesible a screen readers. Prefijo atípico `.ui-helper-` por origen jQuery UI; para código nuevo preferir `.ft-helper-hide-screenReader`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle on/off de la clase + slot |
| Legacy vs moderno | gallery | Comparativa con `.ft-helper-hide-screenReader` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_uihelper.scss`
- **Showroom legacy:** `fourty/helpers/helper-uihelpers.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
