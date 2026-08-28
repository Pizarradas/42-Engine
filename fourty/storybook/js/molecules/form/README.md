# Storybook · Molecules / Form

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`form.js`](form.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `form` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-form` |
| **Señales** | `js` |
| **Módulo** | [`form.js`](form.js) · [`form.html`](form.html) |

## Qué es

Campo de formulario (`input` o `select`) con label flotante (`:placeholder-shown`/`:focus`), texto de soporte con contador y estados de validación.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- **Label flotante = CSS + contrato de markup.** Sube con `:focus` o `:not(:placeholder-shown)`, así que el input **debe traer el atributo `placeholder`**: `placeholder="&nbsp;"` (U+00A0) es el valor canónico. **Sin el atributo, el label sale levantado de origen en los tres motores** (medido con Playwright; la teoría inicial de que era cosa de WebKit y del espacio quedó refutada). Con `--has-label`, carga `cds-statics/js/form/fourty-js-form-floating-label.js`, que sanea el placeholder. En Vue/React **no** se carga: el criterio va en el binding (`placeholder || ' '`) — ver `cds-statics/js/form/README.md`.
- **Predictivo** (`--has-predictive`): `FTUtils` + engine → renderer → mobile-sheet → controller, en ese orden. Mapa completo en `cds-statics/js/form/README.md`.
- Variables de marca (`--color-form`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/form/_form.scss`
- **Showroom legacy:** `fourty/molecules/molecule-form.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
