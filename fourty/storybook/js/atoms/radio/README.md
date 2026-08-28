# Storybook · Atoms / Radio

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`radio.js`](radio.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `radio` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-radio` |
| **Señales** | `—` |
| **Módulo** | [`radio.js`](radio.js) · [`radio.html`](radio.html) |

## Qué es

Átomo de formulario (`.ft-radio`): un radio button custom que oculta el `<input type="radio">` nativo y dibuja el círculo en el `<label>` con `:before`. Sin modificadores: sus variantes son los estados del input.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `label`, `checked`, `disabled`, `onDark` |
| Estados | gallery | 4 estados |
| Sobre fondo oscuro | gallery | behavior on-dark |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/radio.css`.
- Solo CSS del DS; sin JS (el toggle es nativo del `<input>`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/radio/_radio.scss`
- **Showroom legacy:** `fourty/atoms/atom-radio.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
