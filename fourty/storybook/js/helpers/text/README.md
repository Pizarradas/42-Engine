# Storybook · Helpers / Text

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`text.js`](text.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `text` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-text-*` |
| **Señales** | `—` |
| **Módulo** | [`text.js`](text.js) · [`text.html`](text.html) |

## Qué es

Familia `.ft-helper-text-*` del 42DS con 3 sub-familias: alineación, transformación y ocultar texto. Algunas variantes solapan con Align, FontType y Hides; el overview lo aclara para elegir la opción más expresiva.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector sub-familia (align/transform/hide) + variante + slot |
| Align | gallery | `-align-{center,right,left}` (text-align) |
| Transform | gallery | `-transform-{uppercase,lowercase,capitalize}` |
| Hide | gallery | `-hide` · `-hide-xs` (hide--text; `-xs` solo ≤768px) |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_texts.scss`
- **Showroom legacy:** `fourty/helpers/helper-text.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
