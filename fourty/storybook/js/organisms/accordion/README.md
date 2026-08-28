# Storybook · Organisms / Accordion

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`accordion.js`](accordion.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `accordion-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-accordion` |
| **Señales** | `—` |
| **Módulo** | [`accordion.js`](accordion.js) · [`accordion.html`](accordion.html) |

## Qué es

Organismo del 42DS (`.ft-org-accordion`): apila entradas de acordeón nativo, cada una con un resumen de clasificación y un panel de datos.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Builder por `count` (1-8); usa `<details>` nativo, la 1ª abierta |

## Dependencias clave

- Solo CSS del DS; sin JS (acordeón nativo `<details>`/`<summary>`).
- Compone las moléculas `.ft-mol-accordion`, `.ft-mol-sorting--team` y `.ft-mol-lnkbox--simple`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/accordion/_accordion.scss`
- **Showroom legacy:** `fourty/organisms/organism-accordion.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
