# Storybook · Organisms / Comments

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`comments.js`](comments.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `comments` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-comments` |
| **Señales** | `—` |
| **Módulo** | [`comments.js`](comments.js) · [`comments.html`](comments.html) |

## Qué es

Organismo del 42DS (`.ft-org-comments`): hilo de comentarios completo — cabecera, formulario de envío, ordenación y lista de comentarios con respuestas.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Estado estático honesto; el JS de comentarios lo aporta el consumidor |

## Dependencias clave

- CSS de marca (`setting.css` primero) + `organism/comments.css`.
- CSS de piezas internas: `molecules/form · sorting · author`.
- JS de comentarios (enviar/votar/responder) lo gobierna el consumidor; aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/comments/_comments.scss`
- **Showroom legacy:** `fourty/organisms/organism-comments.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
