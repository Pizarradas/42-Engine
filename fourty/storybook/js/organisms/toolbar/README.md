# Storybook · Organisms / Toolbar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`toolbar.js`](toolbar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `toolbar-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-toolbar` |
| **Señales** | `—` |
| **Módulo** | [`toolbar.js`](toolbar.js) · [`toolbar.html`](toolbar.html) |

## Qué es

Organismo del 42DS (`.ft-org-toolbar`): barra de herramientas de sección/artículo — agrupa acciones (compartir, guardar, ajustes…) en una franja. No confundir con la molécula homónima `.ft-mol-toolbar` (barra de pasatiempos).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/toolbar.css`.
- `molecules/rrss` · `atoms/btn` (piezas internas, según acciones).
- JS (acciones: compartir, guardar) solo en producción. Aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/toolbar/_toolbar.scss`
- **Showroom legacy:** `fourty/organisms/organism-toolbar.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
