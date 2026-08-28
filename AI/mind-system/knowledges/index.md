# knowledge/ — Índice global

## Propósito
Sistema de conocimiento para agentes de diseño y desarrollo de producto digital.

Cada agente carga únicamente los módulos relevantes para su tarea. Ni más, ni menos.

---

## Estructura del sistema

```
knowledge/
  ux/        → Usabilidad, flujos, copy, psicología, métricas          (agnóstico)
  ui/        → Visual, color, tipografía, motion, plataforma, imágenes (agnóstico)
  front/     → HTML, CSS, JS, rendimiento, componentes                 (agnóstico)
  storybook/ → Stories, docs y testing de componentes en aislamiento   (agnóstico · on-demand)
  42ds/      → Arquitectura y patrones del Design System 42DS          (específico)
```

---

## Dominios

### /ux — 10 módulos
Conocimientos sobre cómo el usuario piensa, decide y se mueve por el producto.

| Módulo | Tema central | agent_tags |
|---|---|---|
| `laws-of-ux` | Hick, Fitts, Miller, Jakob, Estética | ux, audit, flow |
| `nielsen-heuristics` | 10 heurísticas clásicas de usabilidad | ux, audit, ui |
| `dont-make-me-think` | Claridad, escaneo, satisficing, happy path | ux, audit, flow |
| `design-of-everyday-things` | Affordances, signifiers, mapeo, feedback, estados | ux, audit, ui |
| `about-face` | Objetivos, postura del producto, manipulación directa | ux, flow, audit |
| `100-things-people` | Percepción, atención, memoria, motivación | ux, audit, flow |
| `strategic-writing-for-ux` | Microcopy, botones, errores, empty states | ux, copy, audit |
| `microinteractions` | Triggers, rules, feedback sutil, loops, modos | ux, ui, audit |
| `service-design-thinking` | Experiencia end-to-end, touchpoints, blueprint | ux, flow, audit |
| `lean-ux-and-metrics` | Hipótesis, experimentos, métricas de UX | ux, flow, audit |

→ Ver detalle de carga por agente en `/ux/index.md`

---

### /ui — 7 módulos
Conocimientos sobre cómo se construye y evalúa la capa visual del producto.

| Módulo | Tema central | agent_tags |
|---|---|---|
| `refactoring-ui` | Espaciado, tipografía, color, jerarquía visual | ui, audit |
| `practical-ui` | Sombras, elevación, legibilidad, accesibilidad táctil | ui, audit |
| `color-theory` | Paleta, hue shifting, contraste WCAG | ui, audit |
| `platform-guidelines` | Patrones iOS (HIG) y Android (Material Design 3) | ui, audit |
| `motion-microinteractions` | Animaciones, timing, easing, reduce motion | ui, audit |
| `illustration` | Uso, estilo, jerarquía y accesibilidad de ilustración | ui, audit |
| `images` | Fotografía, contraste, rendimiento, crops responsivos | ui, audit |

→ Ver detalle de carga por agente en `/ui/index.md`

---

### /front — 6 módulos
Conocimientos técnicos de desarrollo front-end agnósticos a framework y Design System.

| Módulo | Tema central | agent_tags |
|---|---|---|
| `html-semantics` | HTML semántico, landmarks, headings, elementos interactivos | front, audit, 42ds |
| `css-architecture` | Cascade, especificidad, custom properties, BEM | front, audit, 42ds |
| `responsive-design` | Mobile-first, breakpoints, unidades relativas, imágenes responsivas | front, poc, 42ds |
| `performance-web` | Core Web Vitals (LCP, CLS, INP), carga, render blocking | front, audit |
| `javascript-patterns` | Vanilla JS, event delegation, ARIA dinámico, gestión de foco | front, audit, 42ds |
| `component-patterns` | Single responsibility, composición, API de componentes, variantes | front, ds, audit |

→ Ver detalle de carga por agente en `/front/index.md`

---

### /storybook — 7 módulos
Conocimiento sobre Storybook: desarrollar, documentar y testear componentes UI en aislamiento. Agnóstico a framework y Design System. **Carga bajo demanda** (ver nota más abajo).

| Módulo | Tema central | agent_tags |
|---|---|---|
| `overview` | Qué resuelve, conceptos base (story/docs/testing/sharing), cuándo usarlo | storybook, ds, front |
| `setup` | `.storybook/main · preview · manager`, addons, builder | storybook, front |
| `csf` | Component Story Format: `meta`, `args`, stories como estados | storybook, ds, front |
| `controls-args` | `args`, `argTypes`, controls, superficie de API editable | storybook, ds |
| `decorators-globals` | Contexto/theme/layout transversal y globals de toolbar | storybook, front |
| `docs-mdx` | MDX y doc blocks; narrativa vs definición técnica | storybook, ds |
| `testing` | Story como caso de prueba: render, interacción, a11y, visual | storybook, audit, front |

→ Ver detalle de carga por agente en `/storybook/index.md`

---

### /42ds — 6 módulos
Conocimiento arquitectónico del Design System 42DS. Marco conceptual para razonar sobre el DS.

| Módulo | Tema central | agent_tags |
|---|---|---|
| `atomic-design` | Tres niveles, prefijos CSS, BEM en 42DS, tamaños obligatorios | 42ds, poc, ds |
| `brand-system` | 8 marcas, CSS variables, setting.css, variantes por marca | 42ds, poc, ds |
| `grid-system` | ft-layout-grid-flex, 12 columnas, breakpoints, skin layout | 42ds, poc |
| `scss-pipeline` | Abstracts, mixins Bourbon, compilación Prepros, versiones | 42ds, ds |
| `helpers-system` | Spacer, display, tipografía, color — cuándo y cómo usarlos | 42ds, poc, ds |
| `poc-system` | Estructura de POCs, rutas, placehold.co, scripts showroom | 42ds, poc |

→ Ver detalle de carga por agente en `/42ds/index.md`

---

## Carga por tipo de agente

| Agente | Naturaleza | Dominios | Módulos clave |
|---|---|---|---|
| `mode-ux` (generativo LF) | Sin DS | /ux | `dont-make-me-think` · `laws-of-ux` · `strategic-writing-for-ux` · `nielsen-heuristics` |
| `mode-ux` (evaluativo) | Sin DS | /ux + /ui (parcial) | todos los de /ux |
| `mode-ui` (generativo LF) | Sin DS | /ui | `refactoring-ui` · `practical-ui` · `color-theory` |
| `mode-ui` (evaluativo) | Sin DS | /ui + /ux (parcial) | todos los de /ui |
| `mode-poc` (lf) | 42DS | /ux + /ui + /42ds | `dont-make-me-think`, `strategic-writing-for-ux`, `refactoring-ui`, `atomic-design`, `grid-system`, `helpers-system`, `poc-system` |
| `mode-poc` (hf/ai) | 42DS | /ux + /ui + /42ds | todos los relevantes |
| `mode-poc` (css) | 42DS + CSS | /ux + /ui + /42ds | todos los de hf + `color-theory` |
| `mode-poc` (scss) | 42DS + SCSS | /ux + /ui + /42ds + /front | todos los de css + `html-semantics` · `css-architecture` |
| `mode-ds` | 42DS | /ui + /front + /42ds | `component-patterns`, `css-architecture`, `html-semantics`, `atomic-design`, `brand-system`, `scss-pipeline`, `helpers-system` |
| `UX+UI` (generativo HF) | Sin DS | /ux + /ui | UX fase 1: `dont-make-me-think` · `laws-of-ux` · `strategic-writing` · `nielsen` / UI fase 2: `refactoring-ui` · `practical-ui` · `color-theory` |

> **Nota sobre módulos huérfanos**: `about-face.md` y `service-design-thinking.md` están disponibles pero no se cargan en ningún mode estándar. Son de carga explícita cuando el task lo requiere: `about-face` para análisis de flujos orientados a objetivos, `service-design-thinking` para journeys end-to-end con múltiples canales.

> **Nota sobre el dominio `/storybook`**: no está cableado en ningún mode estándar. 42DS documenta con su showroom (`fourty/`), no con Storybook. Se carga de forma explícita cuando el task involucra Storybook — proyectos consumidores que lo adopten o tareas de evaluación/migración. Ver `/storybook/index.md`.

---

## Relaciones entre dominios

| /ux | /ui | /front | /42ds | Intersección |
|---|---|---|---|---|
| `microinteractions` | `motion-microinteractions` | `javascript-patterns` | — | Feedback animado y ARIA dinámico |
| `design-of-everyday-things` | `practical-ui` | `html-semantics` | — | Affordances, estados y semántica |
| `laws-of-ux` → Jakob | `platform-guidelines` | — | `brand-system` | Convenciones de plataforma y marca |
| — | `refactoring-ui` | `css-architecture` | `scss-pipeline` | BEM, jerarquía visual, compilación |
| — | — | `responsive-design` | `grid-system` | Breakpoints y layouts adaptativos |
| — | — | `component-patterns` | `atomic-design` | Composición y variantes en el DS |

**`/storybook` (transversal, on-demand)**: `csf`/`controls-args` ↔ `front/component-patterns` (API mínima, variantes); `testing` ↔ `front/javascript-patterns` y `ux/nielsen-heuristics` (interacción y a11y sobre estados reales); `docs-mdx` ↔ `42ds/atomic-design` (documentar niveles); `overview`/`csf` ↔ `42ds/poc-system` (catálogo de estados ≈ showroom). Detalle en `/storybook/index.md`.

---

## Estructura interna de cada módulo

Todos los módulos siguen esta estructura fija:

```
## meta          → dominio, fuente, objetivo, agent_tags
## concepts      → marco conceptual mínimo para razonar en casos ambiguos
## rules         → reglas operativas con checks, targets y recommendations
## checklist     → preguntas de validación rápida
```
