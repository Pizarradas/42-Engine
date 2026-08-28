/* =======================================================================
   42DS Storybook - Index: Layouts (group "Layouts")

   Base index of full layout pages by brand, plus one curated manual entry:
   "Grid". That entry replaces the old catch-all "Varios" pages
   `layout-grid-flex.html` and `layout-home.html`.
   ======================================================================= */
(function () {
    "use strict";
    var BASE = "layouts/";

    var PAGES = [
        { f: "amp-layout-desarrollo-noticia-regionales.html", n: "Desarrollo noticia regionales", fam: "AMP" },
        { f: "amp-layout-desarrollo-noticia-sport.html", n: "Desarrollo noticia sport", fam: "AMP" },
        { f: "amp-layout-desarrollo-noticia-woman.html", n: "Desarrollo noticia woman", fam: "AMP" },
        { f: "amp-layout-noticia-Directos.html", n: "Noticia Directos", fam: "AMP" },
        { f: "amp-layout-noticia-Opinion.html", n: "Noticia Opinion", fam: "AMP" },
        { f: "amp-layout-objeto-editorial-video-sport.html", n: "Objeto editorial video sport", fam: "AMP" },
        { f: "layout-ep-aviso-legal.html", n: "Aviso legal", fam: "EP" },
        {
            f: "layout-ep-cerca-fase-2--02-A-feed-resultados-edicion-chips.html",
            n: "Cerca fase 2 · 02 A feed resultados edicion chips",
            fam: "EP",
            h: "Feed con sticky stack de acciones y edicion de chips tiny sobre suggestions-chips."
        },
        { f: "layout-ep-cerca-fase-2--00-inicio.html", n: "Cerca fase 2 · 00 inicio", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-resultados-2.html", n: "Cerca fase 2 · 02 A feed resultados 2", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-resultados-POC-modal-rrss.html", n: "Cerca fase 2 · 02 A feed resultados POC modal rrss", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-resultados-publicidad-modelo-robas-por-cards.html", n: "Cerca fase 2 · 02 A feed resultados publicidad modelo robas por cards", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-resultados.html", n: "Cerca fase 2 · 02 A feed resultados", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-sin-resultados-alert.html", n: "Cerca fase 2 · 02 A feed sin resultados alert", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-A-feed-sin-resultados-loader.html", n: "Cerca fase 2 · 02 A feed sin resultados loader", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--02-B-feed-sin-resultados.html", n: "Cerca fase 2 · 02 B feed sin resultados", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--03-editar-localidades.html", n: "Cerca fase 2 · 03 editar localidades", fam: "EP" },
        { f: "layout-ep-cerca-fase-2--04-buscador-resultados.html", n: "Cerca fase 2 · 04 buscador resultados", fam: "EP" },
        { f: "layout-ep-contacto.html", n: "Contacto", fam: "EP" },
        { f: "layout-ep-galeria-add.html", n: "Galeria add", fam: "EP" },
        { f: "layout-ep-galeria-cover.html", n: "Galeria cover", fam: "EP" },
        { f: "layout-ep-galeria-slider.html", n: "Galeria slider", fam: "EP" },
        { f: "layout-ep-juegos-ayuda.html", n: "Juegos ayuda", fam: "EP" },
        { f: "layout-ep-mapa-sitio.html", n: "Mapa sitio", fam: "EP" },
        { f: "layout-ep-newsletter-home.html", n: "Newsletter home", fam: "EP" },
        { f: "layout-ep-newsletter-individual.html", n: "Newsletter individual", fam: "EP" },
        { f: "layout-ep-newsletter-landing.html", n: "Newsletter landing", fam: "EP" },
        { f: "layout-ep-noticia--postCSS.html", n: "Noticia · postCSS", fam: "EP" },
        { f: "layout-ep-noticia-activos.html", n: "Noticia activos", fam: "EP" },
        { f: "layout-ep-noticia-branded.html", n: "Noticia branded", fam: "EP" },
        { f: "layout-ep-noticia-economia.html", n: "Noticia economia", fam: "EP" },
        { f: "layout-ep-noticia-gastronomia.html", n: "Noticia gastronomia", fam: "EP" },
        { f: "layout-ep-noticia-motor-path.html", n: "Noticia motor path", fam: "EP" },
        { f: "layout-ep-noticia-motor.html", n: "Noticia motor", fam: "EP" },
        { f: "layout-ep-noticia-ocioycultura.html", n: "Noticia ocioycultura", fam: "EP" },
        { f: "layout-ep-noticia-PAYWALL.html", n: "Noticia PAYWALL", fam: "EP" },
        { f: "layout-ep-noticia-premium-paywall.html", n: "Noticia premium paywall", fam: "EP" },
        { f: "layout-ep-noticia-premium.html", n: "Noticia premium", fam: "EP" },
        { f: "layout-ep-noticia.html", n: "Noticia", fam: "EP" },
        { f: "layout-ep-objeto-editorial-video.html", n: "Objeto editorial video", fam: "EP" },
        { f: "layout-ep-opinion-free.html", n: "Opinion free", fam: "EP" },
        { f: "layout-ep-opinion-premium.html", n: "Opinion premium", fam: "EP" },
        { f: "layout-ep-opinion.html", n: "Opinion", fam: "EP" },
        { f: "layout-ep-podcast_en-fuera-de-juego.html", n: "Podcast en fuera de juego", fam: "EP" },
        { f: "layout-ep-podcast_mamarazzis.html", n: "Podcast mamarazzis", fam: "EP" },
        { f: "layout-ep-podcast_mi-planeta-me-necesita.html", n: "Podcast mi planeta me necesita", fam: "EP" },
        { f: "layout-ep-podcast_nanosegundo-metaverso.html", n: "Podcast nanosegundo metaverso", fam: "EP" },
        { f: "layout-ep-podcast_podcast-el-periodico.html", n: "Podcast podcast el periodico", fam: "EP" },
        { f: "layout-ep-podcast_tren-historia.html", n: "Podcast tren historia", fam: "EP" },
        { f: "layout-ep-politica-privacidad.html", n: "Politica privacidad", fam: "EP" },
        { f: "layout-ep-politica-seguridad.html", n: "Politica seguridad", fam: "EP" },
        { f: "layout-ep-portada-automatica.html", n: "Portada automatica", fam: "EP" },
        { f: "layout-ep-puntos-de-venta.html", n: "Puntos de venta", fam: "EP" },
        { f: "layout-ep-quienes-somos.html", n: "Quienes somos", fam: "EP" },
        { f: "layout-ep-reportaje.html", n: "Reportaje", fam: "EP" },
        { f: "layout-ep-rss-list.html", n: "Rss list", fam: "EP" },
        { f: "layout-ep-video-premium.html", n: "Video premium", fam: "EP" },
        { f: "layout-epc-cronicas-listado-Fix.html", n: "Cronicas listado Fix", fam: "EPE" },
        { f: "layout-epe-aviso-legal.html", n: "Aviso legal", fam: "EPE" },
        { f: "layout-epe-cerca-btn-CAT.html", n: "Cerca btn CAT", fam: "EPE" },
        { f: "layout-epe-cerca-btn.html", n: "Cerca btn", fam: "EPE" },
        { f: "layout-epe-cerca-server.html", n: "Cerca server", fam: "EPE" },
        { f: "layout-epe-cerca.html", n: "Cerca", fam: "EPE" },
        { f: "layout-epe-cronicas-listado-cat.html", n: "Cronicas listado cat", fam: "EPE" },
        { f: "layout-epe-cronicas-listado-Fix.html", n: "Cronicas listado Fix", fam: "EPE" },
        { f: "layout-epe-cronicas-listado-unifiy.html", n: "Cronicas listado unifiy", fam: "EPE" },
        { f: "layout-epe-cronicas-listado.html", n: "Cronicas listado", fam: "EPE" },
        { f: "layout-epe-cronicas-mapa.html", n: "Cronicas mapa", fam: "EPE" },
        { f: "layout-epe-epc-cronicas-listado-Fix.html", n: "Epc cronicas listado Fix", fam: "EPE" },
        { f: "layout-epe-galeria-add.html", n: "Galeria add", fam: "EPE" },
        { f: "layout-epe-galeria-cover.html", n: "Galeria cover", fam: "EPE" },
        { f: "layout-epe-galeria-slider.html", n: "Galeria slider", fam: "EPE" },
        { f: "layout-epe-juegos-olimpicos-homepage.html", n: "Juegos olimpicos homepage", fam: "EPE" },
        { f: "layout-epe-juegos-olimpicos-landingpage.html", n: "Juegos olimpicos landingpage", fam: "EPE" },
        { f: "layout-epe-newsletter-home.html", n: "Newsletter home", fam: "EPE" },
        { f: "layout-epe-newsletter-individual.html", n: "Newsletter individual", fam: "EPE" },
        { f: "layout-epe-newsletter-legal-conditions.html", n: "Newsletter legal conditions", fam: "EPE" },
        { f: "layout-epe-noticia-doble-skin-masthead.html", n: "Noticia doble skin masthead", fam: "EPE" },
        { f: "layout-epe-noticia-economia.html", n: "Noticia economia", fam: "EPE" },
        { f: "layout-epe-noticia-masthead-cambio-layout.html", n: "Noticia masthead cambio layout", fam: "EPE" },
        { f: "layout-epe-noticia-masthead.html", n: "Noticia masthead", fam: "EPE" },
        { f: "layout-epe-noticia-premium-masthead-cambio-layout.html", n: "Noticia premium masthead cambio layout", fam: "EPE" },
        { f: "layout-epe-noticia.html", n: "Noticia", fam: "EPE" },
        { f: "layout-epe-opinion.html", n: "Opinion", fam: "EPE" },
        { f: "layout-epe-podcast_deportes-batalla-florencia.html", n: "Podcast deportes batalla florencia", fam: "EPE" },
        { f: "layout-epe-podcast_musica-la-guarida.html", n: "Podcast musica la guarida", fam: "EPE" },
        { f: "layout-epe-politica-privacidad.html", n: "Politica privacidad", fam: "EPE" },
        { f: "layout-epe-portada-automatica.html", n: "Portada automatica", fam: "EPE" },
        { f: "layout-epe-portada-doble-skin-masthead.html", n: "Portada doble skin masthead", fam: "EPE" },
        { f: "layout-epe-portada-doble-skin.html", n: "Portada doble skin", fam: "EPE" },
        { f: "layout-epe-portada-manual.html", n: "Portada manual", fam: "EPE" },
        { f: "layout-epe-quienes-somos-csv.html", n: "Quienes somos csv", fam: "EPE" },
        { f: "layout-epe-quienes-somos.html", n: "Quienes somos", fam: "EPE" },
        { f: "layout-epe-rss-list.html", n: "Rss list", fam: "EPE" },
        { f: "layout-grid-flex.html", n: "Grid flex", fam: "Varios" },
        { f: "layout-home.html", n: "Home", fam: "Varios" },
        { f: "layout-pasatiempos-cuatroencampo-finalizado.html", n: "Cuatroencampo finalizado", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-1.1-inicio.html", n: "Porra 1.1 inicio", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-1.2-inicio-seleccion.html", n: "Porra 1.2 inicio seleccion", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-2-prediccion-registrada.html", n: "Porra 2 prediccion registrada", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-3-partido-en-directo.html", n: "Porra 3 partido en directo", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-4-partido-finalizado.html", n: "Porra 4 partido finalizado", fam: "Pasatiempos" },
        { f: "layout-pasatiempos-porra-intermedia.html", n: "Porra intermedia", fam: "Pasatiempos" },
        { f: "layout-regionales-noticia-doble-skin.html", n: "Noticia doble skin", fam: "Regionales" },
        { f: "layout-regionales-noticia-fiestas-del-pilar.html", n: "Noticia fiestas del pilar", fam: "Regionales" },
        { f: "layout-regionales-noticia-mallorca-delicia.html", n: "Noticia mallorca delicia", fam: "Regionales" },
        { f: "layout-regionales-noticia-masthead-and-path-has-promo-corta.html", n: "Noticia masthead and path has promo corta", fam: "Regionales" },
        { f: "layout-regionales-noticia-masthead-and-path-has-promo-larga.html", n: "Noticia masthead and path has promo larga", fam: "Regionales" },
        { f: "layout-regionales-noticia-masthead-and-path.html", n: "Noticia masthead and path", fam: "Regionales" },
        { f: "layout-regionales-noticia-premium-paywall.html", n: "Noticia premium paywall", fam: "Regionales" },
        { f: "layout-regionales-noticia-premium.html", n: "Noticia premium", fam: "Regionales" },
        { f: "layout-regionales-noticia.html", n: "Noticia", fam: "Regionales" },
        { f: "layout-regionales-opinion-malaga-paywall.html", n: "Opinion malaga paywall", fam: "Regionales" },
        { f: "layout-regionales-opinion-malaga-premium.html", n: "Opinion malaga premium", fam: "Regionales" },
        { f: "layout-regionales-opinion-malaga.html", n: "Opinion malaga", fam: "Regionales" },
        { f: "layout-regionales-portada-automatica.html", n: "Portada automatica", fam: "Regionales" },
        { f: "layout-regionales-portada-doble-skin.html", n: "Portada doble skin", fam: "Regionales" },
        { f: "layout-regionales-portada-lo-mas-visto.html", n: "Portada lo mas visto", fam: "Regionales" },
        { f: "layout-regionales-portada-manual-completa.html", n: "Portada manual completa", fam: "Regionales" },
        { f: "layout-regionales-portada-manual-video.html", n: "Portada manual video", fam: "Regionales" },
        { f: "layout-regionales-portada-manual.html", n: "Portada manual", fam: "Regionales" },
        { f: "layout-regionales-portada-seccion.html", n: "Portada seccion", fam: "Regionales" },
        { f: "layout-regionales-portada-subseccion.html", n: "Portada subseccion", fam: "Regionales" },
        { f: "layout-regionales-portada-testAB.html", n: "Portada testAB", fam: "Regionales" },
        { f: "layout-regionales-reportaje-multimedia-kurios.html", n: "Reportaje multimedia kurios", fam: "Regionales" },
        { f: "layout-regionales-video-premium.html", n: "Video premium", fam: "Regionales" },
        { f: "layout-revistas-stilo-cardHome.html", n: "Stilo cardHome", fam: "Revistas" },
        { f: "layout-revistas-stilo-galeria-vertical.html", n: "Stilo galeria vertical", fam: "Revistas" },
        { f: "layout-revistas-stilo-noticia.html", n: "Stilo noticia", fam: "Revistas" },
        { f: "layout-revistas-viajar-cardHome.html", n: "Viajar cardHome", fam: "Revistas" },
        { f: "layout-revistas-viajar-noticia-100.html", n: "Viajar noticia 100", fam: "Revistas" },
        { f: "layout-revistas-viajar-noticia.html", n: "Viajar noticia", fam: "Revistas" },
        { f: "layout-revistas-viajar-objeto-editorial-video.html", n: "Viajar objeto editorial video", fam: "Revistas" },
        { f: "layout-revistas-woman-cardHome.html", n: "Woman cardHome", fam: "Revistas" },
        { f: "layout-revistas-woman-galeria-vertical.html", n: "Woman galeria vertical", fam: "Revistas" },
        { f: "layout-revistas-woman-noticia-apertura100.html", n: "Woman noticia apertura100", fam: "Revistas" },
        { f: "layout-revistas-woman-noticia.html", n: "Woman noticia", fam: "Revistas" },
        { f: "layout-revistas-woman-objeto-editorial-video.html", n: "Woman objeto editorial video", fam: "Revistas" },
        { f: "layout-revistas-woman-portada-lo-mas-visto.html", n: "Woman portada lo mas visto", fam: "Revistas" },
        { f: "layout-revistas-woman-seccion.html", n: "Woman seccion", fam: "Revistas" },
        { f: "layout-sport-cabecera.html", n: "Cabecera", fam: "Sport" },
        { f: "layout-sport-directos.html", n: "Directos", fam: "Sport" },
        { f: "layout-sport-newsletter.html", n: "Newsletter", fam: "Sport" },
        { f: "layout-sport-noticia-45aniversario.html", n: "Noticia 45aniversario", fam: "Sport" },
        { f: "layout-sport-noticia-cambio-layout.html", n: "Noticia cambio layout", fam: "Sport" },
        { f: "layout-sport-noticia-megabanner-superior.html", n: "Noticia megabanner superior", fam: "Sport" },
        { f: "layout-sport-noticia-user-test.html", n: "Noticia user test", fam: "Sport" },
        { f: "layout-sport-noticia.html", n: "Noticia", fam: "Sport" },
        { f: "layout-sport-noticia2-Directos.html", n: "Noticia2 Directos", fam: "Sport" },
        { f: "layout-sport-opinion.html", n: "Opinion", fam: "Sport" },
        { f: "layout-sport-portada-automatica.html", n: "Portada automatica", fam: "Sport" },
        { f: "layout-sport-portada-doble-skin.html", n: "Portada doble skin", fam: "Sport" }
    ];

    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x"; };
    var range = function (from, to) {
        var out = [];
        var i;
        for (i = from; i <= to; i++) out.push(i);
        return out;
    };
    var SPANS = range(1, 12);
    var OFFSETS = range(0, 11);
    var GRID_BREAKPOINTS = [
        { key: "Xs", label: "Xs", min: "0px", range: "0-767px", note: "Base mobile. Declaralo siempre." },
        { key: "Sm", label: "Sm", min: "768px", range: "768-1001px", note: "Primer salto horizontal." },
        { key: "Md", label: "Md", min: "1002px", range: "1002-1279px", note: "Tablet / small desktop." },
        { key: "Lg", label: "Lg", min: "1280px", range: "1280px+", note: "Desktop editorial." }
    ];
    var PREVIEW_OPTIONS = [["xs", "XS"], ["sm", "SM"], ["md", "MD"], ["lg", "LG"]];
    var PREVIEW_META = {
        xs: { key: "Xs", label: "XS", width: "375px", range: "0-767px" },
        sm: { key: "Sm", label: "SM", width: "820px", range: "768-1001px" },
        md: { key: "Md", label: "MD", width: "1100px", range: "1002-1279px" },
        lg: { key: "Lg", label: "LG", width: "1360px", range: "1280px+" }
    };
    var SPAN_OPTIONS = SPANS.map(function (n) { return [String(n), n + "/12"]; });
    var OFFSET_OPTIONS = [["none", "sin offset"]].concat(OFFSETS.map(function (n) { return [String(n), String(n)]; }));
    var INNER_OPTIONS = [["none", "sin inner"], ["sm", "inner-sm"], ["md", "inner-md"], ["lg", "inner-lg"]];
    var ROW_MODE_OPTIONS = [["default", "row"], ["pless", "rowIs-p-less"]];
    var ROW_VARIANT_OPTIONS = [["default", "row"], ["pless", "p-less"]];
    var EDITORIAL_ROW_OPTIONS = [["fullwidth", "fullwidth"], ["ads", "ads"]];
    var ROW_JUSTIFY_OPTIONS = [["none", "sin justify"], ["start", "start"], ["center", "center"], ["end", "end"], ["around", "around"], ["between", "between"]];
    var ROW_ALIGN_OPTIONS = [["none", "sin align"], ["top", "top"], ["middle", "middle"], ["bottom", "bottom"]];
    var NESTED_PACK_OPTIONS = [["none", "sin justify"], ["center", "center"], ["end", "end"]];
    var ORDER_OPTIONS = [["none", "sin reorder"], ["xs", "xs"], ["sm", "sm"], ["md", "md"], ["lg", "lg"]];
    var GUTTER_OPTIONS = [["none", "normal"], ["r-0", "r-0"], ["l-0", "l-0"], ["x-0", "x-0"]];
    var PAIR_PATTERNS = {
        stack: [12, 12],
        half: [6, 6],
        wideLeft: [8, 4],
        wideRight: [4, 8],
        featureLeft: [9, 3],
        featureRight: [3, 9]
    };
    var TRIPLE_PATTERNS = {
        stack: [12, 12, 12],
        thirds: [4, 4, 4],
        lead: [6, 3, 3],
        center: [3, 6, 3],
        tail: [3, 3, 6]
    };
    var QUAD_PATTERNS = {
        stack: [12, 12, 12, 12],
        quarters: [3, 3, 3, 3],
        lead: [6, 2, 2, 2],
        tail: [2, 2, 2, 6],
        middle: [2, 4, 4, 2]
    };
    var SHELL_PATTERNS = { "8-4": [8, 4], "9-3": [9, 3], "6-6": [6, 6] };
    var NESTED_PATTERNS = {
        2: { stack: [12, 12], balanced: [6, 6], feature: [8, 4] },
        3: { stack: [12, 12, 12], balanced: [4, 4, 4], feature: [6, 3, 3] },
        4: { stack: [12, 12, 12, 12], balanced: [3, 3, 3, 3], feature: [6, 2, 2, 2] }
    };
    var ROW_SAMPLE_PATTERNS = {
        half: [6, 6],
        wideLeft: [8, 4],
        wideRight: [4, 8],
        thirds: [4, 4, 4],
        quarters: [3, 3, 3, 3]
    };
    var ROW_SAMPLE_OPTIONS = [["half", "6/6"], ["wideLeft", "8/4"], ["wideRight", "4/8"], ["thirds", "4/4/4"], ["quarters", "3/3/3/3"]];

    function colClass(bp, n) { return "ft-layout-grid-flex__col" + bp + "-" + n; }
    function offsetClass(bp, n) { return "ft-layout-grid-flex__col" + bp + "Offset-" + n; }
    function lowerBp(bp) { return String(bp || "").toLowerCase(); }
    function previewInfo(preview) { return PREVIEW_META[preview] || PREVIEW_META.md; }
    function previewBpKey(preview) { return previewInfo(preview).key; }
    function rowClass(mode, nested, gutter0) {
        if (nested) return "ft-layout-grid-flex__nested" + (gutter0 ? " ft-layout-grid-flex__nestedGutter-0" : "");
        return "ft-layout-grid-flex__row" + (mode === "pless" ? " ft-layout-grid-flex__rowIs-p-less" : "");
    }
    function codeLines(lines) { return lines.join("\n"); }
    function patternOptions(map) {
        return Object.keys(map).map(function (key) { return [key, map[key].join("/")]; });
    }
    function patternFor(map, key) { return map[key] || map[Object.keys(map)[0]]; }
    function buildPatternClassSets(patternMap, keysByBp) {
        var itemCount = patternMap[Object.keys(patternMap)[0]].length;
        var perItem = [];
        var i;
        for (i = 0; i < itemCount; i++) perItem.push([]);
        GRID_BREAKPOINTS.forEach(function (bp) {
            var spans = patternFor(patternMap, keysByBp[bp.key]);
            spans.forEach(function (span, idx) { perItem[idx].push(colClass(bp.key, span)); });
        });
        return perItem;
    }
    function buildPreviewColumnClasses(span, preview) {
        var bpKey = previewBpKey(preview);
        if (bpKey === "Xs") return [colClass("Xs", span)];
        return [colClass("Xs", 12), colClass(bpKey, span)];
    }
    function buildPreviewPatternClassSets(spans, preview) {
        return spans.map(function (span) { return buildPreviewColumnClasses(span, preview); });
    }
    function currentColState(a, preview) {
        var bpKey = previewBpKey(preview);
        return {
            bp: bpKey,
            span: a["span" + bpKey],
            offset: a["offset" + bpKey],
            info: previewInfo(preview)
        };
    }
    function pill(text, active) {
        return '<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;border:1px solid '
            + (active ? '#0f62fe;background:#edf5ff;color:#0f62fe' : '#d0d0d0;background:#fff;color:#555')
            + ';font:600 11px/1.2 sans-serif;">' + esc(text) + '</span>';
    }
    function renderMetaStrip(items) {
        return '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + items.map(function (item) {
            return pill(item.text, !!item.active);
        }).join("") + '</div>';
    }
    function renderColMatrix(a, preview) {
        var active = previewBpKey(preview);
        return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;">'
            + GRID_BREAKPOINTS.map(function (bp) {
                var isActive = bp.key === active;
                var span = a["span" + bp.key];
                var offset = a["offset" + bp.key];
                return '<div style="border:1px solid ' + (isActive ? '#0f62fe' : '#d0d0d0') + ';background:' + (isActive ? '#edf5ff' : '#fff')
                    + ';border-radius:4px;padding:10px 12px;display:flex;flex-direction:column;gap:4px;">'
                    + '<strong style="font:700 12px/1.2 sans-serif;color:' + (isActive ? '#0f62fe' : '#161616') + ';">' + esc(bp.label) + '</strong>'
                    + '<span style="font:500 11px/1.2 sans-serif;color:#555;">' + esc(bp.range) + '</span>'
                    + '<span style="font:600 12px/1.2 monospace;color:#161616;">span ' + esc(span) + '/12</span>'
                    + '<span style="font:600 12px/1.2 monospace;color:#161616;">offset ' + esc(offset === "none" ? '0' : offset) + '</span>'
                    + '</div>';
            }).join("") + '</div>';
    }
    function surface(label, tone) {
        var bg = tone || "#0f62fe";
        return '<div style="background:' + bg + ';color:#fff;border-radius:3px;padding:10px 12px;font:600 12px/1.3 sans-serif;min-height:52px;display:flex;align-items:center;justify-content:center;text-align:center;width:100%;">' + esc(label) + '</div>';
    }
    function gridWrap(inner, preview) {
        var info = previewInfo(preview);
        return '<div style="width:100%;max-width:' + info.width + ';margin:0 auto;"><div style="background:repeating-linear-gradient(90deg,rgba(0,0,0,.04) 0 8.3333%,transparent 8.3333% 16.6666%);border:1px dashed #999;border-radius:4px;padding:16px;">' + inner + '</div></div>';
    }
    function renderCols(classSets, labels) {
        var tones = ["#0f62fe", "#1664b0", "#3d70b2", "#5c7cfa"];
        return classSets.map(function (classes, idx) {
            return '<div class="' + esc(classes.join(" ")) + '">' + surface(labels[idx], tones[idx % tones.length]) + '</div>';
        }).join("");
    }
    function renderGridRowMarkup(classSets, labels, rowClasses) {
        return '<div class="ft-layout-grid-flex"><div class="' + esc(rowClasses.join(" ")) + '">' + renderCols(classSets, labels) + '</div></div>';
    }
    function renderGridRow(classSets, labels, rowMode, nested, gutter0) {
        return renderGridRowMarkup(classSets, labels, [rowClass(rowMode, nested, gutter0)]);
    }
    function renderClassSummary(groups) {
        var rows = groups.map(function (g) {
            return '<tr><td><code>' + esc(g.name) + '</code></td><td>' + esc(g.value) + '</td></tr>';
        }).join("");
        return '<table class="cb-table"><thead><tr><th>Pieza</th><th>Clase</th></tr></thead><tbody>' + rows + '</tbody></table>';
    }
    function bpCheatSheet() {
        var rows = GRID_BREAKPOINTS.map(function (bp) {
            return '<tr><td><code>' + bp.label + '</code></td><td><code>' + esc(bp.min) + '</code></td><td>' + esc(bp.range) + '</td><td>' + esc(bp.note) + '</td></tr>';
        }).join("");
        return '<table class="cb-table"><thead><tr><th>Sufijo</th><th>Activo desde</th><th>Rango</th><th>Uso</th></tr></thead><tbody>' + rows + '</tbody></table>';
    }
    function buildSingleColumnClasses(a) {
        var classes = [];
        GRID_BREAKPOINTS.forEach(function (bp) {
            classes.push(colClass(bp.key, a["span" + bp.key]));
            if (a["offset" + bp.key] !== "none") classes.push(offsetClass(bp.key, a["offset" + bp.key]));
        });
        if (a.inner !== "none") classes.push("ft-helper-spacer-inner-" + a.inner);
        return classes;
    }

    var gridBaseArgTypes = [
        { key: "preview", control: "radio", desc: "Breakpoint que quieres inspeccionar visualmente.", options: PREVIEW_OPTIONS },
        { key: "spanXs", control: "select", desc: "Base mobile. Se hereda hacia arriba hasta que otro breakpoint la sustituye.", options: SPAN_OPTIONS },
        { key: "offsetXs", control: "select", desc: "Offset base mobile.", options: OFFSET_OPTIONS },
        { key: "spanSm", control: "select", desc: "Override desde 768px.", options: SPAN_OPTIONS },
        { key: "offsetSm", control: "select", desc: "Offset desde 768px.", options: OFFSET_OPTIONS },
        { key: "spanMd", control: "select", desc: "Override desde 1002px.", options: SPAN_OPTIONS },
        { key: "offsetMd", control: "select", desc: "Offset desde 1002px.", options: OFFSET_OPTIONS },
        { key: "spanLg", control: "select", desc: "Override desde 1280px.", options: SPAN_OPTIONS },
        { key: "offsetLg", control: "select", desc: "Offset desde 1280px.", options: OFFSET_OPTIONS },
        { key: "inner", control: "radio", desc: "Padding interior opcional del col.", options: INNER_OPTIONS }
    ];
    var gridBaseArgs = {
        preview: "md",
        spanXs: "12", offsetXs: "none",
        spanSm: "12", offsetSm: "none",
        spanMd: "8", offsetMd: "2",
        spanLg: "6", offsetLg: "3",
        inner: "md"
    };
    function renderGridBase(a) {
        var state = currentColState(a, a.preview);
        var classes = buildSingleColumnClasses(a);
        return '<div style="display:flex;flex-direction:column;gap:12px;">'
            + renderMetaStrip([
                { text: "Preview " + state.info.label + " (" + state.info.width + ")", active: true },
                { text: "Activo: span " + state.span + "/12", active: true },
                { text: "Activo: offset " + (state.offset === "none" ? "0" : state.offset), active: state.offset !== "none" },
                { text: a.inner === "none" ? "sin inner" : "inner-" + a.inner, active: a.inner !== "none" }
            ])
            + renderColMatrix(a, a.preview)
            + gridWrap(renderGridRow([classes], ["Columna"], "default", false, false), a.preview)
            + '</div>';
    }
    function codeGridBase(a) {
        var classes = buildSingleColumnClasses(a).join(" ");
        return codeLines([
            '<div class="ft-layout-grid-flex">',
            '  <div class="ft-layout-grid-flex__row">',
            '    <div class="' + classes + '">',
            '      Contenido',
            '    </div>',
            '  </div>',
            '</div>'
        ]);
    }
    var ROW_JUSTIFY_STEMS = { start: "Start", center: "Center", end: "End", around: "Around", between: "Between" };
    var ROW_ALIGN_STEMS = { top: "Top", middle: "Middle", bottom: "Bottom" };
    function rowBreakpointClass(value, stems) {
        if (!value || value === "none") return "";
        return stems[value] || "";
    }
    function buildRowBehaviorClasses(a) {
        var bp = lowerBp(previewBpKey(a.preview));
        var classes = ["ft-layout-grid-flex__row"];
        if (a.maxgrid) classes.push("ft-layout-grid-flex__rowMaxgrid");
        if (a.rowMode === "pless") classes.push("ft-layout-grid-flex__rowIs-p-less");
        if (a.rowMode === "fullwidth") classes.push("ft-layout-grid-flex__rowIs-fullwidth");
        if (a.rowMode === "ads") {
            classes.push("ft-layout-grid-flex__rowAds");
            if (a.adsGutter0) classes.push("ft-layout-grid-flex__rowAdsGutter-0");
        }
        if (a.justify !== "none") classes.push("ft-layout-grid-flex__row" + rowBreakpointClass(a.justify, ROW_JUSTIFY_STEMS) + "-" + bp);
        if (a.align !== "none") classes.push("ft-layout-grid-flex__row" + rowBreakpointClass(a.align, ROW_ALIGN_STEMS) + "-" + bp);
        if (a.reverse) classes.push("ft-layout-grid-flex__rowReverse");
        return classes;
    }
    function buildEditorialRowClasses(a) {
        var classes = ["ft-layout-grid-flex__row"];
        if (a.variant === "fullwidth") classes.push("ft-layout-grid-flex__rowIs-fullwidth");
        if (a.variant === "ads") {
            classes.push("ft-layout-grid-flex__rowAds");
            if (a.adsGutter0) classes.push("ft-layout-grid-flex__rowAdsGutter-0");
        }
        return classes;
    }
    var rowBehaviorArgTypes = [
        { key: "preview", control: "radio", desc: "Breakpoint en el que aplicar y probar los modificadores del row.", options: PREVIEW_OPTIONS },
        { key: "pattern", control: "select", desc: "Distribucion base de las columnas para la demo.", options: ROW_SAMPLE_OPTIONS },
        { key: "rowMode", control: "radio", desc: "Familia estructural del row.", options: ROW_VARIANT_OPTIONS },
        { key: "maxgrid", control: "boolean", desc: "Activa .ft-layout-grid-flex__rowMaxgrid (980px)." },
        { key: "justify", control: "select", desc: "Justify-content aplicado en el breakpoint activo.", options: ROW_JUSTIFY_OPTIONS },
        { key: "align", control: "select", desc: "Align-items aplicado en el breakpoint activo.", options: ROW_ALIGN_OPTIONS },
        { key: "reverse", control: "boolean", desc: "Activa .ft-layout-grid-flex__rowReverse." }
    ];
    var rowBehaviorArgs = { preview: "lg", pattern: "wideLeft", rowMode: "default", maxgrid: false, justify: "none", align: "none", reverse: false };
    function renderRowBehavior(a) {
        var spans = ROW_SAMPLE_PATTERNS[a.pattern] || ROW_SAMPLE_PATTERNS.wideLeft;
        var labels = spans.map(function (_, idx) { return "Item " + (idx + 1); });
        var rowClasses = buildRowBehaviorClasses(a);
        return '<div style="display:flex;flex-direction:column;gap:12px;">'
            + renderMetaStrip([
                { text: "Preview " + previewInfo(a.preview).label, active: true },
                { text: "rowMode " + a.rowMode, active: a.rowMode !== "default" },
                { text: a.justify === "none" ? "sin justify" : a.justify + "@" + lowerBp(previewBpKey(a.preview)), active: a.justify !== "none" },
                { text: a.align === "none" ? "sin align" : a.align + "@" + lowerBp(previewBpKey(a.preview)), active: a.align !== "none" },
                { text: a.reverse ? "reverse" : "flow normal", active: a.reverse },
                { text: a.maxgrid ? "maxgrid 980" : "maxgrid off", active: a.maxgrid }
            ])
            + gridWrap(renderGridRowMarkup(buildPreviewPatternClassSets(spans, a.preview), labels, rowClasses), a.preview)
            + '</div>';
    }
    function codeRowBehavior(a) {
        var spans = ROW_SAMPLE_PATTERNS[a.pattern] || ROW_SAMPLE_PATTERNS.wideLeft;
        var classSets = buildPreviewPatternClassSets(spans, a.preview);
        var rowClasses = buildRowBehaviorClasses(a);
        var lines = ['<div class="ft-layout-grid-flex">', '  <div class="' + rowClasses.join(" ") + '">'];
        classSets.forEach(function (classes, idx) {
            lines.push('    <div class="' + classes.join(" ") + '">');
            lines.push('      Item ' + (idx + 1));
            lines.push('    </div>');
        });
        lines.push('  </div>');
        lines.push('</div>');
        return codeLines(lines);
    }
    var editorialArgTypes = [
        { key: "preview", control: "radio", desc: "Breakpoint de inspeccion para variantes complejas.", options: [["md", "MD"], ["lg", "LG"]] },
        { key: "pattern", control: "select", desc: "Distribucion base de la fila.", options: [["wideLeft", "8/4"], ["wideRight", "4/8"], ["half", "6/6"]] },
        { key: "variant", control: "radio", desc: "Variante compleja del row.", options: EDITORIAL_ROW_OPTIONS },
        { key: "adsGutter0", control: "boolean", desc: "Solo con ads: activa .ft-layout-grid-flex__rowAdsGutter-0." }
    ];
    var editorialArgs = { preview: "lg", pattern: "wideLeft", variant: "fullwidth", adsGutter0: false };
    function renderEditorialRow(a) {
        var spans = ROW_SAMPLE_PATTERNS[a.pattern] || ROW_SAMPLE_PATTERNS.wideLeft;
        var labels = spans.map(function (_, idx) { return "Item " + (idx + 1); });
        var rowClasses = buildEditorialRowClasses(a);
        return '<div style="display:flex;flex-direction:column;gap:12px;">'
            + renderMetaStrip([
                { text: "Preview " + previewInfo(a.preview).label, active: true },
                { text: "Variante " + a.variant, active: true },
                { text: "Patron " + spans.join("/"), active: true },
                { text: a.variant === "ads" && a.adsGutter0 ? "adsGutter-0" : "gutter normal", active: a.variant === "ads" && a.adsGutter0 }
            ])
            + gridWrap(renderGridRowMarkup(buildPreviewPatternClassSets(spans, a.preview), labels, rowClasses), a.preview)
            + '</div>';
    }
    function codeEditorialRow(a) {
        var spans = ROW_SAMPLE_PATTERNS[a.pattern] || ROW_SAMPLE_PATTERNS.wideLeft;
        var classSets = buildPreviewPatternClassSets(spans, a.preview);
        var rowClasses = buildEditorialRowClasses(a);
        var lines = ['<div class="ft-layout-grid-flex">', '  <div class="' + rowClasses.join(" ") + '">'];
        classSets.forEach(function (classes, idx) {
            lines.push('    <div class="' + classes.join(" ") + '">');
            lines.push('      Item ' + (idx + 1));
            lines.push('    </div>');
        });
        lines.push('  </div>');
        lines.push('</div>');
        return codeLines(lines);
    }
    var utilityArgTypes = [
        { key: "preview", control: "radio", desc: "Breakpoint en el que probar utilidades de columna.", options: PREVIEW_OPTIONS },
        { key: "pattern", control: "radio", desc: "Base de dos columnas para comprobar reorder y gutters.", options: [["half", "6/6"], ["wideLeft", "8/4"], ["wideRight", "4/8"]] },
        { key: "secondFirst", control: "select", desc: "Convierte el segundo item en first-*.", options: ORDER_OPTIONS },
        { key: "firstLast", control: "select", desc: "Convierte el primer item en last-*.", options: ORDER_OPTIONS },
        { key: "firstGutter", control: "select", desc: "Ajuste de gutter del primer item.", options: GUTTER_OPTIONS },
        { key: "secondGutter", control: "select", desc: "Ajuste de gutter del segundo item.", options: GUTTER_OPTIONS },
        { key: "firstRelative", control: "boolean", desc: "Activa .ft-layout-grid-flex__colIs-relative en el primer item." }
    ];
    var utilityArgs = { preview: "lg", pattern: "half", secondFirst: "none", firstLast: "none", firstGutter: "none", secondGutter: "none", firstRelative: false };
    function buildUtilityClasses(a) {
        var spans = ROW_SAMPLE_PATTERNS[a.pattern] || ROW_SAMPLE_PATTERNS.half;
        var classSets = buildPreviewPatternClassSets(spans, a.preview);
        if (a.firstLast !== "none") classSets[0].push("ft-layout-grid-flex__colLast-" + a.firstLast);
        if (a.secondFirst !== "none") classSets[1].push("ft-layout-grid-flex__colFirst-" + a.secondFirst);
        if (a.firstGutter !== "none") classSets[0].push("ft-layout-grid-flex__colGutter-" + a.firstGutter);
        if (a.secondGutter !== "none") classSets[1].push("ft-layout-grid-flex__colGutter-" + a.secondGutter);
        if (a.firstRelative) classSets[0].push("ft-layout-grid-flex__colIs-relative");
        return classSets;
    }
    function renderColumnUtilities(a) {
        var classSets = buildUtilityClasses(a);
        return '<div style="display:flex;flex-direction:column;gap:12px;">'
            + renderMetaStrip([
                { text: "Preview " + previewInfo(a.preview).label, active: true },
                { text: a.secondFirst === "none" ? "sin first-*" : "item 2 -> first-" + a.secondFirst, active: a.secondFirst !== "none" },
                { text: a.firstLast === "none" ? "sin last-*" : "item 1 -> last-" + a.firstLast, active: a.firstLast !== "none" },
                { text: a.firstGutter === "none" ? "gutter item 1 normal" : "item 1 gutter-" + a.firstGutter, active: a.firstGutter !== "none" },
                { text: a.secondGutter === "none" ? "gutter item 2 normal" : "item 2 gutter-" + a.secondGutter, active: a.secondGutter !== "none" },
                { text: a.firstRelative ? "item 1 relative" : "relative off", active: a.firstRelative }
            ])
            + gridWrap(renderGridRowMarkup(classSets, ["Item 1", "Item 2"], ["ft-layout-grid-flex__row"]), a.preview)
            + '</div>';
    }
    function codeColumnUtilities(a) {
        var classSets = buildUtilityClasses(a);
        return codeLines([
            '<div class="ft-layout-grid-flex">',
            '  <div class="ft-layout-grid-flex__row">',
            '    <div class="' + classSets[0].join(" ") + '">',
            '      Item 1',
            '    </div>',
            '    <div class="' + classSets[1].join(" ") + '">',
            '      Item 2',
            '    </div>',
            '  </div>',
            '</div>'
        ]);
    }
    function compositionStoryFactory(id, name, patternMap, defaults) {
        var argTypes = [
            { key: "preview", control: "radio", desc: "Breakpoint que quieres inspeccionar.", options: PREVIEW_OPTIONS },
            { key: "pattern", control: "select", desc: "Patron aplicado en el breakpoint activo.", options: patternOptions(patternMap) }
        ];
        function render(a) {
            var spans = patternFor(patternMap, a.pattern);
            var perItem = buildPreviewPatternClassSets(spans, a.preview);
            var labels = perItem.map(function (_, idx) { return "Item " + (idx + 1); });
            return '<div style="display:flex;flex-direction:column;gap:14px;">'
                + renderMetaStrip([
                    { text: "Preview " + previewInfo(a.preview).label, active: true },
                    { text: "Patron " + spans.join("/"), active: true }
                ])
                + gridWrap(renderGridRow(perItem, labels, "default", false, false), a.preview)
                + '</div>';
        }
        function code(a) {
            var perItem = buildPreviewPatternClassSets(patternFor(patternMap, a.pattern), a.preview);
            var lines = ['<div class="ft-layout-grid-flex">', '  <div class="ft-layout-grid-flex__row">'];
            perItem.forEach(function (classes, idx) {
                lines.push('    <div class="' + classes.join(" ") + '">');
                lines.push('      Item ' + (idx + 1));
                lines.push('    </div>');
            });
            lines.push('  </div>');
            lines.push('</div>');
            return codeLines(lines);
        }
        return { id: id, name: name, kind: "interactive", full: true, argTypes: argTypes, args: defaults, render: render, code: code };
    }

    var nestedArgTypes = [
        { key: "preview", control: "radio", desc: "Breakpoint que quieres inspeccionar.", options: PREVIEW_OPTIONS },
        { key: "shell", control: "radio", desc: "Relacion main / aside del shell exterior.", options: [["8-4", "8/4"], ["9-3", "9/3"], ["6-6", "6/6"]] },
        { key: "rowMode", control: "radio", desc: "Fila exterior standard o sin padding lateral.", options: ROW_MODE_OPTIONS },
        { key: "nestedCols", control: "radio", desc: "Numero de items en la fila anidada.", options: [["2", "2"], ["3", "3"], ["4", "4"]] },
        { key: "nestedPattern", control: "select", desc: "Patron anidado en el breakpoint activo.", options: [["stack", "stack"], ["balanced", "balanced"], ["feature", "feature"]] },
        { key: "nestedPack", control: "radio", desc: "Justify-content de la fila nested.", options: NESTED_PACK_OPTIONS },
        { key: "gutter0", control: "boolean", desc: "Activa .ft-layout-grid-flex__nestedGutter-0." }
    ];
    var nestedArgs = { preview: "lg", shell: "8-4", rowMode: "default", nestedCols: "3", nestedPattern: "balanced", nestedPack: "none", gutter0: false };
    function renderNested(a) {
        var shell = SHELL_PATTERNS[a.shell] || SHELL_PATTERNS["8-4"];
        var nestedMap = NESTED_PATTERNS[parseInt(a.nestedCols, 10) || 3];
        var bp = lowerBp(previewBpKey(a.preview));
        var leftClasses = buildPreviewColumnClasses(shell[0], a.preview);
        var rightClasses = buildPreviewColumnClasses(shell[1], a.preview);
        var nestedItems = buildPreviewPatternClassSets(patternFor(nestedMap, a.nestedPattern), a.preview);
        var nestedClasses = ["ft-layout-grid-flex__nested"];
        if (a.nestedPack !== "none") nestedClasses.push("ft-layout-grid-flex__nested" + (a.nestedPack === "center" ? "Center" : "End") + "-" + bp);
        if (a.gutter0) nestedClasses.push("ft-layout-grid-flex__nestedGutter-0");
        var outerRowClasses = ["ft-layout-grid-flex__row"];
        if (a.rowMode === "pless") outerRowClasses.push("ft-layout-grid-flex__rowIs-p-less");
        return '<div style="display:flex;flex-direction:column;gap:14px;">'
            + renderMetaStrip([
                { text: "Preview " + previewInfo(a.preview).label, active: true },
                { text: "Shell " + shell.join("/"), active: true },
                { text: "Nested " + patternFor(nestedMap, a.nestedPattern).join("/"), active: true },
                { text: a.nestedPack === "none" ? "nested flow normal" : "nested " + a.nestedPack + "@" + bp, active: a.nestedPack !== "none" },
                { text: a.gutter0 ? "nestedGutter-0" : "gutter normal", active: a.gutter0 }
            ])
            + gridWrap('<div class="ft-layout-grid-flex"><div class="' + outerRowClasses.join(" ") + '">'
                + '<div class="' + leftClasses.join(" ") + '">' + surface("Main", "#0f62fe") + '<div class="' + nestedClasses.join(" ") + '">' + renderCols(nestedItems, nestedItems.map(function (_, idx) { return "Nested " + (idx + 1); })) + '</div></div>'
                + '<div class="' + rightClasses.join(" ") + '">' + surface("Aside", "#393939") + '</div>'
                + '</div></div>', a.preview)
            + '</div>';
    }
    function codeNested(a) {
        var shell = SHELL_PATTERNS[a.shell] || SHELL_PATTERNS["8-4"];
        var nestedMap = NESTED_PATTERNS[parseInt(a.nestedCols, 10) || 3];
        var bp = lowerBp(previewBpKey(a.preview));
        var nestedItems = buildPreviewPatternClassSets(patternFor(nestedMap, a.nestedPattern), a.preview);
        var nestedClasses = ["ft-layout-grid-flex__nested"];
        if (a.nestedPack !== "none") nestedClasses.push("ft-layout-grid-flex__nested" + (a.nestedPack === "center" ? "Center" : "End") + "-" + bp);
        if (a.gutter0) nestedClasses.push("ft-layout-grid-flex__nestedGutter-0");
        var outerRowClasses = ["ft-layout-grid-flex__row"];
        if (a.rowMode === "pless") outerRowClasses.push("ft-layout-grid-flex__rowIs-p-less");
        var lines = [
            '<div class="ft-layout-grid-flex">',
            '  <div class="' + outerRowClasses.join(" ") + '">',
            '    <div class="' + buildPreviewColumnClasses(shell[0], a.preview).join(" ") + '">',
            '      <div class="' + nestedClasses.join(" ") + '">'
        ];
        nestedItems.forEach(function (classes, idx) { lines.push('        <div class="' + classes.join(" ") + '">Nested ' + (idx + 1) + '</div>'); });
        lines.push('      </div>');
        lines.push('    </div>');
        lines.push('    <div class="' + buildPreviewColumnClasses(shell[1], a.preview).join(" ") + '">');
        lines.push('      Aside');
        lines.push('    </div>');
        lines.push('  </div>');
        lines.push('</div>');
        return codeLines(lines);
    }
    function galleryAllSpans() {
        var cells = SPANS.map(function (n) {
            return '<div style="display:flex;flex-direction:column;gap:6px;"><code style="font:500 10px/1.2 monospace;color:#555;">.' + esc(colClass("Lg", n)) + '</code>' + gridWrap(renderGridRow([[colClass("Xs", 12), colClass("Lg", n)]], [n + "/12"], "default", false, false), "lg") + '</div>';
        }).join("");
        return '<section style="display:flex;flex-direction:column;gap:12px;"><h3 style="margin:0;font:600 13px/1.2 sans-serif;color:#161616;">Anchos 1..12 desde Lg</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;">' + cells + '</div></section>';
    }
    function galleryAllOffsets() {
        var cells = OFFSETS.map(function (n) {
            return '<div style="display:flex;flex-direction:column;gap:6px;"><code style="font:500 10px/1.2 monospace;color:#555;">.' + esc(offsetClass("Lg", n)) + '</code>' + gridWrap(renderGridRow([[colClass("Xs", 12), colClass("Lg", 3), offsetClass("Lg", n)]], ["offset " + n], "default", false, false), "lg") + '</div>';
        }).join("");
        return '<section style="display:flex;flex-direction:column;gap:12px;"><h3 style="margin:0;font:600 13px/1.2 sans-serif;color:#161616;">Offsets 0..11</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;">' + cells + '</div></section>';
    }
    function galleryCommonLayouts() {
        var samples = [
            { title: "8/4 editorial", sets: [[colClass("Xs", 12), colClass("Lg", 8)], [colClass("Xs", 12), colClass("Lg", 4)]] },
            { title: "6/6 balanced", sets: [[colClass("Xs", 12), colClass("Md", 6)], [colClass("Xs", 12), colClass("Md", 6)]] },
            { title: "4/4/4 thirds", sets: [[colClass("Xs", 12), colClass("Lg", 4)], [colClass("Xs", 12), colClass("Lg", 4)], [colClass("Xs", 12), colClass("Lg", 4)]] },
            { title: "3/3/3/3 quarters", sets: [[colClass("Xs", 12), colClass("Lg", 3)], [colClass("Xs", 12), colClass("Lg", 3)], [colClass("Xs", 12), colClass("Lg", 3)], [colClass("Xs", 12), colClass("Lg", 3)]] }
        ];
        return '<section style="display:flex;flex-direction:column;gap:14px;"><h3 style="margin:0;font:600 13px/1.2 sans-serif;color:#161616;">Patrones canonicos</h3>'
            + samples.map(function (sample) {
                return '<div style="display:flex;flex-direction:column;gap:6px;"><strong style="font:600 12px/1.4 sans-serif;color:#161616;">' + esc(sample.title) + '</strong>' + gridWrap(renderGridRow(sample.sets, sample.sets.map(function (_, idx) { return "Item " + (idx + 1); }), "default", false, false), "lg") + '</div>';
            }).join("")
            + '</section>';
    }

    function registerGridLayouts() {
        var overview = '<div class="cb-docs__inner">'
            + '<h1>Layouts · Grid</h1>'
            + '<p class="cb-docs__lead">Entrada curada del sistema <code>.ft-layout-grid-flex</code>. Sustituye al antiguo apartado "Varios": documenta construccion real, breakpoints, offsets, rows anidadas y patrones de composicion sin abrir una pagina muda.</p>'
            + '<h2>Dependencias</h2>'
            + '<div class="cb-deps"><table class="cb-table"><thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead><tbody>'
            + '<tr><td><code>scss/layout/_grid.scss</code></td><td>Fuente SCSS</td><td>Grid principal del DS</td></tr>'
            + '<tr><td><code>scss/base/helpers/_grids.scss</code></td><td>Fuente SCSS</td><td>Overrides de anchura y out-mo</td></tr>'
            + '<tr><td><code>fourty/layouts/layout-grid-flex.html</code></td><td>Referencia showroom</td><td>Base historica de la demo</td></tr>'
            + '<tr><td><code>brands/[marca]/setting.css</code> + <code>ux-index-layout.css</code></td><td>CSS compilado</td><td>Siempre</td></tr>'
            + '</tbody></table></div>'
            + '<h2>Piezas del sistema</h2>'
            + '<table class="cb-table"><thead><tr><th>Pieza</th><th>Clase</th><th>Rol</th></tr></thead><tbody>'
            + '<tr><td>Contenedor</td><td><code>.ft-layout-grid-flex</code></td><td>Marco del grid.</td></tr>'
            + '<tr><td>Fila</td><td><code>.ft-layout-grid-flex__row</code></td><td>Flex row con wrap y max-width.</td></tr>'
            + '<tr><td>Fila sin padding</td><td><code>.ft-layout-grid-flex__rowIs-p-less</code></td><td>Elimina el padding lateral del row.</td></tr>'
            + '<tr><td>Fila anidada</td><td><code>.ft-layout-grid-flex__nested</code></td><td>Subgrid dentro de una columna.</td></tr>'
            + '<tr><td>Nested gutter reset</td><td><code>.ft-layout-grid-flex__nestedGutter-0</code></td><td>Compensa el gutter del nested.</td></tr>'
            + '<tr><td>Columnas</td><td><code>.ft-layout-grid-flex__col{Xs|Sm|Md|Lg}-N</code></td><td>Ancho responsive de 1 a 12.</td></tr>'
            + '<tr><td>Offsets</td><td><code>.ft-layout-grid-flex__col{Bp}Offset-N</code></td><td>Desplazamiento horizontal de 0 a 11.</td></tr>'
            + '</tbody></table>'
            + '<h2>Breakpoints reales</h2>' + bpCheatSheet()
            + '<h2>Como leer esta entrada</h2>'
            + '<table class="cb-table"><thead><tr><th>Story</th><th>Para que sirve</th></tr></thead><tbody>'
            + '<tr><td><strong>Column builder</strong></td><td>Construir una columna completa con span + offset por breakpoint.</td></tr>'
            + '<tr><td><strong>2 / 3 / 4 columns</strong></td><td>Probar distribuciones completas de fila a traves de breakpoints.</td></tr>'
            + '<tr><td><strong>Nested construction</strong></td><td>Ver shell + nested + gutter reset en una sola composicion.</td></tr>'
            + '</tbody></table>'
            + '<div class="cb-callout">Si necesitas overrides de anchura desde desktop o sangrado al borde en mobile, complementar con <strong>Helpers > Grids</strong>. Aqui el foco es el layout estructural.</div>'
            + '<p class="cb-src">Fuente: <code>scss/layout/_grid.scss</code> · apoyo: <code>scss/base/helpers/_grids.scss</code> · referencia legacy: <code>fourty/layouts/layout-grid-flex.html</code></p>'
            + '</div>';

        window.SB.register({
            id: "lay-grid",
            name: "Grid",
            group: "Layouts",
            sort: -100,
            icon: "ruler",
            overview: overview,
            stories: [
                { id: "column-builder", name: "Column builder", kind: "interactive", full: true, argTypes: gridBaseArgTypes, args: gridBaseArgs, render: renderGridBase, code: codeGridBase },
                compositionStoryFactory("two-cols", "2 columns", PAIR_PATTERNS, { patternXs: "stack", patternSm: "stack", patternMd: "half", patternLg: "wideLeft" }),
                compositionStoryFactory("three-cols", "3 columns", TRIPLE_PATTERNS, { patternXs: "stack", patternSm: "stack", patternMd: "thirds", patternLg: "lead" }),
                compositionStoryFactory("four-cols", "4 columns", QUAD_PATTERNS, { patternXs: "stack", patternSm: "stack", patternMd: "quarters", patternLg: "quarters" }),
                { id: "nested-construction", name: "Nested construction", kind: "interactive", full: true, argTypes: nestedArgTypes, args: nestedArgs, render: renderNested, code: codeNested }
            ],
            subgroups: [
                {
                    id: "galleries",
                    name: "Galleries",
                    collapsed: true,
                    stories: [
                        { id: "breakpoint-cheatsheet", name: "Breakpoint cheatsheet", kind: "gallery", full: true, render: function () { return '<div class="cb-docs__inner"><h2>Breakpoints</h2>' + bpCheatSheet() + '</div>'; } },
                        { id: "all-spans", name: "All spans", kind: "gallery", full: true, render: galleryAllSpans },
                        { id: "all-offsets", name: "All offsets", kind: "gallery", full: true, render: galleryAllOffsets },
                        { id: "canonical-patterns", name: "Canonical patterns", kind: "gallery", full: true, render: galleryCommonLayouts }
                    ]
                }
            ]
        });
    }

    function registerGridLayoutsV2() {
        var overview = '<div class="cb-docs__inner">'
            + '<h1>Layouts · Grid</h1>'
            + '<p class="cb-docs__lead">Lectura curada del parcial <code>scss/layout/_grid.scss</code>. Aqui se documenta el grid flex real del DS en tres capas: columnas responsive, comportamiento de row y nested, y un bloque aparte para familias contextuales/editoriales que existen en el SCSS pero no son primitivas de maquetacion generica.</p>'
            + '<h2>Dependencias</h2>'
            + '<div class="cb-deps"><table class="cb-table"><thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuando</th></tr></thead><tbody>'
            + '<tr><td><code>scss/layout/_grid.scss</code></td><td>Fuente SCSS</td><td>Grid principal del DS</td></tr>'
            + '<tr><td><code>scss/base/helpers/_grids.scss</code></td><td>Fuente SCSS</td><td>Overrides de anchura y out-mo</td></tr>'
            + '<tr><td><code>fourty/layouts/layout-grid-flex.html</code></td><td>Referencia showroom</td><td>Base historica de la demo</td></tr>'
            + '<tr><td><code>brands/[marca]/setting.css</code> + <code>ux-index-layout.css</code></td><td>CSS compilado</td><td>Siempre</td></tr>'
            + '</tbody></table></div>'
            + '<h2>Mapa del parcial</h2>'
            + '<table class="cb-table"><thead><tr><th>Area</th><th>Familias</th><th>Lectura</th></tr></thead><tbody>'
            + '<tr><td>Columnas</td><td><code>__colXs-*</code>, <code>__colSm-*</code>, <code>__colMd-*</code>, <code>__colLg-*</code>, offsets, first/last, gutter, relative</td><td>Primitivas publicas del grid. Se usan para anchura, desplazamiento, orden y microajustes de gutter.</td></tr>'
            + '<tr><td>Rows</td><td><code>__row*</code>, <code>__rowMaxgrid</code>, <code>__rowReverse</code>, <code>__rowAds*</code>, <code>__rowIs-*</code></td><td>Capa de distribucion: wrap, alineacion, anchura del row y variantes editoriales.</td></tr>'
            + '<tr><td>Nested</td><td><code>__nested*</code></td><td>Subfila dentro de una columna. Solo controla justify y reset de gutters.</td></tr>'
            + '<tr><td>Background / ads</td><td><code>__bg*</code>, <code>__ads-container*</code>, <code>__colHas__Ads*</code>, <code>__col-adds*</code></td><td>Familias de contexto editorial para skins, robapags y shells publicitarios. No son primitives generales.</td></tr>'
            + '</tbody></table>'
            + '<h2>Breakpoints reales</h2>' + bpCheatSheet()
            + '<h2>Columnas publicas</h2>'
            + '<table class="cb-table"><thead><tr><th>Familia</th><th>Clases</th><th>Uso</th></tr></thead><tbody>'
            + '<tr><td>Ancho</td><td><code>.ft-layout-grid-flex__col{Xs|Sm|Md|Lg}-[1-12]</code></td><td>Define la base y los overrides por breakpoint. <code>Xs</code> debe existir siempre.</td></tr>'
            + '<tr><td>Offset</td><td><code>.ft-layout-grid-flex__col{Xs|Sm|Md|Lg}Offset-[0-11]</code></td><td>Desplaza horizontalmente la columna. El storybook usa esta sintaxis porque es la mas directa del SCSS.</td></tr>'
            + '<tr><td>Orden</td><td><code>.ft-layout-grid-flex__colFirst-{xs|sm|md|lg}</code> / <code>__colLast-{xs|sm|md|lg}</code></td><td>Reordena un item por breakpoint sin tocar el DOM.</td></tr>'
            + '<tr><td>Gutter</td><td><code>.ft-layout-grid-flex__colGutter-{r|l|x}-0</code></td><td>Retira padding lateral de una columna desde <code>768px</code>.</td></tr>'
            + '<tr><td>Utilidad extra</td><td><code>.ft-layout-grid-flex__colIs-relative</code></td><td>Activa posicionamiento relativo sobre una columna concreta.</td></tr>'
            + '</tbody></table>'
            + '<h2>Rows publicos</h2>'
            + '<table class="cb-table"><thead><tr><th>Familia</th><th>Clases</th><th>Uso</th></tr></thead><tbody>'
            + '<tr><td>Base</td><td><code>.ft-layout-grid-flex__row</code></td><td>Fila flex con wrap, max-width del sistema y gutter horizontal.</td></tr>'
            + '<tr><td>Justify</td><td><code>__row{Start|Center|End|Around|Between}-{xs|sm|md|lg}</code></td><td>Alineacion horizontal responsive.</td></tr>'
            + '<tr><td>Align</td><td><code>__row{Top|Middle|Bottom}-{xs|sm|md|lg}</code></td><td>Alineacion vertical responsive.</td></tr>'
            + '<tr><td>Anchura / shell</td><td><code>__rowMaxgrid</code>, <code>__rowIs-p-less</code>, <code>__rowIs-fullwidth</code>, <code>__rowIs-fullheight</code></td><td>Controlan el ancho maximo, padding lateral o crecimiento del shell.</td></tr>'
            + '<tr><td>Distribucion especial</td><td><code>__rowReverse</code>, <code>__rowAds</code>, <code>__rowAdsGutter-0</code>, <code>__rowHas-bg</code></td><td>Modificadores de layout editorial o de publicidad.</td></tr>'
            + '</tbody></table>'
            + '<h2>Nested publico</h2>'
            + '<table class="cb-table"><thead><tr><th>Clase</th><th>Uso</th></tr></thead><tbody>'
            + '<tr><td><code>.ft-layout-grid-flex__nested</code></td><td>Subfila flex dentro de una columna.</td></tr>'
            + '<tr><td><code>.ft-layout-grid-flex__nested{Center|End}-{xs|sm|md|lg}</code></td><td>Justify-content del nested por breakpoint.</td></tr>'
            + '<tr><td><code>.ft-layout-grid-flex__nestedGutter-0</code></td><td>Compensa el gutter lateral del nested.</td></tr>'
            + '</tbody></table>'
            + '<h2>Familias contextuales</h2>'
            + '<p>El parcial tambien incluye clases como <code>__bgTop/Rgt/Bttm/Lft</code>, <code>__colHas__minWidth</code>, <code>__colHas__AdsLeft/AdsRight</code>, <code>__col-addsLeft/Right/Content</code> y <code>__ads-container*</code>. Existen en el SCSS real y se documentan aqui, pero no se exponen como controles genericos porque dependen de shells editoriales, premium o wrappers publicitarios concretos.</p>'
            + '<h2>Como leer esta entrada</h2>'
            + '<table class="cb-table"><thead><tr><th>Story</th><th>Para que sirve</th></tr></thead><tbody>'
            + '<tr><td><strong>Responsive column</strong></td><td>Editar una columna completa con overrides Xs/Sm/Md/Lg y leer en una matriz cual es el breakpoint activo.</td></tr>'
            + '<tr><td><strong>Row behaviors</strong></td><td>Probar justify, align, reverse, maxgrid y p-less dentro del set basico.</td></tr>'
            + '<tr><td><strong>Advanced variants</strong></td><td>Categoria separada para shells complejos: fullwidth, ads, reorder, gutters y nested especial.</td></tr>'
            + '<tr><td><strong>2 / 3 / 4 columns</strong></td><td>Probar patrones canonicos en un unico breakpoint, sin ruido de overrides multiples.</td></tr>'
            + '<tr><td><strong>Nested construction</strong></td><td>Ver shell + nested + justify del nested + gutter reset en una sola composicion.</td></tr>'
            + '</tbody></table>'
            + '<div class="cb-callout">Si necesitas overrides de anchura desde desktop o sangrado al borde en mobile, complementar con <strong>Helpers > Grids</strong>. Aqui el foco es el layout estructural; los wrappers de ads o shells premium se consideran contexto editorial, no primitives base.</div>'
            + '<p class="cb-src">Fuente: <code>scss/layout/_grid.scss</code> · apoyo: <code>scss/base/helpers/_grids.scss</code> · referencia legacy: <code>fourty/layouts/layout-grid-flex.html</code></p>'
            + '</div>';

        window.SB.register({
            id: "lay-grid-v2",
            name: "Grid",
            group: "Layouts",
            sort: -100,
            icon: "ruler",
            overview: overview,
            subgroups: [
                {
                    id: "basics",
                    name: "Basics",
                    collapsed: false,
                    stories: [
                        { id: "column-builder", name: "Responsive column", kind: "interactive", full: true, argTypes: gridBaseArgTypes, args: gridBaseArgs, render: renderGridBase, code: codeGridBase },
                        { id: "row-behaviors", name: "Row behaviors", kind: "interactive", full: true, argTypes: rowBehaviorArgTypes, args: rowBehaviorArgs, render: renderRowBehavior, code: codeRowBehavior },
                        compositionStoryFactory("two-cols", "2 columns", PAIR_PATTERNS, { preview: "lg", pattern: "wideLeft" }),
                        compositionStoryFactory("three-cols", "3 columns", TRIPLE_PATTERNS, { preview: "lg", pattern: "lead" }),
                        compositionStoryFactory("four-cols", "4 columns", QUAD_PATTERNS, { preview: "lg", pattern: "quarters" })
                    ]
                },
                {
                    id: "advanced",
                    name: "Advanced variants",
                    collapsed: true,
                    stories: [
                        { id: "editorial-row", name: "Editorial row", kind: "interactive", full: true, argTypes: editorialArgTypes, args: editorialArgs, render: renderEditorialRow, code: codeEditorialRow },
                        { id: "column-utilities", name: "Column utilities", kind: "interactive", full: true, argTypes: utilityArgTypes, args: utilityArgs, render: renderColumnUtilities, code: codeColumnUtilities },
                        { id: "nested-construction", name: "Nested construction", kind: "interactive", full: true, argTypes: nestedArgTypes, args: nestedArgs, render: renderNested, code: codeNested }
                    ]
                },
                {
                    id: "galleries",
                    name: "Galleries",
                    collapsed: true,
                    stories: [
                        { id: "breakpoint-cheatsheet", name: "Breakpoint cheatsheet", kind: "gallery", full: true, render: function () { return '<div class="cb-docs__inner"><h2>Breakpoints</h2>' + bpCheatSheet() + '</div>'; } },
                        { id: "all-spans", name: "All spans", kind: "gallery", full: true, render: galleryAllSpans },
                        { id: "all-offsets", name: "All offsets", kind: "gallery", full: true, render: galleryAllOffsets },
                        { id: "canonical-patterns", name: "Canonical patterns", kind: "gallery", full: true, render: galleryCommonLayouts }
                    ]
                }
            ]
        });
    }

    var byFam = {};
    PAGES.forEach(function (p) { (byFam[p.fam] = byFam[p.fam] || []).push(p); });
    var order = Object.keys(byFam).sort(function (a, b) { return a.localeCompare(b, "es"); });

    order.forEach(function (fam) {
        if (fam === "Varios") {
            registerGridLayoutsV2();
            return;
        }
        var pages = byFam[fam].slice().sort(function (a, b) {
            return String(a.n || "").localeCompare(String(b.n || ""), "es", {
                numeric: true,
                sensitivity: "base"
            });
        });
        var hasHints = pages.some(function (p) { return !!p.h; });
        var stories = pages.map(function (p) {
            return {
                id: slug("lay-" + fam + "-" + p.f),
                name: p.n,
                kind: "page",
                src: BASE + p.f,
                brandable: false
            };
        });
        var rows = pages.map(function (p) {
            return '<tr><td>' + esc(p.n) + '</td><td><code>' + esc(BASE + p.f) + '</code></td>'
                + (hasHints ? '<td>' + esc(p.h || "") + '</td>' : '')
                + '</tr>';
        }).join("");
        var overview = '<div class="cb-docs__inner">'
            + '<h1>Layouts · ' + esc(fam) + '</h1>'
            + '<p class="cb-docs__lead">' + pages.length + ' pagina' + (pages.length === 1 ? '' : 's')
            + ' completa' + (pages.length === 1 ? '' : 's') + ' de <strong>' + esc(fam) + '</strong>. '
            + 'Cada entrada se carga entera en el canvas (su propio CSS y sus scripts). '
            + 'Marca bloqueada (Brand/Oscuro no aplican); usa <strong>Viewport</strong>, '
            + '<strong>Vision</strong> y <strong>Fullscreen</strong>.</p>'
            + '<h2>Paginas</h2>'
            + '<table class="cb-table"><thead><tr><th>Nombre</th><th>Fichero</th>'
            + (hasHints ? '<th>Notas</th>' : '')
            + '</tr></thead><tbody>'
            + rows + '</tbody></table>'
            + '<p class="cb-src">Fuente: <code>fourty/layouts/</code></p>'
            + '</div>';
        window.SB.register({ id: "lay-" + slug(fam), name: fam, group: "Layouts", overview: overview, stories: stories });
    });
})();
