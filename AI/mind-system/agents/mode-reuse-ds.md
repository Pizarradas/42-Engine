# Mode: 42DS+REUSE — Capa 3 (reuse-only)

Genera rediseños, variaciones y composiciones nuevas usando exclusivamente piezas ya construidas del 42DS. No crea SCSS, no inventa componentes ni añade JS nuevo: recompone lo existente con criterio de sistema.

> Variante de composición estricta. A diferencia de `mode-poc-plus`, aquí el objetivo no es enriquecer el DS creando candidatos, sino exprimirlo tal como ya existe. Si algo no se puede resolver con inventario real del sistema, se debe escalar a otro mode, no resolverlo inventando.

---

## meta

```
rol:          Generador de diseños y modificaciones de diseño sobre inventario real del 42DS
scope:        Produce HTML en fourty/pocs/[proyecto]/ o modifica HTML ya construido con clases DS
variantes:    base · +CSS
fidelidad:    HF funcional por defecto
agent_tags:   42ds-trace, reuse, html, ui, ux, js-audit
no hace:      crear SCSS nuevo · extender componentes con &--variante ·
              crear componentes nuevos · añadir JS nuevo · tocar scss/abstracts/ ·
              duplicar piezas existentes con nombres alternativos
```

**Diferencia clave vs otros modes 42DS**:

| Aspecto | `mode-poc` | `mode-poc-plus` | `mode-reuse-ds` (este modo) |
|---|---|---|---|
| Filosofía | POC rápido | Reuse-first + extender/crear si hace falta | Reuse-only: componer con lo que ya existe |
| Estilos nuevos | Sí (`<style>` o `scss/pocs/`) según variante | Sí, pero canónicos y promovibles al DS | No, salvo submodo `+CSS` local al HTML |
| SCSS del DS | No necesariamente | Sí, si se añade `[CANDIDATO DS]` | No se toca |
| JS nuevo | Puede existir para el POC | Puede existir si el POC lo necesita | No se escribe JS nuevo; solo se declara y monta el JS canónico existente |
| Resultado esperado | POC útil | POC + mejora potencial del DS | Diseño nuevo o rediseño construido únicamente con inventario existente |

---

## knowledge

### Generalista — knowledges/

| Módulo | Tag | Cargar |
|--------|-----|--------|
| `knowledges/ux/dont-make-me-think` | ux | ✓ |
| `knowledges/ux/strategic-writing-for-ux` | copy | ✓ |
| `knowledges/ux/laws-of-ux` | ux | ✓ |
| `knowledges/ux/nielsen-heuristics` | ux | ✓ |
| `knowledges/ui/refactoring-ui` | ui | ✓ |
| `knowledges/ui/practical-ui` | ui | ✓ |
| `knowledges/front/html-semantics` | front | ✓ |
| `knowledges/front/component-patterns` | front | ✓ |
| `knowledges/front/javascript-patterns` | front | Solo si el item usa JS canónico |

### Conceptual 42DS — knowledges/42ds/

| Módulo | Cargar |
|--------|--------|
| `knowledges/42ds/atomic-design` | ✓ |
| `knowledges/42ds/grid-system` | ✓ |
| `knowledges/42ds/helpers-system` | ✓ |
| `knowledges/42ds/poc-system` | ✓ |
| `knowledges/42ds/brand-system` | ✓ |

### Operativo 42DS — fuentes reales del repositorio

| Recurso | Para qué | Obligatorio |
|---------|----------|-------------|
| `CLAUDE.md` / `AGENTS.md` raíz | Inventario, convenciones, arquitectura del repo | ✓ |
| `scss/fourties/atoms/README.md` | **Inventario canónico** de átomos (31) | ✓ |
| `scss/fourties/molecules/README.md` | **Inventario canónico** de moléculas (70) | ✓ |
| `scss/fourties/organism/README.md` | **Inventario canónico** de organismos (32) — ojo: `organism` SINGULAR | ✓ |
| `scss/base/helpers/` | Helpers reales (los `_*.scss` son la fuente; no hay un README-inventario) | ✓ |
| `scss/fourties/[nivel]/[nombre]/_[nombre].scss` | Confirmar anatomía, elementos y modificadores reales | ✓ |
| `cds-statics/js/README.md` | Mapa de dependencias JS existentes | ✓ |
| `cds-statics/js/[carpeta]/README.md` | API / contrato del JS de la pieza | Si la pieza usa JS |
| `fourty/storybook/js/<nivel>/<pieza>/<pieza>.js` | Overview y ejemplos ya migrados | Recomendado si la pieza existe en storybook |
| `fourty/__old-showroom/<nivel>/README.md` | Convenciones BEM del nivel (NO es un inventario) | Opcional |

> ⚠️ **El showroom HTML está DECOMISIONADO** (archivado en `fourty/__old-showroom/`).
> `fourty/atoms/`, `fourty/molecules/`, `fourty/organisms/`, `fourty/helpers/`, `fourty/widgets/` y
> `fourty/recursos/` **ya no existen**. El inventario canónico son los README de `scss/fourties/*/`.
>
> ⚠️ **`cds-statics/js/showroom/` fue BORRADO.** **NUNCA** enlaces `dependencies.js`,
> `showroom-core.js`, `showroom-init.js` ni `highlight.css`. Tampoco uses `data-showroom-load`,
> `data-showroom-skin`, `data-showroom="nav"` ni `main#showroomContent`: son atributos muertos.
> Si copias el patrón de un POC antiguo, comprueba que no los arrastra.

> Si hay conflicto entre lo que "parece" existir y lo que realmente está en `scss/fourties/` o `cds-statics/js/`, prevalece el código fuente real del DS.

---

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Objetivo de diseño o rediseño | Usuario | Sí |
| Pantalla, bloque o flujo a modificar | Usuario | Sí |
| Marca objetivo | Usuario | No (default: `ux`) |
| Restricción de reutilización | Usuario | No |
| Permiso para CSS ad hoc | Prefijo `+CSS` | Solo si aplica |

---

## process

```
ACTIVADO POR: [MODE: 42DS+REUSE] o [MODE: 42DS+REUSE+CSS]
OBJETIVO:     Resolver un diseño nuevo o una modificación reutilizando piezas ya existentes del DS.

1. Leer el brief y descomponerlo en necesidades:
   - qué bloque visual hay que construir o ajustar
   - qué comportamiento funcional necesita
   - qué partes son layout, qué partes son componente y qué partes son helper

2. FASE 1 — Rastreo del inventario real:
   2.1. Identificar atoms, molecules, organisms y helpers candidatos.
   2.2. Confirmar en SCSS cuáles son sus elementos y modificadores reales.
   2.3. Confirmar si la pieza depende de JS y cuál es su script canónico.
   2.4. Detectar si ya existe una story/overview útil en `fourty/storybook/`.

3. FASE 2 — Plan de reutilización:
   Construir una tabla breve:
   - necesidad funcional
   - pieza DS elegida
   - nivel (atom/molecule/organism/helper)
   - dependencia JS (sí/no)
   - ajuste permitido (reordenar / cambiar variante / helper / marca)

4. FASE 3 — Construcción:
   4.1. Componer el HTML solo con clases reales del DS.
   4.2. Reutilizar modificadores existentes; no inventar `--variantes`.
   4.3. Usar helpers antes que wrappers custom.
   4.4. Si hay interacción, enlazar solo el JS canónico existente.
   4.5. Si el modo es `+CSS`, añadir un bloque `<style>` local solo para ajustes
        ad hoc del caso concreto, sin declarar una API nueva ni simular un componente.

5. FASE 4 — Validación:
   - comprobar que no se ha creado ninguna clase nueva fuera del submodo `+CSS`
   - comprobar que no se requiere SCSS ni JS nuevo
   - comprobar que el HTML sigue siendo promocionable a producción sin deuda estructural
   - comprobar accesibilidad, jerarquía y uso claro de la pieza

6. FASE 5 — Entrega:
   - HTML final
   - tabla de reutilización
   - lista de dependencias JS realmente usadas
   - si algo no se pudo resolver sin inventar, dejar recomendación de escalar a `mode-poc-plus` o `mode-ds`
```

---

## rules

### Jerarquía de decisión

```
1. Reusar la pieza exacta existente
2. Reusar la pieza exacta con un modificador ya existente
3. Recombinar varias piezas existentes con layout + helpers
4. Cambiar de nivel (atom → molecule / molecule → organism) si el DS ya ofrece una pieza mejor
5. Solo en [MODE: 42DS+REUSE+CSS], ajustar con CSS local dentro del HTML
6. Si aun así no llega: NO inventar; escalar a mode-poc-plus o mode-ds
```

### No negociables

- Nunca crear clases nuevas `.ft-*`, `.ft-mol-*`, `.ft-org-*` en este modo.
- Nunca tocar `scss/fourties/`, `scss/pocs/` ni `cds-statics/js/`.
- Nunca escribir JS nuevo. Si una interacción no existe ya en el DS, este modo no la inventa.
- Nunca usar inline `style=""` atributo a atributo como parche estructural. Si se permite CSS, va en un bloque `<style>` legible y acotado.
- Nunca duplicar un componente existente con markup paralelo "parecido". Se usa el markup real de la pieza.
- Si una pieza requiere JS, debe quedar señalada y documentada como dependencia real del resultado.

### Qué sí puede hacer este modo

- Reordenar bloques ya existentes.
- Cambiar de variante entre modificadores reales del sistema.
- Cambiar la combinación de helpers de layout, gap, spacing, display o tipografía ya disponibles.
- Combinar piezas de distintos niveles para crear una pantalla nueva sin tocar el DS base.
- Cambiar de organismo a molécula o viceversa si el inventario real lo cubre mejor.

### Submodo `+CSS`

`[MODE: 42DS+REUSE+CSS]` habilita una excepción controlada:

- Se permite añadir un `<style>` dentro del HTML construido.
- Ese CSS solo puede ajustar presentación ad hoc del caso concreto:
  - reparto espacial
  - anchuras máximas
  - composición puntual
  - overrides locales no reutilizables
- No se permite:
  - definir una nueva API visual de componente
  - crear nombres BEM del DS inexistentes
  - reimplementar un componente desde cero
  - añadir animaciones o comportamientos que exijan JS nuevo

**Namespace obligatorio de las clases locales**: toda clase que declares en ese `<style>` va
prefijada **`.poc-`** (igual que en `[MODE: 42DS+HF+CSS]`). Nunca sin prefijo, y nunca con `.ft-*`
(inventarías API del DS). Ejemplo: `.poc-hero-stack { max-width: 48rem; }`.

**Regla de frontera** (para saber si te has pasado de `+CSS` a "nueva API visual"): si la clase que
escribes **describe una variante del componente** (`.poc-card-horizontal`), te has pasado — eso es
un modificador y su sitio es el SCSS, vía `[MODE: 42DS+SCSS]`. Si **describe la posición o el
tamaño de esa pieza en ESTA pantalla** (`.poc-sidebar-sticky`), estás dentro. Criterio práctico:
¿la clase tendría sentido en otra pantalla? Si sí, no es `+CSS`: es DS.

### Template HTML base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>42DS | REUSE: [Nombre]</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link id="brandStyles-root" rel="stylesheet"
          href="../../../cds-statics/css/brands/ux/setting.css" type="text/css">
    <link id="brandStyles" rel="stylesheet"
          href="../../../cds-statics/css/ux-index.css" type="text/css">
    <link rel="icon" href="/fourty/favicon.png" type="image/png">
</head>
<body class="fourty ft-brand-ux">

    <div class="ft-layout-grid-flex">
        <div class="ft-layout-grid-flex__row">
            <div class="ft-layout-grid-flex__colXs-12">
                <!-- composición solo con piezas existentes -->
            </div>
        </div>
    </div>

    <!-- si alguna pieza lo necesita, enlazar aquí solo el JS canónico existente -->
</body>
</html>
```

> **Servidor obligatorio**: `ux-index.css` usa `@import` con rutas **absolutas** (`/cds-statics/...`).
> Servido desde la raíz del repo funciona; abierto con `file://` la página sale sin estilos.

> **NO añadas `ft-skin ft-skin--showroom` al `<body>`.** Esa clase solo hace algo bajo
> `[data-showroom-skin]`, atributo del showroom decomisionado: es decoración muerta.

> **NO uses `.ft-bg`**: esa clase **no existe** en el DS (verificado: cero apariciones en `scss/` y en
> `cds-statics/css/`). Circula copiada entre POCs. El wrapper del grid es `ft-layout-grid-flex` a secas.

---

## outputs

### Archivos

```
fourty/pocs/[proyecto]/[pantalla].html
```

Si el usuario pidió modificar una pantalla ya existente, este modo puede editar directamente ese HTML en vez de crear uno nuevo.

### Reporte al entregar

```md
## [MODE: 42DS+REUSE] — [nombre]

### Qué se ha reutilizado
| Necesidad | Pieza DS | Nivel | JS | Decisión |
|---|---|---|---|---|
| Acción principal | `ft-btn` | atom | No | Reusar `--primary` existente |
| Navegación superior | `ft-org-masthead` | organism | Sí | Reusar markup y dependencia canónica |
| Filtro compacto | `ft-mol-dropdown` | molecule | Sí | Reusar tal cual |

### Dependencias JS reales
- `cds-statics/js/...`

### Ajustes ad hoc
- Ninguno
```

Si el submodo es `+CSS`, añadir:

```md
### CSS local añadido
- Motivo
- Alcance
- Por qué no se ha tocado el DS
```

Si algo no se puede resolver sin ampliar el sistema:

```md
### Escalado recomendado
- Pasar a `mode-poc-plus` si hace falta extender una pieza con una variante canónica
- Pasar a `mode-ds` si hace falta crear o consolidar una pieza nueva en el sistema
```

---

## invocation

```md
[MODE: 42DS+REUSE] [brief]
[MODE: 42DS+REUSE+CSS] [brief]
```

### Ejemplos

```md
[MODE: 42DS+REUSE] Rediseña la cabecera de esta landing reutilizando solo organismos,
moléculas y helpers ya existentes en el DS, sin tocar SCSS ni JS.

[MODE: 42DS+REUSE] Genera una nueva pantalla de resultados editorial usando únicamente
items ya construidos en 42DS y documenta qué piezas dependen de JS.

[MODE: 42DS+REUSE+CSS] Recompón este bloque especial de portada con piezas existentes
del DS y añade solo el CSS local imprescindible para ajustar la composición.
```

### Cómo se combina

| Combinación | Qué hace |
|---|---|
| `[MODE: 42DS+REUSE]` | Reuse-only puro |
| `[MODE: 42DS+REUSE+CSS]` | Reuse-only + CSS local controlado |

### Cómo NO se combina

- `[MODE: 42DS+REUSE+SCSS]` — no tiene sentido: si hace falta tocar el DS, se cambia de mode.
- `[MODE: 42DS+REUSE+CSS+UI]` — `+CSS` es submodo de construcción, no una cadena de composición adicional.
- `[MODE: 42DS+REUSE+REUSE-FIRST]` — redundante y ambiguo; elegir uno de los dos enfoques.
