# Storybook · Organisms / Header Custom

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`header-custom.js`](header-custom.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `header-custom-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-header-custom` |
| **Señales** | `—` |
| **Módulo** | [`header-custom.js`](header-custom.js) · [`header-custom.html`](header-custom.html) |

## Qué es

Organismo del 42DS (`.ft-org-header-custom`): cabecera/portadilla ilustrada de sección — bloque editorial con título, destacado e imagen. No confundir con la molécula homónima `.ft-mol-header-custom`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Sin controles; markup verbatim (título + destacado + imagen) |

## Dependencias clave

- Solo CSS del DS; sin JS. CSS de marca (`setting.css` primero) + `organism/header-custom.css`.
- Ilustración / imagen la aporta el consumidor (asset).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/header-custom/_header-custom.scss`
- **Showroom legacy:** `fourty/organisms/organism-header-custom.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
