# Storybook · Molecules / Label

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`label.js`](label.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `label` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-label` |
| **Señales** | `—` |
| **Módulo** | [`label.js`](label.js) · [`label.html`](label.html) |

## Qué es

Etiqueta de sección en cápsula redondeada: icono + título. Usada como marca de área editorial (p.ej. «Confidencial Sport»).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS (la animación `--advice` es CSS pura).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/label/_label.scss`
- **Showroom legacy:** `fourty/molecules/molecule-label.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
