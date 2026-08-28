# Storybook · Atoms / Tooltip

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tooltip.js`](tooltip.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tooltip` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-tooltip` |
| **Señales** | `—` |
| **Módulo** | [`tooltip.js`](tooltip.js) · [`tooltip.html`](tooltip.html) |

## Qué es

Átomo de tooltip / popover (`.ft-tooltip`), sin JS: un tooltip de hover sobre `[data-tooltip]` con dirección, y un popover por checkbox (`--advice`) con título, texto y cierre.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `direction`, `dark`, `text`, `tip` |
| Popover | interactive | Controls: `direction`, `open`, `dark`, `title`, `txt` |
| Direcciones | gallery | 4 direcciones |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS (hover CSS · popover por checkbox).
- Icono de `.ft-tooltip__close` es `background-image` con ruta absoluta `/cds-statics/…` (requiere servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/tooltip/_tooltip.scss`
- **Showroom legacy:** `fourty/atoms/atom-tooltip.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
