# Mode: 42DS+REUSE-FIRST — Capa 3 (reuse-first)

Genera POCs HTML con clases 42DS partiendo de un rastreo exhaustivo del DS y reutilizando lo que ya existe antes de crear nada. Lo que se cree nuevo nace pensado para el DS, no como código throwaway del POC.

> Variante "discovery-first" del modo POC. Comparte la mecánica de `mode-poc(hf)` pero antepone una fase de **rastreo + plan de reutilización** y prohíbe el namespace `.poc-` salvo justificación explícita. El objetivo es que cada POC deje el DS **más rico**, no más fragmentado.

---

## meta

```
rol:          Generador de POCs HTML 42DS con discovery-first y reutilización máxima
scope:        Produce archivos en fourty/pocs/[proyecto]/ + (si hace falta) parciales SCSS
              promovibles al DS en scss/fourties/ con anotación [CANDIDATO DS]
variantes:    única — reuse-first siempre activa
fidelidad:    HF (todos los estados, accesibilidad completa) por defecto
agent_tags:   ux, ui, copy, flow, 42ds-trace
no hace:      generar SCSS .poc- throwaway (lo prohíbe) ·
              componentes redundantes con piezas existentes del DS ·
              evaluar o puntuar (delegar a mode-ux / mode-ui) ·
              modificar scss/abstracts/ ni promover al DS sin aprobación explícita
```

**Diferencia clave vs `mode-poc`**:

| Aspecto | `mode-poc` (lf/hf/ai/css/scss) | `mode-poc-plus` (este modo) |
|---|---|---|
| Inventario que considera | Lite (subconjunto curado) | DS completo: atoms · molecules · organisms · helpers · JS · partials |
| Decisión por defecto | Generar pantalla con Lite + custom `.poc-` | Reusar tal cual lo que ya existe en el DS |
| CSS custom | `.poc-` en `<style>` o `scss/pocs/` | Modificadores `--variante` sobre `.ft-*` existentes o nuevos `.ft-*` promovibles |
| Output extra | Hypothesis + estados | Hypothesis + estados + **reuse-trace** (qué se reusó, qué se extendió, qué es nuevo) |
| Resultado para el DS | Neutral (POC desechable) | El DS queda igual o más rico (nunca más fragmentado) |

---

## knowledge

### Generalista — knowledges/

| Módulo | Tag | Cargar |
|--------|-----|--------|
| `knowledges/ux/dont-make-me-think` | ux | ✓ |
| `knowledges/ux/strategic-writing-for-ux` | copy | ✓ |
| `knowledges/ux/laws-of-ux` | ux | ✓ |
| `knowledges/ux/nielsen-heuristics` | ux | ✓ |
| `knowledges/ux/microinteractions` | ux | ✓ |
| `knowledges/ui/refactoring-ui` | ui | ✓ |
| `knowledges/ui/practical-ui` | ui | ✓ |
| `knowledges/ui/color-theory` | ui | Solo si el rastreo identifica color como vector custom |

### Front — knowledges/front/

| Módulo | Tag | Cargar |
|--------|-----|--------|
| `knowledges/front/css-architecture` | front | Solo si el rastreo deriva en extender o crear SCSS |
| `knowledges/front/scss-patterns` | front · scss | **Solo si extiende (`&--variante`) o crea un parcial canónico** en `scss/fourties/` (`[CANDIDATO DS]`) — es el canon de cómo se escribe el SCSS del DS (anatomía, colocación, estados, estilo, mixins). Si el rastreo se resuelve 100% reusando, no hace falta |

### Conceptual 42DS — knowledges/42ds/

| Módulo | Cargar |
|--------|--------|
| `knowledges/42ds/atomic-design` | ✓ (siempre — guía la decisión atom/molecule/organism al extender) |
| `knowledges/42ds/grid-system` | ✓ |
| `knowledges/42ds/helpers-system` | ✓ |
| `knowledges/42ds/poc-system` | ✓ |
| `knowledges/42ds/brand-system` | ✓ |
| `knowledges/42ds/scss-pipeline` | ✓ (necesario porque cualquier extensión es SCSS canónico, no `.poc-`) |

### Operativo 42DS — capa del repositorio

Este modo **depende fuertemente del rastreo del repositorio**. Si la capa operativa `AI/knowledge/` no existe, debe usar las fuentes reales:

| Recurso | Para qué | Obligatorio |
|---------|----------|-------------|
| `CLAUDE.md` / `AGENTS.md` raíz | Inventario global, convenciones, modos | ✓ |
| `fourty/__old-showroom/atoms/README.md` | Inventario de 26 atoms | ✓ |
| `fourty/__old-showroom/molecules/README.md` | Inventario de 73 molecules | ✓ |
| `fourty/__old-showroom/organisms/README.md` | Inventario de 49 organisms | ✓ |
| `fourty/__old-showroom/helpers/README.md` | Inventario completo de helpers | ✓ |
| `scss/abstracts/README.md` | Mixins y variables disponibles para extender | ✓ |
| `scss/fourties/[nivel]/[nombre]/_[nombre].scss` | Modificadores existentes de un componente concreto | Al considerar extender |
| `cds-statics/js/README.md` | Inventario JS canónico vs legacy vs deprecated | ✓ |
| `cds-statics/js/[carpeta]/README.md` | Detalle de API por subsistema (form, modal, masthead, custom) | Si se usa ese subsistema |
| `AI/knowledge/42ds/components-lite.json` o inventario operativo equivalente | Acceso estructurado al catálogo | Si existe |
| `AI/knowledge/42ds/classes-cheatsheet.md` o cheatsheet equivalente | Lookup rápido de clases BEM | Si existe |

> Si la capa operativa `AI/knowledge/` no está disponible, **el rastreo se hace contra el código fuente real** (`scss/fourties/`, `fourty/`, `cds-statics/`) y los READMEs del repositorio. Nunca inventar componentes o clases que no existan en estas fuentes.

---

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Descripción del flujo o pantalla | Usuario | Sí |
| Nombre del proyecto/POC | Usuario o inferido | Sí |
| Marca objetivo | Usuario | No (default: `ux`) |
| Restricciones de reutilización adicionales | Usuario | No |
| Anchos/altos esperados, breakpoints clave | Usuario o inferido | No |

---

## process

```
ACTIVADO POR: [MODE: 42DS+REUSE-FIRST]
OBJETIVO:     POC HF con clases 42DS, reuse-first, extensiones canónicas si hace falta,
              cero código throwaway `.poc-` salvo justificación.

1. Formular hypothesis (Lean UX) — igual que mode-poc(hf):
   "Creemos que [usuario] necesita [X].
    Si construimos [esto], logrará [resultado].
    La assumption más arriesgada es [Y]."
   → Presentar al usuario para confirmar (máx. 3 líneas).

2. FASE 1 — Discovery (rastreo del DS):
   2.1. Cargar §knowledge conceptual y operativo.
   2.2. Listar las "piezas funcionales" que la pantalla necesita
        (header, lista, filtro, modal, formulario, card de resultado, etc.).
   2.3. Para CADA pieza, buscar en este orden:
        a) Componente existente que la cubra tal cual
           → leer `scss/fourties/[nivel]/[nombre]/_[nombre].scss`
             para confirmar modificadores disponibles.
        b) Componente existente + un modificador que ya existe
           (`--variante`) que la cubre.
        c) Componente existente que NO tiene esta variante todavía
           pero podría aceptarla como `--variante` nueva sin romper su BEM.
        d) Helper o utilidad (helpers, grid, espaciados) que cubra
           el caso sin necesidad de tocar componentes.
        e) Pieza realmente nueva (no existe nada parecido en el DS).
   2.4. Para JS interactivo, buscar primero en `cds-statics/js/[carpeta]/`
        (modal, dropdown, accordion, form, az-list, action-bar…) antes
        de plantear nada custom.

3. FASE 2 — Plan de reutilización:
   Producir tabla de decisión (formato §outputs → reuse-trace) con:
     — Pieza · Decisión (reusar | extender | crear) · Componente · Razón
   Presentar la tabla al usuario y CONFIRMAR antes de generar HTML/SCSS.
   Si el usuario aprueba cambios, ajustar.

4. FASE 3 — Generación:
   4.1. HTML por pantalla con todos los estados:
        happy path · loading · error · vacío · éxito
   4.2. Cada componente reusado usa SUS clases BEM canónicas exactas
        (consultadas en el rastreo, no inventadas).
   4.3. Si una pieza requiere extensión:
        — Crear o ampliar el parcial SCSS canónico en
          `scss/fourties/[nivel]/[nombre]/_[nombre].scss`
          añadiendo el modificador `&--[variante]` siguiendo §rules → SCSS.
        — Anotar el modificador con comentario:
          `// [CANDIDATO DS] añadido en POC [nombre] — promover si se aprueba`
        — NO crear copias en scss/pocs/.
   4.4. Si una pieza es realmente nueva:
        — Crear `scss/fourties/[nivel]/[nombre-nuevo]/_[nombre-nuevo].scss`
          siguiendo todas las convenciones BEM del DS (§rules → SCSS nuevo).
        — Bloquear el commit a marcas hasta que el equipo de DS apruebe la
          promoción (NO registrar en `[marca]-core.scss` aún).
        — Documentar el componente nuevo en la documentación del POC
          (no en el showroom global todavía).
   4.5. JS: usar el canónico de `cds-statics/js/` cargándolo con las rutas
        relativas estándar de POCs. Si se necesita lógica nueva específica
        del POC, ponerla en `fourty/pocs/[proyecto]/js/` siguiendo el
        patrón canónico (JSDoc, BEM hooks, idempotente).

5. FASE 4 — Accesibilidad completa:
   ARIA roles y atributos · jerarquía de headings · foco gestionado ·
   keyboard nav · prefers-reduced-motion · contraste WCAG AA.

6. FASE 5 — Reporte (§outputs):
   — Hypothesis
   — Tabla reuse-trace final (qué se reusó · qué se extendió · qué es nuevo)
   — Excepciones a Lite (si las hay, justificadas)
   — Lista de [CANDIDATO DS] generados (resumen para discusión con DS team)
   — Rutas exactas de cada archivo creado o tocado
```

---

## rules

### Jerarquía de decisión (no-negociable)

Para cada pieza, este orden es **estricto**:

```
1. Reusar tal cual         → 0 SCSS nuevo, 0 modificadores nuevos
2. Reusar con modificador existente → 0 SCSS nuevo
3. Extender con modificador nuevo `--variante`
                           → SCSS canónico en scss/fourties/, marcado [CANDIDATO DS]
4. Crear componente nuevo  → SCSS canónico en scss/fourties/, marcado [CANDIDATO DS],
                             diseñado para promoción, NO registrado en cores todavía
5. Custom .poc-            → SOLO si pasa el "test de excepción" §rules → excepción .poc-
```

> Saltarse pasos requiere justificación explícita en el reuse-trace. "No lo encontré" no es justificación — significa rastreo insuficiente: volver a §process FASE 1.

### SCSS al extender un componente existente

```scss
// scss/fourties/[nivel]/[nombre]/_[nombre].scss
// (archivo ya existente — solo AÑADIR, nunca modificar lo que ya hay sin aprobación)

.ft-[nombre] {
    $self: &;

    // … reglas existentes …

    // [CANDIDATO DS] · POC [nombre-poc] · 2026-XX-XX
    // Razón: [por qué se necesitó]
    &--[variante-nueva] {
        // Solo var(--), mixins de abstracts, nada hardcoded
        color: var(--color-secondary);
        @include padding(0.5rem 1rem);
    }
}
```

### SCSS al crear un componente nuevo

```scss
// scss/fourties/[nivel]/[nombre-nuevo]/_[nombre-nuevo].scss
// [CANDIDATO DS] · POC [nombre-poc] · 2026-XX-XX
// Razón: [por qué no hay nada equivalente en el DS]
// Pendiente: aprobación de DS team para registrar en [marca]-core.scss

@import "../../../abstracts/abstracts.scss";
@import "../../../vendors/bourbon/bourbon";

.ft-[mol|org]-[nombre-nuevo] {
    $self: &;

    color: var(--color-black);
    @include position(relative);
    @include padding(1rem);

    &__elemento { /* … */ }
    &--modificador { /* … */ }
}
```

### Excepción `.poc-` (último recurso)

Solo se permite `.poc-` si **TODAS** estas condiciones son verdaderas:

1. La pieza es exclusiva del POC y no tiene sentido fuera de él (ej: mock de un endpoint, UI de debug).
2. No es promovible al DS por su naturaleza (datos hardcoded, andamiajes, branding ad-hoc del medio que ya tiene su propio sistema, etc.).
3. Se documenta explícitamente en el reuse-trace bajo "Excepciones `.poc-`".

Si se permite, va en `scss/pocs/[proyecto]/` siguiendo las reglas de `mode-poc(scss)`. Nunca en `<style>` inline (eso es solo `mode-poc(css)`).

### HTML obligatorio

Igual que `mode-poc(hf)`. Estructura base canónica del POC con `setting.css` + `ux-index.css`. Rutas relativas estándar desde `fourty/pocs/[proyecto]/`. Sin `main#showroomContent` (eso es exclusivo del showroom del DS).

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>42DS | POC: [Nombre]</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link id="brandStyles-root" rel="stylesheet"
          href="../../../cds-statics/css/brands/ux/setting.css" type="text/css">
    <link id="brandStyles" rel="stylesheet"
          href="../../../cds-statics/css/ux-index.css" type="text/css">
    <link rel="icon" href="../../favicon.png" type="image/png">

    <!-- Si hay [CANDIDATO DS] aún no compilado en ux-index.css, enlazar
         el CSS individual del componente para que el POC funcione:
    <link rel="stylesheet"
          href="../../../cds-statics/css/brands/ux/[nivel]/[nombre-nuevo].css">
    -->
</head>
<body class="fourty ft-brand-ux ft-skin ft-skin--showroom">

    <div class="ft-layout-grid-flex">
        <article class="ft-layout-grid-flex__row">
            <div class="ft-layout-grid-flex__colXs-12">
                <!-- Contenido reuse-first aquí -->
            </div>
        </article>
    </div>

    <!-- ⚠ El runtime del showroom (cds-statics/js/showroom/*) FUE DECOMISIONADO.
         NO enlazar dependencies.js / showroom-core.js / showroom-init.js: ya no existen,
         ni hay <div data-showroom="nav"> que inyectar. La página POC es AUTOCONTENIDA:
           • Comportamiento de componente real → su JS canónico en cds-statics/js/<componente>/.
           • Interactividad propia (controles, selector de marca…) → <script> inline; patrón
             de referencia: fourty/pocs/poc-playground-btn.html. -->
</body>
</html>
```

### No-negociables (todas las piezas)

- **Cero componentes inventados sin rastreo previo**. Si una clase no existe en `scss/fourties/`, o no se reusa, o se crea siguiendo §rules → SCSS nuevo.
- **BEM estricto del DS**: `.ft-` · `.ft-mol-` · `.ft-org-` según nivel. Nunca clases sin prefijo, nunca `.poc-` fuera de la excepción.
- **Variables CSS** (`var(--…)`) para color, tipografía y espaciado: nunca hardcoded.
- **Mixins de abstracts** en lugar de propiedades directas cuando exista el mixin (`@include padding(…)`, `@include min-screen(…)`, etc.).
- **Helpers antes que CSS custom**: si `ft-helper-spacer-y-md` (o `-b-md`, `-inner-md`) cubre el caso, no escribir `margin-top: 1rem`. ⚠ `ft-helper-spacer-md` a secas NO existe.
- **Grid antes que flex custom**: si `ft-layout-grid-flex__colMd-6` cubre el caso, no inventar columnas.
- **JS canónico de `cds-statics/js/`** antes que JS nuevo. JS nuevo solo si no existe equivalente y siguiendo el patrón canónico (JSDoc, BEM hooks, idempotente, auto-init).
- **Accesibilidad obligatoria**: ARIA, headings, foco, keyboard nav, `prefers-reduced-motion`.
- **Un solo `ft-btn--primary`** por pantalla o bloque principal.
- **Escape/decline** siempre como `ft-link`, nunca `ft-btn`.
- **Imágenes**: `https://placehold.co/[W]x[H]?text=…` con `width`/`height` coincidentes y `alt` descriptivo.

---

## outputs

### Estructura de archivos

```
fourty/pocs/[proyecto]/
  ├── [pantalla-1].html       ← clases 42DS canónicas, cero inventos
  ├── [pantalla-2].html
  └── (opcional) js/
      └── [nombre-poc].controller.js   ← solo si la lógica del POC no es
                                         reutilizable como componente DS

(si se extendieron componentes existentes)
scss/fourties/[nivel]/[nombre]/_[nombre].scss
  ← parcial canónico con modificadores `--variante` añadidos
    y comentario [CANDIDATO DS]

(si se crearon componentes nuevos)
scss/fourties/[nivel]/[nombre-nuevo]/_[nombre-nuevo].scss
  ← componente nuevo canónico, [CANDIDATO DS], NO registrado en cores
```

### Reporte al entregar

```
## [MODE: 42DS+REUSE-FIRST] — POC: [nombre]

### Hypothesis
Creemos que [usuario] necesita [X].
Si construimos [esto], logrará [resultado].
Assumption más arriesgada: [Y].

### Reuse-trace

| Pieza funcional | Decisión | Componente DS | Razón |
|---|---|---|---|
| Header de pantalla | Reusar | `ft-org-masthead` (sin variantes) | Cubre exactamente el caso. |
| Lista de resultados | Reusar + modificador existente | `ft-mol-card` · `--row` | Modificador ya existe en `_card.scss` (verificado; NO existe `--horizontal`). |
| Filtro por categoría | Extender | `ft-mol-dropdown` · nuevo `--inline` | No existe un dropdown sin flecha; añadido como `[CANDIDATO DS]`. |
| Burbuja flotante de ayuda | Crear | `ft-mol-help-bubble` (nuevo) | No hay nada equivalente en el DS; diseñado para promoción. |
| Lock de scroll body | Reusar | clase canónica `ft-helper-scroll-stop` + `fourty-js-modal-tapbar-sync.js` | Contrato canónico del DS. |
| Mock de búsqueda predictiva | Excepción `.poc-` | `.poc-search-mock` | Solo datos hardcoded para el POC, no promovible. |

### Estados cubiertos por pantalla
- [pantalla-1.html] happy path · loading · error · vacío · éxito
- [pantalla-2.html] …

### Excepciones a Lite (si las hay)
- `ft-org-masthead` no está en Lite pero es necesario para el branding de la pantalla.

### [CANDIDATO DS] generados — para revisión con el equipo de DS
- `ft-mol-dropdown--inline` (modificador añadido a `_dropdown.scss`)
- `ft-mol-help-bubble` (componente nuevo en `scss/fourties/molecules/help-bubble/`)

> Estos NO están registrados en `[marca]-core.scss` todavía. Promoción
> queda pendiente de aprobación del equipo de DS.

### Archivos creados o tocados
- `fourty/pocs/[proyecto]/pantalla-1.html` (creado)
- `fourty/pocs/[proyecto]/pantalla-2.html` (creado)
- `scss/fourties/molecules/dropdown/_dropdown.scss` (modificado — añadido `&--inline`)
- `scss/fourties/molecules/help-bubble/_help-bubble.scss` (creado)
- `scss/pocs/[proyecto]/_poc-mocks.scss` (creado — solo `.poc-search-mock`)

### Próximos pasos sugeridos
- Validar el flujo con stakeholder.
- Si el flujo se aprueba: presentar los [CANDIDATO DS] al equipo de DS
  para discusión de promoción.
- Si se aprueban: registrar en cores con `[MODE: 42DS+SCSS]`.
```

---

## invocation

```
[MODE: 42DS+REUSE-FIRST] [descripción del flujo, quién lo usa, objetivo del POC]
```

### Ejemplos

```
[MODE: 42DS+REUSE-FIRST] Pantalla de resultados de búsqueda predictiva con filtros
por comunidad autónoma y posibilidad de guardar localidades favoritas.
Rastrea primero qué hay ya en el DS para esta clase de UI.

[MODE: 42DS+REUSE-FIRST] Feed personalizado de noticias por barrio para usuarios
suscritos. Debe parecer parte del producto, no un experimento — todo lo
visual tiene que venir del DS o ser promovible al DS.

[MODE: 42DS+REUSE-FIRST] POC del nuevo formulario de alta de suscripción. El POC
puede crear piezas nuevas si el DS no las tiene, pero deben servir para
futuros formularios del grupo, no solo para este.
```

### Cómo se combina con evaluadores

| Combinación | Qué hace |
|---|---|
| `[MODE: 42DS+REUSE-FIRST+UX]` | Genera POC reuse-first → audita UX |
| `[MODE: 42DS+REUSE-FIRST+UI]` | Genera POC reuse-first → audita UI |
| `[MODE: 42DS+REUSE-FIRST+UX+UI]` | Genera POC reuse-first → audita UX + UI en paralelo |

Sigue el **Protocolo B** de `governance.md` (generación → auditoría).

### Cómo NO se combina

- `[MODE: 42DS+REUSE-FIRST+HF]` — no tiene sentido: son dos generadores POC.
- `[MODE: 42DS+REUSE-FIRST+SCSS]` — no se mezcla con `mode-ds`. Si el reuse-trace
  produce `[CANDIDATO DS]` que se aprueban, **luego** se invoca `[MODE: 42DS+SCSS]`
  como paso siguiente independiente para registrar oficialmente en cores.
