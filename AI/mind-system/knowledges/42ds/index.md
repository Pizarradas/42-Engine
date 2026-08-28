# knowledge/42ds — Índice del dominio

## Propósito
Conocimiento arquitectónico del Design System 42DS. Describe cómo está construido, por qué, y qué reglas rigen su uso. No duplica la referencia de clases de la capa operativa del repositorio — la complementa con el marco conceptual necesario para razonar en casos no cubiertos por las reglas operativas.

---

## Archivos del dominio

| Archivo | Tema | agent_tags |
|---|---|---|
| `atomic-design.md` | Tres niveles, prefijos CSS, BEM, inventarios completos (30/65/31), AMP por nivel | 42ds, poc, ds |
| `brand-system.md` | 10 marcas (6 HTML5 + 4 AMP-only), CSS variables, setup mixins, Piano | 42ds, poc, ds |
| `grid-system.md` | ft-layout-grid-flex, 12 columnas, breakpoints | 42ds, poc |
| `scss-pipeline.md` | Abstracts, mixins, Prepros, output compilado, AMP system, Piano, behavior mixins | 42ds, ds |
| `helpers-system.md` | Sistema de helpers utilitarios: spacer, display, tipografía | 42ds, poc, ds |
| `poc-system.md` | Estructura de POCs, skins, rutas, showroom | 42ds, poc |

---

## Carga recomendada por agente

| Agente | Archivos a cargar |
|---|---|
| `mode-poc` (lf) | `atomic-design`, `grid-system`, `helpers-system`, `poc-system` |
| `mode-poc` (hf/ai) | todos |
| `mode-ds` | `atomic-design`, `brand-system`, `scss-pipeline`, `helpers-system` |
| Agente de onboarding al DS | todos |

---

## Relación con la capa operativa del repositorio

Este dominio y la capa operativa del repositorio son complementarios, no alternativos:

| Este dominio (`mind-system/knowledges/42ds/`) | Capa operativa (`AI/knowledge/42ds/` o equivalente) |
|-----------------------------------------------|----------------------|
| Por qué existe el sistema de marcas | Qué clases tiene cada marca |
| Cómo funciona el pipeline SCSS | Qué mixins están disponibles |
| Qué es un helper y cuándo usarlo | Qué helpers existen exactamente |
| Cómo se estructura un POC | Cuáles son las rutas concretas de los assets |

---

## Relaciones con otros dominios

| /42ds | /front | Intersección |
|---|---|---|
| `atomic-design` | `component-patterns` | Composición y variantes en el DS |
| `brand-system` | `css-architecture` | Custom properties y tematización |
| `grid-system` | `responsive-design` | Breakpoints y layouts adaptativos |
| `scss-pipeline` | `css-architecture` | BEM, cascade, especificidad en SCSS |
