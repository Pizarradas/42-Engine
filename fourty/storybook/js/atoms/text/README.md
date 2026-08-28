# Storybook · Atoms / Text

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`text.js`](text.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `text` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-text` |
| **Señales** | `—` |
| **Módulo** | [`text.js`](text.js) · [`text.html`](text.html) |

## Qué es

Átomo de texto de cuerpo (`.ft-text`): párrafo con modificadores tipográficos, un destacado inline (`__mark`) y la familia de avisos `.ft-text-alert`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `variant`, `text` |
| Mark | interactive | Controls: `grey`, `tooltip` |
| Alert | interactive | Controls: `type`, `bordered`, `text`, `subtext` |
| Modificadores | gallery | 5 variantes |
| Avisos | gallery | 5 tipos |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS (el tooltip de `__mark` es CSS por `data-tooltip`).
- Iconos de `.ft-text-alert--is-[...]` son `background-image` con ruta absoluta `/cds-statics/…` (requieren servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/text/_text.scss`
- **Showroom legacy:** `fourty/atoms/atom-text.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
