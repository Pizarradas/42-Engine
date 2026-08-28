/* ════════════════════════════════════════════════════════════════════════
   molecules/subscribeRead/subscribeRead.js — Molecules / Subscribe Read
   Casuística REAL de scss/fourties/molecules/subscribeRead/_subscribeRead.scss
   (.ft-mol-subscribeRead*). Markup de fourty/molecules/molecule-subscribeRead.html.
   Cero invención de API.

   Bloque de suscripción a revista: contenido (fecha vertical + título + texto), imagen
   del ejemplar y CTA con botonera. En ≥768px se reparte en una rejilla 2×2. Solo CSS.
   ⚠ BEM con doble guion bajo encadenado real: __content__date, __content__title,
   __content__txt, __cta__title.

   Estructura: una story plana interactiva "Base" (controls: fecha · título · texto · CTA ·
   botones) + subgrupo "Markup" async desde subscribeRead.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Portada real del showroom (URL externa de El Periódico). El <base> del iframe la sirve. */
    const IMG = "https://estaticos-cdn.elperiodico.com/clip/15c28e00-4988-4efe-b628-d79ddab6f708_source-aspect-ratio_default_0.jpg";

    /* ─── BASE — .ft-mol-subscribeRead ─── */
    const baseArgTypes = [
        { key: "date", control: "text", desc: "Fecha vertical (.ft-mol-subscribeRead__content__date)." },
        { key: "title", control: "text", desc: "Título (.ft-mol-subscribeRead__content__title)." },
        { key: "txt", control: "text", desc: "Texto descriptivo (.ft-mol-subscribeRead__content__txt)." },
        { key: "ctaTitle", control: "text", desc: "Reclamo del CTA (.ft-mol-subscribeRead__cta__title)." },
        { key: "btn1", control: "text", desc: "Texto del primer botón (.ft-btn)." },
        { key: "btn2", control: "text", desc: "Texto del segundo botón (.ft-btn)." }
    ];
    const baseArgs = {
        date: "Septiembre de 2024",
        title: "Este mes con Woman",
        txt: "Consigue el tratamiento Antiestrés y Antiedad de la marca Facialderm y elige entre sus cremas faciales y serums boosters que más se adapten a tu rutina.",
        ctaTitle: "Suscríbete ahora",
        btn1: "Revista",
        btn2: "Edición digital"
    };

    const btn = label => '<a href="#" class="ft-btn ft-btn--secondary ft-btn--sm">' + esc(label) + "</a>";

    function live(a) {
        return '<div class="ft-mol-subscribeRead">' +
            '<div class="ft-mol-subscribeRead__content">' +
                '<div class="ft-mol-subscribeRead__content__date">' + esc(a.date) + "</div>" +
                '<h2 class="ft-mol-subscribeRead__content__title">' + esc(a.title) + "</h2>" +
                '<p class="ft-mol-subscribeRead__content__txt">' + esc(a.txt) + "</p>" +
            "</div>" +
            '<div class="ft-mol-subscribeRead__image">' +
                '<img loading="lazy" src="' + IMG + '" alt="' + esc(a.title) + '">' +
            "</div>" +
            '<div class="ft-mol-subscribeRead__cta">' +
                '<span class="ft-mol-subscribeRead__cta__title">' + esc(a.ctaTitle) + "</span>" +
                '<div class="ft-mol-btnGroup ft-mol-btnGroup--cnt">' + btn(a.btn1) + btn(a.btn2) + "</div>" +
            "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Subscribe Read</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-subscribeRead</code>): bloque de suscripción a revista — contenido, portada del ejemplar y CTA con botonera.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/subscribeRead.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS de los botones del CTA</td><td>Siempre (contiene <code>.ft-btn</code>)</td></tr>
                <tr><td>Portada (img)</td><td>Imagen del ejemplar</td><td>La aporta el consumidor (<code>__image</code>)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. En <code>≥768px</code> se reparte en una rejilla 2×2: contenido (1,1), imagen (1-2, columna 2) y CTA (fila 2, columna 1). La fecha se rota 90° con un trazo decorativo. Pensada sobre todo para <code>revistas</code>.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-subscribeRead</code></td></tr>
                <tr><td>Contenido</td><td><code>.ft-mol-subscribeRead__content</code></td></tr>
                <tr><td>Fecha</td><td><code>.ft-mol-subscribeRead__content__date</code> (rotada 90°)</td></tr>
                <tr><td>Título</td><td><code>.ft-mol-subscribeRead__content__title</code></td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-subscribeRead__content__txt</code></td></tr>
                <tr><td>Imagen</td><td><code>.ft-mol-subscribeRead__image</code></td></tr>
                <tr><td>CTA</td><td><code>.ft-mol-subscribeRead__cta</code> &gt; <code>__cta__title</code> + <code>.ft-mol-btnGroup--cnt</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>subscribeRead-[marca].scss</code>); en <code>revistas</code> cambia tipografía y tamaños. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/subscribeRead/_subscribeRead.scss</code> · markup: <code>fourty/molecules/molecule-subscribeRead.html</code></p>
    </div>`;

    const SR = {
        id: "subscriberead",
        name: "Subscribe Read",
        group: "Molecules",
        overview,
        stories: [
            // full: en ≥768px es una rejilla 2×2 → necesita el ancho completo.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SR);

    /* Markup original (HTML plano editable por el front) en subscribeRead.html → subgrupo "Markup". */
    window.SB.loadMarkup(SR, document.currentScript && document.currentScript.src, { full: true });
})();
