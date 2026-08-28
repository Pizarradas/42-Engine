# Mode: 42DS+... — Capa 3

Genera POCs HTML funcionales con clases 42DS a partir de una descripción de flujo o idea de producto.

> Capa de implementación del sistema de modos. Aplica las decisiones de UX y UI al Design System 42DS. No evalúa ni puntúa — la evaluación es responsabilidad de `MODE: UX` y `MODE: UI`.

---

## meta

```
rol:          Generador de POCs HTML en el Design System 42DS
scope:        Produce archivos en fourty/pocs/[proyecto]/ usando componentes, grid y helpers 42DS
variantes:    lf · hf · ai · css · scss
agent_tags:   ux, ui, copy, flow (carga varía por variante — ver §knowledge)
no hace:      evaluar · puntuar · definir estrategia UX · generar CSS custom sin justificación
evaluación:   delegar a MODE: UX y/o MODE: UI via [MODE: 42DS+HF+UX] · [MODE: 42DS+HF+UI] · [MODE: 42DS+HF+UX+UI]
```

---

## knowledge

### Generalista — por variante

| Módulo | Tag | lf | hf | ai | css | scss |
|--------|-----|----|----|-----|-----|------|
| `knowledges/ux/dont-make-me-think` | ux | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/strategic-writing-for-ux` | copy | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/laws-of-ux` | ux | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/nielsen-heuristics` | ux | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/design-of-everyday-things` | ux | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/microinteractions` | ux | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ux/lean-ux-and-metrics` | flow | — | — | ✓ | — | — |
| `knowledges/ui/refactoring-ui` | ui | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ui/practical-ui` | ui | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/ui/color-theory` | ui | — | — | — | ✓ | ✓ |
| `knowledges/front/html-semantics` | front | — | — | — | — | ✓ |
| `knowledges/front/css-architecture` | front | — | — | — | — | ✓ |
| `knowledges/front/scss-patterns` | front · scss | — | — | — | — | ✓ |

### Conceptual 42DS — knowledges/42ds/

| Módulo | lf | hf | ai | css | scss |
|--------|----|----|-----|-----|------|
| `knowledges/42ds/atomic-design` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/42ds/grid-system` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/42ds/helpers-system` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/42ds/poc-system` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `knowledges/42ds/brand-system` | — | ✓ | ✓ | ✓ | ✓ |
| `knowledges/42ds/scss-pipeline` | — | — | — | — | ✓ |

### Operativo 42DS — capa opcional del repositorio

| Ref | lf | hf | ai | css | scss |
|-----|----|----|-----|-----|------|
| `AI/knowledge/42ds/components-lite.json` o inventario equivalente | ✓ | ✓ | ✓ | ✓ | ✓ |
| `AI/knowledge/42ds/classes-cheatsheet.md` o cheatsheet equivalente | ✓ | ✓ | ✓ | ✓ | ✓ |
| `AI/knowledge/42ds/elements.md` o referencia equivalente | — | ✓ | ✓ | ✓ | ✓ |
| `AI/knowledge/42ds/exceptions.md` o registro equivalente | — | ✓ | ✓ | ✓ | ✓ |
| `AI/knowledge/ux/rules.json` (23 reglas atómicas) o fuente equivalente | ✓ | ✓ | ✓ | ✓ | ✓ |
| `AI/knowledge/ux/frameworks/ai-ux.json` o fuente equivalente | — | — | ✓ | — | — |
| `AI/knowledge/ux/patterns/*.json` (relevantes) o fuente equivalente | — | ✓ | ✓ | ✓ | ✓ |

> Si la capa operativa `AI/knowledge/` no existe en el runtime actual, usar como fallback la documentación raíz del repositorio (`AGENTS.md` y/o `CLAUDE.md`) y la estructura real del código fuente.

---

## process

### Variante LF — Low Fidelity (boceto rápido)

```
ACTIVADO POR: [MODE: 42DS+LF]
OBJETIVO:     Explorar una idea rápido. Solo happy path.

1. No preguntar — hacer suposiciones razonables
2. Cargar knowledge LF (ver §knowledge)
3. Generar un HTML por pantalla (happy path únicamente)
4. Aplicar §rules sin excepción durante la generación
5. Usar solo componentes Lite (desde `AI/knowledge/42ds/components-lite.json` o su referencia operativa equivalente)
6. Al final del archivo: comentario HTML con 3-5 suposiciones
   y qué habría que definir para la versión HF
```

### Variante HF — High Fidelity (POC completo)

```
ACTIVADO POR: [MODE: 42DS+HF] o por el modo por defecto configurado por el runtime
OBJETIVO:     POC para presentar. Todos los estados. Accesibilidad completa.

1. Formular hypothesis (Lean UX):
   "Creemos que [usuario] necesita [X].
    Si construimos [esto], logrará [resultado].
    La assumption más arriesgada es [Y]."
   → Presentar al usuario para confirmar (máx. 3 líneas)

2. Cargar knowledge HF (ver §knowledge)

3. Generar HTML por pantalla con todos los estados:
   happy path · loading · error · vacío · éxito

4. Accesibilidad completa:
   ARIA roles y atributos · jerarquía de headings · foco gestionado · keyboard nav

5. Aplicar §rules sin excepción durante la generación

6. Usar componentes Lite; documentar excepciones en `AI/knowledge/42ds/exceptions.md` o en el registro operativo equivalente del repositorio

7. Reportar al entregar:
   — Hypothesis del POC
   — Pantallas generadas y estados cubiertos
   — Excepciones a Lite usadas (si las hay)
```

### Variante AI — AI/UX (interfaces con modelo de IA)

```
ACTIVADO POR: [MODE: 42DS+AI]
OBJETIVO:     POC donde la IA genera, recomienda o decide. Trust como KPI.

1. Identificar el rol de la IA en la pantalla:
   ¿qué decide? ¿qué recomienda? ¿qué genera?

2. Definir los 6 estados de IA ANTES de escribir HTML:
   loading   → ¿qué ve el usuario mientras la IA procesa?
   confident → ¿cómo se presenta el output de alta confianza?
   uncertain → ¿cómo se señala la baja confianza visualmente?
   failed    → ¿qué dice la interfaz cuando la IA falla?
   empty     → ¿qué ve el usuario si no hay datos?
   partial   → ¿qué pasa si la IA tiene información incompleta?

3. Aplicar trust_as_primary_kpi:
   cada output de IA debe tener escape hatch visible (ignorar / editar / rechazar)

4. Seguir el resto del proceso HF (hypothesis, todos los estados, accesibilidad)

5. Nota al inicio de cada HTML relevante:
   <!-- AI ROLE: [qué hace la IA]
        STATES: loading / confident / uncertain / failed / empty / partial
        ASSUMPTIONS: [comportamiento del modelo asumido] -->
```

### Variante CSS — 42DS+HF con CSS inline

```
ACTIVADO POR: [MODE: 42DS+HF+CSS] · también el modo por defecto si el runtime así lo configura
OBJETIVO:     POC HF con clases 42DS + CSS custom en <style> para estilos no cubiertos por el DS.

1. Formular hypothesis (Lean UX) — igual que HF
   → Presentar para confirmar antes de generar

2. Cargar knowledge CSS (ver §knowledge)

3. Generar HTML por pantalla con todos los estados:
   happy path · loading · error · vacío · éxito

4. Estructura CSS inline (§rules → CSS inline):
   — Cargar setting.css + ux-index.css (base 42DS)
   — Añadir <style> en el <head> con CSS custom:
     * Design tokens propios del POC (prefijados --poc-)
     * Estilos de componentes NO cubiertos por 42DS
     * Overrides justificados de estilos 42DS (documentar con comentario)
   — Nombrar las clases custom con prefijo .poc- para evitar colisiones con .ft-
   — Sin SCSS — todo CSS estático en el <style>

5. Accesibilidad completa — igual que HF

6. Aplicar §rules sin excepción

7. Reportar al entregar:
   — Hypothesis
   — Clases 42DS usadas vs. CSS custom añadido
   — Justificación de estilos custom
   — Excepciones a Lite (si las hay)
```

### Variante SCSS — 42DS+HF con parciales SCSS

```
ACTIVADO POR: [MODE: 42DS+HF+SCSS]
OBJETIVO:     POC HF con clases 42DS + parciales SCSS en scss/ para estilos no cubiertos por el DS.
              La variante SCSS es el paso previo a integrar el estilo en el DS.

1. Formular hypothesis (Lean UX) — igual que HF

2. Cargar knowledge SCSS (ver §knowledge)

3. Generar HTML por pantalla con todos los estados:
   happy path · loading · error · vacío · éxito

4. Estructura de archivos (§rules → SCSS):
   fourty/pocs/[proyecto]/
   ├── [pantalla].html          ← HTML con clases 42DS + clase .poc- adicionales
   └── poc-[proyecto].html      ← index del POC (si hay varias pantallas)

   scss/pocs/[proyecto]/
   ├── _poc-[proyecto]-tokens.scss    ← tokens del POC (variables CSS --poc-)
   ├── _poc-[proyecto]-components.scss ← estilos de componentes custom
   └── poc-[proyecto].scss            ← entry point: @import tokens + components
                                         NO @import abstracts ni brandsetup

5. Patrones SCSS para POC:
   — Variables CSS (custom properties) en :root, prefijadas --poc-
   — Selectores con prefijo .poc- para evitar colisiones con .ft-
   — NO importar abstracts/abstracts.scss (los mixins DS son solo para componentes DS)
   — Comentario en cada regla: // [CANDIDATO DS] si el estilo es reutilizable
   — El HTML del POC enlaza a cds-statics/css/brands/ux/setting.css +
     cds-statics/css/ux-index.css + ruta relativa al CSS compilado del POC

6. Accesibilidad completa — igual que HF

7. Aplicar §rules sin excepción

8. Reportar al entregar:
   — Hypothesis
   — Archivos generados (HTML + SCSS)
   — Clases 42DS vs. clases .poc- añadidas
   — Candidatos DS: estilos del POC que podrían promoverse a componente DS
```

---

## rules

### HTML obligatorio (todas las variantes)

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
    <!-- Variante CSS: añadir aquí el <style> con CSS custom -->
    <!-- Variante SCSS: añadir aquí <link> al CSS compilado del POC -->
</head>
<body class="fourty ft-brand-ux ft-skin ft-skin--showroom">

    <div class="ft-layout-grid-flex">
        <article class="ft-layout-grid-flex__row">
            <div class="ft-layout-grid-flex__colXs-12
                        ft-layout-grid-flex__colMd-8
                        ft-layout-grid-flex__colMdOffset-2">
                <div class="ft-layout-grid-flex__nested ft-helper-spacer-inner-md">
                    <!-- Contenido aquí -->
                </div>
            </div>
        </article>
    </div>

    <!-- ⚠ El runtime del showroom (cds-statics/js/showroom/*) FUE DECOMISIONADO.
         NO enlazar dependencies.js / showroom-core.js / showroom-init.js: ya no existen,
         y tampoco hay <div data-showroom="nav"> que inyectar. La página POC es AUTOCONTENIDA:
           • Comportamiento de componente real → su JS canónico en cds-statics/js/<componente>/
             (p.ej. ../../../cds-statics/js/modal/fourty-js-modal.js · ver tabla de Rutas).
           • Interactividad propia del POC (controles, selector de marca…) → <script> inline.
             Selector de marca = swap inline de setting.css + [marca]-index.css + clases
             ft-brand-* del <body>; patrón de referencia: fourty/pocs/poc-playground-btn.html. -->
</body>
</html>
```

### CSS inline (variante CSS)

```html
<!-- En el <head>, después de los <link> de 42DS -->
<style>
    /* ─── POC Tokens ────────────────────────────────────
       Prefijo --poc- para no colisionar con variables 42DS
    ─────────────────────────────────────────────────── */
    :root {
        --poc-color-[nombre]: #hex;
        --poc-spacing-[nombre]: Xrem;
        /* ... */
    }

    /* ─── POC Components ────────────────────────────────
       Prefijo .poc- para no colisionar con .ft-
    ─────────────────────────────────────────────────── */
    .poc-[componente] {
        /* Estilos no cubiertos por 42DS */
    }

    /* ─── 42DS Overrides (solo si es estrictamente necesario) ──
       Documentar SIEMPRE por qué se hace el override
    ─────────────────────────────────────────────────── */
    /* OVERRIDE: [razón del override] */
    .ft-[componente] { ... }
</style>
```

### SCSS (variante SCSS)

```scss
// scss/pocs/[proyecto]/poc-[proyecto].scss
// Entry point — NO @import abstracts ni bourbon

@import 'poc-[proyecto]-tokens';
@import 'poc-[proyecto]-components';
```

```scss
// scss/pocs/[proyecto]/_poc-[proyecto]-tokens.scss
:root {
    // Variables CSS del POC — prefijadas --poc-
    --poc-color-highlight: #hex;
    --poc-font-size-caption: 0.75rem;
}
```

```scss
// scss/pocs/[proyecto]/_poc-[proyecto]-components.scss
// Selectores prefijados .poc- — sin colisión con .ft-

.poc-[componente] {
    // Estilos del componente custom
    // [CANDIDATO DS] → si este patrón es reutilizable, anotar para promover a DS
}
```

### Rutas (desde `fourty/pocs/[proyecto]/`)

| Recurso | Ruta |
|---------|------|
| setting.css | `../../../cds-statics/css/brands/ux/setting.css` |
| ux-index.css | `../../../cds-statics/css/ux-index.css` |
| favicon | `../../favicon.png` |
| ~~scripts showroom~~ | **Decomisionado** — `cds-statics/js/showroom/` ya no existe. Interactividad = `<script>` inline + JS de componente (filas siguientes). |
| ft-mol-modal | `../../../cds-statics/js/modal/fourty-js-modal.js` |
| ft-mol-popover | `../../../cds-statics/js/modal/fourty-js-popover.js` |
| ft-mol-dropdown | `../../../cds-statics/js/dropdown/fourty-js-dropdown-accesible.js` |
| ft-mol-tabs | `../../../cds-statics/js/tabs/fourty-js-tabs.js` | (gen2, easyTabs) |
| ft-mol-tab | `../../../cds-statics/js/tab/fourty-js-tabs.js` | (gen1 — componente DISTINTO) |
| ft-mol-accordion | `../../../cds-statics/js/accordion/fourty-js-accordion-accesible.js` |
| Entre pantallas | `[archivo].html` (misma carpeta) |

### Grid

```
ft-layout-grid-flex
└── ft-layout-grid-flex__row
    └── ft-layout-grid-flex__colXs-12 [+ breakpoints]
        └── ft-layout-grid-flex__nested

Layouts frecuentes:
  Estrecho:   colMd-8 colMdOffset-2
  Ancho:      colMd-10 colMdOffset-1
  Full:       colXs-12
  Dos cols:   colXs-12 colMd-6 (por item)
```

### Componentes Lite (solo estos, salvo excepción justificada)

```
Atoms:      ft-btn · ft-img · ft-title · ft-link · ft-tag · ft-date
Molecules:  ft-mol-card · ft-mol-headband · ft-mol-breadcrumb · ft-mol-btnGroup
Organism:   ft-org-cardHome

Pre-autorizados cuando el flujo los requiera:
  ft-mol-modal · ft-mol-dropdown · ft-mol-popover · ft-mol-accordion · ft-mol-tabs
```

### No-negociables de generación (todas las variantes)

- **Un solo `ft-btn--primary`** por pantalla o bloque principal
- **Escape/decline** siempre como `ft-link`, nunca como `ft-btn`
- **CTAs orientados al resultado**: "Guardar localidades" no "Enviar"
- **Estados de éxito**: mensaje en pasado ("Guardado con éxito") + CTA de siguiente paso
- **Modificadores de tamaño obligatorios**: `ft-btn--md` en CTAs, `ft-tag--sm` o `ft-tag--md` en chips
- **Imágenes**: `https://placehold.co/[W]x[H]?text=[texto]`, `width` y `height` coincidentes, `alt` descriptivo
- **ARIA** en todos los interactivos: `aria-expanded`, `aria-hidden`, `aria-controls`, `aria-label`
- **Jerarquía de headings**: `h1` único por pantalla, sin saltos
- **Terminología consistente** en todo el flujo
- **Clases custom** (variantes CSS y SCSS): siempre prefijadas `.poc-`, nunca sin prefijo
- Verificar que el POC no incluye `main#showroomContent` (exclusivo de documentación del DS)

---

## outputs

### Variante LF

```
fourty/pocs/[proyecto]/[pantalla].html
  — Happy path funcional con clases 42DS
  — Comentario al final: <!-- SUPOSICIONES: ... -->
```

### Variante HF

```
fourty/pocs/[proyecto]/
  ├── [pantalla-1].html   (happy path + loading + error + vacío + éxito)
  └── [pantalla-2].html   (si el flujo tiene más pantallas)

Reporte al entregar:
  — Hypothesis
  — Pantallas generadas y estados cubiertos
  — Excepciones a Lite (si las hay)
```

### Variante AI

```
Igual que HF, más:
  — Nota AI al inicio de cada HTML relevante
  — Los 6 estados de IA implementados por pantalla
  — Trust signals visibles en cada output de IA
```

### Variante CSS

```
fourty/pocs/[proyecto]/
  ├── [pantalla-1].html   (clases 42DS + <style> con CSS custom .poc-)
  └── [pantalla-2].html

Reporte al entregar:
  — Hypothesis
  — Clases 42DS vs. CSS custom añadido (ratio)
  — Justificación de cada override 42DS (si los hay)
  — Excepciones a Lite (si las hay)
```

### Variante SCSS

```
fourty/pocs/[proyecto]/
  ├── [pantalla-1].html   (clases 42DS + clases .poc- + link al CSS compilado del POC)
  └── [pantalla-2].html

scss/pocs/[proyecto]/
  ├── _poc-[proyecto]-tokens.scss
  ├── _poc-[proyecto]-components.scss
  └── poc-[proyecto].scss            ← entry point

Reporte al entregar:
  — Hypothesis
  — Archivos generados (HTML + SCSS)
  — Clases 42DS vs. .poc- añadidas
  — Candidatos DS (estilos del POC promovibles al DS)
```

---

## invocation

```
[MODE: 42DS+LF]          [descripción en lenguaje natural]
[MODE: 42DS+HF]          [descripción del flujo, quién lo usa y cuál es el objetivo]
[MODE: 42DS+AI]          [qué hace la IA y qué hace el usuario con ese output]
[MODE: 42DS+HF+CSS]      [descripción del flujo — genera POC HF con CSS inline]
[MODE: 42DS+HF+SCSS]     [descripción del flujo — genera POC HF con SCSS parciales]
(sin prefijo)         → solo si el runtime lo mapea explícitamente; si no, usar prefijo
```

### Ejemplos

```
[MODE: 42DS+LF] Pantalla donde el usuario filtra noticias por barrio.

[MODE: 42DS+HF] Flujo de feed compartido: el usuario recibe un enlace, ve noticias de
otro usuario, puede filtrar por ciudad y guardar las localidades que le interesan.

[MODE: 42DS+HF+UX+UI] Flujo de suscripción premium. Genera el POC y audita todo.

[MODE: 42DS+AI] Pantalla donde el agente CERCA recomienda localidades basándose en el
historial de lectura. El usuario puede aceptar, editar o ignorar las sugerencias.

[MODE: 42DS+HF+CSS] Pantalla de perfil de usuario con avatar, datos y zona de preferencias.
El DS cubre la mayor parte pero necesito un componente de avatar personalizado.

[MODE: 42DS+HF+SCSS] Rediseño del flujo de onboarding de CERCA.
Quiero los estilos en SCSS para poder promoverlos al DS si el equipo los aprueba.
```
