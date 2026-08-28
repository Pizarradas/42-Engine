# Storybook · Atoms / Switch

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`switch.js`](switch.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `switch` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-switch` |
| **Señales** | `—` |
| **Módulo** | [`switch.js`](switch.js) · [`switch.html`](switch.html) |

## Qué es

Átomo de interruptor (`.ft-switch`): un `<input type="checkbox">` oculto + un `<label>` con carril (`__inner`) y perilla (`__switch`). Al activar, el carril pasa a verde y la perilla se desliza.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `variant`, `checked`, `disabled` |
| Variantes | gallery | base · darkmode · has-text |
| Estados | gallery | off · on · disabled |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/switch.css`.
- Solo CSS del DS; sin JS (toggle nativo del `<input>`).
- Iconos de la perilla y de `--darkmode` (sol/luna) son `background-image` con ruta absoluta `/cds-statics/…` (requieren servidor); `--has-text` usa `content` CSS y funciona siempre.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/switch/_switch.scss`
- **Showroom legacy:** `fourty/atoms/atom-switch.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
