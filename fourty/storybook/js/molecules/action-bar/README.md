# Storybook · Molecules / Action Bar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`action-bar.js`](action-bar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `action-bar` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-action-bar` |
| **Señales** | `js` |
| **Módulo** | [`action-bar.js`](action-bar.js) · [`action-bar.html`](action-bar.html) |

## Qué es

Barra de acciones flotante en píldora con contador (`__badge`), botón de revisión y un CTA. Pensada para selecciones múltiples (p.ej. localidades).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | el control `count` reproduce los estados del badge de forma estática (sin el controller) |

**Subgrupos:** `Markup`.

## Dependencias clave

- Componente JS-driven: controller `FTMolActionBar` + GSAP + autoinit por `[data-action-bar-auto]` para contador dinámico (`.update()`) y animaciones.
- El storybook es zero-toolchain y no carga ese JS; reproduce los estados estáticamente.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/action-bar/_action-bar.scss`
- **Showroom legacy:** `fourty/molecules/molecule-action-bar.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
