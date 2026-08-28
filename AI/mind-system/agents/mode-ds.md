# Mode: 42DS+SCSS — Design System

Añade o modifica componentes del Design System 42DS: SCSS. La documentación visual ya NO es una
página de showroom (decomisionado) — se delega al storybook vía `[MODE: STORYBOOK+MIGRATE/DOC]`.

---

## meta

```
rol:          Constructor de componentes del Design System 42DS
scope:        Produce SCSS en scss/fourties/. La documentación visual se delega al storybook
              ([MODE: STORYBOOK+MIGRATE/DOC]) — el showroom HTML clásico está decomisionado
modos:        único
agent_tags:   ui, audit
no hace:      modificar scss/abstracts/ sin aprobación · generar variantes de marca no solicitadas
              · crear CSS custom fuera del patrón DS · cambiar MAJOR o MINOR de versión
```

---

## knowledge

### Front — knowledges/front/

| Módulo | Tag | Cuándo cargar |
|--------|-----|---------------|
| `knowledges/front/html-semantics` | front | Siempre — landmarks, headings, elementos interactivos |
| `knowledges/front/css-architecture` | front | Siempre — cascade, especificidad, BEM, custom properties |
| `knowledges/front/scss-patterns` | front · scss | **Siempre** — cómo se escribe el SCSS de ESTE repo: anatomía del parcial, colocación del código, mixins (`min-screen`, `behavior-*`, Bourbon), `var(--…)` vs `$`, variantes por marca, helpers y registro en cores |
| `knowledges/front/component-patterns` | front | Siempre — single responsibility, API de componente, variantes |
| `knowledges/front/javascript-patterns` | front | Si el componente tiene JS — ARIA dinámico, gestión de foco |

### UI/UX generalista — knowledges/

| Módulo | Tag | Cuándo cargar |
|--------|-----|---------------|
| `knowledges/ui/refactoring-ui` | ui | Siempre — jerarquía visual, espaciado, tipografía |
| `knowledges/ui/practical-ui` | ui | Siempre — accesibilidad táctil, elevación, legibilidad |
| `knowledges/ui/color-theory` | ui | Si el componente maneja color o estados visuales |
| `knowledges/ui/motion-microinteractions` | ui | Si el componente tiene animaciones o transiciones |
| `knowledges/ux/nielsen-heuristics` | audit | Para validar el componente contra estándares de usabilidad |
| `knowledges/ux/microinteractions` | ux | Si el componente tiene estados interactivos complejos |

### 42DS-específico — knowledges/42ds/ + capa operativa del repositorio

| Recurso | Formato | Cuándo cargar |
|---------|---------|---------------|
| `knowledges/42ds/atomic-design` | Conceptual | Siempre — niveles, prefijos, BEM en 42DS |
| `knowledges/42ds/brand-system` | Conceptual | Siempre — variables CSS, setting.css, variantes |
| `knowledges/42ds/scss-pipeline` | Conceptual | Siempre — abstracts, mixins, Prepros, versiones |
| `knowledges/42ds/helpers-system` | Conceptual | Si el componente usa helpers |
| `scss/fourties/<nivel>/README.md` | Operativo | Siempre — inventario canónico del nivel (`AI/knowledge/` NO existe: la capa real es `AI/mind-system/knowledges/`) |
| Documento raíz del repositorio (`AGENTS.md` y/o `CLAUDE.md`) | Referencia | Siempre — patrones SCSS, inventario de componentes |
| `scss/fourties/[nivel]/README.md` | Referencia | Siempre — inventario y convenciones del nivel (README vivo; el de `fourty/` está archivado en `__old-showroom`) |
| `scss/abstracts/README.md` | Referencia | Solo lectura — mixins y variables disponibles |

---

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Nombre del componente | Usuario | Sí |
| Nivel Atomic Design (atom · molecule · organism) | Usuario o inferido | Sí |
| Descripción funcional (qué hace, qué estados tiene) | Usuario | Sí |
| Variantes de marca necesarias | Usuario | No (default: solo `ux`) |
| Excepciones al patrón estándar | Usuario | No |

---

## process

```
1. Identificar el nivel Atomic Design:
   atom      → prefijo .ft-       · carpeta scss/fourties/atoms/
   molecule  → prefijo .ft-mol-   · carpeta scss/fourties/molecules/
   organism  → prefijo .ft-org-   · carpeta scss/fourties/organism/

2. Leer el README del nivel correspondiente:
   scss/fourties/atoms/README.md · scss/fourties/molecules/README.md · scss/fourties/organism/README.md

3. Verificar que el nombre no colisiona con componentes existentes
   (consultar el inventario en el documento raíz del repositorio: `AGENTS.md` y/o `CLAUDE.md`)

4. Crear el SCSS del componente (§rules → estructura SCSS)

5. Crear variantes por marca si el usuario las solicita (§rules → variantes)

6. Registrar el componente en los cores de marca afectados (§rules → registro)

7. Delegar la documentación visual al storybook: NO se crea página de showroom (decomisionado).
   La doc viva del componente es una story → `[MODE: STORYBOOK+MIGRATE]` (si hay markup de
   referencia) o `[MODE: STORYBOOK+DOC]` operación `add` (componente nuevo sin showroom).

8. Actualizar el inventario en scss/fourties/[nivel]/README.md

9. Autovalidar con §checklist antes de entregar
```

---

## rules

### Estructura SCSS obligatoria

```scss
// scss/fourties/[nivel]/[nombre]/_[nombre].scss

@import "../../../abstracts/abstracts.scss";
@import "../../../vendors/bourbon/bourbon";

.ft-[nombre] {           // .ft- · .ft-mol- · .ft-org- según nivel
    $self: &;            // referencia BEM al selector padre

    // Variables CSS de marca — nunca valores hex directos
    color: var(--color-black);
    background-color: var(--color-primary);

    // Mixins de abstracts
    @include position(relative);
    @include padding(0.88rem 2rem);

    // Responsive con mixin
    @include min-screen(768px) {
        @include padding(1rem 2.5rem);
    }

    // Condicional por marca (solo si hay diferencias irreducibles)
    @if $brand == revistas {
        text-transform: uppercase;
    }

    // Elementos BEM
    &__elemento {
        // propiedades
    }

    // Modificadores BEM
    &--modificador {
        // propiedades
    }
}
```

### Reglas BEM no-negociables

- Bloque: `.ft-[nombre]` · `.ft-mol-[nombre]` · `.ft-org-[nombre]`
- Elemento: `&__[elemento]` — solo dentro del bloque
- Modificador: `&--[modificador]` — nunca en HTML sin el bloque base
- `$self: &` — usar para referencias internas (`#{$self}__elemento`)
- Nunca inventar clases fuera del patrón — 0 clases custom sin prefijo `ft-`

### Variables CSS de marca

```scss
// Usar siempre variables CSS — nunca valores hardcoded
color: var(--color-primary);
background: var(--color-background-light);
font-family: var(--font-stack);

// NO hacer esto:
color: #c00;             // ❌
background: #f5f5f5;     // ❌
```

### Variantes por marca

Cuando hay diferencias visuales significativas entre marcas:

```
scss/fourties/[nivel]/[nombre]/
├── _[nombre].scss          ← Base compartida (importado en todas las marcas)
├── [nombre]-ux.scss        ← Variante showroom (si difiere)
├── [nombre]-sport.scss     ← Variante sport
├── [nombre]-ep.scss        ← Variante El Periódico
└── ...                     ← Solo las marcas que requieren diferencias
```

### Registro en cores de marca

Tras crear el SCSS, registrar en cada core afectado:

```
cds-statics/css/brands/[marca]/[nivel]/[nombre].css  ← artefacto compilado
[marca]-core.scss                                     ← import registrado
```

> `cds-statics/css/` y `cds-statics/assets/` son **artefactos compilados**: nunca los modifiques
> directamente. Las modificaciones van en `scss/` → Prepros compila a `cds-statics/css/`.
>
> **No todo `cds-statics/` es compilado.** Hay dos carpetas que SÍ se editan a mano, pero **no
> desde este modo**: `cds-statics/js/` (JS del DS → `[MODE: 42DS+JS]`) y `cds-statics/beta/`
> (overrides temporales → `[MODE: BETA+CSS]`). Este modo no escribe en ninguna de las dos.

### Accesibilidad en componentes interactivos

```html
<!-- Obligatorio en todos los interactivos -->
aria-expanded="false/true"     ← toggles, accordions, dropdowns
aria-hidden="true/false"       ← contenido colapsado
aria-controls="[id-target]"    ← enlace trigger → contenido
aria-label="[descripción]"     ← cuando el texto visible no es suficiente
tabindex="0"                   ← elementos focusables no nativos
role="[button|dialog|tab|...]" ← cuando el elemento no es semántico
```

---

## documentación visual (storybook)

El showroom HTML clásico (`fourty/[nivel]/[nivel]-[nombre].html`) está **decomisionado**: las
páginas se archivaron en `fourty/__old-showroom/` y su runtime (`cds-statics/js/showroom/*`) se
borró. **mode-ds NO crea páginas de showroom.** Construido el SCSS, la documentación visual viva
del componente —base, todos los modificadores, estados y variantes de marca— es una **story del
storybook POC** (`fourty/storybook/js/[nivel]/[x]/[x].js`), que se autora con el modo dedicado:

| Caso | Modo | Qué hace |
|------|------|----------|
| El componente nuevo ya tiene markup de referencia (raro; recién creado en SCSS) | `[MODE: STORYBOOK+MIGRATE]` | Traduce el markup a una story parametrizada (DATA SSOT desde el `_[nombre].scss`) |
| Componente nuevo SIN página de showroom (el caso normal de mode-ds) | `[MODE: STORYBOOK+DOC]` operación `add` | Construye la story usando el SCSS como única fuente de verdad |

La marca activa, el modo oscuro, los controles y las galerías los aporta el **motor del
storybook** (toolbar Brand/Oscuro, `argTypes`), no una página HTML a mano. Reglas, DATA SSOT 1:1
con el SCSS, Overview solo-docs y checklist de la story → `mode-storybook-migrate.md` /
`mode-storybook-doc.md`.

> **Handoff mode-ds → storybook**: mode-ds entrega el SCSS canónico; la story es el entregable de
> documentación. En `[MODE: 42DS+SCSS+UI]` (governance, Protocolo C) lo que mode-ui audita es el **render
> de esa story**, no un showroom HTML.

---

## checklist

Antes de entregar, verificar:

```
SCSS
[ ] Archivo en scss/fourties/[nivel]/[nombre]/_[nombre].scss
[ ] @import abstracts y bourbon presentes
[ ] $self: & definido
[ ] BEM estricto: bloque · __elemento · --modificador
[ ] Solo var(--) para colores, tipografía, espaciado
[ ] Mixins de abstracts en lugar de propiedades directas
[ ] @if $brand solo si la diferencia es irreducible

Variantes y registro
[ ] Variantes de marca creadas si las diferencias lo justifican
[ ] Componente registrado en [marca]-core.scss correspondiente
[ ] Sin modificaciones directas a cds-statics/css/ ni cds-statics/assets/ (solo scss/)

Documentación visual (storybook — NO showroom)
[ ] Story creada en fourty/storybook/js/[nivel]/[x]/[x].js vía [MODE: STORYBOOK+MIGRATE/DOC]
[ ] DATA SSOT 1:1 con el _[nombre].scss (todos los modificadores reales)
[ ] Story Base + estados/variantes cubiertos por controles (no por páginas a mano)
[ ] Overview solo-docs (sin componente vivo incrustado)
[ ] Story dada de alta en el array PHASES de fourty/storybook/js/bootstrap-lazy.js
    (NO con un <script defer> en fourty/index.html: el shell solo carga 8 scripts fijos)
[ ] fourty/storybook/js/meta.js actualizado (SB_META.changes: "<id>": "new" | "updated")
[ ] 0 páginas nuevas en fourty/[nivel]/ ni en __old-showroom

Inventario
[ ] README del nivel actualizado: scss/fourties/[nivel]/README.md
```

---

## outputs

```
scss/fourties/[nivel]/[nombre]/_[nombre].scss       ← componente base
scss/fourties/[nivel]/[nombre]/[nombre]-[marca].scss ← variantes (si aplica)
fourty/storybook/js/[nivel]/[x]/[x].js              ← documentación visual (vía STORYBOOK+MIGRATE/DOC)
```

---

## invocation

```
[MODE: 42DS+SCSS] [descripción del componente: qué hace, qué estados tiene, qué variantes necesita]
```

### Ejemplos

```
[MODE: 42DS+SCSS] Necesito un componente "pill de localidad" que va en feeds de CERCA.
Nivel atom. Tiene estado activo, inactivo y con número de noticias.

[MODE: 42DS+SCSS] Necesito una molécula de "tarjeta de autor" con avatar, nombre,
especialidad y enlace al perfil. Sin variantes de marca por ahora.

[MODE: 42DS+SCSS] Modificar ft-mol-card para añadir un modificador --sponsored
que muestra un badge "Patrocinado" y cambia el fondo ligeramente.
```
