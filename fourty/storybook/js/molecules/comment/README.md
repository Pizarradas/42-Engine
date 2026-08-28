# Storybook · Molecules / Comment

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`comment.js`](comment.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `comment` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-comment` |
| **Señales** | `—` |
| **Módulo** | [`comment.js`](comment.js) · [`comment.html`](comment.html) |

## Qué es

Comentario de usuario en tres columnas: autor (compone `.ft-mol-writer` + `.ft-date`), número y contenido + acciones. Soporta hilos de respuesta.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone `.ft-mol-writer`, `.ft-date`, `.ft-list-block`, `.ft-link`.
- Responder/votar necesita JS del consumidor.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/comment/_comment.scss`
- **Showroom legacy:** `fourty/molecules/molecule-comment.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
