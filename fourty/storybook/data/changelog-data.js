/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — REGISTRO DE RELEASES (fuente única del Changelog)
   ────────────────────────────────────────────────────────────────────────
   Migrado una sola vez desde fourty/changelog-home.html (ese HTML ya puede borrarse).
   A PARTIR DE AHORA edita ESTE fichero: para publicar una release nueva, añade un
   objeto AL PRINCIPIO del array con su date ("YYYY-MM-DD") y su log (texto plano).
   El formateador (storybook/js/changelog.js) detecta por línea:
     · MAYÚSCULAS corta → etiqueta de sección (1-4 palabras, ≤24 chars).
     · ruta de fichero (.scss/.html/.js…) → monoespaciada.
     · resto → texto descriptivo del bloque.
   Dentro de cada bloque, el PRIMER texto se pinta como titular/resumen breve y
   las líneas de texto SIGUIENTES se integran como párrafos secundarios del
   mismo bloque (sin negrita, con capitalización inicial automática y ocupando
   todo el ancho útil del contenedor). Si una línea usa `Tema: desarrollo`,
   el parser la separa automáticamente en titular (`Tema`) + párrafo
   (`desarrollo`).
   Un blanco sigue separando entradas.
   Vocabulario de etiquetas con chip de filtro y acento de color (KNOWN_TAGS):
     NEW (verde) · UPDATE (ámbar) · FIX (rojo) · DEPRECATED (magenta) ·
     REMOVE (gris) · A11Y (morado) · AMP (verde-azulado) · HTML · SCSS · CSS · JS (azul).
   Cada bloque (titular + desarrollo + ficheros) pertenece a UNA sola sección. Precedencia al clasificar
   (de mayor a menor), para que el chip sea preciso y completo:
     DEPRECATED → algo sigue trazado/documentado, pero ya no debe usarse y conviene indicar alternativa.
     REMOVE  → borrados/ocultaciones/retiradas efectivas ("Eliminar", "Retirar", "Quitar", "Oculta…").
     FIX     → defectos/correcciones ("Fix", "Bug", "Corrección", "error en consola").
     A11Y    → accesibilidad explícita ("Accesibilidad", "área de clicado").
     AMP     → cambios específicos de AMP (markup/SCSS/CSS amp-*).
     NEW     → componentes/plantillas/logos nuevos.
     UPDATE  → todo lo demás (ajustes de estilos, cambios planificados).
   'version' es OPCIONAL: si la añades, se muestra como pastilla; si no, manda la fecha.
   Debe cargarse ANTES que storybook/js/changelog.js.
   ════════════════════════════════════════════════════════════════════════ */
window.SB_CHANGELOG = [
    { version: "183.14.3", date: "2026-08-27", log: `
NEW

N/A

UPDATE

Ajustes de estilos

scss/fourties/organism/masthead/_masthead.scss
` },
    { version: "183.14.2", date: "2026-08-25", log: `
NEW
HTML VIDEOS
fourty/layouts/layout-sport-videos-categorias-NORMALIZACION-v3.html
fourty/layouts/layout-sport-videos-ver-landing-NORMALIZACION-v3.html

UPDATE
AJUSTES DE HTML
fourty/layouts/layout-sport-videos-categorias-NORMALIZACION-v2.html
fourty/pocs/test__home-sport/layout-sport-portada-doble-skin.html
AJUSTES ESTILOS
scss/fourties/atoms/tag/_tag.scss
scss/_masthead.scss
` },
    { version: "183.14.1", date: "2026-08-21", log: `
NEW

Nueva variante &--numbered molécula related
scss/fourties/molecules/related/_related.scss

UPDATE

AJUSTES DE HTML
fourty/layouts/layout-sport-videos-ver-landing-NORMALIZACION-v2.html
fourty/pocs/test__home-sport/layout-sport-portada-doble-skin.html
fourty/layouts/layout-ep-noticia.html

AJUSTES ESTILOS
scss/fourties/molecules/action-bar/_action-bar.scss
` },
    { version: "183.14.0", date: "2026-08-17", log: `
NEW

fourty/templates/template-noticia-doble-skin.html

HIPERLOCALISMO TINEO
fourty/templates/template-masthead.html
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-tineo.svg

PASTIEMPOS
scss/fourties/organism/game/_game.scss
cds-statics/assets/img/team-shields/shield.svg
cds-statics/assets/img/team-shields/ucl/austria_lask_c.svg
cds-statics/assets/img/team-shields/ucl/armenia_ararat-armenia_c.svg
cds-statics/assets/img/team-shields/ucl/austria_sturm-graz_c.svg
cds-statics/assets/img/team-shields/ucl/azerbaijan_sabah_c.svg
fourty/templates/template-pasatiempos-porra-ucl-ayuda.html
fourty/templates/template-pasatiempos-porra-ucl-matches.html
fourty/templates/template-pasatiempos-porra-ucl-penas.html
fourty/templates/template-pasatiempos-porra-ucl-pronosticos.html

UPDATE

AJUSTES DE HTML
fourty/layouts/layout-sport-videos-categorias-NORMALIZACION.html
fourty/layouts/layout-sport-videos-ver-landing-NORMALIZACION.html
fourty/layouts/layout-ep-noticia.html
fourty/templates/template-masthead.html

AJUSTES ESTILOS
scss/fourties/atoms/list/_list.scss
scss/fourties/atoms/tooltip/_tooltip.scss
scss/base/helpers/_affixes.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/molecules/modal/_modal.scss
scss/fourties/molecules/action-bar/_action-bar.scss

JS
fourty/storybook/js/molecules/tapbar/tapbar.js

ICONOS
cds-statics/assets/img/icons/nav-fill-light-delete.svg
cds-statics/assets/img/icons/nav-stroke-bold-delete.svg
cds-statics/assets/img/icons/nav-stroke-regular-delete.svg
` },
    { version: "183.13.0", date: "2026-08-03", log: `
NEW

Porra Champions League
Nuevo template pasatiempos Porra UCL Premios
fourty/templates/template-pasatiempos-porra-ucl-premios.html
fourty/templates/template-pasatiempos-porra-ucl-ranking.html
fourty/templates/template-pasatiempos-porra-ucl-pena.html
fourty/templates/template-pasatiempos-porra-ucl-penas.html
scss/fourties/organism/game/_game.scss
scss/fourties/atoms/btn/_btn.scss

Selector de ediciones locales para Masthead
fourty/templates/template-masthead.html
scss/fourties/atoms/radio/_radio.scss
scss/fourties/molecules/radio/_radio.scss
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Cambio de logo en L´Hospitalet
cds-statics/assets/img/logos/logo-ep-cronicas-hospitalet.svg
cds-statics/assets/img/logos/logo-ep-hospitalet.svg

Ajustes de estilos
scss/fourties/molecules/headband/_headband.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { version: "183.12.0", date: "2026-07-27", log: `
NEW

Logos DMALL -> UIB y OPZAM -> Sanabria
cds-statics/assets/img/logos/logo-regionales-diario-de-mallorca-cronicauib.svg
cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora-sanabria.svg
scss/fourties/organism/masthead/_masthead.scss

Tapbar
cds-statics/js/tapbar/fourty-js-tapbar.js
scss/fourties/molecules/tapbar/_tapbar.scss


UPDATE

Videos Verticales
scss/fourties/molecules/multimedia/_multimedia.scss

Nuevo template-pasatiempos-porra-ucl-penas
scss/fourties/organism/game/_game.scss
fourty/templates/template-pasatiempos-porra-ucl-pronosticos.html
fourty/templates/template-pasatiempos-porra-ucl-penas.html
` },
    { version: "183.11.1", date: "2026-07-17", log: `
NEW


Porra Champions League

cds-statics/assets/img/decorative/ucl-stars.svg
fourty/templates/template-pasatiempos-porra-ucl-inicio.html
fourty/templates/template-pasatiempos-porra-ucl-pronosticos.html
scss/fourties/organism/game/_game.scss


UPDATE

N/A
` },
    { version: "183.11.0", date: "2026-07-16", log: `
NEW


Nuevo juego Sopa torcida

cds-statics/assets/img/decorative/ft-mol-card-sopatorcida.svg
fourty/templates/template-home.html
fourty/templates/template-pasatiempos-sopa-torcida.html
cds-statics/js/game/sopa-torcida/fourty-js-sopa-torcida.js
scss/base/helpers/_backgrounds.scss
scss/fourties/organism/game/_game.scss

UPDATE

N/A
` },
    { version: "183.10.1", date: "2026-07-08", log: `
NEW

N/A

UPDATE

Ajustes de estilos
scss/fourties/organism/masthead/_masthead.scss
` },
    { version: "183.10.0", date: "2026-07-06", log: `
NEW

Sopa torcida
fourty/templates/template-pasatiempos-sopa-torcida.html
scss/fourties/organism/game/_game.scss
cds-statics/js/game/sopa-torcida/fourty-js-sopa-torcida.js


UPDATE

Ajustes de estilos
scss/fourties/organism/game/_game.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/multibox/_multiBox.scss
` },
    { version: "183.9.0", date: "2026-06-29", log: `
NEW

Hiperlocalismos La Crónica de Nucía
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadenucia.svg
scss/fourties/organism/masthead/_masthead.scss

Ajustes del sistema de anclaje de class al body en Storybook
cds-statics/csv/storybook__bodyclass.csv


UPDATE

Logo PGastro en lugar de Cata Mayor
scss/fourties/organism/masthead/_masthead.scss

Ajuste de estilos
cds-statics/beta/cerca.css

Ajustes en Botón de Google
fourty/layouts/layout-revistas-woman-galeria-vertical.html
fourty/templates/template-galeria-vertical.html
scss/fourties/molecules/advice/_advice.scss
` },
    { version: "183.8.0", date: "2026-06-26", log: `
NEW

Cerca · POC vista previa de feeds ("Elige tus lugares")
Pantallas de previsualización de feeds y ficheros beta hardcodeados para que tech pueda trabajar.
fourty/pocs/PI-CERCA--vista-previa-feeds/index-feeds.html
fourty/pocs/PI-CERCA--vista-previa-feeds/elige-tus-lugares.html
fourty/pocs/PI-CERCA--vista-previa-feeds/elige-tus-lugares-switch.html
cds-statics/beta/cerca-CDS-432--feed-preview.css
cds-statics/beta/cerca-CDS-9308--buscador.css
cds-statics/beta/cerca.css

UPDATE

Botón de Google en galería vertical (revistas)
Refactor de la inclusión del botón: casuística -galeriav en advice, fontStack y minúsculas para revistas.
scss/fourties/molecules/advice/_advice.scss
fourty/templates/template-galeria-vertical.html
fourty/layouts/layout-revistas-woman-galeria-vertical.html

Masthead EP · calibrado del tamaño del logo PGastro (gastronomía)
scss/fourties/organism/masthead/_masthead.scss

Storybook · sistema de anclaje/anidado de clases en el body (agregador bodyclass)
fourty/storybook/js/core/storybook.js
fourty/storybook/js/core/README.md

Template Tour de Francia · ajuste de estilos del masthead
fourty/templates/template-tour-de-francia.html
` },
    { version: "183.8.0", date: "2026-06-23", log: `
NEW

Incorporación de Iconos y Logos a Storybook
fourty/storybook/

Nuevos hiperlocalismos Elda (INF) y Puebla de la Calzada (BAD)
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadeelda.svg
cds-statics/assets/img/logos/logo-regionales-la-cronica-de-badajoz-cronicapuebladelacalzada.svg
fourty/templates/template-masthead.html
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Logo PGastro en lugar de Cata Mayor
scss/fourties/organism/masthead/_masthead.scss

Porra del Mundial
cds-statics/assets/img/icons/icon-mundial-porra-premios.svg
fourty/templates/template-pasatiempos-porra-mundial-ayuda.html
fourty/templates/template-pasatiempos-porra-mundial-brackets.html
fourty/templates/template-pasatiempos-porra-mundial-matches.html
fourty/templates/template-pasatiempos-porra-mundial-no-ranking.html
fourty/templates/template-pasatiempos-porra-mundial-premios.html
fourty/templates/template-pasatiempos-porra-mundial-pronosticos.html
fourty/templates/template-pasatiempos-porra-mundial-qualifiers.html
fourty/templates/template-pasatiempos-porra-mundial-ranking.html
fourty/templates/template-pasatiempos-porra-mundial.html
scss/fourties/organism/game/_game.scss

DEPRECATED

Eliminación de logos asociados a Caso Abierto
cds-statics/assets/img/logos/logo-regionales-caso-abierto-XXX.png
` },
    { version: "183.7.1", date: "2026-06-18", log: `
NEW
N/A

UPDATE

Ajustes de estilos

fourty/templates/template-pasatiempos-cuatroencampo.html
fourty/layouts/layout-pasatiempos-cuatroencampo-finalizado.html
scss/fourties/molecules/card/_card.scss
scss/fourties/molecules/toolbar/_toolbar.scss
scss/fourties/organism/game/_game.scss


Vídeo - Eliminar altura forzosa
scss/fourties/atoms/embed/_embed.scss


Otros ajustes
fourty/storybook/js/organisms/footer/footer.html
` },
    { version: "183.7.0", date: "2026-06-16", log: `
NEW

Nuevas chips

fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-resultados-edicion-chips.html
scss/fourties/atoms/tag/_tag.scss
cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js
scss/fourties/organism/suggestions-chips/_suggestions-chips.scss


Nueva variante BTN --hue-grey

fourty/storybook/js/atoms/btn/btn.html
scss/fourties/atoms/btn/_btn.scss


Nueva casuística btnGroup: --is-scrollable
scss/fourties/molecules/btnGroup/_btnGroup.scss


Hiperlocalimo EPExt cronicadeltajosalor

fourty/templates/template-masthead.html
scss/fourties/organism/masthead/_masthead.scss

UPDATE


Ajustes de estilos

scss/fourties/organism/breadcrumb/_breadcrumb.scss
scss/fourties/organism/cardhome/_cardHome.scss
` },
    { version: "183.6.3", date: "2026-06-15", log: `
NEW

N/A

UPDATE

Storybook Grid: reorganizacion de la categoria, overview ampliado y controles mas precisos para columnas responsivas, row behaviors y utilidades
scss/layout/_grid.scss
fourty/storybook/js/layouts/layouts.js

Viewport Storybook: ampliacion del catalogo de presets responsive para pruebas mas realistas desde mobile
fourty/storybook/js/core/storybook.js

Storybook: sincronizacion automatica entre la ultima version del changelog y la pastilla de navegacion
fourty/index.html
fourty/storybook/js/meta.js
fourty/storybook/js/core/storybook.js

Btn Group: documentacion de la variante scrollable autosuficiente y controles alineados con la API real del componente
scss/fourties/molecules/btnGroup/_btnGroup.scss
fourty/storybook/js/molecules/btngroup/btngroup.js
fourty/storybook/js/molecules/btngroup/btngroup.html

Tag: documentacion ampliada para chip, chip-tiny, estados e integracion con helper-scroll
scss/fourties/atoms/tag/_tag.scss
fourty/storybook/js/atoms/tag/tag.js
fourty/storybook/js/atoms/tag/tag.html

Suggestions Chips: documentacion ajustada al nuevo scroll horizontal uniforme sin item anclado
scss/fourties/organism/suggestions-chips/_suggestions-chips.scss
fourty/storybook/js/organisms/suggestions-chips/suggestions-chips.js
fourty/storybook/js/organisms/suggestions-chips/suggestions-chips.html

Btn: documentacion Storybook ampliada para hue-grey, iconografia, contraste y controles de las familias base
scss/fourties/atoms/btn/_btn.scss
fourty/storybook/js/atoms/btn/btn.js
fourty/storybook/js/atoms/btn/btn.html

FIX

Btn: los iconos de botones con iconografia integrada viran a blanco en hover y focus-visible cuando el fondo oscurece la pieza
scss/fourties/atoms/btn/_btn.scss

Btn: ajuste del modificador hue-grey para desaturar la pieza base y su variante scrollUp desde la propia API del componente
scss/fourties/atoms/btn/_btn.scss
fourty/storybook/js/atoms/btn/btn.js

Tag y Suggestions Chips: retirada de todo el anclaje del primer item para que la hilera completa haga scroll de forma uniforme
scss/fourties/atoms/tag/_tag.scss
scss/fourties/organism/suggestions-chips/_suggestions-chips.scss
cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js
fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-resultados-edicion-chips.html
fourty/storybook/js/atoms/tag/tag.js
fourty/storybook/js/atoms/tag/tag.html
fourty/storybook/js/organisms/suggestions-chips/suggestions-chips.js
fourty/storybook/js/organisms/suggestions-chips/suggestions-chips.html
` },
    { version: "183.6.2", date: "2026-06-11", log: `
NEW

N/A

UPDATE

Actualización fourty-ads_skys-sticky.js a petición de Tech
cds-statics/js/sticking/fourty-ads_skys-sticky.js

Ajustes de estilos
scss/fourties/organism/footer/_footer.scss
` },
    { version: "183.6.1", date: "2026-06-10", log: `
NEW

cds-statics/assets/img/decorative/ft-mol-card-cuatroencampow.svg
cds-statics/assets/img/decorative/ft-mol-card-cuatroencampow.svg
cds-statics/assets/img/logos/logo-ep-p-gastro.svg
cds-statics/assets/img/icons/cuatroencampo-miniw.svg
cds-statics/assets/img/team-shields/spain/espana.png
cds-statics/assets/img/team-shields/spain/real-madrid.svg

UPDATE

Ajustes de estilos
Juegos
scss/base/helpers/_backgrounds.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/molecules/card/_card.scss
scss/fourties/organism/game/_game.scss
scss/fourties/organism/toolbar/_toolbar.scss
scss/fourties/molecules/subheader/_subheader.scss

Videos verticales
scss/fourties/atoms/embed/_embed.scss

Fuente preferente Google para revistas
scss/fourties/molecules/writer/_writer.scss

DEPRECATE

Componente card-video-thumb
scss/fourties/molecules/card-video-thumb/_card-video-thumb.scss

Header Multibrand
cds-statics/js/headers/header-multibrand.js
cds-statics/js/headers/header-regionales.js
cds-statics/js/headers/header-revistas.js
cds-statics/js/headers/header-sport.js
scss/fourties/organism/header-multibrand/_header-multibrand.scss
scss/fourties/organism/header-multibrand/header-multibrand-ep.scss
scss/fourties/organism/header-multibrand/header-multibrand-epe.scss
scss/fourties/organism/header-regionales/_header-regionales.scss
scss/fourties/organism/header-regionales/styles-header-regionales.scss
` },
    { version: "183.6.0", date: "2026-06-08", log: `
NEW

N/A

UPDATE

Se iguala la visualización del autor en todas las medias
fourty/templates/template-writer.html
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/molecules/writer/_writer.scss

Fix en el logo de la clase lacronicabarriosalicante
fourty/templates/template-masthead.html
scss/fourties/organism/masthead/_masthead.scss

Ajuste en alineación de aros para imagen F1
cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--formula1-sport-v2.png
scss/fourties/molecules/breadcrumb/_breadcrumb.scss
` },
    { version: "183.5.3", date: "2026-06-05", log: `
NEW

Storybook para visualización del DS
fourty/storybook/
AI/mind-system/agents/mode-storybook-doc.md
AI/mind-system/agents/mode-storybook-migrate.md
AI/mind-system/agents/mode-storybook.md

UPDATE

Ajustes de estilos
scss/fourties/molecules/breadcrumb/_breadcrumb.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss
fourty/templates/template-noticia-formula1.html
` },
    { version: "183.5.2", date: "2026-06-04", log: `
NEW

Personalización F1 en Sport
cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--formula1-sport.png
fourty/layouts/layout-sport-noticia-formula1.html
fourty/templates/template-noticia-formula1.html
scss/fourties/molecules/breadcrumb/_breadcrumb.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss

UPDATE

N/A
` },
    { version: "183.5.1", date: "2026-06-03", log: `
NEW

Layout Sport · noticia del Mundial 26
fourty/layouts/layout-sport-noticia-mundial26.html

Fondo de breadcrumb para el Mundial
cds-statics/assets/img/bgs/bg_breadcrumb_mundial.png

UPDATE

Breadcrumb · personalización Fórmula 1 / Mundial
scss/fourties/organism/breadcrumb/_breadcrumb.scss

Porra del Mundial · pantallas de ayuda y de partidos
fourty/templates/template-pasatiempos-porra-mundial-ayuda.html
fourty/templates/template-pasatiempos-porra-mundial-matches.html

CardHome · botón de la porra
fourty/organisms/organism-cardHome.html
fourty/templates/template-cardHome.html
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/molecules/score/_score.scss

Variante Advice
scss/fourties/molecules/advice/_advice.scss

Ajustes de estilos · Game y base
scss/fourties/organism/game/_game.scss
scss/base/base.scss

AMP

Ajustes del botón AMP y de Advice AMP
scss/fourties/_amp-btn.scss
scss/fourties/molecules/amp-advice.scss
` },
    { version: "183.4.1", date: "2026-05-27", log: `
NEW

N/A

UPDATE

Ajustes de estilos Porra
cds-statics/assets/img/decorative/ft-mol-card-porramundial.svg
fourty/templates/template-pasatiempos-porra-mundial-ranking.html
scss/fourties/organism/game/_game.scss

Ajustes de estilos
scss/fourties/molecules/amp-advice.scss
scss/fourties/molecules/advice/_advice.scss
cds-statics/beta/cerca.css
` },
    { version: "183.4.1", date: "2026-05-27", log: `
NEW ------

Variante Advice
fourty/molecules/molecule-advice.html
scss/fourties/molecules/advice/_advice.scss

UPDATE
Ajustes de estilos

scss/fourties/organism/game/_game.scss
scss/fourties/molecules/scoreboard/_scoreboard.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/molecules/btnGroup/_btnGroup.scss

HTML
Ajustes para la inclusión de la variante Advice
fourty/molecules/molecule-rrss.html
fourty/templates/template-noticia.html
fourty/templates/template-opinion.html
fourty/templates/template-writer.html

Ajustes Porra del Mundial
ffourty/templates/template-pasatiempos-porra-mundial-ayuda.html
fourty/templates/template-pasatiempos-porra-mundial--mol-bar-game.html
fourty/templates/template-pasatiempos-porra-mundial-ranking.html
` },
    { version: "183.3.4", date: "2026-05-20", log: `
NEW

Organismo Accordion
fourty/organisms/organism-accordion.html
scss/fourties/organism/accordion/_accordion.scss

CSS beta para cambios temporales
cds-statics/beta/cerca.css

Helper de alineación de texto a la izquierda
scss/base/helpers/_texts.scss

UPDATE

Ajustes de estilos
scss/fourties/organism/masthead/_masthead.scss
scss/brands/regionales-setup.scss
scss/fourties/molecules/pick/_pick.scss
scss/fourties/atoms/ad/_ad.scss

Ajustes Porra del Mundial
fourty/molecules/molecule-bar.html
fourty/templates/template-pasatiempos-porra-mundial-ayuda.html
fourty/templates/template-pasatiempos-porra-mundial-brackets.html
fourty/templates/template-pasatiempos-porra-mundial-matches.html
fourty/templates/template-pasatiempos-porra-mundial-no-ranking.html
fourty/templates/template-pasatiempos-porra-mundial-pronosticos.html
fourty/templates/template-pasatiempos-porra-mundial-qualifiers.html
fourty/templates/template-pasatiempos-porra-mundial.html
scss/fourties/organism/game/_game.scss
fourty/molecules/molecule-sorting.html
scss/fourties/molecules/sorting/_sorting.scss
scss/fourties/molecules/modal/_modal.scss
` },
    { version: "183.3.4", date: "2026-05-20", log: `
NEW

Molécula Action Bar
scss/fourties/molecules/action-bar/_action-bar.scss

Cabecera Cerca para todas Medias
scss/fourties/organism/masthead/_masthead.scss

Molécula AZ list

fourty/molecules/molecule-az-list.html
cds-statics/js/az-list/fourty-js-az-list-controller.js

Capa predictiva

cds-statics/js/custom/fourty-js-custom-utils.js
cds-statics/js/form/fourty-js-form-dropdown-toggle.js
cds-statics/js/form/fourty-js-form-predictive-engine.js
cds-statics/js/form/fourty-js-form-predictive-mobile-sheet.js
cds-statics/js/form/fourty-js-form-predictive-renderer.js
cds-statics/js/modal/fourty-js-modal-tapbar-sync.js
scss/fourties/organism/container/_container.scss
fourty/molecules/molecule-form.html
scss/fourties/molecules/form/_form.scss

AMP

Advice para AMP

fourty/layouts/amp-layout-desarrollo-noticia-sport.html
scss/fourties/molecules/amp-advice.scss

UPDATE

Ajustes de estilos

scss/fourties/molecules/btnGroup/_btnGroup.scss
scss/fourties/molecules/toolbar/_toolbar.scss
scss/fourties/organism/game/_game.scss
scss/fourties/atoms/tooltip/_tooltip.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/organism/game/_game.scss

Otros ajustes
cds-statics/js/tabs/fourty-js-tabs.js
` },
    { version: "183.3.0", date: "2026-05-18", log: `
NEW

Molécula advice para google

fourty/templates/template-noticia.html
scss/fourties/molecules/advice/_advice.scss

Modal fullscreen

fourty/molecules/molecule-modal.html
scss/fourties/molecules/modal/_modal.scss

LnkBox variante Card

fourty/molecules/molecule-lnkBox.html
scss/fourties/molecules/lnkbox/_lnkbox.scss

Patrocinio Breadcrumb (Adelantados > LNE)

scss/fourties/molecules/breadcrumb/_breadcrumb.scss
cds-statics/assets/img/bgs/ft-mol-breadcrumb-has--lvl--unicaja.svg

Molécula Action Bar

fourty/molecules/molecule-action-bar.html
cds-statics/js/action-bar/fourty-js-action-bar-autoinit.js
cds-statics/js/action-bar/fourty-js-action-bar-controller.js
/scss/fourties/molecules/action-bar/_action-bar.scss

UPDATE

Porra del Mundial
scss/fourties/organism/game/_game.scss
fourty/templates/template-pasatiempos-porra-mundial--mol-bar-game.html
fourty/templates/template-pasatiempos-porra-mundial-ayuda.html
fourty/templates/template-pasatiempos-porra-mundial-pronosticos.html

Ajustes de estilos

scss/fourties/molecules/score/_score.scss
` },
    { date: "2026-05-12", log: `
NEW

Moléculas sorting
fourty/molecules/molecule-sorting.html
scss/fourties/molecules/sorting/_sorting.scss

Hiperlocalismo Adelantados (LNE)
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-adelantados.svg
scss/fourties/organism/masthead/_masthead.scss

Hiperlocalismo Living Ibiza (Diario de Ibiza)

cds-statics/assets/img/logos/logo-regionales-diario-de-ibiza-livingibiza.svg
scss/fourties/organism/masthead/_masthead.scss

Helpers font size Fluid
scss/base/helpers/_fonts.scss
scss/abstracts/mixins/_fonts.scss

UPDATE

Tooltip (variantes de posición)
scss/fourties/atoms/tooltip/_tooltip.scss

Ajustes de la porra
fourty/templates/template-pasatiempos-porra-mundial-pronosticos.html
scss/fourties/molecules/form/_form.scss
scss/fourties/organism/game/_game.scss

Ajustes de estilos
scss/fourties/atoms/date/_date.scss
scss/fourties/molecules/scoreboard/_scoreboard.scss
` },
    { date: "2026-05-06", log: `
NEW

Layout Directos (Sport)
fourty/layouts/layout-sport-noticia2-Directos.html

Porra Mundial

fourty/templates/template-pasatiempos-porra-mundial.html
scss/fourties/organism/game/_game.scss
scss/fourties/atoms/list/_list.scss
fourty/templates/template-pasatiempos-porra-mundial--mol-bar-game.html
scss/fourties/molecules/boxInfo/_boxInfo.scss
scss/fourties/molecules/tracking/_tracking.scss
cds-statics/assets/img/icons/icon-stepper-fase.svg
cds-statics/assets/img/icons/icon-stepper-final.svg
cds-statics/assets/img/icons/icon-stepper-grupos.svg
fourty/molecules/molecule-pick.html
scss/fourties/molecules/pick/_pick.scss
fourty/molecules/molecule-toolbar.html
scss/fourties/molecules/toolbar/_toolbar.scss

Nuevo hiperlocalismo Provincia de Badajoz

cds-statics/assets/img/logos/logo-regionales-la-cronica-de-badajoz-provinciabadajoz.svg
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Ajuste de estilos

scss/fourties/atoms/cerca/_cerca.scss
scss/fourties/atoms/jwplayer/_jwplayer.scss
` },
    { date: "2026-04-30", log: `
NEW

Cerca

Portada onboarding
fourty/templates/template-portada-marketing.html
scss/fourties/atoms/cerca/_cerca.scss

Personalización de cabecera para Cerca
scss/fourties/organism/masthead/_masthead.scss
cds-statics/assets/img/logos/logo-cerca.svg

POC
fourty/pocs/PI-396-CERCA--modificar-resultados-busqueda-V2-RTD

UPDATE

Ajuste de estilos

JwPlayer: scss/fourties/atoms/jwplayer/_jwplayer.scss
scss/fourties/organism/footer/_footer.scss
` },
    { date: "2026-04-22", log: `
NEW

Templates htmls estáticos Revistas
fourty/templates/template-contacto-revistas.html
fourty/templates/template-newsletter-revistas.html
fourty/templates/template-quienes-somos-revistas.html

Organismo Footer Lite

scss/fourties/organism/footer-lite/_footer-lite.scss

UPDATE

Ajuste de estilos

scss/fourties/atoms/list/_list.scss
scss/base/helpers/_align.scss

Ajuste sticky de mobile jwplayer

scss/fourties/atoms/jwplayer/_jwplayer.scss

Cambio de logo Activos en Diari de Girona y cambio de clase a shopping en lugar de Esncial

scss/fourties/organism/masthead/_masthead.scss

Posición video por debajo capa modal
scss/fourties/atoms/jwplayer/_jwplayer.scss

Ajustes Pasatiempos 4EC
fourty/layouts/layout-pasatiempos-cuatroencampo-finalizado.html

Otros ajustes
scss/fourties/molecules/writer/_writer.scss
scss/fourties/atoms/list/_list.scss
scss/fourties/organism/cardhome/_cardHome.scss
` },
    { date: "2026-04-15", log: `
NEW

N/A

REMOVE

Se oculta la personalización de Escápate (Viajar)
cds-statics/css/brands/revistas/organism/masthead.css

UPDATE

Tags para Cerca
scss/fourties/atoms/tag/_tag.scss
` },
    { date: "2026-04-14", log: `
NEW

POC Portada Sport

fourty/pocs/test__home-sport/layout-sport-portada-doble-skin.html
fourty/layouts/layout-sport-portada-doble-skin.html
fourty/pocs/test__home-sport/portadaSport.json

Páginas estáticas Revistas

fourty/templates/template-contacto-revistas.html
fourty/templates/template-newsletter-revistas.html
fourty/templates/template-quienes-somos-revistas.html

Hiperlocalismo Castrillón y Activos en Diari de Girona

cds-statics/css/brands/ep/organism/masthead.css
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-castrillon.svg
cds-statics/css/brands/regionales/regionales-core.css
cds-statics/css/brands/regionales/setting.css

UPDATE

Ajustes de estilos
cds-statics/css/brands/ep/organism/masthead.css
cds-statics/css/brands/sport/molecules/subscribeRead.css
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/molecules/headband/_headband.scss
scss/fourties/molecules/dropdown/_dropdown.scss

Ajustes de Cerca
fourty/templates/template-cerca-fase-2--04-buscador-resultados-quickwins.html
scss/fourties/atoms/skin/_skin.scss
` },
    { date: "2026-04-09", log: `
NEW

Newsletter para Revistas

fourty/templates/template-newsletter-revistas.html

Hiperlocalismo Crónica de Palma (Diario de Mallorca)

cds-statics/assets/img/logos/logo-regionales-diario-de-mallorca-cronicadepalma.svg
scss/fourties/organism/masthead/_masthead.scss

Pasatiempo Porra (layouts)

cds-statics/assets/img/decorative/ft-mol-card-porra.svg
cds-statics/assets/img/icons/porra-mini.svg
fourty/layouts/layout-pasatiempos-porra-1.1-inicio.html
fourty/layouts/layout-pasatiempos-porra-1.2-inicio-seleccion.html
fourty/layouts/layout-pasatiempos-porra-2-prediccion-registrada.html
fourty/layouts/layout-pasatiempos-porra-3-partido-en-directo.html
fourty/layouts/layout-pasatiempos-porra-4-partido-finalizado.html
fourty/layouts/layout-pasatiempos-porra-intermedia.html
fourty/templates/template-pasatiempos-porra.html
scss/fourties/molecules/card/_card.scss
scss/fourties/molecules/subheader/_subheader.scss

UPDATE

Ajustes de estilos Revistas

cds-statics/css/brands/revistas/setting-stilo.css
cds-statics/css/brands/revistas/setting-woman.css
scss/base/helpers/_fonts.scss
scss/fourties/atoms/title/_title.scss
scss/fourties/molecules/headband/_headband.scss
scss/fourties/organism/cardhome/_cardHome.scss
` },
    { date: "2026-04-07", log: `
NEW

Instrucciones para POCS
.cursor/rules/pocs.mdc
.github/copilot-instructions.md
AGENTS.md
AI/README.md
AI/agents/README.md
AI/agents/ux-reviewer.md
AI/knowledge/42ds/XXXX
AI/knowledge/ux/XXXXX

Porra (Pasatiempos)

cds-statics/assets/img/decorative/animadores.svg
cds-statics/assets/img/decorative/ft-mol-card-porra.svg
cds-statics/assets/img/icons/porra-mini.svg
cds-statics/css/brands/commons/setting-pasatiempos.css
fourty/templates/template-pasatiempos-porra.html
scss/base/cds-statics/css/_backgrounds.css
scss/base/helpers/_backgrounds.scss
scss/fourties/molecules/card/_card.scss
scss/fourties/molecules/modal/_modal.scss
scss/fourties/molecules/scoreboard/_scoreboard.scss
scss/fourties/molecules/subheader/_subheader.scss
scss/fourties/molecules/toolbar/_toolbar.scss
scss/fourties/organism/game/_game.scss
scss/fourties/organism/toolbar/_toolbar.scss

style(btnGroup): Nuevo grupo de botones fixed en todas medias

scss/fourties/organism/toolbar/_toolbar.scss
fourty/atoms/atom-btn.html
fourty/molecules/molecule-btnGroup.html
scss/fourties/atoms/btn/_btn.scss

UPDATE

Ajustes de estilos

scss/fourties/atoms/list/_list.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2026-03-31", log: `
NEW

Carpeta de POCS generadas con IA

fourty/pocs/XXX

Nuevo molécula Promo

fourty/molecules/molecule-promo.html
scss/fourties/molecules/promo/_promo.scss

UPDATE

Ajustes de estilos en Revistas

cds-statics/assets/img/icons/icon-mediaGalleryRevistas.svg
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/footer-multibrand/_footer-multibrand.scss
cds-statics/fonts/sourceSerifPro/xxxx
scss/fourties/atoms/btn/_btn.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/masthead/_masthead.scss

Otros ajustes
cds-statics/js/dropdown/fortty-js-dropdown-simple.js
` },
    { date: "2026-03-25", log: `
NEW

Hiperlocalismo LNE (Luarca-Valdés)

cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-luarcavaldes.svg
cds-statics/css/brands/regionales/setting.css
scss/brands/regionales-setup.scss
scss/fourties/organism/masthead/_masthead.scss

Esncial en Cuore
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Ajustes de estilos Revistas

scss/fourties/molecules/ticker/_ticker.scss
scss/fourties/molecules/headband/_headband.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/masthead/_masthead.scss (logo Esncial - Stilo)

Otros ajustes de estilos

fourty/atoms/atom-tag.html
scss/fourties/atoms/tag/_tag.scss
scss/fourties/atoms/text/_text.scss
scss/fourties/molecules/card/_card.scss
` },
    { date: "2026-03-20", log: `
NEW

N/A

UPDATE

Ajustes en maquetas para email on ACID.

externals/emailing/templates/CJ-01--bienvenida-y-confirmacion-compra.html
externals/emailing/templates/CJ-02--bienvenida-carta-director.html
externals/emailing/templates/CJ-03--descarga-app.html
externals/emailing/templates/CJ-04--catalogo-newsletters.html
externals/emailing/templates/CJ-05--beneficios-suscripcion.html
externals/emailing/templates/CJ-06--pasatiempos.html
externals/emailing/templates/CJ-07--club-mensual.html
externals/emailing/templates/CJ-08--mail-puntual.html

Ajustes hiperlocalismos
scss/fourties/organism/masthead/_masthead.scss

Ajustes Cerca
scss/fourties/atoms/skin/_skin.scss

Mediaviewer

cds-statics/js/mediaviewer/fourty-js-mediaviewer.js
fourty/organisms/organism-mediaviewer.html
scss/fourties/organism/mediaviewer/_mediaviewer.scss
` },
    { date: "2026-03-17", log: `
NEW

Personalización LNE: Canal Parlamento y Premios Princesa de Asturias
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-canalparlamento.svg
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-premiosprincesa.svg
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Ajustes de estilos Cerca
scss/fourties/atoms/skin/_skin.scss
cds-statics/assets/img/icons/icon-disable.svg
cds-statics/assets/img/icons/icon-plus.svg
fourty/layouts/layout-ep-cerca-fase-2--00-inicio.html
scss/fourties/atoms/tag/_tag.scss

Ajustes de estilos
scss/fourties/organism/cardhome/_cardHome.scss

Otros ajustes
fourty/layouts/layout-revistas-viajar-noticia-100.html
fourty/templates/template-noticia-100.html
cds-statics/css/brands/revistas/setting-woman.css
` },
    { date: "2026-03-11", log: `
NEW

Hiperlocalismo La Crónica de Móstoles (EPE)
scss/fourties/organism/masthead/_masthead.scss

UPDATE

N/A
` },
    { date: "2026-03-11", log: `
NEW

Pasatiempos (Sudoku)

cds-statics/assets/img/decorative/ft-mol-card-sudoku.svg
cds-statics/assets/img/icons/icon-c-close.svg
cds-statics/assets/img/icons/icon-c-play.svg
cds-statics/assets/img/icons/icon-o-close.svg
cds-statics/assets/img/icons/icon-o-error.svg
cds-statics/assets/img/icons/icon-o-in-progress.svg
cds-statics/assets/img/icons/icon-o-play.svg
cds-statics/assets/img/icons/icon-o-success.svg
cds-statics/js/game/sudoku/fourty-js-sudoku.js
fourty/atoms/atom-list.html
fourty/organisms/organism-game.html
fourty/templates/template-pasatiempos-archivo.html
fourty/templates/template-pasatiempos-intermedia-sudoku.html
scss/base/helpers/_backgrounds.scss
scss/fourties/atoms/list/_list.scss
scss/fourties/organism/game/_game.scss

Nuevas plantillas para Customer Journey

externals/emailing/templates/CJ-01--bienvenida-y-confirmacion-compra.html
externals/emailing/templates/CJ-02--bienvenida-carta-director.html
externals/emailing/templates/CJ-03--descarga-app.html
externals/emailing/templates/CJ-04--catalogo-newsletters.html
externals/emailing/templates/CJ-05--beneficios-suscripcion.html
externals/emailing/templates/CJ-06--pasatiempos.html
externals/emailing/templates/CJ-07--club-mensual.html
externals/emailing/templates/CJ-08--mail-puntual.html

UPDATE

Ajustes de estilos

scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
scss/fourties/molecules/headband/_headband.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/atoms/skin/_skin.scss

Ajustes en NL suscriptores
externals/emailing/templates/24-subscribers-premium-newsletter.html
` },
    { date: "2026-03-11", log: `
NEW

Pasatiempos (Sudoku)

cds-statics/assets/img/decorative/ft-mol-card-sudoku.svg
cds-statics/assets/img/icons/icon-c-close.svg
cds-statics/assets/img/icons/icon-c-play.svg
cds-statics/assets/img/icons/icon-o-close.svg
cds-statics/assets/img/icons/icon-o-error.svg
cds-statics/assets/img/icons/icon-o-in-progress.svg
cds-statics/assets/img/icons/icon-o-play.svg
cds-statics/assets/img/icons/icon-o-success.svg
cds-statics/js/game/sudoku/fourty-js-sudoku.js
fourty/atoms/atom-list.html
fourty/organisms/organism-game.html
fourty/templates/template-pasatiempos-archivo.html
fourty/templates/template-pasatiempos-intermedia-sudoku.html
scss/base/helpers/_backgrounds.scss
scss/fourties/atoms/list/_list.scss
scss/fourties/organism/game/_game.scss

Nuevas plantillas para Customer Journey

externals/emailing/templates/CJ-01--bienvenida-y-confirmacion-compra.html
externals/emailing/templates/CJ-02--bienvenida-carta-director.html
externals/emailing/templates/CJ-03--descarga-app.html
externals/emailing/templates/CJ-04--catalogo-newsletters.html
externals/emailing/templates/CJ-05--beneficios-suscripcion.html
externals/emailing/templates/CJ-06--pasatiempos.html
externals/emailing/templates/CJ-07--club-mensual.html
externals/emailing/templates/CJ-08--mail-puntual.html

UPDATE

Ajustes de estilos

scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
scss/fourties/molecules/headband/_headband.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/atoms/skin/_skin.scss

Ajustes en NL suscriptores
externals/emailing/templates/24-subscribers-premium-newsletter.html
` },
    { date: "2026-03-06", log: `
NEW

Publicidad BC en Cerca
fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-resultados-publicidad-modelo-robas-por-cards.html
scss/fourties/organism/cardhome/_cardHome.scss
fourty/templates/template-cardHome.html

UPDATE

Ajustes de estilos

scss/fourties/organism/game/_game.scss
scss/fourties/molecules/related/_related.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/_amp-btn.scss
scss/fourties/organism/masthead/_masthead.scss

Actualización setting.css de Cuore

AMP

Cabecera AMP de Revistas en blanco

cds-statics/assets/img/logos/logo-cuore-amp.svg
cds-statics/assets/img/logos/logo-viajar-amp.svg
cds-statics/assets/img/logos/logo-woman-amp.svg
cds-statics/assets/img/logos/logo-stilo-amp.svg
cds-statics/css/AMP/fourties/molecules/amp-header.css
cds-statics/css/AMP/amp-[Media-Revista]-core.css

AMP - actualización settings - tipografía
scss/brands/amp-stilo-setup.scss
scss/brands/amp-viajar-setup.scss
scss/brands/amp-woman-setup.scss
scss/brands/amp-cuore-setup.scss

FIX

Corrección ruta Oswald
` },
    { date: "2026-02-20", log: `
NEW

Nuevo hiperlocalismos Aliste, La Opinión de Zamora y Diario Información
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadecalp.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadecalp.svg
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadelanucia.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadepicassent.svg
cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora-aliste.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealfafar.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadebenifairodelesvalls.svg
scss/fourties/organism/masthead/_masthead.scss

Nuevo componente Mediaviewer

fourty/organisms/organism-mediaviewer.html
cds-statics/js/mediaviewer/fourty-js-mediaviewer.js
scss/fourties/organism/mediaviewer/_mediaviewer.scss

UPDATE

Ajustes SubscribeRead
scss/fourties/molecules/subscribeRead/_subscribeRead.scss

Ajustes de estilos
fourty/molecules/molecule-form.html
scss/abstracts/mixins/_fonts.scss (para Revistas)

Ajustes hiperlocalismos EP (cambio de logos)
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2026-02-16", log: `
NEW

Aspa eliminación de textos en formularios.

fourty/molecules/molecule-form.html
scss/fourties/molecules/form/_form.scss
cds-statics/js/form/fourty-js-form-clear-button.js

UPDATE

Sustitución de logo La Crónica de Badajoz 20 Aniversario

scss/fourties/organism/masthead/_masthead.scss
cds-statics/assets/img/logos/logo-regionales-la-cronica-de-badajoz-aniversario-20.svg
` },
    { date: "2026-02-06", log: `
NEW

Hiperlocalismo Salut en Regió7
cds-statics/csv/DS__42.csv
scss/fourties/organism/masthead/_masthead.scss
cds-statics/assets/img/logos/logo-regionales-regio7-lasalut.svg

UPDATE

Ajustes Cerca
scss/fourties/atoms/tooltip/_tooltip.scss

Ajustes de newsletters
externals/emailing/templates/24-subscribers-premium-newsletter-v4.html
` },
    { date: "2026-02-06", log: `
NEW

Nueva variante de Tooltip

fourty/layouts/layout-ep-noticia.html
fourty/atoms/atom-tooltip.html

Nuevas cronicas para Aragon, Alicante y Valencia
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadeelche.svg
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadelaprovinciadealicante.svg
cds-statics/assets/img/logos/logo-regionales-el-periodico-de-aragon-riberadenavarra.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadelaprovinciadevalencia.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealbal.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealzira.svg
cds-statics/csv/DS__42.csv
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Ajustes Cerca
cds-statics/js/tour/fourty-js-tour.js

Ajustes de newsletters
externals/emailing/templates/24-subscribers-premium-newsletter-v9.html

Otros ajustes
cds-statics/js/layout/fourty-js-layout.js
cds-statics/css/brands/ep/setting.css (rutas de fuentes)
scss/fourties/organism/game/_game.scss
` },
    { date: "2026-01-27", log: `
UPDATE

Ajustes estilos Cerca

scss/fourties/atoms/skin/_skin.scss
scss/fourties/organism/hero/_hero.scss
scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-sin-resultados-alert.html
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/atoms/tag/_tag.scss
` },
    { date: "2026-01-26", log: `
NEW

Templates Cerca

fourty/templates/template-cerca-fase-2--00-inicio.html
fourty/templates/template-cerca-fase-2--02-A-feed-resultados-2.html
fourty/templates/template-cerca-fase-2--02-A-feed-resultados.html
fourty/templates/template-cerca-fase-2--02-B-feed-sin-resultados.html
fourty/templates/template-cerca-fase-2--03-editar-localidades.html
fourty/templates/template-cerca-fase-2--04-buscador-resultados.html

UPDATE

Ajustes estilos Cerca

scss/fourties/atoms/skin/_skin.scss
scss/fourties/organism/hero/_hero.scss
scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
scss/fourties/organism/footer-multibrand/_footer-multibrand.scss
` },
    { date: "2026-01-14", log: `
NEW

Herramienta PostCSS

tools/DSLayoutsCSS/js/app.js
cds-statics/css/MEDIA-index-layout.css
tools/DSLayoutsCSS/js/layout-copy-manager.js

UPDATE

Ajustes de Galerías

fourty/templates/template-galeria-vertical.html
scss/fourties/molecules/gallery/_gallery.scss

Ajustes Revistas

fourty/layouts/layout-revistas-viajar-noticia.html
scss/fourties/organism/footer-multibrand/_footer-multibrand.scss
fourty/layouts/layout-revistas-viajar-objeto-editorial-video.html
fourty/layouts/layout-revistas-woman-objeto-editorial-video.html
scss/fourties/molecules/related/_related.scss
scss/fourties/molecules/tagsNews/_tagsNews.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/organism/comments/_comments.scss

Ajustes Cerca v.2

fourty/layouts/layout-ep-cerca-fase-2--00-inicio.html
fourty/layouts/layout-ep-cerca-fase-2--03-editar-localidades.html
fourty/layouts/layout-ep-cerca-fase-2--04-buscador-resultados.html
scss/fourties/molecules/form/_form.scss
fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-resultados.html
` },
    { date: "2026-01-07", log: `
NEW

N/A

UPDATE

Mailing

externals/emailing/reglas-maquetado/CHECKLIST.md
externals/emailing/reglas-maquetado/componentes/README.md
externals/emailing/reglas-maquetado/componentes/estructura/footer.html
externals/emailing/reglas-maquetado/componentes/estructura/wrapper.html
externals/emailing/reglas-maquetado/componentes/interactivos/boton-cta.html
externals/emailing/reglas-maquetado/componentes/layout/separador.html
externals/emailing/reglas-maquetado/plantillas-base.md
externals/emailing/reglas-maquetado/readme.md
externals/emailing/reglas-maquetado/ESTRUCTURA-FINAL.md
externals/emailing/templates/24-subscribers-premium-newsletter-v3.html
externals/emailing/templates/24-subscribers-premium-newsletter-v4.html
externals/emailing/templates/16-promo-v1-B-tipo-destacado-porcentaje-oferta-flash.html
externals/emailing/templates/24-subscribers-premium-newsletter-v2.html

Template Galeria vertical

fourty/templates/template-galeria-vertical.html

Cambio logo EPM Mediterráneo

scss/fourties/organism/masthead/_masthead.scss

Hiperlocalismo Santa Eulalia (Diario de ibiza)

cds-statics/assets/img/logos/logo-regionales-diario-de-ibiza-santa-eularia.svg
scss/fourties/organism/masthead/_masthead.scss

Ajustes de estilos
scss/fourties/atoms/embed/_embed.scss

Nuevo favicon Opinión de A Coruña
cds-statics/assets/img/logos/logo-favicon-regionales-la-opinion-a-coruna-16x16.svg
` },
    { date: "2025-12-17", log: `
NEW

Juego Cuatro en Campo

cds-statics/assets/img/decorative/ft-mol-card-cuatroencampo.svg
cds-statics/assets/img/decorative/ft-mol-card-cuatroencampow.svg
cds-statics/assets/img/decorative/ft-mol-card-palabraoculta.svg
cds-statics/assets/img/icons/cuatroencampo-mini.svg
cds-statics/assets/img/icons/icon-camiseta.svg
fourty/atoms/atom-text.html
fourty/organisms/organism-game.html
fourty/templates/template-pasatiempos-cuatroencampo.html
scss/base/helpers/_backgrounds.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/atoms/text/_text.scss
scss/fourties/molecules/subheader/_subheader.scss
scss/fourties/organism/game/_game.scss

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss

Cerca Fase 2

cds-statics/assets/img/logos/logo-favicon-MEDIA-16x16.svg
fourty/templates/template-cardHome.html
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/suggestions-chips/_suggestions-chips.scss
fourty/layouts/layout-ep-cerca-fase-2--02-A-feed-resultados.html
fourty/layouts/layout-ep-cerca-fase-2--03-editar-localidades.html
scss/fourties/atoms/tag/_tag.scss
scss/fourties/organism/search-autocomplete/_search-autocomplete.scss
cds-statics/js/scroll/smooth-scrollbar/smooth-scrollbar-functions.js
` },
    { date: "2025-12-11", log: `
NEW

N/A

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
cds-statics/js/dropdown/fortty-js-dropdown-simple.js

Ajustes de estilos
scss/fourties/molecules/authors/_authors.scss
scss/fourties/organism/cardhome/_cardHome.scss

Cerca fase 1

externals/cerca/styles.css
fourty/layouts/layout-epe-cerca-btn-CAT.html
fourty/layouts/layout-epe-cerca-btn.html
fourty/layouts/layout-epe-cerca-server.html
` },
    { date: "2025-12-01", log: `
NEW

Cerca fase 2

cds-statics/js/pages/cerca/REVISION_PROFUNDA_PROYECTO.md
fourty/layouts/layout-home.html
fourty/organisms/organism-home.html

fourty/molecules/molecule-sticky-panel.html
scss/fourties/molecules/sticky-panel/_sticky-panel.scss
cds-statics/js/sticky-panels/sticky-panel.js

fourty/organisms/organism-hero-welcome.html

fourty/organisms/organism-search-autocomplete.html
scss/fourties/organism/search-autocomplete/search-autocomplete.scss

fourty/organisms/organism-suggestions-chips.html
scss/fourties/organism/suggestions-chips/suggestions-chips.scss

scss/fourties/atoms/tag/_tag.scss
cds-statics/js/pages/cerca-fase-02/cerca-fase-02.js

scss/fourties/organism/hero/_hero.scss
scss/fourties/atoms/skin/_skin.scss

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
fourty/organisms/organism-masthead-login.html
fourty/organisms/organism-masthead-logged.html
` },
    { date: "2025-12-01", log: `
NEW

N/A

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
fourty/organisms/organism-masthead-login.html
fourty/organisms/organism-masthead-logged.html
cds-statics/assets/img/logos/logo-regionales-diario-de-mallorca-ido.svg

cds-statics/assets/img/icons/nav-solid-light-gift.svg

Ajustes de mailing para Piano

externals/emailing/templates/18-promo-v1-black.html
externals/emailing/templates/19-promo-v2-black.html
` },
    { date: "2025-11-28", log: `
NEW

N/A

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss
scss/fourties/molecules/ticker/_ticker.scss
fourty/organisms/organism-masthead-login.html
fourty/organisms/organism-masthead-logged.html
scss/layout/_grid.scss
cds-statics/assets/img/icons/nav-solid-light-gift.svg
` },
    { date: "2025-11-24", log: `
NEW

Newsletters

externals/emailing/templates/email-author-newsletter-v1.html
externals/emailing/templates/email-news-summary-v1.html
externals/emailing/templates/email-newsletter-v1.html
externals/emailing/templates/email-promo-v2-black.html
externals/emailing/templates/email-promo-v2.html
externals/emailing/templates/email-transactional-v1.html
externals/emailing/templates/email-welcome-v1.html
externals/emailing/templates/email-newsletter-v1.html

Componente Subheader

scss/base/helpers/_backgrounds.scss
fourty/templates/template-pasatiempos-archivo.html
fourty/organisms/organism-services.html
scss/fourties/organism/services/_services.scss

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss

Ajustes skys en noticia

cds-statics/js/sticking/fourty-ads_skys-sticky.js

Ajustes de estilos

scss/layout/_grid.scss
` },
    { date: "2025-11-13", log: `
NEW

N/A

UPDATE

Ajustes Cabecera Unificada

scss/fourties/organism/masthead/_masthead.scss
fourty/templates/template-masthead.html

Personalización sección NFL (Sport)

scss/fourties/molecules/breadcrumb/_breadcrumb.scss
scss/fourties/molecules/path/_path.scss

Ajustes de estilos

scss/fourties/atoms/animation/_animation.scss

Cambio del id="hero" en la capa sticky piano en todos los html del masthead
template-masthead*.html

FIX

Ajuste en el FADE.OUT para que no se mueva en el eje-Y según desaparece
scss/fourties/atoms/animation/_animation.scss
` },
    { date: "2025-11-06", log: `
NEW

N/A

Template emailing

externals/emailing/templates/email-promo-v1.html
externals/emailing/templates/email-promo-v1-black.html
externals/emailing/templates/email-promo-v2-black.html
externals/emailing/reglas-maquetado/MEJORES-PRACTICAS-EMAIL.md
externals/emailing/reglas-maquetado/QA-EMAIL-COMPATIBILIDAD.md
tools/postCSS/docs/FONT-CDN-PROCESSOR.md

Ajuste layouts public

cds-statics/js/layout/fourty-js-layout.js
fourty/templates/template-XXXX.html
scss/layout/_grid.scss

AMP

AMP Revistas

scss/amp-cuore-core.scss
scss/amp-viajar-core.scss
scss/amp-woman-core.scss
scss/brands/amp-woman-setup.scss
scss/brands/amp-viajar-setup.scss
scss/brands/amp-cuore-setup.scss

UPDATE

Cabecera unificada

cds-statics/assets/img/icons/icon-kiosk-masterhead.png
cds-statics/assets/img/icons/icon-kiosk-masterhead.svg
cds-statics/assets/img/icons/nav-solid-light-newsletter.svg
cds-statics/assets/img/icons/nav-solid-light-pasatiempos.svg
cds-statics/assets/img/icons/nav-solid-light-save.svg
fourty/templates/template-masthead.html
scss/fourties/organism/masthead/_masthead.scss

Ajustes de estilos

scss/fourties/molecules/breadcrumb/_breadcrumb.scss
` },
    { date: "2025-11-06", log: `
Hiperlocalismo LNE > El Llano

cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-elllano.svg
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-elllanoOG_.png
cds-statics/assets/img/logos/logo-regionales-lne-elllano.png
cds-statics/css/brands/regionales/setting.css
cds-statics/csv/DS__42.csv
scss/brands/regionales-setup.scss

Nuevo estilo badge en botones
scss/fourties/atoms/btn/_btn.scss

UPDATE

Newsletters
fourty/layouts/layout-ep-newsletter-landing.html
scss/fourties/molecules/card-newsletter/_card-newsletter.scss

Pasatiempos
fourty/templates/template-pasatiempos-pangramax.html

Ajustes para Revistas
fourty/layouts/layout-revistas-woman-cardHome.html
scss/fourties/atoms/img/_img.scss
scss/fourties/atoms/text/_text.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/cardhome/cardHome-revistas.scss

Reportajes Multimedia

fourty/templates/template-reportaje-multimedia-lenis.html

Ajustes de estilos

fourty/templates/template-galeria-vertical.html
cds-statics/css/brands/ep/molecules/gallery.css
scss/fourties/molecules/gallery/_gallery.scss
` },
    { date: "2025-10-29", log: `
Hiperlocalismo LNE > El Llano

cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-elllano.svg
cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-elllanoOG_.png
cds-statics/assets/img/logos/logo-regionales-lne-elllano.png
cds-statics/css/brands/regionales/setting.css
cds-statics/csv/DS__42.csv
scss/brands/regionales-setup.scss

Nuevo estilo badge en botones
scss/fourties/atoms/btn/_btn.scss

UPDATE

Newsletters
fourty/layouts/layout-ep-newsletter-landing.html
scss/fourties/molecules/card-newsletter/_card-newsletter.scss

Pasatiempos
fourty/templates/template-pasatiempos-pangramax.html

Ajustes para Revistas
fourty/layouts/layout-revistas-woman-cardHome.html
scss/fourties/atoms/img/_img.scss
scss/fourties/atoms/text/_text.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/cardhome/cardHome-revistas.scss

Reportajes Multimedia

fourty/templates/template-reportaje-multimedia-lenis.html

Ajustes de estilos

fourty/templates/template-galeria-vertical.html
cds-statics/css/brands/ep/molecules/gallery.css
scss/fourties/molecules/gallery/_gallery.scss
` },
    { date: "2025-10-22", log: `
NEW

N/A

FIX

Fix Header EPE/EPC
fourty/layouts/layout-ep-cabecera.html

UPDATE

Adaptación de masthead para terceros

scss/fourties/organism/masthead/_masthead.scss
cds-statics/css/[MEDIA]-header-ext.css
tools/postCSS/js/processors/cdn-url-processor.js

Ajustes cabecera unificada

scss/fourties/molecules/dropdown/_dropdown.scss
cds-statics/assets/img/icons/nav-solid-light-pasatiempos.svg
cds-statics/assets/img/icons/nav-solid-suscription-pasatiempos.svg
cds-statics/assets/img/icons/nav-solid-suscription.svg
fourty/layouts/layout-epe-noticia-masthead-cambio-layout.html
fourty/layouts/layout-epe-noticia-masthead.html
fourty/organisms/organism-masthead.htm
fourty/templates/template-masthead-logged.html

Ajustes de estilos
scss/fourties/organism/toolbar/_toolbar.scss
scss/fourties/molecules/modal/_modal.scss
scss/fourties/atoms/tag/_tag.scss
` },
    { date: "2025-10-22", log: `
NEW

Juego Palabra oculta

cds-statics/assets/img/icons/icon-palabraoculta.svg
fourty/organisms/organism-game.html
fourty/templates/template-pasatiempos-pangramax.html
fourty/templates/template-pasatiempos-wordle.html
scss/base/helpers/_backgrounds.scss
scss/fourties/organism/game/_game.scss

UPDATE

cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--club-faro.svg
cds-statics/assets/img/bgs/logo-masbarcelona.svg
cds-statics/assets/img/bgs/ft-mol-path--consorcizonafranca.svg

Ajustes de estilos

scss/fourties/atoms/date/_date.scss
scss/fourties/molecules/writer/_writer.scss
scss/fourties/molecules/toolbar/_toolbar.scss
scss/fourties/molecules/popover/_popover.scss
scss/fourties/organism/cardhome/_cardHome.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2025-10-14", log: `
NEW

Secciones personalizadas Club Faro (FdV)

cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--club-faro.svg
cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--escola-en-camino.svg
cds-statics/assets/img/bgs/ft-mol-path--clubfaro.svg
cds-statics/assets/img/bgs/ft-mol-path--escolaencamino.svg

UPDATE

Ajustes de estilos

scss/fourties/organism/footer-multibrand/_footer-multibrand.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss

Cabecera unificada

cds-statics/assets/img/icons/nav-solid-favorite--active.svg
cds-statics/assets/img/icons/nav-solid-favorite.svg
cds-statics/assets/img/icons/nav-solid-light-newsletter.svg
cds-statics/assets/img/icons/nav-solid-light-pasatiempos.svg
cds-statics/assets/img/icons/nav-solid-light-plus.svg
cds-statics/assets/img/icons/nav-solid-light-save.svg
cds-statics/assets/img/icons/nav-solid-light-user.svg
fourty/organisms/organism-masthead.html
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/molecules/dropdown/_dropdown.scss

Cabecera Oviedo en LNE

cds-statics/assets/img/logos/lne-logo-cobranded-oviedo-bau.png
scss/fourties/organism/masthead/_masthead.scss

Reportajes Multimedia

cds-statics/js/custom/fourty-js-custom-fonts.js
fourty/helpers/helper-spacers.html
scss/base/base.scss
scss/base/helpers/_spacers.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/molecules/dropdown/_dropdown.scss
scss/fourties/atoms/title/_title.scss
scss/fourties/molecules/breadcrumb/_breadcrumb.scss
scss/fourties/organism/breadcrumb/_breadcrumb.scss
scss/fourties/molecules/subtitle/_subtitle.scss
fourty/templates/template-reportaje-multimedia-lenis.html

Varios autores sin enlace

fourty/templates/template-objeto-editorial-video.html
scss/fourties/molecules/writer/_writer.scss

Favoritos en noticia

fourty/molecules/molecule-rrss.html

Molécula Path

fourty/molecules/molecule-path.html
scss/fourties/molecules/path/_path.scss
` },
    { date: "2025-10-01", log: `
NEW

N/A

UPDATE

Ajustes Pasatiempos

fourty/templates/template-pasatiempos-juego-final.html
scss/fourties/organism/game/_game.scss
scss/fourties/molecules/subheader/_subheader.scss
scss/fourties/molecules/card-newsletter/_card-newsletter.scss

scss/fourties/molecules/tapbar/_tapbar.scss

FIX

Corrección de logos

cds-statics/assets/img/logos/logo-regionales-el-periodico-de-aragon-lacronicadevaldejalon.svg
cds-statics/assets/img/logos/logo-regionales-el-periodico-de-aragon-campodecarinena.svg

UPDATE

Otros ajustes

scss/fourties/organism/mediareport/_mediareport.scss
` },
    { date: "2025-09-29", log: `
NEW

Cabecera Fiestas del Pilar

fourty/layouts/layout-regionales-noticia-fiestas-del-pilar.html
cds-statics/assets/img/bgs/ft-mol-breadcrumb-is-sectioned--fiestas-del-pilar.png
scss/fourties/molecules/breadcrumb/_breadcrumb.scss

Cabecera Mallorca Delicia

cds-statics/assets/img/logos/logo-multibrand-mallorca-delicia.png
cds-statics/assets/img/logos/logo-multibrand-mallorca-delicia.svg
fourty/layouts/layout-regionales-noticia-mallorca-delicia.html
scss/fourties/organism/breadcrumb/_breadcrumb.scss

UPDATE

Ajustes Pasatiempos

cds-statics/assets/img/decorative/ft-mol-game-pangramax-clue.png
cds-statics/assets/img/decorative/ft-mol-game-pangramax-reboot.png
cds-statics/assets/img/decorative/ft-mol-game-pangramax-solved.png
scss/fourties/organism/game/_game.scss
cds-statics/assets/img/lotties/game-is-error.lottie
cds-statics/assets/img/lotties/game-is-ok.lottie
cds-statics/assets/img/lotties/game-is-warning.lottie
fourty/templates/template-pasatiempos-juego-final.html
fourty/templates/template-pasatiempos-juego-final2.html
scss/fourties/atoms/btn/_btn.scss

scss/fourties/molecules/card/_card.scss
scss/fourties/molecules/modal/_modal.scss
` },
    { date: "2025-09-24", log: `
NEW

Breadcrumb Esncial en EP y Sport

scss/fourties/organism/breadcrumb/_breadcrumb.scss
fourty/layouts/layout-sport-noticia.html
fourty/layouts/layout-ep-noticia.html
cds-statics/assets/img/logos/logo-multibrand-esncial.svg
cds-statics/assets/img/logos/logo-sport-rojo.svg
scss/fourties/organism/masthead/_masthead.scss

Pasatiempo Pangramax

scss/fourties/organism/game/_game.scss
scss/fourties/organism/toolbar/_toolbar.scss
fourty/templates/template-pasatiempos-juego-final.html
cds-statics/assets/img/icons/nav-solid-light-reload.svg
scss/fourties/atoms/btn/_btn.scss
fourty/molecules/molecule-dropdown.html
scss/fourties/molecules/dropdown/_dropdown.scss
scss/fourties/organism/services/_services.scss
scss/fourties/atoms/list/_list.scss
scss/base/helpers/_images.scss
scss/fourties/atoms/animation/_animation.scss
scss/fourties/atoms/scrollbar/_scrollbar.scss
cds-statics/js/scroll/smooth-scrollbar/smooth-scrollbar-functions.js
scss/fourties/molecules/subheader/_subheader.scss

UPDATE

Ajuste de estilos

scss/fourties/organism/footer-multibrand/_footer-multibrand.scss

REMOVE

Eliminación de Vichy en imagen
cds-statics/assets/img/bgs/cuidamostusalud-promo-breadcrumb.png

FIX

Ajuste ruta en org currentNews.css
scss/fourties/organism/currentNews/_currentNews.scss
` },
    { date: "2025-09-16", log: `
NEW

Pasatiempos

fourty/templates/template-pasatiempos-intermedia-juego.html
scss/fourties/molecules/card/_card.scss
cds-statics/assets/img/decorative/ft-mol-card-pangramax.svg
scss/base/helpers/_backgrounds.scss

FIX

Bug Diario de Formentera


UPDATE

Diario de Andratx

cds-statics/assets/img/logos/logo-regionales-diario-de-mallorca-diariodeandratx.svg
scss/fourties/organism/masthead/_masthead.scss

Ajustes Cerca

cds-statics/js/pages/cerca/csv-manager.js
fourty/layouts/layout-epe-cerca.html
cds-statics/js/pages/cerca/main-media-filter.js
` },
    { date: "2025-09-09", log: `
NEW

N/A

UPDATE

Ajustes de estilos
scss/fourties/atoms/jwplayer/_jwplayer.scss
` },
    { date: "2025-09-05", log: `
NEW

Componente Path

/fourty/molecules/molecule-path.html
scss/fourties/molecules/path/_path.scss

UPDATE

Html para newsletters

fourty/layouts/layout-ep-newsletter-landing.html
scss/fourties/molecules/headband/_headband.scss

Objeto editorial de vídeo

fourty/templates/template-objeto-editorial-video.html

Ajustes de estilos

scss/base/helpers/_hides.scss
scss/fourties/molecules/dropdown/_dropdown.scss
scss/fourties/atoms/switch/_switch.scss
scss/fourties/atoms/toogle/_toogle.scss
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2025-08-27", log: `
NEW

Nueva landing de Newsletters

fourty/layouts/layout-ep-newsletter-landing.html

FIX

Fix para z-index de la barra

scss/fourties/atoms/ad/_ad.scss
scss/fourties/molecules/tapbar/_tapbar.scss

UPDATE

Ajustes Pasatiempos

fourty/templates/template-home-pasatiempos-cambios.html
scss/fourties/molecules/card/_card.scss

Doble Skin en noticia

fourty/layouts/layout-regionales-noticia-doble-skin.html

Reportajes

scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2025-08-11", log: `
UPDATE

Pasatiempos
externals/servicios/pasatiempos/[Media].css

Ajustes de estilos
scss/fourties/molecules/card/_card.scss
scss/fourties/molecules/amp-writer.scss
scss/fourties/molecules/menuanchor/_menuanchor.scss
scss/fourties/organism/masthead/_masthead.scss

FIX

Fix EPIOPER - Cabecera Regionales

` },
    { date: "2025-07-28", log: `
UPDATE

Doble skin de publicidad

fourty/layouts/layout-regionales-portada-doble-skin.html
fourty/layouts/layout-sport-noticia.html
fourty/layouts/layout-sport-portada-doble-skin.html
scss/layout/_grid.scss

Quienes somos

fourty/layouts/layout-epe-quienes-somos-csv.html
cds-statics/csv/medias__uitext.csv
cds-statics/csv/quienes__somos.csv
cds-statics/js/pages/quienes-somos/csv-manager.js
` },
    { date: "2025-07-23", log: `
NEW

Nueva variante Writer

fourty/templates/template-writer.html
scss/fourties/molecules/writer/_writer.scss
fourty/molecules/molecule-writer.html

Página Quienes somos dinámica

cds-statics/js/pages/quienes-somos/csv-manager.js
cds-statics/csv/quienes__somos.csv
fourty/layouts/layout-epe-quienes-somos-csv.html

UPDATE

Ajuste Doble Skin Publicidad

fourty/layouts/layout-epe-portada-doble-skin.html
fourty/layouts/layout-sport-portada-doble-skin.html
fourty/layouts/layout-regionales-portada-doble-skin.html

scss/layout/_grid.scss

Ajustes de estilos Pasatiempos

externals/servicios/pasatiempos/[MEDIA].css

Layout objeto editorial Video (añadir spacer)

fourty/templates/template-objeto-editorial-video.html

Otros ajustes de estilos
scss/fourties/organism/masthead/_masthead.scss

REMOVE

Listado de Crónicas (eliminación de referencias rel="noopener noreferrer")

fourty/layouts/layout-epe-cronicas-listado-Fix.html
fourty/layouts/layout-epe-cronicas-listado-cat.html
fourty/layouts/layout-epe-cronicas-listado-unifiy.html
fourty/layouts/layout-epe-cronicas-listado.html
fourty/layouts/layout-epe-epc-cronicas-listado-Fix.html

UPDATE

Ajustes Reportajes Multimedia
fourty/templates/template-reportaje-multimedia.html
fourty/molecules/molecule-menu-anchor.html
cds-statics/css/brands/[Media]/molecules/menuanchor.css
` },
    { date: "2025-07-14", log: `
UPDATE

Cata Mayor y Abril en EP

fourty/layouts/layout-ep-noticia-gastronomia.html
fourty/layouts/layout-ep-noticia-ocioycultura.html

Nuevo hiperlocalismo Laviana

cds-statics/assets/img/logos/logo-regionales-la-nueva-espana-laviana.svg
cds-statics/css/brands/regionales/setting.css
scss/brands/regionales-setup.scss

FIX

Ajustes de tapbar.js para error en consola

cds-statics/js/tapbar/fourty-js-tapbar.js
` },
    { date: "2025-07-10", log: `
UPDATE

Listado de Crónicas

fourty/layouts/layout-epe-cronicas-listado.html

fourty/layouts/layout-epe-cronicas-listado-cat.html

fourty/layouts/layout-epe-epc-cronicas-listado-Fix.html

Ajustes JwPlayer para la salida de tapbar

scss/fourties/atoms/jwplayer/_jwplayer.scss

FIX

Ajustes de tapbar.js para error en consola

cds-statics/js/tapbar/fourty-js-tapbar.js

REMOVE

Retirar función no existente

cds-statics/js/sticking/fourty-header-sticky.js
` },
    { date: "2025-07-06", log: `
UPDATE

cds-statics/assets/img/bgs/cronicas-listado--img-footer.svg

REMOVE

Oculta icono Directo en Cabecera Sport
cds-statics/css/legacy/cabecera-sport.css

Quitar sticky en cabeceras y ajuste publicidad footer y skys
cds-statics/js/sticking/fourty-ads_skys-sticky.js
cds-statics/js/sticking/fourty-header-sticky.js
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/organism/masthead/_masthead.scss
scss/layout/_grid.scss
scss/fourties/organism/masthead/_masthead.scss

UPDATE

Listado de Crónicas
fourty/layouts/layout-epe-cronicas-listado-cat.html
fourty/layouts/layout-epe-cronicas-listado.html

Ajustes Reportajes Multimedia
fourty/templates/template-reportaje-multimedia.html
scss/fourties/organism/parallax/_parallax.scss

Pasatiempos
externals/servicios/pasatiempos/elperiodico.css
externals/servicios/pasatiempos/sport.css
externals/servicios/pasatiempos/style.css
` },
    { date: "2025-06-27", log: `
AMP

Layout AMP Vídeo
fourty/layouts/amp-layout-objeto-editorial-video-sport.html
scss/fourties/molecules/amp-writer.scss
scss/fourties/molecules/amp-headband.scss

UPDATE

Ajustes en tapbar
cds-statics/js/tapbar/fourty-js-tapbar.js
fourty/layouts/layout-regionales-noticia.html

Ajustes de estilos
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/organism/masthead/_masthead.scss
scss/fourties/molecules/authors/_authors.scss

A11Y

Ajustes accesibilidad
fourty/molecules/molecule-dataSheed.html
fourty/molecules/molecule-accordion.html

UPDATE

Ajustes listado de Crónicas
fourty/layouts/layout-epe-cronicas-listado.html
` },
    { date: "2025-06-25", log: `
NEW

Doble skin de publicidad para Portadas
fourty/layouts/layout-epe-portada-doble-skin.html
cds-statics/assets/img/banners/megabanner-skin2.png
cds-statics/assets/img/banners/sky-left-skin2.png
cds-statics/assets/img/banners/sky-right-skin2.png
cds-statics/js/dobleSkin/fourty-js-doble-skin.js
cds-statics/js/sticking/fourty-ads_dobleskys-sticky.js
fourty/layouts/layout-epe-portada-doble-skin-masthead.html
fourty/layouts/layout-regionales-portada-doble-skin.html
scss/fourties/atoms/ad/_ad.scss
scss/fourties/organism/masthead/_masthead.scss
scss/layout/_grid.scss

AMP

Tapbar para AMP

fourty/molecules/molecule-tapbar.html

NEW

Nuevas Crónicas
cds-statics/assets/img/logos/logo-multibrand-ep-badalona.svg
cds-statics/assets/img/logos/logo-multibrand-ep-castelldefels.svg
cds-statics/assets/img/logos/logo-multibrand-ep-cornella.svg
cds-statics/assets/img/logos/logo-multibrand-ep-esplugues.svg
cds-statics/assets/img/logos/logo-multibrand-ep-gava.svg
cds-statics/assets/img/logos/logo-multibrand-ep-granollers.svg
cds-statics/assets/img/logos/logo-multibrand-ep-hospitalet.svg
cds-statics/assets/img/logos/logo-multibrand-ep-martorell.svg
cds-statics/assets/img/logos/logo-multibrand-ep-mataro.svg
cds-statics/assets/img/logos/logo-multibrand-ep-molletdelvalles.svg
cds-statics/assets/img/logos/logo-multibrand-ep-parets.svg
cds-statics/assets/img/logos/logo-multibrand-ep-rubi.svg
cds-statics/assets/img/logos/logo-multibrand-ep-sabadell.svg
cds-statics/assets/img/logos/logo-multibrand-ep-santacoloma.svg
cds-statics/assets/img/logos/logo-multibrand-ep-santboi.svg
cds-statics/assets/img/logos/logo-multibrand-ep-santcugat.svg
cds-statics/assets/img/logos/logo-multibrand-ep-tarragona.svg
cds-statics/assets/img/logos/logo-multibrand-ep-terrassa.svg
cds-statics/assets/img/logos/logo-multibrand-ep-viladecans.svg
cds-statics/assets/img/logos/logo-multibrand-ep-vilanovailageltru.svg
cds-statics/js/vendors/datatables/table--pressdata.csv
scss/fourties/organism/masthead/_masthead.scss

cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealbal.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealdaia.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadealzira.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadebenissa.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadebenitatxell.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadebetera.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadeburjassot.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadecatarroja.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadegodella.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadelliria.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadepaterna.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadepego.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadepucol.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicaderibarojadeturia.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadetorrent.svg
cds-statics/assets/img/logos/logo-regionales-levante-el-mercantil-valenciano-lacronicadevilamarxant.svg

UPDATE

Ajustes de estilos

scss/fourties/amp-date.scss
scss/fourties/organism/masthead/_masthead.scss

Listado de Hiperlocalismos

fourty/layouts/layout-epe-cronicas-listado.html
cds-statics/assets/img/icons/form-solid-light-search.svg

Pasatiempos

fourty/templates/template-home-pasatiempos-catalanas.html
fourty/templates/template-home-pasatiempos.html
cds-statics/css/legacy/footer.css
` },
    { date: "2025-06-18", log: `
NEW

Variante Quickbar RRSS
fourty/layouts/layout-ep-noticia.html
fourty/molecules/molecule-writer.html
fourty/templates/template-writer.html
scss/fourties/molecules/rrss/_rrss.scss

AMP

Tapbar AMP

cds-statics/css/AMP/fourties/molecules/amp-tapbar.css
fourty/layouts/amp-layout-desarrollo-noticia-sport.html
fourty/molecules/molecule-tapbar.html
scss/fourties/molecules/amp-tapbar.scss

UPDATE

Ajustes de estilos
scss/fourties/atoms/btn/_btn.scss
cds-statics/css/legacy/footer.css
scss/base/_dark.scss

Ajustes de js
cds-statics/js/tapbar/fourty-js-tapbar.js

Ajustes Pasatiempos
cds-statics/assets/img/logos/logo-pasatiempos.svg
fourty/templates/template-home-pasatiempos.html
scss/fourties/molecules/card/_card.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2025-05-28", log: `
NEW

Crónica de Toledo

cds-statics/assets/img/logos/logo-multibrand-epe-toledo.svg
cds-statics/js/vendors/datatables/table--pressdata.csv
fourty/layouts/layout-epe-mapa-cronicas.html
scss/fourties/organism/masthead/_masthead.scss

Átomo advice

scss/fourties/atoms/advice/_advice.scss

Menú APP

fourty/atoms/atom-toogle.html
scss/fourties/atoms/toogle/_toogle.scss
fourty/organisms/organism-masthead-app-second-level.html
cds-statics/js/toogle/fourty-js-toogle.js

Helpers

fourty/helpers/helper-display.html
fourty/helpers/helper-home.html
fourty/helpers/helper-size.html
scss/base/helpers/_backgrounds.scss

Reportajes multimedia

fourty/templates/template-reportaje-multimedia-ubicacion-contenidos.html
scss/fourties/organism/parallax/_parallax.scss

UPDATE

Colores Disqus
cds-statics/css/brands/ep/atoms/disqus.css

A11Y

Ajustes área de clicado - Accesibilidad
scss/abstracts/mixins/_click-area.scss
scss/abstracts/mixins/mixins.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/atoms/disqus/_disqus.scss
scss/fourties/atoms/link/_link.scss
scss/fourties/atoms/list/_list.scss
scss/fourties/atoms/readmore/_readmore.scss
scss/fourties/atoms/switch/_switch.scss
scss/fourties/atoms/tag/_tag.scss
scss/fourties/molecules/btnGroup/_btnGroup.scss
scss/fourties/molecules/modal/_modal.scss
scss/fourties/molecules/relatedSlider/_relatedSlider.scss
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/molecules/swiper/_swiper.scss
scss/fourties/molecules/tabs/_tabs.scss
scss/fourties/molecules/tagsNews/_tagsNews.scss

UPDATE

Ajustes de estilos

scss/fourties/molecules/authors/_authors.scss
scss/fourties/molecules/tapbar/_tapbar.scss
` },
    { date: "2025-05-12", log: `
NEW

Menu APP

cds-statics/assets/img/icons/icon-kiosko.svg
cds-statics/assets/img/icons/icon-settings.svg

Neomotor en EP
scss/fourties/organism/breadcrumb/_breadcrumb.scss

UPDATE

Estilos Modo oscuro

cds-statics/css/brands/[MEDIO]/setting-[MEDIO].css
scss/base/_dark.scss
scss/fourties/organism/masthead/_masthead.scss

A11Y

Ajustes de accesibilidad

cds-statics/js/dropdown/fortty-js-dropdown-simple.js
scss/fourties/molecules/dropdown/_dropdown.scss
cds-statics/js/tabs/fourty-js-tabs.js

UPDATE

Ajustes de estilos
scss/fourties/atoms/list/_list.scss
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/molecules/tabs/_tabs.scss
scss/fourties/molecules/writer/_writer.scss
` },
    { date: "2025-05-08", log: `
UPDATE

Ajustes de estilos
scss/base/base.scss
scss/base/_reset.scss
` },
    { date: "2025-05-07", log: `
NEW

Layout Autores

fourty/organisms/organism-authors.html

UPDATE

scss/base/_dark.scss

Ajuste de estilos

scss/base/_reset.scss
scss/fourties/atoms/ad/_ad.scss
scss/fourties/atoms/btn/_btn.scss
scss/fourties/atoms/date/_date.scss
scss/fourties/molecules/rrss/_rrss.scss
scss/fourties/molecules/writer/_writer.scss
scss/fourties/organism/footer-multibrand/_footer-multibrand.scss
scss/fourties/organism/masthead/_masthead.scss
` },
    { date: "2025-04-23", log: `
NEW

Cambio de visualización interno del showroom. Esto implica cambios en los htmls y en su funcionamiento, sin afectar a nada de Producción.

Modo oscuro (en fase beta)
cds-statics/css/brands/MEDIA/setting.css
cds-statics/js/switch/fourty-js-switch-darkmode.js
scss/fourties/molecules/switcher/_switcher.scss

FIX

Bug de sección Zona Franca en EP
scss/fourties/molecules/breadcrumb/_breadcrumb.scss

UPDATE

Cabecera Unificada (ajustes)
cds-statics/js/headers/masthead.js
scss/fourties/organism/masthead/_masthead.scss

Ajuste de estilos
scss/base/helpers/_scrolls.scss
scss/fourties/atoms/list/_list.scss
scss/fourties/molecules/slider/_slider.scss

DS. Rúbrica "publicidad" en bloque taboola regional catalán
scss/fourties/atoms/ad/_ad.scss
` },
    { date: "2025-04-14", log: `
Nuevo atom para Disqus

scss/fourties/atoms/disqus/_disqus.scss
cds-statics/css/brands/[MEDIO]/atoms/disqus.css

Nueva Cabecera Unificada

cds-statics/js/headers/masthead.js
fourty/organisms/organism-masthead.html
scss/fourties/organism/masthead/_masthead.scss
cds-statics/css/brands/[MEDIO]/organism/masthead.css
cds-statics/assets/img/icons/icon-search-masterhead.svg
cds-statics/assets/img/icons/icon-user-masterhead.svg

Hiperlocalismo Toro

cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora-toro.png
cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora-toro.svg
cds-statics/assets/img/logos/logo-regionales-la-opinion-correo-de-zamora-toroOG.png

Nueva variante ft-mol-headband--section__img
scss/fourties/molecules/headband/_headband.scss
fourty/molecules/molecule-headband.html

Link en Activos en EP
scss/fourties/organism/breadcrumb/_breadcrumb.scss

Ajuste de estilos
scss/fourties/atoms/tour/_tour.scss

Ajuste en mapa hiperlocal
fourty/organisms/organism-hiperlocalmap.html
fourty/layouts/layout-epe-mapa-cronicas.html

REMOVE

Eliminar cronica castellociutat
` },
    { date: "2025-03-28", log: `
Organismo Hiperlocal
fourty/organisms/organism-hiperlocalmap.html
fourty/layouts/layout-epe-mapa-cronicas.html
cds-statics/assets/img/logos/pin-maps/logo-cr--MEDIO.svg

Cabecera Economia en EP
scss/fourties/organism/breadcrumb/_breadcrumb.scss

Organismo Newsletter
scss/fourties/organism/newsletter/_newsletter.scss

Átomo (tour)
cds-statics/js/tour/fourty-js-tour.js
fourty/atoms/atom-tour.html
scss/fourties/atoms/tour/_tour.scss

Nueva cronica lacronicadelalacanti
cds-statics/assets/img/logos/logo-regionales-diario-informacion-lacronicadelalacanti.svg
` },
    { date: "2025-03-21", log: `
Logos de Crónicas e hiperlocalismos

cds-statics/assets/img/logos/logo-cr--XXXXX.svg
cds-statics/assets/img/logos/logo-multibrand-[MEDIO]-[Hiperlocalismo].svg
cds-statics/assets/img/logos/logo-regionales-[MEDIO]-[Hiperlocalismo].svg

Módulo de Crónicas para Home
cds-statics/js/vendors/maps/leaflet.js
fourty/organisms/organism-hiperlocalmap.html

Tabla de hiperlocalismos para DS
cds-statics/js/vendors/datatables/jquery.dataTables.min.css
cds-statics/js/vendors/datatables/jquery.dataTables.min.js
cds-statics/js/vendors/datatables/loadCSV.js
cds-statics/js/vendors/datatables/table--medias.csv
cds-statics/js/vendors/datatables/table-js-ds.css
` }
];
