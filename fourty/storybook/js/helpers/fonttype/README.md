# Storybook · Helpers / Font Type

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`fonttype.js`](fonttype.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `fonttype` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-fontType--*` |
| **Señales** | `—` |
| **Módulo** | [`fonttype.js`](fonttype.js) · [`fonttype.html`](fonttype.html) |

## Qué es

Familia `.ft-helper-fontType--*` del 42DS: modificadores de forma/estilo del texto (italic, balance, underline, uppercase). Nomenclatura con doble guion porque son flags semánticos apilables, no una escala.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de tipo + tamaño + slot |
| Modificadores | gallery | Los 4 modificadores con un mismo texto |
| Combinaciones | gallery | Apilados (italic+underline, etc.) |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_fonts.scss`
- **Showroom legacy:** `fourty/helpers/helper-fontType.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
