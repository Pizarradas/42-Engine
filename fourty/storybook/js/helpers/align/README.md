# Storybook · Helpers / Align

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`align.js`](align.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `align` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-align-*` |
| **Señales** | `—` |
| **Módulo** | [`align.js`](align.js) · [`align.html`](align.html) |

## Qué es

Tres clases que combinan `text-align` y `justify-content` en una sola, funcionando tanto en bloques de texto como en contenedores flex sin tener que pensar qué propiedad aplica.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector align + toggle contexto (texto/flex) |
| Matriz align × contexto | gallery | 3×2 |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_align.scss`
- **Showroom legacy:** `fourty/helpers/helper-align.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
