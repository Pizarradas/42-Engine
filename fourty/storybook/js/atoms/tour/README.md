# Storybook · Atoms / Tour

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tour.js`](tour.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tour` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-tour__message` |
| **Señales** | `—` |
| **Módulo** | [`tour.js`](tour.js) · [`tour.html`](tour.html) |

## Qué es

Átomo de onboarding / tour guiado (`.ft-tour`): marca elementos con atributos `data-tour-*`; el JS genera un overlay oscuro a pantalla completa y una tarjeta de mensaje paso a paso.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `bottom`, `title`, `text` |
| Posición del pico | gallery | top · bottom |

**Subgrupos:** `Galleries`.

## Dependencias clave

- JS-driven: JavaScript obligatorio que lee `data-tour-*` y construye overlay (`.ft-tour__dark`, fixed) + tarjeta (`.ft-tour__message`).
- Favicon de la tarjeta es el logo SVG de la marca en `/cds-statics/…/logos/` (cambia con el Brand, requiere servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/tour/_tour.scss`
- **Showroom legacy:** `fourty/atoms/atom-tour.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
