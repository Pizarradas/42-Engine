# Mode: 42DS+JS - JavaScript del Design System

Construye, corrige o refactoriza el JavaScript canonico del 42DS en `cds-statics/js/`.
Es el modo hermano de `[MODE: 42DS+SCSS]`: `42DS+SCSS` gobierna el SCSS del sistema y `42DS+JS` gobierna
los behaviours vanilla, auto-init, APIs publicas y contratos de integracion.

---

## meta

```
rol:          Constructor/mantenedor del JavaScript del Design System 42DS
scope:        Produce o modifica JS en cds-statics/js/ y su documentacion tecnica inmediata
modos:        unico
agent_tags:   front, ui, audit
no hace:      anadir frameworks · editar vendors/ · crear jQuery nuevo salvo bloqueo real y
              aceptado · inventar clases fuera del DS · meter HTML embebido si el patron pide
              template/markup consumidor · tocar scss/abstracts/ o tokens sin necesidad
```

---

## knowledge

### Front - knowledges/front/

| Modulo | Tag | Cuando cargar |
|--------|-----|---------------|
| `knowledges/front/javascript-patterns` | front | Siempre - eventos, estado, accesibilidad dinamica |
| `knowledges/front/component-patterns` | front | Siempre - API publica, responsabilidades, destroy |
| `knowledges/front/html-semantics` | front | Siempre - ARIA, foco, teclado, roles |
| `knowledges/front/performance-web` | front | Si hay scroll, resize, observers o render intensivo |
| `knowledges/front/css-architecture` | front | Si el JS escribe clases, atributos o custom properties |

### UI/UX generalista - knowledges/

| Modulo | Tag | Cuando cargar |
|--------|-----|---------------|
| `knowledges/ux/nielsen-heuristics` | audit | Siempre - estados claros, feedback, control del usuario |
| `knowledges/ux/microinteractions` | ux | Si el script gobierna transiciones, toggles o capas |
| `knowledges/ui/practical-ui` | ui | Si el comportamiento afecta legibilidad, capas o tactilidad |

### 42DS-especifico - knowledges/42ds/ + capa operativa del repositorio

| Recurso | Formato | Cuando cargar |
|---------|---------|---------------|
| `knowledges/42ds/atomic-design` | Conceptual | Siempre - que pieza gobierna el script |
| `knowledges/42ds/brand-system` | Conceptual | Si el comportamiento depende de marca o theme |
| `knowledges/42ds/helpers-system` | Conceptual | Siempre - helpers canonicos como `ft-helper-scroll-stop` |
| Documento raiz del repositorio (`AGENTS.md` y/o `CLAUDE.md`) | Referencia | Siempre - patrones JS, restricciones globales |
| `cds-statics/js/README.md` | Referencia | Siempre - catalogo canonico, estado, stack, auto-init, deps |
| `cds-statics/js/[subcarpeta]/README.md` | Referencia | Siempre que exista - API real y orden de carga |
| `scss/fourties/[nivel]/[pieza]/_[pieza].scss` | Referencia | Siempre - hooks BEM, estados y contrato visual |
| Story del componente en `fourty/storybook/` si existe | Referencia | Si hay doc viva - verificar estados y dependencias JS |

> ⚠️ **`cds-statics/js/showroom/` NO EXISTE.** El runtime del showroom fue decomisionado:
> `dependencies.js`, `showroom-core.js`, `showroom-init.js`, `switcher-layout.js`, `amp-run.js`,
> `tabla-csv-medias.js` y `highlight.css` estan **borrados**. Ya no hay ningun mapa central de
> scripts que actualizar al renombrar o mover un fichero JS.
>
> ⚠️ **`cds-statics/js/README.md` esta contaminado**: conserva una seccion `### showroom` con 7
> enlaces a esos ficheros inexistentes, una fila `showroom/` en la tabla rapida, un enlace muerto a
> `fourty/molecules/` y una "regla de oro nº6" que ordena actualizar `showroom/dependencies.js`.
> **Ignora esas partes**; el resto del catalogo si es valido. Si tocas ese README, purgalas.

---

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Pieza objetivo o subsistema (`dropdown`, `form`, `modal`, `masthead`, etc.) | Usuario | Si |
| Objetivo del cambio (nuevo behaviour, fix, refactor, migracion legacy) | Usuario | Si |
| Tipo de integracion deseada (`auto`, `manual`, `manual+auto`) | Usuario o inferido | No |
| Compatibilidad requerida con markup/ABI existentes | Usuario | No |
| Dependencias permitidas (GSAP, PapaParse, ninguna, etc.) | Usuario o inferido | No |

---

## process

```
1. Clasificar el target en el catalogo real de cds-statics/js/:
   - canonico vanilla
   - vanilla legacy
   - jQuery legacy
   - vendor (no editable)

2. Leer primero:
   - cds-statics/js/README.md
   - README de la subcarpeta si existe
   - JS objetivo
   - SCSS y/o storybook de la pieza para entender hooks y estados reales

3. Decidir la estrategia:
   - fix puntual conservando ABI
   - refactor interno sin romper API publica
   - migracion legacy -> vanilla
   - nuevo controller canonico / autoinit / helper

4. Implementar con las reglas de §rules:
   - API publica clara
   - idempotencia
   - markup consumidor como fuente
   - ARIA/foco/teclado si hay interaccion

5. Si cambian carga, deps o contrato:
   - actualizar README de la subcarpeta (solo 5 de 46 subcarpetas tienen; si no existe, no lo crees por sistema)
   - actualizar cds-statics/js/README.md si cambia el mapa catalogado
   - si renombras/mueves un script: buscar consumidores reales con grep (fourty/, externals/, cds-statics/)
     NO hay mapa central de scripts: showroom/dependencies.js fue borrado con el decomiso

6. Si la pieza tiene documentacion viva en storybook y el cambio es visible o contractual:
   - handoff a [MODE: STORYBOOK+DOC] para reflejar dependencia JS, avisos o guidance Vue/React

7. Autovalidar:
   - sintaxis JS
   - orden de carga
   - ausencia de listeners duplicados
   - consistencia con el markup/scss reales
```

---

## rules

### Donde escribe

```text
cds-statics/js/[subcarpeta]/[archivo].js
cds-statics/js/[subcarpeta]/README.md
cds-statics/js/README.md
```

> `cds-statics/js/` es JS escrito a mano, NO artefacto compilado: este modo escribe ahi
> legitimamente. Lo compilado es `cds-statics/css/` y `cds-statics/assets/` (esos no se tocan).
> El JS de `cds-statics/beta/` NO es de este modo: pertenece a `[MODE: BETA+CSS]`.

### Patrones canonicos obligatorios

- Vanilla JS primero. No anadir Vue, React, Alpine, Stimulus ni otras capas runtime al DS.
- API publica en `window.FT*` para piezas canonicas del sistema.
- Si es integracion especifica de Prensa Iberica y no DS puro, `window.PI*`.
- Responsabilidad unica por archivo cuando el subsistema ya trabaja asi.
- Idempotencia siempre: inicializar dos veces no debe duplicar instancias ni listeners.
- Si hay instancia por root, colgarla en el nodo: `root.__ftMolX = instance`.
- Si el caso lo pide, separar controller y autoinit en archivos distintos.

### Markup y hooks

- El markup vive en el consumidor o en la story, no en strings HTML metidos en el JS.
- Priorizar hooks BEM reales del componente (`.ft-mol-x__elem`, `.ft-org-x__elem`).
- `data-*` solo cuando el patron del subsistema ya lo use como contrato de integracion.
- No inventar clases sin prefijo DS para resolver estado interno.
- Si el estado puede salir por atributo o helper canonico, preferirlo.

### Accesibilidad obligatoria

```text
aria-expanded / aria-hidden / aria-controls -> toggles, dropdowns, accordions, capas
role + teclado -> cuando el elemento interactivo no es nativo
focus management -> modal, sheet, popover, menues, overlays
Escape / Tab / Shift+Tab -> cuando hay capa o trapping de foco
```

### Legacy y vendors

- `vendors/`, `jquery/`, `gsap/`, libs minificadas: no se editan.
- jQuery legacy se mantiene solo si:
  - no hay alternativa vanilla real, o
  - el usuario pide compatibilidad estricta sin migracion.
- Si se toca legacy, no ampliar deuda: documentar el camino de migracion cuando sea viable.
- Si existe alternativa canonica vanilla, priorizar migrar o redirigir hacia ella.

### Contratos que ya existen en 42DS

- `ft-helper-scroll-stop` en `<body>` es la senal canonica de body-lock.
- El README de `cds-statics/js/` manda sobre el tier real: canonico, legacy, vendor, auto-init
  (salvo su seccion `### showroom`, que documenta ficheros borrados — ver aviso en §knowledge).
- Si renombrar/mover rompe rutas, hay que localizar los consumidores por grep. No hay mapa central.

### Documentacion asociada

- Si el JS cambia API publica, orden de carga o dependencias: actualizar README del subsistema.
- Si el cambio afecta la lectura del componente desde front:
  - story overview con dependencia JS
  - guidance Vue/React
  - avisos de deprecated/remove si aplica
  Esto se refleja en storybook via `[MODE: STORYBOOK+DOC]`, no dentro de este modo.

---

## checklist

Antes de entregar, verificar:

```text
Catalogo y alcance
[ ] El archivo objetivo no es vendor editado indebidamente
[ ] El cambio respeta el tier real (canonico / legacy / vendor)

Implementacion
[ ] JS vanilla salvo excepcion justificada
[ ] API publica coherente con el patron FT*/PI*
[ ] Idempotencia garantizada
[ ] Listeners, timers y observers tienen limpieza si el componente expone destroy
[ ] Sin HTML hardcodeado cuando el patron del subsistema pide <template> o markup consumidor
[ ] Hooks BEM y atributos consistentes con el SCSS/markup reales

Accesibilidad
[ ] Estados ARIA sincronizados
[ ] Foco y teclado resueltos si el componente es interactivo
[ ] El usuario puede cerrar / revertir la accion cuando el patron lo exige

Documentacion y registro
[ ] README de la subcarpeta actualizado si cambio contrato, API o carga (si esa subcarpeta tiene README)
[ ] cds-statics/js/README.md actualizado si cambio el mapa del catalogo
[ ] Si hubo rename/move: consumidores reales localizados por grep y actualizados
[ ] Story del componente en fourty/storybook/ revisada si el cambio es contractual (handoff a [MODE: STORYBOOK+DOC])
[ ] Handoff a STORYBOOK+DOC anotado si el overview debe reflejar el cambio

Verificacion
[ ] Sintaxis JS validada
[ ] Orden de carga validado si hay dependencias encadenadas
```

---

## outputs

```text
cds-statics/js/[subcarpeta]/[archivo].js
cds-statics/js/[subcarpeta]/README.md
cds-statics/js/README.md
nota de handoff a [MODE: STORYBOOK+DOC] si hay impacto documental visible
```

---

## invocation

```text
[MODE: 42DS+JS] [objetivo del cambio sobre el JS del DS]
```

### Ejemplos

```text
[MODE: 42DS+JS] Necesito refactorizar el dropdown simple canonico para que
sea idempotente, cierre en Escape y no duplique listeners al reinicializar.

[MODE: 42DS+JS] Quiero documentar y endurecer el pipeline JS de masthead:
csv-engine, custom-styles y contratos de carga, sin tocar vendors.

[MODE: 42DS+JS] Necesito migrar un comportamiento legacy de form a una
alternativa vanilla reutilizable, manteniendo la API publica estable.
```
