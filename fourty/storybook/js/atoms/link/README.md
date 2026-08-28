# Storybook · Atoms / Link

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`link.js`](link.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `link` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-link` |
| **Señales** | `—` |
| **Módulo** | [`link.js`](link.js) · [`link.html`](link.html) |

## Qué es

Átomo de enlace de texto (`.ft-link`): color `var(--color-primary)` por defecto, con jerarquías (`--secondary`, `--tertiary`), subrayado punteado (`--decoration`) y dos familias con icono: `--hasIcon` y `--nav`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `kind`, `decoration`, `label` |
| HasIcon | interactive | Controls: `icon`, `label` |
| Nav | interactive | Controls: `direction`, `label` |
| Kinds | gallery | 3 jerarquías |
| Decoration | gallery | punteado por kind |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- Iconos de `--hasIcon` y `--nav` son `background-image`/`mask` con ruta absoluta `/cds-statics/…` (requieren servidor); el color del chevron se resuelve por marca.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/link/_link.scss`
- **Showroom legacy:** `fourty/atoms/atom-link.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
