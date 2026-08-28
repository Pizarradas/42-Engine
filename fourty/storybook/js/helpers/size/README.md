# Storybook · Helpers / Size

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`size.js`](size.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `size` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-size-h-*` |
| **Señales** | `—` |
| **Módulo** | [`size.js`](size.js) · [`size.html`](size.html) |

## Qué es

Familia `.ft-helper-size-h-*` del 42DS: 2 clases para fijar el alto del bloque al 50% o 100% del viewport. Mobile-first (`min-height` en <1024px, `height` exacto en ≥1024px) y usa `dvh` si el navegador lo soporta.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector `-h-50` / `-h-100` + slot |
| 50% vs 100% (comparativa) | gallery | Comparativa de ambas clases + nota `vh` vs `dvh` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_size.scss`
- **Showroom legacy:** `fourty/helpers/helper-size.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
