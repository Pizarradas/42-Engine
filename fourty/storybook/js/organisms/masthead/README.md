# Storybook · Organisms / Masthead

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`masthead.js`](masthead.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `masthead` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-masthead` (root `--branded`) |
| **Señales** | `js` |
| **Módulo** | [`masthead.js`](masthead.js) · [`masthead.html`](masthead.html) |

## Qué es

La cabecera de marca del 42DS (`.ft-org-masthead`, root `--branded`): logo del medio, fecha, RRSS, accesos de usuario, sticky, menú lateral y estados de sesión. Es el organismo más sensible a la Cabecera (CSV) y actúa como shell de página.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| App | page | Shell app con sidenav, switches; control `minimal`; `brandable` |
| Externo | page | Caso externo base; control `minimal`; `brandable` |
| Logueado | page | Sesión activa; control `minimal`; `brandable` |
| Login | page | Accesos de entrada; control `minimal`; `brandable` |
| Tajo-Salor | page | Rama regional `el-periodico-extremadura.cronicadeltajosalor`; `brandable` |

**Subgrupos:** `Markup`.

## Dependencias clave

- `js/headers/masthead.js` — apertura/cierre del menú lateral y cabecera fija al scroll.
- `js/sidenav/fourty-js-sidenav-default.js` (panel `--side`) + `js/modal/fourty-js-popover.js` (dropdowns).
- `setting.css` + `ux-index.css` (o core) — variables de marca y layout del header.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/masthead/_masthead.scss`
- **Showroom legacy:** `—`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
