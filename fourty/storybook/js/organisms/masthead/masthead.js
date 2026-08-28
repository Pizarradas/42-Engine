/* ========================================================================
   organisms/masthead/masthead.js - Organisms / Masthead (.ft-org-masthead)
   ------------------------------------------------------------------------
   Casuistica REAL de scss/fourties/organism/masthead/_masthead.scss
   (.ft-org-masthead, root --branded). Cero invencion de API.

   El masthead es JS-DRIVEN: el boton abre/cierra el menu lateral (--side) y la
   cabecera fija (--fix) aparece al hacer scroll; lo gobierna cds-statics/js/
   headers/masthead.js (+ affix, sticking, sidenav, popover, switch). El canvas
   del storybook NO ejecuta el JS de componente cuando una story INYECTA markup
   (innerHTML no corre <script>). Por eso los estados se publican como stories
   kind:"page": el iframe NAVEGA a una PAGINA VIVA autocontenida que vive DENTRO
   de esta carpeta del storybook - pages/<estado>.html - que carga su propio CSS
   (ux setting + ux-index, conmutables por marca) y los JS REALES del masthead, y
   tiene body alto (min-height:2000px) para que el scroll muestre la cabecera fija.

   NO se referencia el backup __old-showroom en runtime: las paginas son propias
   del storybook (pages/), generadas extrayendo el <header> completo (principal +
   --fix + --side) del showroom. brandable:true -> el toolbar Brand y Cabecera
   repintan logo/colores sobre la pagina viva (applyBrandToPage).

   masthead.html (subgrupo "Markup") es el mismo <header> completo como markup
   plano (SSOT en fichero, copiable), igual que el <x>.html del resto de organismos.

   Control minimal-header - uno por estado: `.minimal-header` es una clase de
   ANCESTRO (`.minimal-header .ft-org-masthead`, behavior-parent) que reduce la
   cabecera (~160px->80px), oculta la fecha y achica logos. CSS PURO (sin JS); el
   motor la togglea en el <body> de la pagina viva (applyPageArgs).
   ======================================================================== */
(function () {
    "use strict";
    var docsTable = window.SB.helpers.docsTable;
    var deprecationBlock = window.SB.helpers.deprecationBlock;

    var BASE = "storybook/js/organisms/masthead/pages/";

    /* SSOT: una entrada por estado -> su pagina viva en pages/. */
    var PAGES = [
        { id: "app", n: "App", f: "app.html" },
        { id: "ext", n: "Externo", f: "ext.html" },
        { id: "logged", n: "Logueado", f: "logged.html" },
        { id: "login", n: "Login", f: "login.html" },
        {
            id: "tajo-salor",
            n: "Tajo-Salor",
            f: "ext.html",
            hint: "el-periodico-extremadura + cronicadeltajosalor",
            bodyClasses: [
                ["extremadura", "el-periodico-extremadura", "Aplica la clase del medio padre El Periodico Extremadura."],
                ["tajoSalor", "cronicadeltajosalor", "Aplica la submarca Cronica del Tajo-Salor para probar el logo especifico del SCSS."]
            ]
        }
    ];

    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };

    /* Control minimal-header - uno NUEVO por story (args propio, no compartido: el motor
       muta a[key] por story; compartirlo filtraria el estado entre estados). */
    function pageArgTypes(page) {
        var out = [{
            key: "minimal", control: "boolean", bodyClass: "minimal-header",
            desc: "Aplica .minimal-header en el <body> de la pagina (modificador de seccion: pasatiempos, cerca, economia, libros...). Reduce la cabecera (~160px -> 80px), oculta la fecha y achica logos. Es CSS puro: la clase vive en un ancestro de .ft-org-masthead, no en el propio componente."
        }];
        (page.bodyClasses || []).forEach(function (item) {
            out.push({
                key: item[0],
                control: "boolean",
                bodyClass: item[1],
                desc: item[2]
            });
        });
        return out;
    }

    function pageArgs(page) {
        var out = { minimal: false };
        (page.bodyClasses || []).forEach(function (item) {
            out[item[0]] = true;
        });
        return out;
    }

    var stories = PAGES.map(function (p) {
        return {
            id: p.id,
            name: p.n,
            hint: p.hint || "",
            kind: "page",
            src: BASE + p.f,
            brandable: true,
            argTypes: pageArgTypes(p),
            args: pageArgs(p)
        };
    });

    var framework = window.SB.helpers.frameworkBlock({
        intro: 'Si llevas el masthead a Vue o React, tratalo como shell de pagina o layout, no como componente hoja. Sus scripts tocan scroll, sidenav, formularios, popovers y clases globales de <code>body</code>, asi que conviene gobernarlo desde el marco de pagina.',
        rows: [
            ["Nivel de montaje", "Inicializa el conjunto de scripts desde el layout en <code>onMounted()</code>, no dentro de subcomponentes anidados ni slots de menu.", "Inicializa el conjunto de scripts desde el layout en <code>useEffect()</code>, no dentro de subcomponentes anidados ni slots de menu."],
            ["Estado global", "Centraliza en el framework la clase de marca, la cabecera activa, el estado de sesion y los toggles de usuario para evitar que varios hijos muten <code>body</code>.", "Centraliza en el framework la clase de marca, la cabecera activa, el estado de sesion y los toggles de usuario para evitar que varios hijos muten <code>body</code>."],
            ["Hidratacion", "En SSR, monta primero el HTML base y engancha JS del masthead solo en cliente para no desalinear sticky, sidenav o dropdowns.", "En SSR, monta primero el HTML base y engancha JS del masthead solo en cliente para no desalinear sticky, sidenav o dropdowns."],
            ["Cleanup", "Al navegar, desmonta observers, listeners de scroll, sidenav y popovers antes de recrear el header.", "Al navegar, desmonta observers, listeners de scroll, sidenav y popovers antes de recrear el header."]
        ],
        note: "Si solo necesitas el markup y el branding, renderiza el organismo declarativamente y reimplementa en framework solo los comportamientos que realmente uses."
    });

    var dependenciesTable = docsTable({
        columns: ["Dependencia", "Tipo", "Que gobierna", "Cuando"],
        rows: [
            [
                { html: "<code>brands/[marca]/setting.css</code>", header: true },
                "CSS · variables de marca",
                "Colores, logos, familias tipograficas y tokens globales.",
                "Siempre · <strong>primero</strong>"
            ],
            [
                { html: "<code>ux-index.css</code> (o core equivalente)", header: true },
                "CSS del organismo",
                "Layout del header principal, sticky, sidenav, cajas, listas y responsive.",
                "Siempre"
            ],
            [
                { html: "<code>js/headers/masthead.js</code>", header: true },
                "JavaScript base",
                "Apertura/cierre del menu lateral y aparicion de la cabecera fija al scroll.",
                "En paginas vivas"
            ],
            [
                { html: "<code>js/sidenav/fourty-js-sidenav-default.js</code>", header: true },
                "JavaScript · navegacion",
                "Interacciones del panel lateral y sus niveles de acordeon.",
                "Cuando existe <code>--side</code>"
            ],
            [
                { html: "<code>js/modal/fourty-js-popover.js</code>", header: true },
                "JavaScript · overlays",
                "Dropdowns y popovers de idioma, login o acciones asociadas.",
                "Cuando hay disparadores desplegables"
            ],
            [
                { html: "<code>js/form/fourty-js-form-combo-search.js</code>", header: true },
                "JavaScript · formulario",
                "Buscador embebido y campos tipo combo asociados a header o sidenav.",
                "Cuando el caso incorpora buscador real"
            ],
            [
                { html: "<code>js/switch/fourty-js-switch-2024.js</code><br><code>js/switch/fourty-js-switch-darkmode.js</code>", header: true },
                "JavaScript · toggles",
                "Switches auxiliares, incluido dark mode en la variante app.",
                "Solo en estados que lo montan"
            ]
        ]
    });

    var surfacesTable = docsTable({
        variant: "matrix",
        columns: ["Superficie", "Rol", "Riesgo operativo"],
        rows: [
            ["<code>.ft-org-masthead--branded</code>", "Cabecera principal: top, logo, nav desktop/mobile, subnav, area de usuario y branding del medio.", "Cualquier cambio de marca o cabecera impacta logo, colores, ancho de piezas y visibilidad de items."],
            ["<code>.ft-org-masthead--fix</code>", "Cabecera sticky que aparece al hacer scroll y simplifica la jerarquia visible.", "Depende del scroll real y de IDs/anchors estables; es una de las zonas mas sensibles a regresiones."],
            ["<code>.ft-org-masthead--side</code>", "Panel lateral con cajas, secciones, acordeones multinivel, utilidades y accesos de usuario.", "Cruza navegacion, overlays, foco, bloqueo de scroll y duplicidad de listeners si se remonta mal."],
            ["<code>#progress-bar</code>", "Barra de progreso asociada a la capa fija.", "Necesita convivir bien con sticky, publicidad y otras capas afijadas."]
        ]
    });

    var runtimeTable = docsTable({
        columns: ["Area", "Lo que hace el runtime", "Que debe vigilar front/dev"],
        rows: [
            ["Menu lateral", "Abre y cierra la capa <code>--side</code>, muta clases de estado y mantiene la coherencia entre botones duplicados.", "No duplicar IDs, no reusar el mismo handler en varias monturas sin cleanup."],
            ["Sticky", "Hace aparecer la capa <code>--fix</code> al scroll y coordina la barra de progreso.", "Validar offsets, anchors y convivencia con publicidad sticky o hero superior."],
            ["Dropdowns y popovers", "Gobierna idioma, login y otras acciones con <code>aria-expanded</code>, <code>aria-controls</code> y visibilidad real.", "Comprobar que cada disparador apunta a su lista correcta y que el foco vuelve al trigger."],
            ["Acordeon del sidenav", "Abre niveles 1/2/3 con <code>hidden</code> y ARIA sincronizados.", "Evitar estados colgados tras navegacion parcial o rerender de framework."],
            ["Estado de sesion", "Cambia entre externo, login y logueado sin que la cabecera pierda branding.", "Separar claramente el estado editorial del estado de usuario."],
            ["Minimal header", "Reduce altura, fecha y logos mediante clase ancestro <code>.minimal-header</code>.", "Aplicarlo desde contexto de pagina, nunca como modificador directo del bloque."]
        ]
    });

    var integrationTable = docsTable({
        variant: "dense",
        rows: [
            [{ html: "<strong>Branding</strong>", header: true }, { html: 'El dropdown <strong>Cabecera</strong> es la fuente de verdad visual. <strong>Brand</strong> solo ayuda a conmutar CSS base; no sustituye la personalizacion exacta del medio.' }],
            [{ html: "<strong>Nivel de propiedad</strong>", header: true }, { html: "Tratar el masthead como infraestructura de layout. No repartir <code>logo</code>, <code>fix</code> y <code>side</code> entre componentes con ciclos de vida independientes." }],
            [{ html: "<strong>SSR / hidratacion</strong>", header: true }, { html: "En Vue/React, renderizar primero el HTML estable y enganchar los scripts en cliente. Si el DOM cambia antes de tiempo, sticky y sidenav son los primeros en desalinearse." }],
            [{ html: "<strong>Dependencias cruzadas</strong>", header: true }, { html: "Esta pieza toca scroll, overlays, formularios, switches y clases de <code>body</code>. Hay que documentar esos contratos cuando se extrae fuera del showroom." }],
            [{ html: "<strong>Estados editoriales</strong>", header: true }, { html: "Separar estado de usuario (<em>externo/login/logueado</em>) de personalizaciones editoriales (<em>Cabecera</em>, regionales, app, minimal-header)." }]
        ]
    });

    var accessibilityTable = docsTable({
        variant: "dense",
        rows: [
            [{ html: "<strong>Foco</strong>", header: true }, { html: "Al abrir sidenav o dropdown, el foco debe entrar en la capa activa y volver al disparador al cerrar." }],
            [{ html: "<strong>ARIA dinamico</strong>", header: true }, { html: "Revisar <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-hidden</code> y <code>hidden</code> en login, idioma y acordeones multinivel." }],
            [{ html: "<strong>Jerarquia</strong>", header: true }, { html: "La variante principal y la sticky no siempre comparten el mismo heading level; conservar la semantica del estado real." }],
            [{ html: "<strong>Navegacion por teclado</strong>", header: true }, { html: "Tab, Escape y Enter deben cubrir menu lateral, dropdowns, popovers y buscador sin dejar trampas de foco." }]
        ]
    });

    var statesTable = docsTable({
        variant: "timeline",
        columns: ["Estado", "Pagina (storybook)", "Lo que valida"],
        rows: PAGES.map(function (p) {
            var validates = {
                app: "Shell app con sidenav enriquecido, switches y utilidades extra.",
                ext: "Caso externo base y punto de partida editorial del organismo.",
                logged: "Sesion activa y capa de usuario completa.",
                login: "Accesos de entrada y dropdowns asociados a login.",
                "tajo-salor": "Rama regional con clases compuestas y logo especifico."
            };
            return [
                { html: esc(p.n), header: true },
                '<code>' + esc(BASE + p.f) + '</code>',
                validates[p.id] || "Estado vivo del masthead."
            ];
        })
    });

    var qaTable = docsTable({
        variant: "dense",
        rows: [
            [{ html: "<strong>Cabecera + Brand</strong>", header: true }, { html: "Cambiar medio desde <strong>Cabecera</strong> y comprobar logo, color, naming y contraste en desktop y mobile." }],
            [{ html: "<strong>Scroll real</strong>", header: true }, { html: "Bajar en canvas hasta forzar <code>--fix</code> y revisar que no tape contenido ni pierda controles." }],
            [{ html: "<strong>Sidenav</strong>", header: true }, { html: "Abrir/cerrar menu lateral, recorrer niveles del acordeon y verificar bloqueo de foco/scroll." }],
            [{ html: "<strong>Sesion</strong>", header: true }, { html: "Recorrer externo, login y logueado para confirmar textos, triggers y acciones de usuario." }],
            [{ html: "<strong>Minimal header</strong>", header: true }, { html: "Activar <code>minimal</code> y revisar altura, fecha, logos y casos de pasatiempos/cerca/economia." }],
            [{ html: "<strong>Responsive</strong>", header: true }, { html: "Validar nav desktop/mobile, subnav y side menu en varios viewports; es facil romper uno al corregir otro." }]
        ]
    });

    var overview = '<div class="cb-docs__inner">'
        + '<h1>Masthead</h1>'
        + '<p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-masthead</code>, root <code>--branded</code>): la cabecera de marca, con logo del medio, fecha, RRSS, accesos de usuario, sticky, menu lateral y estados de sesion. Es el organismo MAS sensible a la <strong>Cabecera (CSV)</strong>: logo, colores, naming y parte de sus casuisticas editoriales dependen de las clases que aplica ese dropdown.</p>'

        + '<div class="cb-callout"><strong>Stories vivas (kind:"page").</strong> Cada estado carga una pagina completa <strong>propia del storybook</strong> (<code>pages/&lt;estado&gt;.html</code>) con su CSS y sus JS reales. Por eso el masthead es <strong>operativo</strong>: pulsa el icono de menu para abrir/cerrar el panel lateral, y <strong>haz scroll</strong> en el canvas para ver aparecer la cabecera fija (<code>--fix</code>). Cada estado expone el control <strong>minimal</strong> (pestana Controls). Globales utiles: <strong>Cabecera</strong>, <strong>Brand</strong>, <strong>Viewport</strong>, <strong>Vision</strong>.</div>'

        + '<h2>Por que es una pieza critica</h2>'
        + '<p>El masthead no es solo un header visual: agrupa <strong>navegacion</strong>, <strong>branding editorial</strong>, <strong>estado de usuario</strong>, <strong>capas sticky</strong>, <strong>menu lateral multinivel</strong> y varias dependencias JS. En la practica actua como <strong>shell de pagina</strong>; por eso acumula cambios recurrentes en SCSS, HTML vivo y scripts auxiliares.</p>'

        + '<h2>Superficies activas</h2>'
        + surfacesTable

        + '<h2>Dependencias</h2>'
        + dependenciesTable

        + '<h2>Que gobierna el runtime</h2>'
        + runtimeTable

        + framework

        + '<h2>Contrato de integracion</h2>'
        + '<p>Para front y desarrollo, el punto clave es separar <strong>que pertenece al DS</strong> de <strong>que pertenece al runtime de pagina</strong>. El masthead es uno de los pocos organismos donde esa frontera tiene que quedar explicita.</p>'
        + integrationTable

        + '<div class="cb-callout"><strong>Modo de inspeccion recomendado: el dropdown "Cabecera" (CSV)</strong>, no el Brand. Al elegir un medio, el masthead se pinta con su logo, colores y nombre <strong>exactos de produccion</strong>. Las stories recorren los <em>estados</em> (app, externo, login, logueado); el branding fino lo da la Cabecera.</div>'

        + '<h2>Accesibilidad y navegacion</h2>'
        + accessibilityTable

        + deprecationBlock({
            title: "Personalizacion Escapate (Viajar) ocultada",
            since: "2026-04-15",
            summary: "La personalizacion especifica de <strong>Escapate</strong> dentro de la rama <strong>Viajar</strong> deja de formar parte del comportamiento vigente del masthead compilado.",
            scope: "Cabeceras legacy de Viajar que dependian de esa personalizacion editorial concreta.",
            replacement: "Usar el masthead vigente de <strong>Viajar</strong> sin esa rama especifica y validar el branding con el dropdown <strong>Cabecera</strong>.",
            note: "La retirada quedo registrada en el changelog sobre <code>cds-statics/css/brands/revistas/organism/masthead.css</code>."
        })
        + deprecationBlock({
            title: "Icono `Directo` ocultado en la cabecera Sport",
            since: "2025-07-06",
            summary: "La cabecera de <strong>Sport</strong> deja de exponer el icono <strong>Directo</strong> como parte del branding visible del masthead.",
            scope: "Variantes legacy de Sport que esperaban ese indicador en cabecera.",
            replacement: "Validar la cabecera Sport contra el branding actual del sistema, sin depender de ese icono como parte fija del header.",
            note: "La retirada quedo registrada en el changelog sobre <code>cds-statics/css/legacy/cabecera-sport.css</code>."
        })

        + '<h2>Estados</h2>'
        + statesTable

        + '<h2>Control: <code>minimal-header</code></h2>'
        + '<p>Toggle <code>minimal</code> en los estados disponibles. Aplica <code>.minimal-header</code> en un <strong>ancestro</strong> del masthead (<code>@include behavior-parent(minimal-header)</code> -> <code>.minimal-header .ft-org-masthead</code>). En produccion la pone el contexto de <strong>seccion</strong> (pasatiempos, cerca, economia...). Reduce la cabecera y oculta/achica piezas. Es <strong>CSS puro</strong> (sin JS); el motor lo conmuta en el <code>&lt;body&gt;</code> de la pagina viva.</p>'

        + '<h2>Regional · Tajo-Salor</h2>'
        + '<p>La story <strong>Tajo-Salor</strong> comprueba la rama regional anadida en <code>_masthead.scss</code>: <code>.el-periodico-extremadura.cronicadeltajosalor</code>. Mantiene activas por defecto ambas clases desde Controls para validar el logo <code>logo-regionales-el-periodico-extremadura-tajosalor.svg</code> y sus tamanos responsive.</p>'

        + '<h2>Checklist rapido de QA</h2>'
        + qaTable

        + '<p class="cb-src">Fuente: <code>scss/fourties/organism/masthead/_masthead.scss</code> · markup: <code>masthead.html</code> · paginas: <code>pages/*.html</code></p>'
        + '</div>';

    var DEF = {
        id: "masthead",
        name: "Masthead",
        group: "Organisms",
        signals: ["js"],
        overview: overview,
        stories: stories
    };
    window.SB.register(DEF);
    // Subgrupo "Markup": el mismo <header> completo como markup plano (masthead.html).
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
