# Storybook · Organisms / Header Revistas (Woman)

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`header-revistas-woman.js`](header-revistas-woman.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `header-revistas-woman` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-header-revistas` |
| **Señales** | `—` |
| **Módulo** | [`header-revistas-woman.js`](header-revistas-woman.js) · [`header-revistas-woman.html`](header-revistas-woman.html) |

## Qué es

Organismo del 42DS (`.ft-org-header-revistas`): cabecera de las revistas del grupo (caso Woman) — tira de «temas del día», logo central, menú principal y zona de usuario.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Sin controles; `<header>` verbatim (variante woman). CSS de marca propio inyectado vía `assets` |

## Dependencias clave

- CSS de marca (`setting.css` primero) + `organism/header-revistas.css`. El CSS no está en el bundle `ux` por defecto: el motor inyecta `brands/revistas/organism/header-revistas-woman.css` vía `assets`.
- JS (menú, usuario, breaking news) en producción; aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/header-revistas/_header-revistas.scss`
- **Showroom legacy:** `fourty/organisms/organism-header-revistas-woman.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
