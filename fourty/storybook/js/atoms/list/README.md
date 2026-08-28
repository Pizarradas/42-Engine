# Storybook · Atoms / List

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`list.js`](list.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `list` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-list` |
| **Señales** | `—` |
| **Módulo** | [`list.js`](list.js) · [`list.html`](list.html) |

## Qué es

Átomo de lista (`.ft-list`): un `<ul>`/`<ol>` con `__item` y `__link`. Familias textuales (bullet, inline, chevron, numerada, path) y familias compuestas de layout más ricas.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `variant`, `count` |
| Familias textuales | gallery | 7 variantes |
| Has icon | interactive | Controls: `count` |
| Numbered Big | interactive | Controls: `count` |
| Photoinfo | interactive | Controls: `count`, `reverse` |
| Counter | interactive | Controls: `count` |
| Functions · thumbnail | interactive | Controls: `count` |
| Functions · icon-and-txt | interactive | Controls: `count` |
| Box | interactive | Controls: `count`, `tight` |
| Block | interactive | Controls: `count`, `col` |
| Gridded | interactive | Controls: `count` |
| Add | interactive | Controls: `count` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/list.css`.
- JS solo en `--add` (alta/baja de filas con estado).
- Bullets `--primary` y chevrones `--chevron` son `background-image` con ruta absoluta `/cds-statics/…` (requieren servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/list/_list.scss`
- **Showroom legacy:** `fourty/atoms/atom-list.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
