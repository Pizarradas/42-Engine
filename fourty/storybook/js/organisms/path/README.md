# Storybook · Organisms / Path

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`path.js`](path.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `path-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-path` |
| **Señales** | `—` |
| **Módulo** | [`path.js`](path.js) · [`path.html`](path.html) |

## Qué es

Carril de navegación contextual de sección: miga, niveles y enlaces de apoyo en un riel desplazable. No confundir con la molécula homónima `.ft-mol-path`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim; riel con scroll nativo en el storybook |

## Dependencias clave

- `setting.css` + `organism/path.css` (siempre).
- `vendors/smooth-scrollbar` para el riel desktop en producción; aquí overflow nativo.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/path/_path.scss`
- **Showroom legacy:** `fourty/organisms/organism-path.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
