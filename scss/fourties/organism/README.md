# Organism – Bloques complejos

Secciones completas formadas por molecules y atoms. Prefijo de clase: `ft-org-`.

> **Importante**: La carpeta es `organism` (singular), no `organisms`.

## Inventario completo (35 organisms)

| Carpeta | Clase base | Descripción | Caso de uso (cuándo usarlo) |
|---------|-----------|-------------|------------------------------|
| `accordion/` | `.ft-org-accordion` | Bloque acordeón complejo | Agrupar bloques completos plegables que combinan molecules (p. ej. clasificaciones con `ft-mol-sorting`); más rico que `ft-mol-accordion`. |
| `author/` | `.ft-org-author` | Bloque de autor completo | Ficha completa del autor al pie del artículo (bio, foto, redes, más artículos). |
| `authors/` | `.ft-org-authors` | Bloque de múltiples autores | Ficha completa de varios autores de una pieza colaborativa. |
| `boxfeatures/` | `.ft-org-boxfeatures` | Caja de características/features | Bloque destacado de ventajas/características (suscripción, producto, servicio). |
| `breadcrumb/` | `.ft-org-breadcrumb` | Migas de pan a nivel organism (tiene variante AMP) | Migas de pan a nivel de página, con contenedor y lógica propios. |
| `cardhome/` | `.ft-org-cardhome` | Tarjeta de portada/home | Pieza principal de portada con jerarquía editorial completa (apertura). |
| `cds-statics/` | _(no CSS)_ | Artefactos estáticos de organism | Carpeta de artefactos; no es un componente con estilos. |
| `comments/` | `.ft-org-comments` | Bloque de comentarios completo | Sección de comentarios completa: cabecera, formulario y listado de hilos. |
| `container/` | `.ft-org-container` | Contenedor de sección a ancho completo de viewport | Scaffold genérico edge-to-edge (fondo + contenido centrado). Variantes `--welcome/--chips/--curved/--seeker/--communities`. **Ver [GUIA.md](container/GUIA.md).** |
| `currentNews/` | `.ft-org-currentNews` | Noticias actuales/breaking news | Bloque de últimas noticias / breaking news en portada. |
| `directNews/` | `.ft-org-directNews` | Directo/live blog (tiene variante AMP) | Cobertura en directo: entradas cronológicas de un evento en vivo. |
| `footer/` | `.ft-org-footer` | Footer de sitio autosuficiente (`--lite`, …) | Pie de página principal del medio, con su propio reset y box model; variante `--lite` ligera. |
| `footer-multibrand/` | `.ft-org-footer-multibrand` | Footer multi-marca | Pie de página con enlaces a todas las cabeceras/marcas del grupo. |
| `game/` | `.ft-org-game` | Bloque de juego/quiz | Pasatiempo, quiz o juego interactivo embebido (porras, trivials). |
| `header-custom/` | `.ft-org-header-custom` | Cabecera personalizable completa | Cabecera de página configurable a medida de un especial o sección. |
| `header-multibrand/` | `.ft-org-header-multibrand` | Cabecera multi-marca | Barra superior con acceso a las marcas del grupo. |
| `header-regionales/` | `.ft-org-header-regionales` | Cabecera para periódicos regionales | Cabecera específica de los periódicos regionales. |
| `header-revistas/` | `.ft-org-header-revistas` | Cabecera para revistas | Cabecera específica de las revistas. |
| `header-showroom/` | `.ft-org-header-showroom` | Cabecera del showroom 42DS | Cabecera del propio showroom de documentación 42DS (no usar en producción). |
| `hero/` | `.ft-org-hero` | Hero/portada de página | Hero a toda pantalla: imagen/vídeo de fondo + titular destacado al inicio. |
| `masthead/` | `.ft-org-masthead` | Masthead/cabecera principal del medio | Cabecera principal: logo, navegación, búsqueda y acceso de usuario. |
| `mediareport/` | `.ft-org-mediareport` | Bloque de reporte multimedia | Reportaje multimedia inmersivo (scrollytelling, mezcla de formatos). |
| `mediaviewer/` | `.ft-org-mediaviewer` | Visor de contenido multimedia | Visor de galería/vídeo a pantalla completa con navegación. |
| `multibox/` | `.ft-org-multibox` | Caja multi-contenido | Bloque que combina varios contenidos heterogéneos en una rejilla. |
| `newsletter/` | `.ft-org-newsletter` | Bloque de suscripción newsletter | Bloque completo de captación: texto + formulario + privacidad. |
| `object/` | `.ft-org-object` | Objeto embebido completo (tiene variante AMP) | Envolver un objeto/widget externo completo con su chrome (cotizaciones, terceros). |
| `overview-panel/` | `.ft-org-overview-panel` | Panel de resumen/overview | Panel de resumen de datos o navegación de un especial. |
| `path/` | `.ft-org-path` | Ruta editorial completa | Recorrido editorial por pasos / hilo narrativo a nivel de página. |
| `paywall/` | `.ft-org-paywall` | Muro de pago | Muro de pago completo que bloquea el contenido (flujo Piano). |
| `pick/` | `.ft-org-pick` | Bloque de pronósticos/porra | Agrupa tarjetas `ft-mol-pick` con barras de progreso `ft-mol-bar` (porra, quiniela, predicciones). |
| `scoreboard/` | `.ft-org-scoreboard` | Marcador deportivo completo | Marcador completo: partido + estadísticas + clasificación. |
| `search-autocomplete/` | `.ft-org-search-autocomplete` | Búsqueda con autocompletado | Buscador con sugerencias en vivo / resultados predictivos. |
| `services/` | `.ft-org-services` | Bloque de servicios | Rejilla de servicios del medio (tiempo, tráfico, loterías…). |
| `suggestions-chips/` | `.ft-org-suggestions-chips` | Chips de sugerencias | Conjunto de chips de búsquedas frecuentes / sugerencias ("las más buscadas"). |
| `toolbar/` | `.ft-org-toolbar` | Barra de herramientas de página | Acciones globales sobre el artículo (compartir, tamaño de letra, escuchar). |

> **AMP**: Los organisms con "tiene variante AMP" tienen su archivo `amp-[nombre].scss` directamente en `scss/fourties/organism/` (no dentro de la carpeta del componente). Archivos AMP existentes: `amp-breadcrumb`, `amp-directNews`, `amp-object`.

## Variantes por marca

Los organisms son los bloques más específicos de cada medio, por lo que casi siempre tienen variantes:

```
organism/mediaviewer/
├── _mediaviewer.scss          # Estructura base
├── mediaviewer-ep.scss
├── mediaviewer-epe.scss
├── mediaviewer-regionales.scss
├── mediaviewer-revistas.scss
├── mediaviewer-sport.scss
└── mediaviewer-ux.scss
```

## Nomenclatura legacy

Algunos organisms usan camelCase en el nombre del archivo base por razones históricas (no corregir):

- `cardhome/` → `_cardHome.scss`

Mantener la nomenclatura existente en cada carpeta. Para nuevos organisms usar kebab-case.

## Reglas para IA

1. **Composición**: Los organisms contienen molecules y atoms; no reimplementar estilos de sus hijos
2. **Variantes**: Casi siempre existe `[organismo]-[marca].scss`; verificar antes de asumir que no hay variante
3. **Nomenclatura**: Respetar el camelCase legacy en archivos que ya lo usan; nuevos organismos en kebab-case
4. **Complejidad**: Son los archivos más grandes del DS; usar comentarios de sección para separar bloques
5. **Import**: Verificar que el core de la marca (`[marca]-core.scss`) importe la variante correcta
6. **AMP**: Las variantes AMP son archivos sueltos en `organism/`; seguir el patrón `amp-[nombre].scss`
7. **Inventario**: Hay 35 organisms; verificar esta lista antes de crear uno nuevo para evitar duplicados
8. **Guías dedicadas**: Algunos organisms tienen documentación extendida propia (ej. `container/GUIA.md` con anatomía, variantes y copy-paste); consultarla antes de tocar ese componente
