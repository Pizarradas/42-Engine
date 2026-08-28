# Storybook · Setup / Reset

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`reset.js`](reset.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `reset` |
| **Grupo** | Setup |
| **Clase / patrón** | `—` (tags HTML desnudos, sin `class`) |
| **Señales** | `—` |
| **Módulo** | [`reset.js`](reset.js) · [`reset.html`](reset.html) |

## Qué es

Documenta cómo se ven los tags HTML desnudos (sin `class`) tras aplicar el reset del DS (`resets-global` + `resets-custom`). Es el comportamiento por defecto de todo elemento dentro del 42DS.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de familia de tags |
| Titulares / Texto / Listas / Enlaces / Formularios / Tablas / Misc | gallery | Una galería por familia (autogeneradas) |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. La tipografía varía con la marca activa (Brand del toolbar).

## Trazabilidad

- **SCSS (SSOT):** `scss/base/_reset.scss`
- **Showroom legacy:** `fourty/base/base-reset.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
