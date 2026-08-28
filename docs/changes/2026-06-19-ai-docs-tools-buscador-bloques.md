# Doc AI del storybook: bloque Tools + buscador + bloques temáticos

> Handoff de cambio · 2026-06-19 · página `Docs › AI` del storybook interno (`fourty/storybook/`).

## Resumen ejecutivo

La página-doc **AI** del storybook (`fourty/storybook/js/ai.js`) había crecido hasta ser un overview largo y plano. Se ha hecho tres cosas:

1. **Documentado el apartado `AI/tools/`**, hasta ahora ausente en la página: un bloque nuevo **Tools y referencias externas** que explica la herramienta `awesome-design` (colección de ficheros `DESIGN.md`).
2. **Añadido un buscador** (input de texto) + **chips de filtro por bloque** en una toolbar sticky, con contador de resultados y mensaje de "sin resultados".
3. **Reorganizado el contenido en bloques temáticos** (`.cb-ai__block`), cada uno con su `data-topic`, para que el buscador y los chips puedan aislar secciones.

El filtrado es 100% client-side, sin re-render: muestra/oculta bloques ya pintados, con el estado en el DOM (valor del input + `aria-pressed` del chip). Es la misma mecánica que ya usa el Changelog, así que sobrevive a los re-render del overview cuando el motor cambia de página.

> **Actualización (mismo día).** Tras una revisión de UX por carga cognitiva, el modelo de **chips + scroll único** de §2–§3 se sustituyó por **tabs + decision helper + divulgación progresiva**. Ver [§ Iteración UX](#iteración-ux-tabs--decision-helper--divulgación-progresiva). Las secciones 2 y 3 quedan como histórico del primer enfoque.

## Qué se ha hecho

### 1. Bloque "Tools y referencias externas" (nuevo)

Documenta `AI/tools/` y su único contenido actual, `awesome-design`:

- **Qué es**: colección curada de `DESIGN.md` (formato Stitch de Google) extraídos de webs reales (Vercel, Apple, Stripe, Linear, Notion, Figma…). 58 referencias de *design language*.
- **Para qué sirve**: dar a un agente de diseño un look concreto de referencia ("construye algo que se vea así"). Es inspiración / benchmark externo, **no** inventario del DS.
- **Tabla "Qué hay dentro"**: el `DESIGN.md` raíz del tool (hoy Vercel/Geist), el repo upstream `awesome-design-md-main/` y la estructura `design-md/<marca>/` (`DESIGN.md` + `preview.html` + `preview-dark.html` + `README.md`).
- **Tabla "Anatomía de un DESIGN.md"**: las 9 secciones del formato Stitch.
- **Ejemplos de prompt con awesome-design**: tabla de prompts copiables (uso directo estilo Stitch, landing HF inspirada con `[MODE: UI]`, pantalla completa con `[MODE: UX+UI]`, extracción de tokens, y aterrizaje al DS con `[MODE: 42DS+REUSE-FIRST]`).
- **Tabla "Registros disponibles (58)"**: las 58 marcas con su carpeta `design-md/<slug>/`, generada por `.map` desde el array `REGISTRIES` (slug + nombre tomado del H1 de cada `DESIGN.md`).
- **Callout de aviso**: awesome-design aporta criterio visual externo, nunca clases/tokens/componentes 42DS; para producir con el sistema mandan `scss/fourties/`, `cds-statics/` y los modes `42DS+*`.

También se enriqueció la fila `AI/tools/` de la tabla "Estructura de la carpeta AI" (antes genérica) y se añadieron dos referencias cruzadas: una invocación de ejemplo que usa un `DESIGN.md` como referencia y una fila en "Fuentes de verdad".

### 2. Buscador + chips de bloque

Toolbar sticky con:

- `input[type=search]` (`#cbAiSearch`) con icono de lupa y botón de limpiar (`#cbAiSearchClear`).
- Chips de bloque (`.cb-ai__chip[data-topic]`): `Todos · Familias · Estructura · Tools · Elegir mode · Invocar · Tokens · Reglas · Fuentes`.
- Contador de resultados (`#cbAiCount`, `aria-live="polite"`).
- Mensaje `.cb-ai__noresults` cuando no hay coincidencias.

El buscador combina el `textContent` del bloque con un `data-search` de palabras clave extra (sinónimos que pueden no estar visibles: "buscador", "coste", "design language"…). Texto y chip se combinan en AND.

### 3. Bloques temáticos

Cada `<h2>` (o grupo de `<h2>` afines) se envolvió en `aiBlock(topic, keywords, inner)` → `<section class="cb-ai__block" data-topic data-search>`. Agrupación:

| Bloque | Contenido |
|--------|-----------|
| `familias` | Diferencia clave (callout) + Mapa rápido de familias |
| `estructura` | Estructura de la carpeta AI |
| `tools` | **Tools y referencias externas (nuevo)** |
| `modes` | Modo por necesidad (matriz) |
| `invocar` | Cómo invocarlo bien + Plantillas de prompt + Ejemplos por runtime + Invocaciones recomendadas |
| `tokens` | Coste de contexto y tokens |
| `reglas` | Reglas de uso rápido |
| `fuentes` | Fuentes de verdad dentro del repo |

El hero y la nota introductoria quedan fuera de los bloques (orientación, siempre visibles).

## Archivos tocados

| Archivo | Cambio |
|---------|--------|
| `fourty/storybook/js/ai.js` | Reescrito. Estado final (tras la iteración UX): helpers `icon()`/`aiBlock()`/`aiMore()`/`pickHelper()`, navegación por tabs, decision helper (`INTENTS`), bloque Tools nuevo (incl. `REGISTRIES`), y `aiApply()` como única fuente de verdad (tabs vs. búsqueda), todo con delegación en `document` registrada una vez. |
| `fourty/storybook/css/storybook.css` | Estilos `.cb-ai__nav / __search* / __tabs / __tab / __panel / __searchHint / __more* / __pick*`. Buscador con la mecánica visual del Changelog (`.cb-cl__*`). (Las clases del primer enfoque `__toolbar`/`__chips`/`__chip`/`__filters` se eliminaron.) |
| `CLAUDE.md` | Corregida la fila "Archivos clave": `AI/tools/stitch/rules.md` (ruta inexistente) → `AI/tools/awesome-design/` (referencias `DESIGN.md` formato Stitch). |

## Decisiones de enfoque

- **Reusar la mecánica del Changelog** en lugar de inventar un buscador nuevo: delegación de eventos en `document`, estado en el DOM, sin re-render. Coherente con el principio de reusar mecanismos nativos del DS/storybook.
- **Sin resaltado de coincidencias** (`<mark>`): el Changelog resalta sobre spans de solo texto; aquí los bloques contienen tablas y tarjetas con HTML arbitrario, donde reescribir `innerHTML` sería frágil. Se prioriza mostrar/ocultar bloques + contador.
- **Corpus de búsqueda = `data-search` (keywords) + `textContent`**: se lee el texto vivo del bloque en cada pulsación (≈8 bloques, coste trivial), evitando mantener strings de búsqueda duplicados.
- **Tools como bloque que crece**: la copy deja explícito que `AI/tools/` es la zona pensada para alojar más herramientas en el futuro.

## Impacto en front / dev / QA

- **Sin cambios de API**: `window.SB.register({ id: "ai", ... })` se mantiene (mismo `id`, `group`, `sort`). No afecta a otras páginas ni al motor.
- **Dependencias**: usa `window.SB_ICONS.svg` (iconos `magnifying-glass` y `x`), ya cargado antes que `ai.js` en `fourty/index.html` (orden `defer`: `icons.js` → `core/storybook.js` → `changelog.js` → `ai.js`). `icon()` degrada a `""`/`✕` si faltara.
- **QA**: comprobar buscador (filtra y limpia), chips (aíslan un bloque, `aria-pressed` exclusivo), contador, "sin resultados", y que el estado sobrevive al navegar a otra página y volver.
- Verificado: `node --check` de `ai.js` OK; balance de llaves de `storybook.css` OK.

## Migración, deprecaciones o removes

- Ninguna. No se elimina contenido: todo el overview previo se conserva, solo se reagrupa en bloques. No hay cambios de versión del paquete npm.

## Pendientes

- Si en el futuro `AI/tools/` aloja más herramientas, basta con añadir otra tarjeta/tabla dentro del bloque `tools` (no requiere tocar la mecánica de búsqueda).
- La tabla de registros se mantiene a mano (array `REGISTRIES`). Si se actualiza el upstream `awesome-design-md`, hay que sincronizar ese array (hoy: 58 marcas).
- Posible mejora opcional: resaltado de coincidencias acotado a celdas de texto plano, si se considera necesario.

## Iteración UX: tabs + decision helper + divulgación progresiva

Feedback recibido: la página es estéticamente correcta pero la densidad informativa abruma, especialmente a usuarios novatos. Objetivo acordado: **minimizar la carga cognitiva**. Se rediseñó la navegación aplicando Hick (menos opciones visibles a la vez), Miller (chunking en ~5 grupos), reconocimiento sobre recuerdo y progressive disclosure.

### Qué cambió respecto a §2–§3

- **De chips a tabs reales.** Los chips de filtro (que en "Todos" volcaban los 8 bloques de golpe) se sustituyen por un **tablist** (`role="tablist"`/`tab`/`tabpanel`) con **un panel visible a la vez** y navegación por teclado (flechas, Home/End). 5 pestañas: `Empezar · Elegir mode · Invocar · Tools · Referencia`.
- **Pestaña "Empezar" para novatos (por defecto).** Incluye un **decision helper** interactivo: una pregunta "¿Qué quieres hacer?" con 8 intenciones; al elegir una se revela el **mode recomendado** + una pista. Convierte la matriz densa de 19 filas en una guía dirigida (recognition > recall). Datos en el array `INTENTS`.
- **Divulgación progresiva.** Las tablas pesadas (matriz de 19 modes, 58 registros, anatomía DESIGN.md, coste por patrón, 12 invocaciones) arrancan **plegadas** en `<details class="cb-ai__more">` con un summary tipo botón.
- **Buscador transversal.** Pasa de filtrar dentro de un filtro a ser global: al escribir se **sale del modo tabs**, se revelan todas las secciones y se muestran solo los bloques que matchean (abriendo los `<details>` coincidentes y colapsando panels vacíos). Al limpiar (o al pulsar una pestaña) se vuelve al modo tabs. `aiApply()` es la única fuente de verdad (modo tabs vs. búsqueda según el valor del input).

### Reparto en pestañas (chunking)

| Pestaña | Contenido |
|---------|-----------|
| `Empezar` | Intro 1 frase + decision helper + "Cómo invocarlo bien" (3 pasos) + plantilla básica |
| `Elegir mode` | Mapa de familias (tarjetas) + matriz completa (plegada) + reglas de uso |
| `Invocar` | Plantillas de prompt + ejemplos por runtime + invocaciones recomendadas (plegado) |
| `Tools` | awesome-design completo (incl. anatomía, ejemplos y 58 registros, plegados) |
| `Referencia` | Estructura de la carpeta AI + coste de tokens + fuentes de verdad |

### Clases nuevas (CSS)

`.cb-ai__nav` (sticky), `.cb-ai__tabs` / `.cb-ai__tab`, `.cb-ai__panel`, `.cb-ai__searchHint`, `.cb-ai--searching`, `.cb-ai__more` / `__moreSum` / `__moreBody`, y el decision helper `.cb-ai__pick` / `__pickOpt` / `__pickPanel` / `__pickRes` / `__pickModes`. Se eliminaron `.cb-ai__toolbar`, `.cb-ai__chips`, `.cb-ai__chip` y `.cb-ai__filters`.

### A11y

Tabs con patrón ARIA (`aria-selected`, `tabindex` roving, flechas/Home/End), `tabpanel` con `aria-labelledby`, decision helper con `aria-pressed`, hint de búsqueda con `aria-live="polite"`. Verificado: `node --check` de `ai.js` OK; balance de llaves de `storybook.css` OK (525/525).

### Segmento dedicado a awesome-design

La pestaña **Tools** se reestructuró como un explainer didáctico autocontenido, en orden _qué es → cómo se usa → ejemplos → detalle_:

- **Qué es**: concepto de `DESIGN.md` (formato de Google Stitch, texto plano que leen los agentes de diseño) + mini-tabla `AGENTS.md` (agentes de código) vs `DESIGN.md` (agentes de diseño).
- **Cómo se usa**: flujo de 4 pasos (elegir marca → mirar `preview.html` → pasar el `DESIGN.md` al agente → elegir mode y aterrizar en 42DS si hace falta) con la tarjeta de pasos (`aiStep`), más una nota sobre cómo solicitar marcas nuevas al upstream.
- **Ejemplos** (subidos arriba), **Qué hay dentro**, **Anatomía** (plegada) y **Registros** (plegado) a continuación.

### Pendientes de esta iteración

- El estado de pestaña activa **no persiste** entre navegaciones del storybook: cada visita arranca en "Empezar" (comportamiento aceptado, coherente con el reset del overview). Si se quisiera persistir, habría que guardar en `sessionStorage`/hash.
- Sigue sin resaltado de coincidencias (`<mark>`) por la misma razón que antes (HTML arbitrario en los bloques).

## Fuentes revisadas

- `fourty/storybook/js/ai.js`, `fourty/storybook/js/changelog.js` (patrón de buscador/chips reutilizado).
- `fourty/storybook/css/storybook.css` (bloques `.cb-ai__*` y `.cb-cl__*`).
- `fourty/storybook/assets/icons.js` (iconos `magnifying-glass`, `x`), `fourty/storybook/js/core/storybook.js` (contenedor `#cbDocs`, `SB.register`), `fourty/index.html` (orden de carga).
- `AI/tools/awesome-design/DESIGN.md`, `AI/tools/awesome-design/awesome-design-md-main/README.md` y el árbol `design-md/<marca>/`.
- `AI/mind-system/agents/mode-doc.md` (spec del modo CHANGE+DOC).
