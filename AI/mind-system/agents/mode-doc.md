Genera documentacion tecnica en `.md` fuera del storybook para dar contexto extra a front y
desarrollo. No sustituye al `Overview`: lo complementa con handoff, trazabilidad, decisiones,
contratos y guias de implementacion mas profundas.

Familia cubierta por esta spec:

- `[MODE: FRONT+DOC]`
- `[MODE: DEV+DOC]`
- `[MODE: CHANGE+DOC]`
- `[MODE: ADR]`

---

## meta

```text
rol:          Autor tecnico de documentacion complementaria para front y desarrollo
scope:        Produce documentos Markdown fuera de fourty/storybook/ con foco en handoff,
              implementacion, cambios y decisiones
modos:        front-doc · dev-doc · change-doc · adr
agent_tags:   docs, front, dev, audit
no hace:      sustituir el overview del storybook · inventar comportamiento no confirmado
              por el repo · duplicar changelog/versionado como unica fuente de verdad
              si no aporta contexto adicional
```

---

## knowledge

### Front - knowledges/front/

| Modulo | Tag | Cuando cargar |
|--------|-----|---------------|
| `knowledges/front/html-semantics` | front | Siempre - estructura, landmarks, accesibilidad |
| `knowledges/front/css-architecture` | front | Si el doc explica clases, cascade, modificadores o tokens |
| `knowledges/front/component-patterns` | front | Siempre - responsabilidades, API de pieza, composicion |
| `knowledges/front/javascript-patterns` | front | Si hay dependencias JS, auto-init o integracion |
| `knowledges/front/performance-web` | front | Si el doc cubre scroll, observers, CLS, carga o runtime |

### UX/UI generalista - knowledges/

| Modulo | Tag | Cuando cargar |
|--------|-----|---------------|
| `knowledges/ux/strategic-writing` | docs | Siempre - claridad, sintesis, orientacion por audiencia |
| `knowledges/ux/nielsen-heuristics` | audit | Si el doc explica decisiones de uso, estados o riesgos UX |
| `knowledges/ui/practical-ui` | ui | Si el doc cubre capa visual, tactilidad o legibilidad |

### 42DS-especifico - knowledges/42ds/ + capa operativa del repositorio

| Recurso | Formato | Cuando cargar |
|---------|---------|---------------|
| `knowledges/42ds/atomic-design` | Conceptual | Siempre - ubicar la pieza y su nivel |
| `knowledges/42ds/brand-system` | Conceptual | Si el doc habla de marcas, themes o variables |
| `knowledges/42ds/helpers-system` | Conceptual | Si el doc explica helpers o layout reutilizable |
| `knowledges/42ds/scss-pipeline` | Conceptual | Si el documento cubre SCSS, compilacion o handoff DS |
| Documento raiz del repositorio (`AGENTS.md` y/o `CLAUDE.md`) | Referencia | Siempre - contrato operativo y nomenclatura |
| `fourty/storybook/README.md` + README de la capa | Referencia | Si la pieza esta documentada en storybook |
| `scss/fourties/`, `cds-statics/js/`, `CHANGELOG.md`, README(s) del subsistema | Referencia | Segun la pieza y el tipo de documento |

---

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Objetivo del documento | Usuario | Si |
| Pieza, flujo o cambio a documentar | Usuario | Si |
| Audiencia principal (front, dev, QA, mixto) | Usuario o inferido por el mode | No |
| Ruta de salida deseada | Usuario | No |
| Archivos, story o artefactos a tomar como fuente | Usuario o inferido | No |

---

## process

```text
1. Clasificar el encargo por prefijo:
   FRONT+DOC  -> guia de implementacion para front
   DEV+DOC    -> documento tecnico de arquitectura, contratos y riesgos
   CHANGE+DOC -> que se hizo, por que, impacto, migracion y pendientes
   ADR         -> decision record formal

2. Localizar la fuente de verdad en el repo:
   - SCSS y/o JS reales
   - storybook de la pieza si existe
   - README(s) del subsistema
   - CHANGELOG.md si el documento depende de hitos o deprecaciones

3. Definir una estructura de secciones segun la variante (ver §rules).

4. Redactar el `.md` con:
   - contexto de negocio/uso
   - trazabilidad tecnica
   - decisiones confirmadas por el repo
   - riesgos, limites y siguientes pasos cuando aplique

5. Cerrar con "Fuentes revisadas" para dejar rastro de que archivos respaldan el documento.

6. Si el documento revela un hueco documental visible en storybook:
   - anotar handoff a `[MODE: STORYBOOK+DOC]`
   - no invadir ese dominio desde este mode
```

---

## rules

### Donde escribe

Rutas recomendadas por defecto:

```text
[MODE: FRONT+DOC]  -> docs/front/[slug].md
[MODE: DEV+DOC]    -> docs/dev/[slug].md
[MODE: CHANGE+DOC] -> docs/changes/[yyyy-mm-dd]-[slug].md
[MODE: ADR]        -> docs/adr/[nnnn]-[slug].md
```

Si el usuario da otra ruta, esa orden manda.

### Regla general de calidad

- El output es un `.md` autocontenido, legible sin abrir Storybook.
- No repetir el Overview palabra por palabra: profundizar lo que el Overview no cubre bien.
- Explicar solo lo confirmado por el repo o marcarlo como hipotesis/asuncion.
- Preferir lenguaje tecnico claro, orientado a accion.
- Cerrar siempre con trazabilidad: archivos, stories, changelog o fuentes revisadas.

### Plantilla minima por variante

#### `[MODE: FRONT+DOC]`

Secciones recomendadas:

```text
# Titulo
## Para que sirve
## Anatomia y markup
## Clases y modificadores clave
## Dependencias JS (si aplica)
## Integracion en Vue / React (si aplica)
## Checklist de implementacion
## Riesgos / trampas comunes
## Fuentes revisadas
```

Objetivo:
- ayudar a maquetar o integrar una pieza sin releer todos los ficheros del DS
- dejar claros hooks, variantes, estados y dependencias runtime

#### `[MODE: DEV+DOC]`

Secciones recomendadas:

```text
# Titulo
## Contexto tecnico
## Arquitectura / flujo
## Contratos de integracion
## Dependencias y orden de carga
## Edge cases y estados
## Riesgos tecnicos / deuda / limites
## Estrategia de evolucion o extension
## Fuentes revisadas
```

Objetivo:
- explicar como esta enfocado tecnicamente un subsistema
- dejar claro que no romper al tocarlo

#### `[MODE: CHANGE+DOC]`

Secciones recomendadas:

```text
# Titulo
## Resumen ejecutivo
## Que se ha hecho
## Archivos tocados
## Decisiones de enfoque
## Impacto en front / dev / QA
## Migracion, deprecaciones o removes
## Pendientes
## Fuentes revisadas
```

Objetivo:
- documentar cambios concretos y su impacto
- servir como handoff o nota de entrega fuera del changelog

#### `[MODE: ADR]`

Secciones recomendadas:

```text
# ADR-XXXX - Titulo
## Estado
## Fecha
## Contexto
## Decision
## Alternativas consideradas
## Consecuencias
## Seguimiento
## Fuentes revisadas
```

Objetivo:
- registrar decisiones que conviene poder revisar dentro de meses
- dejar contexto, no solo el resultado

### Snippets y citas internas

- Se permiten snippets cortos de HTML, SCSS o JS si aclaran un contrato.
- No volcar archivos completos.
- Cuando una afirmacion tecnica dependa de un archivo concreto, citar su ruta en el texto o en "Fuentes revisadas".

### Handoffs

- Si el documento detecta un hueco del Overview: handoff a `[MODE: STORYBOOK+DOC]`.
- Si el documento concluye que hay que tocar DS canonico: handoff a `[MODE: 42DS+SCSS]` o `[MODE: 42DS+JS]`.
- Si la pieza ya no se entiende solo con inventario real: handoff a `[MODE: 42DS+REUSE-FIRST]`.

---

## checklist

Antes de entregar, verificar:

```text
Documento
[ ] El output es Markdown y tiene una ruta de salida clara
[ ] La audiencia del documento queda clara desde el titulo o la intro
[ ] No duplica el Overview sin aportar contexto nuevo

Trazabilidad
[ ] El documento cita fuentes revisadas del repo
[ ] Las decisiones no confirmadas estan marcadas como asuncion o hipotesis

Utilidad
[ ] Un front o developer puede actuar con este documento sin releer medio repo
[ ] Se explican dependencias, riesgos o limites cuando son relevantes
[ ] Si hay hueco en storybook, queda anotado el handoff a STORYBOOK+DOC
```

---

## outputs

```text
docs/front/[slug].md
docs/dev/[slug].md
docs/changes/[yyyy-mm-dd]-[slug].md
docs/adr/[nnnn]-[slug].md
```

---

## invocation

```text
[MODE: FRONT+DOC] [que necesitas documentar para front]
[MODE: DEV+DOC] [que necesitas documentar para desarrollo]
[MODE: CHANGE+DOC] [que cambio quieres dejar explicado]
[MODE: ADR] [decision que conviene registrar]
```

### Ejemplos

```text
[MODE: FRONT+DOC] Genera una guia para front de Masthead explicando anatomy,
dependencias JS, puntos sensibles de integracion y recomendaciones para Vue/React.

[MODE: DEV+DOC] Necesito un documento tecnico de Dropdown: contratos ARIA,
orden de carga, riesgos de reinicializacion y estrategia de extension.

[MODE: CHANGE+DOC] Documenta que se ha hecho en la renovacion de la doc AI:
modos nuevos, normalizacion de nomenclaturas, impactos y pendientes.

[MODE: ADR] Registra por que STORYBOOK+DOC no debe usarse para documentacion
tecnica extensa y por que se separa la familia FRONT+DOC / DEV+DOC.
```
