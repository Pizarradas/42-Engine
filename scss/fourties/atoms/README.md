# Atoms – Componentes básicos

Unidades mínimas del Design System. Prefijo de clase: `ft-`. Cada atom es independiente y no depende de otros atoms.

## Inventario completo (31 atoms)

| Carpeta | Clase base | Descripción | Caso de uso (cuándo usarlo) |
|---------|-----------|-------------|------------------------------|
| `ad/` | `.ft-ad` | Contenedor de publicidad | Reservar el hueco de un banner/display antes de que cargue el ad, manteniendo el layout estable (evita saltos / CLS). |
| `advice/` | `.ft-advice` | Aviso, alerta o notificación inline | Nota breve junto a un campo o bloque: aviso legal, cookies, mensaje informativo de una sola línea. |
| `anchor/` | `.ft-anchor` | Ancla de navegación interna | Marcar un punto de destino al que saltan los enlaces internos o el scroll-to dentro de la misma página. |
| `animation/` | `.ft-animation` | Disparador de animaciones CSS | Animar la aparición de un elemento al entrar en viewport (fade, slide-in) sin escribir keyframes a mano. |
| `btn/` | `.ft-btn` | Botón (sizes: xs, sm, md, lg; variantes: primary, secondary, ghost…) | Cualquier acción clicable: enviar formulario, abrir modal, CTA. Elegir variante por jerarquía (primary = acción principal). |
| `carousel/` | `.ft-carousel` | Unidad de carrusel/slider atómica | Base de bajo nivel para sliders; normalmente no se usa directa, sino vía `ft-mol-carousel` / `ft-mol-swiper`. |
| `cerca/` | `.cerca` ⚠️ | Bloque del flujo CERCA (onboarding por comunidad). **No sigue el prefijo `ft-`** | Específico del producto CERCA (geolocalización por comunidad/localidad). Atom no estándar; no reutilizar fuera de ese flujo sin normalizarlo antes. |
| `check/` | `.ft-check` | Checkbox personalizado | Selección múltiple en formularios y filtros (aceptar términos, marcar varias opciones). |
| `date/` | `.ft-date` | Fecha formateada (tiene variante AMP) | Mostrar fecha de publicación/actualización de un artículo con el formato del medio. |
| `disqus/` | `.ft-disqus` | Contenedor del sistema de comentarios Disqus | Embeber el hilo de comentarios Disqus al pie de un artículo. |
| `embed/` | `.ft-embed` | Contenido embebido (iframe, video, redes) | Insertar un iframe, tweet o vídeo externo manteniendo su ratio responsive. |
| `img/` | `.ft-img` | Imagen/picture | Imagen responsive con lazy-load y art-direction (`picture`/`srcset`); base de cualquier figura. |
| `jwplayer/` | `.ft-jwplayer` | Reproductor de vídeo JW Player | Insertar el player JW Player en artículos o portadas de vídeo. |
| `link/` | `.ft-link` | Enlace de texto tipográfico | Enlace inline en texto; con `--block` cubre toda un área clicable (típico como trigger de una card). |
| `list/` | `.ft-list` | Lista ordenada/no ordenada | Listados de items con viñeta, número o icono (`--has-icon`, `--add`); base de menús y az-list. |
| `radio/` | `.ft-radio` | Radio button personalizado | Selección única entre opciones excluyentes (encuestas, configuración). |
| `readmore/` | `.ft-readmore` | "Leer más" / texto expandible | Truncar texto largo y expandirlo bajo demanda (fichas, biografías, descripciones). |
| `scrollbar/` | `.ft-scrollbar` | Scrollbar personalizado | Estilizar la barra de scroll de un contenedor con `overflow` (modales, paneles). |
| `skin/` | `.ft-skin` | Skin/tema visual de página | Definir el tema/contexto visual de la página o sección (`--showroom`, `--dark`, cover). |
| `skiplink/` | `.ft-skiplink` | Skip link de accesibilidad | Enlace "saltar al contenido" para navegación por teclado (WCAG); primer elemento focusable del body. |
| `svgmap/` | `.ft-svgmap` | Mapa SVG interactivo | Mapa con zonas clicables (regiones electorales, secciones, países). |
| `switch/` | `.ft-switch` | Toggle on/off | Activar/desactivar una preferencia binaria de forma inmediata (modo oscuro, notificaciones). |
| `switch-brand/` | `.ft-switch-brand` | Toggle con identidad de marca | Selector visual entre marcas/ediciones del grupo con su branding. |
| `tag/` | `.ft-tag` | Etiqueta/categoría (tiene variante AMP) | Marcar la sección, categoría o tema de un contenido (chip de "Política", "Directo"…). |
| `text/` | `.ft-text` | Párrafo y texto tipográfico | Cuerpo de texto editorial: párrafos, entradillas, pies con la tipografía del medio. |
| `timer/` | `.ft-timer` | Temporizador/cuenta atrás | Cuenta atrás corta visible (oferta que caduca, inicio de un evento). |
| `title/` | `.ft-title` | Titular/heading (tiene variante AMP) | Titular o heading de artículo/sección con la jerarquía tipográfica de la marca. |
| `toogle/` | `.ft-toogle` | Toggle (legacy, mantener nombre con typo) | Mostrar/ocultar contenido. **Legacy**: en código nuevo preferir `switch` o `accordion`. |
| `tooltip/` | `.ft-tooltip` | Tooltip/popover de información | Información contextual breve al hacer hover/focus sobre un icono o palabra. |
| `tour/` | `.ft-tour` | Tour guiado / walkthrough | Onboarding paso a paso que resalta zonas de la interfaz a un usuario nuevo. |
| `trust/` | `.ft-trust` | Sello de confianza / badge (tiene variante AMP) | Mostrar el sello de fuente verificada / medio de confianza junto a una firma o contenido. |

> **Nota AMP**: Los atoms con variante AMP **no** la tienen dentro de su carpeta, sino como archivo suelto en `scss/fourties/` (raíz). Hay dos formatos:
> - Partials `_amp-[nombre].scss`: `_amp-ad`, `_amp-btn`, `_amp-img`, `_amp-link`, `_amp-list`, `_amp-text`.
> - Archivos de marca `amp-[nombre].scss`: `amp-date`, `amp-tag`, `amp-title`, `amp-trust`.

## Variantes por marca

Cada atom tiene un archivo base `_[nombre].scss` y hasta 6 variantes de marca:

```
atoms/btn/
├── _btn.scss              # Estilos base (comunes a todas las marcas)
├── btn-ep.scss            # Variante El Periódico
├── btn-epe.scss           # Variante El Periódico de España
├── btn-regionales.scss    # Variante Regionales
├── btn-revistas.scss      # Variante Revistas
├── btn-sport.scss         # Variante Sport
└── btn-ux.scss            # Variante showroom
```

El archivo base define la estructura; las variantes sólo sobreescriben colores, tipografía y detalles visuales de cada marca.

## Patrón de archivo

```scss
// ABSTRACTS
@import "../../../abstracts/abstracts.scss";
@import "../../../vendors/bourbon/bourbon";

// .ft-[componente]
.ft-switch {
  $self: &;  // referencia BEM al selector padre

  // Elementos
  &__label { }
  &__inner { }
  &__switch { }
  &__checkbox { }

  // Modificadores
  &--darkmode { }
  &--has-text { }
}
```

## Reglas para IA

1. **Una clase principal** por archivo: `.ft-[componente]`
2. **Elementos** con `&__[nombre]`, **modificadores** con `&--[nombre]`
3. **No anidar** atoms dentro de atoms; son unidades independientes
4. **Siempre importar** abstracts y Bourbon al inicio
5. **IDs en HTML**: Los componentes con input/label requieren IDs únicos; documentarlo en el showroom
6. **Selectores flexibles**: A veces se usa `[class*="__label"]` para evitar repetición; mantener consistencia con el proyecto
7. **Variantes AMP**: Si el atom tiene variante AMP, su archivo vive en `scss/fourties/` (raíz), no en la carpeta del atom; seguir ese patrón para nuevas marcas AMP
8. **Inventario**: Hay 31 atoms; verificar esta lista antes de crear uno nuevo para evitar duplicados
9. **`cerca` es no estándar**: usa la clase `.cerca` (sin prefijo `ft-`) y es específico del flujo CERCA; no tomarlo como modelo de atom ni reutilizarlo fuera de ese producto
