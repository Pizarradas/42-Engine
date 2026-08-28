# Storybook · Organisms / Hero Welcome

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`hero-welcome.js`](hero-welcome.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `hero-welcome` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-hero-welcome` |
| **Señales** | `—` |
| **Módulo** | [`hero-welcome.js`](hero-welcome.js) · [`hero-welcome.html`](hero-welcome.html) |

## Qué es

Cabecera de bienvenida a sección/portada: bloque hero con contenido destacado y, opcionalmente, buscador integrado (`--near-search`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Select `variant`: Base / Con buscador (`--near-search`); markup verbatim |

## Dependencias clave

- Solo CSS del DS en su forma base (`setting.css` + `organism/hero.css`); sin JS.
- La variante `--near-search` integra un buscador cuya lógica la aporta el consumidor (aquí estado estático).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/hero/_hero.scss`
- **Showroom legacy:** `fourty/organisms/organism-hero-welcome.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
