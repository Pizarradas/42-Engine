# Storybook · Atoms / Check

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`check.js`](check.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `check` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-check` |
| **Señales** | `—` |
| **Módulo** | [`check.js`](check.js) · [`check.html`](check.html) |

## Qué es

Átomo de formulario (`.ft-check`): checkbox custom que oculta el `<input>` nativo y dibuja la caja (`:before`) y el tick (`:after`) sobre el `<label>`. Sin modificadores: sus variantes son estados del input (checked, disabled).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `label`, `checked`, `disabled`, `onDark` |
| Estados | gallery | 4 estados |
| Sobre fondo oscuro | gallery | behavior on-dark |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. (el toggle es nativo del `<input>`)
- El tick (`:after`) es un `background-image` con ruta absoluta `/cds-statics/…` (requiere servidor); la caja es CSS puro.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/check/_check.scss`
- **Showroom legacy:** `fourty/atoms/atom-check.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
