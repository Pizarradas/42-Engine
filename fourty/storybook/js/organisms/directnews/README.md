# Storybook · Organisms / Direct News

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`directnews.js`](directnews.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `directnews` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-directNews` |
| **Señales** | `—` |
| **Módulo** | [`directnews.js`](directnews.js) · [`directnews.html`](directnews.html) |

## Qué es

Organismo del 42DS (`.ft-org-directNews`): noticia en directo — cabecera con sello «en directo», apertura, cuerpo con titular/relacionadas y pie de firma; variante `--updates` para tira de actualizaciones.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Select de variante: base · Updates (`--updates`, incl. `--is-highlighted`) |

## Dependencias clave

- CSS de marca (`setting.css` primero) + `organism/directnews.css`.
- CSS de piezas internas: `molecules/label · writer · figcaption`.
- JS de directo (auto-refresco) en producción; aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/directNews/_directNews.scss`
- **Showroom legacy:** `fourty/organisms/organism-directNews.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
