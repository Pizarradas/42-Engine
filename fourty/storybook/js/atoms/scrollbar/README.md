# Storybook · Atoms / Scrollbar

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`scrollbar.js`](scrollbar.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `scrollbar` |
| **Grupo** | Atoms |
| **Clase raíz** | `[data-scrollbar]` |
| **Señales** | `js` |
| **Módulo** | [`scrollbar.js`](scrollbar.js) · [`scrollbar.html`](scrollbar.html) |

## Qué es

Átomo de barra de desplazamiento personalizada: el atributo `[data-scrollbar]` sobre un contenedor con overflow. El skin (carril + thumb) lo genera la librería smooth-scrollbar y el SCSS lo tematiza.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Sin Controls; muestra `[data-scrollbar]` con scroll horizontal nativo |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/scrollbar.css`.
- `smooth-scrollbar-library.js` + `-functions.js`: JavaScript obligatorio para el skin (inyecta `.scrollbar-track`/`.scrollbar-thumb`). El storybook es zero-toolchain y no la carga.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/scrollbar/_scrollbar.scss`
- **Showroom legacy:** `fourty/atoms/atom-scrollbar.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
