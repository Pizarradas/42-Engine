# Storybook · Molecules / Toolbar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`toolbar.js`](toolbar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `toolbar` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-toolbar` |
| **Señales** | `—` |
| **Módulo** | [`toolbar.js`](toolbar.js) · [`toolbar.html`](toolbar.html) |

## Qué es

Barra de acciones de un pasatiempo: botones simples, menús desplegables y una capa con timer, con tema de juego.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- `fortty-js-dropdown-*.js` (abrir menús) + JS del timer (contar tiempo).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/toolbar/_toolbar.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
