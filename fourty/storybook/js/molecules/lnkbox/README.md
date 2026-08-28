# Storybook · Molecules / Lnk Box

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`lnkbox.js`](lnkbox.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `lnkbox` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-lnkbox` |
| **Señales** | `—` |
| **Módulo** | [`lnkbox.js`](lnkbox.js) · [`lnkbox.html`](lnkbox.html) |

## Qué es

Caja de enlaces: una lista de filas, cada una con su texto y un enlace «Más información» (`.ft-link--block` que cubre toda la fila). Con chevron en base, subtítulos en `--simple` y tarjetas clicables en `--card`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Link (`.ft-link--block`); sin JS (chevron y hover son CSS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/lnkbox/_lnkbox.scss`
- **Showroom legacy:** `fourty/molecules/molecule-lnkBox.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
