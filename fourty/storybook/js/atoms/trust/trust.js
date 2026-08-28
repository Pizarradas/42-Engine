/* ════════════════════════════════════════════════════════════════════════
   atoms/trust/trust.js — Atoms / Trust
   Casuística REAL de scss/fourties/atoms/trust/_trust.scss (.ft-trust*).
   Markup tomado de fourty/atoms/atom-trust.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).            ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-trust es la fila "por qué confiar en…": un logo (.ft-helper-img-rd) + un
   texto + un enlace que cubre toda el área (.ft-link--block). Flex centrado en
   móvil, alineado a la izquierda en ≥768px. Modificadores --center y --right.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _trust.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        aligns: [["", "Base (izq ≥768px)"], ["center", "Center"], ["right", "Right"]]
    };
    const LOGO = "/cds-statics/assets/img/logos/logo-trust.svg";
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    const trust = (align, text, moreText) => {
        const cls = ["ft-trust"];
        if (align) cls.push("ft-trust--" + align);
        return `<div class="${cls.join(" ")}"><img src="${LOGO}" alt="más información" width="13" height="13" class="ft-helper-img-rd">${esc(text)}<a href="#" class="ft-link ft-link--block" title="${esc(moreText)}" target="_self">${esc(moreText)}</a></div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-trust. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "align", control: "select", desc: "Alineación (.ft-trust--[center|right]).", options: DATA.aligns },
        { key: "text", control: "text", desc: "Texto de confianza." },
        { key: "moreText", control: "text", desc: "Texto del enlace (cubre el área con .ft-link--block)." }
    ];
    const baseArgs = { align: "", text: "Por qué confiar en El Periódico", moreText: "Más información" };
    function liveBase(a) { return trust(a.align, a.text, a.moreText); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — alineaciones
       ══════════════════════════════════════════════════════════════════════ */
    const galleryAligns = () =>
        DATA.aligns.map(a => spec(a[1], trust(a[0], "Por qué confiar en El Periódico", "Más información"))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Trust</h1>
        <p class="cb-docs__lead">Átomo de <strong>confianza</strong> (<code>.ft-trust</code>): la fila «por qué confiar en…» con un logo, un texto y un enlace que cubre toda el área (<code>.ft-link--block</code>). Enlaza a la política de confianza del medio.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/trust.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/trust/_trust.scss</code> + <code>trust-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout cb-callout--warn">El logo (<code>logo-trust.svg</code>) se sirve desde <code>/cds-statics/…</code> → solo se ve servido por un servidor. El layout y el enlace funcionan siempre.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Centrado en móvil · izquierda en ≥768px</td></tr>
                <tr><td><code>--center</code></td><td>Centrado siempre</td></tr>
                <tr><td><code>--right</code></td><td>Alineado a la derecha</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase / tag</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-trust</code></td></tr>
                <tr><td>Logo</td><td><code>&lt;img class="ft-helper-img-rd"&gt;</code></td></tr>
                <tr><td>Enlace área completa</td><td><code>.ft-link.ft-link--block</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">El <code>.ft-link--block</code> hace clicable toda la fila; el texto visible describe el destino y el <code>&lt;img&gt;</code> lleva <code>alt</code> descriptivo.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/trust/_trust.scss</code> · markup: <code>fourty/atoms/atom-trust.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TRUST = {
        id: "trust",
        name: "Trust",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-trust", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "aligns", name: "Alineaciones", hint: "base · center · right", kind: "gallery", full: true, render: galleryAligns }
              ]
            }
        ]
    };
    window.SB.register(TRUST);
    window.SB.loadMarkup(TRUST, document.currentScript && document.currentScript.src, { full: true });
})();
