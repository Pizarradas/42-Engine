# Storybook · Molecules / Data Sheet

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`dataSheed.js`](dataSheed.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `datasheet` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-dataSheed` |
| **Señales** | `—` |
| **Módulo** | [`dataSheed.js`](dataSheed.js) · [`dataSheed.html`](dataSheed.html) |

## Qué es

Ficha técnica de un partido: cabecera con competición, marcador (logos + tanteos), alineaciones de los dos equipos y pie con goles, árbitros e incidencias.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone `.ft-text`; solo CSS (no necesita JS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/dataSheed/_dataSheed.scss`
- **Showroom legacy:** `fourty/molecules/molecule-dataSheed.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
