# knowledge/storybook — Índice del dominio

## Propósito
Conocimiento sobre **Storybook**: desarrollar, documentar y testear componentes UI en aislamiento. Dominio agnóstico a framework y a Design System. Fuente de verdad para agentes que generan o auditan stories, docs y configuración de Storybook.

> Carga **bajo demanda**: 42DS documenta con su propio showroom (`fourty/`), no con Storybook. Este dominio aplica a proyectos consumidores (Astro/Nuxt) que usen Storybook o a evaluar su adopción. No se carga en los modes estándar salvo que el task lo pida (ver nota al final).

---

## Archivos del dominio

| Archivo | Tema | agent_tags |
|---|---|---|
| `overview.md` | Qué resuelve Storybook, conceptos base, cuándo usarlo | storybook, ds, front |
| `setup.md` | `.storybook/main · preview · manager`, addons, builder | storybook, front |
| `csf.md` | Component Story Format: `meta`, `args`, stories como estados | storybook, ds, front |
| `controls-args.md` | `args`, `argTypes`, controls y superficie de API editable | storybook, ds |
| `decorators-globals.md` | Contexto/layout/theme transversal y globals de toolbar | storybook, front |
| `docs-mdx.md` | MDX y doc blocks; narrativa vs definición técnica | storybook, ds |
| `testing.md` | Story como caso de prueba: render, interacción, a11y, visual | storybook, audit, front |

---

## Orden de consulta recomendado

`overview` → `setup` → `csf` → `controls-args` → `decorators-globals` → `docs-mdx` → `testing`

`csf` es el núcleo: controls, decorators, docs y testing cuelgan de él.

---

## Carga recomendada por agente

| Agente / tarea | Archivos a cargar | Motivo |
|---|---|---|
| Construir stories de un componente | `overview`, `csf`, `controls-args`, `decorators-globals` | Definición, API editable y contexto de render |
| Documentar con MDX | `csf`, `controls-args`, `docs-mdx` | Doc blocks consumen stories y `argTypes` |
| Testear UI con stories | `csf`, `testing` | La story es el caso de prueba |
| Configurar / migrar Storybook | `setup` (+ `overview`) | Configuración del proyecto y builder |
| Auditoría de un Storybook existente | todos | Revisión de cobertura, controls, docs y tests |

---

## Relaciones con otros dominios

| /storybook | Otro dominio | Intersección |
|---|---|---|
| `csf` · `controls-args` | `front/component-patterns` | API mínima, props semánticas, variantes vs componente |
| `testing` | `front/javascript-patterns` | Interacción (`play`), ARIA y foco programático |
| `testing` | `ux/nielsen-heuristics` · `ui/practical-ui` | Accesibilidad validada sobre estados reales |
| `docs-mdx` | `42ds/atomic-design` | Documentar niveles atom/molecule/organism |
| `overview` · `csf` | `42ds/poc-system` | Catálogo de estados ≈ showroom 42DS (medios distintos, mismo principio) |

---

## Fuentes oficiales (verificación)

> Regla transversal: **no inventar APIs**. Toda afirmación debe rastrearse a una de estas fuentes.

| Tema | Fuente |
|---|---|
| Inicio / visión | https://storybook.js.org/docs |
| Configuración | https://storybook.js.org/docs/configure · https://storybook.js.org/docs/api/main-config/main-config |
| Writing stories / decorators | https://storybook.js.org/docs/writing-stories · https://storybook.js.org/docs/writing-stories/decorators |
| Controls y args | https://storybook.js.org/docs/essentials/controls |
| Documentación / doc blocks | https://storybook.js.org/docs/writing-docs · https://storybook.js.org/docs/api/doc-blocks |
| Testing | https://storybook.js.org/docs/writing-tests · https://storybook.js.org/docs/writing-tests/integrations/vitest-addon |
| Addons | https://storybook.js.org/docs/configure/user-interface/storybook-addons |
| API reference | https://storybook.js.org/docs/api |

---

## Reglas de generación para IA

Al generar stories, docs o configuración de Storybook:

- **Redacción**: un concepto por sección, frases cortas, términos técnicos exactos, ejemplos mínimos, sin redundancia.
- **No inventar APIs**: solo lo rastreable a las fuentes oficiales de arriba.
- **No mezclar** configuración global (`preview.ts`/`main.ts`) con configuración por story (ver `setup`, `decorators-globals`).
- **No duplicar** estados visuales equivalentes (ver `csf`).
- **Priorizar claridad** sobre amplitud; estructura modular e indexable.

Formato ideal de cada pieza generada: propósito → cuándo usar → ejemplo mínimo → errores frecuentes.

---

## Nota sobre la relación con 42DS

42DS usa el **showroom HTML** (`fourty/`) como documentación viva, no Storybook. Por eso `/storybook` **no está cableado** en los modes estándar (`mode-poc`, `mode-ds`, etc.). Es un dominio de **carga explícita** para:
- Proyectos consumidores del paquete `@design/42ds` que adopten Storybook.
- Tareas de evaluación o migración hacia Storybook.

El principio subyacente coincide con el showroom: **catalogar cada estado de un componente como unidad de desarrollo, documentación y test**.
