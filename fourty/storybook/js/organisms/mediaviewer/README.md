# Storybook · Organisms / Mediaviewer

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`mediaviewer.js`](mediaviewer.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `mediaviewer` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-mediaviewer` |
| **Señales** | `—` |
| **Módulo** | [`mediaviewer.js`](mediaviewer.js) · [`mediaviewer.html`](mediaviewer.html) |

## Qué es

Visor de medios a pantalla: imagen/galería principal con su pie y controles, pensado para abrir contenido multimedia.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim; se fuerza `.is-open` para verlo |

## Dependencias clave

- `setting.css` + `organism/mediaviewer.css` (siempre); CSS de `molecules/figcaption · gallery` según contenido.
- Overlay oculto (`visibility:hidden`) que se revela con `.is-open` (clase real del SCSS).
- JS de navegación/zoom lo aporta el consumidor; el reproductor (jwplayer) es externo (aquí estático).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/mediaviewer/_mediaviewer.scss`
- **Showroom legacy:** `fourty/organisms/organism-mediaviewer.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
