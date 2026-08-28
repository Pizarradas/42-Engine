/* ════════════════════════════════════════════════════════════════════════
   molecules/carousel/carousel.js — Molecules / Carousel
   Casuística REAL de scss/fourties/molecules/carousel/_carousel.scss (.ft-mol-carousel*).
   Markup tomado de fourty/molecules/molecule-carousel.html. Cero invención de API.

   Carrusel CSS-ONLY: 3 slides (__wrapper > __content > __img) navegables con
   labels (__nav--prev/--next) y radios de paginación (__pagination), sin JS. El
   estado activo lo resuelve el CSS con :has(input#radioN:checked).

   ⚠ El parcial SCSS tiene clases con DOBLE PREFIJO (`.ft-mol-ft-mol-carousel--wrapper`,
   `__nav--prev`) que NO casan con el markup real (`.ft-mol-carousel__wrapper`): el
   toggle por :has() puede no aplicar. Se migra el markup VERBATIM del showroom y se
   documenta la inconsistencia; no se "arregla" aquí (eso es trabajo del SCSS/DS).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Imágenes del showroom (remotas, Unsplash). */
    const IMGS = [
        "https://images.unsplash.com/photo-1675426513908-75bf6aaee78c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY4MzU1MzV8&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1684417211736-e114089d26ec?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY4MzU1MzV8&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1685122956432-54551948f8fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY4MzU1MzV8&ixlib=rb-4.0.3&q=85"
    ];

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _carousel.scss / markup ▼ */
    const DATA = {
        parts: ["__header", "__wrapper", "__content", "__nav--prev", "__nav--next", "__img", "__pagination"],
        mechanism: ":has(input#radioN:checked) — CSS-only, sin JS"
    };

    /* ─── BASE — .ft-mol-carousel ─── */
    const baseArgTypes = [
        { key: "heading", control: "text", desc: "Título accesible del carrusel (__header)." }
    ];
    const baseArgs = { heading: "Imágenes destacadas" };

    const slide = (prevFor, nextFor, src) => `<div class="ft-mol-carousel__wrapper">
        <div class="ft-mol-carousel__content">
            <label class="ft-mol-carousel__nav ft-mol-carousel__nav--prev" for="${prevFor}"></label>
            <label class="ft-mol-carousel__nav ft-mol-carousel__nav--next" for="${nextFor}"></label>
            <figure class="ft-mol-carousel__img"><img src="${src}" alt="Image Description"></figure>
        </div>
    </div>`;

    function live(a) {
        return `<div class="ft-mol-carousel" role="region" aria-roledescription="carrusel" aria-labelledby="carouselHeading">
    <h2 id="carouselHeading" class="ft-mol-carousel__header">${esc(a.heading)}</h2>
    ${slide("radio2", "radio1", IMGS[0])}
    ${slide("radio0", "radio2", IMGS[1])}
    ${slide("radio1", "radio0", IMGS[2])}
    <div class="ft-mol-carousel__pagination">
        <input type="radio" id="radio0" name="selectedImage" checked="checked">
        <input type="radio" id="radio1" name="selectedImage">
        <input type="radio" id="radio2" name="selectedImage">
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Carousel</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-carousel</code>): carrusel de imágenes <strong>CSS-only</strong>. Tres slides navegables con flechas (<code>&lt;label&gt;</code> que apuntan a radios) y paginación de radios; el estado activo lo resuelve el CSS con <code>:has(input#radioN:checked)</code>, <strong>sin JavaScript</strong>.</p>

        <div class="cb-callout"><strong>Aviso de inconsistencia SCSS.</strong> El parcial <code>_carousel.scss</code> declara selectores con <em>doble prefijo</em> (<code>.ft-mol-ft-mol-carousel--wrapper</code>, <code>.ft-mol-ft-mol-carousel__nav--prev</code>) que <strong>no coinciden</strong> con las clases del markup real (<code>.ft-mol-carousel__wrapper</code>, <code>__nav--prev</code>). Por eso el toggle por <code>:has()</code> puede no aplicar en este estado del DS. Aquí se reproduce el <strong>markup verbatim</strong> del showroom; la corrección de las clases es trabajo del SCSS, no del storybook.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/carousel.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/carousel/_carousel.scss</code></td><td>Parcial SCSS fuente (con la inconsistencia descrita)</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (es radio + <code>:has()</code>)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-carousel</code></td></tr>
                <tr><td>Título</td><td><code>__header</code></td></tr>
                <tr><td>Slide</td><td><code>__wrapper</code> &gt; <code>__content</code> &gt; <code>__img</code></td></tr>
                <tr><td>Navegación</td><td><code>__nav--prev</code> · <code>__nav--next</code> (<code>&lt;label for="radioN"&gt;</code>)</td></tr>
                <tr><td>Paginación</td><td><code>__pagination</code> &gt; <code>&lt;input type="radio"&gt;</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Para carruseles ricos (touch, autoplay, lazy) el DS usa <strong>Swiper</strong> (ver molécula <em>Swiper</em>); este <code>.ft-mol-carousel</code> es la versión ligera CSS-only.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/carousel/_carousel.scss</code> · markup: <code>fourty/molecules/molecule-carousel.html</code></p>
    </div>`;

    const CAR = {
        id: "carousel-mol",
        name: "Carousel",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(CAR);

    /* Markup original (HTML plano editable por el front) en carousel.html → subgrupo "Markup". */
    window.SB.loadMarkup(CAR, document.currentScript && document.currentScript.src, { full: true });
})();
