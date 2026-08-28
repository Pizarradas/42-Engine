# agents/ — Índice global

## Propósito

Definiciones de modes del mind-system. Cada mode es **portable**: incluye rol, knowledge refs, proceso, reglas críticas y formato de output. Puede operar solo con `AI/mind-system/`, aunque algunos modos mejoran su precisión si el runtime también carga referencias operativas del repositorio.

**Archivos del sistema:**

```
governance.md     ← Constitución: dominios, composición, jerarquía de knowledge, conflictos
index.md          ← Este archivo: visión general y tablas de referencia rápida
mode-ux.md        ← Capa 1: Diseño UX — generativo LF (sin DS) + evaluativo
mode-ui.md        ← Capa 2: Diseño UI — generativo LF (sin DS) + evaluativo
mode-poc.md       ← Capa 3: Implementación 42DS — generativo (variantes lf · hf · ai · css · scss)
mode-poc-plus.md  ← Capa 3: Implementación 42DS reuse-first — discovery del DS + extensión canónica
mode-reuse-ds.md  ← Capa 3: Reutilización estricta del DS ya construido (+CSS opcional local)
mode-ds.md        ← Especial: Construcción de componentes SCSS
mode-ds-js.md     ← Especial: Construcción y mantenimiento del JavaScript del DS
mode-doc.md       ← Especial: Documentación técnica Markdown para front, dev, cambios y ADR
mode-storybook.md ← Especial: Stories/docs/tests de Storybook upstream (agnóstico · standalone)
mode-storybook-migrate.md ← Especial: Migración showroom → storybook POC interno (fourty/storybook/)
mode-storybook-doc.md     ← Especial: Operación del storybook POC interno (add/deprecate/modify/engine/data/assets)
mode-storybook-engine.md  ← Especial: Rendimiento/auditoría/afinado del motor del storybook POC (behavior-preserving)
mode-beta-css.md          ← Especial: Overrides CSS de cds-statics/beta/ + registro .md por archivo

externals/emailing/knowledges/mode-email.md  ← [EMAIL]: construcción de emails HTML cross-client
```

> `mode-email.md` vive fuera de `agents/` porque su knowledge está en `externals/emailing/knowledges/`. Es agnóstico de AI y sigue el mismo patrón que el resto de modes.

> Ante cualquier conflicto entre modes o dudas sobre qué knowledge cargar, `governance.md` tiene la última palabra.

---

## Arquitectura de capas

```
KNOWLEDGE BASE — Fuentes de conocimiento
  knowledges/ux/      → Usabilidad, flujos, psicología, copy, métricas
  knowledges/ui/      → Visual, color, tipografía, motion, imágenes
  knowledges/front/   → HTML, CSS, JS, rendimiento, componentes
  knowledges/42ds/    → Arquitectura conceptual del DS (atomic design, brand, grid, SCSS)
  AI/knowledge/42ds/  → Datos operativos opcionales (JSON de componentes, clases, excepciones)
  AI/knowledge/ux/    → Datos operativos opcionales (reglas atómicas, heurísticas, patrones, frameworks)

CAPA 1 — UX (primaria)
  mode-ux.md          → Genera HTML semántico LF desde principios UX (sin DS) /
                        Audita usabilidad de interfaces existentes
  Knowledge generativo: knowledges/ux/dont-make-me-think · laws-of-ux ·
                         strategic-writing · nielsen-heuristics
  Knowledge evaluativo: knowledges/ux/ (completo) + knowledges/ui/practical-ui

CAPA 2 — UI (secundaria)
  mode-ui.md          → Genera HTML + CSS LF desde principios visuales (sin DS) /
                        Audita la capa visual de interfaces existentes
  Knowledge generativo: knowledges/ui/refactoring-ui · practical-ui · color-theory
  Knowledge evaluativo: knowledges/ui/ (completo)

CAPA 1+2 — UX+UI (combinado generativo)
  mode-ux.md → mode-ui.md   → UX define estructura + UI aplica visual → POC HF sin DS
  Protocol A en governance.md

CAPA 3 — 42DS (implementación)
  mode-poc.md         → Genera POCs HTML con clases 42DS (lf · hf · ai · css · scss)
  mode-poc-plus.md    → Genera POCs reuse-first: rastrea el DS, reusa antes de crear,
                        extiende con modificadores canónicos, lo nuevo nace promovible al DS
  mode-reuse-ds.md    → Genera diseños y rediseños solo con items ya construidos del DS;
                        no crea SCSS/JS nuevo, y `+CSS` habilita ajustes locales en el HTML
  Knowledge: knowledges/42ds/ + AI/knowledge/42ds/ + knowledges/ux/ + knowledges/ui/

ESPECIAL — DS
  mode-ds.md          → Construye componentes SCSS en 42DS
  mode-ds-js.md       → Construye o mantiene behaviours vanilla en cds-statics/js/
  Knowledge: knowledges/42ds/ + knowledges/front/ + AI/knowledge/42ds/

ESPECIAL — DOCS TECNICOS (standalone, no combinable)
  mode-doc.md         → Genera .md fuera del storybook para front, dev, cambios y ADR
  Knowledge: knowledges/front/ + knowledges/ux/strategic-writing +
             knowledges/42ds/ + documento raíz del repo + READMEs/subsistemas reales

ESPECIAL — STORYBOOK (agnóstico · standalone, no combinable)
  mode-storybook.md   → Construye/audita stories, docs MDX y tests de Storybook upstream
  Knowledge: knowledges/storybook/ + knowledges/front/
  Exclusivo: fuera del sistema de composición con `+`

ESPECIAL — STORYBOOK POC INTERNO (operacional · standalone, no combinable)
  mode-storybook-migrate.md → Migra componentes del showroom (fourty/__old-showroom/<nivel>/) al
                              storybook POC (fourty/storybook/js/<nivel>/<x>/)
  mode-storybook-doc.md     → Opera el storybook POC: add / deprecate / modify
                              (stories) · engine / data / assets (chrome)
  mode-storybook-engine.md  → Rendimiento/auditoría/afinado del MOTOR del storybook POC
                              (audit · profile · optimize · refactor · harden), behavior-preserving:
                              NO cambia features/contrato (eso es +DOC op engine)
  Knowledge: fourty/storybook/README.md y READMEs por capa + documento raíz del repo (AGENTS.md / CLAUDE.md) +
             scss/fourties/<nivel>/<x>/ (fuente de verdad cuando aplica) +
             knowledges/front/performance-web · javascript-patterns · css-architecture (para +ENGINE)
  Sufijos `+MIGRATE`, `+DOC` y `+ENGINE` son especializaciones, NO combinaciones con otros modes.

ESPECIAL — BETA CSS (operacional · standalone, no combinable · cds-statics/beta/)
  mode-beta-css.md          → Trabaja los overrides CSS a mano de cds-statics/beta/ y
                              mantiene un registro <feature>.md hermano (ficha + timeline
                              de cambios + inventario) por cada <feature>.css
  Knowledge: cds-statics/beta/README.md + cerca.css/cerca.md (plantillas vivas) +
             scss/ (solo para verificar la regla DS que se pisa) + documento raíz del repo
  Operaciones: register · add · modify · promote · retire · audit. Prefijo propio [MODE: BETA+CSS].
```

**Ejecución en combinaciones**: el orden de capas define el orden de ejecución. UX siempre antes que UI, UI antes que 42DS.

---

## Tabla de modes

### Modes simples y su comportamiento

| Prefijo | Mode | Naturaleza | Fidelidad | Usa 42DS | Qué genera |
|---------|------|-----------|----------|----------|-----------|
| `[MODE: UX]` + descripción | `mode-ux` | Generativo | LF | No | HTML semántico guiado por principios UX |
| `[MODE: UX]` + interfaz existente | `mode-ux` | Evaluativo | — | — | Informe de auditoría UX (score 0–1) |
| `[MODE: UI]` + descripción | `mode-ui` | Generativo | LF | No | HTML + CSS guiado por principios visuales |
| `[MODE: UI]` + interfaz existente | `mode-ui` | Evaluativo | — | — | Informe de auditoría UI (score 0–1) |
| `[MODE: 42DS+LF]` | `mode-poc` | Generativo | LF | Sí | HTML con clases 42DS, happy path |
| `[MODE: 42DS+HF]` | `mode-poc` | Generativo | HF | Sí | HTML con clases 42DS, todos los estados |
| `[MODE: 42DS+AI]` | `mode-poc` | Generativo | HF | Sí | HTML 42DS con 6 estados de IA |
| `[MODE: 42DS+REUSE-FIRST]` | `mode-poc-plus` | Generativo | HF | Sí | POC reuse-first: HTML 42DS + extensiones canónicas (`[CANDIDATO DS]`) + reuse-trace |
| `[MODE: 42DS+REUSE]` | `mode-reuse-ds` | Generativo | HF | Sí | Diseño/retoque reuse-only: compone con inventario real del DS, sin tocar SCSS ni crear JS |
| `[MODE: 42DS+SCSS]` | `mode-ds` | Generativo | — | Sí | SCSS (doc visual → story de storybook vía STORYBOOK+MIGRATE/DOC) |
| `[MODE: 42DS+JS]` | `mode-ds-js` | Generativo | — | Sí | JavaScript del DS en `cds-statics/js/` + contratos de carga/API/documentación técnica |
| `[MODE: FRONT+DOC]` | `mode-doc` | Generativo | — | Contextual | Markdown para front: anatomy, clases, dependencias, integración y checklist |
| `[MODE: DEV+DOC]` | `mode-doc` | Generativo | — | Contextual | Markdown técnico para desarrollo: arquitectura, contratos, edge cases y riesgos |
| `[MODE: CHANGE+DOC]` | `mode-doc` | Generativo | — | Contextual | Markdown de handoff: qué se hizo, impacto, migraciones y pendientes |
| `[MODE: ADR]` | `mode-doc` | Generativo | — | Contextual | Decision record técnico en Markdown |
| `[EMAIL]` | `mode-email` | Generativo | HF | No | Email HTML cross-client (Gmail · Outlook · Apple Mail) |
| `[MODE: STORYBOOK]` + componente | `mode-storybook` | Generativo | — | No | Stories CSF + MDX docs + `play` tests + `.storybook` config (upstream) |
| `[MODE: STORYBOOK]` + Storybook existente | `mode-storybook` | Evaluativo | — | No | Informe de auditoría de Storybook upstream (score 0–1) |
| `[MODE: STORYBOOK+MIGRATE]` + target del showroom | `mode-storybook-migrate` | Generativo | — | Sí (consume) | Módulo `storybook/js/<nivel>/<x>/<x>.js` (+ `<x>.html`) + alta en `PHASES` de `storybook/js/bootstrap-lazy.js` |
| `[MODE: STORYBOOK+DOC]` + verbo + target | `mode-storybook-doc` | Generativo / destructivo controlado | — | Sí (consume) | Cualquier archivo de `fourty/storybook/` según operación (add · deprecate · modify · engine · data · assets) |
| `[MODE: STORYBOOK+ENGINE]` + verbo + síntoma | `mode-storybook-engine` | Operacional no-funcional (audita / optimiza) | — | Sí (consume) | Capa motor de `fourty/storybook/` (core · loader · data · css · assets) + loader en `index.html`, o informe de auditoría — behavior-preserving |
| `[MODE: BETA+CSS]` + verbo + target | `mode-beta-css` | Generativo / operación / destructivo controlado | — | Sí (override) | `cds-statics/beta/<feature>.css` + su registro `cds-statics/beta/<feature>.md` (register · add · modify · promote · retire · audit) |
| *(sin prefijo, si el runtime define modo por defecto)* | `mode-poc` | Generativo | HF | Sí | Equivale a `[MODE: 42DS+HF+CSS]` |

### Modes combinados generativos (sin DS)

| Prefijo | Modes activados | Orden | Qué genera |
|---------|-----------------|-------|-----------|
| `[MODE: UX+UI]` | `mode-ux` + `mode-ui` | 1→2 | POC HF: HTML + CSS completo sin 42DS |

### Modes combinados generativos (con DS)

| Prefijo | Mode | Variante | Fidelidad | Qué genera |
|---------|------|---------|----------|-----------|
| `[MODE: 42DS+HF+CSS]` | `mode-poc` | `css` | HF | HTML 42DS + CSS custom en `<style>` |
| `[MODE: 42DS+HF+SCSS]` | `mode-poc` | `scss` | HF | HTML 42DS + parciales SCSS en scss/pocs/ |
| `[MODE: 42DS+REUSE+CSS]` | `mode-reuse-ds` | `+css` | HF | HTML 42DS reuse-only + CSS local ad hoc dentro del propio HTML |

### Combinaciones generativo → evaluativo

| Sintaxis | Modes activados | Orden | Protocolo |
|----------|-----------------|-------|-----------|
| `[MODE: UX+42DS+HF]` | `mode-ux` → `mode-poc(hf)` | 1→3 | UX diseña → 42DS implementa |
| `[MODE: UX+UI+42DS+HF]` | `mode-ux` → `mode-ui` → `mode-poc(hf)` | 1→2→3 | Flujo de diseño completo |
| `[MODE: 42DS+HF+UX]` | `mode-poc(hf)` → `mode-ux` | 3→1 | 42DS genera → UX audita |
| `[MODE: 42DS+HF+UI]` | `mode-poc(hf)` → `mode-ui` | 3→2 | 42DS genera → UI audita |
| `[MODE: 42DS+HF+UX+UI]` | `mode-poc(hf)` → `mode-ux` + `mode-ui` | 3→1+2 | 42DS genera → auditoría completa |
| `[MODE: 42DS+LF+UX]` | `mode-poc(lf)` → `mode-ux` | 3→1 | Boceto → validación UX mínima |
| `[MODE: 42DS+REUSE-FIRST+UX]` | `mode-poc-plus` → `mode-ux` | 3→1 | POC reuse-first → audita UX |
| `[MODE: 42DS+REUSE-FIRST+UI]` | `mode-poc-plus` → `mode-ui` | 3→2 | POC reuse-first → audita UI |
| `[MODE: 42DS+REUSE-FIRST+UX+UI]` | `mode-poc-plus` → `mode-ux` + `mode-ui` | 3→1+2 | POC reuse-first → auditoría completa |
| `[MODE: 42DS+REUSE+UX]` | `mode-reuse-ds` → `mode-ux` | 3→1 | Reuse-only → audita UX |
| `[MODE: 42DS+REUSE+UI]` | `mode-reuse-ds` → `mode-ui` | 3→2 | Reuse-only → audita UI |
| `[MODE: 42DS+REUSE+UX+UI]` | `mode-reuse-ds` → `mode-ux` + `mode-ui` | 3→1+2 | Reuse-only → auditoría completa |
| `[MODE: 42DS+SCSS+UI]` | `mode-ds` → `mode-ui` | DS→2 | DS construye → UI valida visual |

> Reglas de composición, resolución de colisiones y jerarquía de knowledge: ver `governance.md`.

---

## Estructura interna de cada mode

```
## meta          → rol, scope, variantes disponibles, fidelidad, agent_tags
## knowledge     → módulos por capa (generalista / DS / operativo)
## inputs        → qué necesita y de dónde
## process       → pasos de ejecución embebidos por variante/modo
## rules         → no-negociables críticos + templates HTML/CSS/SCSS
## evaluator     → scoring (si aplica — UX y UI)
## outputs       → formato de salida
## invocation    → cómo invocar + ejemplos
```

---

## Carga de knowledge por mode

### MODE: UX

| Contexto | knowledges/ux/ | knowledges/ui/ |
|----------|---------------|----------------|
| Generativo LF | `dont-make-me-think` · `laws-of-ux` · `strategic-writing` · `nielsen-heuristics` | — |
| Evaluativo básico | `nielsen-heuristics` · `laws-of-ux` · `strategic-writing` · `dont-make-me-think` | `practical-ui` |
| Evaluativo completo | todos los de ux/ | todos los de ui/ |

### MODE: UI

| Contexto | knowledges/ui/ | knowledges/ux/ |
|----------|---------------|----------------|
| Generativo LF | `refactoring-ui` · `practical-ui` · `color-theory` | — |
| Evaluativo básico | `refactoring-ui` · `practical-ui` · `color-theory` | — |
| Evaluativo completo | todos los de ui/ | `microinteractions` |

### MODE: UX+UI (generativo HF sin DS)

| Fase | knowledges/ux/ | knowledges/ui/ |
|------|---------------|----------------|
| UX (fase 1) | `dont-make-me-think` · `laws-of-ux` · `strategic-writing` · `nielsen-heuristics` | — |
| UI (fase 2) | — | `refactoring-ui` · `practical-ui` · `color-theory` |

### MODE: 42DS (por variante)

| Variante | knowledges/ux/ | knowledges/ui/ | knowledges/42ds/ | AI/knowledge/ |
|----------|---------------|----------------|-----------------|---------------|
| `lf` | `dont-make-me-think` · `strategic-writing` | `refactoring-ui` | `atomic-design` · `grid-system` · `helpers-system` · `poc-system` | `components-lite` · `classes-cheatsheet` · `rules.json` |
| `hf` | ux completo | ui completo | todos | `components-lite` · `classes-cheatsheet` · `elements` · `exceptions` · `patterns/*.json` |
| `ai` | ux completo | ui completo | todos | completo + `frameworks/ai-ux.json` |
| `css` | ux completo | ui completo + `color-theory` | todos | completo |
| `scss` | ux completo | ui completo + `color-theory` | todos + `scss-pipeline` | completo |

> Variante `scss`: carga además `knowledges/front/scss-patterns` (convenciones SCSS del repo). Los parciales `.poc-` de `scss/pocs/` aplican las convenciones generales (BEM, media queries inline, `var(--…)`) pero NO importan `abstracts` ni se registran en cores — eso es propio de los parciales del DS (`[MODE: 42DS+SCSS]`).

### MODE: 42DS+REUSE-FIRST

| Fase | knowledges/ux/ | knowledges/ui/ | knowledges/42ds/ | Fuentes operativas del repositorio |
|------|---------------|----------------|-----------------|------------------------------------|
| Discovery | `dont-make-me-think` · `strategic-writing` · `laws-of-ux` · `nielsen-heuristics` · `microinteractions` | `refactoring-ui` · `practical-ui` | **todos** (incluido `scss-pipeline`) | documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) · `fourty/{atoms,molecules,organisms,helpers}/README.md` · `scss/abstracts/README.md` · `cds-statics/js/README.md` + sub-READMEs · inventario de `scss/fourties/` |
| Generación | mismo set | mismo set + `color-theory` si custom es color-driven | todos | mismas fuentes — además parciales SCSS concretos cuando se extiende/crea |

> Este modo depende fuertemente del **rastreo del repositorio real**. Si la capa
> operativa `AI/knowledge/` no está disponible, el rastreo debe hacerse contra el
> código fuente y READMEs reales — no inventar nunca clases o componentes.
>
> Cuando la fase de Generación **extiende (`&--variante`) o crea un parcial canónico** en
> `scss/fourties/` (`[CANDIDATO DS]`), carga además `knowledges/front/scss-patterns` (canon
> de cómo se escribe el SCSS del DS). Si se resuelve 100% reusando, no aplica.

### MODE: 42DS+REUSE

| Fase | knowledges/ux/ | knowledges/ui/ | knowledges/42ds/ | Fuentes operativas del repositorio |
|------|---------------|----------------|-----------------|------------------------------------|
| Rastreo | `dont-make-me-think` · `strategic-writing` · `laws-of-ux` · `nielsen-heuristics` | `refactoring-ui` · `practical-ui` | `atomic-design` · `grid-system` · `helpers-system` · `poc-system` · `brand-system` | documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) · `fourty/{atoms,molecules,organisms,helpers}/README.md` · `scss/fourties/` · `cds-statics/js/README.md` + sub-READMEs · storybook de la pieza si existe |
| Construcción | mismo set | mismo set | mismo set | mismas fuentes — con foco en markup real, modificadores reales y dependencias JS ya construidas |

> Este modo es más estricto que `42DS+REUSE-FIRST`: no extiende el DS ni crea candidatos. Si el caso no se resuelve con inventario existente, debe escalarse a `mode-poc-plus` o `mode-ds`.

### MODE: DS

| knowledges/front/ | knowledges/42ds/ | AI/knowledge/ |
|------------------|-----------------|---------------|
| `html-semantics` · `css-architecture` · `scss-patterns` · `component-patterns` · `javascript-patterns` (si JS) | `atomic-design` · `brand-system` · `scss-pipeline` · `helpers-system` | `classes-cheatsheet` · documento raíz del repositorio (`AGENTS.md` o `CLAUDE.md`) |

### MODE: 42DS+JS

| knowledges/front/ | knowledges/42ds/ | Fuentes operativas del repositorio |
|------------------|-----------------|------------------------------------|
| `javascript-patterns` · `component-patterns` · `html-semantics` · `performance-web` (si aplica) · `css-architecture` (si aplica) | `atomic-design` · `brand-system` · `helpers-system` | `cds-statics/js/README.md` · `cds-statics/js/[subcarpeta]/README.md` · `scss/fourties/[nivel]/[pieza]/_[pieza].scss` · storybook de la pieza si existe · `showroom/dependencies.js` si cambia el mapa |

### MODE: DOC FAMILY (`FRONT+DOC` · `DEV+DOC` · `CHANGE+DOC` · `ADR`)

| knowledges/front/ | knowledges/ux/ | knowledges/42ds/ | Fuentes operativas del repositorio |
|------------------|----------------|------------------|------------------------------------|
| `html-semantics` · `css-architecture` · `component-patterns` · `javascript-patterns` (si aplica) · `performance-web` (si aplica) | `strategic-writing` (+ `nielsen-heuristics` o `practical-ui` si el documento cubre decisiones de uso/visuales) | `atomic-design` · `brand-system` · `helpers-system` · `scss-pipeline` (si aplica) | documento raíz (`AGENTS.md` / `CLAUDE.md`) · `fourty/storybook/README.md` + README de capa · `scss/fourties/` · `cds-statics/js/` · `CHANGELOG.md` · READMEs del subsistema |

### MODE: STORYBOOK (standalone)

| Contexto | knowledges/storybook/ | knowledges/front/ | knowledges/ux · ui/ |
|----------|----------------------|-------------------|---------------------|
| Generativo (stories/docs/config) | `overview` · `csf` · `controls-args` · `decorators-globals` · `setup` (+ `docs-mdx` si docs) | `component-patterns` (+ `javascript-patterns` si hay `play`) | — |
| Generativo con tests | + `testing` | + `javascript-patterns` · `html-semantics` | `ux/nielsen-heuristics` (a11y) |
| Evaluativo (auditoría) | todos | `component-patterns` · `javascript-patterns` | `ux/nielsen-heuristics` puntual |

> No carga `knowledges/42ds/` ni `AI/knowledge/42ds/`: es agnóstico. Verifica toda API contra las **Fuentes oficiales** de `knowledges/storybook/index.md` (no inventar).

### MODE: STORYBOOK+MIGRATE (operacional · standalone · 42DS POC interno)

| Capa | Fuente primaria | Cuándo |
|------|----------------|--------|
| Storybook POC interno | `fourty/storybook/README.md` · `js/README.md` · `js/core/README.md` · README del nivel (`atoms`/`molecules`/`organisms`) | Siempre |
| 42DS — fuente de verdad | `scss/fourties/<nivel>/<x>/_<x>.scss` (+ `<x>-<marca>.scss` si existen) · `fourty/__old-showroom/<nivel>/<nivel>-<x>.html` · `cds-statics/js/...` (si hay JS) · `cds-statics/csv/storybook__bodyclass.csv` (si brand-aware) | Siempre |
| Referencia canónica de stories migradas | `storybook/js/atoms/btn/{btn.js,btn.html}` · `storybook/js/molecules/btngroup/btngroup.js` · `storybook/js/organisms/authors/authors.js` | Mirar antes de escribir |
| Conceptual (refuerzo) | `knowledges/42ds/atomic-design` · `knowledges/front/html-semantics` · `knowledges/front/component-patterns` · documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) | Si quedan dudas de criterio |

### MODE: STORYBOOK+DOC (operacional · standalone · 42DS POC interno)

| Capa | Fuente primaria | Cuándo (por operación) |
|------|----------------|------------------------|
| Storybook POC interno (overview + capa tocada) | `fourty/storybook/README.md` + README de la capa | Siempre + por sub-op |
| Core engine | `js/core/README.md` | op: `engine` |
| Chrome CSS | `css/README.md` | op: `engine` (estilos del chrome) |
| Data layer | `data/README.md` | op: `data` |
| Iconos | `assets/README.md` | op: `assets` |
| Stories por nivel | `js/atoms/README.md` · `js/molecules/README.md` · `js/organisms/README.md` (incluyen **índice de componentes**) | op: `add`, `modify`, `deprecate` |
| Ficha de componente | `js/<nivel>/<x>/README.md` (contexto para agentes: identidad, clase raíz, señales, stories, trazabilidad; indexa, no duplica el `overview`) | op: `add`, `modify`, `deprecate` |
| 42DS (fuente de verdad cuando aplica) | `scss/fourties/<nivel>/<x>/_<x>.scss` · `cds-statics/csv/storybook__bodyclass.csv` | op: `add` (componente DS no migrado) · `data` (mantenimiento CSV) |
| Conceptual (refuerzo) | `knowledges/front/javascript-patterns` · `knowledges/front/component-patterns` · `knowledges/ux/nielsen-heuristics` · documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) | Si la operación es no trivial |

### MODE: STORYBOOK+ENGINE (operacional no-funcional · standalone · 42DS POC interno)

| Capa | Fuente primaria | Cuándo |
|------|----------------|--------|
| Storybook POC interno | `fourty/storybook/README.md` · `js/README.md` · `js/core/README.md` | Siempre |
| Capa tocada | `js/core/README.md` (motor) · `bootstrap-lazy.js` (loader) · `css/README.md` · `data/README.md` · `assets/README.md` | Según hot-path del síntoma |
| Rendimiento (conceptual) | `knowledges/front/performance-web` · `knowledges/front/javascript-patterns` · `knowledges/front/css-architecture` | Siempre |
| Medición | Navegador (DevTools Performance/Network · `performance.now` · `console.time`) — requiere SERVIDOR | `profile` y verificación |

> Estos tres modes (`+MIGRATE`, `+DOC`, `+ENGINE`) operan EXCLUSIVAMENTE sobre `fourty/storybook/`
> (POC interno). NO tocan `scss/`, `cds-statics/` ni `fourty/__old-showroom/<nivel>/<nivel>-<x>.html`
> del showroom (ENGINE los LEE solo para medir/verificar). La única excepción de escritura fuera es
> `fourty/storybook/js/bootstrap-lazy.js`: `+1 ruta en PHASES` (MIGRATE, alta del módulo) o el
> faseado/orden de carga (ENGINE). `fourty/index.html` es un shell de 8 scripts fijos: no se toca
> para dar de alta stories.

### MODE: BETA+CSS (operacional · standalone · `cds-statics/beta/`)

| Capa | Fuente primaria | Cuándo |
|------|----------------|--------|
| Beta — convención y plantillas vivas | `cds-statics/beta/README.md` · `cds-statics/beta/cerca.css` · `cds-statics/beta/cerca.md` | Siempre |
| 42DS — regla que se pisa | `scss/fourties/<nivel>/<x>/_<x>.scss` · `scss/brands/<marca>-setup.scss` · `scss/base/helpers/` · `cds-statics/csv/storybook__bodyclass.csv` | Para rellenar `@source`/`@promote` y acotar la marca |
| Conceptual (refuerzo) | `knowledges/front/css-architecture` · `knowledges/42ds/brand-system` · `knowledges/ux/strategic-writing` · documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) | Si la operación es no trivial |

> Opera EXCLUSIVAMENTE sobre `cds-statics/beta/`. NO toca `scss/`, el resto de
> `cds-statics/` (compilado) ni `fourty/`. Única salida fuera: +1 línea en
> `package.json → files` (publicación), solo con confirmación. La **promoción** real a
> `scss/` se delega a `[MODE: 42DS+SCSS]`.

---

## Cómo añadir un mode nuevo

1. Decidir la capa: ¿es agnóstico de DS (Capa 1/2) o requiere 42DS (Capa 3)?
2. Crear `agents/mode-[nombre].md` con la estructura estándar.
3. Capa 1/2: referenciar **solo** `knowledges/ux/`, `knowledges/ui/`, `knowledges/front/`.
4. Capa 3: puede combinar todas las fuentes.
5. Añadir las filas correspondientes en las tablas de este índice.
6. Si tiene prefijo nuevo: registrarlo en el documento raíz del repo (`AGENTS.md` / `CLAUDE.md`, espejados) → sección "Sistema de modos" con una fila en la tabla de specs (3 líneas máximo — solo puntero al archivo, sin duplicar la spec).
7. Actualizar `governance.md` si introduce un nuevo protocolo de ejecución.
