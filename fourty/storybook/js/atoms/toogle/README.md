# Storybook · Atoms / Toogle

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`toogle.js`](toogle.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `toogle` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-toogle` (typo histórico, no «toggle») |
| **Señales** | `—` |
| **Módulo** | [`toogle.js`](toogle.js) · [`toogle.html`](toogle.html) |

## Qué es

Átomo de control segmentado (`.ft-toogle`): un grupo de radios para elegir apariencia (claro / oscuro / por sistema). La opción marcada pinta su botón en `var(--color-primary)`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `checked` |
| Marcado | gallery | cada opción |

**Subgrupos:** `Galleries`.

## Dependencias clave

- JS para aplicar el tema elegido (lo aporta el proyecto); el dark mode real del DS se aplica con `[data-theme="dark"]` en `<html>`.
- Iconos `iconLight`/`iconDark`/`iconSystem` son `background-image` con ruta absoluta `/cds-statics/…` (requieren servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/toogle/_toogle.scss`
- **Showroom legacy:** `fourty/atoms/atom-toogle.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
