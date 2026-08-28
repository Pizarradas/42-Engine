# Storybook · Atoms / Trust

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`trust.js`](trust.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `trust` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-trust` |
| **Señales** | `—` |
| **Módulo** | [`trust.js`](trust.js) · [`trust.html`](trust.html) |

## Qué es

Átomo de confianza (`.ft-trust`): la fila «por qué confiar en…» con un logo, un texto y un enlace que cubre toda el área (`.ft-link--block`). Enlaza a la política de confianza del medio.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `align`, `text`, `moreText` |
| Alineaciones | gallery | base · center · right |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- El logo (`logo-trust.svg`) se sirve desde `/cds-statics/…` (requiere servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/trust/_trust.scss`
- **Showroom legacy:** `fourty/atoms/atom-trust.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
