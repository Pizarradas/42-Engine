# Fourties – Componentes Atomic Design

Componentes del Design System organizados por Atomic Design: atoms, molecules, organisms.

## Estructura

```
fourties/
├── atoms/                 # Componentes básicos
│   ├── btn/
│   │   └── _btn.scss
│   ├── switch/
│   │   └── _switch.scss
│   ├── tag/
│   │   └── _tag.scss
│   └── ...
├── molecules/             # Componentes compuestos
│   ├── tabs/
│   │   ├── _tabs.scss
│   │   └── (variantes por marca)
│   ├── divider/
│   │   ├── _divider.scss
│   │   ├── divider-ep.scss
│   │   ├── divider-sport.scss
│   │   └── ...
│   └── ...
├── organism/              # Bloques complejos (singular)
│   ├── masthead/
│   ├── cardhome/
│   ├── mediaviewer/
│   │   ├── _mediaviewer.scss
│   │   ├── mediaviewer-ep.scss
│   │   └── ...
│   └── ...
├── _amp-btn.scss          # Componentes AMP (prefijo amp-)
├── amp-ad.scss
└── ...
```

## Convención de archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Componente base | `[nombre]/_[nombre].scss` | `switch/_switch.scss` |
| Variante por marca | `[nombre]/[nombre]-[marca].scss` | `divider/divider-sport.scss` |
| AMP | `amp-[nombre].scss` o `amp-[tipo]/` | `_amp-btn.scss` |

## Imports al inicio de cada componente

```scss
// ABSTRACTS
// ================================================
@import "../../../abstracts/abstracts.scss";
@import "../../../vendors/bourbon/bourbon";
// ================================================

// .ft-switch (o .ft-mol-tabs, etc.)
// ===============================================
```

## Prefijos de clase

| Nivel | Prefijo | Ejemplo |
|-------|---------|---------|
| Atom | `ft-` | `.ft-btn`, `.ft-switch` |
| Molecule | `ft-mol-` | `.ft-mol-tabs`, `.ft-mol-card` |
| Organism | `ft-org-` | `.ft-org-masthead`, `.ft-org-cardHome` |

## Guía de decisión: ¿qué nivel uso? (caso de uso)

Antes de crear o elegir un componente, decide el nivel correcto:

| Si necesitas… | Nivel | Pregunta clave | Ejemplos |
|---------------|-------|----------------|----------|
| Una pieza indivisible que no contiene otros componentes del DS | **Atom** | ¿Tiene sentido por sí sola y no se compone de otras piezas `ft-`? | botón, etiqueta, imagen, enlace, input |
| Combinar varios atoms en una unidad funcional reutilizable | **Molecule** | ¿Es un grupo de atoms que funciona como una sola unidad? | card (img + título + tag), formulario, tabs, dropdown |
| Una sección completa de página formada por molecules y atoms | **Organism** | ¿Es un bloque autónomo y reconocible de la página? | masthead, footer, hero, bloque de comentarios |

**Reglas de oro**:
1. **Reusar antes de crear**: busca en los inventarios (`atoms/`, `molecules/`, `organism/` README) si ya existe algo equivalente.
2. **No reimplementar hijos**: una molecule no recrea estilos de sus atoms; un organism no recrea estilos de sus molecules. Compón, no dupliques.
3. **Sube de nivel solo si hace falta**: si un atom empieza a contener otros componentes `ft-`, probablemente debería ser una molecule.
4. **Variante vs componente nuevo**: si la diferencia es visual y por marca, usa `[componente]-[marca].scss` o `behavior-brand()`; crea un componente nuevo solo si la estructura/semántica cambia.

## Variantes por marca

Cuando un componente difiere por marca:
1. Crear `_componente.scss` con estilos base
2. Crear `componente-[marca].scss` para cada marca
3. Importar ambos en el core de la marca correspondiente

## AMP

Componentes con prefijo `amp-` son versiones simplificadas para AMP. Se importan en `amp-*-index.scss`.

## Reglas para IA

1. **Siempre** importar abstracts y Bourbon al inicio
2. **BEM**: Usar `&__elemento` y `&--modificador` para anidamiento
3. **Variables CSS**: `var(--color-primary)`, `var(--font-stack)`
4. **Paths**: `#{$images-path}/icons/icon.svg`
5. **Variantes**: Crear archivo `[componente]-[marca].scss` si el componente cambia por marca
6. **Organism** (singular): La carpeta se llama `organism`, no `organisms`
