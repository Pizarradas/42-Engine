# Storybook · Helpers / Affix

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`affix.js`](affix.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `affix` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-affix` · `.ft-helper-sticky-stack` |
| **Señales** | `js` |
| **Módulo** | [`affix.js`](affix.js) · [`affix.html`](affix.html) |

## Qué es

Familia que fija un nodo directamente con `position: fixed` (`.ft-helper-affix`) y espeja piezas en una shell sticky superior controlada por runtime (`.ft-helper-sticky-stack`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle affix on/off + esquina de anclaje |
| Affix vs position-fixed | gallery | Comparativa semántica |
| Base (Sticky Stack) | interactive | Demo con runtime sticky-stack |

**Subgrupos:** `Galleries`, `Sticky Stack`.

## Dependencias clave

- CSS del DS (`setting.css` + core/parcial).
- JS runtime `cds-statics/js/sticky-stack/fourty-js-sticky-stack.js` solo para `.ft-helper-sticky-stack`.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_affixes.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
