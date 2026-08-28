# Storybook · Molecules / Graph Legend

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`graphLegend.js`](graphLegend.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `graph-legend` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-graph-legend` |
| **Señales** | `—` |
| **Módulo** | [`graphLegend.js`](graphLegend.js) · [`graphLegend.html`](graphLegend.html) |

## Qué es

Leyenda de un gráfico: una fila de etiquetas con marcador de color, nombre y valor, con tres alineaciones posibles.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone etiquetas `.ft-tag--secondary` (marcador + nombre + valor); sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/graphLegend/_graphLegend.scss`
- **Showroom legacy:** `fourty/molecules/molecule-graphLegend.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
