# Storybook · Setup / Charset

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`charset.js`](charset.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `charset` |
| **Grupo** | Setup |
| **Clase / patrón** | `—` |
| **Señales** | `—` |
| **Módulo** | [`charset.js`](charset.js) · [`charset.html`](charset.html) |

## Qué es

Inspector visual del set de glifos disponibles en la tipografía de la marca activa. No hay parcial SCSS específico: lo que se renderiza depende del `<meta charset="UTF-8">` del documento y de las fuentes que la marca carga en `setting.css`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de categoría de glifos + tamaño |
| Tabla de auditoría (32-255) | gallery | Matriz codepoints ASCII + Latin-1, 4 columnas |
| Alfabeto mayúsculas / minúsculas | gallery | Galería por categoría a tamaño grande |
| Números · Puntuación · Acentos / diacríticos | gallery | Galería por categoría a tamaño grande |
| Símbolos comunes · Matemáticos · Moneda | gallery | Galería por categoría a tamaño grande |
| Pangrama (texto real) | gallery | Composición de párrafo en flujo natural |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. Requiere `<meta charset="UTF-8">` y las fuentes (woff2) cargadas por `setting.css`.

## Trazabilidad

- **SCSS (SSOT):** `—` (sin parcial SCSS; glifos del DS + `setting.css` de cada marca)
- **Showroom legacy:** `fourty/base/base-charset.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
