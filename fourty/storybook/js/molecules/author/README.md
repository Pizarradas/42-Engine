# Storybook · Molecules / Author

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`author.js`](author.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `author` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-author` |
| **Señales** | `—` |
| **Módulo** | [`author.js`](author.js) · [`author.html`](author.html) |

## Qué es

Ficha breve de autor con foto circular (B/N que vira a color al hover), nombre y cita destacada. Pensada para firmas dentro de noticias. No confundir con `.ft-mol-authors` (perfil ampliado).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | full-width; orientación, `--premium`, `--is-highlighted`, borde, `--is-rounded` y textos |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/author/_author.scss`
- **Showroom legacy:** `fourty/molecules/molecule-author.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
