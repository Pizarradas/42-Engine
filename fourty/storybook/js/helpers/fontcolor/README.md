# Storybook · Helpers / Font Color

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`fontcolor.js`](fontcolor.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `fontcolor` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-fontColor-*` |
| **Señales** | `—` |
| **Módulo** | [`fontcolor.js`](fontcolor.js) · [`fontcolor.html`](fontcolor.html) |

## Qué es

Familia `.ft-helper-fontColor-*` del 42DS: aplica un color del DS al texto (neutros, brand 1..7, greys y tokens set-brand). Las clases brand y grey conmutan a blanco automáticamente cuando viven bajo `.ft-helper-bgColor-black`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector único de color + flag fondo oscuro + slot |
| Brand | gallery | Tokens brand sobre fondo claro y oscuro |
| Neutrales + greys | gallery | Neutros y greys en claro/oscuro |
| Background tokens (set-brand) | gallery | Solo activos si la marca los inyecta |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_fonts.scss`
- **Showroom legacy:** `fourty/helpers/helper-fontcolor.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
