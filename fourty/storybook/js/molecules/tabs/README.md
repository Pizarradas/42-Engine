# Storybook · Molecules / Tabs

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tabs.js`](tabs.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tabs` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-tabs` |
| **Señales** | `—` |
| **Módulo** | [`tabs.js`](tabs.js) · [`tabs.html`](tabs.html) |

## Qué es

Pestañas de navegación de contenido: lista de tabs, barra animada y paneles.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- JavaScript del consumidor — cambio de pestaña + barra (interacción real).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/tabs/_tabs.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
