# Storybook · Organisms / Boxfeatures

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`boxfeatures.js`](boxfeatures.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `boxfeatures` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-boxfeatures` |
| **Señales** | `—` |
| **Módulo** | [`boxfeatures.js`](boxfeatures.js) · [`boxfeatures.html`](boxfeatures.html) |

## Qué es

Organismo del 42DS (`.ft-org-boxfeatures`): comparativa de funciones en bloques (`__item`) que alternan fondo (par/impar) automáticamente vía `:nth-child`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Builder por `count` (1-6) repitiendo la unidad verbatim |

## Dependencias clave

- CSS del organismo + piezas internas `.ft-list-functions` (atom list) y `.ft-mol-dropdown`.
- JS de dropdown solo si se usan los menús (en la story van cerrados).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/boxfeatures/_boxfeatures.scss`
- **Showroom legacy:** `fourty/organisms/organism-boxfeatures.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
