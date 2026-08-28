# Storybook · Molecules / Marker

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`marker.js`](marker.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `marker` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-marker` |
| **Señales** | `—` |
| **Módulo** | [`marker.js`](marker.js) · [`marker.html`](marker.html) |

## Qué es

Cinta de marcadores de resultados deportivos con scroll horizontal: cabecera (título + enlaces) y una fila de partidos, cada uno con su estado y los dos equipos (escudo + goles).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Link (`.ft-link`); sin JS (layout solo CSS; datos en vivo los inyecta el consumidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/marker/_marker.scss`
- **Showroom legacy:** `fourty/molecules/molecule-marker.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
