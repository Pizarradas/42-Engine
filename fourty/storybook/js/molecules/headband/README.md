# Storybook · Molecules / Headband

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`headband.js`](headband.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `headband` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-headband` |
| **Señales** | `—` |
| **Módulo** | [`headband.js`](headband.js) · [`headband.html`](headband.html) |

## Qué es

Cintillo de cabecera de sección con título y, opcionalmente, logo. Multipropósito con varias familias (titular, noticias, patrocinado, sección) y modificadores de alineación/tamaño.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Modificadores aditivos (alineación, tamaño, `--top-lined`) y familias propias (`--heading`, `--news`, `--branded`, `--section`).
- JS solo para familias con trigger (desplegables).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/headband/_headband.scss`
- **Showroom legacy:** `fourty/molecules/molecule-headband.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
