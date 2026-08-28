/* ════════════════════════════════════════════════════════════════════════
   molecules/slider/slider.js — Molecules / Slider
   Casuística REAL de scss/fourties/molecules/slider/_slider.scss (.ft-mol-carousel*).
   Markup tomado de fourty/molecules/molecule-slider.html. Cero invención de API.

   ⚠ El SCSS de slider define la clase .ft-mol-carousel (NO .ft-mol-slider): es un
   carrusel 100% CSS — sin JS — que conmuta diapositivas con radios (#radioN) y el
   selector :has(). Las flechas son <label for="radioN">. Requiere navegador con :has().

   ⚠ Inconsistencia heredada del SCSS: la regla
   `.ft-mol-carousel:has(input#radioN:checked) .ft-mol-carousel__wrapper:nth-child(M)`
   cuenta `:nth-child` incluyendo el <h2> header, así que la correspondencia radio→slide
   queda desfasada (el slide por defecto puede no mostrarse). Se migra VERBATIM y se
   documenta; corregirlo es trabajo del SCSS (fuera de ámbito).

   Estructura: una story plana interactiva "Base" (controls: cabecera · nº de slides) +
   subgrupo "Markup" async desde slider.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Imágenes reales del showroom (Unsplash). El <base> del iframe permite cargarlas. */
    const IMGS = [
        "https://images.unsplash.com/photo-1675426513908-75bf6aaee78c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1684417211736-e114089d26ec?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.0.3&q=85",
        "https://images.unsplash.com/photo-1685122956432-54551948f8fe?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.0.3&q=85"
    ];

    /* ─── BASE — .ft-mol-carousel ─── */
    const baseArgTypes = [
        { key: "header", control: "text", desc: "Cabecera del carrusel (.ft-mol-carousel__header)." },
        { key: "count", control: "number", desc: "Número de diapositivas (rango 1-6). Las imágenes ciclan.", min: 1, max: 6 }
    ];
    const baseArgs = { header: "Imágenes destacadas", count: "3" };

    function live(a) {
        const n = Math.max(1, Math.min(6, parseInt(a.count, 10) || 1));
        // Cada slide: flechas (prev → anterior, next → siguiente, en anillo) + imagen.
        let wrappers = "";
        for (let i = 0; i < n; i++) {
            const prev = (i - 1 + n) % n;
            const next = (i + 1) % n;
            wrappers +=
                '<div class="ft-mol-carousel__wrapper">' +
                    '<div class="ft-mol-carousel__content">' +
                        '<label class="ft-mol-carousel__nav ft-mol-carousel__nav--prev" for="radio' + prev + '"></label>' +
                        '<label class="ft-mol-carousel__nav ft-mol-carousel__nav--next" for="radio' + next + '"></label>' +
                        '<figure class="ft-mol-carousel__img"><img src="' + IMGS[i % IMGS.length] + '" alt="Imagen ' + (i + 1) + '"></figure>' +
                    "</div>" +
                "</div>";
        }
        // Paginación: un radio por slide; el primero marcado.
        let radios = "";
        for (let i = 0; i < n; i++) {
            radios += '<input type="radio" id="radio' + i + '" name="selectedImage"' + (i === 0 ? ' checked="checked"' : "") + ">";
        }
        return '<div class="ft-mol-carousel" role="region" aria-roledescription="carrusel" aria-labelledby="carouselHeading">' +
            '<h2 id="carouselHeading" class="ft-mol-carousel__header">' + esc(a.header) + "</h2>" +
            wrappers +
            '<div class="ft-mol-carousel__pagination">' + radios + "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Slider</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-carousel</code>): carrusel de imágenes <strong>100% CSS</strong>, sin JavaScript — conmuta con radios y el selector <code>:has()</code>.</p>

        <div class="cb-callout"><strong>Sin JS.</strong> Las flechas son <code>&lt;label for="radioN"&gt;</code> y la paginación son <code>&lt;input type="radio"&gt;</code>; el CSS muestra el <code>__wrapper</code> correspondiente con <code>:has(input#radioN:checked)</code>. Necesita un navegador con soporte de <code>:has()</code>.</div>

        <div class="cb-callout"><strong>Inconsistencia del SCSS.</strong> La regla usa <code>.ft-mol-carousel__wrapper:nth-child(M)</code> contando desde el <code>&lt;h2&gt;</code> header, por lo que la correspondencia radio→slide queda desfasada (el slide por defecto puede no verse). Migrado verbatim; corregirlo es trabajo del SCSS.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/slider.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Imágenes</td><td>Contenido del consumidor</td><td>Una por <code>__wrapper</code></td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (es CSS puro)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-carousel</code></td></tr>
                <tr><td>Cabecera</td><td><code>.ft-mol-carousel__header</code></td></tr>
                <tr><td>Diapositiva</td><td><code>.ft-mol-carousel__wrapper</code> &gt; <code>__content</code></td></tr>
                <tr><td>Flechas</td><td><code>.ft-mol-carousel__nav--prev</code> · <code>--next</code> (<code>&lt;label for&gt;</code>)</td></tr>
                <tr><td>Imagen</td><td><code>.ft-mol-carousel__img</code></td></tr>
                <tr><td>Paginación</td><td><code>.ft-mol-carousel__pagination</code> &gt; <code>&lt;input type="radio"&gt;</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>slider-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/slider/_slider.scss</code> · markup: <code>fourty/molecules/molecule-slider.html</code></p>
    </div>`;

    const SL = {
        id: "slider",
        name: "Slider",
        group: "Molecules",
        overview,
        stories: [
            // full: el carrusel ocupa el ancho (grid 70vmin) → necesita el ancho completo.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SL);

    /* Markup original (HTML plano editable por el front) en slider.html → subgrupo "Markup". */
    window.SB.loadMarkup(SL, document.currentScript && document.currentScript.src, { full: true });
})();
