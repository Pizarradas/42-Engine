/* ════════════════════════════════════════════════════════════════════════
   molecules/toc/toc.js — Molecules / TOC
   Casuística REAL de scss/fourties/molecules/toc/_toc.scss (.ft-mol-toc*).
   Markup tomado de fourty/molecules/molecule-toc.html. Cero invención de API.

   Tabla de contenidos / sumario de un especial: un título (__title) + una lista numerada
   (.ft-list--numbered) de artículos enlazados. El artículo que se está leyendo es el ítem
   .ft-list__itemIs--active y muestra una etiqueta flotante (__message "ESTÁS LEYENDO").
   Solo CSS — compone el átomo .ft-list--numbered.

   Estructura: una story plana interactiva "Base" (controls: título · nº de artículos ·
   artículo actual · etiqueta) + subgrupo "Markup" async desde toc.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH ▼ */
    const DATA = {
        items: [
            "En contra de 'El juego del calamar': eficaz, pero previsible e incongruente",
            "A favor de 'El juego del calamar': la fuerte identidad del audiovisual surcoreano",
            "Quién es quién en 'El juego del calamar': personajes y actores de la serie de Netflix",
            "Wi Ja Joon, así es el poli guaperas de 'El juego del calamar'",
            "Lo que 'El juego del calamar' cuenta de los excluidos"
        ]
    };

    /* ─── BASE — .ft-mol-toc ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Título del sumario (.ft-mol-toc__title)." },
        { key: "count", control: "number", desc: "Número de artículos (rango 1-10; ciclan).", min: 1, max: 10 },
        { key: "active", control: "number", desc: "Artículo que se está leyendo (.ft-list__itemIs--active, 1-based).", min: 1, max: 10 },
        { key: "message", control: "text", desc: "Etiqueta flotante del artículo actual (.ft-mol-toc__message)." }
    ];
    const baseArgs = { title: "¿Por qué medio mundo devora la serie 'El juego del calamar'?", count: "5", active: "2", message: "ESTÁS LEYENDO" };

    function live(a) {
        const n = Math.max(1, Math.min(10, parseInt(a.count, 10) || 1));
        const active = Math.max(1, Math.min(n, parseInt(a.active, 10) || 1));
        let items = "";
        for (let i = 1; i <= n; i++) {
            const text = DATA.items[(i - 1) % DATA.items.length];
            if (i === active) {
                items += '<li class="ft-list__item ft-list__itemIs--active">' +
                    '<span class="ft-mol-toc__message">' + esc(a.message) + "</span>" + esc(text) + "</li>";
            } else {
                items += '<li class="ft-list__item"><a href="#" class="ft-link ft-link--secondary" title="' + esc(text) + '">' + esc(text) + "</a></li>";
            }
        }
        return '<div class="ft-mol-toc">' +
            '<h2 class="ft-mol-toc__title">' + esc(a.title) + "</h2>" +
            '<ol class="ft-list ft-list--numbered">' + items + "</ol>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>TOC</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-toc</code>): tabla de contenidos de un especial — título + lista numerada de artículos, con el actual destacado.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/toc.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/list.css</code> + <code>link.css</code></td><td>CSS de los átomos que compone</td><td>Siempre (contiene <code>.ft-list--numbered</code> y <code>.ft-link</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el ítem actual (<code>.ft-list__itemIs--active</code>) no es un enlace y muestra una etiqueta flotante (<code>__message</code>) con un triángulo. El bloque lleva una esquina decorativa (<code>:before</code>).</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-toc</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-toc__title</code></td></tr>
                <tr><td>Lista</td><td><code>.ft-list.ft-list--numbered</code> &gt; <code>.ft-list__item</code></td></tr>
                <tr><td>Actual</td><td><code>.ft-list__itemIs--active</code></td></tr>
                <tr><td>Etiqueta flotante</td><td><code>.ft-mol-toc__message</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>toc-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/toc/_toc.scss</code> · markup: <code>fourty/molecules/molecule-toc.html</code></p>
    </div>`;

    const TC = {
        id: "toc",
        name: "TOC",
        group: "Molecules",
        overview,
        stories: [
            // full: el sumario ocupa el ancho de su columna; la etiqueta flotante necesita espacio.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TC);

    /* Markup original (HTML plano editable por el front) en toc.html → subgrupo "Markup". */
    window.SB.loadMarkup(TC, document.currentScript && document.currentScript.src, { full: true });
})();
