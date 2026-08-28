# knowledge/front — Índice del dominio

## Propósito
Conocimientos de desarrollo front-end agnósticos a framework y Design System. Fuente de verdad técnica para agentes que construyen, validan o auditan implementaciones web.

---

## Archivos del dominio

| Archivo | Tema | agent_tags |
|---|---|---|
| `html-semantics.md` | HTML semántico, landmarks, estructura de documento | front, audit, 42ds |
| `css-architecture.md` | Cascade, especificidad, custom properties, BEM | front, audit, 42ds |
| `responsive-design.md` | Mobile-first, breakpoints, layouts fluidos | front, poc, 42ds |
| `performance-web.md` | Core Web Vitals, carga, rendering crítico | front, audit |
| `javascript-patterns.md` | Vanilla JS, eventos, DOM, accesibilidad programática | front, audit, 42ds |
| `component-patterns.md` | Diseño de componentes reutilizables, composición | front, ds, audit |
| `scss-patterns.md` | SCSS del 42DS: anatomía de parciales, colocación del código, mixins, variables, variantes por marca, helpers y registro en cores | front, ds, 42ds, scss |

---

## Carga recomendada por agente

| Agente | Archivos a cargar | Motivo |
|---|---|---|
| `mode-ds` (constructor de componentes) | `html-semantics`, `css-architecture`, `component-patterns`, `javascript-patterns`, `scss-patterns` | Construye SCSS y HTML de documentación |
| `mode-poc` (variante scss) | `html-semantics`, `css-architecture`, `scss-patterns` | Necesita arquitectura CSS y los patrones SCSS del repo para generar parciales correctos |
| `mode-poc` (variante lf/hf/ai/css) | — (no carga front/) | El knowledge 42DS cubre la semántica y estructura; cargar front/ sería redundante |
| Auditoría técnica | todos | Revisión completa de implementación |
| Auditoría de rendimiento | `performance-web`, `responsive-design` | Core Web Vitals y carga |

---

## Relaciones con otros dominios

| /front | /ux o /ui | Intersección |
|---|---|---|
| `html-semantics` | `ux/nielsen-heuristics` H6 | Reconocimiento: landmarks accesibles |
| `css-architecture` | `ui/refactoring-ui` | BEM + escala visual |
| `responsive-design` | `ui/platform-guidelines` | Breakpoints y adaptación plataforma |
| `javascript-patterns` | `ux/microinteractions` | ARIA dinámico y feedback programático |
| `component-patterns` | `ui/practical-ui` | Accesibilidad táctil en componentes |
