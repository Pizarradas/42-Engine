# knowledge/ui — Índice del dominio

## Propósito
Conocimientos de UI agnósticos a proyecto. Fuente de verdad para agentes que toman decisiones sobre diseño visual, componentes, color, tipografía, imágenes y motion.

---

## Archivos del dominio

| Archivo | Tema | agent_tags |
|---|---|---|
| `refactoring-ui.md` | Espaciado, tipografía, color, jerarquía visual | ui, audit |
| `practical-ui.md` | Sombras, elevación, legibilidad, accesibilidad táctil | ui, audit |
| `color-theory.md` | Sistema de color, paleta, hue shifting, contraste WCAG | ui, audit |
| `platform-guidelines.md` | Patrones iOS (HIG) y Android (Material Design 3) | ui, audit |
| `motion-microinteractions.md` | Animaciones, timing, easing, accesibilidad de motion | ui, audit |
| `illustration.md` | Uso de ilustración, estilo, jerarquía, accesibilidad | ui, audit |
| `images.md` | Fotografía, relevancia, contraste, rendimiento, crops | ui, audit |

---

## Carga recomendada por agente

| Agente | Archivos a cargar |
|---|---|
| Agente UI (auditoría general) | todos |
| Agente de sistema de color | `color-theory`, `refactoring-ui` |
| Agente de plataforma (iOS/Android) | `platform-guidelines`, `practical-ui` |
| Agente de motion / animación | `motion-microinteractions` |
| Agente de contenido visual | `illustration`, `images` |
| Agente de accesibilidad | `practical-ui`, `color-theory`, `motion-microinteractions` |

---

## Relación con dominio /ux

Algunos archivos de `/ui` complementan directamente archivos de `/ux`:

| UI | UX relacionado |
|---|---|
| `motion-microinteractions.md` | `microinteractions.md` (UX) |
| `platform-guidelines.md` | `laws-of-ux.md` → Ley de Jakob |
| `practical-ui.md` | `design-of-everyday-things.md` → affordances, estados |
| `color-theory.md` | `100-things-people.md` → atención y percepción |

---

## Estructura interna de cada archivo

Todos los archivos del dominio siguen esta estructura:

```
## meta          → dominio, fuente, objetivo, agent_tags
## concepts      → marco conceptual mínimo para razonar en casos ambiguos
## rules         → reglas operativas con checks, targets y recommendations
## checklist     → preguntas de validación rápida
```
