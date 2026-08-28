/* ════════════════════════════════════════════════════════════════════════
   molecules/relatedSlider/relatedSlider.js — Molecules / Related Slider
   Casuística REAL de scss/fourties/molecules/relatedSlider/_relatedSlider.scss
   (.ft-mol-relatedSlider*). Markup tomado de fourty/molecules/molecule-relatedSlider.html.
   Cero invención de API.

   Carrusel de noticias relacionadas. En producción lo mueve una librería externa
   (Swiper o Glide); el storybook zero-toolchain NO carga ese JS, así que las diapositivas
   se muestran APILADAS (estado estático honesto) y la dependencia queda documentada en el
   Overview. Cada slide tiene un epígrafe (__text) y un titular (__title).

   Estructura: una story plana interactiva "Base" (controls: cabecera · epígrafe ·
   titular · nº de slides) + subgrupo "Markup" async desde relatedSlider.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ─── BASE — .ft-mol-relatedSlider ─── */
    const baseArgTypes = [
        { key: "header", control: "text", desc: "Cabecera del carrusel (.ft-mol-relatedSlider__header)." },
        { key: "epigraph", control: "text", desc: "Epígrafe de cada slide (.ft-mol-relatedSlider__text)." },
        { key: "headline", control: "text", desc: "Titular de cada slide (.ft-mol-relatedSlider__title > .ft-link)." },
        { key: "count", control: "number", desc: "Número de diapositivas (rango 1-8). Sin Swiper se apilan.", min: 1, max: 8 }
    ];
    const baseArgs = {
        header: "Noticias relacionadas",
        epigraph: "Epígrafe",
        headline: "Cambia el formato de la F1 en Bakú por el GP de Azerbaiyán: así será la novedosa carrera esprint",
        count: "4"
    };

    function slide(a) {
        return '<li class="swiper-slide">' +
            '<p class="ft-mol-relatedSlider__text"><a class="ft-link ft-link--primary" href="#" title="' + esc(a.epigraph) + '">' + esc(a.epigraph) + "</a></p>" +
            '<p class="ft-mol-relatedSlider__title"><a class="ft-link ft-link--secondary" href="#" title="' + esc(a.headline) + '">' + esc(a.headline) + "</a></p>" +
        "</li>";
    }

    function live(a) {
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        const slides = [];
        for (let i = 0; i < n; i++) slides.push(slide(a));
        return '<div class="ft-mol-relatedSlider" role="region" aria-roledescription="carrusel" aria-labelledby="relatedSliderHeading">' +
            '<h4 id="relatedSliderHeading" class="ft-mol-relatedSlider__header">' + esc(a.header) + "</h4>" +
            '<div class="swiper mySwiperRelatedSlider">' +
                '<ul class="swiper-wrapper">' + slides.join("") + "</ul>" +
                '<button class="swiper-button-next"></button>' +
                '<button class="swiper-button-prev"></button>' +
                '<div class="swiper-pagination"></div>' +
            "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Related Slider</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-relatedSlider</code>): carrusel de noticias relacionadas movido por una librería externa (Swiper o Glide).</p>

        <div class="cb-callout"><strong>Depende de JavaScript de terceros.</strong> El storybook zero-toolchain no carga Swiper/Glide, así que las diapositivas se muestran <strong>apiladas</strong> (estado estático). En un proyecto consumidor el slider desliza, pagina y muestra flechas. La estructura del markup (<code>.swiper</code> / <code>.swiper-wrapper</code> / <code>.swiper-slide</code>) es la real.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/relatedSlider.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>swiper-js/swiper-bundle.min.js</code> + <code>swiper-js/swiper-js.js</code></td><td>JavaScript (Swiper)</td><td><strong>Obligatorio</strong> para deslizar (opción Swiper)</td></tr>
                <tr><td><code>vendors/glide.js</code></td><td>JavaScript (Glide)</td><td>Alternativa a Swiper</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>carrusel de tarjetas de texto (epígrafe + titular)</td></tr>
                <tr><td><code>--Hasimage</code></td><td>cada slide pasa a rejilla con miniatura (<code>__image</code> + <code>.ft-helper-img-rd</code>); flechas circulares, sin bullets</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-relatedSlider</code></td></tr>
                <tr><td>Cabecera</td><td><code>.ft-mol-relatedSlider__header</code></td></tr>
                <tr><td>Carrusel</td><td><code>.swiper</code> &gt; <code>.swiper-wrapper</code> &gt; <code>.swiper-slide</code></td></tr>
                <tr><td>Epígrafe</td><td><code>.ft-mol-relatedSlider__text</code></td></tr>
                <tr><td>Titular</td><td><code>.ft-mol-relatedSlider__title</code> &gt; <code>.ft-link</code></td></tr>
                <tr><td>Imagen</td><td><code>.ft-mol-relatedSlider__image</code> (solo <code>--Hasimage</code>)</td></tr>
                <tr><td>Controles</td><td><code>.swiper-button-next/-prev</code> · <code>.swiper-pagination</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code> · <code>ep</code> · <code>epe</code> · <code>regionales</code> · <code>revistas</code> · <code>sport</code></td><td><code>relatedSlider-[marca].scss</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong>. La variante AMP usa <code>&lt;amp-carousel class="ft-mol-relatedSlider-amp"&gt;</code> (fuera de este storybook).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/relatedSlider/_relatedSlider.scss</code> · markup: <code>fourty/molecules/molecule-relatedSlider.html</code></p>
    </div>`;

    const RS = {
        id: "relatedslider",
        name: "Related Slider",
        group: "Molecules",
        overview,
        stories: [
            // full: el carrusel ocupa el ancho del contenedor (los slides se reparten en fila con Swiper).
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(RS);

    /* Markup original (HTML plano editable por el front) en relatedSlider.html → subgrupo "Markup". */
    window.SB.loadMarkup(RS, document.currentScript && document.currentScript.src, { full: true });
})();
