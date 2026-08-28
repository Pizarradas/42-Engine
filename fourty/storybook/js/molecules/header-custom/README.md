# Storybook · Molecules / Header Custom

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`header-custom.js`](header-custom.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `header-custom` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-header-custom` |
| **Señales** | `—` |
| **Módulo** | [`header-custom.js`](header-custom.js) · [`header-custom.html`](header-custom.html) |

## Qué es

Cabecera ilustrada de página/sección: bloque de texto (título + destacado + subtítulo) e imagen con esquina redondeada. Pensada para portadillas de especiales.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo `.ft-img` (ilustración); variables de marca (`--color-illustrations-skin-5`).
- `.affix` opcional si se hace sticky; sin JS crítico.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/header-custom/_header-custom.scss`
- **Showroom legacy:** `fourty/molecules/molecule-headercustom.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
