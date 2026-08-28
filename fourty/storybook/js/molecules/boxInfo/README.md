# Storybook · Molecules / Box Info

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`boxInfo.js`](boxInfo.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `boxinfo` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-boxInfo` |
| **Señales** | `—` |
| **Módulo** | [`boxInfo.js`](boxInfo.js) · [`boxInfo.html`](boxInfo.html) |

## Qué es

Caja informativa con borde, barra decorativa superior, imagen opcional, texto y CTA. Tiene varios acabados temáticos (centrado, texto enriquecido, erratum, aviso, categoría, ranking, inline).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone átomos del DS (`.ft-text`, `.ft-img`, `.ft-btn`); sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/boxInfo/_boxInfo.scss`
- **Showroom legacy:** `fourty/molecules/molecule-boxInfo.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
