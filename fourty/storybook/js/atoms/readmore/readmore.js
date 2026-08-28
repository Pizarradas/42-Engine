/* ════════════════════════════════════════════════════════════════════════
   atoms/readmore/readmore.js — Atoms / ReadMore
   Casuística REAL de scss/fourties/atoms/readmore/_readmore.scss (.ft-readMore*).
   Markup tomado de fourty/atoms/atom-readMore.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).             ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-readMore es un "leer más / leer menos" colapsable construido sobre el
   elemento NATIVO <details>/<summary> (sin JS custom: el toggle es el del
   navegador). El contenido (.ft-readMore__content) se recorta a 3 líneas con
   un degradado :after; el botón (.ft-readMore__btn) lleva un .ft-link/.ft-btn
   VACÍO cuyo texto lo pone el CSS por :before ("Leer más ⏷" / "Leer menos ⏶").
   Modificadores: --higher (recorta por altura 20rem), --has-button (centra el
   botón con .ft-btn), --not-less (oculta el botón al abrir).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum velit, nec hendrerit neque. Nulla sed sapien at tortor faucibus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus rhoncus, lorem a varius gravida, urna risus sodales arcu.";

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _readmore.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // [clase, etiqueta, descripción]
        mods: [
            ["higher",     "--higher",     "Recorta por altura (max 20rem) en vez de 3 líneas"],
            ["has-button", "--has-button", "Centra el botón (usa .ft-btn en vez de .ft-link)"],
            ["not-less",   "--not-less",   "Oculta el botón cuando está abierto"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    const readMore = (mods, text, open, hasButton) => {
        const btnInner = hasButton
            ? `<a class="ft-btn ft-btn--primary ft-btn--sm"></a>`
            : `(<a class="ft-link"></a>)`;
        return `<details class="${["ft-readMore"].concat(mods).join(" ")}"${open ? " open" : ""}>
            <summary>
                <div class="ft-readMore__content"><p>${esc(text)}</p></div>
                <span class="ft-readMore__btn">${btnInner}</span>
            </summary>
        </details>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-readMore. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "text", control: "text", desc: "Contenido recortable (.ft-readMore__content)." },
        { key: "open", control: "boolean", desc: "Abierto inicialmente (atributo open del <details>). También se abre clicando." },
        { key: "higher", control: "boolean", desc: "Recorta por altura 20rem (.ft-readMore--higher)." },
        { key: "hasButton", control: "boolean", desc: "Botón centrado con .ft-btn (.ft-readMore--has-button)." },
        { key: "notLess", control: "boolean", desc: "Oculta el botón al abrir (.ft-readMore--not-less)." }
    ];
    const baseArgs = { text: LOREM, open: false, higher: false, hasButton: false, notLess: false };
    function liveBase(a) {
        const mods = [];
        if (a.higher) mods.push("ft-readMore--higher");
        if (a.hasButton) mods.push("ft-readMore--has-button");
        if (a.notLess) mods.push("ft-readMore--not-less");
        return readMore(mods, a.text, a.open, a.hasButton);
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — variantes (cerradas)
       ══════════════════════════════════════════════════════════════════════ */
    const galleryMods = () =>
        [spec("Base", readMore([], LOREM, false, false))]
            .concat(DATA.mods.map(m => spec(m[1], readMore(["ft-readMore--" + m[0]], LOREM, false, m[0] === "has-button"))))
            .join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>ReadMore</h1>
        <p class="cb-docs__lead">Átomo «leer más / leer menos» (<code>.ft-readMore</code>) construido sobre el elemento <strong>nativo</strong> <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>: recorta el texto y lo expande al clicar, <strong>sin JavaScript custom</strong>.</p>

        <div class="cb-callout">El toggle es nativo del navegador (atributo <code>open</code> del <code>&lt;details&gt;</code>). El texto del botón lo genera el CSS con <code>:before</code> (<code>"Leer más ⏷"</code> / al abrir <code>"Leer menos ⏶"</code>), por eso el <code>&lt;a&gt;</code> del botón va <strong>vacío</strong>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/readMore.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/readmore/_readmore.scss</code> + <code>readmore-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · usa <code>&lt;details&gt;</code> nativo</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">El degradado de recorte (<code>:after</code>) usa <code>var(--color-white)</code>: asume fondo blanco. La familia <code>--has-button</code> usa <code>.ft-btn ft-btn--primary ft-btn--sm</code> en vez del <code>.ft-link</code> de las demás.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Recorta a 3 líneas (<code>-webkit-line-clamp</code>) con degradado</td></tr>
                ${DATA.mods.map(m => `<tr><td><code>${m[1]}</code></td><td>${m[2]}</td></tr>`).join("")}
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase / tag</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-readMore</code> (sobre <code>&lt;details&gt;</code>)</td></tr>
                <tr><td>Disparador</td><td><code>&lt;summary&gt;</code></td></tr>
                <tr><td>Contenido</td><td><code>.ft-readMore__content</code></td></tr>
                <tr><td>Botón</td><td><code>.ft-readMore__btn</code> → <code>.ft-link</code> / <code>.ft-btn</code> (texto vía <code>:before</code>)</td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">Al apoyarse en <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> nativos, el expand/collapse es operable por teclado y expone estado a lectores de pantalla sin ARIA adicional.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/readmore/_readmore.scss</code> · markup: <code>fourty/atoms/atom-readMore.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const READMORE = {
        id: "readmore",
        name: "ReadMore",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-readMore", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "mods", name: "Modificadores", hint: "base + 3", kind: "gallery", full: true, render: galleryMods }
              ]
            }
        ]
    };
    window.SB.register(READMORE);
    window.SB.loadMarkup(READMORE, document.currentScript && document.currentScript.src, { full: true });
})();
