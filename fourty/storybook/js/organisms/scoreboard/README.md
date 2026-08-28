# Storybook · Organisms / Scoreboard

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`scoreboard.js`](scoreboard.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `scoreboard-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-scoreboard` |
| **Señales** | `—` |
| **Módulo** | [`scoreboard.js`](scoreboard.js) · [`scoreboard.html`](scoreboard.html) |

## Qué es

Organismo del 42DS (`.ft-org-scoreboard`): marcador amplio de partido — escudos, nombres, resultado y estado, pensado como sección destacada. No confundir con la molécula homónima `.ft-mol-scoreboard`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/scoreboard.css`.
- Escudos de equipo (assets) los aporta el medio deportivo.
- JS (feed en directo) solo en producción. Aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/scoreboard/_scoreboard.scss`
- **Showroom legacy:** `fourty/organisms/organism-scoreboard.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
