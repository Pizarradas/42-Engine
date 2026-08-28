# Storybook · Molecules / Footer Basic

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`footerbasic.js`](footerbasic.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `footerbasic` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-footerbasic` |
| **Señales** | `—` |
| **Módulo** | [`footerbasic.js`](footerbasic.js) · [`footerbasic.html`](footerbasic.html) |

## Qué es

Pie de página simple con logo a un lado y una lista de enlaces en línea sobre el color de marca.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Logo en blanco + lista de enlaces con `.ft-list--inline`; fondo de marca (`--color-primary`). Sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/footerbasic/_footerbasic.scss`
- **Showroom legacy:** `fourty/molecules/molecule-footerbasic.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
