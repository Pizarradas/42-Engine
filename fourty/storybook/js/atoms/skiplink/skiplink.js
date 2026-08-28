/* ════════════════════════════════════════════════════════════════════════
   atoms/skiplink/skiplink.js — Atoms / Skiplink
   Casuística REAL de scss/fourties/atoms/skiplink/_skiplink.scss (.ft-skiplink).
   Markup tomado de fourty/atoms/atom-skiplink.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  ACCESIBILIDAD: enlace de salto oculto que aparece SOLO al recibir     ║
   ║  foco (Tab). Sin modificadores; se compone con .ft-btn para el estilo. ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-skiplink es el "saltar al contenido": un <a> recortado a 1px fuera de
   pantalla (clip) que en :focus se revela en la parte superior. No tiene
   modificadores propios; en el showroom se combina con .ft-btn ft-btn--md para
   el estilo visible. Es la primera pieza enfocable de la página (saltos de
   teclado para usuarios de lector de pantalla / sin ratón).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — _skiplink.scss no tiene modificadores ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Ejemplos canónicos de destino del showroom.
        samples: [
            ["#main-content", "Saltar al contenido principal"],
            ["#footer-content", "Saltar al pie de página"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    const skiplink = (href, label, withBtn) => {
        const cls = ["ft-skiplink"];
        if (withBtn) cls.push("ft-btn", "ft-btn--md");
        return `<a href="${esc(href)}" class="${cls.join(" ")}" title="${esc(label)}" tabindex="0">${esc(label)}</a>`;
    };
    // El skiplink es position:absolute respecto al ancestro posicionado y se
    // oculta fuera de pantalla; lo envolvemos en un marco relative con altura
    // para que, al enfocarlo (Tab), aparezca dentro del lienzo.
    const stage = (inner) =>
        `<div style="position:relative;min-height:96px;padding:12px;border:1px dashed #b3b3b3;border-radius:4px;background:#fff;overflow:hidden;">
            <p style="margin:0;font:400 12px/1.5 'Inter',sans-serif;color:#6b6b6b;">Pulsa <kbd style="border:1px solid #ccc;border-radius:3px;padding:0 4px;">Tab</kbd> dentro de este marco: el skiplink, oculto, se revela en la parte superior.</p>
            <button type="button" style="margin-top:8px;font:400 12px/1 'Inter',sans-serif;padding:6px 10px;">Elemento enfocable de referencia</button>
            ${inner}
        </div>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-skiplink. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "label", control: "text", desc: "Texto del enlace de salto (.ft-skiplink)." },
        { key: "href", control: "text", desc: "Destino del salto (id de la zona, p.ej. #main-content)." },
        { key: "withBtn", control: "boolean", desc: "Compone con .ft-btn ft-btn--md para el estilo visible (como en el showroom)." }
    ];
    const baseArgs = { label: "Saltar al contenido principal", href: "#main-content", withBtn: true };
    function liveBase(a) { return stage(skiplink(a.href, a.label, a.withBtn)); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — ejemplos canónicos
       ══════════════════════════════════════════════════════════════════════ */
    const gallerySamples = () =>
        DATA.samples.map(s => spec(s[1], stage(skiplink(s[0], s[1], true)))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Skiplink</h1>
        <p class="cb-docs__lead">Átomo de accesibilidad (<code>.ft-skiplink</code>): un enlace «saltar al contenido» oculto fuera de pantalla que se <strong>revela al recibir foco</strong> (Tab). Debe ser la primera pieza enfocable de la página.</p>

        <div class="cb-callout">Sin modificadores propios. En el showroom se compone con <code>.ft-btn ft-btn--md</code> para el estilo visible al aparecer. Apunta con <code>href="#id"</code> a la zona objetivo (contenido principal, pie…).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/skiplink.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/skiplink/_skiplink.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · revelado por <code>:focus</code> nativo</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Comportamiento</h2>
        <table class="cb-table">
            <thead><tr><th>Estado</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td>Reposo</td><td>Recortado a 1px (<code>clip</code>), fuera de pantalla (<code>translateY(-100%)</code>)</td></tr>
                <tr><td><code>:focus</code></td><td>Tamaño auto · visible en <code>top:.6rem</code> centrado · <code>z-index:10000</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Patrón WCAG <strong>2.4.1 Bypass Blocks</strong>: permite a usuarios de teclado/lector saltar la navegación repetida e ir directos al contenido. Colócalo como primer elemento del <code>&lt;body&gt;</code> y asegúrate de que el destino (<code>#main-content</code>) existe y es enfocable.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/skiplink/_skiplink.scss</code> · markup: <code>fourty/atoms/atom-skiplink.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SKIPLINK = {
        id: "skiplink",
        name: "Skiplink",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-skiplink", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "samples", name: "Ejemplos", hint: "destinos canónicos", kind: "gallery", full: true, render: gallerySamples }
              ]
            }
        ]
    };
    window.SB.register(SKIPLINK);
    window.SB.loadMarkup(SKIPLINK, document.currentScript && document.currentScript.src, { full: true });
})();
