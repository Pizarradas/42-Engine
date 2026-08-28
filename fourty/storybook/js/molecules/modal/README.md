# Storybook · Molecules / Modal

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`modal.js`](modal.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `modal` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-modal` |
| **Señales** | `js` |
| **Módulo** | [`modal.js`](modal.js) · [`modal.html`](modal.html) |

## Qué es

Ventana modal (`role="dialog"`) con cabecera, cuerpo y pie. Soporta posiciones, tamaños, modos a pantalla completa, imagen de cabecera y estados de feedback (error/info/ok/warning).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base (abierto) | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- JavaScript requerido: `fourty-js-modal.js` para abrir/cerrar y gestión de foco.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/modal/_modal.scss`
- **Showroom legacy:** `fourty/molecules/molecule-modal.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
