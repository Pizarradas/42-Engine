/* ════════════════════════════════════════════════════════════════════════
   42DS Storybook — ÍNDICE: Templates (group "Templates")
   ────────────────────────────────────────────────────────────────────────
   AUTO-GENERADO por fourty/storybook/.tmp_gen_templates.js — NO editar a mano.
   Re-generar tras añadir/quitar ficheros en fourty/templates/.

   Los templates NO son componentes: son PÁGINAS COMPLETAS hechas a mano
   (composición de organismos/moléculas/átomos para un tipo de página). No tienen
   API ni modificadores que parametrizar → no hay controles. Cada página se publica
   como una story kind:"page": el iframe del canvas NAVEGA al fichero (carga su
   propio <head>/CSS/JS, fidelidad total). El sidebar las agrupa por FAMILIA/TIPO
   (Noticia, Portada, Cerca, Pasatiempos…) bajo el grupo "Templates".

   Ver: AI/mind-system/agents/mode-storybook-migrate.md (§ páginas) y
        fourty/storybook/js/core/storybook.js (kind:"page" en select/navigatePage).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    var BASE = "templates/";

    /* SSOT generado: una entrada por página del showroom de templates.
       f = fichero · n = nombre visible (derivado del fichero) · fam = familia/tipo. */
    var PAGES = [
        { f: "00.html", n: "00", fam: "Varios" },
        { f: "template-ads.html", n: "Ads", fam: "Varios" },
        { f: "template-cardHome.html", n: "CardHome", fam: "CardHome" },
        { f: "template-cerca-fase-2--00-inicio.html", n: "Cerca fase 2 · 00 inicio", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-A-feed-resultados-2.html", n: "Cerca fase 2 · 02 A feed resultados 2", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-A-feed-resultados-publicidad-modelo-aside.html", n: "Cerca fase 2 · 02 A feed resultados publicidad modelo aside", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-A-feed-resultados-publicidad-modelo-robas-por-cards.html", n: "Cerca fase 2 · 02 A feed resultados publicidad modelo robas por cards", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-A-feed-resultados.html", n: "Cerca fase 2 · 02 A feed resultados", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-A-feed-sin-resultados-alert.html", n: "Cerca fase 2 · 02 A feed sin resultados alert", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-B-feed-sin-resultados-loader.html", n: "Cerca fase 2 · 02 B feed sin resultados loader", fam: "Cerca" },
        { f: "template-cerca-fase-2--02-B-feed-sin-resultados.html", n: "Cerca fase 2 · 02 B feed sin resultados", fam: "Cerca" },
        { f: "template-cerca-fase-2--03-editar-localidades.html", n: "Cerca fase 2 · 03 editar localidades", fam: "Cerca" },
        { f: "template-cerca-fase-2--04-buscador-resultados-quickwins.html", n: "Cerca fase 2 · 04 buscador resultados quickwins", fam: "Cerca" },
        { f: "template-cerca-fase-2--04-buscador-resultados.html", n: "Cerca fase 2 · 04 buscador resultados", fam: "Cerca" },
        { f: "template-cerca-fase-2--04-HARDCODE-buscador-resultados-quickwins-hardcoded-back.html", n: "Cerca fase 2 · 04 HARDCODE buscador resultados quickwins hardcoded back", fam: "Cerca" },
        { f: "template-cerca-fase-2--04-HARDCODE-buscador-resultados-quickwins-hardcoded-DATA-V-01.html", n: "Cerca fase 2 · 04 HARDCODE buscador resultados quickwins hardcoded DATA V 01", fam: "Cerca" },
        { f: "template-cerca-fase-2--04-HARDCODE-buscador-resultados-quickwins-hardcoded-DATA-V-02.html", n: "Cerca fase 2 · 04 HARDCODE buscador resultados quickwins hardcoded DATA V 02", fam: "Cerca" },
        { f: "template-contacto-revistas.html", n: "Contacto revistas", fam: "Institucional" },
        { f: "template-desarrollo-noticia.html", n: "Desarrollo noticia", fam: "Varios" },
        { f: "template-directo-noticia-cambio-layout.html", n: "Directo noticia cambio layout", fam: "Directos" },
        { f: "template-directo-noticia.html", n: "Directo noticia", fam: "Directos" },
        { f: "template-directos.html", n: "Directos", fam: "Directos" },
        { f: "template-galeria-vertical-cambio-layout.html", n: "Galeria vertical cambio layout", fam: "Galería" },
        { f: "template-galeria-vertical.html", n: "Galeria vertical", fam: "Galería" },
        { f: "template-graphmodel.html", n: "Graphmodel", fam: "Modelos" },
        { f: "template-home.html", n: "Home", fam: "Varios" },
        { f: "template-map-model.html", n: "Map model", fam: "Modelos" },
        { f: "template-masthead--la-cronica-de-badajoz-aniversario-20.html", n: "Masthead · la cronica de badajoz aniversario 20", fam: "Masthead" },
        { f: "template-masthead-logged.html", n: "Masthead logged", fam: "Masthead" },
        { f: "template-masthead-terceros.html", n: "Masthead terceros", fam: "Masthead" },
        { f: "template-masthead.html", n: "Masthead", fam: "Masthead" },
        { f: "template-mixmodel.html", n: "Mixmodel", fam: "Modelos" },
        { f: "template-multiBox.html", n: "MultiBox", fam: "Varios" },
        { f: "template-newsletter-revistas.html", n: "Newsletter revistas", fam: "Newsletter" },
        { f: "template-noticia-100.html", n: "Noticia 100", fam: "Noticia" },
        { f: "template-noticia-apertura100.html", n: "Noticia apertura100", fam: "Noticia" },
        { f: "template-noticia-autores.html", n: "Noticia autores", fam: "Noticia" },
        { f: "template-noticia-branded.html", n: "Noticia branded", fam: "Noticia" },
        { f: "template-noticia-comentarios.html", n: "Noticia comentarios", fam: "Noticia" },
        { f: "template-noticia-explicativa.html", n: "Noticia explicativa", fam: "Noticia" },
        { f: "template-noticia-formula1.html", n: "Noticia formula1", fam: "Noticia" },
        { f: "template-noticia-multimedia.html", n: "Noticia multimedia", fam: "Noticia" },
        { f: "template-noticia-path.html", n: "Noticia path", fam: "Noticia" },
        { f: "template-noticia-strip.html", n: "Noticia strip", fam: "Noticia" },
        { f: "template-noticia-stripPremium.html", n: "Noticia stripPremium", fam: "Noticia" },
        { f: "template-noticia.html", n: "Noticia", fam: "Noticia" },
        { f: "template-objeto-editorial-audio.html", n: "Objeto editorial audio", fam: "Objeto editorial" },
        { f: "template-objeto-editorial-video-deprecated.html", n: "Objeto editorial video deprecated", fam: "Objeto editorial" },
        { f: "template-objeto-editorial-video.html", n: "Objeto editorial video", fam: "Objeto editorial" },
        { f: "template-opinion.html", n: "Opinion", fam: "Opinión" },
        { f: "template-pasatiempos-archivo.html", n: "Pasatiempos archivo", fam: "Pasatiempos" },
        { f: "template-pasatiempos-cuatroencampo.html", n: "Pasatiempos cuatroencampo", fam: "Pasatiempos" },
        { f: "template-pasatiempos-home-antigua.html", n: "Pasatiempos home antigua", fam: "Pasatiempos" },
        { f: "template-pasatiempos-home-catalanas.html", n: "Pasatiempos home catalanas", fam: "Pasatiempos" },
        { f: "template-pasatiempos-home-destacada.html", n: "Pasatiempos home destacada", fam: "Pasatiempos" },
        { f: "template-pasatiempos-home.html", n: "Pasatiempos home", fam: "Pasatiempos" },
        { f: "template-pasatiempos-intermedia-cuatroencampo.html", n: "Pasatiempos intermedia cuatroencampo", fam: "Pasatiempos" },
        { f: "template-pasatiempos-intermedia-juego.html", n: "Pasatiempos intermedia juego", fam: "Pasatiempos" },
        { f: "template-pasatiempos-intermedia-sudoku.html", n: "Pasatiempos intermedia sudoku", fam: "Pasatiempos" },
        { f: "template-pasatiempos-juego-final.html", n: "Pasatiempos juego final", fam: "Pasatiempos" },
        { f: "template-pasatiempos-juego-final2.html", n: "Pasatiempos juego final2", fam: "Pasatiempos" },
        { f: "template-pasatiempos-pangramax.html", n: "Pasatiempos pangramax", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial--mol-bar-game.html", n: "Pasatiempos porra mundial · mol bar game", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-ayuda.html", n: "Pasatiempos porra mundial ayuda", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-brackets.html", n: "Pasatiempos porra mundial brackets", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-matches.html", n: "Pasatiempos porra mundial matches", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-no-ranking.html", n: "Pasatiempos porra mundial no ranking", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-premios.html", n: "Pasatiempos porra mundial premios", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-pronosticos.html", n: "Pasatiempos porra mundial pronosticos", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-qualifiers.html", n: "Pasatiempos porra mundial qualifiers", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial-ranking.html", n: "Pasatiempos porra mundial ranking", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-mundial.html", n: "Pasatiempos porra mundial", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-ayuda.html", n: "Pasatiempos porra ucl ayuda", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-inicio.html", n: "Pasatiempos porra ucl inicio", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-pena.html", n: "Pasatiempos porra ucl pena", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-penas.html", n: "Pasatiempos porra ucl penas", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-premios.html", n: "Pasatiempos porra ucl premios", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-pronosticos.html", n: "Pasatiempos porra ucl pronosticos", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra-ucl-ranking.html", n: "Pasatiempos porra ucl ranking", fam: "Pasatiempos" },
        { f: "template-pasatiempos-porra.html", n: "Pasatiempos porra", fam: "Pasatiempos" },
        { f: "template-pasatiempos-sopa-torcida.html", n: "Pasatiempos sopa torcida", fam: "Pasatiempos" },
        { f: "template-pasatiempos-sudoku.html", n: "Pasatiempos sudoku", fam: "Pasatiempos" },
        { f: "template-pasatiempos-wordle.html", n: "Pasatiempos wordle", fam: "Pasatiempos" },
        { f: "template-portada-manual.html", n: "Portada manual", fam: "Portada" },
        { f: "template-portada-marketing.html", n: "Portada marketing", fam: "Portada" },
        { f: "template-portada-subseccion.html", n: "Portada subseccion", fam: "Portada" },
        { f: "template-quienes-somos-revistas.html", n: "Quienes somos revistas", fam: "Institucional" },
        { f: "template-reportaje-multimedia-lenis-overlay.html", n: "Reportaje multimedia lenis overlay", fam: "Reportaje" },
        { f: "template-reportaje-multimedia-lenis.html", n: "Reportaje multimedia lenis", fam: "Reportaje" },
        { f: "template-reportaje-multimedia-locomotive.html", n: "Reportaje multimedia locomotive", fam: "Reportaje" },
        { f: "template-reportaje-multimedia.html", n: "Reportaje multimedia", fam: "Reportaje" },
        { f: "template-reportaje.html", n: "Reportaje", fam: "Reportaje" },
        { f: "template-rrss-list.html", n: "Rrss list", fam: "RRSS" },
        { f: "template-widget-apertura.html", n: "Widget apertura", fam: "Varios" },
        { f: "template-writer.html", n: "Writer", fam: "Writer" },
        { f: "WC-template-noticia-AMP.html", n: "WC · Noticia AMP", fam: "Noticia" },
        { f: "WC-template-noticia.html", n: "WC · Noticia", fam: "Noticia" }
    ];

    var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x"; };

    var byFam = {};
    PAGES.forEach(function (p) { (byFam[p.fam] = byFam[p.fam] || []).push(p); });

    /* Familias ORDENADAS ALFABÉTICAMENTE en el sidebar (localeCompare 'es' → respeta
       acentos/ñ). Principio del índice-página: orden alfabético de familias/sub-grupos. */
    var order = Object.keys(byFam).sort(function (a, b) { return a.localeCompare(b, "es"); });

    order.forEach(function (fam) {
        var pages = byFam[fam];
        var stories = pages.map(function (p) {
            // brandable: las templates son composiciones MULTIMARCA (usan ux-index.css +
            // #brandStyles-root/#brandStyles conmutables) → el toolbar Brand SÍ aplica: el
            // motor conmuta los <link> de marca + clases ft-brand-* del <body> de la página
            // (mismo mecanismo que showroom-init.js). Los LAYOUTS, en cambio, son por-marca
            // (bloqueados) → allí brandable iría a false.
            return { id: slug(p.f), name: p.n, kind: "page", src: BASE + p.f, brandable: true };
        });
        var rows = pages.map(function (p) {
            return '<tr><td>' + esc(p.n) + '</td><td><code>' + esc(BASE + p.f) + '</code></td></tr>';
        }).join("");
        var overview = '<div class="cb-docs__inner">'
            + '<h1>' + esc(fam) + '</h1>'
            + '<p class="cb-docs__lead">' + pages.length + ' página' + (pages.length === 1 ? '' : 's')
            + ' de tipo <strong>' + esc(fam) + '</strong>. Cada entrada se carga completa en el canvas '
            + '(su propio CSS y sus scripts). Sin controles: usa <strong>Viewport</strong>, '
            + '<strong>Visión</strong> y <strong>Fullscreen</strong>.</p>'
            + '<h2>Páginas</h2>'
            + '<table class="cb-table"><thead><tr><th>Nombre</th><th>Fichero</th></tr></thead><tbody>'
            + rows + '</tbody></table>'
            + '<p class="cb-src">Fuente: <code>fourty/templates/</code></p>'
            + '</div>';
        window.SB.register({ id: "tpl-" + slug(fam), name: fam, group: "Templates", overview: overview, stories: stories });
    });
})();
