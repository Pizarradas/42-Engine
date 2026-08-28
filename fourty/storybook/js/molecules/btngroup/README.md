# Storybook · Molecules / Btn Group

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`btngroup.js`](btngroup.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `btngroup` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-btnGroup` |
| **Señales** | `—` |
| **Módulo** | [`btngroup.js`](btngroup.js) · [`btngroup.html`](btngroup.html) |

## Qué es

Contenedor que agrupa varios botones `.ft-btn` con una alineación común y una variante scrollable autosuficiente para hileras que desbordan.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |
| Scrollable | interactive | hilera con scroll horizontal |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone el átomo Btn (`.ft-btn`); sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/btngroup/_btnGroup.scss`
- **Showroom legacy:** `fourty/__old-showroom/molecules/molecule-btnGroup.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
