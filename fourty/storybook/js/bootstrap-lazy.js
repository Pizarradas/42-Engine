/* 42DS Storybook - deferred module loader
   Carga progresiva del catálogo tras el primer paint para reducir el coste de boot.
   Mantiene el mismo contenido funcional, pero evita evaluar 150+ módulos en el arranque.
   Dentro de cada fase la descarga es PARALELA con ejecución en ORDEN (async=false); antes se
   encadenaba script a script (onload→siguiente) y serializaba la red = el grueso del retardo. */
(function () {
    "use strict";

    var PHASES = [
        [
            "storybook/js/ai.js",
            "storybook/js/emailing.js",
            "storybook/js/icon-gallery.js",
            "storybook/js/setup/reset/reset.js",
            "storybook/js/setup/charset/charset.js",
            "storybook/js/setup/root/root.js",
            "storybook/js/helpers/affix/affix.js",
            "storybook/js/helpers/align/align.js",
            "storybook/js/helpers/anchor/anchor.js",
            "storybook/js/helpers/animation/animation.js",
            "storybook/js/helpers/background/background.js",
            "storybook/js/helpers/branded/branded.js",
            "storybook/js/helpers/closenews/closenews.js",
            "storybook/js/helpers/collapse/collapse.js",
            "storybook/js/helpers/display/display.js",
            "storybook/js/helpers/divider/divider.js",
            "storybook/js/helpers/fontcolor/fontcolor.js",
            "storybook/js/helpers/fontsize/fontsize.js",
            "storybook/js/helpers/fonttype/fonttype.js",
            "storybook/js/helpers/fontweight/fontweight.js",
            "storybook/js/helpers/grids/grids.js",
            "storybook/js/helpers/hides/hides.js",
            "storybook/js/helpers/images/images.js",
            "storybook/js/helpers/overlay/overlay.js",
            "storybook/js/helpers/position/position.js",
            "storybook/js/helpers/property/property.js",
            "storybook/js/helpers/scroll/scroll.js",
            "storybook/js/helpers/show/show.js",
            "storybook/js/helpers/size/size.js",
            "storybook/js/helpers/spacers/spacers.js",
            "storybook/js/helpers/text/text.js",
            "storybook/js/helpers/uihelpers/uihelpers.js"
        ],
        [
            "storybook/js/atoms/ad/ad.js",
            "storybook/js/atoms/advice/advice.js",
            "storybook/js/atoms/anchor/anchor.js",
            "storybook/js/atoms/animation/animation.js",
            "storybook/js/atoms/btn/btn.js",
            "storybook/js/atoms/check/check.js",
            "storybook/js/atoms/date/date.js",
            "storybook/js/atoms/embed/embed.js",
            "storybook/js/atoms/img/img.js",
            "storybook/js/atoms/link/link.js",
            "storybook/js/atoms/list/list.js",
            "storybook/js/atoms/radio/radio.js",
            "storybook/js/atoms/readmore/readmore.js",
            "storybook/js/atoms/scrollbar/scrollbar.js",
            "storybook/js/atoms/skiplink/skiplink.js",
            "storybook/js/atoms/svgmap/svgmap.js",
            "storybook/js/atoms/switch/switch.js",
            "storybook/js/atoms/tag/tag.js",
            "storybook/js/atoms/text/text.js",
            "storybook/js/atoms/timer/timer.js",
            "storybook/js/atoms/toogle/toogle.js",
            "storybook/js/atoms/tooltip/tooltip.js",
            "storybook/js/atoms/tour/tour.js",
            "storybook/js/atoms/trust/trust.js"
        ],
        [
            "storybook/js/molecules/accordion/accordion.js",
            "storybook/js/molecules/action-bar/action-bar.js",
            "storybook/js/molecules/advice/advice.js",
            "storybook/js/molecules/author/author.js",
            "storybook/js/molecules/authors/authors.js",
            "storybook/js/molecules/az-list/az-list.js",
            "storybook/js/molecules/bar/bar.js",
            "storybook/js/molecules/boxInfo/boxInfo.js",
            "storybook/js/molecules/breadcrumb/breadcrumb.js",
            "storybook/js/molecules/btngroup/btngroup.js",
            "storybook/js/molecules/card/card.js",
            "storybook/js/molecules/card-newsletter/card-newsletter.js",
            "storybook/js/molecules/carousel/carousel.js",
            "storybook/js/molecules/comment/comment.js",
            "storybook/js/molecules/countdown/countdown.js",
            "storybook/js/molecules/dataSheed/dataSheed.js",
            "storybook/js/molecules/divider/divider.js",
            "storybook/js/molecules/dropdown/dropdown.js",
            "storybook/js/molecules/figcaption/figcaption.js",
            "storybook/js/molecules/footerbasic/footerbasic.js",
            "storybook/js/molecules/form/form.js",
            "storybook/js/molecules/graphLegend/graphLegend.js",
            "storybook/js/molecules/headband/headband.js",
            "storybook/js/molecules/header-custom/header-custom.js",
            "storybook/js/molecules/label/label.js",
            "storybook/js/molecules/lnkbox/lnkbox.js",
            "storybook/js/molecules/marker/marker.js",
            "storybook/js/molecules/masonry/masonry.js",
            "storybook/js/molecules/menuanchor/menuanchor.js",
            "storybook/js/molecules/modal/modal.js",
            "storybook/js/molecules/modNews/modNews.js",
            "storybook/js/molecules/multimedia/multimedia.js",
            "storybook/js/molecules/overlay-live/overlay-live.js"
        ],
        [
            "storybook/js/molecules/pagination/pagination.js",
            "storybook/js/molecules/paper/paper.js",
            "storybook/js/molecules/path/path.js",
            "storybook/js/molecules/pick/pick.js",
            "storybook/js/molecules/pie-chart/pie-chart.js",
            "storybook/js/molecules/pollbox/pollbox.js",
            "storybook/js/molecules/popover/popover.js",
            "storybook/js/molecules/promo/promo.js",
            "storybook/js/molecules/promoHeader/promoHeader.js",
            "storybook/js/molecules/quote/quote.js",
            "storybook/js/molecules/rankingNews/rankingNews.js",
            "storybook/js/molecules/related/related.js",
            "storybook/js/molecules/relatedSlider/relatedSlider.js",
            "storybook/js/molecules/rrss/rrss.js",
            "storybook/js/molecules/score/score.js",
            "storybook/js/molecules/scoreboard/scoreboard.js",
            "storybook/js/molecules/slider/slider.js",
            "storybook/js/molecules/sorting/sorting.js",
            "storybook/js/molecules/sticky-panel/sticky-panel.js",
            "storybook/js/molecules/subheader/subheader.js",
            "storybook/js/molecules/subscribeRead/subscribeRead.js",
            "storybook/js/molecules/subtitle/subtitle.js",
            "storybook/js/molecules/swiper/swiper.js",
            "storybook/js/molecules/table/table.js",
            "storybook/js/molecules/tabs/tabs.js",
            "storybook/js/molecules/tagsNews/tagsNews.js",
            "storybook/js/molecules/tapbar/tapbar.js",
            "storybook/js/molecules/ticker/ticker.js",
            "storybook/js/molecules/toc/toc.js",
            "storybook/js/molecules/toolbar/toolbar.js",
            "storybook/js/molecules/tracking/tracking.js",
            "storybook/js/molecules/writer/writer.js"
        ],
        [
            "storybook/js/organisms/accordion/accordion.js",
            "storybook/js/organisms/author/author.js",
            "storybook/js/organisms/authors/authors.js",
            "storybook/js/organisms/boxfeatures/boxfeatures.js",
            "storybook/js/organisms/breadcrumb/breadcrumb.js",
            "storybook/js/organisms/cardhome/cardhome.js",
            "storybook/js/organisms/comments/comments.js",
            "storybook/js/organisms/container/container.js",
            "storybook/js/organisms/directnews/directnews.js",
            "storybook/js/organisms/footer/footer.js",
            "storybook/js/organisms/game/game.js",
            "storybook/js/organisms/header-custom/header-custom.js",
            "storybook/js/organisms/hero-welcome/hero-welcome.js",
            "storybook/js/organisms/hiperlocalmap/hiperlocalmap.js",
            "storybook/js/organisms/header-revistas-woman/header-revistas-woman.js",
            "storybook/js/organisms/masthead/masthead.js",
            "storybook/js/organisms/mediaviewer/mediaviewer.js",
            "storybook/js/organisms/newsletter/newsletter.js",
            "storybook/js/organisms/path/path.js",
            "storybook/js/organisms/paywall/paywall.js",
            "storybook/js/organisms/pick/pick.js",
            "storybook/js/organisms/scoreboard/scoreboard.js",
            "storybook/js/organisms/search-autocomplete/search-autocomplete.js",
            "storybook/js/organisms/services/services.js",
            "storybook/js/organisms/suggestions-chips/suggestions-chips.js",
            "storybook/js/organisms/toolbar/toolbar.js"
        ],
        [
            // Galería de logos AL FINAL: su manifest pesa ~500 KB (el fichero más grande del
            // storybook) y estaba en la fase 0, es decir, se descargaba y evaluaba ANTES que
            // atoms/molecules/organisms en toda sesión, abriera o no el usuario la galería.
            // El par data→consumidor debe seguir junto y en este orden (logo-gallery.js lee
            // SB_LOGO_GALLERY_DATA al evaluarse). Los shards SVG ya eran on-demand.
            "storybook/data/logo-gallery-data.js",
            "storybook/js/logo-gallery.js",
            "storybook/js/amp/amp.js",
            "storybook/js/templates/templates.js",
            "storybook/js/layouts/layouts.js",
            "storybook/js/widgets/widgets.js",
            "storybook/js/recursos/recursos.js",
            "storybook/js/pocs/pocs.js"
        ]
    ];

    // async=false en un script INYECTADO por JS = descarga en PARALELO pero ejecución en ORDEN
    // de inserción. Es la clave para lanzar toda la fase a la vez sin serializar la red (el cuello
    // real) y a la vez conservar dependencias intra-fase dato→consumidor (p.ej. logo-gallery-data.js
    // debe ejecutarse antes que logo-gallery.js). Nota: `defer` NO tiene efecto en scripts inyectados.
    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.onload = resolve;
            script.onerror = function () { reject(new Error("No se pudo cargar " + src)); };
            document.body.appendChild(script);
        });
    }

    function loadPhase(index) {
        if (index >= PHASES.length) return Promise.resolve();
        // Toda la fase se inyecta de golpe → descarga PARALELA (antes: cada script esperaba al
        // onload del anterior, ~150 requests encadenados). async=false mantiene el orden de
        // ejecución dentro de la fase; el faseado + idle sigue troceando la CPU tras el primer
        // paint. Promise.all resuelve al cargar el último; un fallo suelto no aborta el resto.
        return Promise.all(PHASES[index].map(loadScript)).catch(function (error) {
            console.warn("[SB] bootstrap-lazy:", error.message);
        }).then(function () {
            schedule(function () { loadPhase(index + 1); });
        });
    }

    function schedule(fn) {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(fn, { timeout: 1200 });
            return;
        }
        window.setTimeout(fn, 32);
    }

    function bootLazy() {
        schedule(function () { loadPhase(0); });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootLazy, { once: true });
    } else {
        bootLazy();
    }
})();
