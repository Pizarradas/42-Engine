# Molecules – Componentes compuestos

Conjuntos de atoms. Prefijo de clase: `ft-mol-`. Pueden contener atoms pero no reimplementan sus estilos.

## Inventario completo (71 molecules)

| Carpeta | Clase base | Descripción | Caso de uso (cuándo usarlo) |
|---------|-----------|-------------|------------------------------|
| `accordion/` | `.ft-mol-accordion` | Acordeón expandible | Agrupar contenido extenso en secciones plegables (FAQ, fichas, "ver detalles"). |
| `action-bar/` | `.ft-mol-action-bar` | Barra de acciones flotante tipo píldora | Acciones contextuales flotantes sobre el contenido (compartir, guardar, navegar) en una píldora con sombra; entra con animación. |
| `advice/` | `.ft-mol-advice` | Aviso compuesto: título + contenido + acción (tiene variante AMP) | Aviso destacado con título, texto y acción separado por borde; versión más rica que el atom `ft-advice`. |
| `author/` | `.ft-mol-author` | Autor individual de artículo | Firma de un autor con avatar y nombre en la cabecera de un artículo. |
| `authors/` | `.ft-mol-authors` | Listado de autores | Mostrar varios autores/colaboradores de una misma pieza. |
| `az-list/` | `.ft-mol-az-list` | Lista indexada A-Z con rail tipo iOS Contacts | Listas largas alfabéticas (localidades, equipos, contactos): cabeceras por letra, scrubber lateral y empty state. Suele ir dentro de un `ft-mol-modal`. |
| `bar/` | `.ft-mol-bar` | Barra de información/progreso | Barra de progreso o medición horizontal (progreso de lectura, porcentaje, avance). |
| `boxInfo/` | `.ft-mol-boxInfo` | Caja de información destacada (tiene variante AMP) | Destacar un bloque informativo dentro del cuerpo del artículo (dato clave, contexto, "lo que debes saber"). |
| `breadcrumb/` | `.ft-mol-breadcrumb` | Migas de pan (tiene variante AMP) | Ruta de navegación jerárquica (Inicio › Sección › Artículo). |
| `btnGroup/` | `.ft-mol-btnGroup` | Grupo de botones (tiene variante AMP) | Agrupar botones relacionados (filtros, segmentación, acciones de una toolbar). Incluye `--is-scrollable` como variante autosuficiente para hileras horizontales con overflow. |
| `card/` | `.ft-mol-card` | Tarjeta de contenido | Pieza de noticia en portadas y listados: imagen + titular + metadatos, todo clicable. |
| `card-newsletter/` | `.ft-mol-card-newsletter` | Tarjeta de suscripción newsletter | CTA de suscripción a newsletter intercalado en un listado o dentro del artículo. |
| `card-video-thumb/` | `.ft-mol-card-video-thumb` | Tarjeta con miniatura de vídeo | Item de listado de vídeos con thumbnail, duración e indicador de play. |
| `carousel/` | `.ft-mol-carousel` | Carrusel de contenido | Mostrar varios items en un slider horizontal navegable (relacionados, destacados). |
| `comment/` | `.ft-mol-comment` | Comentario de usuario | Renderizar un comentario individual con autor, fecha y texto en un hilo. |
| `countdown/` | `.ft-mol-countdown` | Cuenta atrás | Cuenta atrás a un evento con días/horas/min/seg (lanzamiento, partido, oferta). |
| `dataSheed/` | `.ft-mol-dataSheed` | Ficha de datos | Tabla de pares clave-valor (ficha técnica de un producto, datos de un evento/persona). |
| `divider/` | `.ft-mol-divider` | Separador visual | Separar visualmente secciones de contenido (línea, espacio o etiqueta separadora). |
| `dropdown/` | `.ft-mol-dropdown` | Menú desplegable | Menú de opciones que se despliega al hacer click (acciones, navegación secundaria, selects custom). |
| `figcaption/` | `.ft-mol-figcaption` | Pie de foto/figura | Pie de imagen con descripción y crédito de autoría. |
| `footerbasic/` | `.ft-mol-footerbasic` | Pie de página básico | Footer ligero con enlaces legales y copyright (páginas simples, landings). |
| `form/` | `.ft-mol-form` | Formulario | Campos de formulario estilizados: input, label flotante, search, `--has-clear`, `--has-predictive`. |
| `gallery/` | `.ft-mol-gallery` | Galería de imágenes | Mostrar un conjunto de imágenes navegable (grid o slider de fotos). |
| `gallery-img/` | `.ft-mol-gallery-img` | Item de imagen de galería | Variante de imagen individual dentro de una galería. |
| `graphLegend/` | `.ft-mol-graphLegend` | Leyenda de gráfico | Leyenda que acompaña a un gráfico (series, colores, valores). |
| `headband/` | `.ft-mol-headband` | Cabecera de sección/franja (tiene variante AMP) | Franja superior de sección con título y, opcionalmente, navegación o CTA. |
| `header-custom/` | `.ft-mol-header-custom` | Cabecera personalizable | Cabecera de bloque/módulo configurable (título + acciones + "ver más"). |
| `label/` | `.ft-mol-label` | Etiqueta de estado/contenido (tiene variante AMP) | Badge pequeño de estado o categoría ("Directo", "Premium", "Nuevo"). |
| `lnkbox/` | `.ft-mol-lnkbox` | Caja de enlace | Tile clicable de navegación; con `--card` se vuelve tarjeta (grids de secciones, comunidades). |
| `marker/` | `.ft-mol-marker` | Marcador/pin de mapa | Pin o marcador posicionado sobre un mapa o imagen. |
| `masonry/` | `.ft-mol-masonry` | Layout tipo masonry | Distribuir tarjetas de alturas variables en columnas tipo Pinterest. |
| `menuanchor/` | `.ft-mol-menuanchor` | Menú de anclas | Navegación interna que enlaza a anclas de la misma página (índice sticky de secciones). |
| `modal/` | `.ft-mol-modal` | Modal/diálogo | Ventana superpuesta: formulario, listado drill-down (`-has--back`), confirmación. |
| `modNews/` | `.ft-mol-modNews` | Módulo de noticias (tiene variante AMP) | Bloque editorial de noticia (imagen + titular + entradilla) en portadas y secciones. |
| `multimedia/` | `.ft-mol-multimedia` | Contenedor multimedia (tiene variante AMP) | Envolver vídeo/audio/embed con su pie y controles, manteniendo ratio. |
| `number-highlighted/` | `.ft-mol-number-highlighted` | Número destacado/estadística | Resaltar una cifra grande con su etiqueta (dato del día, resultado, KPI). |
| `overlay-live/` | `.ft-mol-overlay-live` | Overlay de evento en directo | Distintivo/overlay "EN DIRECTO" sobre contenido en vivo. |
| `pagination/` | `.ft-mol-pagination` | Paginación | Navegar entre páginas de un listado largo (resultados de búsqueda, hemeroteca). |
| `paper/` | `.ft-mol-paper` | Papel/tarjeta editorial | Contenedor tipo "papel" con sombra para destacar un bloque editorial. |
| `path/` | `.ft-mol-path` | Ruta/path de navegación | Ruta de navegación o progreso por pasos (wizard, breadcrumb visual). |
| `pick/` | `.ft-mol-pick` | Tarjeta de pronóstico/selección | Elegir o pronosticar una opción (porra, quiniela, predicción); base del bloque `ft-org-pick`. |
| `pie-chart/` | `.ft-mol-pie-chart` | Gráfico de tarta | Visualizar proporciones/porcentajes en un donut/pie (resultados, encuestas). |
| `pollbox/` | `.ft-mol-pollbox` | Caja de encuesta | Encuesta inline con opciones votables y visualización de resultados. |
| `popover/` | `.ft-mol-popover` | Popover de información | Panel flotante anclado a un elemento, más rico que un tooltip (con acciones/contenido). |
| `promo/` | `.ft-mol-promo` | Bloque promocional | Bloque promocional con imagen + texto + CTA intercalado en el contenido; variante `--dark`. |
| `promoHeader/` | `.ft-mol-promoHeader` | Cabecera promocional | Cabecera destacada de campaña o especial editorial. |
| `quote/` | `.ft-mol-quote` | Cita/blockquote (tiene variante AMP) | Destacar una cita textual o declaración dentro del artículo. |
| `rankingNews/` | `.ft-mol-rankingNews` | Ranking de noticias (tiene variante AMP) | Listado numerado de "lo más leído / más visto". |
| `related/` | `.ft-mol-related` | Noticias relacionadas (tiene variante AMP) | Bloque "te puede interesar" con enlaces a contenido relacionado. |
| `relatedSlider/` | `.ft-mol-relatedSlider` | Noticias relacionadas en slider | Mismas relacionadas pero en carrusel horizontal (ahorra espacio vertical). |
| `rrss/` | `.ft-mol-rrss` | Botones de redes sociales | Botones de compartir o seguir en redes sociales. |
| `score/` | `.ft-mol-score` | Marcador deportivo | Marcador puntual de un partido (equipos + resultado). |
| `scoreboard/` | `.ft-mol-scoreboard` | Tabla de clasificación | Clasificación/tabla de posiciones de una competición. |
| `slider/` | `.ft-mol-slider` | Slider de contenido | Slider genérico de banners o destacados a ancho completo. |
| `sorting/` | `.ft-mol-sorting` | Lista de clasificación/ordenación | Lista ordenada de posiciones con puntos/estado (ranking de una porra o liga); se usa dentro de `ft-org-accordion`. |
| `sticky-panel/` | `.ft-mol-sticky-panel` | Panel sticky/fijo | Panel que queda fijo al hacer scroll (sumario lateral, CTA persistente). |
| `subheader/` | `.ft-mol-subheader` | Subcabecera | Subcabecera secundaria bajo el header principal (navegación de sección). |
| `subscribeRead/` | `.ft-mol-subscribeRead` | Muro de suscripción/paywall | Muro que corta la lectura e invita a suscribirse (degradado + CTA). |
| `subtitle/` | `.ft-mol-subtitle` | Subtítulo (tiene variante AMP) | Subtítulo o antetítulo que acompaña al titular de un artículo. |
| `swiper/` | `.ft-mol-swiper` | Carrusel Swiper.js | Carrusel táctil basado en Swiper para móvil, galerías y sliders complejos. |
| `switcher/` | `.ft-mol-switcher` | Selector/switcher de opciones | Alternar entre dos o más vistas (segmented control, tabs ligeros). |
| `tab/` | `.ft-mol-tab` | Tab individual (tiene variante AMP) | Una pestaña concreta dentro de un conjunto `ft-mol-tabs`. |
| `table/` | `.ft-mol-table` | Tabla de datos | Tabla de datos tabulares responsive. |
| `tabs/` | `.ft-mol-tabs` | Conjunto de tabs | Organizar contenido conmutable en pestañas. |
| `tagsNews/` | `.ft-mol-tagsNews` | Tags de noticias (tiene variante AMP) | Lista de temas/tags relacionados al pie de un artículo. |
| `tapbar/` | `.ft-mol-tapbar` | Barra de navegación inferior móvil (tiene variante AMP) | Barra de navegación fija inferior en móvil (estilo app nativa). |
| `ticker/` | `.ft-mol-ticker` | Ticker de noticias en directo (tiene variante AMP) | Cinta de titulares en movimiento / últimas horas en directo. |
| `toc/` | `.ft-mol-toc` | Tabla de contenidos | Índice navegable de un artículo largo (table of contents). |
| `toolbar/` | `.ft-mol-toolbar` | Barra de herramientas | Barra con acciones sobre el contenido de una vista. |
| `tracking/` | `.ft-mol-tracking` | Seguimiento de estado/eventos | Mostrar el estado de un proceso por pasos (envío, pedido, trámite). |
| `writer/` | `.ft-mol-writer` | Firma/byline de autor (tiene variante AMP) | Byline con nombre, cargo y fecha al inicio del artículo. |

> **AMP**: Las molecules con "tiene variante AMP" tienen su archivo `amp-[nombre].scss` directamente en `scss/fourties/molecules/` (no dentro de la carpeta del componente). Archivos AMP existentes: `amp-advice`, `amp-boxInfo`, `amp-breadcrumb`, `amp-btnGroup`, `amp-headband`, `amp-header`, `amp-label`, `amp-modNews`, `amp-multimedia`, `amp-quote`, `amp-rankingNews`, `amp-related`, `amp-subtitle`, `amp-tab`, `amp-tagsNews`, `amp-tapbar`, `amp-ticker`, `amp-writer`.

## Variantes por marca

Cuando una molecule tiene estilos distintos por marca:

```
molecules/divider/
├── _divider.scss              # Estilos base comunes
├── divider-ep.scss
├── divider-epe.scss
├── divider-regionales.scss
├── divider-revistas.scss
├── divider-sport.scss
└── divider-ux.scss
```

No todas las molecules tienen variantes: sólo las que presentan diferencias visuales significativas por marca.

## Mixins de comportamiento

```scss
// Modificador aplicado al componente cuando el padre tiene una clase
@include behavior-parent-nested(ft-mol-tabs--mobileonly) {
  @include min-screen(768px) {
    display: none;
  }
}

// Modificador aplicado cuando el contexto es una marca concreta
@include behavior-brand(sport) {
  color: var(--color-primary);
}
```

## Reglas para IA

1. **Composición**: Las molecules pueden usar atoms; no duplicar estilos de atoms
2. **Variantes por marca**: Crear `[componente]-[marca].scss` sólo cuando haya diferencias reales entre marcas
3. **behavior-parent-nested**: Para modificadores que afectan al componente cuando el padre tiene la clase
4. **AMP**: Las variantes AMP son archivos sueltos en `molecules/`, no carpetas; seguir el patrón `amp-[nombre].scss`
5. **Estructura DOM**: Respetar la jerarquía HTML documentada en el showroom (`fourty/molecules/`)
6. **Inventario**: Hay 71 molecules; verificar esta lista antes de crear una nueva para evitar duplicados
