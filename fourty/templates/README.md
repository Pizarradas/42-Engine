# Templates – Plantillas de página

Plantillas que combinan organisms, molecules y atoms para representar tipos de página completos.

## Convención de nombres

- **Prefijo de archivo**: `template-`
- **Ejemplos**: `template-noticia.html`, `template-cardHome.html`, `template-cerca-fase-2--*.html`

## Estructura

Los templates son **composiciones** de componentes existentes. No definen nuevas clases; reutilizan:
- Organisms (masthead, cardHome, etc.)
- Molecules (card, tabs, etc.)
- Atoms (btn, link, etc.)

## Tipos de templates

| Patrón | Uso | Caso de uso (cuándo usarlo) |
|--------|-----|------------------------------|
| `template-noticia*.html` | Página de noticia | Punto de partida para maquetar el cuerpo de un artículo. |
| `template-cardHome*.html` | Portada tipo card | Estructura de una portada/sección a base de cards. |
| `template-cerca-fase-2--*.html` | Búsqueda Cerca (varias fases) | Iterar el flujo de búsqueda geolocalizada CERCA por fases. |
| `template-pasatiempos-*.html` | Pasatiempos (sudoku, cuatro en campo) | Base de pasatiempos/juegos (sudoku, porras, "cuatro en campo"). |
| `template-masthead--*.html` | Variantes de masthead | Comparar y elegir una configuración de cabecera. |

## Template vs Layout vs POC (criterio de decisión)

| Si necesitas… | Usa | Por qué |
|---------------|-----|---------|
| Ensamblar un **tipo de página** (noticia, portada) con componentes del DS | **Template** | Composición reutilizable, sin clases nuevas. |
| Ver una **página real completa de un medio** (con su marca, masthead y footer) | **Layout** | Página final lista por marca (`layout-[marca]-[tipo]`). |
| **Validar un flujo o propuesta nueva** antes de integrarla | **POC** | Prototipo de alta fidelidad con 42DS Lite. |

## CSS

Usan el mismo bundle que el resto del showroom: `ux-index.css` (o el de la marca correspondiente).

## Reglas para IA

1. **No crear clases nuevas**: Los templates solo ensamblan componentes
2. **Grid**: Usar `ft-layout-grid-flex` para la estructura
3. **Nomenclatura**: `template-[tipo]-[variante].html`
4. **Referencia**: Consultar layouts para ver cómo se integran en páginas completas
5. **Fases**: Algunos templates tienen fases (ej: cerca-fase-2--00-inicio, --02-A-feed-resultados)
