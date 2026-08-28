# Storybook · Helpers / Position

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`position.js`](position.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `position` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-position-*` |
| **Señales** | `—` |
| **Módulo** | [`position.js`](position.js) · [`position.html`](position.html) |

## Qué es

Familia `.ft-helper-position-*` del 42DS: 4 clases para fijar el `position` sin escribir CSS inline. `sticky` incluye además `top:0` y `z-index 9999` precableados, más un behavior-parent para cabeceras anidadas.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de tipo: relative · absolute · fixed · sticky |
| Todas las positions | gallery | Demos navegables de las 4 clases |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_position.scss`
- **Showroom legacy:** `—`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
