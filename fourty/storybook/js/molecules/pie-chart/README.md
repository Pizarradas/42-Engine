# Storybook · Molecules / Pie Chart

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`pie-chart.js`](pie-chart.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `pie-chart` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-chart-pie` |
| **Señales** | `js` |
| **Módulo** | [`pie-chart.js`](pie-chart.js) · [`pie-chart.html`](pie-chart.html) |

## Qué es

Gráfico circular / semicírculo de escaños usado en elecciones: el desarrollador escribe un contenedor vacío con un JSON en `data-config` y JavaScript dibuja el resto.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Chartist (vendor) + `js/chart-pie/chart-params.js` — imprescindible: pinta el gráfico.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/pie-chart/_pie-chart.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
