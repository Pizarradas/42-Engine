# Storybook · Organisms / Newsletter

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`newsletter.js`](newsletter.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `newsletter` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-newsletter` |
| **Señales** | `—` |
| **Módulo** | [`newsletter.js`](newsletter.js) · [`newsletter.html`](newsletter.html) |

## Qué es

Bloque de alta a boletín: reclamo, descripción y formulario de suscripción por email.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim; formulario en estado por defecto |

## Dependencias clave

- `setting.css` + `organism/newsletter.css` + `molecules/form` (siempre).
- El alta (validación + envío) la gobierna el JS del consumidor; aquí estado estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/newsletter/_newsletter.scss`
- **Showroom legacy:** `fourty/organisms/organism-newsletter.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
