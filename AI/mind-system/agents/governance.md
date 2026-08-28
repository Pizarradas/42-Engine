# governance.md — Sistema de gobernanza entre modes

Define cómo los modes coexisten, se combinan y resuelven conflictos. Es la "constitución" del sistema: sus reglas prevalecen sobre cualquier instrucción interna de un mode individual.

---

## 1. Mapa de dominios canónico

Cada dominio tiene un único dueño. Cuando dos modes se ejecutan juntos, cada uno evalúa **solo** su dominio. Ninguno invade el del otro.

### Dominios mode-ux

| Dominio | Qué evalúa / genera |
|---------|---------------------|
| Jerarquía de acciones | CTAs, escape, labels orientados al resultado |
| Feedback y estados | Éxito, error, loading, vacío |
| Formularios e inputs | Labels visibles, validación inline, teclado |
| Navegación y orientación | Retorno con contexto, breadcrumbs, terminología |
| Accesibilidad semántica | ARIA roles y atributos, jerarquía de headings, alt en imágenes, keyboard nav |
| Contraste *(binario)* | WCAG 2.1 AA: ¿pasa o no pasa el ratio mínimo? |
| Focus visible *(presencia)* | ¿Existe indicador de foco en elementos interactivos? |
| Generación LF sin DS | HTML semántico guiado por principios UX |

### Dominios mode-ui

| Dominio | Qué evalúa / genera |
|---------|---------------------|
| Jerarquía visual y espaciado | Escala tipográfica, grupos, focal point, alineación |
| Color y paleta | Hue shift, coherencia semántica, color como único diferenciador |
| Contraste *(sistémico)* | Análisis de paleta completa, contraste en imágenes, suficiencia visual más allá del binario |
| Focus visible *(calidad visual)* | ¿El indicador de foco es suficientemente visible, no solo existente? |
| Tipografía y legibilidad | Escala, interlineado, longitud de línea, familias |
| Motion y microinteracciones | Timing, easing, reduce-motion |
| Imágenes e ilustración | Crops, contraste sobre foto, consistencia de estilo |
| Consistencia de plataforma | iOS HIG, Material Design 3 |
| Generación LF con CSS | HTML semántico + CSS inline guiado por principios visuales |

### Dominios mode-poc

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Generación HTML 42DS | Produce los archivos del POC con clases 42DS |
| Estructura técnica 42DS | Grid, clases BEM, helpers, rutas, scripts |
| Componentes 42DS | Lite, excepciones, modificadores de tamaño |
| CSS custom inline (variante CSS) | Estilos .poc- en `<style>`, tokens --poc-, overrides justificados |
| SCSS parciales (variante SCSS) | Archivos en scss/pocs/, prefijos .poc-, candidatos DS |

### Dominios mode-poc-plus

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Discovery del DS | Rastrea atoms · molecules · organisms · helpers · JS · partials antes de generar |
| Plan de reutilización (reuse-trace) | Tabla pieza · decisión (reusar/extender/crear) · componente · razón — confirmada con el usuario antes de generar |
| Generación HTML 42DS reuse-first | Igual que `mode-poc(hf)` pero con clases canónicas del rastreo, sin invención |
| Extensiones canónicas | Añade modificadores `&--variante` en `scss/fourties/[nivel]/` con `[CANDIDATO DS]` |
| Componentes nuevos promovibles | Crea `scss/fourties/[nivel]/[nuevo]/_[nuevo].scss` siguiendo BEM canónico — NO registra en cores |
| Excepción `.poc-` (último recurso) | Solo si la pieza no es promovible al DS; va en `scss/pocs/` y se documenta en reuse-trace |
| Reporte de impacto en el DS | Lista `[CANDIDATO DS]` para revisión del equipo de DS |

### Dominios mode-reuse-ds

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Rastreo del inventario real | Localiza items ya construidos del DS en HTML · SCSS · JS antes de proponer solución |
| Plan de composición reuse-only | Tabla necesidad · pieza · nivel · dependencia JS · ajuste permitido |
| Generación HTML 42DS sin invención | Compone usando solo clases, modificadores y dependencias reales del sistema |
| Reutilización de JS canónico | Declara y monta solo scripts ya existentes del DS; nunca escribe JS nuevo |
| Submodo `+CSS` | Permite CSS local dentro del HTML para ajustes ad hoc, sin tocar SCSS ni crear API nueva |
| Escalado controlado | Si no alcanza el inventario actual, deriva a `mode-poc-plus` o `mode-ds` en vez de inventar |

### Dominios mode-ds

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| SCSS del componente | Estructura, BEM, variables CSS, mixins |
| Documentación visual (storybook POC) | Story en `fourty/storybook/` autorada vía `[MODE: STORYBOOK+MIGRATE/DOC]` — el showroom HTML clásico está decomisionado (delegación, no la genera mode-ds) |
| Registro en cores | Integración en el pipeline de marcas |

### Dominios mode-ds-js

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| JavaScript canónico del DS | Controllers, autoinit, APIs públicas, observers, sincronización ARIA |
| Contratos de integración | Orden de carga, dependencias, hooks BEM/data-attrs, compatibilidad ABI |
| Accesibilidad dinámica | Foco, teclado, Escape, body-lock, estados `aria-*` |
| Mantenimiento del catálogo JS | READMEs de `cds-statics/js/` y registro auxiliar si cambian rutas/alta de scripts |

### Dominios mode-doc *(standalone · documentación técnica Markdown)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| `[MODE: FRONT+DOC]` | Guías `.md` para front: anatomy, markup, clases clave, estados, dependencias JS, integración y checklist |
| `[MODE: DEV+DOC]` | Documentos técnicos `.md`: arquitectura, contratos, orden de carga, edge cases, riesgos y estrategia de evolución |
| `[MODE: CHANGE+DOC]` | Hand-off `.md` de cambios: qué se hizo, archivos tocados, impacto, migraciones, deprecated/remove y pendientes |
| `[MODE: ADR]` | Decision records `.md`: contexto, decisión, alternativas y consecuencias |
| Trazabilidad documental | Cierra con fuentes revisadas del repo y handoff a otros modes si detecta huecos |

> **No invade el dominio de `mode-storybook-doc`**: no modifica overviews ni el chrome del storybook; genera documentación complementaria fuera de `fourty/storybook/`.
>
> **No invade el dominio de `mode-ds` / `mode-ds-js`**: explica el sistema, pero no cambia el SCSS o JS canónicos por sí mismo.

### Dominios mode-storybook *(standalone · agnóstico)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Stories (CSF) | `meta`, estados como exports nombrados, args reutilizados, pureza |
| Controls / args | Superficie de API editable; props internas ocultas |
| Decorators / globals | Contexto/theme/layout en el ámbito correcto; globals de toolbar |
| Documentación MDX | Doc blocks; narrativa separada de la definición técnica |
| Testing de stories | `play`, accesibilidad, render/visual, ejecución en CI |
| Configuración `.storybook/` | `main · preview · manager`, frontera global vs por story |

> **No invade el dominio de `mode-ui`**: este modo construye/audita los *artefactos de Storybook*, no juzga la calidad visual del componente renderizado. Esa evaluación es de `mode-ui`, en invocación separada.

> **No invade el dominio de `mode-ds`**: no escribe en `fourty/` ni en `cds-statics/`. 42DS documenta con su storybook interno (POC); este modo opera sobre proyectos consumidores que usan Storybook upstream.

### Dominios mode-storybook-migrate *(operacional · standalone · 42DS POC interno)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Migración showroom → storybook POC | Traduce `fourty/__old-showroom/<nivel>/<nivel>-<x>.html` a `storybook/js/<nivel>/<x>/<x>.js` |
| DATA SSOT del módulo | Arrays 1:1 con `scss/fourties/<nivel>/<x>/_<x>.scss` (cero invención) |
| Stories planas + galerías | Base primero, una story plana por familia, galería por eje >10 opciones |
| Overview docs-only | Tablas de Dependencias / Modificadores / Anatomía (sin componente vivo) |
| Markup canónico (`<x>.html`) | Bloques `<template>` con ejemplos copiables (opcional) |
| Alta del módulo | +1 ruta en el array `PHASES` de `storybook/js/bootstrap-lazy.js` (NO en `index.html`) + chivato en `storybook/js/meta.js` |

### Dominios mode-storybook-doc *(operacional · standalone · 42DS POC interno)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Add (pieza nueva no migrada del showroom) | Módulo `storybook/js/<nivel>/<x>/` o marcado `[POC]` si es pre-DS |
| Deprecate (baja controlada) | Renombrar a `_<x>/` (reversible) + quitar su ruta de `PHASES` en `bootstrap-lazy.js`; rm definitivo solo con confirmación |
| Modify (stories existentes) | DATA SSOT, argTypes, render, overview, galerías, naming |
| Engine (motor del chrome) | `js/core/storybook.js`: toolbar, sub-toolbar A11y, addons, widget `.cb-csel`, inspector |
| CSS del chrome | `css/storybook.css`: tokens `--cb-*`, dark mode, breakpoints |
| Data layer | `data/brand-data.js`: parser CSV, índices, cache:no-cache |
| Assets (iconos) | `assets/icons.js` + `assets/icons/<x>.svg` (Phosphor regular, kebab-case, currentColor) |
| Documentación de capa | README de la capa tocada + `fourty/storybook/README.md` maestro si afecta features visibles |

> **`mode-storybook-migrate` y `mode-storybook-doc` son COMPLEMENTARIOS, no superpuestos**:
> - Si la tarea es "traducir un archivo del showroom a una story" → `mode-storybook-migrate`.
> - Cualquier otra cosa sobre el storybook POC (add desde cero, deprecate, modify, motor, data, assets) → `mode-storybook-doc`.
>
> **No invaden el dominio de `mode-ds`**: NO escriben en `scss/`, `cds-statics/` ni
> `fourty/__old-showroom/<nivel>/<nivel>-<x>.html` del showroom. El storybook POC consume el DS,
> no lo modifica.
>
> **No se confunden con `mode-storybook`**: aquel cubre el **producto upstream**
> (`@storybook/*`, CSF, MDX); estos cubren el **POC interno zero-toolchain** del 42DS.
> Son arquitecturas distintas con API y reglas distintas.

### Dominios mode-storybook-engine *(operacional no-funcional · standalone · 42DS POC interno)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Auditoría de arquitectura/rendimiento (`audit`) | Informe priorizado (severidad · archivo:línea · impacto · fix · esfuerzo) del motor, sin escribir |
| Profiling (`profile`) | Instrumentación temporal + medición (boot, render, search, red) con el navegador como fuente de verdad |
| Optimización (`optimize`) | Tuning puntual behavior-preserving (coalescing, debounce/throttle, carga paralela, caching) |
| Refactor de eficiencia (`refactor`) | Reestructuración que preserva comportamiento (evitar rebuild total, patch incremental, agrupar reflow) |
| Endurecimiento (`harden`) | Races, fugas de listeners, cleanup, robustez del ciclo async |

> **No invade el dominio de `mode-storybook-doc`**: NO añade ni cambia features del chrome
> (controles, addons, widgets, tabs) ni escribe stories/overviews. Cambiar **lo que el storybook
> hace** es de `+DOC` op `engine`; `+ENGINE` cambia **cómo de rápido/robusto** lo hace, con el
> comportamiento observable y el contrato `SB.register`/`SB.helpers` intactos. Puede reimplementar
> el INTERIOR de esas APIs para acelerarlas, nunca su firma ni su salida.
>
> **No invade el dominio de `mode-ds`**: NO escribe en `scss/` ni `cds-statics/`; los LEE solo
> para medir/verificar. Única escritura fuera de `fourty/storybook/`: el loader/orden de `<script>`
> en `fourty/index.html`.

### Dominios mode-email *(standalone · agnóstico · `externals/emailing/`)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Email HTML cross-client | Maquetación con tablas robusta para Gmail, Outlook (motor Word) y Apple Mail |
| Compatibilidad de clientes | CSS inline, condicionales MSO/VML, anchos fijos, fallbacks de imagen y dark mode |
| Submodos `[EMAIL: NEW · QA · FIX · COMPONENT]` | Alta de plantilla · QA con checklist de 7 niveles · fix dirigido · componente de email |

> **No usa 42DS ni el storybook**: su knowledge vive en `externals/emailing/knowledges/mode-email.md`. Es **standalone y no combinable**, con prefijo propio `[EMAIL]` / `[EMAIL: SUBMODO]` (no `[MODE: ...]`).

### Dominios mode-beta-css *(operacional · standalone · `cds-statics/beta/`)*

| Dominio | Qué evalúa / produce |
|---------|----------------------|
| Override CSS plano (`add` · `modify`) | `cds-statics/beta/<feature>.css` — pisa reglas del DS en cascada; clases canónicas, especificidad mínima, variables de marca, sin pipeline SCSS |
| Registro `.md` (`register`) | `cds-statics/beta/<feature>.md` hermano (mismo nombre base): ficha + **timeline** de cambios (qué/cuándo/por qué/quién) + inventario de overrides 1:1 con el `.css` |
| Ciclo de vida (`promote` · `retire`) | Marca en el registro la promoción a `scss/` o la retirada; borra el `.css` (reversible primero, definitivo con confirmación); el `.md` se conserva como traza |
| Salud de la carpeta (`audit`) | Drift `.css`↔`.md`, registros huérfanos, fechas de revisión/`@expires` vencidas, `!important` sin justificar |

> **No invade el dominio de `mode-ds` / `mode-poc`**: NO crea componentes/clases nuevas
> ni escribe en `scss/`. Solo overrides transitorios en `beta/`. Lo permanente/global y la
> **promoción** real a `scss/` se hacen con `[MODE: 42DS+SCSS]` en invocación separada.
>
> **No se confunde con `mode-doc` ni `mode-storybook-doc`**: aquel produce Markdown técnico
> fuera del storybook; este produce un **registro `.md` acoplado a un `.css` de `beta/`**.
> `mode-storybook-doc` opera en `fourty/storybook/`, no en `cds-statics/beta/`.
>
> **Excepción consciente a la regla "no editar `cds-statics/`"**: `cds-statics/beta/` es la
> única carpeta de artefactos escrita a mano (overrides fuera del pipeline); este modo es su
> dueño. La fuente de la convención es `cds-statics/beta/README.md`.

---

## 2. Zonas de solapamiento resueltas

Dos zonas donde los dominios se tocan. La gobernanza define quién hace qué en cada caso.

### Zona A — Contraste

| Situación | mode-ux evalúa | mode-ui evalúa |
|-----------|---------------|----------------|
| Solo | Check binario WCAG (pasa/no pasa 4.5:1) | Análisis sistémico de paleta + contraste en imágenes |
| **Combinados** | Check binario WCAG (no lo repite mode-ui) | Solo análisis sistémico: hue shift, coherencia, contraste sobre foto |

> **Regla**: en combinación, `mode-ux` es dueño del veredicto WCAG. `mode-ui` analiza la paleta como sistema visual, sin repetir el ratio.

### Zona B — Focus visible

| Situación | mode-ux evalúa | mode-ui evalúa |
|-----------|---------------|----------------|
| Solo | Presencia/ausencia del indicador de foco | Suficiencia visual del indicador (contraste, tamaño, estilo) |
| **Combinados** | Presencia/ausencia (binario) | Solo suficiencia visual (no repite la presencia) |

> **Regla**: en combinación, `mode-ux` detecta si existe; `mode-ui` evalúa si es perceptible. Son complementarios, no duplicados.

---

## 3. Sintaxis de composición

Los modes se combinan usando `+` en el prefijo. El orden define la secuencia de ejecución.

> **Excepción — `[MODE: STORYBOOK]`**: queda **fuera** de este sistema de composición. Es un modo exclusivo y standalone; no se combina con `+` ni aparece en la matriz de combinaciones de abajo. Si tras generar/auditar stories se necesita evaluar la capa visual del componente renderizado, se invoca `[MODE: UI]` por separado.
>
> **Excepción — `[MODE: STORYBOOK+MIGRATE]`, `[MODE: STORYBOOK+DOC]` y `[MODE: STORYBOOK+ENGINE]`**: los tres quedan también **fuera** de este sistema de composición. Los sufijos `+MIGRATE`, `+DOC` y `+ENGINE` son **especializaciones** del modo STORYBOOK del 42DS POC interno, **NO** combinaciones con otros modes. No se pueden combinar con otros sufijos compositivos como `+UX` o `+UI`, ni con modes de la familia 42DS. Si después de operar sobre el storybook POC se necesita evaluar UX/UI del componente renderizado, se invoca `[MODE: UX]` o `[MODE: UI]` por separado, apuntando al iframe del canvas o al markup de la story.
>
> **Excepción — `[MODE: FRONT+DOC]`, `[MODE: DEV+DOC]`, `[MODE: CHANGE+DOC]` y `[MODE: ADR]`**: son modes documentales standalone. No participan en la matriz de composición porque su output es Markdown complementario, no HTML, SCSS, JS ni stories. Si después de documentar hace falta tocar implementación, se invoca el mode constructor correspondiente por separado.
>
> **Excepción — `[EMAIL]` (y `[EMAIL: SUBMODO]`)**: emailing es un mode generativo **standalone con prefijo propio** (`[EMAIL]` / `[EMAIL: NEW·QA·FIX·COMPONENT]`, no `[MODE: ...]`). Queda fuera de la matriz de composición y no se combina con `+`. Si una landing derivada necesita auditoría UX/UI, se invoca el mode correspondiente por separado.
>
> **Excepción — `[MODE: BETA+CSS]`**: modo operacional **standalone** sobre `cds-statics/beta/` (overrides CSS a mano + su registro `.md`). El `+CSS` es parte del nombre del modo, **no** una composición. Queda fuera de la matriz y no se combina con `+UX`/`+UI` ni con la familia 42DS/DOC. Si después hace falta auditar el render o promover el override a `scss/`, se invoca `[MODE: UX]`/`[MODE: UI]` o `[MODE: 42DS+SCSS]` por separado.

```
[MODE: UX]              → Genera LF (HTML semántico, sin DS) · Evalúa UX
[MODE: UI]              → Genera LF (HTML + CSS, sin DS)     · Evalúa UI visual
[MODE: UX+UI]           → Genera HF (HTML + CSS, sin DS) con UX y UI integrados
[MODE: 42DS+HF+CSS]     → Genera HF con clases 42DS + CSS inline
[MODE: 42DS+HF+SCSS]    → Genera HF con clases 42DS + parciales SCSS
[MODE: 42DS+LF]         → Boceto rápido con clases 42DS
[MODE: 42DS+HF]         → POC completo con clases 42DS
[MODE: 42DS+AI]         → POC con interfaz de IA
[MODE: 42DS+REUSE-FIRST]→ POC reuse-first: rastrea el DS, reusa antes de crear,
                           lo nuevo nace promovible (`[CANDIDATO DS]`)
[MODE: 42DS+REUSE]      → Diseño/retoque reuse-only: solo items ya construidos del DS
[MODE: 42DS+REUSE+CSS]  → Igual que el anterior, pero con CSS local ad hoc dentro del HTML
[MODE: 42DS+SCSS]       → Construye componente SCSS para el DS
[MODE: 42DS+JS]         → Construye o mantiene el JavaScript del DS en cds-statics/js/
[MODE: FRONT+DOC]       → Genera .md para front: anatomy, clases, dependencias y guía de integración
[MODE: DEV+DOC]         → Genera .md técnico para desarrollo: arquitectura, contratos y riesgos
[MODE: CHANGE+DOC]      → Genera .md de handoff: qué se hizo, impacto, migración y pendientes
[MODE: ADR]             → Registra una decisión técnica en formato ADR
[EMAIL]                 → Genera email HTML cross-client (Gmail · Outlook · Apple Mail) · standalone, prefijo propio
[MODE: 42DS+HF+UX]      → Genera POC (HF) y luego audita su UX
[MODE: 42DS+HF+UI]      → Genera POC (HF) y luego audita su UI
[MODE: 42DS+HF+UX+UI]   → Genera POC y audita completo (UX + UI)
[MODE: 42DS+LF+UX]      → Genera boceto (LF) y valida UX mínima
[MODE: 42DS+REUSE-FIRST+UX]    → POC reuse-first → audita UX
[MODE: 42DS+REUSE-FIRST+UI]    → POC reuse-first → audita UI
[MODE: 42DS+REUSE-FIRST+UX+UI] → POC reuse-first → auditoría completa
[MODE: 42DS+REUSE+UX]   → Reuse-only → audita UX
[MODE: 42DS+REUSE+UI]   → Reuse-only → audita UI
[MODE: 42DS+REUSE+UX+UI]→ Reuse-only → auditoría completa
[MODE: 42DS+SCSS+UI]    → Construye componente DS y valida su capa visual
```

### Combinaciones válidas

| Combinación | Válida | Naturaleza | Motivo |
|-------------|--------|-----------|--------|
| `UX` | ✓ | Generativo LF (sin DS) / Evaluativo | Auto-detecta según input |
| `UI` | ✓ | Generativo LF (sin DS) / Evaluativo | Auto-detecta según input |
| `UX+UI` | ✓ | Generativo HF (sin DS) | UX + UI diseñan juntos → HTML + CSS completo |
| `42DS+HF+CSS` | ✓ | Generativo HF (42DS + CSS) | Implementación 42DS con CSS custom inline |
| `42DS+HF+SCSS` | ✓ | Generativo HF (42DS + SCSS) | Implementación 42DS con SCSS parciales |
| `42DS+LF` | ✓ | Generativo LF (42DS) | Boceto rápido |
| `42DS+HF` | ✓ | Generativo HF (42DS) | POC completo |
| `42DS+AI` | ✓ | Generativo HF (42DS + AI) | Interfaces con modelo de IA |
| `42DS+REUSE-FIRST` | ✓ | Generativo HF (42DS reuse-first) | Rastrea el DS, reusa antes de crear, lo nuevo nace promovible |
| `42DS+REUSE` | ✓ | Generativo HF (42DS reuse-only) | Recompone con inventario real del DS, sin tocar SCSS ni crear JS |
| `42DS+REUSE+CSS` | ✓ | Generativo HF (42DS reuse-only + CSS local) | Igual que el anterior, pero permite un `<style>` ad hoc dentro del HTML |
| `FRONT+DOC` | ✓ | Generativo | Documentación Markdown orientada a front y handoff de integración |
| `DEV+DOC` | ✓ | Generativo | Documentación Markdown técnica para desarrollo |
| `CHANGE+DOC` | ✓ | Generativo | Documento Markdown de cambios, impacto y pendientes |
| `ADR` | ✓ | Generativo | Registro de decisión técnica |
| `EMAIL` | ✓ * | Generativo (standalone) | Email HTML cross-client; prefijo propio `[EMAIL]`/`[EMAIL: SUBMODO]`, fuera de la matriz |
| `EMAIL+UX` · `EMAIL+42DS…` | ✗ | — | `[EMAIL]` no combina con `+`; para auditar/derivar, invocar el otro mode por separado |
| `42DS+HF+UX` | ✓ | Generativo → Evaluativo | 42DS genera → UX audita |
| `42DS+HF+UI` | ✓ | Generativo → Evaluativo | 42DS genera → UI audita |
| `42DS+HF+UX+UI` | ✓ | Generativo → Evaluativo | 42DS genera → auditoría completa |
| `42DS+LF+UX` | ✓ | Generativo → Evaluativo | Boceto → validación UX mínima |
| `42DS+REUSE-FIRST+UX` | ✓ | Generativo → Evaluativo | POC reuse-first → UX audita |
| `42DS+REUSE-FIRST+UI` | ✓ | Generativo → Evaluativo | POC reuse-first → UI audita |
| `42DS+REUSE-FIRST+UX+UI` | ✓ | Generativo → Evaluativo | POC reuse-first → auditoría completa |
| `42DS+REUSE+UX` | ✓ | Generativo → Evaluativo | Reuse-only → UX audita |
| `42DS+REUSE+UI` | ✓ | Generativo → Evaluativo | Reuse-only → UI audita |
| `42DS+REUSE+UX+UI` | ✓ | Generativo → Evaluativo | Reuse-only → auditoría completa |
| `42DS+SCSS+UI` | ✓ | Generativo → Evaluativo | DS construye → UI valida la capa visual |
| `42DS+JS` | ✓ | Generativo | Construye o mantiene behaviours del DS sin tocar frameworks |
| `42DS+REUSE+CSS+UI` | ✗ | — | `+CSS` es submodo interno de construcción; si luego quieres auditar, invoca `[MODE: UI]` por separado |
| `UX+42DS+HF` | ✓ | Generativo | UX diseña arquitectura → 42DS implementa |
| `UX+UI+42DS+HF` | ✓ | Generativo | Flujo de diseño completo → 42DS implementa |
| `42DS+LF+HF` | ✗ | — | Dos variantes del mismo mode |
| `UX+UX` | ✗ | — | Mismo mode dos veces |
| `42DS+JS+SCSS` | ✗ | — | JS del DS y SCSS del DS son modos hermanos; si hacen falta ambos, se ejecutan en invocaciones separadas o con handoff explícito |
| `42DS+REUSE-FIRST+HF` | ✗ | — | Dos generadores POC |
| `42DS+REUSE-FIRST+SCSS` | ✗ | — | `mode-ds` se invoca **después** y por separado, sobre `[CANDIDATO DS]` aprobados |
| `STORYBOOK+MIGRATE` | ✓ * | Operacional | *Sufijo* de mode-storybook-migrate, no combinación. Standalone, fuera de la matriz |
| `STORYBOOK+DOC` | ✓ * | Operacional | *Sufijo* de mode-storybook-doc, no combinación. Standalone, fuera de la matriz |
| `STORYBOOK+ENGINE` | ✓ * | Operacional no-funcional | *Sufijo* de mode-storybook-engine (rendimiento/auditoría del motor, behavior-preserving), no combinación. Standalone, fuera de la matriz |
| `STORYBOOK+ENGINE+UX` · `STORYBOOK+ENGINE+…` | ✗ | — | El sufijo `+ENGINE` no combina con otros modes. Invocar `[MODE: UI]`/`[MODE: UX]` por separado |
| `BETA+CSS` | ✓ * | Operacional | Modo de `cds-statics/beta/` (override CSS + registro `.md`). `+CSS` es parte del nombre, no combinación. Standalone, fuera de la matriz |
| `BETA+CSS+UX` · `BETA+CSS+42DS…` | ✗ | — | `BETA+CSS` no combina con `+`; para auditar/promover, invocar el otro mode por separado |
| `STORYBOOK+MIGRATE+UI` | ✗ | — | Los sufijos `+MIGRATE`/`+DOC` no combinan con otros modes. Invocar `[MODE: UI]` por separado |
| `STORYBOOK+DOC+UX` | ✗ | — | Igual que la anterior |
| `FRONT+DOC+UX` | ✗ | — | La familia DOC genera Markdown standalone; si necesitas auditoría, invoca UX por separado |
| `DEV+DOC+42DS+JS` | ✗ | — | Primero documenta o primero implementa, pero no como composición del sistema |

---

## 4. Protocolos de ejecución

### Protocolo A — UX+UI (auto-detecta según input)

`[MODE: UX+UI]` **auto-detecta** si el input es una descripción (→ genera) o una interfaz existente (→ evalúa):

#### A1 — Generativo HF (input = descripción / idea)

```
Naturaleza: GENERATIVO — produce HTML + CSS sin 42DS, alta fidelidad

┌──────────────┐
│   mode-ux    │  ← define arquitectura de interacción, estructura semántica
└──────┬───────┘
       │ HTML semántico + anotaciones [UX]
       ▼
┌──────────────┐
│   mode-ui    │  ← añade layer visual completo: tokens, CSS, jerarquía, color, tipo
└──────┬───────┘
       │ HTML + CSS inline completo
       ▼
  POC HF sin DS
```

Pasos:
1. `mode-ux` define la arquitectura de interacción:
   — Análisis UX (Hick, Fitts, Miller, Don't Make Me Think)
   — Genera el HTML semántico del happy path + todos los estados
   — Anotaciones `<!-- [UX] Principio → decisión -->`
2. `mode-ui` recibe el HTML y aplica la capa visual completa:
   — Define design tokens en `:root`
   — Escribe el CSS en `<style>` para todos los componentes y estados
   — Verifica contraste, tipografía, espaciado, motion
3. Resultado: un único archivo HTML con `<style>` completo
4. Output: `fourty/pocs/[proyecto]/[pantalla]-hf.html`
5. Reporte final: decisions UX + decisions UI + suposiciones

#### A2 — Evaluativo combinado (input = interfaz existente)

```
Naturaleza: EVALUATIVO — auditoría paralela de UX y UI

┌──────────────┐    ┌──────────────┐
│   mode-ux    │    │   mode-ui    │
│  (evaluativo)│    │  (evaluativo)│
└──────┬───────┘    └──────┬───────┘
       └─────────┬─────────┘
                 ▼
         Informe combinado (§ outputs combinados)
```

Pasos:
1. Leer la interfaz (única lectura, compartida)
2. `mode-ux` evalúa sus dominios → informe parcial UX
3. `mode-ui` evalúa sus dominios → informe parcial UI
4. Merge: informe unificado con sección por mode + puntuaciones separadas
5. Aplicar reglas de zona de solapamiento (§ Zona A y B)

### Protocolo B — Generación → auditoría (generador + evaluador)

```
Ejemplo: [MODE: 42DS+HF+UX+UI]
Naturaleza: GENERATIVO → EVALUATIVO en secuencia

┌──────────────┐
│   mode-poc   │  ← genera el HTML con clases 42DS
│    (hf)      │
└──────┬───────┘
       │ HTML generado
       ▼
┌──────────────┐    ┌──────────────┐
│   mode-ux    │    │   mode-ui    │  ← auditan en paralelo
└──────┬───────┘    └──────┬───────┘
       └─────────┬─────────┘
                 ▼
         Informe combinado
```

Pasos:
1. `mode-poc` ejecuta completo (hypothesis → generación → autovalidación 42DS)
2. El HTML generado pasa como input a los evaluadores
3. `mode-ux` y `mode-ui` auditan en paralelo aplicando las reglas de zona de solapamiento
4. Merge final: reporte de generación + auditoría UX + auditoría UI

> El mismo Protocolo B aplica a `[MODE: 42DS+REUSE-FIRST+UX/UI]` y `[MODE: 42DS+REUSE+UX/UI]`: primero genera el mode 42DS correspondiente y después auditan `mode-ux` y/o `mode-ui`.

### Protocolo C — Construcción → validación (SCSS DS + UI)

```
Ejemplo: [MODE: 42DS+SCSS+UI]

┌──────────────┐
│   mode-ds    │  ← construye el SCSS (doc visual → story de storybook)
└──────┬───────┘
       │ render de la story (storybook)
       ▼
┌──────────────┐
│   mode-ui    │  ← audita la capa visual del componente
└──────────────┘
```

Pasos:
1. `mode-ds` construye el SCSS del componente; su documentación visual es una story del storybook
   (autorada con `[MODE: STORYBOOK+MIGRATE/DOC]`) — el showroom HTML clásico está decomisionado
2. El **render de esa story** (storybook) es el input de `mode-ui`
3. `mode-ui` audita solo la capa visual del componente (no el código SCSS)

> El **Protocolo A2** (evaluativo combinado) también se activa dentro de `[MODE: 42DS+HF+UX+UI]` y combinaciones equivalentes post-generación: el HTML del generador pasa como input compartido a UX y UI, que auditan en paralelo según A2.

---

## 5. Outputs combinados

### Formato de informe generativo combinado (UX+UI)

```
## [MODE: UX+UI] — Generación HF: [nombre del artefacto]

### Decisions UX aplicadas
- [Principio] → [decisión de interacción/estructura]
- ...

### Decisions UI aplicadas
- [Principio] → [decisión visual]
- ...

### Suposiciones
- ...

### Para escalar a 42DS
- [qué habría que adaptar si se integra en el DS]

[HTML generado — fourty/pocs/[proyecto]/[pantalla]-hf.html]
```

### Formato de informe evaluativo combinado (UX + UI)

```
## Auditoría combinada: [nombre del artefacto]

### UX — Puntuación: X.X / 1.0
| Categoría                    | Peso | Puntuación |
|------------------------------|------|------------|
| Jerarquía de acciones        | 0.25 | X.X        |
| Feedback y estados           | 0.25 | X.X        |
| Formularios e inputs         | 0.20 | X.X        |
| Navegación y orientación     | 0.15 | X.X        |
| Accesibilidad                | 0.15 | X.X        |

### UI — Puntuación: X.X / 1.0
| Categoría                    | Peso | Puntuación |
|------------------------------|------|------------|
| Jerarquía visual y espaciado | 0.30 | X.X        |
| Color y contraste            | 0.25 | X.X        |
| Tipografía y legibilidad     | 0.20 | X.X        |
| Motion y microinteracciones  | 0.10 | X.X        |
| Imágenes e ilustración       | 0.15 | X.X        |

### Issues combinados (por prioridad)
- [CRÍTICO · UX] descripción → corrección
- [CRÍTICO · UI] descripción → corrección
- [MEDIO · UX] descripción → corrección
- [MEDIO · UI] descripción → corrección
- [MENOR · UX] descripción → corrección
- [MENOR · UI] descripción → corrección

### Veredicts de zonas de solapamiento
- Contraste WCAG (mode-ux): PASA / NO PASA
- Contraste sistémico (mode-ui): [análisis de paleta]
- Focus visible — presencia (mode-ux): SÍ / NO
- Focus visible — calidad visual (mode-ui): [evaluación]
```

> Las puntuaciones UX y UI se mantienen **siempre separadas**. No se promedian: son métricas de naturaleza distinta y combinarlas en un solo número pierde información.

---

## 6. Reglas de prioridad (conflict resolution)

**Premisa**: generadores y evaluadores no compiten nunca — operan en fases distintas y sobre dominios distintos. Los conflictos solo surgen entre evaluadores (`mode-ux` y `mode-ui`) cuando ambos analizan el mismo elemento.

### Entre evaluadores (mode-ux vs mode-ui)

| Territorio en disputa | Dueño | Motivo |
|-----------------------|-------|--------|
| Contraste WCAG (ratio binario pass/fail) | `mode-ux` | Criterio de accesibilidad funcional, no estético |
| Análisis sistémico de paleta | `mode-ui` | Criterio visual y de coherencia de marca |
| Focus visible — presencia (¿existe?) | `mode-ux` | Requisito funcional de accesibilidad |
| Focus visible — calidad (¿es perceptible?) | `mode-ui` | Criterio de calidad visual |
| Cualquier decisión de flujo o interacción | `mode-ux` | Dominio exclusivo |
| Cualquier decisión tipográfica o de espaciado | `mode-ui` | Dominio exclusivo |

### Entre generadores (modo de operación, no conflicto)

`mode-poc` y `mode-ds` no compiten: generan artefactos distintos (POC vs componente DS) y nunca se activan juntos sobre el mismo output.

`mode-ds` y `mode-ds-js` tampoco compiten: uno gobierna `scss/fourties/` y el otro gobierna
`cds-statics/js/`. Si una pieza necesita cambios coordinados en estilo y comportamiento, se
resuelven como dos ejecuciones hermanas con handoff explícito, no como una combinación con `+`.

`mode-poc` y `mode-poc-plus` son **alternativos**, no combinables. Producen ambos POCs pero con filosofías opuestas: `mode-poc` con Lite + `.poc-` (rápido, throwaway); `mode-poc-plus` con DS completo + extensiones canónicas (más lento, deja el DS más rico). El usuario elige uno u otro según objetivo. Para una pieza concreta dentro de un `mode-poc-plus` aprobada como `[CANDIDATO DS]`, la promoción posterior se hace con `mode-ds` **en una invocación separada**, no en la misma ejecución.

`mode-reuse-ds` es también **alternativo** frente a `mode-poc` y `mode-poc-plus`: resuelve diseño nuevo o rediseño solo con el inventario ya construido. Si necesita crear variantes, SCSS o JS, deja de ser `mode-reuse-ds` y debe escalarse a `mode-poc-plus` o `mode-ds`.

`mode-ux` (generativo) y `mode-ui` (generativo) cooperan en `[MODE: UX+UI]`: UX define la estructura, UI aplica el visual. El orden es siempre UX → UI.

### Regla de override única

> Cuando `mode-ux` emite un veredicto WCAG de **no pasa**, este prevalece sobre cualquier decisión estética de `mode-ui` que lo contradiga. Es el único override cross-mode definido en este sistema.

**Ejemplos**:
- `mode-ux` dice "el contraste no pasa WCAG" → override sobre cualquier decisión de paleta de `mode-ui`
- `mode-ui` dice "este espaciado rompe la jerarquía visual" → no afecta las decisiones de flujo de `mode-ux`
- `mode-poc` genera con `ft-btn--primary` → `mode-ux` puede señalar que hay dos primarios en el informe, pero no modifica el HTML generado

---

## 7. Jerarquía de knowledge

El sistema tiene dos niveles de knowledge con naturalezas distintas. En caso de aparente contradicción entre ellos, esta tabla define quién prevalece:

| Nivel | Ubicación | Formato | Autoridad sobre |
|-------|-----------|---------|-----------------|
| **Conceptual** | `mind-system/knowledges/` | Markdown (meta/concepts/rules/checklist) | Principios, razonamiento, criterios de evaluación |
| **Operativo** | `AI/knowledge/` o documentación operativa equivalente del repositorio | JSON / Markdown de datos | Implementación concreta: clases exactas, componentes disponibles, excepciones registradas |

**Regla**: cuando ambos niveles cubren el mismo tema, el knowledge operativo (si existe en el runtime) prevalece sobre los detalles de implementación; el knowledge conceptual (`knowledges/`) prevalece sobre los principios y el razonamiento. Si no existe capa operativa, el agente debe usar la estructura real del repositorio como fuente de verdad.

**Ejemplo**:
- `knowledges/42ds/atomic-design.md` explica el sistema de prefijos `.ft-` → autoridad en el porqué
- `AI/knowledge/42ds/components-lite.json` o un inventario operativo equivalente lista los componentes disponibles → autoridad en el qué usar

---

## 8. Regla de oro

> Ningún mode repite trabajo de otro en una ejecución combinada. Si un dominio ya fue evaluado, el segundo mode lo referencia ("ver análisis UX — contraste") en lugar de re-evaluarlo.
