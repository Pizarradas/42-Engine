# Storybook · Molecules / Authors

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`authors.js`](authors.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `authors-mol` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-authors` |
| **Señales** | `—` |
| **Módulo** | [`authors.js`](authors.js) · [`authors.html`](authors.html) |

## Qué es

Ficha de perfil ampliada del autor: foto, nombre, categoría, redes, temas y biografía. Compone varios átomos/moléculas del DS. No confundir con `.ft-mol-author` (firma compacta) ni con el organism Authors.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | full-width; orientación, `--reduced`, superficie, `--premium` y textos |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone `.ft-mol-rrss`, `.ft-mol-tagsNews`, `.ft-tag` y `.ft-link`.
- Sin JS (salvo `.ft-readMore` nativo si se usa).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/authors/_authors.scss`
- **Showroom legacy:** `fourty/molecules/molecule-authors.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
